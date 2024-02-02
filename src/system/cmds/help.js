import { Command, Arg, Result, ResultStatus } from "../bash";

const flags = [];
const args = [
    new Arg(
        "...CMD",
        "The commands you would like to display information about"
    ),
];

const help = `Display information about builtin commands.


Displays brief summaries of builtin commands.  If CMD(s) is/are

specified, gives detailed help on all commands matching CMD,

otherwise the list of help topics is printed.

`;

export class HelpCommand extends Command {
    constructor() {
        super("help", flags, args, help);
    }

    systemHelp(system) {
        let res = "---\n" + system.help;
        res +=
            "\n\nThese shell commands are defined internally.  Type `help` to see this list.\n\n";

        res +=
            "Type `help name` to find out more about the function `name'.\n\n";

        res +=
            "A star (*) next to a name means that the command is disabled.\n\n---\n";

        for (let i = 0; i < system.commands.length; ++i) {
            res += this.getExampleString(system.commands[i]) + "\n\n";
        }

        return res;
    }

    getExampleString(command) {
        return `${command.disabled ? '(*) ' : ''}${command.name}: \`${command.name}${
            command.args.length > 0
                ? " " + command.args.map((a) => `[${a.name}]`).join(", ")
                : ""
        }${
            command.flags.length > 0 ? " [...options]" : ""
        }\``;
    }

    getHelpString(system, cmd) {
        // find command in system
        let command;
        for (let i = 0; i < system.commands.length; ++i) {
            const c = system.commands[i];
            if (c.name.trim() === cmd.trim()) {
                command = c;
                break;
            }
        }
        if (!command) return;

        let res = this.getExampleString(command);
        res += `\n\n${command.help}`;

        // build flag table
        let table = "\n\n|**Options**||\n|--|--|\n";
        for (let i = 0; i < command.flags.length; ++i) {
            const flag = command.flags[i];
            table += `|\`--${flag.name} ${flag.alias ? '(-'+flag.alias+')': ''}\`|${flag.help ? flag.help : ""}|\n`;
        }

        if (command.flags.length > 0) {
            res += table;
        }

        return res;
    }

    execute(args, kwargs, connection) {
        const keys = Object.keys(kwargs);
        if (kwargs.help) {
            return connection.system.execute("help help", connection);
        }
        if (keys.length !== 0) {
            return new Result(
                `${keys[0]}: Unrecognized keyword argument`,
                ResultStatus.IMPROPER_COMMAND
            );
        }

        if (args.length === 1) {
            // TODO: print out all of the commands we can access
            return new Result(this.systemHelp(connection.system));
        }

        let resString = "";
        // TODO:
        // - allow for different flags to determine how the items are displayed
        // - allow for metadata to be displayed
        // (use markdown table to accomplish visuals)
        for (let i = 1; i < args.length; ++i) {
            const res = this.getHelpString(connection.system, args[i]);
            if (res) resString += res + "\n\n";
        }

        if (!resString.trim()) {
            return new Result(
                `bash: help: no help topics match \`${
                    args[args.length - 1]
                }\`. Try \`help help\`.`,
                ResultStatus.IMPROPER_COMMAND
            );
        }
        return new Result(resString);
    }
}
