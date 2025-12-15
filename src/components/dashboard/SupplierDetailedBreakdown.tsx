import { CheckCircle, AlertTriangle, XCircle, FileUp } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";

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
  onFilesUploaded?: (files: Record<string, { fileName: string; uploadDate: string; content: string[][] }[]>) => void;
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
  onOpCoSelect,
  onFilesUploaded 
}: SupplierDetailedBreakdownProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const opCoMappings: Record<string, string> = {
    "airetech": "AIRETECH",
    "ats": "ATS",
    "ebs": "EBS",
    "ep": "EP (Eng. Products)",
    "etairos": "Etairos",
    "dorse": "Dorse",
    "c&j": "C&J",
    "cj": "C&J",
  };

  const detectOpCo = (fileName: string): string | null => {
    const lowerName = fileName.toLowerCase();
    for (const [key, value] of Object.entries(opCoMappings)) {
      if (lowerName.includes(key)) return value;
    }
    return null;
  };

  const parseExcelFile = (file: File): Promise<string[][]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as string[][];
          resolve(jsonData);
        } catch {
          reject(new Error("Failed to parse Excel file"));
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsArrayBuffer(file);
    });
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const processedFiles: { opCoName: string; fileData: { fileName: string; uploadDate: string; content: string[][] } }[] = [];

    for (const file of Array.from(files)) {
      if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
        toast({ title: "Invalid file type", description: `${file.name} is not an Excel file`, variant: "destructive" });
        continue;
      }

      const opCo = detectOpCo(file.name);
      if (!opCo) {
        toast({ title: "OpCo not detected", description: `Could not detect OpCo from ${file.name}`, variant: "destructive" });
        continue;
      }

      try {
        const content = await parseExcelFile(file);
        processedFiles.push({
          opCoName: opCo,
          fileData: { fileName: file.name, uploadDate: new Date().toISOString(), content }
        });
      } catch {
        toast({ title: "Parse error", description: `Failed to parse ${file.name}`, variant: "destructive" });
      }
    }

    if (processedFiles.length > 0) {
      const stored = localStorage.getItem("supplierUploadedFiles");
      const existing: Record<string, { fileName: string; uploadDate: string; content: string[][] }[]> = stored ? JSON.parse(stored) : {};

      processedFiles.forEach(({ opCoName, fileData }) => {
        if (!existing[opCoName]) existing[opCoName] = [];
        existing[opCoName].push(fileData);
      });

      localStorage.setItem("supplierUploadedFiles", JSON.stringify(existing));
      onFilesUploaded?.(existing);
      toast({ title: "Files uploaded", description: `${processedFiles.length} file(s) uploaded successfully` });
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="gap-2"
          >
            <FileUp className="h-4 w-4" />
            Share a file
          </Button>
        </div>
      </div>
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
