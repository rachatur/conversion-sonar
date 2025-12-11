import { useState, useEffect } from "react";
import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { LargeStatCard } from "@/components/dashboard/LargeStatCard";
import { InsightsSection } from "@/components/dashboard/InsightsSection";
import { CustomerDetailedBreakdown } from "@/components/dashboard/CustomerDetailedBreakdown";
import { ConsolidatedReconTable } from "@/components/dashboard/ConsolidatedReconTable";
import { CustomerFileUpload } from "@/components/dashboard/CustomerFileUpload";
import { Users, CheckCircle, XCircle, FolderOpen } from "lucide-react";

// Customer OpCo detailed breakdown data
const customerBreakdownData = [
  {
    name: "AIRTECH",
    customerLoad: 96,
    billToLoad: 97,
    shipToLoad: 59,
    customer: { source: 2249, loaded: 2158 },
    billTo: { source: 2743, loaded: 2652 },
    shipTo: { source: 328, loaded: 195 },
  },
  {
    name: "ATS",
    customerLoad: 95,
    billToLoad: 97,
    shipToLoad: 81,
    customer: { source: 1935, loaded: 1843 },
    billTo: { source: 2602, loaded: 2512 },
    shipTo: { source: 438, loaded: 354 },
  },
  {
    name: "C&J",
    customerLoad: 96,
    billToLoad: 98,
    shipToLoad: 0,
    customer: { source: 124, loaded: 119 },
    billTo: { source: 208, loaded: 203 },
    shipTo: { source: 0, loaded: 0 },
  },
  {
    name: "DORSE",
    customerLoad: 42,
    billToLoad: 42,
    shipToLoad: 31,
    customer: { source: 7572, loaded: 3194 },
    billTo: { source: 7572, loaded: 3194 },
    shipTo: { source: 458, loaded: 144 },
  },
  {
    name: "EBS",
    customerLoad: 98,
    billToLoad: 98,
    shipToLoad: 54,
    customer: { source: 1362, loaded: 1330 },
    billTo: { source: 1362, loaded: 1330 },
    shipTo: { source: 3018, loaded: 1620 },
  },
  {
    name: "EP",
    customerLoad: 97,
    billToLoad: 98,
    shipToLoad: 92,
    customer: { source: 639, loaded: 621 },
    billTo: { source: 744, loaded: 726 },
    shipTo: { source: 72, loaded: 66 },
  },
  {
    name: "ETARIOS",
    customerLoad: 94,
    billToLoad: 95,
    shipToLoad: 87,
    customer: { source: 2172, loaded: 2052 },
    billTo: { source: 2474, loaded: 2354 },
    shipTo: { source: 166, loaded: 144 },
  },
];



