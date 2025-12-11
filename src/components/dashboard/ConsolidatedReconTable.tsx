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

// File data for each OpCo
const opCoFileData: Record<string, FileData[]> = {
  AIRTECH: [
    { 
      fileName: "AIRTECH_Customer_Master.csv", 
      uploadDate: "2024-01-15",
      content: [
        ["Source File Records", "Total_Count", "", "FBDI File Records", "TOTAL_COUNT"],
        ["Total Customers", "450", "", "CUSTOMER", "442"],
        ["Total customer Sites", "515", "", "CUSTOMER_SITES(BILL_TO)", "442"],
        ["", "", "", "CUSTOMER_SITES(SHIP_TO)", "73"],
        ["Total Sales Order Customer", "90", "", "Total Sales Order Customer", "75"],
        ["Total Sales Order Customer(SHIP_TO)", "90", "", "Sales_Order-CUSTOMER_SITES(SHIP_TO)", "75"],
        ["", "", "", "CUSTOMER_CONTACTS_POINT", "573"],
        ["", "", "", "CUSTOMER_PROFILE_CLASS", "442"],
        ["", "", "", "CUSTOMER_CONTACTS", "382"],
      ]
    },
    { 
      fileName: "AIRTECH_BillTo_Sites.csv", 
      uploadDate: "2024-01-15",
      content: [
        ["SiteID", "CustomerID", "SiteName", "BillingAddress", "ContactEmail"],
        ["SITE001", "CUST001", "AIRTECH HQ", "123 Main St, Sydney", "billing@airtech.com"],
        ["SITE002", "CUST001", "AIRTECH Branch", "456 Side St, Sydney", "branch@airtech.com"],
      ]
    },
    { 
      fileName: "AIRTECH_ShipTo_Sites.csv", 
      uploadDate: "2024-01-15",
      content: [
        ["ShipToID", "CustomerID", "ShipToName", "ShippingAddress", "DeliveryNotes"],
        ["SHIP001", "CUST001", "AIRTECH Warehouse", "100 Industrial Rd", "Dock 3"],
      ]
    },
  ],
  ATS: [
    { 
      fileName: "ATS_Customer_Master.csv", 
      uploadDate: "2024-01-15",
      content: [
        ["Source File Records", "Total_Count", "", "FBDI File Records", "TOTAL_COUNT"],
        ["Total Customers", "1935", "", "CUSTOMER", "1843"],
        ["Total customer Sites", "2602", "", "CUSTOMER_SITES(BILL_TO)", "1843"],
        ["", "", "", "CUSTOMER_SITES(SHIP_TO)", "669"],
        ["Total Sales Order Customer", "438", "", "Total Sales Order Customer", "354"],
        ["Total Sales Order Customer(SHIP_TO)", "438", "", "Sales_Order-CUSTOMER_SITES(SHIP_TO)", "354"],
        ["", "", "", "CUSTOMER_CONTACTS_POINT", "2797"],
        ["", "", "", "CUSTOMER_PROFILE_CLASS", "1843"],
        ["", "", "", "CUSTOMER_CONTACTS", "1544"],
      ]
    },
    { 
      fileName: "ATS_BillTo_Sites.csv", 
      uploadDate: "2024-01-15",
      content: [
        ["SiteID", "CustomerID", "SiteName", "BillingAddress", "ContactEmail"],
        ["SITE001", "CUST001", "ATS HQ", "100 Commerce St", "billing@ats.com"],
      ]
    },
  ],
  "C&J": [
    { 
      fileName: "C_J_Customer_Master.csv", 
      uploadDate: "2024-01-15",
      content: [
        ["Source File Records", "Total_Count", "", "FBDI File Records", "TOTAL_COUNT"],
        ["Total Customers", "124", "", "CUSTOMER", "119"],
        ["Total customer Sites", "124", "", "CUSTOMER_SITES(BILL_TO)", "119"],
        ["", "", "", "CUSTOMER_SITES(SHIP_TO)", "84"],
        ["Total Sales Order Customer", "0", "", "Total Sales Order Customer", "0"],
        ["Total Sales Order Customer(SHIP_TO)", "0", "", "Sales_Order-CUSTOMER_SITES(SHIP_TO)", "0"],
        ["", "", "", "CUSTOMER_CONTACTS_POINT", "178"],
        ["", "", "", "CUSTOMER_PROFILE_CLASS", "119"],
        ["", "", "", "CUSTOMER_CONTACTS", "119"],
      ]
    },
    { 
      fileName: "C_J_BillTo_Sites.csv", 
      uploadDate: "2024-01-15",
      content: [
        ["SiteID", "CustomerID", "SiteName", "BillingAddress", "ContactEmail"],
        ["SITE001", "CUST001", "C&J HQ", "200 Main St", "billing@cj.com"],
      ]
    },
  ],
  DORSE: [
    { 
      fileName: "Dorse_Customer_Master.csv", 
      uploadDate: "2024-01-15",
      content: [
        ["Source File Records", "Total_Count", "", "FBDI File Records", "TOTAL_COUNT"],
        ["Total Customers", "7572", "", "CUSTOMER", "3194"],
        ["Total customer Sites", "7572", "", "CUSTOMER_SITES(BILL_TO)", "2304"],
        ["", "", "", "CUSTOMER_SITES(SHIP_TO)", "890"],
        ["Total Sales Order Customer", "458", "", "Total Sales Order Customer", "331"],
        ["Total Sales Order Customer(SHIP_TO)", "458", "", "Sales_Order-CUSTOMER_SITES(SHIP_TO)", "331"],
        ["", "", "", "CUSTOMER_CONTACTS_POINT", "849"],
        ["", "", "", "CUSTOMER_PROFILE_CLASS", "2304"],
        ["", "", "", "CUSTOMER_CONTACTS", "819"],
      ]
    },
    { 
      fileName: "Dorse_BillTo_Sites.csv", 
      uploadDate: "2024-01-15",
      content: [
        ["SiteID", "CustomerID", "SiteName", "BillingAddress", "ContactEmail"],
        ["SITE001", "CUST001", "Dorse HQ", "300 Industrial Ave", "billing@dorse.com"],
      ]
    },
  ],
  EBS: [
    { 
      fileName: "EBS_Customer_Master.csv", 
      uploadDate: "2024-01-15",
      content: [
        ["Source File Records", "Total_Count", "", "FBDI File Records", "TOTAL_COUNT"],
        ["Total Customers", "1362", "", "CUSTOMER", "1330"],
        ["Total customer Sites", "1362", "", "CUSTOMER_SITES(BILL_TO)", "1330"],
        ["", "", "", "CUSTOMER_SITES(SHIP_TO)", "0"],
        ["Total Sales Order Customer", "3018", "", "Total Sales Order Customer", "1620"],
        ["Total Sales Order Customer(SHIP_TO)", "3018", "", "Sales_Order-CUSTOMER_SITES(SHIP_TO)", "1620"],
        ["", "", "", "CUSTOMER_CONTACTS_POINT", "597"],
        ["", "", "", "CUSTOMER_PROFILE_CLASS", "1326"],
        ["", "", "", "CUSTOMER_CONTACTS", "398"],
      ]
    },
    { 
      fileName: "EBS_BillTo_Sites.csv", 
      uploadDate: "2024-01-15",
      content: [
        ["SiteID", "CustomerID", "SiteName", "BillingAddress", "ContactEmail"],
        ["SITE001", "CUST001", "EBS HQ", "400 Tech Park", "billing@ebs.com"],
      ]
    },
  ],
  EP: [
    { 
      fileName: "EP_Customer_Master.csv", 
      uploadDate: "2024-01-15",
      content: [
        ["Source File Records", "Total_Count", "", "FBDI File Records", "TOTAL_COUNT"],
        ["Total Customers", "639", "", "CUSTOMER", "621"],
        ["Total customer Sites", "744", "", "CUSTOMER_SITES(BILL_TO)", "621"],
        ["", "", "", "CUSTOMER_SITES(SHIP_TO)", "106"],
        ["Total Sales Order Customer", "72", "", "Total Sales Order Customer", "66"],
        ["Total Sales Order Customer(SHIP_TO)", "72", "", "Sales_Order-CUSTOMER_SITES(SHIP_TO)", "66"],
        ["", "", "", "CUSTOMER_CONTACTS_POINT", "891"],
        ["", "", "", "CUSTOMER_PROFILE_CLASS", "621"],
        ["", "", "", "CUSTOMER_CONTACTS", "594"],
      ]
    },
    { 
      fileName: "EP_BillTo_Sites.csv", 
      uploadDate: "2024-01-15",
      content: [
        ["SiteID", "CustomerID", "SiteName", "BillingAddress", "ContactEmail"],
        ["SITE001", "CUST001", "EP HQ", "500 Enterprise Blvd", "billing@ep.com"],
      ]
    },
  ],
  ETARIOS: [
    { 
      fileName: "Etarios_Customer_Master.csv", 
      uploadDate: "2024-01-15",
      content: [
        ["Source File Records", "Total_Count", "", "FBDI File Records", "TOTAL_COUNT"],
        ["Total Customers", "2172", "", "CUSTOMER", "2052"],
        ["Total customer Sites", "2474", "", "CUSTOMER_SITES(BILL_TO)", "2052"],
        ["", "", "", "CUSTOMER_SITES(SHIP_TO)", "302"],
        ["Total Sales Order Customer", "166", "", "Total Sales Order Customer", "144"],
        ["Total Sales Order Customer(SHIP_TO)", "166", "", "Sales_Order-CUSTOMER_SITES(SHIP_TO)", "144"],
        ["", "", "", "CUSTOMER_CONTACTS_POINT", "597"],
        ["", "", "", "CUSTOMER_PROFILE_CLASS", "1979"],
        ["", "", "", "CUSTOMER_CONTACTS", "1095"],
      ]
    },
    { 
      fileName: "Etarios_BillTo_Sites.csv", 
      uploadDate: "2024-01-15",
      content: [
        ["SiteID", "CustomerID", "SiteName", "BillingAddress", "ContactEmail"],
        ["SITE001", "CUST001", "ETARIOS HQ", "600 Commerce Center", "billing@etarios.com"],
      ]
    },
  ],
};

