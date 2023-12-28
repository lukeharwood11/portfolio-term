import { Command, Arg, Result, ResultStatus } from "../bash";

const flags = [];
const args = [new Arg("dir", "The directory to change to.")];
const help = `Change the shell working directory.
Change the current directory to DIR.  The default DIR is the value of the
HOME shell variable.

The variable CDPATH defines the search path for the directory containing
DIR.  Alternative directory names in CDPATH are separated by a colon (:).
A null directory name is the same as the current directory.  If DIR begins
with a slash (/), then CDPATH is not used.

If the directory is not found, and the shell option \`cdable_vars' is set,
the word is assumed to be  a variable name.  If that variable has a value,
its value is used for DIR.`;

export class CdCommand extends Command {
    constructor() {
        super("cd", flags, args, help);
    }

    execute(args, _, connection) {
        if (args.length > 2) {
            return new Result(
                "Too many arguments",
                ResultStatus.IMPROPER_COMMAND
            );
        }
        const pathInput = args.length == 2 ? args[1] : "~"; // default to $HOME
        const absolutePath = connection.system.fs.resolve(
            connection.cwd,
            pathInput
        );
        console.table({ pathInput, absolutePath });
        return new Result();
    }
}
