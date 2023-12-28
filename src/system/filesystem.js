export class Item {
    constructor(name, isDirectory) {
        this.name = name;
        this.isDirectory = isDirectory;
        this.permissions = [];
        this.parentDir = undefined;
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

    /**
     * @param {Array} pathLs
     * @param {boolean} absolute (default = true)
     * @returns {undefined | Item}
     */
    getNode(startingNode, pathLs) {
        let node = startingNode;
        for (let i = 0; i < pathLs.length; ++i) {
            // search for next node
            const cur = pathLs[i];
            let nextNode;
            for (let j = 0; j < node.items.length; ++j) {
                const n = node.items[j];
                if (n.name === cur) {
                    nextNode = n;
                    break;
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

    resolve(cwd, path) {
        // given a path return an Item that is mounted in the file system
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
            if (splitPath[0] === ".") {
                splitPath.shift();
            }
            // start from the current working directory
            // TODO: fixme, the following won't work since if the cwd is "~" it will resolve to '/~/'
            startingNode = this.getNode(cwd.split("/"), this.rootDir);
        }
        console.log(splitPath);
        console.log(startingNode);
    }
}
