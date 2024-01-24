import { parseFlags, Result, ResultStatus, tokenize } from "./bash";

/**
 * Serves as an interface between a single terminal and the underlying system
 */
export class SystemConnection {
    constructor(system) {
        this.system = system;
        this.cwd = undefined;
        this.setCwd = undefined;
        this.stdOut = undefined;
        this.buffer = undefined;
        this.setBufferIndex = undefined;
    }

    execute(cmd, stdOut, cwd, setCwd, buffer, setBufferIndex) {
        this.stdOut = stdOut;
        this.cwd = cwd;
        this.setCwd = setCwd;
        this.buffer = buffer;
        this.setBufferIndex = setBufferIndex;
        return this.system.execute(cmd, this);
    }
}

export class System {
    constructor(fs, commands, env, help) {
        this.fs = fs;
        this.commands = commands;
        this.env = env;
        this.help = help;
    }

    execute(cmd, connection) {
        const tokenResult = tokenize(cmd);
        if (tokenResult.error) {
            return new Result(tokenResult.error, ResultStatus.ERROR);
        }
        const tokens = tokenResult.tokens;
        const { args, kwargs } = parseFlags(tokens);
        console.log(tokens);
        console.table(args);
        console.table(kwargs);
        // find command
        if (tokens.length === 0) {
            return new Result();
        }

        const userCmd = tokens[0];
        let command;
        for (let i = 0; i < this.commands.length; ++i) {
            const c = this.commands[i];
            console.log(c, userCmd);
            if (c.alt === userCmd || c.name === userCmd) {
                command = c;
                break;
            }
        }
        if (command) {
            return command.execute(args, kwargs, connection);
        } else {
            return new Result(
                `${userCmd}: command not found`,
                ResultStatus.ERROR
            );
        }
    }
}
