import { useRef, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";

type UploadedFile = { fileName: string; uploadDate: string; content: string[][] };
type UploadedFiles = Record<string, UploadedFile[]>;

interface UseFileUploadOptions {
  storageKey: string;
  opCoMappings: Record<string, string>;
}

export function useFileUpload({ storageKey, opCoMappings }: UseFileUploadOptions) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>({});

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setUploadedFiles(JSON.parse(stored));
    }
  }, [storageKey]);

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

    const processedFiles: { opCoName: string; fileData: UploadedFile }[] = [];

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
      const stored = localStorage.getItem(storageKey);
      const existing: UploadedFiles = stored ? JSON.parse(stored) : {};

      processedFiles.forEach(({ opCoName, fileData }) => {
        if (!existing[opCoName]) existing[opCoName] = [];
        existing[opCoName].push(fileData);
      });

      localStorage.setItem(storageKey, JSON.stringify(existing));
      setUploadedFiles(existing);
      toast({ title: "Files uploaded", description: `${processedFiles.length} file(s) uploaded successfully` });
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return {
    fileInputRef,
    uploadedFiles,
    handleFileSelect,
  };
}
