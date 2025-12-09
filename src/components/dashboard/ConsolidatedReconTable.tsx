import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ReconRow {
  metric: string;
  [key: string]: string | number;
}

interface OpCoReconData {
  name: string;
  data: ReconRow[];
}

interface ConsolidatedReconTableProps {
  title: string;
  opCoDataList: OpCoReconData[];
  dataColumns: { key: string; label: string }[];
}

export function ConsolidatedReconTable({ title, opCoDataList, dataColumns }: ConsolidatedReconTableProps) {
  // Get all unique metrics from the first OpCo's data
  const metrics = opCoDataList[0]?.data.map(row => row.metric) || [];

  const getRowStyle = (metric: string) => {
    if (metric.toLowerCase().includes("loaded successfully") || metric.toLowerCase().includes("loaded successful")) {
      return "bg-green-50 dark:bg-green-950/30";
    }
    return "";
  };

  const getCellStyle = (metric: string) => {
    if (metric.toLowerCase().includes("loaded successfully") || metric.toLowerCase().includes("loaded successful")) {
      return "text-green-600 dark:text-green-400 font-semibold";
    }
    if (metric.toLowerCase().includes("errored") || metric.toLowerCase().includes("error")) {
      return "text-red-500 dark:text-red-400";
    }
    return "text-primary";
  };

  const formatValue = (value: string | number) => {
    if (value === "-") return "-";
    if (typeof value === "number") return value.toLocaleString();
    return value;
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="bg-primary px-4 py-3">
        <h3 className="text-primary-foreground font-semibold text-base">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold text-foreground min-w-[180px] sticky left-0 bg-muted/50 z-10">Metric</TableHead>
              <TableHead className="font-semibold text-foreground min-w-[100px] sticky left-[180px] bg-muted/50 z-10">Data Type</TableHead>
              {opCoDataList.map((opCo) => (
                <TableHead key={opCo.name} className="font-semibold text-foreground text-center min-w-[100px]">
                  {opCo.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {metrics.map((metric, metricIndex) => (
              dataColumns.map((col, colIndex) => (
                <TableRow 
                  key={`${metric}-${col.key}`} 
                  className={`${getRowStyle(metric)} ${colIndex === 0 ? 'border-t-2 border-border' : ''}`}
                >
                  {colIndex === 0 && (
                    <TableCell 
                      rowSpan={dataColumns.length} 
                      className="font-medium text-muted-foreground align-top sticky left-0 bg-card z-10"
                    >
                      {metric}
                    </TableCell>
                  )}
                  <TableCell className="text-sm text-muted-foreground sticky left-[180px] bg-card z-10">
                    {col.label}
                  </TableCell>
                  {opCoDataList.map((opCo) => {
                    const rowData = opCo.data.find(r => r.metric === metric);
                    const value = rowData ? rowData[col.key] : "-";
                    return (
                      <TableCell 
                        key={`${opCo.name}-${col.key}`}
                        className={`text-center ${getCellStyle(metric)}`}
                      >
                        {formatValue(value)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
