import { Flag, Command, Arg, Result, ResultStatus } from "../bash";

const flags = [];
const args = [];
const help = "Exit the shell.";

export class ExitCommand extends Command {
    constructor() {
        super("exit", flags, args, help);
    }

    execute(args, kwargs, connection) {
        return new Result("You thought you could leave... lol");
    }
}
