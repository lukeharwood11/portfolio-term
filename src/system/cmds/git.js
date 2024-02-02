import { Command, Result, ResultStatus } from "../bash";


export class GitCommand extends Command {

    constructor() {
        super(
            "git",
            [],
            [],
            "A version control system"
        );
    }

    async loadingBar(connection, numLines) {
        const randomI = Math.floor(Math.random() * numLines);
        const randomJ = Math.floor(Math.random() * 50);
        for (let i = 0; i < numLines; i++) {
            await connection.stdOut("[");
            let speed = Math.floor(Math.random() * 10) + 1; // Random speed between 1 and 10
            for (let j = 0; j < 50; j++) {
                if (i === randomI && j === randomJ) {
                    speed = 1;
                }
                await new Promise(resolve => setTimeout(resolve, i === randomI && j === randomJ ? 500 : speed));
                await connection.stdOut(`#`);
                speed += Math.floor(Math.random() * 3) - 1; // Randomly increase or decrease speed by 1
                speed = Math.max(1, speed); // Ensure speed is at least 1
            }
            await connection.stdOut("]\n\n");
        }
    }


    async execute(args, kwargs, connection) { 
        await connection.stdOut("Doing some 'git' stuff...\n\n");
        await this.loadingBar(connection, 5);
        await connection.stdOut("Done!\n\n");
        await new Promise(resolve => setTimeout(resolve, 1000));
        await connection.stdOut("Just kidding, nobody implemented it yet.\n\n");
        await this.loadingBar(connection, 1);
        await connection.stdOut(":)\n\n")
        return new Result(
            "",
            ResultStatus.IMPROPER_COMMAND
        );
    }
}