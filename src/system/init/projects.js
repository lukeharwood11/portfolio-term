import { File, Directory } from '../filesystem';


export const projectDir = new Directory("projects");

const portfolioTerminalText = `
# \`PTerm\`

**Live Link: [terminal.lukeharwood.dev](https://terminal.lukeharwood.dev)**

## Welcome!

This is my portfolio website, but as a ✨linux terminal✨

The files represent content to explore regarding my skills, experience, contact information, etc. Anything that you would find on a normal portfolio. In order to navigate the system, you'll need to make use of bash commands (like \`cd\` to navigate, \`ls\` to find paths, and \`cat\` to view files).

It contains a pseudo-filesystem with permissions, a custom simplified bash engine, and simple command interface. This means that adding new commands is as simple as extending a base class and implementing your own business logic.


## Contribution

If you see a command that hasn't been implemented yet, or you see a way this project can be improved. Please contribute!

CI/CD is configured to deploy to staging when a pull request is created, and deploy to production when PRs are approved and merged.

### Ideas to expand \`PTerm\`

- [ ] Add easter eggs throughout system
- [ ] Implement commands to add files/directories, or move/copy existing ones.
- [ ] Persist a session to local storage, so that changes to the system are kept
- [ ] Add complexity to the bash parser to support piping and asychronous tasks
- [ ] Add autocomplete suggestions

`;
const portfolioTerminalProject = new File("portfolio-terminal.md", portfolioTerminalText)

const portfolioText = `
# Portfolio Website (lukeharwood.dev)

[https://lukeharwood.dev](https://lukeharwood.dev)

This website is still in progress and is in the middle of a re-write.
`;
const portfolioProject = new File("portfolio.md", portfolioText)

const pysimulateText = `
# pysimulate

GitHub: [lukeharwood11/pysimulate](https://github.com/lukeharwood11/pysimulate)

NOTE: This project is no longer maintained and the current release isn't stable (regardless of the version number). 

In other words, this probably won't work anymore :(

\`\`\`
pip install pysimulate
\`\`\`

## Purpose

This project provides a framework to build a simulator to test different agents in a simple environment. This allows you to control the inputs/outputs of the system in python and hotswap the 'drivers' to the vehicles.

Use this repo to build your own AI drivers and test them on your own tracks!

## Links

- [pygame docs](https://www.pygame.org/docs/)

## About
This project was built using the pygame and numpy libraries. In order to install these dependencies use: 

\`\`\`
pip install -r requirements.txt
\`\`\`

Extend from the abstract class \`Simulation\` from \`simulation.py\` in order to create a custom simulation or simply use the \`DefaultSimulation\` class.

Same applies to building a custom vehicle from \`vehicle.py\` or using the \`DefaultVehicle\` class.

## Author

**Luke Harwood** 

- Email: lukeharwood.dev@gmail.com
- University Email: harwoodl@msoe.edu
- Website: [www.lukeharwood.dev](https://www.lukeharwood.dev)

Created on 05/24/2022

`;
const pysimulateProject = new File("pysimulate.md", pysimulateText)

const multiplayerWordleText = `
# Multiplayer Wordle

## Overview
This project is a multiplayer version of the popular game Wordle. It was built using Kotlin/Java using the JavaFX framework for the GUI. 

### Basic Wordle Gameplay

In this game you have 6 guesses to guess a 5-letter-word. The words were grabbed from the official Wordle list. This being said, you can also import your own list of words.

### Statistics Page

The application keeps track of the following statistics which are displayed on the statistics page:
- Number of guesses played for each game
- Current streak
- Max streak
- Win percentage
- Games played

A share button at the bottom of the screen also allows you to copy the last game to clipboard

### Settings Page 

Allows the user to customize various settings for the game.

- **Select custom dictionary or default dictionary**: Gives the option to choose between a custom dictionary or the default dictionary for the game.
- **Select word length for lengths 3-8**: Allows the user to specify the desired word length within the range of 3 to 8 characters.
- **Reset game**: Resets the game to its initial state.
- **Set official word to word in the dictionary**: Sets the official word for the game to a word from the selected dictionary.
- **View log files**: Provides access to the log files for viewing.
- **Select number of guesses in the game**: Allows the user to choose the number of guesses available in the game.
- **Key Logger**: Logs the keys pressed while using the GUI in text files in a hidden directory placed at the home directory.

### Smart Features

- Content Assist:
    - Suggest words based on typed characters in current guess that match the given prefix
    - Suggest words after a guess is made that fit the current information profile
    - Profile becomes more refined as you guess

- Entropy-Based AI:
    - Calculates the entropy (expected information gain) for each of the remaining possible words
    - Displays the top entropy graphs in a bar graph, so user can choose to use these guesses

- Autoplay:
    - Automatically uses entropy calculations to guess the best entropy-guess to try and solve the Wordle game

- Letter Assist:
    - Gives you the first letter that is not already found in the word

Other Features:
- Recommend Words based on Guess Frequency:
- Recommends 3 words based on the most frequent word guesses

### Color Modes

Light, Dark, and Neon Theme


### Game Modes

- **Normal Mode:** Play the original Wordle game
- **Hard Mode:** Unable to view the letters in your previous guess
- **Evil Mode:** Winning word changes after each guess and number of guesses changes after each round

Note: New word after each guess will contain letters that were found in the previous word

### Contributors
- Luke Harwood
- Tyler Gibson
- Kevin Gray
- Jonathan Keane
- Sam Keyser
- Josh Bultman

`;
const multiplayerWordleProject = new File("multiplayer-wordle.md", multiplayerWordleText);

projectDir.addItems([portfolioTerminalProject, portfolioProject, pysimulateProject, multiplayerWordleProject]);
