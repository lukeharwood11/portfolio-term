import "./home.page.css";
import { useState, useEffect, useRef, useId } from "react";

export const SingleTerminalCommand = ({
    focus,
    onPreviousCommand,
    onNextCommand,
    onChange,
    value,
    onSubmit,
}) => {
    const id = useId();
    const [caretPos, setCaretPos] = useState(0);
    const ref = useRef();
    const terminalInputRef = useRef();

    function handleAdd(key) {
        onChange(
            value.substring(0, caretPos) +
                key +
                value.substring(caretPos, value.length)
        );
    }

    function handleRemove() {
        onChange(
            value.substring(0, caretPos - 1) +
                value.substring(caretPos, value.length)
        );
    }

    const handleKeyDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!focus) {
            return;
        }
        switch (e.key) {
            case "ArrowUp":
                onPreviousCommand();
                break;
            case "ArrowDown":
                onNextCommand();
                break;
            case "ArrowLeft":
                if (caretPos > 0) {
                    setCaretPos(caretPos - 1);
                }
                break;
            case "ArrowRight":
                if (caretPos < value.length) {
                    setCaretPos(caretPos + 1);
                }
                break;
            case "Backspace":
                if (caretPos > 0) {
                    handleRemove();
                    setCaretPos(caretPos - 1);
                }
                break;
            case "Enter":
                onSubmit();
                break;
            default:
                if (e.key.length === 1 && !e.ctrlKey && !e.altKey) {
                    handleAdd(e.key);
                    setCaretPos((prev) => prev + 1);
                }
                break;
        }
    };

    function escapeHTML(string) {
        // fun little trick for cleaning html
        const element = document.createElement("div");
        element.innerText = string;
        return element.innerHTML;
    }

    useEffect(() => {
        // on mount, scroll into view
        ref.current.scrollIntoView();
    }, []);

    useEffect(() => {
        let html = escapeHTML(value);
        const valueAtCaret =
            caretPos < html.length && html[caretPos] !== " "
                ? html[caretPos]
                : "&nbsp;";
        let text =
            html.substring(0, caretPos) +
            "<span>" +
            valueAtCaret +
            "</span>" +
            html.substring(caretPos + 1, html.length);
        terminalInputRef.current.innerHTML = focus ? text : value;
        // add cursor at correct location
    }, [caretPos, value, focus]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown, value, caretPos]);

    return (
        <div onKeyDown={() => handleKeyDown()} key={id} ref={ref}>
            <div className="terminal-command">
                <span className="command-prefix">
                    <span className="user">guest@lukes-portfolio:</span>
                    <span className="cwd">~</span>
                    <span className="white">$</span>
                </span>
                <div ref={terminalInputRef} className="terminal-input"></div>
            </div>
            <div className="command-output"></div>
        </div>
    );
};

export const Terminal = () => {
    const [commandBuffer, setCommandBuffer] = useState([""]);

    const [cbIndex, setCbIndex] = useState(1); // 1 is the current buffer (Since length - 1 is the last command)

    function handleNextCommand() {
        if (cbIndex > 2) {
            setCbIndex((prev) => {
                handleChange(commandBuffer[commandBuffer.length - (prev - 1)]);
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
                handleChange(commandBuffer[commandBuffer.length - (prev + 1)]);
                return prev + 1;
            });
        }
    }

    function handleSubmitCommand() {
        setCommandBuffer((prev) => {
            let cp = [...prev];
            cp.push("");
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
            cp[commandBuffer.length - 1] = newValue;
            return cp;
        });
    }

    return (
        <div className="terminal">
            {commandBuffer.map((c, i) => (
                <SingleTerminalCommand
                    key={i}
                    onChange={handleChange}
                    value={c}
                    focus={i === commandBuffer.length - 1}
                    onPreviousCommand={handlePreviousCommand}
                    onNextCommand={handleNextCommand}
                    onSubmit={handleSubmitCommand}
                />
            ))}
        </div>
    );
};
