import useKeyboard from "@/lib/terminal/keyboard";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

type Props = {};
const ED_NORMAL: string = "normal";
const ED_INSERT: string = "insert";
const ED_VISUAL: string = "visual";
export default function TerminalScreen({}: Props) {
  const router = useRouter();
  const [event, setEvent] = useState({ key: "" });
  const [mode, setMode] = useState(ED_NORMAL);
  const [command, setCommand] = useState("");
  const inputRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  useEffect((): void => {
    console.log(mode, event);
    if (event.key === "esc") {
      setMode(ED_NORMAL);
      // inputRef.current?.blur();
      return;
    }
    if (mode === ED_INSERT) {
      if (event.key === "Backspace") {
        setCommand((command) => command.slice(0, -1));
        return;
      }
      setCommand((command) => command + event.key);
      return;
    }
    if (mode === ED_NORMAL) {
      if (event.key === "i") {
        setMode(ED_INSERT);
        // inputRef.current?.focus();
        return;
      }
    }
    return;
  }, [event]);

  useKeyboard(async (e) => {
    console.log(e);
    setEvent(() => ({ key: e }));
    return true;
  });
  return (
    <div className="px-4 text-black">
      <h1 className="text-mono text-3xl">Terminal</h1>
      <div className="text-2xl">{event.key}</div>
      <div className="text-2xl">{mode}</div>
      <div
        ref={inputRef}
        className="border-1 border-slate-600 text-2xl text-green"
      >
        &gt; {command}
      </div>
    </div>
  );
}

export function TestUseKeyboardScreen({}: Props) {
  const router = useRouter();
  const [keyPress, setKeypres] = useState("");
  useKeyboard((e) => {
    setKeypres(e);
    return true;
  });
  return (
    <div className="px-4 text-black">
      <h1 className="text-mono text-3xl">Terminal</h1>
      <div className="text-2xl">{keyPress}</div>
    </div>
  );
}
