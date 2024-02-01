import { CdCommand } from "./cmds/cd";
import { ClearCommand } from "./cmds/clear";
import { ExitCommand } from "./cmds/exit";
import { HelpCommand } from "./cmds/help";
import { LsCommand } from "./cmds/ls";
import { SudoCommand } from "./cmds/sudo";
import { CatCommand } from "./cat";
import { FileSystem, Directory, File } from "./filesystem";
import { notImplemented } from "./bash";
import { System } from "./system";
import { projectDir } from './init/projects';
import { aboutDir } from "./init/about";
import { experienceDir } from './init/experience';
import { contribDir } from './init/contributions'

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
userDir.addItems([projectDir, aboutDir, experienceDir, contribDir]);

const binDir = new Directory("bin");
rootDir.addItems([
    binDir,
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

// source: https://www.digitalocean.com/community/tutorials/linux-commands
// ls - The most frequently used command in Linux to list directories
// pwd - Print working directory command in Linux
// cd - Linux command to navigate through directories
// mkdir - Command used to create directories in Linux
// mv - Move or rename files in Linux
// cp - Similar usage as mv but for copying files in Linux
// rm - Delete files or directories
// touch - Create blank/empty files
// ln - Create symbolic links (shortcuts) to other files
// cat - Display file contents on the terminal
// clear - Clear the terminal display
// echo - Print any text that follows the command
// less - Linux command to display paged outputs in the terminal
// man - Access manual pages for all Linux commands
// uname - Linux command to get basic information about the OS
// whoami - Get the active username
// tar - Command to extract and compress files in Linux
// grep - Search for a string within an output
// head - Return the specified number of lines from the top
// tail - Return the specified number of lines from the bottom
// diff - Find the difference between two files
// cmp - Allows you to check if two files are identical
// comm - Combines the functionality of diff and cmp
// sort - Linux command to sort the content of a file while outputting
// export - Export environment variables in Linux
// zip - Zip files in Linux
// unzip - Unzip files in Linux
// ssh - Secure Shell command in Linux
// service - Linux command to start and stop services
// ps - Display active processes
// kill and killall - Kill active processes by process ID or name
// df - Display disk filesystem information
// mount - Mount file systems in Linux
// chmod - Command to change file permissions
// chown - Command for granting ownership of files or folders
// ifconfig - Display network interfaces and IP addresses
// traceroute - Trace all the network hops to reach the destination
// wget - Direct download files from the internet
// ufw - Firewall command
// iptables - Base firewall for all other firewall utilities to interface with
// apt, pacman, yum, rpm - Package managers depending on the distro
// sudo - Command to escalate privileges in Linux
// cal - View a command-line calendar
// alias - Create custom shortcuts for your regularly used commands
// dd - Majorly used for creating bootable USB sticks
// whereis - Locate the binary, source, and manual pages for a command
// whatis - Find what a command is used for
// top - View active processes live with their system usage
// useradd and usermod - Add new user or change existing users data
// passwd - Create or update passwords for existing users
const unimplementedCommands = notImplemented(
    [
        "apt-get",
        "apt",
        "pwd",
        "mkdir",
        "mv",
        "cp",
        "rm",
        "touch",
        "ln",
        "echo",
        "less",
        "man",
        "uname",
        "whoami",
        "tar",
        "grep",
        "head",
        "tail",
        "diff",
        "cmp",
        "comm",
        "sort",
        "export",
        "zip",
        "unzip",
        "ssh",
        "service",
        "ps",
        "kill",
        "killall",
        "df",
        "mount",
        "chmod",
        "chown",
        "ifconfig",
        "traceroute",
        "wget",
        "ufw",
        "iptables",
        "pacman",
        "yum",
        "rpm",
        "cal",
        "alias",
        "dd",
        "whereis",
        "whatis",
        "top",
        "useradd",
        "usermod",
        "passwd"
      ]
)

const commands = [
    new CdCommand(),
    new HelpCommand(),
    new ExitCommand(),
    new SudoCommand(),
    new LsCommand(),
    new ClearCommand(),
    new CatCommand(),
    ...unimplementedCommands,
];

console.log(binDir)
binDir.addItems(commands.map((command) => {
    const file = new File(command.name);
    file.setPermissions([]);
    return file;
}))

const help = `Welcome to Luke's Portfolio terminal! LPORT version 1.0.0(1)-release (x86_64-cloud-notquitelinux)
`;

export const system = new System(fs, commands, defaultEnvVariables, help);
