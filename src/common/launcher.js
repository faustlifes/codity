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

    // Launches the lesson and returns formatted result
    #launchLesson(lessonKey, solutionFn, params) {
        if (!solutionFn) {
            return str.noTaskErr;
        }
        return `  - lesson is: ${lessonKey}\n  - params is: ${params}\n  - result is: ${solutionFn(...params)}\n`;
    }

    // Parses input string into lesson and solution numbers
    #parseInput(input) {
        const [lessonNumber, solutionNumber = ''] = input.split('.');
        return { lessonNumber, solutionNumber };
    }

    // Resolves lesson by user input, prompts for params, and launches
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

    // Prompts user for required parameters for the solution function
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