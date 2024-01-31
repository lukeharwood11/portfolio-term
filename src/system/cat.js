import { File, Directory } from "./filesystem";
import { Result, ResultStatus, Command, Arg, Flag } from "./bash";

const flags = [];
const args = [
    new Arg("...FILE", "Files to concatenate"),
];

export class CatCommand extends Command {
    constructor() {
        super(
            "cat",
            flags,
            args,
            "Concatenate files and print on the standard output"
        );
    }

    execute(args, kwargs, connection) {
        // all args should be files
        if (args.length < 2) {
            return new Result(
                "cat: missing file",
                ResultStatus.IMPROPER_COMMAND
            );
        }

        let output = "";
        for (let i = 1; i < args.length; i++) {
            const path = args[i];
            const file = connection.system.fs.getItem(connection.cwd, path);
            if (!file.isDirectory) {
                if (!file.canRead()) {
                    return new Result(
                        `cat: ${file.name}: Permission denied`,
                        ResultStatus.IMPROPER_COMMAND
                    );
                }
                output += (file.text + "\n");
            } else {
                return new Result(
                    `cat: ${file.name}: Is a directory`,
                    ResultStatus.IMPROPER_COMMAND
                );
            }
        }

        return new Result(output);
    }
}
