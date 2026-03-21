import { useEffect, useRef } from "react";
import { Terminal } from "lucide-react";

const logLines = [
  { time: "14:23:01", msg: "[INIT] Starting optimization pipeline v2.4.1", type: "info" },
  { time: "14:23:01", msg: "[PARSE] Extracted 6 constraints from user input", type: "info" },
  { time: "14:23:02", msg: "[LLM] Generating initial circuit topology...", type: "info" },
  { time: "14:23:05", msg: "[LLM] Response received — two-stage folded-cascode OTA", type: "success" },
  { time: "14:23:06", msg: "[SCRIPT] Generating Cadence Virtuoso script...", type: "info" },
  { time: "14:23:07", msg: "[SPICE] Netlist generated: opamp_v4_iter1.scs", type: "info" },
  { time: "14:23:07", msg: "[CADENCE] Sending netlist to remote Cadence server...", type: "info" },
  { time: "14:23:12", msg: "[CADENCE] Simulation started — AC analysis", type: "info" },
  { time: "14:23:28", msg: "[CADENCE] Simulation complete. Retrieving results...", type: "success" },
  { time: "14:23:29", msg: "[EVAL] Gain=42.3dB (target 60dB) — ERROR 29.5%", type: "warn" },
  { time: "14:23:29", msg: "[OPT] Iteration 1 failed. Adjusting parameters...", type: "warn" },
  { time: "14:23:30", msg: "[LLM] Re-prompting with error feedback...", type: "info" },
  { time: "14:24:15", msg: "[EVAL] Gain=51.7dB — ERROR 13.8%. Improving.", type: "info" },
  { time: "14:25:02", msg: "[EVAL] Gain=57.2dB — ERROR 4.7%. Improving.", type: "info" },
  { time: "14:25:48", msg: "[EVAL] Gain=59.8dB — ERROR 0.3%. CONVERGED ✓", type: "success" },
  { time: "14:25:48", msg: "[DONE] All specifications met in 4 iterations.", type: "success" },
] as const;

const typeColor: Record<string, string> = {
  info: "text-[hsl(var(--terminal-green))]",
  success: "text-primary",
  warn: "text-warning",
};

const LogsTerminal = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="panel h-full flex flex-col">
      <div className="panel-header">
        <span className="panel-title flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[hsl(var(--terminal-green))]" />
          System Logs
        </span>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-destructive" />
          <span className="w-2.5 h-2.5 rounded-full bg-warning" />
          <span className="w-2.5 h-2.5 rounded-full bg-success" />
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto scrollbar-thin p-3"
        style={{ background: "hsl(var(--terminal-bg))" }}
      >
        {logLines.map((line, i) => (
          <div
            key={i}
            className={`font-mono text-[11px] leading-5 opacity-0 animate-slide-in ${typeColor[line.type]}`}
            style={{ animationDelay: `${i * 60}ms`, animationFillMode: "forwards" }}
          >
            <span className="text-muted-foreground mr-2 select-none">{line.time}</span>
            {line.msg}
          </div>
        ))}
        <div className="font-mono text-[11px] leading-5 mt-1 text-[hsl(var(--terminal-green))]">
          <span className="animate-terminal-blink">▌</span>
        </div>
      </div>
    </div>
  );
};

export default LogsTerminal;
