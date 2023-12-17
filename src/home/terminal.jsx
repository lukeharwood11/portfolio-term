import "./home.page.css";
import { useState, useEffect, useRef } from "react";

export const SingleTerminalCommand = ({
    focus,
    onPreviousCommand,
    onNextCommand,
    onChange,
    value,
    onSubmit,
}) => {
    const [caretPos, setCaretPos] = useState(0);
    const caretPosRef = useRef(caretPos);
    const valueRef = useRef(value);
    const ref = useRef();
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
        e.preventDefault();
        e.stopPropagation();
        if (!focus) {
            return;
        }
        console.log(valueRef.current);
        switch (e.key) {
            case "ArrowUp":
                onPreviousCommand();
                break;
            case "ArrowDown":
                onNextCommand();
                break;
            case "ArrowLeft":
                if (caretPosRef.current > 0) {
                    setCaretPos((prev) => prev - 1);
                }
                break;
            case "ArrowRight":
                if (caretPosRef.current < valueRef.current.length) {
                    setCaretPos((prev) => prev + 1);
                }
                break;
            case "Backspace":
                if (caretPosRef.current > 0) {
                    handleRemove();
                    setCaretPos((prev) => prev - 1);
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

        // this is necessary because we are using hooks within an event listener (this is a dumb workaround)
        caretPosRef.current = caretPos;
        valueRef.current = value;
    }, [caretPos, value]);

    useEffect(() => {
        ref.current.scrollIntoView();
        if (focus) {
            document.addEventListener("keydown", handleKeyDown);
        } else {
            document.removeEventListener("keydown", handleKeyDown);
        }

        // to be safe, ensure that the event listener is removed when the component dismounts
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    });

    return (
        <div ref={ref}>
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
    const bufferRef = useRef(buffer);
    const [commandBuffer, setCommandBuffer] = useState([]);

    const [cbIndex, setCbIndex] = useState(-1); // -1 is the current buffer
    const cbIndexRef = useRef(cbIndex);

    function handleNextCommand() {
        console.log("HandleNextCommand", cbIndexRef.current);
        if (cbIndexRef.current > 0) {
            setCbIndex((prev) => {
                setBuffer(commandBuffer[commandBuffer.length - prev]);
                return prev - 1;
            });
        } else if (cbIndexRef.current === 0) {
            setCbIndex(-1);
            setBuffer("");
        }
    }
    function handlePreviousCommand() {
        console.log("HandlePreviousCommand", cbIndexRef.current);
        console.log(cbIndexRef.current, commandBuffer.length - 1);
        if (cbIndexRef.current < commandBuffer.length - 1) {
            setCbIndex((prev) => {
                setBuffer(commandBuffer[commandBuffer.length - (prev + 2)]);
                console.log(prev + 1);
                return prev + 1;
            });
        }
    }

    function handleSubmitCommand() {
        setCommandBuffer((prev) => {
            console.log("buffer", bufferRef.current);
            let cp = [...prev, bufferRef.current];
            console.log("command buffer", cp);
            setBuffer("");
            setCbIndex(-1);
            return cp;
        });
        // TODO: add the commmand to the visible buffer
        // TODO: use the bash engine to run the command and set the command output
    }

    useEffect(() => {
        console.log("Sanity check", buffer);
        bufferRef.current = buffer;
        cbIndexRef.current = cbIndex;
    }, [buffer, cbIndex]);

    return (
        <div className="terminal">
            {commandBuffer.map((c, i) => (
                <SingleTerminalCommand key={i} value={c} />
            ))}
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
