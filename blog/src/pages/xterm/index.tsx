"use client";

import useTerminal from "@/lib/terminal";
import { useState } from "react";

type Props = {};

export default function TerminalScreen({}: Props) {
  const [command, setCommand] = useState("");
  const ref = useTerminal((cmd) => {
    setCommand(cmd);
  });

  return (
    <div className="flex flex-col items-center">
      <div className="flex text-black">{command}</div>
      <div ref={ref} className="flex flex-col"></div>;
    </div>
  );
}
