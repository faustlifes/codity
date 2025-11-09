// Entry point for Codity CLI application
// Handles user input and launches lessons via Launcher

import * as readline from 'node:readline/promises';
import { str } from './common/constants';
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

    // Parse lesson strings, splitting only on commas outside of parentheses
    const lessonStrings = config.lessons?.flatMap(item => {
        const lessons = [];
        let current = '';
        let depth = 0;

        for (let i = 0; i < item.length; i++) {
            const char = item[i];
            if (char === '(') depth++;
            else if (char === ')') depth--;
            else if (char === ',' && depth === 0) {
                if (current.trim()) lessons.push(current.trim());
                current = '';
                continue;
            }
            current += char;
        }
        if (current.trim()) lessons.push(current.trim());
        return lessons;
    }) || [];

    for (const lessonStr of lessonStrings) {
        try {
            const result = launcher.runLessonFromConfig(lessonStr);
            console.log(result);
        } catch (err) {
            console.error(`Error running lesson '${lessonStr}':`, err.message);
        }
    }
}

function main() {
    if (config?.mode === 'shell') {
        runShell();
    } else {
        runConfig(config);
    }
}
main();



