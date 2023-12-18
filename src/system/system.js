export class System {
    constructor(fs, commands, env) {
        this.fs = fs;
        this.env = env;
        this.commands = commands;
    }

    execute(cmd, stdIn, stdOut) {}
}
