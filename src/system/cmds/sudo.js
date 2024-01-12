import { Command, Result, Arg } from "../bash";

export class SudoCommand extends Command {
    constructor() {
        super(
            "sudo",
            [],
            [new Arg("...CMD", "Commands to run with sudo privileges")],
            "Execute commands with root user privileges"
        );
    }

    execute(args, kwargs, connection) {
        const msg = `Attempted to run using \`sudo\` priviledges without proper authority.

This action has been reported to the system administrator ;)`;
        return new Result(msg);
    }
}
