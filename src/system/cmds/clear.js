import { Result, Command } from "../bash";

const flags = [];
const args = [];
const help = "Clear the console";

export class ClearCommand extends Command {
    constructor() {
        super("clear", flags, args, help, undefined);
    }

    execute(args, kwargs, connection) {
        connection.setBufferIndex(connection.buffer.length);
        return new Result("");
    }
}
