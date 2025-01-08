import * as readline from 'node:readline/promises';
import {str} from "./common/constants";
import Launcher from "./common/launcher";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function main() {
    const launcher = new Launcher(rl);
    while (true) {
        let input = await rl.question(str.question);

        if (input === 'stop') {
            console.log(str.stopApp)
            rl.close();
            process.stdin.destroy();
            break;
        }
        console.log(await launcher.resolveLessonByNo(input));
    }
}


main();



