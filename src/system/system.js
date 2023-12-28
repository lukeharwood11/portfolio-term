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
    }

    execute(cmd, stdOut, cwd, setCwd) {
        this.stdOut = stdOut;
        this.cwd = cwd;
        this.setCwd = setCwd;
        return this.system.execute(cmd, this);
    }
}

export class System {
    constructor(fs, commands, env) {
        this.fs = fs;
        this.commands = commands;
        this.env = env;
    }

    execute(cmd, connection) {
        const tokenResult = tokenize(cmd);
        if (tokenResult.error) {
            return Result(tokens.error, ResultStatus.ERROR);
        }
        const tokens = tokenResult.tokens;
        const { args, kwargs } = parseFlags(tokens);
        console.log(tokens);
        console.table(args);
        console.table(kwargs);
        // find command
        if (tokens.length === 0) {
            return Result();
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
