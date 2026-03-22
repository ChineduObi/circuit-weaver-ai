import { CircuitBoard } from "lucide-react";
import InputPanel from "@/components/dashboard/InputPanel";
import PipelineVisualization from "@/components/dashboard/PipelineVisualization";
import IterationPanel from "@/components/dashboard/IterationPanel";
import ResultsDashboard from "@/components/dashboard/ResultsDashboard";
import LogsTerminal from "@/components/dashboard/LogsTerminal";
import NetlistViewer from "@/components/dashboard/NetlistViewer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <CircuitBoard className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-foreground leading-tight tracking-tight">AIDE</h1>
            <p className="text-[11px] text-muted-foreground">AI-Driven Electronic Design</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            Cadence Connected
          </div>
          <span className="text-[10px] font-mono text-muted-foreground">v2.4.1</span>
        </div>
      </header>

      {/* Pipeline */}
      <div className="px-6 pt-5">
        <PipelineVisualization />
      </div>

      {/* Main grid */}
      <div className="flex-1 p-6 grid grid-cols-12 gap-5 min-h-0">
        {/* Left column: Input */}
        <div className="col-span-12 lg:col-span-3 min-h-[320px]">
          <InputPanel />
        </div>

        {/* Center: Iterations + Results */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-5 min-h-0">
          <div className="flex-1 min-h-[220px]">
            <IterationPanel />
          </div>
          <div className="flex-1 min-h-[220px]">
            <ResultsDashboard />
          </div>
        </div>

        {/* Right column: Netlist */}
        <div className="col-span-12 lg:col-span-4 min-h-[320px]">
          <NetlistViewer />
        </div>
      </div>

      {/* System Logs — full width bottom */}
      <div className="px-6 pb-6">
        <div className="h-[200px]">
          <LogsTerminal />
        </div>
      </div>
    </div>
  );
};

export default Index;