// OpCo-specific data extracted from Excel files
const opCoData: Record<string, {
  stats: { label: string; value: number; subtitle: string; icon: typeof Users; variant: "primary" | "success" | "warning" | "accent"; highlightText?: string }[];
  reconSummaryData: { metric: string; customer: number | string; customerSitesBillTo: number | string; customerSitesShipTo: number | string }[];
  loadPercentData: { metric: string; customer: string; customerSitesBillTo: string; customerSitesShipTo: string }[];
  insights: { type: "info" | "success" | "warning"; highlight: string; text: string }[];
}> = {
  AIRTECH: {
    stats: [
      { label: "Total Source Records", value: 2249, subtitle: "Customer records received", icon: Users, variant: "primary" },
      { label: "Successfully Converted", value: 2158, subtitle: "", icon: CheckCircle, variant: "success", highlightText: "96% conversion rate" },
      { label: "Fusion Error Records", value: 0, subtitle: "Errors in fusion load", icon: XCircle, variant: "warning" },
      { label: "Valid Source Records", value: 2158, subtitle: "After deduplication", icon: FolderOpen, variant: "accent" },
    ],
    reconSummaryData: [
      { metric: "Total Source File Records", customer: 2249, customerSitesBillTo: 2743, customerSitesShipTo: 328 },
      { metric: "Records Excluded / Not Valid", customer: 91, customerSitesBillTo: 91, customerSitesShipTo: 133 },
      { metric: "Valid Source Records", customer: 2158, customerSitesBillTo: 2652, customerSitesShipTo: 195 },
      { metric: "Total FBDI Records for Upload", customer: 2158, customerSitesBillTo: 2652, customerSitesShipTo: 195 },
      { metric: "Errored in FBDI Upload", customer: 0, customerSitesBillTo: 0, customerSitesShipTo: 0 },
      { metric: "FBDI Records loaded Successful", customer: 2158, customerSitesBillTo: 2652, customerSitesShipTo: 195 },
    ],
    loadPercentData: [
      { metric: "Load Percent (Valid Records)", customer: "96%", customerSitesBillTo: "97%", customerSitesShipTo: "59%" },
    ],
    insights: [
      { type: "success", highlight: "FBDI Upload", text: "completed with 100% success rate - all 2,158 valid customer records loaded successfully." },
      { type: "info", highlight: "Customer Sites", text: "Bill To: 2,652 records, Ship To: 195 records loaded." },
      { type: "warning", highlight: "91 records excluded", text: "from customer data - review exclusion criteria." },
    ],
  },
  ATS: {
    stats: [
      { label: "Total Source Records", value: 1935, subtitle: "Customer records received", icon: Users, variant: "primary" },
      { label: "Successfully Converted", value: 1843, subtitle: "", icon: CheckCircle, variant: "success", highlightText: "95% conversion rate" },
      { label: "Fusion Error Records", value: 0, subtitle: "Errors in fusion load", icon: XCircle, variant: "warning" },
      { label: "Valid Source Records", value: 1843, subtitle: "After deduplication", icon: FolderOpen, variant: "accent" },
    ],
    reconSummaryData: [
      { metric: "Total Source File Records", customer: 1935, customerSitesBillTo: 2602, customerSitesShipTo: 438 },
      { metric: "Records Excluded / Not Valid", customer: 90, customerSitesBillTo: 90, customerSitesShipTo: 84 },
      { metric: "Valid Source Records", customer: 1843, customerSitesBillTo: 2512, customerSitesShipTo: 354 },
      { metric: "Total FBDI Records for Upload", customer: 1843, customerSitesBillTo: 2512, customerSitesShipTo: 354 },
      { metric: "Errored in FBDI Upload", customer: 0, customerSitesBillTo: 0, customerSitesShipTo: 0 },
      { metric: "FBDI Records loaded Successful", customer: 1843, customerSitesBillTo: 2512, customerSitesShipTo: 354 },
    ],
    loadPercentData: [
      { metric: "Load Percent (Valid Records)", customer: "95%", customerSitesBillTo: "97%", customerSitesShipTo: "81%" },
    ],
    insights: [
      { type: "success", highlight: "FBDI Upload", text: "completed with 100% success rate - all 1,843 valid customer records loaded successfully." },
      { type: "info", highlight: "Customer Sites", text: "Bill To: 2,512 records, Ship To: 354 records loaded." },
      { type: "warning", highlight: "90 records excluded", text: "from customer data - review exclusion criteria." },
    ],
  },
  "C&J": {
    stats: [
      { label: "Total Source Records", value: 124, subtitle: "Customer records received", icon: Users, variant: "primary" },
      { label: "Successfully Converted", value: 119, subtitle: "", icon: CheckCircle, variant: "success", highlightText: "96% conversion rate" },
      { label: "Fusion Error Records", value: 0, subtitle: "Errors in fusion load", icon: XCircle, variant: "warning" },
      { label: "Valid Source Records", value: 119, subtitle: "After deduplication", icon: FolderOpen, variant: "accent" },
    ],
    reconSummaryData: [
      { metric: "Total Source File Records", customer: 124, customerSitesBillTo: 208, customerSitesShipTo: 0 },
      { metric: "Records Excluded / Not Valid", customer: 5, customerSitesBillTo: 5, customerSitesShipTo: 0 },
      { metric: "Valid Source Records", customer: 119, customerSitesBillTo: 203, customerSitesShipTo: 0 },
      { metric: "Total FBDI Records for Upload", customer: 119, customerSitesBillTo: 203, customerSitesShipTo: 0 },
      { metric: "Errored in FBDI Upload", customer: 0, customerSitesBillTo: 0, customerSitesShipTo: 0 },
      { metric: "FBDI Records loaded Successful", customer: 119, customerSitesBillTo: 203, customerSitesShipTo: 0 },
    ],
    loadPercentData: [
      { metric: "Load Percent (Valid Records)", customer: "96%", customerSitesBillTo: "98%", customerSitesShipTo: "0%" },
    ],
    insights: [
      { type: "success", highlight: "FBDI Upload", text: "completed with 100% success rate - all 119 valid customer records loaded successfully." },
      { type: "info", highlight: "Customer Sites", text: "Bill To: 203 records loaded. No Ship To records." },
      { type: "warning", highlight: "5 records excluded", text: "from customer data - review exclusion criteria." },
    ],
  },
  DORSE: {
    stats: [
      { label: "Total Source Records", value: 7572, subtitle: "Customer records received", icon: Users, variant: "primary" },
      { label: "Successfully Converted", value: 3194, subtitle: "", icon: CheckCircle, variant: "success", highlightText: "42% conversion rate" },
      { label: "Fusion Error Records", value: 0, subtitle: "Errors in fusion load", icon: XCircle, variant: "warning" },
      { label: "Valid Source Records", value: 3194, subtitle: "After deduplication", icon: FolderOpen, variant: "accent" },
    ],
    reconSummaryData: [
      { metric: "Total Source File Records", customer: 7572, customerSitesBillTo: 7572, customerSitesShipTo: 458 },
      { metric: "Records Excluded / Not Valid", customer: 4378, customerSitesBillTo: 4378, customerSitesShipTo: 127 },
      { metric: "Valid Source Records", customer: 3194, customerSitesBillTo: 3194, customerSitesShipTo: 331 },
      { metric: "Total FBDI Records for Upload", customer: 3194, customerSitesBillTo: 3194, customerSitesShipTo: 331 },
      { metric: "Errored in FBDI Upload", customer: 0, customerSitesBillTo: 0, customerSitesShipTo: 0 },
      { metric: "FBDI Records loaded Successful", customer: 3194, customerSitesBillTo: 3194, customerSitesShipTo: 144 },
    ],
    loadPercentData: [
      { metric: "Load Percent (Valid Records)", customer: "42%", customerSitesBillTo: "42%", customerSitesShipTo: "31%" },
    ],
    insights: [
      { type: "success", highlight: "FBDI Upload", text: "completed - 3,194 customer records and 144 Sales Order Customer records loaded." },
      { type: "warning", highlight: "58% of records excluded", text: "(4,378 records) - review exclusion criteria and data quality for improvement." },
      { type: "info", highlight: "Customer Sites", text: "3,194 records loaded successfully." },
    ],
  },
  EBS: {
    stats: [
      { label: "Total Source Records", value: 1362, subtitle: "Customer records received", icon: Users, variant: "primary" },
      { label: "Successfully Converted", value: 1330, subtitle: "", icon: CheckCircle, variant: "success", highlightText: "98% conversion rate" },
      { label: "Fusion Error Records", value: 0, subtitle: "Errors in fusion load", icon: XCircle, variant: "warning" },
      { label: "Valid Source Records", value: 1330, subtitle: "After deduplication", icon: FolderOpen, variant: "accent" },
    ],
    reconSummaryData: [
      { metric: "Total Source File Records", customer: 1362, customerSitesBillTo: 1362, customerSitesShipTo: 3018 },
      { metric: "Records Excluded / Not Valid", customer: 32, customerSitesBillTo: 32, customerSitesShipTo: 1398 },
      { metric: "Valid Source Records", customer: 1330, customerSitesBillTo: 1330, customerSitesShipTo: 1620 },
      { metric: "Total FBDI Records for Upload", customer: 1330, customerSitesBillTo: 1330, customerSitesShipTo: 1620 },
      { metric: "Errored in FBDI Upload", customer: 0, customerSitesBillTo: 0, customerSitesShipTo: 0 },
      { metric: "FBDI Records loaded Successful", customer: 1330, customerSitesBillTo: 1330, customerSitesShipTo: 1620 },
    ],
    loadPercentData: [
      { metric: "Load Percent (Valid Records)", customer: "98%", customerSitesBillTo: "98%", customerSitesShipTo: "54%" },
    ],
    insights: [
      { type: "success", highlight: "FBDI Upload", text: "completed with 100% success rate - all 1,330 customer records loaded successfully." },
      { type: "info", highlight: "Sales Order Customer", text: "1,620 records loaded out of 3,018 total." },
      { type: "warning", highlight: "32 records excluded", text: "from customer data - review exclusion criteria." },
    ],
  },
  EP: {
    stats: [
      { label: "Total Source Records", value: 639, subtitle: "Customer records received", icon: Users, variant: "primary" },
      { label: "Successfully Converted", value: 621, subtitle: "", icon: CheckCircle, variant: "success", highlightText: "97% conversion rate" },
      { label: "Fusion Error Records", value: 0, subtitle: "Errors in fusion load", icon: XCircle, variant: "warning" },
      { label: "Valid Source Records", value: 621, subtitle: "After deduplication", icon: FolderOpen, variant: "accent" },
    ],
    reconSummaryData: [
      { metric: "Total Source File Records", customer: 639, customerSitesBillTo: 744, customerSitesShipTo: 72 },
      { metric: "Records Excluded / Not Valid", customer: 18, customerSitesBillTo: 18, customerSitesShipTo: 6 },
      { metric: "Valid Source Records", customer: 621, customerSitesBillTo: 726, customerSitesShipTo: 66 },
      { metric: "Total FBDI Records for Upload", customer: 621, customerSitesBillTo: 726, customerSitesShipTo: 66 },
      { metric: "Errored in FBDI Upload", customer: 0, customerSitesBillTo: 0, customerSitesShipTo: 0 },
      { metric: "FBDI Records loaded Successful", customer: 621, customerSitesBillTo: 726, customerSitesShipTo: 66 },
    ],
    loadPercentData: [
      { metric: "Load Percent (Valid Records)", customer: "97%", customerSitesBillTo: "98%", customerSitesShipTo: "92%" },
    ],
    insights: [
      { type: "success", highlight: "FBDI Upload", text: "completed with 100% success rate - all 621 customer records loaded successfully." },
      { type: "info", highlight: "Customer Sites", text: "726 records loaded. Sales Order Customer: 66 records." },
      { type: "warning", highlight: "18 records excluded", text: "from customer data - review exclusion criteria." },
    ],
  },
  ETARIOS: {
    stats: [
      { label: "Total Source Records", value: 2172, subtitle: "Customer records received", icon: Users, variant: "primary" },
      { label: "Successfully Converted", value: 2052, subtitle: "", icon: CheckCircle, variant: "success", highlightText: "94% conversion rate" },
      { label: "Fusion Error Records", value: 0, subtitle: "Errors in fusion load", icon: XCircle, variant: "warning" },
      { label: "Valid Source Records", value: 2053, subtitle: "After deduplication", icon: FolderOpen, variant: "accent" },
    ],
    reconSummaryData: [
      { metric: "Total Source File Records", customer: 2172, customerSitesBillTo: 2474, customerSitesShipTo: 166 },
      { metric: "Records Excluded / Not Valid", customer: 120, customerSitesBillTo: 120, customerSitesShipTo: 22 },
      { metric: "Valid Source Records", customer: 2053, customerSitesBillTo: 2354, customerSitesShipTo: 144 },
      { metric: "Total FBDI Records for Upload", customer: 2052, customerSitesBillTo: 2354, customerSitesShipTo: 144 },
      { metric: "Errored in FBDI Upload", customer: 0, customerSitesBillTo: 0, customerSitesShipTo: 0 },
      { metric: "FBDI Records loaded Successful", customer: 2052, customerSitesBillTo: 2354, customerSitesShipTo: 144 },
    ],
    loadPercentData: [
      { metric: "Load Percent (Valid Records)", customer: "94%", customerSitesBillTo: "95%", customerSitesShipTo: "87%" },
    ],
    insights: [
      { type: "success", highlight: "FBDI Upload", text: "completed with 100% success rate - 2,052 customer records loaded successfully." },
      { type: "info", highlight: "Customer Sites", text: "2,354 records loaded. Sales Order Customer: 144 records." },
      { type: "warning", highlight: "120 records excluded", text: "from customer data - review exclusion criteria." },
    ],
  },
};


