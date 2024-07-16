import { useEffect } from "react";

export default function useKeyboard(callback?: (key: string) => any) {
    const shiftMap: { [key: string]: string } = {
        "`": "~",
        "1": "!",
        "2": "@",
        "3": "#",
        "4": "$",
        "5": "%",
        "6": "^",
        "^": "^",
        "7": "&",
        "8": "*",
        "9": "(",
        "0": ")",
        "-": "_",
        _: "_",
        "=": "+",
        "[": "{",
        "]": "}",
        ";": ":",
        "'": '"',
        "\\": "|",
        ".": ">",
        ",": "<",
        "/": "?",
    };
    const keyMap: { [key: string]: string } = {
        Escape: "esc",
    };

    const ignoreMap: { [keyCode: number]: string } = {
        16: "shift alone",
        17: "ctrl alone",
        18: "alt alone",
        91: "left command alone",
        93: "right command alone",
    };
    useEffect(() => {
        function handleKeypress(e: KeyboardEvent) {
            if (e.defaultPrevented) {
                return false; // Do nothing if the event was already processed
            }
            let key;
            // keyEmitter.ts:157
            // IME input keycode is 229
            if (e.key in ignoreMap) {
                return true;
            }

            if (e.key) {
                if (e.key in keyMap) {
                    key = keyMap[e.key];
                } else {
                    key = e.key;
                }

                if (e.shiftKey) {
                    if (key in shiftMap) {
                        key = shiftMap[key];
                    } else {
                        key = `shift+${key}`;
                    }
                }

                if (e.altKey) {
                    key = `alt+${key}`;
                }

                if (e.ctrlKey) {
                    key = `ctrl+${key}`;
                }

                if (e.metaKey) {
                    key = `meta+${key}`;
                }

                // logger.debug('e.code:', e.code, 'keycode:', e.keyCode, 'key:', key, e.key);
                // const results = this.emit("keydown", key);
                // return false to stop propagation, if any handler handled the key
                // if (_.some(results)) {
                //   e.stopPropagation();
                //   e.preventDefault();
                //   return false;
                // return browser_utils.cancel(e);
                // }
                return callback?.apply({}, [key]) ?? true;
            }
            return true;
        }
        window.addEventListener("keydown", handleKeypress, true);
        return () => {
            window.removeEventListener("keydown", handleKeypress, true);
        };
    }, []);
}
