import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

interface CustomerBreakdownData {
  name: string;
  customerLoad: number;
  billToLoad: number;
  shipToLoad: number;
  customer: { source: number; loaded: number };
  billTo: { source: number; loaded: number };
  shipTo: { source: number; loaded: number };
}

interface CustomerDetailedBreakdownProps {
  data: CustomerBreakdownData[];
  title?: string;
  selectedOpCo?: string;
  onOpCoSelect?: (opCoName: string) => void;
}

const getStatusBadge = (avgLoad: number) => {
  if (avgLoad >= 90) {
    return { label: "Excellent", color: "bg-[#28a745] text-white" };
  } else if (avgLoad >= 70) {
    return { label: "Good", color: "bg-[#ffc107] text-foreground" };
  } else {
    return { label: "Needs Review", color: "bg-[#dc3545] text-white" };
  }
};

const getPercentColor = (percent: number) => {
  if (percent >= 90) return "text-[#28a745]";
  if (percent >= 70) return "text-[#ffc107]";
  return "text-[#dc3545]";
};

const getProgressColor = (percent: number) => {
  if (percent >= 90) return "bg-[#28a745]";
  if (percent >= 70) return "bg-[#ffc107]";
  return "bg-[#dc3545]";
};

const getPercentIcon = (percent: number) => {
  if (percent >= 90) return <CheckCircle className="h-4 w-4 text-[#28a745]" />;
  if (percent >= 70) return <AlertTriangle className="h-4 w-4 text-[#ffc107]" />;
  return <XCircle className="h-4 w-4 text-[#dc3545]" />;
};

interface LoadRowProps {
  label: string;
  loadPercent: number;
  source: number;
  loaded: number;
}

function LoadRow({ label, loadPercent, source, loaded }: LoadRowProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <div className="flex items-center gap-1.5">
          {getPercentIcon(loadPercent)}
          <span className={`text-sm font-semibold ${getPercentColor(loadPercent)}`}>
            {loadPercent.toFixed(1)}%
          </span>
        </div>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all ${getProgressColor(loadPercent)}`}
          style={{ width: `${Math.min(loadPercent, 100)}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Source: {source.toLocaleString()}</span>
        <span>Loaded: {loaded.toLocaleString()}</span>
      </div>
    </div>
  );
}

export function CustomerDetailedBreakdown({ 
  data, 
  title = "OpCo Load Performance",
  selectedOpCo,
  onOpCoSelect
}: CustomerDetailedBreakdownProps) {

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((opco) => {
          const avgLoad = (opco.customerLoad + opco.billToLoad + opco.shipToLoad) / 3;
          const status = getStatusBadge(avgLoad);
          const isSelected = selectedOpCo === opco.name;
          return (
            <div 
              key={opco.name} 
              className="bg-card rounded-lg border border-border p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-5">
                <h4 className="text-xl font-bold text-foreground">{opco.name}</h4>
                <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${status.color}`}>
                  {status.label}
                </span>
              </div>

              <div className="space-y-4">
                <LoadRow 
                  label="Customer" 
                  loadPercent={opco.customerLoad} 
                  source={opco.customer.source} 
                  loaded={opco.customer.loaded} 
                />
                <LoadRow 
                  label="Customer Sites (Bill To)" 
                  loadPercent={opco.billToLoad} 
                  source={opco.billTo.source} 
                  loaded={opco.billTo.loaded} 
                />
                <LoadRow 
                  label="Customer Sites (Ship To)" 
                  loadPercent={opco.shipToLoad} 
                  source={opco.shipTo.source} 
                  loaded={opco.shipTo.loaded} 
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
