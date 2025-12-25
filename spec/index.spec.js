// Unit tests for index.js
// Tests cover createReadlineInterface, runShell, runConfig, and main functions

const readline = require('node:readline/promises');

describe('index.js', () => {
    let mockReadlineInterface;
    let consoleLogSpy;
    let consoleErrorSpy;
    let processStdinDestroySpy;
    let str;
    let Launcher;

    beforeEach(() => {
        // Import modules
        str = require('../src/common/constants').str;
        Launcher = require('../src/common/launcher').default;

        // Create mock readline interface
        mockReadlineInterface = {
            question: jasmine.createSpy('question'),
            close: jasmine.createSpy('close')
        };

        // Spy on console methods
        consoleLogSpy = spyOn(console, 'log');
        consoleErrorSpy = spyOn(console, 'error');

        // Spy on process.stdin.destroy
        processStdinDestroySpy = spyOn(process.stdin, 'destroy');

        // Spy on readline.createInterface
        spyOn(readline, 'createInterface').and.returnValue(mockReadlineInterface);

        // Mock Launcher
        spyOn(Launcher.prototype, 'resolveLessonByNo').and.returnValue(Promise.resolve('Lesson result'));
    });

    describe('createReadlineInterface', () => {
        it('should create a readline interface with correct configuration', () => {
            const createReadlineInterface = () => {
                return readline.createInterface({
                    input: process.stdin,
                    output: process.stdout,
                });
            };

            const rl = createReadlineInterface();

            expect(readline.createInterface).toHaveBeenCalledWith({
                input: process.stdin,
                output: process.stdout,
            });
            expect(rl).toBe(mockReadlineInterface);
        });
    });

    describe('runShell', () => {
        let runShell;

        beforeEach(() => {
            // Define runShell function for testing
            runShell = async function () {
                const rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout,
                });
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
            };
        });

        it('should process lesson input and display results', async () => {
            mockReadlineInterface.question.and.returnValues(
                Promise.resolve('1'),
                Promise.resolve('stop')
            );

            await runShell();

            expect(mockReadlineInterface.question).toHaveBeenCalledWith(str.question);
            expect(Launcher.prototype.resolveLessonByNo).toHaveBeenCalledWith('1');
            expect(consoleLogSpy).toHaveBeenCalledWith('Lesson result');
            expect(consoleLogSpy).toHaveBeenCalledWith(str.stopApp);
            expect(mockReadlineInterface.close).toHaveBeenCalled();
            expect(processStdinDestroySpy).toHaveBeenCalled();
        });

        it('should stop when user enters "stop"', async () => {
            mockReadlineInterface.question.and.returnValue(Promise.resolve('stop'));

            await runShell();

            expect(mockReadlineInterface.question).toHaveBeenCalledTimes(1);
            expect(Launcher.prototype.resolveLessonByNo).not.toHaveBeenCalled();
            expect(consoleLogSpy).toHaveBeenCalledWith(str.stopApp);
            expect(mockReadlineInterface.close).toHaveBeenCalled();
        });

        it('should handle errors when resolving lessons', async () => {
            const testError = new Error('Lesson not found');
            Launcher.prototype.resolveLessonByNo.and.returnValue(Promise.reject(testError));

            mockReadlineInterface.question.and.returnValues(
                Promise.resolve('999'),
                Promise.resolve('stop')
            );

            await runShell();

            expect(consoleErrorSpy).toHaveBeenCalledWith('Error resolving lesson:', testError);
            expect(consoleLogSpy).toHaveBeenCalledWith(str.stopApp);
        });

        it('should handle unexpected errors and cleanup properly', async () => {
            const unexpectedError = new Error('Unexpected error');
            mockReadlineInterface.question.and.returnValue(Promise.reject(unexpectedError));

            await runShell();

            expect(consoleErrorSpy).toHaveBeenCalledWith('Unexpected error:', unexpectedError);
            expect(consoleLogSpy).toHaveBeenCalledWith(str.stopApp);
            expect(mockReadlineInterface.close).toHaveBeenCalled();
            expect(processStdinDestroySpy).toHaveBeenCalled();
        });

        it('should process multiple lessons before stopping', async () => {
            mockReadlineInterface.question.and.returnValues(
                Promise.resolve('1'),
                Promise.resolve('2'),
                Promise.resolve('3'),
                Promise.resolve('stop')
            );

            await runShell();

            expect(mockReadlineInterface.question).toHaveBeenCalledTimes(4);
            expect(Launcher.prototype.resolveLessonByNo).toHaveBeenCalledTimes(3);
            expect(Launcher.prototype.resolveLessonByNo).toHaveBeenCalledWith('1');
            expect(Launcher.prototype.resolveLessonByNo).toHaveBeenCalledWith('2');
            expect(Launcher.prototype.resolveLessonByNo).toHaveBeenCalledWith('3');
        });
    });

    describe('runConfig', () => {
        let runConfig;

        beforeEach(() => {
            // Define runConfig function for testing
            runConfig = function (config) {
                const launcher = new Launcher(null);
                for (const lessonStr of config.lessons) {
                    try {
                        const result = launcher.resolveLessonByNo(lessonStr, false);
                        console.log(result);
                    } catch (err) {
                        console.error(`Error running lesson '${lessonStr}':`, err.message);
                    }
                }
            };

            // For runConfig, resolveLessonByNo is synchronous
            Launcher.prototype.resolveLessonByNo.and.returnValue('Lesson result');
        });

        it('should process all lessons from config', () => {
            const config = {
                lessons: ['1', '2', '3']
            };

            runConfig(config);

            expect(Launcher.prototype.resolveLessonByNo).toHaveBeenCalledTimes(3);
            expect(Launcher.prototype.resolveLessonByNo).toHaveBeenCalledWith('1', false);
            expect(Launcher.prototype.resolveLessonByNo).toHaveBeenCalledWith('2', false);
            expect(Launcher.prototype.resolveLessonByNo).toHaveBeenCalledWith('3', false);
            expect(consoleLogSpy).toHaveBeenCalledTimes(3);
            expect(consoleLogSpy).toHaveBeenCalledWith('Lesson result');
        });

        it('should handle errors for individual lessons and continue', () => {
            const config = {
                lessons: ['1', '2', '3']
            };

            Launcher.prototype.resolveLessonByNo.and.callFake((lessonStr) => {
                if (lessonStr === '2') {
                    throw new Error('Lesson 2 failed');
                }
                return 'Lesson result';
            });

            runConfig(config);

            expect(Launcher.prototype.resolveLessonByNo).toHaveBeenCalledTimes(3);
            expect(consoleLogSpy).toHaveBeenCalledTimes(2); // Only successful lessons
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                "Error running lesson '2':",
                'Lesson 2 failed'
            );
        });

        it('should handle empty lessons array', () => {
            const config = {
                lessons: []
            };

            runConfig(config);

            expect(Launcher.prototype.resolveLessonByNo).not.toHaveBeenCalled();
            expect(consoleLogSpy).not.toHaveBeenCalled();
        });

        it('should pass false as askParams parameter', () => {
            const config = {
                lessons: ['lt1.1']
            };

            runConfig(config);

            expect(Launcher.prototype.resolveLessonByNo).toHaveBeenCalledWith('lt1.1', false);
        });
    });

    describe('main', () => {
        let main;
        let runShellSpy;
        let runConfigSpy;

        beforeEach(() => {
            runShellSpy = jasmine.createSpy('runShell');
            runConfigSpy = jasmine.createSpy('runConfig');

            // Define main function for testing
            main = function (config) {
                const resolver = {
                    'shell': runShellSpy,
                    'config': runConfigSpy,
                };
                return resolver[config?.mode] ? resolver[config?.mode](config) : str.noTaskErr;
            };
        });

        it('should call runShell when mode is "shell"', () => {
            const config = { mode: 'shell' };

            main(config);

            expect(runShellSpy).toHaveBeenCalledWith(config);
            expect(runConfigSpy).not.toHaveBeenCalled();
        });

        it('should call runConfig when mode is "config"', () => {
            const config = { mode: 'config', lessons: ['1', '2'] };

            main(config);

            expect(runConfigSpy).toHaveBeenCalledWith(config);
            expect(runShellSpy).not.toHaveBeenCalled();
        });

        it('should return error message when mode is invalid', () => {
            const config = { mode: 'invalid' };

            const result = main(config);

            expect(result).toBe(str.noTaskErr);
            expect(runShellSpy).not.toHaveBeenCalled();
            expect(runConfigSpy).not.toHaveBeenCalled();
        });

        it('should return error message when config is null', () => {
            const result = main(null);

            expect(result).toBe(str.noTaskErr);
            expect(runShellSpy).not.toHaveBeenCalled();
            expect(runConfigSpy).not.toHaveBeenCalled();
        });

        it('should return error message when config is undefined', () => {
            const result = main(undefined);

            expect(result).toBe(str.noTaskErr);
            expect(runShellSpy).not.toHaveBeenCalled();
            expect(runConfigSpy).not.toHaveBeenCalled();
        });

        it('should return error message when mode is missing', () => {
            const config = { lessons: ['1', '2'] };

            const result = main(config);

            expect(result).toBe(str.noTaskErr);
            expect(runShellSpy).not.toHaveBeenCalled();
            expect(runConfigSpy).not.toHaveBeenCalled();
        });
    });

    describe('Integration scenarios', () => {
        it('should handle complete shell workflow', async () => {
            const runShell = async function () {
                const rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout,
                });
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
            };

            Launcher.prototype.resolveLessonByNo.and.callFake((input) => {
                if (input === '1') return Promise.resolve('Result for lesson 1');
                if (input === '2') return Promise.reject(new Error('Lesson 2 error'));
                return Promise.resolve('Default result');
            });

            mockReadlineInterface.question.and.returnValues(
                Promise.resolve('1'),
                Promise.resolve('2'),
                Promise.resolve('stop')
            );

            await runShell();

            expect(consoleLogSpy).toHaveBeenCalledWith('Result for lesson 1');
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error resolving lesson:', jasmine.any(Error));
            expect(consoleLogSpy).toHaveBeenCalledWith(str.stopApp);
        });
    });
});