export function ConsolidatedReconTable({ title, opCoDataList, dataColumns }: ConsolidatedReconTableProps) {
  const [expandedOpCo, setExpandedOpCo] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [filesState, setFilesState] = useState<Record<string, FileData[]>>(opCoFileData);
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
    if (filesState[opCoName]) {
      if (expandedOpCo === opCoName) {
        setExpandedOpCo(null);
      } else {
        setExpandedOpCo(opCoName);
        setTimeout(() => {
          fileDetailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  };

  const handleDownload = (file: FileData) => {
    const csvContent = file.content.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = file.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDelete = (opCoName: string, fileName: string) => {
    setFilesState(prev => ({
      ...prev,
      [opCoName]: prev[opCoName].filter(f => f.fileName !== fileName)
    }));
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
                    className={`font-semibold text-foreground text-center min-w-[100px] ${filesState[opCo.name] ? "cursor-pointer hover:bg-primary/10 transition-colors" : ""}`}
                    onClick={() => handleOpCoClick(opCo.name)}
                  >
                    <div className="flex items-center justify-center gap-1">
                      {filesState[opCo.name] && (
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
              
              {/* Expanded File Details for any OpCo */}
              {expandedOpCo && filesState[expandedOpCo] && (
                <TableRow>
                  <TableCell colSpan={2 + opCoDataList.length} className="p-0">
                    <div ref={fileDetailsRef} className="bg-muted/30 p-4 border-t border-border">
                      <div className="flex items-center gap-2 mb-4">
                        <FileText className="h-5 w-5 text-primary" />
                        <h4 className="font-semibold text-foreground">{expandedOpCo} - File Level Details</h4>
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
                            {filesState[expandedOpCo].map((file, idx) => (
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
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-8 w-8"
                                      onClick={() => handleDownload(file)}
                                    >
                                      <Download className="h-4 w-4 text-muted-foreground hover:text-primary" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-8 w-8"
                                      onClick={() => handleDelete(expandedOpCo, file.fileName)}
                                    >
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
