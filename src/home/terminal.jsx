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
import { SingleTerminalCommand } from "./command-component";
import { system } from "../system/init";
import { SystemConnection } from "../system/system";

const NavBar = ({ cwd }) => {
    return (
        <div className="nav-bar">
            <div className="left-command-bar">
                <button className="cmd-btn">
                    <MdOutlineTerminal size={25} />
                </button>
            </div>
            <div className="middle-bar">guest@lukes-portfolio: {cwd}</div>
            <div className="right-command-bar">
                <button className="cmd-btn">
                    <MdOutlineSearch size={25} />
                </button>
                <button className="cmd-btn">
                    <MdMenu size={25} />
                </button>
                <button className="circle-cmd-btn">
                    <MdMinimize size={15} />
                </button>
                <button className="circle-cmd-btn">
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

export const Terminal = () => {
    // command buffer should contain three things:
    // the command
    // the output
    // the location
    const [commandBuffer, setCommandBuffer] = useState([new Command("~")]);
    const [connection, setConnection] = useState(new SystemConnection(system));

    const [cbIndex, setCbIndex] = useState(1); // 1 is the current buffer (Since length - 1 is the last command)
    const [blocked, setBlocked] = useState(false); // blocked meaning a command or process is not detatched

    function handleNextCommand() {
        if (cbIndex > 2) {
            setCbIndex((prev) => {
                handleChange(
                    commandBuffer[commandBuffer.length - (prev - 1)].cmd
                );
                return prev - 1;
            });
        } else if (cbIndex === 2) {
            setCbIndex(1);
            handleChange("");
        }
    }
    function handlePreviousCommand() {
        if (cbIndex < commandBuffer.length) {
            setCbIndex((prev) => {
                handleChange(
                    commandBuffer[commandBuffer.length - (prev + 1)].cmd
                );
                return prev + 1;
            });
        }
    }

    function handleSubmitCommand() {
        setCommandBuffer((prev) => {
            let cp = [...prev];
            // TODO: move stdOut outside of updating state so that any stdOut(s) don't get 'flushed' at the end of the command.
            const stdOut = (buffer) => {
                cp[cp.length - 1].output += `${buffer}\n\n`;
            };

            let cwd = cp[cp.length - 1].location;
            const result = connection.execute(
                cp[cp.length - 1].cmd,
                stdOut,
                cwd,
                (newCwd) => {
                    cwd = newCwd;
                }
            );

            stdOut(result.out);
            // TODO: remove
            // execute command, when done add another command, set the cbIndex to 1 and continue
            cp.push(new Command(cwd));
            // reset the 'previous commands' feature
            setCbIndex(1);
            return cp;
        });
        // TODO: add the commmand to the visible buffer
        // TODO: use the bash engine to run the command and set the command output
    }

    function handleChange(newValue) {
        setCommandBuffer((prev) => {
            const cp = [...prev];
            cp[cp.length - 1].cmd = newValue;
            return cp;
        });
    }

    return (
        <div className="terminal">
            <NavBar cwd={commandBuffer[commandBuffer.length - 1].location} />
            <div>
                {commandBuffer.map((c, i) => (
                    <SingleTerminalCommand
                        key={i}
                        onChange={handleChange}
                        cwd={c.location}
                        value={c.cmd}
                        output={c.output}
                        focus={i === commandBuffer.length - 1}
                        onPreviousCommand={handlePreviousCommand}
                        onNextCommand={handleNextCommand}
                        onSubmit={handleSubmitCommand}
                    />
                ))}
            </div>
            <Footer />
        </div>
    );
};
