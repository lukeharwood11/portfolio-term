import { Command, Flag, Arg, Result, ResultStatus } from "../bash";
import { Directory, File } from "../filesystem";

const flags = [];
const args = [
    new Arg("...TEXT", "Text to echo"),
];

export class EchoCommand extends Command {
    constructor() {
        super(
            "echo",
            flags,
            args,
            "Display a line of text"
        );
    }

    execute(args, kwargs, connection) {
        if (Object.keys(kwargs).length > 0) {
            return new Result(
                "echo: does not accept any flags",
                ResultStatus.IMPROPER_COMMAND
            );
        }
        return new Result(args.slice(1).join(" "));
    }
}