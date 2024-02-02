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

    async execute(args, kwargs, connection) { 

        for (let i = 0; i < 10; i++) {
            await new Promise(resolve => setTimeout(resolve, 100));
            await connection.stdOut(`(+)`);
        }
        
        return new Result(
            "git: test",
            ResultStatus.IMPROPER_COMMAND
        );
    }
}