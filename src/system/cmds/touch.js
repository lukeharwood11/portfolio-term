import { File, Directory } from "../filesystem";
import { Flag, Command, Arg, Result, ResultStatus } from "../bash";

const flags = [];
const args = [
    new Arg("FILE", "File to touch."),
];

export class TouchCommand extends Command {

    constructor() {
        super(
            "touch",
            flags,
            args,
            "Create a file"
        );
    }

    execute(args, kwargs, connection) {
        if (args.length < 2) {
            return new Result(
                "touch: missing file",
                ResultStatus.IMPROPER_COMMAND
            );
        }

        const path = args[1];
        // partial resolve
        const { node, unresolvedPath } = connection.system.fs.getPartialItem(connection.cwd, path);
        
        if (unresolvedPath.length > 1) {
            // couldn't resolve path (i.e. directory doesn't exist)
            return new Result(
                `touch: ${path}: No such file or directory`,
                ResultStatus.IMPROPER_COMMAND
            );
        } else if (unresolvedPath.length === 1) {
            // file doesn't exist, create it
            const name = unresolvedPath[0];
            const file = new File(name, "");
            node.addItems([file]);
        }
        // In the future, implement updating the last modified time
        return new Result();
    }
}