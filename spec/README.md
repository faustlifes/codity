# Unit Tests for index.js

This directory contains comprehensive unit tests for the Codity CLI application.

## Test Framework

- **Jasmine** - BDD testing framework
- **Babel** - ES6+ transpilation support

## Test Structure

```
spec/
├── support/
│   └── jasmine.json          # Jasmine configuration
├── helpers/
│   └── babel-register.js     # Babel transpilation setup
└── index.spec.js             # Unit tests for src/index.js
```

## Running Tests

```bash
npm test
```

## Test Coverage

The `index.spec.js` file covers all functions in `src/index.js`:

### 1. **createReadlineInterface**
- ✓ Creates readline interface with correct configuration

### 2. **runShell** (Interactive Shell Mode)
- ✓ Processes lesson input and displays results
- ✓ Stops when user enters "stop"
- ✓ Handles errors when resolving lessons
- ✓ Handles unexpected errors and cleanup properly
- ✓ Processes multiple lessons before stopping

### 3. **runConfig** (Config File Mode)
- ✓ Processes all lessons from config
- ✓ Handles errors for individual lessons and continues
- ✓ Handles empty lessons array
- ✓ Passes false as askParams parameter

### 4. **main** (Entry Point)
- ✓ Calls runShell when mode is "shell"
- ✓ Calls runConfig when mode is "config"
- ✓ Returns error message when mode is invalid
- ✓ Returns error message when config is null
- ✓ Returns error message when config is undefined
- ✓ Returns error message when mode is missing

### 5. **Integration Scenarios**
- ✓ Handles complete shell workflow with mixed success/error cases

## Test Statistics

- **Total Specs**: 17
- **Test Files**: 1
- **Code Coverage**: All functions in index.js

## Mocking Strategy

The tests use Jasmine spies to mock:
- `readline.createInterface()` - Mock readline interface
- `console.log()` - Capture console output
- `console.error()` - Capture error messages
- `process.stdin.destroy()` - Mock process cleanup
- `Launcher.prototype.resolveLessonByNo()` - Mock lesson resolution

## Key Testing Patterns

1. **Async/Await Testing**: Tests properly handle asynchronous operations
2. **Error Handling**: Comprehensive error scenario coverage
3. **Cleanup Verification**: Ensures proper resource cleanup (readline close, stdin destroy)
4. **Edge Cases**: Tests null/undefined configs, empty arrays, invalid modes
5. **Integration Testing**: Tests complete workflows with multiple operations

## Adding New Tests

To add tests for other files:

1. Create a new spec file in the `spec/` directory (e.g., `launcher.spec.js`)
2. Follow the naming convention: `*.spec.js`
3. Use CommonJS syntax (`require`) for imports to work with Babel
4. Run `npm test` to execute all tests

## Notes

- Tests use CommonJS (`require`) instead of ES6 imports to work seamlessly with Babel transpilation
- The test suite mocks external dependencies to ensure isolated unit testing
- All tests are independent and can run in any order