// Mapping from breakdown names to opCoData keys
const opCoNameMapping: Record<string, string> = {
  "AIRTECH": "AIRTECH",
  "ATS": "ATS",
  "C&J": "C&J",
  "DORSE": "DORSE",
  "EBS": "EBS",
  "EP": "EP",
  "ETARIOS": "ETARIOS",
};

export default function CustomerDashboard() {
  const [selectedOpCo, setSelectedOpCo] = useState<string>("AIRTECH");
  
  // State for uploaded files from localStorage
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, { fileName: string; uploadDate: string; content: string[][] }[]>>({});
  
  // Load uploaded files from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("customerUploadedFiles");
    if (stored) {
      setUploadedFiles(JSON.parse(stored));
    }
  }, []);
  
  const handleFilesUploaded = (files: Record<string, { fileName: string; uploadDate: string; content: string[][] }[]>) => {
    setUploadedFiles(files);
  };
  
  // Map the selected breakdown name to the opCoData key
  const opCoDataKey = opCoNameMapping[selectedOpCo] || selectedOpCo;
  const currentData = opCoData[opCoDataKey] || opCoData["AIRTECH"];

  const handleOpCoSelect = (opCoName: string) => {
    setSelectedOpCo(opCoName);
    // Scroll to top to show updated stats
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <SidebarLayout pageTitle="Air Control Concepts Data Reconciliation (UAT)" pageSubtitle="Customer Conversion Dashboard">
      {/* Overall Customer Upload Summary */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Overall Customer Upload Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LargeStatCard
            label="Total Source Records"
            value={16053}
            subtitle="Customer records received"
            icon={Users}
            variant="primary"
          />
          <LargeStatCard
            label="Successfully Converted"
            value={11317}
            subtitle=""
            icon={CheckCircle}
            variant="success"
            highlightText="70% conversion rate"
          />
          <LargeStatCard
            label="Fusion Error Records"
            value={0}
            subtitle="Errors in fusion load"
            icon={XCircle}
            variant="warning"
          />
          <LargeStatCard
            label="Valid Source Records"
            value={11317}
            subtitle="After deduplication"
            icon={FolderOpen}
            variant="accent"
          />
        </div>
      </div>

      {/* OpCo Load Performance - Detailed Breakdown - Clickable */}
      <CustomerDetailedBreakdown 
        data={customerBreakdownData}
        selectedOpCo={selectedOpCo}
        onOpCoSelect={handleOpCoSelect}
      />

      {/* File Upload Section */}
      <div className="mb-8">
        <CustomerFileUpload onFilesUploaded={handleFilesUploaded} />
      </div>

      {/* Customer Recon Summary - All OpCos in One Table */}
      <div className="mb-8">
        <ConsolidatedReconTable
          title="Customer Recon Summary - All OpCos"
          opCoDataList={Object.entries(opCoData).map(([name, data]) => ({
            name,
            data: data.reconSummaryData
          }))}
          dataColumns={[
            { key: "customer", label: "Customer" },
            { key: "customerSitesBillTo", label: "Customer Sites (Bill To)" },
            { key: "customerSitesShipTo", label: "Customer Sites (Ship To)" },
          ]}
          uploadedFiles={uploadedFiles}
        />
      </div>

      {/* Insights */}
      <div className="mt-8">
        <InsightsSection title="Key Insights & Recommendations" insights={currentData.insights} />
      </div>
    </SidebarLayout>
  );
}
