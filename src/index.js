// Entry point for Codity CLI application
// Handles user input and launches lessons via Launcher

import * as readline from 'node:readline/promises';
import { str } from './common/constants';
import Launcher from './common/launcher';

function createReadlineInterface() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
}

async function main() {
    const rl = createReadlineInterface();
    const launcher = new Launcher(rl);
    try {
        while (true) {
            const input = await rl.question(str.question);
            if (input === 'stop') {
                console.log(str.stopApp);
                rl.close();
                process.stdin.destroy();
                break;
            }
            try {
                const result = await launcher.resolveLessonByNo(input);
                console.log(result);
            } catch (err) {
                console.error('Error resolving lesson:', err);
            }
        }
    } catch (err) {
        console.error('Unexpected error:', err);
    } finally {
        rl.close();
        process.stdin.destroy();
    }
}

main();



