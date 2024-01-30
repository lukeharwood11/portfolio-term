import { File, Directory } from '../filesystem';


export const projectDir = new Directory("projects");

const portfolioTerminalText = ``;
const portfolioTerminalProject = new File("portfolio-terminal.md", portfolioTerminalText)

const portfolioText = ``;
const portfolioProject = new File("portfolio.md", portfolioText)

const pysimulateText = ``;
const pysimulateProject = new File("pysimulate.md", pysimulateText)

const multiplayerWordleText = ``;
const multiplayerWordleProject = new File("multiplayer-wordle.md", multiplayerWordleText);

projectDir.addItems([portfolioTerminalProject, portfolioProject, pysimulateProject, multiplayerWordleProject]);