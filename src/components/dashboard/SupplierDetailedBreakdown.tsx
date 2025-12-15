import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

interface SupplierBreakdownData {
  name: string;
  suppliersLoad: number;
  addressLoad: number;
  sitesLoad: number;
  contactsLoad: number;
  suppliers: { source: number; loaded: number };
  address: { source: number; loaded: number };
  sites: { source: number; loaded: number };
  contacts: { source: number; loaded: number };
}

interface SupplierDetailedBreakdownProps {
  data: SupplierBreakdownData[];
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

export function SupplierDetailedBreakdown({ 
  data, 
  title = "OpCo Load Performance",
  selectedOpCo,
  onOpCoSelect
}: SupplierDetailedBreakdownProps) {

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((opco) => {
          const avgLoad = (opco.suppliersLoad + opco.addressLoad + opco.sitesLoad + opco.contactsLoad) / 4;
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
                  label="Suppliers" 
                  loadPercent={opco.suppliersLoad} 
                  source={opco.suppliers.source} 
                  loaded={opco.suppliers.loaded} 
                />
                <LoadRow 
                  label="Supplier Address" 
                  loadPercent={opco.addressLoad} 
                  source={opco.address.source} 
                  loaded={opco.address.loaded} 
                />
                <LoadRow 
                  label="Supplier Sites" 
                  loadPercent={opco.sitesLoad} 
                  source={opco.sites.source} 
                  loaded={opco.sites.loaded} 
                />
                <LoadRow 
                  label="Supplier Contacts" 
                  loadPercent={opco.contactsLoad} 
                  source={opco.contacts.source} 
                  loaded={opco.contacts.loaded} 
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
