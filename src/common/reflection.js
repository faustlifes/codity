export class Reflection {

    static #STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    //static ARGUMENT_NAMES = /([^\s,]+)/g;

    // Type detection patterns
    static typePatterns = [
        {type: 'string', regex: /^['"].*['"]$/, constructor: (s) => s},
        {type: 'Object', regex: /^\{.*\}$/, constructor: (str) => JSON.parse(str)},
        {type: 'Array', regex: /^\[.*\]$/, constructor: (str) => JSON.parse(str)},
        {type: 'number', regex: /^[0-9]+(\.[0-9]+)?$/, constructor: (str) => !isNaN(str) ? parseFloat(str) : undefined},
        {type: 'bool', regex: /^(true|false)$/, constructor: (bool) => bool === 'true'},
    ];

    static getFunctionParams(func) {
        const fnStr = func.toString().replace(this.#STRIP_COMMENTS, '');
        //const paramStr = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.lastIndexOf(')')).trim();
        const paramStr = this.#getStringParams(func);
        // const paramList = paramStr.match(this.ARGUMENT_NAMES) || [];

        // Parse parameter list, handling nested structures for objects and arrays
        const paramList = [];
        let depth = 0;
        let currentParam = '';

        for (const char of paramStr) {
            if (char === ',' && depth === 0) {
                if (currentParam.trim()) {
                    paramList.push(currentParam.trim());
                }
                currentParam = '';
            } else {
                if (char === '{' || char === '[') depth++;
                if (char === '}' || char === ']') depth--;
                currentParam += char;
            }
        }

        // Add the last parameter if present
        if (currentParam.trim()) {
            paramList.push(currentParam.trim());
        }

        // Parse parameter names and infer types
        return paramList.map(param => {
            const [name, defaultValue] = param.split('=').map(p => p.trim());
            const type = defaultValue
                ? this.typePatterns.find(pattern => pattern.regex.test(defaultValue))?.type || ''
                : '';

            return {name, type};
        });
    }

    static createTypes(stringParameters = [], parameters = [{name: '', type: ''}]) {
        const typesPattern = {
            'string': (s) => s,
            'Object': (str) => JSON.parse(str),
            'Array': (str) => JSON.parse(str),
            'number': (str) => !isNaN(str) ? parseFloat(str) : undefined,
            'bool': (bool) => bool === 'true',
        }
        return stringParameters.map((p, index) => {
            return typesPattern[parameters[index]?.type] ? typesPattern[parameters[index]?.type](p) : p
        });
    }

    static #getStringParams(inputFunc) {

        const funcStr = inputFunc.toString().replace(/\s/g, '');
        let firstBr = false;
        let lastBr = false;
        let result = '';
        let paramValueStarted = false;
        let paramValueEnded = false;
        let isString = false;


        for (let i = 0; i < funcStr.length; i++) {
            const char = funcStr[i];
            const nextChar = funcStr[i + 1];

            firstBr = firstBr || funcStr[i - 1] === '(';
            isString = (isString && nextChar !== `'`) || (char === '=' && nextChar === `'`);
            paramValueStarted = (char === '=') || nextChar !== ',';
            paramValueEnded = nextChar === ',';
            lastBr = (!isString && nextChar === ')');

            if (firstBr) {
                result += char;
            }
            if (lastBr) {
                break;
            }

        }

        return result;
    }
}


