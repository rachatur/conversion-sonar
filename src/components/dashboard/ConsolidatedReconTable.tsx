import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronRight, FileText } from "lucide-react";

interface ReconRow {
  metric: string;
  [key: string]: string | number;
}

interface OpCoReconData {
  name: string;
  data: ReconRow[];
}

interface FileData {
  fileName: string;
  uploadDate: string;
  totalRecords: number;
  loadedRecords: number;
  errorRecords: number;
  status: "success" | "partial" | "error";
}

interface ConsolidatedReconTableProps {
  title: string;
  opCoDataList: OpCoReconData[];
  dataColumns: { key: string; label: string }[];
}

// Mock file data for AIRTECH OpCo
const airtechFileData: FileData[] = [
  { fileName: "AIRTECH_Customer_Master_20240115.csv", uploadDate: "2024-01-15", totalRecords: 850, loadedRecords: 820, errorRecords: 0, status: "success" },
  { fileName: "AIRTECH_Customer_Master_20240116.csv", uploadDate: "2024-01-16", totalRecords: 720, loadedRecords: 695, errorRecords: 0, status: "success" },
  { fileName: "AIRTECH_Customer_Master_20240117.csv", uploadDate: "2024-01-17", totalRecords: 679, loadedRecords: 643, errorRecords: 0, status: "success" },
  { fileName: "AIRTECH_BillTo_Sites_20240115.csv", uploadDate: "2024-01-15", totalRecords: 1100, loadedRecords: 1065, errorRecords: 0, status: "success" },
  { fileName: "AIRTECH_BillTo_Sites_20240116.csv", uploadDate: "2024-01-16", totalRecords: 980, loadedRecords: 950, errorRecords: 0, status: "success" },
  { fileName: "AIRTECH_BillTo_Sites_20240117.csv", uploadDate: "2024-01-17", totalRecords: 663, loadedRecords: 637, errorRecords: 0, status: "success" },
  { fileName: "AIRTECH_ShipTo_Sites_20240115.csv", uploadDate: "2024-01-15", totalRecords: 180, loadedRecords: 105, errorRecords: 0, status: "partial" },
  { fileName: "AIRTECH_ShipTo_Sites_20240116.csv", uploadDate: "2024-01-16", totalRecords: 148, loadedRecords: 90, errorRecords: 0, status: "partial" },
];

export function ConsolidatedReconTable({ title, opCoDataList, dataColumns }: ConsolidatedReconTableProps) {
  const [expandedOpCo, setExpandedOpCo] = useState<string | null>(null);

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

  const handleOpCoClick = (opCoName: string) => {
    if (opCoName === "AIRTECH") {
      setExpandedOpCo(expandedOpCo === opCoName ? null : opCoName);
    }
  };

  const getStatusBadge = (status: FileData["status"]) => {
    switch (status) {
      case "success":
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Success</span>;
      case "partial":
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">Partial</span>;
      case "error":
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">Error</span>;
    }
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
                <TableHead 
                  key={opCo.name} 
                  className={`font-semibold text-foreground text-center min-w-[100px] ${opCo.name === "AIRTECH" ? "cursor-pointer hover:bg-primary/10 transition-colors" : ""}`}
                  onClick={() => handleOpCoClick(opCo.name)}
                >
                  <div className="flex items-center justify-center gap-1">
                    {opCo.name === "AIRTECH" && (
                      expandedOpCo === opCo.name ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                    )}
                    {opCo.name}
                  </div>
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
            
            {/* Expanded File Details for AIRTECH */}
            {expandedOpCo === "AIRTECH" && (
              <TableRow>
                <TableCell colSpan={2 + opCoDataList.length} className="p-0">
                  <div className="bg-muted/30 p-4 border-t border-border">
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold text-foreground">AIRTECH - File Level Details</h4>
                    </div>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50">
                            <TableHead className="font-semibold text-foreground">File Name</TableHead>
                            <TableHead className="font-semibold text-foreground text-center">Upload Date</TableHead>
                            <TableHead className="font-semibold text-foreground text-center">Total Records</TableHead>
                            <TableHead className="font-semibold text-foreground text-center">Loaded</TableHead>
                            <TableHead className="font-semibold text-foreground text-center">Errors</TableHead>
                            <TableHead className="font-semibold text-foreground text-center">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {airtechFileData.map((file, idx) => (
                            <TableRow key={idx} className="hover:bg-muted/20">
                              <TableCell className="font-medium text-foreground">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-muted-foreground" />
                                  {file.fileName}
                                </div>
                              </TableCell>
                              <TableCell className="text-center text-muted-foreground">{file.uploadDate}</TableCell>
                              <TableCell className="text-center text-foreground">{file.totalRecords.toLocaleString()}</TableCell>
                              <TableCell className="text-center text-green-600 dark:text-green-400 font-medium">{file.loadedRecords.toLocaleString()}</TableCell>
                              <TableCell className="text-center text-red-500">{file.errorRecords}</TableCell>
                              <TableCell className="text-center">{getStatusBadge(file.status)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="px-4 py-2 bg-muted/30 text-xs text-muted-foreground">
        💡 Click on <strong>AIRTECH</strong> column header to view file-level details
      </div>
    </div>
  );
}
