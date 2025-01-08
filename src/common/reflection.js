export class Reflection {

    static STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    static ARGUMENT_NAMES = /([^\s,]+)/g;

    static getParamNames(func) {
        const fnStr = func.toString().replace(this.STRIP_COMMENTS, '');
        const paramStr = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')'));
        const paramList = paramStr.match(this.ARGUMENT_NAMES) || [];

        // Type detection patterns
        const typePatterns = [
            {type: 'string', regex: /^['"].*['"]$/},
            {type: 'Object', regex: /^\{.*\}$/},
            {type: 'Array', regex: /^\[.*\]$/},
            {type: 'number', regex: /^[0-9]+(\.[0-9]+)?$/},
            {type: 'bool', regex: /^(true|false)$/}
        ];

        // Parse parameter names and infer types
        return paramList.map(param => {
            const [name, defaultValue] = param.split('=').map(p => p.trim());
            const type = defaultValue
                ? typePatterns.find(pattern => pattern.regex.test(defaultValue))?.type || ''
                : '';

            return {name, type};
        });
    }
}


