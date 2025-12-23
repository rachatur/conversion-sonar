import { useState, useRef } from "react";
import { Upload, FileSpreadsheet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";

interface FileData {
  fileName: string;
  uploadDate: string;
  content: string[][];
}

interface UploadedFileInfo {
  opCoName: string;
  fileData: FileData;
}

interface CustomerFileUploadProps {
  onFilesUploaded: (files: Record<string, FileData[]>) => void;
}

// Map file names to OpCo names
const opCoMappings: Record<string, string> = {
  "airtech": "AIRTECH",
  "airetech": "AIRTECH",
  "ats": "ATS",
  "dorse": "DORSE",
  "ebs": "EBS",
  "c_j": "C&J",
  "cj": "C&J",
  "c&j": "C&J",
  "ep": "EP",
  "etarios": "ETARIOS",
  "etairos": "ETARIOS",
};

const detectOpCo = (fileName: string): string | null => {
  const lowerName = fileName.toLowerCase();
  for (const [key, value] of Object.entries(opCoMappings)) {
    if (lowerName.includes(key)) {
      return value;
    }
  }
  return null;
};

const parseExcelFile = (file: File): Promise<string[][]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData: string[][] = XLSX.utils.sheet_to_json(sheet, { 
          header: 1,
          defval: ""
        });
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsBinaryString(file);
  });
};

export function CustomerFileUpload({ onFilesUploaded }: CustomerFileUploadProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    const newFiles: UploadedFileInfo[] = [];
    const errors: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const opCoName = detectOpCo(file.name);

      if (!opCoName) {
        errors.push(`Could not detect OpCo for: ${file.name}`);
        continue;
      }

      try {
        const content = await parseExcelFile(file);
        newFiles.push({
          opCoName,
          fileData: {
            fileName: file.name,
            uploadDate: new Date().toISOString().split('T')[0],
            content,
          }
        });
      } catch (error) {
        errors.push(`Failed to parse: ${file.name}`);
      }
    }

    if (errors.length > 0) {
      toast({
        title: "Some files could not be processed",
        description: errors.join(", "),
        variant: "destructive",
      });
    }

    // Auto-upload immediately if files were processed
    if (newFiles.length > 0) {
      // Group files by OpCo
      const groupedFiles: Record<string, FileData[]> = {};
      newFiles.forEach(({ opCoName, fileData }) => {
        if (!groupedFiles[opCoName]) {
          groupedFiles[opCoName] = [];
        }
        groupedFiles[opCoName].push(fileData);
      });

      // Save to localStorage
      const existingData = localStorage.getItem("customerUploadedFiles");
      const existing: Record<string, FileData[]> = existingData ? JSON.parse(existingData) : {};
      
      // Merge with existing data
      Object.entries(groupedFiles).forEach(([opCo, filesData]) => {
        if (!existing[opCo]) {
          existing[opCo] = [];
        }
        existing[opCo] = [...existing[opCo], ...filesData];
      });

      localStorage.setItem("customerUploadedFiles", JSON.stringify(existing));
      onFilesUploaded(existing);

      toast({
        title: "Files uploaded successfully",
        description: `Dashboard updated with ${newFiles.length} file(s)`,
      });
    }

    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Upload Customer Recon Files</h3>
        </div>
        <p className="text-xs text-muted-foreground">Supports: Airtech, ATS, Dorse, EBS, C&J, EP, Etarios</p>
      </div>

      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".xlsx,.xls,.csv"
          onChange={handleFileSelect}
          className="hidden"
          id="customer-file-upload"
        />
        <label 
          htmlFor="customer-file-upload" 
          className="cursor-pointer flex flex-col items-center gap-2"
        >
          <FileSpreadsheet className="h-10 w-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {isProcessing ? "Processing & uploading files..." : "Click to select or drag & drop OpCo Excel files"}
          </p>
          <p className="text-xs text-muted-foreground">
            File names should contain OpCo name (e.g., Airtech_ReconCustomer.xlsx)
          </p>
        </label>
      </div>
    </div>
  );
}
