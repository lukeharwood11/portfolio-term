import { File, Directory } from '../filesystem';


export const projectDir = new Directory("projects");

const portfolioTerminalText = ``;
const portfolioTerminalProject = new File("portfolio-terminal.md", portfolioTerminalText)
portfolioTerminalProject.setPermissions([]); // TODO: Remove after adding content

const portfolioText = ``;
const portfolioProject = new File("portfolio.md", portfolioText)
portfolioProject.setPermissions([]); // TODO: Remove after adding content

const pysimulateText = ``;
const pysimulateProject = new File("pysimulate.md", pysimulateText)
pysimulateProject.setPermissions([]); // TODO: Remove after adding content

const multiplayerWordleText = ``;
const multiplayerWordleProject = new File("multiplayer-wordle.md", multiplayerWordleText);
multiplayerWordleProject.setPermissions([]); // TODO: Remove after adding content

projectDir.addItems([portfolioTerminalProject, portfolioProject, pysimulateProject, multiplayerWordleProject]);