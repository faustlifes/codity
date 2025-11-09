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
    #parseConfigParams(paramsStr, solutionFn) {
        if (!paramsStr.trim()) return [];
        const paramDefs = Reflection.getFunctionParams(solutionFn);
        return paramsStr && Array.isArray(paramsStr)
            ? Reflection.createTypes(paramsStr, paramDefs)
            : Reflection.createTypes([paramsStr], paramDefs);
    }

    // Resolves a lesson by user input, prompts for params, and launches
    async resolveLessonByNo(input, askParams = true) {
        const data = this.#parseLessonString(input);
        let solutionFn;
        for (const key in classResolver) {
            if (key.includes(data.lessonNumber)) {
                solutionFn = classResolver[key][`solution${data.solutionNumber}`];
                if (solutionFn) break;
            }
        }
        const typedParams = this.#parseConfigParams(data.params, solutionFn);
        data.params = !data.params && askParams? await this.#askForParams(solutionFn) : typedParams;
        return this.#launchLesson(input, solutionFn, data.params || []);
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