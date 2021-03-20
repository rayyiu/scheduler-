import React, { useState } from "react";
export default function useVisualMode(initMode) {
    const [mode, setMode] = useState(initMode)
    const [history, setHistory] = useState([initMode]);

    const transition = function (newMode, replace = false) {
        if (replace) {
            setMode(newMode);
        } else {
            setHistory((prev) => {
                return [...prev, newMode]
            });
            setMode(newMode);
        }
    }

    const back = function () {
        if (history.length <= 1) {
            return;
        } else {
            history.pop()
            setMode(history[history.length - 1])
        }
    }

    return { mode, transition, back };

}
