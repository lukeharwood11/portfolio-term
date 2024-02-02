import { Command, Result, ResultStatus, Arg, Flag } from "../bash";

const flags = [
    new Flag("recursive", "r", "remove directories and their contents recursively"),
];

const args = [
    new Arg("...FILE", "files to remove"),
]

export class RmCommand extends Command {

    constructor() {
        super(
            "rm",
            flags,
            args,
            "Remove files"
        );
    }

    execute(arg, kwargs, connection) {
        console.table(arg)
        console.table(kwargs);
        if (arg.length < 2) {
            return new Result(
                "rm: missing FILE",
                ResultStatus.IMPROPER_COMMAND
            );
        }
        const cwd = connection.system.fs.getItem(connection.cwd);
        for (let i = 1; i < arg.length; i++) {
            const path = arg[i];
            const node = connection.system.fs.getItem(connection.cwd, path);
            if (!node) {
                return new Result(
                    `rm: ${path}: No such file or directory`,
                    ResultStatus.IMPROPER_COMMAND
                );
            }
            if (node.isDirectory && !(kwargs.recursive || kwargs.r)) {
                return new Result(
                    `rm: ${path}: is a directory. Use -r to remove directories.`,
                    ResultStatus.IMPROPER_COMMAND
                );
            }
            console.log(node)
            if (node.protected || cwd.getAbsolutePath().startsWith(node.getAbsolutePath())) {
                return new Result(
                    `rm: ${path}: Permission denied`,
                    ResultStatus.IMPROPER_COMMAND
                );
            }

            node.parentDir.items = node.parentDir.items.filter(item => item !== node);
        }
        return new Result();
    }
}