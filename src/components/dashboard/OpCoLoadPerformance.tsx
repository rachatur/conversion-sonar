import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

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
  if (avg >= 30) {
    return { label: "Excellent", color: "bg-[#28a745] text-white" };
  } else {
    return { label: "Needs Review", color: "bg-[#dc3545] text-white" };
  }
};

const getPercentColor = (percent: number) => {
  if (percent >= 40) return "text-[#28a745]";
  if (percent >= 20) return "text-[#ffc107]";
  return "text-[#dc3545]";
};

const getProgressColor = (percent: number) => {
  if (percent >= 40) return "bg-[#28a745]";
  if (percent >= 20) return "bg-[#ffc107]";
  return "bg-[#dc3545]";
};

const getPercentIcon = (percent: number) => {
  if (percent >= 40) return <CheckCircle className="h-4 w-4 text-[#28a745]" />;
  if (percent >= 20) return <AlertTriangle className="h-4 w-4 text-[#ffc107]" />;
  return <XCircle className="h-4 w-4 text-[#dc3545]" />;
};

export function OpCoLoadPerformance({ data, title = "OpCo Load Performance" }: OpCoLoadPerformanceProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((opco) => {
          const status = getStatusBadge(opco.headersLoad, opco.linesLoad);
          return (
            <div key={opco.name} className="bg-card rounded-lg border border-border p-5 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h4 className="text-xl font-bold text-foreground">{opco.name}</h4>
                <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${status.color}`}>
                  {status.label}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Headers Load %</span>
                    <div className="flex items-center gap-1.5">
                      {getPercentIcon(opco.headersLoad)}
                      <span className={`text-sm font-semibold ${getPercentColor(opco.headersLoad)}`}>
                        {opco.headersLoad}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${getProgressColor(opco.headersLoad)}`}
                      style={{ width: `${Math.min(opco.headersLoad, 100)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Lines Load %</span>
                    <div className="flex items-center gap-1.5">
                      {getPercentIcon(opco.linesLoad)}
                      <span className={`text-sm font-semibold ${getPercentColor(opco.linesLoad)}`}>
                        {opco.linesLoad}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${getProgressColor(opco.linesLoad)}`}
                      style={{ width: `${Math.min(opco.linesLoad, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-5 pt-4 border-t border-border">
                <div className="text-center">
                  <span className="text-sm text-muted-foreground block mb-1">Source</span>
                  <span className="text-lg font-bold text-foreground">{opco.source.toLocaleString()}</span>
                </div>
                <div className="text-center">
                  <span className="text-sm text-muted-foreground block mb-1">Loaded</span>
                  <span className="text-lg font-bold text-foreground">{opco.loaded.toLocaleString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}