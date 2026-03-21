import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";

const metrics = [
  { label: "Gain", target: 60, actual: 59.8, unit: "dB" },
  { label: "Bandwidth", target: 100, actual: 98, unit: "MHz" },
  { label: "Power", target: 5, actual: 4.9, unit: "mW" },
  { label: "Phase Margin", target: 60, actual: 62.3, unit: "°" },
];

const chartData = metrics.map((m) => ({
  name: m.label,
  target: m.target,
  actual: m.actual,
  pct: Math.min((m.actual / m.target) * 100, 100),
}));

const ResultsDashboard = () => {
  return (
    <div className="panel h-full flex flex-col">
      <div className="panel-header">
        <span className="panel-title">Results Overview</span>
        <span className="status-badge status-success">All specs met</span>
      </div>
      <div className="panel-body flex-1 flex flex-col gap-4">
        {/* Metric cards */}
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((m) => {
            const pct = (m.actual / m.target) * 100;
            const met = pct >= 95;
            return (
              <div
                key={m.label}
                className="rounded-md p-3"
                style={{ background: "hsl(var(--surface-elevated))" }}
              >
                <div className="flex items-baseline justify-between">
                  <span className="metric-value" style={{ color: met ? "hsl(var(--success))" : "hsl(var(--warning))" }}>
                    {m.actual}
                    <span className="text-xs text-muted-foreground ml-1">{m.unit}</span>
                  </span>
                </div>
                <div className="metric-label">{m.label}</div>
                <div className="mt-2 h-1 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.min(pct, 100)}%`,
                      background: met ? "hsl(var(--success))" : "hsl(var(--warning))",
                    }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-[10px] text-muted-foreground font-mono">
                  <span>Target: {m.target}{m.unit}</span>
                  <span>{pct.toFixed(1)}%</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bar chart */}
        <div className="flex-1 min-h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barGap={4}>
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: "hsl(215, 12%, 52%)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Bar dataKey="target" radius={[3, 3, 0, 0]} maxBarSize={24}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill="hsl(225, 15%, 22%)" />
                ))}
              </Bar>
              <Bar dataKey="actual" radius={[3, 3, 0, 0]} maxBarSize={24}>
                {chartData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={entry.pct >= 95 ? "hsl(152, 56%, 45%)" : "hsl(38, 92%, 50%)"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
