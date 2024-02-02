import "./home.page.css";
import { useEffect, useState } from "react";
import { tokenize, parseFlags } from "../system/bash";
import {
    MdOutlineTerminal,
    MdOutlineSearch,
    MdMenu,
    MdMinimize,
    MdClose,
} from "react-icons/md";
import { VscGithubInverted } from "react-icons/vsc";
import { SingleTerminalCommand } from "./command-component";
import { system } from "../system/init";
import { SystemConnection } from "../system/system";
import { isMobile } from "react-device-detect";

const NavBar = ({ cwd, onMinimize }) => {
    return (
        <div className="nav-bar">
            <div className="left-command-bar">
                <a href="https://github.com/lukeharwood11/portfolio-term" target="_blank" className="cmd-btn">
                    <VscGithubInverted size={25} />
                </a>
            </div>
            <div className="middle-bar">guest@lukes-portfolio: {cwd}</div>
            <div className="right-command-bar">
                {!isMobile && (
                    <>
                        <button className="cmd-btn">
                            <MdOutlineSearch size={25} />
                        </button>
                        <button className="cmd-btn">
                            <MdMenu size={25} />
                        </button>
                        <button onClick={onMinimize} className="circle-cmd-btn">
                            <MdMinimize size={15} />
                        </button>
                    </>
                )}
                <button
                    className="circle-cmd-btn"
                    onClick={() => {
                        window.location.href = "https://lukeharwood.dev";
                    }}>
                    <MdClose size={15} />
                </button>
            </div>
        </div>
    );
};

const Footer = () => {
    return <div className="footer"></div>;
};

class Command {
    constructor(location) {
        this.cmd = "";
        this.location = location;
        this.output = "";
    }
}

export const Terminal = ({ onMinimize }) => {
    // command buffer should contain three things:
    // the command
    // the output
    // the location
    const [commandBuffer, setCommandBuffer] = useState([new Command("~")]);
    const [cursor, setCursor] = useState(0);
    // Command Start Point (what will be displayed)
    const [csp, setCsp] = useState(0);
    const [connection, setConnection] = useState(new SystemConnection(system));

    const [cbIndex, setCbIndex] = useState(1); // 1 is the current buffer (Since length - 1 is the last command)
    const [blocked, setBlocked] = useState(false); // blocked meaning a command or process is not detatched

    function handleNextCommand(callback) {
        if (cbIndex > 2) {
            setCbIndex((prev) => {
                handleChange(
                    commandBuffer[commandBuffer.length - (prev - 1)].cmd
                );
                callback(commandBuffer[commandBuffer.length - (prev - 1)].cmd);
                return prev - 1;
            });
        } else if (cbIndex === 2) {
            setCbIndex(1);
            handleChange("");
        }
    }

    function handlePreviousCommand(callback) {
        if (cbIndex < commandBuffer.length) {
            setCbIndex((prev) => {
                handleChange(
                    commandBuffer[commandBuffer.length - (prev + 1)].cmd
                );
                callback(commandBuffer[commandBuffer.length - (prev + 1)].cmd);
                return prev + 1;
            });
        }
    }

    async function handleSubmitCommand() {
        setBlocked(true);
        const currentBuffer = commandBuffer[commandBuffer.length - 1];
        let cwd = currentBuffer.location;

        const standardOutput = async (buff) => {
            return new Promise((resolve) => {
                setCommandBuffer((prev) => {
                    resolve();
                    return [...prev.slice(0, -1), { ...prev[prev.length - 1], output: prev[prev.length - 1].output + buff }];
                });
            });
        };

        const result = await connection.execute(
            currentBuffer.cmd,
            standardOutput,
            cwd,
            (newCwd) => {
                cwd = newCwd;
            },
            commandBuffer,
            setCsp
        );

        await standardOutput(result.out);
        setCommandBuffer((prev) => {
            const cp = [...prev];
            cp.push(new Command(cwd));
            return cp;
        }); 
        setCbIndex(1);
        setBlocked(false);
    }

    function handleChange(newValue) {
        setCommandBuffer((prev) => {
            const cp = [...prev];
            cp[cp.length - 1].cmd = newValue;
            return cp;
        });
    }

    function handleTab(callback) {
        const currentCommand = commandBuffer[commandBuffer.length - 1];
        const tokens = tokenize(currentCommand.cmd).tokens;
        // TODO: add tab completion for specific commands
        // For now, simply only use files
        const lastToken = tokens.length > 0 ? tokens[tokens.length - 1] : "";
        const { node, unresolvedPath } = connection.system.fs.getPartialItem(currentCommand.location, lastToken);
        if (unresolvedPath.length === 0) {
            return;
        }
        const possibleMatches = node.isDirectory ? node.items.filter((f) => f.name.startsWith(unresolvedPath[0])) : [];
        if (possibleMatches.length > 0) {
            // TODO: allow tab completion to be used multiple times to cycle through possible matches
            const prefix = findCommonPrefix(possibleMatches.map((f) => f.name));
            const newCommand = currentCommand.cmd.replace(
                new RegExp(`${unresolvedPath[0]}$`),
                prefix
            );
            handleChange(newCommand);
            callback(newCommand);
        } 
    }

    /**
     * Finds the common prefix among an array of words.
     * 
     * @param {string[]} words - The array of words to find the common prefix from.
     * @returns {string} The common prefix among the words.
     */
    function findCommonPrefix(words) {
        if (words.length === 0) {
            return "";
        }
        
        const sortedWords = words.sort();
        const first = sortedWords[0];
        const last = sortedWords[sortedWords.length - 1];
        let prefix = "";
        
        for (let i = 0; i < first.length; i++) {
            if (first.charAt(i) !== last.charAt(i)) {
                break;
            }
            prefix += first.charAt(i);
        }
        
        return prefix;
    }

    return (
        <div className="terminal">
            <NavBar
                onMinimize={onMinimize}
                cwd={
                    commandBuffer.length > 0
                        ? commandBuffer[commandBuffer.length - 1].location
                        : "~"
                }
            />
            {isMobile ? (
                <div className="terminal-mobile">
                    <SingleTerminalCommand
                        onChange={(_) => {}}
                        ignorePrefix
                        value={"help i'm on mobile"}
                        output={
                            "---\n`426 Upgrade Required`\n\n> Ahhh, yes that's not going to work. \n\nI might support that... but in the meantime, go to [lukeharwood.dev](https://lukeharwood.dev). \n\nOr use something with a keyboard."
                        }
                        onPreviousCommand={handlePreviousCommand}
                        onNextCommand={handleNextCommand}
                        onSubmit={handleSubmitCommand}
                    />
                </div>
            ) : (
                <div className="terminal-command-container">
                    {commandBuffer.slice(csp).map((c, i) => (
                        <SingleTerminalCommand
                            onTabPressed={handleTab}
                            key={i}
                            onChange={handleChange}
                            cwd={c.location}
                            value={c.cmd}
                            output={c.output}
                            focus={i + csp === commandBuffer.length - 1 && !blocked}
                            onPreviousCommand={handlePreviousCommand}
                            onNextCommand={handleNextCommand}
                            onSubmit={handleSubmitCommand}
                        />
                    ))}
                    {}
                </div>
            )}

            <Footer />
        </div>
    );
};
