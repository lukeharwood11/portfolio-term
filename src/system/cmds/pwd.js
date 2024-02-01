import { Command, Result, ResultStatus } from "../bash";

export class PwdCommand extends Command {

    constructor() {
        super(
            "pwd",
            [],
            [],
            "Print the name of the current working directory"
        );
    }

    execute(args, kwargs, connection) {
        if (args.length > 1) {
            return new Result(
                "pwd: too many arguments",
                ResultStatus.IMPROPER_COMMAND
            );
        } else if (Object.keys(kwargs).length > 0) {
            return new Result(
                "pwd: does not accept any flags",
                ResultStatus.IMPROPER_COMMAND
            );
        }

        const dir = connection.system.fs.getItem(connection.cwd, connection.cwd);
        return new Result(dir.getAbsolutePath());
    }
}