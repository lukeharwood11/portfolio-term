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

    resolve(cwd, path) {
        // given a path return an Item that is mounted in the file system
        const splitPath = path.split("/");
        console.log(splitPath);
    }
}

const fs = new FileSystem();

fs.resolve("/hello/world", "/hello/world/this/is/luke/");
