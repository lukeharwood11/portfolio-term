import { File, Directory } from "../filesystem";
import { Flag, Command, Arg, Result, ResultStatus } from "../bash";

const flags = [];
const args = [
    new Arg("DIRECTORY", "Directory to create."),
];

export class MkdirCommand extends Command {

    constructor() {
        super(
            "mkdir",
            flags,
            args,
            "Create a directory"
        );
    }

    execute(args, kwargs, connection) {
        if (args.length < 2) {
            return new Result(
                "mkdir: missing directory",
                ResultStatus.IMPROPER_COMMAND
            );
        }

        const path = args[1];
        // partial resolve
        const { node, unresolvedPath } = connection.system.fs.getPartialItem(connection.cwd, path);
        
        if (unresolvedPath.length > 1) {
            // couldn't resolve path (i.e. directory doesn't exist)
            return new Result(
                `mkdir: ${path}: No such file or directory`,
                ResultStatus.IMPROPER_COMMAND
            );
        } else if (unresolvedPath.length === 1) {
            // directory doesn't exist, create it
            const name = unresolvedPath[0];
            const directory = new Directory(name);
            node.addItems([directory]);
        }
        return new Result();
    }
}