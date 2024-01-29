import { File, Directory } from '../filesystem';


export const projectDir = new Directory("projects");

const portfolioTerminalText = ``;
const portfolioTerminalProject = new File("portfolio-terminal.md", portfolioTerminalText)

const portfolioText = ``;
const portfolioProject = new File("portfolio.md", portfolioText)


projectDir.addItems([portfolioTerminalProject, portfolioProject]);