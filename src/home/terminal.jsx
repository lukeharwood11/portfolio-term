import "./home.page.css";
import { useState, useEffect, useRef } from "react";

export const SingleTerminalCommand = ({
    focus,
    onPreviousCommand,
    onNextCommand,
    onChange,
    value,
}) => {
    const [caretPos, setCaretPos] = useState(0);
    const caretPosRef = useRef(caretPos);
    const valueRef = useRef(value);
    const terminalInputRef = useRef();

    function handleAdd(key) {
        onChange(
            valueRef.current.substring(0, caretPosRef.current) +
                key +
                valueRef.current.substring(
                    caretPosRef.current,
                    valueRef.current.length
                )
        );
    }

    function handleRemove() {
        onChange(
            valueRef.current.substring(0, caretPosRef.current - 1) +
                valueRef.current.substring(
                    caretPosRef.current,
                    valueRef.current.length
                )
        );
    }

    const handleKeyDown = (e) => {
        if (!focus) {
            return;
        }
        console.log(e.key, caretPosRef.current);
        switch (e.key) {
            case "ArrowUp":
                onPreviousCommand();
                break;
            case "ArrowDown":
                onNextCommand();
                break;
            case "ArrowLeft":
                if (caretPosRef.current > 0) {
                    console.log("Inside");
                    setCaretPos((prev) => prev - 1);
                }
                break;
            case "ArrowRight":
                if (caretPosRef.current < valueRef.current.length) {
                    console.log("inside", value);
                    setCaretPos((prev) => prev + 1);
                }
                break;
            case "Backspace":
                if (caretPosRef.current > 0) {
                    handleRemove();
                    setCaretPos((prev) => prev - 1);
                }
                break;
            default:
                if (e.key.length === 1 && !e.ctrlKey && !e.altKey) {
                    console.log(e.key);
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
        let html = escapeHTML(value);
        const valueAtCaret =
            caretPos < html.length && html[caretPos + 1] !== " "
                ? html[caretPos]
                : "&nbsp;";
        let text =
            html.substring(0, caretPos) +
            "<span>" +
            valueAtCaret +
            "</span>" +
            html.substring(caretPos + 1, html.length);
        terminalInputRef.current.innerHTML = text;
        // add cursor at correct location

        // this is necessary because we are using hooks within an event listener (this is a dumb workaround)
        caretPosRef.current = caretPos;
        valueRef.current = value;
    }, [caretPos, value]);

    useEffect(() => {
        console.log("Adding window listener");
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div>
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
    const [buffer, setBuffer] = useState("");
    const [commandBuffer, setCommandBuffer] = useState([]);

    const [cbIndex, setCbIndex] = useState(-1); // -1 is the current buffer

    function handleNextCommand() {
        console.log("HandleNextCommand", cbIndex);
        if (cbIndex > 0) {
            setCbIndex((prev) => {
                setBuffer(commandBuffer(commandBuffer.length - (prev - 1)));
                return prev - 1;
            });
        } else if (cbIndex === 0) {
            setCbIndex(-1);
            setBuffer("");
        }
    }
    function handlePreviousCommand() {
        console.log("HandlePreviousCommand", cbIndex);
        if (cbIndex < commandBuffer.length - 1) {
            setCbIndex((prev) => {
                setBuffer(commandBuffer(commandBuffer.length - (prev + 1)));
                return prev + 1;
            });
        }
    }

    function handleSubmitCommand() {
        setCommandBuffer((prev) => {
            let cp = [...prev, buffer];
            return cp;
        });
        setBuffer("");
        // TODO: add the commmand to the visible buffer
        // TODO: use the bash engine to run the command and set the command output
    }
    return (
        <div className="terminal">
            <SingleTerminalCommand
                onChange={(value) => setBuffer(value)}
                value={buffer}
                focus
                onPreviousCommand={handlePreviousCommand}
                onNextCommand={handleNextCommand}
                onSubmit={handleSubmitCommand}
            />
        </div>
    );
};
