import {classResolver} from "./class-resolver";
import {Reflection} from "./reflection";
import {str} from "./constants";

class Launcher {
    #rl;

    constructor(options) {
        this.#rl = options;
    }

    #launchLesson(lessonNumber, funcLaunch, params) {
        if (!funcLaunch) {
            return str.noTaskErr;
        }
        return `  - lesson is: ${lessonNumber}
  - params is: ${params}
  - result is: ${funcLaunch(...params)}
  `;
    }

    #parseInput(input) {
        const res = input.split('.');
        return {lNumber: res[0], sNumber: res[1] || ''};
    }


    async resolveLessonByNo(lesson) {
        const pi = this.#parseInput(lesson);
        let ls;
        for (let prop in classResolver) {
            ls = undefined;
            if (prop.includes(pi.lNumber)) {
                ls = classResolver[prop][`solution${pi.sNumber}`];
                if (ls) {
                    break;
                }
            }
        }
        const params = await this.#askForParams(ls);
        return this.#launchLesson(lesson, ls, params || []);
    }

    #parseParams(input, params) {

        return !!input? Reflection.createTypes(input.split(' '), params) : null;
    }

    async #askForParams(fn) {
        if (!fn) {
            return [];
        }
        const params = Reflection.getFunctionParams(fn);
        const paramsString = params
            .map((param) => `'${param.name}' with type [${param.type}]`)
            .join(', ');


        const str = `please enter required parameters ${paramsString}`;
        const input = await this.#rl.question(str);

        return this.#parseParams(input, params) || [];
    }

}

export default Launcher;