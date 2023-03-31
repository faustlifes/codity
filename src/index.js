import readline from 'readline';
import { classResolver } from './common/class-resolver';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const question = 'Please enter No of lesson (e.g. 1): '
rl.question(question, input => {
  console.log(resolveLessonByNo(input), `\n${question}`);
});

rl.on('line', (input) => {
  console.log(resolveLessonByNo(input), `\n${question}`);
});

function launchLesson (lessonNumber, funcLaunch, params) {
  let res = `- lesson is: ${lessonNumber}\n`
  res += `- params is: ${params}\n`
  res += `- result is: ${funcLaunch(...params)}`;
  return res;
}

function parseInput (input) {
  const res = input.split('.');
  return { lNumber: res[0], sNumber: res[1] || '' };
}


function resolveLessonByNo (lesson) {
  let result = `You enter wrong lesson No or it's not completed yet`;
  // let data = [];
  const pi = parseInput(lesson);
  const cl = classResolver[pi.lNumber]
  const func = cl ? [`solution${pi.sNumber}`] : null;
  if (!func) {
    return result;
  }
  result = launchLesson(lesson, classResolver[pi.lNumber][`solution${pi.sNumber}`],[]);

  return result;
}


