import { useState } from "react";
import { Send, Zap } from "lucide-react";

const specs = [
  { label: "Gain (dB)", key: "gain", placeholder: "60", unit: "dB" },
  { label: "Bandwidth (MHz)", key: "bandwidth", placeholder: "100", unit: "MHz" },
  { label: "Power (mW)", key: "power", placeholder: "5", unit: "mW" },
  { label: "Phase Margin (°)", key: "phaseMargin", placeholder: "60", unit: "°" },
  { label: "CMRR (dB)", key: "cmrr", placeholder: "80", unit: "dB" },
  { label: "Slew Rate (V/μs)", key: "slewRate", placeholder: "50", unit: "V/μs" },
];

const InputPanel = () => {
  const [nlInput, setNlInput] = useState("");
  const [values, setValues] = useState<Record<string, string>>({});

  return (
    <div className="panel h-full flex flex-col">
      <div className="panel-header">
        <span className="panel-title flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-primary" />
          Circuit Specifications
        </span>
      </div>
      <div className="panel-body flex-1 flex flex-col gap-4 overflow-y-auto scrollbar-thin">
        {/* Natural language input */}
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">
            Describe your circuit requirements
          </label>
          <div className="relative">
            <textarea
              value={nlInput}
              onChange={(e) => setNlInput(e.target.value)}
              placeholder="Design a two-stage CMOS op-amp with 60dB gain, 100MHz UGB, and less than 5mW power consumption..."
              className="input-field w-full rounded-md px-3 py-2.5 text-sm resize-none h-20 border pr-10"
            />
            <button className="absolute right-2 bottom-2 p-1.5 rounded bg-primary text-primary-foreground hover:opacity-90 transition-opacity active:scale-95">
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="glow-line" />

        {/* Spec fields */}
        <div className="grid grid-cols-2 gap-3">
          {specs.map((spec) => (
            <div key={spec.key}>
              <label className="text-[11px] text-muted-foreground mb-1 block uppercase tracking-wider">
                {spec.label}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={values[spec.key] || ""}
                  onChange={(e) => setValues({ ...values, [spec.key]: e.target.value })}
                  placeholder={spec.placeholder}
                  className="input-field w-full rounded-md px-3 py-2 text-sm border font-mono"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">
                  {spec.unit}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-auto w-full py-2.5 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity active:scale-[0.98]">
          Run Optimization
        </button>
      </div>
    </div>
  );
};

export default InputPanel;
