/**
 * Launcher class: Handles lesson resolution and execution for Codity CLI.
 * Prompts user for input, resolves lesson and solution, and executes with parameters.
 */
import { classResolver } from './class-resolver';
import { Reflection } from './reflection';
import { str } from './constants';

class Launcher {
    #rl;

    constructor(readlineInterface) {
        this.#rl = readlineInterface;
    }

    // Launches the lesson and returns a formatted result
    #launchLesson(lessonKey, solutionFn, params) {
        if (!solutionFn) {
            return str.noTaskErr;
        }
        return `  - lesson is: ${lessonKey}\n  - params is: ${params}\n  - result is: ${solutionFn(params)}\n`;
    }

    // Parses input string into lesson and solution numbers
    #parseInput(input) {
        const [lessonNumber, solutionNumber = ''] = input.split('.');
        return { lessonNumber, solutionNumber };
    }

    // Parses lesson string from config format: 'lt1(1,2,3)' or 'lt.1' or 'lt1'
    #parseLessonString(lessonStr) {
        // Extract params if present
        const paramsMatch = lessonStr.match(/^(.+?)\((.+)\)$/);
        const basePart = paramsMatch ? paramsMatch[1] : lessonStr;
        const paramsStr = paramsMatch ? paramsMatch[2] : '';

        // Split by dot to get lesson and solution numbers
        const [lessonNumber, solutionNumber = ''] = basePart.split('.');
       // const params = paramsStr ? this.#parseConfigParams(paramsStr) : null;
        return { lessonNumber, solutionNumber, params: paramsStr };
    }

    // Parses parameters from the config format: '1,2,3' or "'start', true"
    #parseConfigParams(paramsStr) {
        if (!paramsStr.trim()) return [];
        try {
            return JSON.parse(`[${paramsStr}]`);
        } catch {
            // Fallback: split by comma and trim
            return paramsStr.split(',').map(p => {
                const trimmed = p.trim();
                // Try to parse as number
                if (!isNaN(trimmed) && trimmed !== '') return Number(trimmed);
                // Try to parse as boolean
                if (trimmed === 'true') return true;
                if (trimmed === 'false') return false;
                // Remove quotes if present
                if ((trimmed.startsWith("'") && trimmed.endsWith("'")) ||
                    (trimmed.startsWith('"') && trimmed.endsWith('"'))) {
                    return trimmed.slice(1, -1);
                }
                return trimmed;
            });
        }
    }

    // Resolves and runs lesson from config string
    runLessonFromConfig(lessonStr) {
        const { lessonNumber, solutionNumber, params } = this.#parseLessonString(lessonStr);
        let solutionFn;
        for (const key in classResolver) {
            if (key.includes(lessonNumber)) {
                solutionFn = classResolver[key][`solution${solutionNumber}`];
                if (solutionFn) break;
            }
        }

        if (!solutionFn) {
            return str.noTaskErr;
        }

        const paramDefs = Reflection.getFunctionParams(solutionFn);
        const typedParams = params && Array.isArray(params)
            ? Reflection.createTypes(params, paramDefs)
            : Reflection.createTypes([params], paramDefs);

        return this.#launchLesson(`lt${lessonNumber}.${solutionNumber}`, solutionFn, typedParams);
    }

    // Resolves a lesson by user input, prompts for params, and launches
    async resolveLessonByNo(input) {
        const { lessonNumber, solutionNumber } = this.#parseInput(input);
        let solutionFn;
        for (const key in classResolver) {
            if (key.includes(lessonNumber)) {
                solutionFn = classResolver[key][`solution${solutionNumber}`];
                if (solutionFn) break;
            }
        }
        const params = await this.#askForParams(solutionFn);
        return this.#launchLesson(input, solutionFn, params || []);
    }

    // Parses user input into typed parameters
    #parseParams(input, paramDefs) {
        return input ? Reflection.createTypes(input.split(' '), paramDefs) : null;
    }

    // Prompts the user for required parameters for the solution function
    async #askForParams(fn) {
        if (!fn) return [];
        const paramDefs = Reflection.getFunctionParams(fn);
        const paramDesc = paramDefs
            .map((param) => `'${param.name}' with type [${param.type}]`)
            .join(', ');
        const prompt = `please enter required parameters ${paramDesc}`;
        const input = await this.#rl.question(prompt);
        return this.#parseParams(input, paramDefs) || [];
    }
}

export default Launcher;