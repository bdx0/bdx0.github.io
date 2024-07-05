import { useEffect } from "react";

export type Key = string;

const shiftMap: { [key: string]: Key } = {
    '`': '~',
    '1': '!',
    '2': '@',
    '3': '#',
    '4': '$',
    '5': '%',
    '6': '^',
    '7': '&',
    '8': '*',
    '9': '(',
    '0': ')',
    '-': '_',
    '=': '+',
    '[': '{',
    ']': '}',
    ';': ':',
    '\'': '"',
    '\\': '|',
    '.': '>',
    ',': '<',
    '/': '?',
};

export function useKeyboard(handleKeyDown?: (key: string) => any, handleKeyUp?: () => any) {
    useEffect(() => {
        const _handleKeyDown = (e: KeyboardEvent) => {
            if (e.defaultPrevented) {
                return; // Do nothing if the event was already processed
            }
            var key = e.key
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
            handleKeyDown?.call({}, key);
        }
        const _handleKeyUp = () => {
            handleKeyUp?.call({});
        }
        window.addEventListener("keydown", _handleKeyDown);
        window.addEventListener("keyup", _handleKeyUp);
        return () => {
            window.removeEventListener("keydown", _handleKeyDown);
            window.removeEventListener("keyup", _handleKeyUp);
        }

    }, []);
}