import { FileSystem, Directory, File } from "../filesystem";
import { System } from "../system";

// configure our fake system
const rootDir = Directory("root");

// https://www.geeksforgeeks.org/linux-directory-structure/
// /bin	 binary or executable programs.
// /etc	system configuration files.
// /home	home directory. It is the default current directory.
// /opt	optional or third-party software.
// /tmp	temporary space, typically cleared on reboot.
// /usr	 User related programs.
// /var 	log files.

const homeDir = Directory("home");
homeDir.addItems([Directory("testDir"), File("testFile")]);

rootDir.addItems([
    Directory("bin"),
    Directory("etc"),
    homeDir,
    Directory("opt"),
    Directory("tmp"),
    Directory("usr"),
    Directory("var"),
]);

const fs = FileSystem(rootDir, homeDir);

const defaultEnvVariables = {
    HOME: "/",
};
const system = System();
