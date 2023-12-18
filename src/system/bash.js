export class Parser {
    static isFlag(token) {
        return token.s;
    }
}

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

export class Result {
    constructor(out, status) {
        this.out = out;
        this.status = status;
    }
}

export class Flag {
    constructor(
        long,
        short = undefined,
        type = "string",
        defaultValue = undefined
    ) {
        this.type = type;
        this.long = long;
        this.short = short;
        this.defaultValue = defaultValue;
        this.value = defaultValue;
        if (
            ["string", "boolean", "list", "number"].find((c) => c === type) ===
            undefined
        ) {
            throw `Invalid flag type '${type}'`;
        }
    }

    isMatch(token) {
        return token === `--${this.long}` || token === `-${this.short}`;
    }

    parse(args) {
        // this assumes the flag itself was removed from the args
        // return the value for the flag
        switch (this.type) {
            case "string":
                // grab next value as is
                if (args.length === 0) {
                    throw `Expecting value for '${this.long}'`;
                }
                this.value = args.shift();
                break;
            case "boolean":
                this.value = true;
                break;
            case "number":
                if (args.length === 0) {
                    throw `Expecting value for '${this.long}'`;
                }
                const val = args.shift();
                this.value = parseFloat(val);
                if (this.value === undefined) {
                    throw `Expecting number value for '${this.long}' found: '${val}'`;
                }
                break;
            case "list":
                this.value = [];
                for (let arg in args) {
                    if (Parser.isFlag(arg)) {
                        break;
                    }
                    this.value.push(arg);
                }
                break;
            default:
                console.error(
                    `THIS SHOULDN'T HAPPEN! FLAG TYPE '${this.type}'`
                );
                break;
        }
    }
}

export class Arg {
    constructor(key, type, required = false, defaultValue = undefined) {
        this.key = key;
        this.type = type;
        this.required = required;
        this.defaultValue = defaultValue;
        if (
            ["string", "boolean", "list", "number"].find((c) => c === type) ===
            undefined
        ) {
            throw `Invalid flag type '${type}'`;
        }
    }

    parse(args) {
        // this assumes the flag itself was removed from the args
        // return the value for the flag
        switch (this.type) {
            case "string":
                // grab next value as is
                if (args.length === 0 && this.required) {
                    if (this.required) {
                        throw `Expecting value for '${this.key}'`;
                    } else {
                        break;
                    }
                }
                this.value = args.shift();
                break;
            case "number":
                if (args.length === 0 && this.required) {
                    if (this.required) {
                        throw `Expecting value for '${this.key}'`;
                    } else {
                        break;
                    }
                }
                const val = args.shift();
                this.value = parseFloat(val);
                if (this.value === undefined) {
                    throw `Expecting number value for '${this.long}' found: '${val}'`;
                }
                break;
            case "list":
                this.value = [];
                for (let arg in args) {
                    this.value.push(arg);
                }
                break;
            default:
                console.error(
                    `THIS SHOULDN'T HAPPEN! FLAG TYPE '${this.type}'`
                );
                break;
        }
    }
}

export class Command {
    constructor(flags, positionalArgs) {
        this.flags = flags;
        this.positionalArgs = positionalArgs;
        this.variables = {};
    }

    parse(args) {
        // first parse all flags, when flags are exhausted, load in positional arguments
        for (let arg in args) {
            console.log(arg);
        }
    }

    execute() {}
}

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
    console.log(res);
    console.log(res.tokens);
    return res;
}

tokenize("cmd -arg -arg2 -arg3 'string with spaces'");
