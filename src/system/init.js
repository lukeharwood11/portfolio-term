import { CdCommand } from "./cmds/cd";
import { ClearCommand } from "./cmds/clear";
import { ExitCommand } from "./cmds/exit";
import { HelpCommand } from "./cmds/help";
import { LsCommand } from "./cmds/ls";
import { SudoCommand } from "./cmds/sudo";
import { FileSystem, Directory, File } from "./filesystem";
import { System } from "./system";

// configure our fake system
const rootDir = new Directory("");

// https://www.geeksforgeeks.org/linux-directory-structure/
// /bin	 binary or executable programs.
// /etc	system configuration files.
// /home	home directory. It is the default current directory.
// /opt	optional or third-party software.
// /tmp	temporary space, typically cleared on reboot.
// /usr	 User related programs.
// /var 	log files.

const homeDir = new Directory("home");
const userDir = new Directory("guest");
homeDir.addItems([userDir]);
userDir.addItems([new Directory("test")]);

rootDir.addItems([
    new Directory("bin"),
    new Directory("etc"),
    homeDir,
    new Directory("opt"),
    new Directory("tmp"),
    new Directory("usr"),
    new Directory("var"),
]);

console.log(userDir.getAbsolutePath());

const fs = new FileSystem(rootDir, userDir);

console.log(fs.simplifyPath("/home/guest/test/"));

// console.log(rootDir.getAbsolutePath());

const defaultEnvVariables = {
    HOME: "~",
};

const commands = [
    new CdCommand(),
    new HelpCommand(),
    new ExitCommand(),
    new SudoCommand(),
    new LsCommand(),
    new ClearCommand(),
];

const help = `Welcome to Luke's Portfolio terminal! LPORT version 1.0.0(1)-release (x86_64-cloud-notquitelinux)
`;

export const system = new System(fs, commands, defaultEnvVariables, help);
