/**
 * reflection.js
 * Provides utilities for function parameter introspection and type conversion.
 */

export class Reflection {
    // Type detection patterns for parameter inference
    static typePatterns = [
        { type: 'string', regex: /^['"].*['"]$/, constructor: (s) => s },
        { type: 'Object', regex: /^\{.*\}$/, constructor: (str) => JSON.parse(str) },
        { type: 'Array', regex: /^\[.*\]$/, constructor: (str) => JSON.parse(str) },
        { type: 'number', regex: /^[0-9]+(\.[0-9]+)?$/, constructor: (str) => !isNaN(str) ? parseFloat(str) : undefined },
        { type: 'bool', regex: /^(true|false)$/, constructor: (bool) => bool === 'true' },
    ];

    /**
     * Returns parameter names and inferred types for a given function.
     * @param {Function} func - The function to introspect.
     * @return {Array<{name: string, type: string}>}
     */
    static getFunctionParams(func) {
        const paramStr = this.#getStringParams(func);
        const paramList = [];
        let depth = 0;
        let currentParam = '';
        for (const char of paramStr) {
            if (char === ',' && depth === 0) {
                if (currentParam.trim()) paramList.push(currentParam.trim());
                currentParam = '';
            } else {
                if (char === '{' || char === '[') depth++;
                if (char === '}' || char === ']') depth--;
                currentParam += char;
            }
        }
        if (currentParam.trim()) paramList.push(currentParam.trim());
        // Parse parameter names and infer types
        return paramList.map(param => {
            const [name, defaultValue] = param.split('=').map(p => p.trim());
            const type = defaultValue
                ? this.typePatterns.find(pattern => pattern.regex.test(defaultValue))?.type || ''
                : '';
            return { name, type };
        });
    }

    /**
     * Converts string parameters to their inferred types based on parameter definitions.
     * @param {Array<string>} stringParameters - User input parameters as strings.
     * @param {Array<{name: string, type: string}>} parameters - Parameter definitions.
     * @return {Array<*>} - Typed parameters.
     */
    static createTypes(stringParameters = [], parameters = [{ name: '', type: '' }]) {
        const typesPattern = {
            'string': (s) => s,
            'Object': (str) => JSON.parse(str),
            'Array': (str) => JSON.parse(str),
            'number': (str) => !isNaN(str) ? parseFloat(str) : undefined,
            'bool': (bool) => bool === 'true',
        };
        return stringParameters.map((p, index) => {
            return typesPattern[parameters[index]?.type]
                ? typesPattern[parameters[index]?.type](p)
                : p;
        });
    }

    /**
     * Extracts the parameter string from a function definition.
     * @param {Function} inputFunc - The function to extract parameters from.
     * @return {string} - The raw parameter string.
     */
    static #getStringParams(inputFunc) {
        const funcStr = inputFunc.toString().replace(/\s/g, '');
        let result = '';
        let firstBr = false;
        let isString = false;
        for (let i = 0; i < funcStr.length; i++) {
            const char = funcStr[i];
            const nextChar = funcStr[i + 1];
            // Update flags
            firstBr ||= funcStr[i - 1] === '(';
            isString = (isString && nextChar !== `'`) || (char === '=' && nextChar === `'`);
            const lastBr = !isString && nextChar === ')';
            // Append characters after the first opening parenthesis
            if (firstBr) result += char;
            // Stop at the closing parenthesis
            if (lastBr) break;
        }
        return result;
    }
}


