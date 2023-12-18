import { FileSystem, Directory, File } from "./filesystem";
import { System } from "./system";

// configure our fake system
const rootDir = new Directory("root");

// https://www.geeksforgeeks.org/linux-directory-structure/
// /bin	 binary or executable programs.
// /etc	system configuration files.
// /home	home directory. It is the default current directory.
// /opt	optional or third-party software.
// /tmp	temporary space, typically cleared on reboot.
// /usr	 User related programs.
// /var 	log files.

const homeDir = new Directory("home");
homeDir.addItems([new Directory("testDir"), new File("testFile")]);

rootDir.addItems([
    new Directory("bin"),
    new Directory("etc"),
    homeDir,
    new Directory("opt"),
    new Directory("tmp"),
    new Directory("usr"),
    new Directory("var"),
]);

const fs = new FileSystem(rootDir, homeDir);

const defaultEnvVariables = {
    HOME: "/home",
};

const commands = [];

export const system = new System(fs, commands, defaultEnvVariables);
