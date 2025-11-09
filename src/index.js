// Entry point for Codity CLI application
// Handles user input and launches lessons via Launcher

import * as readline from 'node:readline/promises';
import {str} from './common/constants';
import Launcher from './common/launcher';
import config from '../res/config.json';

function createReadlineInterface() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
}

async function runShell() {
    const rl = createReadlineInterface();
    const launcher = new Launcher(rl);
    try {
        while (true) {
            const input = await rl.question(str.question);
            if (input === 'stop') {
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
        console.log(str.stopApp);
        rl.close();
        process.stdin.destroy();
    }
}

function runConfig(config) {
    const launcher = new Launcher(null);
    for (const lessonStr of config.lessons) {
        try {
            const result = launcher.resolveLessonByNo(lessonStr, false);
            console.log(result);
        } catch (err) {
            console.error(`Error running lesson '${lessonStr}':`, err.message);
        }
    }
}

function main() {
    const resolver = {
        'shell': runShell,
        'config': runConfig,
    }
    return resolver[config?.mode]? resolver[config?.mode](config) : str.noTaskErr;
}

main();



