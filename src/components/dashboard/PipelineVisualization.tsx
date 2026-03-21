import { ChevronRight } from "lucide-react";

const stages = [
  { label: "User Input", short: "INPUT" },
  { label: "Prompt Processing", short: "PROMPT" },
  { label: "LLM Generation", short: "LLM" },
  { label: "Script Generator", short: "SCRIPT" },
  { label: "SPICE Netlist", short: "SPICE" },
  { label: "Cadence Sim", short: "SIM" },
  { label: "Results", short: "RESULTS" },
];

const activeIndex = 4; // Demo: currently at SPICE stage

const PipelineVisualization = () => {
  return (
    <div className="panel">
      <div className="panel-header">
        <span className="panel-title">Pipeline Status</span>
        <span className="text-[10px] font-mono text-primary">
          Iteration #4
        </span>
      </div>
      <div className="px-4 py-4 overflow-x-auto scrollbar-thin">
        <div className="flex items-center gap-1 min-w-max">
          {stages.map((stage, i) => (
            <div key={stage.short} className="flex items-center gap-1">
              <div
                className={`pipeline-node whitespace-nowrap ${
                  i < activeIndex
                    ? "pipeline-node-done"
                    : i === activeIndex
                    ? "pipeline-node-active animate-pulse-glow"
                    : "pipeline-node-idle"
                }`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="hidden sm:inline">{stage.label}</span>
                <span className="sm:hidden">{stage.short}</span>
              </div>
              {i < stages.length - 1 && (
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PipelineVisualization;
