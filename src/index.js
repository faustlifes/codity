import readline from 'readline';
import { classResolver } from './common/class-resolver';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const question = 'Please enter No of lesson (e.g. 1): ';
const noTaskErr = `You enter wrong lesson No or it's not completed yet`;

rl.question(question, input => {
  console.log(resolveLessonByNo(input), `\n${question}`);
});

rl.on('line', (input) => {
  console.log(resolveLessonByNo(input), `\n${question}`);
});

function launchLesson (lessonNumber, funcLaunch, params) {
  if (!funcLaunch) {
    return noTaskErr;
  }
  return `  - lesson is: ${lessonNumber}
  - params is: ${params}
  - result is: ${funcLaunch(...params)}
  `;
}

function parseInput (input) {
  const res = input.split('.');
  return { lNumber: res[0], sNumber: res[1] || '' };
}


function resolveLessonByNo (lesson) {
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
  return launchLesson(lesson, ls,[]);
}



