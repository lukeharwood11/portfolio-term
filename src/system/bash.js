import { FileSystem } from "./filesystem";

export class Tokens {
    constructor(raw) {
        this.raw = raw;
        this.tokens = [];
        this.error = undefined;
    }

    add(token) {
        this.tokens.push(token);
    }
}

export const ResultStatus = {
    // https://www.geeksforgeeks.org/how-to-use-exit-code-to-read-from-terminal-from-script-and-with-logical-operators/
    SUCCESS: 0,
    ERROR: 1,
    IMPROPER_COMMAND: 2,
};

export class Result {
    constructor(out = "", status = ResultStatus.SUCCESS) {
        this.out = out;
        this.status = status;
    }
}

export class Flag {
    constructor(name, alias = undefined, help = undefined) {
        this.name = name;
        this.alias = alias;
        this.help = help;
    }
}

export class Arg {
    constructor(name, help, defaultValue = undefined) {
        this.name = name;
        this.help = help;
        this.default = defaultValue;
    }
}

export class Command {
    constructor(name, flags, args, help, alt = undefined) {
        this.name = name;
        this.flags = flags;
        this.args = args;
        this.help = help;
        this.alt = alt;
    }

    toString() {
        return `${this.name}`;
    }

    execute(args, kwargs, connection) {}
}

function insertIntoObject(obj, key, value) {
    const existingValue = obj[key];
    if (existingValue) {
        if (existingValue instanceof Array) {
            existingValue.push(value);
        } else {
            const newArray = [existingValue, value];
            obj[key] = newArray;
        }
    } else {
        obj[key] = value;
    }
}

export function parseFlags(tokens) {
    const flagReg = /--([a-zA-Z]+)|-([a-zA-Z]+)/;
    const kwargs = {};
    const args = [];
    const seen = new Set([]);
    for (let i = 0; i < tokens.length; ++i) {
        if (seen.has(i)) {
            continue;
        }
        const token = tokens[i];
        const regexResult = flagReg.exec(token);
        if (regexResult === null) {
            args.push(token);
        } else {
            // true if it is the last value or if the next value is a flag, otherwise it's the value of the next token
            let value;
            if (i === tokens.length - 1 || flagReg.test(tokens[i + 1])) {
                value = true;
            } else {
                value = tokens[i + 1];
                seen.add(i + 1);
            }
            // for both cases, if the value already exists in the result, change to list and append
            if (regexResult[1] !== undefined) {
                // does value exist?
                insertIntoObject(kwargs, regexResult[1], value);
            } else if (regexResult[2] !== undefined) {
                // parse through each character in the flag
                for (let c = 0; c < regexResult[2].length; ++c) {
                    insertIntoObject(kwargs, regexResult[2][c], value);
                }
            }
        }
    }
    return {
        args,
        kwargs,
    };
}

// will need this for first parsing
export function tokenize(cmd) {
    // returns a list of strings
    const res = new Tokens(cmd);
    let buffer = "";
    let inString = undefined;
    for (let i = 0; i < cmd.length; i++) {
        const char = cmd[i];
        if (char === " " && !inString && buffer.trim() !== "") {
            res.add(buffer.trim());
            buffer = "";
        } else if (char === inString) {
            // only terminate the string if the quotes are of the same type
            inString = undefined;
        } else {
            if (char === "'" || char === '"') {
                inString = char;
            } else {
                buffer += char;
            }
        }
    }
    if (inString) {
        res.error = `String not terminated: '${buffer}'`;
    } else if (buffer.trim() !== "") {
        res.add(buffer);
    }
    return res;
}
