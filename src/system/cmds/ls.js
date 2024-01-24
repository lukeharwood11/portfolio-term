import { Command, Result, ResultStatus, Arg, Flag } from "../bash";

const flags = [];
const args = [new Arg("FILE", "The name of the Directory to view contents.")];
const help = `List information about the FILEs (the current directory by default).`;

export class LsCommand extends Command {
    constructor() {
        super("ls", flags, args, help);
    }

    execute(args, kwargs, connection) {
        const path = args.length === 1 ? connection.cwd : args[1];
        const file = connection.system.fs.getItem(connection.cwd, path);
        if (!file) {
            return new Result(
                `ls: cannot access '${path}': No such file or directory`
            );
        }

        if (!file.isDirectory) {
            return new Result(
                `Path '${path}' is a file, not a directory`,
                ResultStatus.IMPROPER_COMMAND
            );
        }

        let retString = "";

        for (let i = 0; i < file.items.length; ++i) {
            const item = file.items[i];
            retString += item.isDirectory
                ? `**${item.name}/** `
                : `${item.name} `;
        }

        return new Result(retString);
    }
}
