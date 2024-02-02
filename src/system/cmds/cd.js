import { Flag, Command, Arg, Result, ResultStatus } from "../bash";

const flags = [new Flag("help")];
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

    execute(args, kwargs, connection) {
        // for consistency, ensure we're always using relative paths
        const cwd = connection.system.fs.simplifyPath(connection.cwd);
        if (args.length > 2) {
            return new Result(
                "Too many arguments",
                ResultStatus.IMPROPER_COMMAND
            );
        }

        if (kwargs.help) {
            return connection.system.execute("help cd", connection);
        }

        const pathInput = args.length === 2 ? args[1] : "~"; // default to $HOME
        const item = connection.system.fs.getItem(cwd, pathInput);

        // set the cwd
        if (item) {
            if (!item.isDirectory) {
                return new Result(
                    `Path '${pathInput}' is a file, not a directory`,
                    ResultStatus.IMPROPER_COMMAND
                );
            }
            connection.setCwd(
                connection.system.fs.simplifyPath(item.getAbsolutePath())
            );
        } else {
            return new Result(
                `bash: cd: ${pathInput}: No such file or directory`,
                ResultStatus.IMPROPER_COMMAND
            );
        }
        return new Result();
    }
}
