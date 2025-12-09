import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ReconSummaryRow {
  metric: string;
  [key: string]: string | number;
}

interface ReconSummaryTableProps {
  title: string;
  data: ReconSummaryRow[];
  columns: { key: string; label: string }[];
}

export function ReconSummaryTable({ title, data, columns }: ReconSummaryTableProps) {
  const getRowStyle = (metric: string) => {
    if (metric.toLowerCase().includes("loaded successfully") || metric.toLowerCase().includes("loaded successful")) {
      return "bg-green-50 dark:bg-green-950/30";
    }
    return "";
  };

  const getCellStyle = (metric: string, value: string | number) => {
    if (metric.toLowerCase().includes("loaded successfully") || metric.toLowerCase().includes("loaded successful")) {
      return "text-green-600 dark:text-green-400 font-semibold";
    }
    if (metric.toLowerCase().includes("errored") || metric.toLowerCase().includes("error")) {
      return "text-red-500 dark:text-red-400";
    }
    return "text-primary";
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
              <TableHead className="font-semibold text-foreground min-w-[180px]"></TableHead>
              {columns.map((col) => (
                <TableHead key={col.key} className="font-semibold text-foreground text-center min-w-[100px]">
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} className={getRowStyle(row.metric)}>
                <TableCell className="font-medium text-muted-foreground">{row.metric}</TableCell>
                {columns.map((col) => (
                  <TableCell 
                    key={col.key} 
                    className={`text-center ${getCellStyle(row.metric, row[col.key])}`}
                  >
                    {row[col.key] === "-" ? "-" : typeof row[col.key] === "number" ? row[col.key].toLocaleString() : row[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
