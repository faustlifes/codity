import * as readline from 'node:readline/promises';
import {classResolver} from './common/class-resolver';
import {Reflection} from './common/reflection';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const question = 'Please enter No of lesson (e.g. 1): ';
const noTaskErr = `You enter wrong lesson No or it's not completed yet`;


async function main() {
    let input = await rl.question(question);
    console.log(await resolveLessonByNo(input), `\n${question}`);

    /*rl.on('line', (input) => {

    });*/
}

async function readLines() {
    for await (const line of rl) {
        console.log(resolveLessonByNo(line), `\n${question}`);
    }
}

readLines();

main();

function launchLesson(lessonNumber, funcLaunch, params) {
    if (!funcLaunch) {
        return noTaskErr;
    }
    return `  - lesson is: ${lessonNumber}
  - params is: ${params}
  - result is: ${funcLaunch(...params)}
  `;
}

function parseInput(input) {
    const res = input.split('.');
    return {lNumber: res[0], sNumber: res[1] || ''};
}


async function resolveLessonByNo(lesson) {
    const pi = parseInput(lesson);
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
    const prms = await askForParams(ls);
    console.log('prms - ', prms);
    return launchLesson(lesson, ls, []);
}

function parseParams(input) {
    return input.split(',');
}

async function askForParams(fn) {
    let result = [];
    if (!fn) {
        return result;
    }
    const prms = Reflection.getParamNames(fn).map((param) => {
        return `'${param.name}' with type [${param.type}]`
    }).join(', ');


    const str = `please enter required parameters ${prms}`;
    const input = await rl.question(str);

    return parseParams(input) || [];
}



