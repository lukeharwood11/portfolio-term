export const Permissions = {
    READ: "r",
    WRITE: "w",
    EXECUTE: "x",
}

export class Item {
    constructor(name, isDirectory) {
        this.name = name;
        this.isDirectory = isDirectory;
        this.permissions = new Set([Permissions.READ]);
        this.parentDir = undefined;
    }

    setPermissions(permissions) {
        this.permissions = new Set(permissions);
    }

    updatePermissions(permissions) {
        for (let i = 0; i < permissions.length; ++i) {
            this.permissions.add(permissions[i]);
        }
    }

    removePermissions(permissions) {
        for (let i = 0; i < permissions.length; ++i) {
            this.permissions.delete(permissions[i]);
        }
    }

    canRead() {
        return this.permissions.has(Permissions.READ)
    }

    canWrite() {
        return this.permissions.has(Permissions.WRITE);
    }

    canExecute() {
        return this.permissions.has(Permissions.EXECUTE);
    }

    getAbsolutePath() {
        let path = this.name;
        if (this.parentDir === undefined) {
            return "/";
        }
        let curNode = this.parentDir;
        while (curNode !== undefined) {
            path = `${curNode.parentDir ? curNode.name : ""}/${path}`;
            curNode = curNode.parentDir;
        }
        return path;
    }
}

export class File extends Item {
    constructor(name, text = "") {
        super(name, false);
        this.text = text;
    }
}

export class Directory extends Item {
    constructor(name) {
        super(name, true);
        this.items = [];
    }

    addItems(items) {
        for (let i = 0; i < items.length; ++i) {
            const item = items[i];
            item.parentDir = this;
            this.items.push(item);
        }
    }
}

export class FileSystem {
    constructor(rootDir, homeDir) {
        this.rootDir = rootDir;
        this.homeDir = homeDir;
    }

    simplifyPath(path) {
        const homeAbsolute = this.homeDir.getAbsolutePath();
        if (path.startsWith(homeAbsolute)) {
            return `~` + path.substring(homeAbsolute.length);
        }
        return path;
    }

    /**
     * @param {Array} pathLs
     * @param {boolean} absolute (default = true)
     * @returns {undefined | Item}
     */
    resolve(startingNode, pathLs) {
        let node = startingNode;
        console.table({ startingNode, pathLs });
        for (let i = 0; i < pathLs.length; ++i) {
            // search for next node
            const cur = pathLs[i];
            let nextNode;
            if (cur === ".." || cur === ".") {
                nextNode =
                    node.parentDir && cur === ".." ? node.parentDir : node;
            } else {
                if (cur === "") {
                    nextNode = node;
                    continue;
                }
                for (let j = 0; j < node.items.length; ++j) {
                    const n = node.items[j];
                    if (n.name === cur) {
                        nextNode = n;
                        break;
                    }
                }
            }
            // if the next node doesn't exist or the next node is not a directory (and it isn't the final node)
            // simply return undefined
            if (
                !nextNode ||
                (!nextNode.isDirectory && i !== pathLs.length - 1)
            ) {
                return;
            }
            node = nextNode;
        }
        return node;
    }

    getItem(cwd, path) {
        // given a path return an Item that is mounted in the file system
        cwd = this.simplifyPath(cwd);
        console.table({ cwd, path });
        const splitPath = path.split("/");
        let startingNode;
        if (splitPath[0] === "") {
            // start from the root directory
            splitPath.shift();
            startingNode = this.rootDir;
        } else if (splitPath[0] === "~") {
            // start from the home directory
            splitPath.shift();
            startingNode = this.homeDir;
        } else {
            startingNode = this.getItem("", cwd);
        }
        return splitPath.length === 0 || !splitPath[0]
            ? startingNode
            : this.resolve(startingNode, splitPath);
    }
}
