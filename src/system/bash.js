import parser from "https://unpkg.com/yargs-parser@19.0.0/browser.js";
import { FileSystem } from "./filesystem";
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
    constructor(name, alias = undefined, help = undefined) {
        this.name = name;
        this.alias = alias;
        this.help = help;
    }
}

export class Arg {
    constructor(name, help) {
        this.name = name;
        this.help = help;
    }
}

export class Command {
    constructor(name, flags, args, help) {
        this.flags = flags;
        this.args = args;
        this.help = help;
        this.name = name;
        this.args = [];
        this.kwargs = {};
    }

    toString() {
        return `${this.name}`;
    }

    parse(cmd) {
        let { _: args, ...kwargs } = parser(cmd);
        this.args = args;
        this.kwargs = kwargs;
    }

    execute(system) {}
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
    console.log(res);
    console.log(res.tokens);
    return res;
}
