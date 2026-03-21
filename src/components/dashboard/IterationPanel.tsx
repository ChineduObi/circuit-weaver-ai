import { CheckCircle2, TrendingUp, XCircle } from "lucide-react";

interface Iteration {
  id: number;
  params: Record<string, string>;
  results: Record<string, string>;
  error: string;
  status: "success" | "improving" | "failed";
}

const iterations: Iteration[] = [
  {
    id: 1,
    params: { W1: "10μ", L1: "0.5μ", Ib: "20μA", Cc: "1.2pF" },
    results: { Gain: "42.3 dB", BW: "67 MHz", Power: "6.1 mW" },
    error: "29.5%",
    status: "failed",
  },
  {
    id: 2,
    params: { W1: "18μ", L1: "0.36μ", Ib: "35μA", Cc: "0.8pF" },
    results: { Gain: "51.7 dB", BW: "82 MHz", Power: "5.4 mW" },
    error: "13.8%",
    status: "improving",
  },
  {
    id: 3,
    params: { W1: "24μ", L1: "0.28μ", Ib: "42μA", Cc: "0.6pF" },
    results: { Gain: "57.2 dB", BW: "93 MHz", Power: "5.1 mW" },
    error: "4.7%",
    status: "improving",
  },
  {
    id: 4,
    params: { W1: "28μ", L1: "0.25μ", Ib: "48μA", Cc: "0.5pF" },
    results: { Gain: "59.8 dB", BW: "98 MHz", Power: "4.9 mW" },
    error: "0.3%",
    status: "success",
  },
];

const statusConfig = {
  success: { icon: CheckCircle2, class: "status-success", label: "Converged" },
  improving: { icon: TrendingUp, class: "status-improving", label: "Improving" },
  failed: { icon: XCircle, class: "status-failed", label: "Failed" },
};

const IterationPanel = () => {
  return (
    <div className="panel h-full flex flex-col">
      <div className="panel-header">
        <span className="panel-title">Optimization Iterations</span>
        <span className="text-xs font-mono text-success">4/4 complete</span>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {iterations.map((iter, idx) => {
          const st = statusConfig[iter.status];
          const Icon = st.icon;
          return (
            <div
              key={iter.id}
              className="border-b border-border last:border-b-0 px-4 py-3 opacity-0 animate-fade-up"
              style={{ animationDelay: `${idx * 100}ms`, animationFillMode: "forwards" }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-foreground">
                  Iteration #{iter.id}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-muted-foreground">
                    err: {iter.error}
                  </span>
                  <span className={`status-badge ${st.class}`}>
                    <Icon className="w-3 h-3 mr-1" />
                    {st.label}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
                <div>
                  <span className="text-muted-foreground">Params: </span>
                  <span className="font-mono text-secondary-foreground">
                    {Object.entries(iter.params)
                      .map(([k, v]) => `${k}=${v}`)
                      .join(", ")}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Results: </span>
                  <span className="font-mono text-secondary-foreground">
                    {Object.entries(iter.results)
                      .map(([k, v]) => `${k}=${v}`)
                      .join(", ")}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IterationPanel;
