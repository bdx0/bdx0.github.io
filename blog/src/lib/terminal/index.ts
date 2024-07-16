import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import { useEffect, useRef } from "react";
import "./command";
export * from "./keyboard";

export default function useTerminal(fn: (command: string) => any) {
  const terminal = useRef<Terminal | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const terminal_prompt = () => {
    terminal.current?.write("\r\n$ ");
  };

  useEffect(() => {
    terminal.current?.dispose();

    terminal.current = new Terminal({
      fontFamily: '"Fira Code","Hack"',
      cursorBlink: true,
      rows: 50,
      fontSize: 14,
      theme: {
        background: "#262626",
      },
    });
    if (ref.current) {
      terminal.current?.open(ref.current);
      terminal.current?.onKey(({ key, domEvent }) => {
        // ws.send ...
        const ev = domEvent;
        const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;
        const eventStr = `${key} ${ev.key} ${ev.code}`;
        const aBuf = terminal.current?.buffer.active;

        if (ev.code === "Enter") {
          const cmd = aBuf?.getLine(aBuf.cursorY)?.translateToString();
          fn?.apply(self, [`${eventStr} ${cmd}`]);
          terminal_prompt();
        } else if (ev.code === "Backspace") {
          // Do not delete the prompt
          if (aBuf && aBuf.cursorX > 2) {
            terminal.current?.write("\b \b");
          }
        } else if (key === "[A") {
        } else if (printable) {
          terminal.current?.write(key);
        }
      });
      // term.current?.onData((e) => {
      //   console.log(e);
      // });

      terminal_prompt();
      terminal.current?.focus();
    }

    (async () => {
      const { FitAddon } = await import("@xterm/addon-fit");
      const fitAddon = new FitAddon();
      if (ref.current) {
        terminal.current?.loadAddon(fitAddon);
        fitAddon.fit();
        window.addEventListener("resize", () => {
          fitAddon.fit();
        });
      }
    })();
    return () => {
      terminal.current?.dispose();
    };
  }, []);
  return ref;
}
