import { useState, useRef } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronRight, FileText, Download, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  content: string[][];
}

interface ConsolidatedReconTableProps {
  title: string;
  opCoDataList: OpCoReconData[];
  dataColumns: { key: string; label: string }[];
}

// Mock file data for AIRTECH OpCo with CSV content
const airtechFileData: FileData[] = [
  { 
    fileName: "AIRTECH_Customer_Master_20240115.csv", 
    uploadDate: "2024-01-15",
    content: [
      ["CustomerID", "CustomerName", "Address", "City", "Country", "Status"],
      ["CUST001", "ABC Industries", "123 Main St", "Sydney", "Australia", "Active"],
      ["CUST002", "XYZ Corp", "456 Oak Ave", "Melbourne", "Australia", "Active"],
      ["CUST003", "Tech Solutions", "789 Pine Rd", "Brisbane", "Australia", "Active"],
      ["CUST004", "Global Trading", "321 Elm St", "Perth", "Australia", "Inactive"],
      ["CUST005", "Premier Services", "654 Maple Dr", "Adelaide", "Australia", "Active"],
    ]
  },
  { 
    fileName: "AIRTECH_Customer_Master_20240116.csv", 
    uploadDate: "2024-01-16",
    content: [
      ["CustomerID", "CustomerName", "Address", "City", "Country", "Status"],
      ["CUST006", "Metro Supplies", "111 King St", "Sydney", "Australia", "Active"],
      ["CUST007", "City Logistics", "222 Queen Ave", "Melbourne", "Australia", "Active"],
      ["CUST008", "Regional Parts", "333 Duke Rd", "Brisbane", "Australia", "Active"],
    ]
  },
  { 
    fileName: "AIRTECH_BillTo_Sites_20240115.csv", 
    uploadDate: "2024-01-15",
    content: [
      ["SiteID", "CustomerID", "SiteName", "BillingAddress", "ContactEmail"],
      ["SITE001", "CUST001", "ABC HQ", "123 Main St, Sydney", "billing@abc.com"],
      ["SITE002", "CUST001", "ABC Branch", "456 Side St, Sydney", "branch@abc.com"],
      ["SITE003", "CUST002", "XYZ Main", "456 Oak Ave, Melbourne", "accounts@xyz.com"],
    ]
  },
  { 
    fileName: "AIRTECH_BillTo_Sites_20240116.csv", 
    uploadDate: "2024-01-16",
    content: [
      ["SiteID", "CustomerID", "SiteName", "BillingAddress", "ContactEmail"],
      ["SITE004", "CUST003", "Tech HQ", "789 Pine Rd, Brisbane", "finance@tech.com"],
      ["SITE005", "CUST004", "Global Office", "321 Elm St, Perth", "pay@global.com"],
    ]
  },
  { 
    fileName: "AIRTECH_ShipTo_Sites_20240115.csv", 
    uploadDate: "2024-01-15",
    content: [
      ["ShipToID", "CustomerID", "ShipToName", "ShippingAddress", "DeliveryNotes"],
      ["SHIP001", "CUST001", "ABC Warehouse", "100 Industrial Rd", "Dock 3"],
      ["SHIP002", "CUST002", "XYZ Distribution", "200 Logistics Ave", "Gate B"],
    ]
  },
];

export function ConsolidatedReconTable({ title, opCoDataList, dataColumns }: ConsolidatedReconTableProps) {
  const [expandedOpCo, setExpandedOpCo] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const fileDetailsRef = useRef<HTMLDivElement>(null);

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
      if (expandedOpCo === opCoName) {
        setExpandedOpCo(null);
      } else {
        setExpandedOpCo(opCoName);
        // Scroll to file details after state update
        setTimeout(() => {
          fileDetailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  };

  return (
    <>
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
              {metrics.map((metric) => (
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
                    <div ref={fileDetailsRef} className="bg-muted/30 p-4 border-t border-border">
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
                              <TableHead className="font-semibold text-foreground text-center">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {airtechFileData.map((file, idx) => (
                              <TableRow 
                                key={idx} 
                                className="hover:bg-muted/20"
                              >
                                <TableCell 
                                  className="font-medium text-primary hover:underline cursor-pointer"
                                  onClick={() => setSelectedFile(file)}
                                >
                                  <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                    {file.fileName}
                                  </div>
                                </TableCell>
                                <TableCell className="text-center text-muted-foreground">{file.uploadDate}</TableCell>
                                <TableCell className="text-center">
                                  <div className="flex items-center justify-center gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Download className="h-4 w-4 text-muted-foreground hover:text-primary" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                                    </Button>
                                  </div>
                                </TableCell>
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

      {/* File Content Dialog */}
      <Dialog open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {selectedFile?.fileName}
            </DialogTitle>
          </DialogHeader>
          <div className="overflow-auto max-h-[60vh] border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  {selectedFile?.content[0]?.map((header, idx) => (
                    <TableHead key={idx} className="font-semibold text-foreground whitespace-nowrap">
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedFile?.content.slice(1).map((row, rowIdx) => (
                  <TableRow key={rowIdx}>
                    {row.map((cell, cellIdx) => (
                      <TableCell key={cellIdx} className="whitespace-nowrap">
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
