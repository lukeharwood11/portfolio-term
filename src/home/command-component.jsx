import "./home.page.css";
import { useState, useEffect, useRef, useId } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const LinkComponent = ({ href, children }) => {
    return (
        <a href={href} target="_blank" rel="noreferrer">
            {children}
        </a>
    );
};

export const SingleTerminalCommand = ({
    focus,
    onPreviousCommand,
    onNextCommand,
    onChange,
    value,
    cwd,
    output,
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
        e.stopPropagation();
        e.preventDefault();
        if (!focus) {
            return;
        }
        switch (e.key) {
            case "ArrowUp":
                onPreviousCommand((value) => setCaretPos(value.length));
                break;
            case "ArrowDown":
                onNextCommand((value) => setCaretPos(value.length));
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
        // the caret position can quickly get bigger than the value when flipping back to previous commands
        if (caretPos >= value.length) {
            setCaretPos(value.length);
        }
    }, [value]);

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
                    <span className="cwd">{cwd}</span>
                    <span className="white">$</span>
                </span>
                <div ref={terminalInputRef} className="terminal-input"></div>
            </div>
            <Markdown
                remarkPlugins={[remarkGfm]}
                className="terminal-output"
                components={{ a: LinkComponent }}>
                {output}
            </Markdown>
        </div>
    );
};
