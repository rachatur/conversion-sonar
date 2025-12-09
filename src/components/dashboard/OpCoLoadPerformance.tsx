import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { ProgressBar } from "./ProgressBar";

interface OpCoPerformanceData {
  name: string;
  headersLoad: number;
  linesLoad: number;
  source: number;
  loaded: number;
}

interface OpCoLoadPerformanceProps {
  data: OpCoPerformanceData[];
  title?: string;
}

const getStatusBadge = (headersLoad: number, linesLoad: number) => {
  const avg = (headersLoad + linesLoad) / 2;
  if (avg >= 40) {
    return { label: "Excellent", color: "bg-success text-white" };
  } else if (avg >= 20) {
    return { label: "Needs Review", color: "bg-destructive text-white" };
  } else {
    return { label: "Needs Review", color: "bg-destructive text-white" };
  }
};

const getPercentColor = (percent: number) => {
  if (percent >= 40) return "text-success";
  if (percent >= 20) return "text-warning";
  return "text-destructive";
};

const getProgressVariant = (percent: number): "success" | "warning" | "error" => {
  if (percent >= 40) return "success";
  if (percent >= 20) return "warning";
  return "error";
};

const getPercentIcon = (percent: number) => {
  if (percent >= 40) return <CheckCircle className="h-4 w-4 text-success" />;
  if (percent >= 20) return <AlertTriangle className="h-4 w-4 text-warning" />;
  return <XCircle className="h-4 w-4 text-destructive" />;
};

export function OpCoLoadPerformance({ data, title = "OpCo Load Performance" }: OpCoLoadPerformanceProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((opco) => {
          const status = getStatusBadge(opco.headersLoad, opco.linesLoad);
          return (
            <div key={opco.name} className="stat-card p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-semibold text-foreground">{opco.name}</h4>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                  {status.label}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Headers Load %</span>
                    <div className="flex items-center gap-1">
                      {getPercentIcon(opco.headersLoad)}
                      <span className={`text-sm font-medium ${getPercentColor(opco.headersLoad)}`}>
                        {opco.headersLoad}%
                      </span>
                    </div>
                  </div>
                  <ProgressBar value={opco.headersLoad} max={100} variant={getProgressVariant(opco.headersLoad)} showLabel={false} />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Lines Load %</span>
                    <div className="flex items-center gap-1">
                      {getPercentIcon(opco.linesLoad)}
                      <span className={`text-sm font-medium ${getPercentColor(opco.linesLoad)}`}>
                        {opco.linesLoad}%
                      </span>
                    </div>
                  </div>
                  <ProgressBar value={opco.linesLoad} max={100} variant={getProgressVariant(opco.linesLoad)} showLabel={false} />
                </div>
              </div>

              <div className="flex justify-between mt-4 pt-3 border-t border-border">
                <div className="text-center">
                  <span className="text-xs text-muted-foreground block">Source</span>
                  <span className="text-sm font-semibold text-foreground">{opco.source.toLocaleString()}</span>
                </div>
                <div className="text-center">
                  <span className="text-xs text-muted-foreground block">Loaded</span>
                  <span className="text-sm font-semibold text-foreground">{opco.loaded.toLocaleString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
