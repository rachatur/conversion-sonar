import { useState } from "react";
import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { LargeStatCard } from "@/components/dashboard/LargeStatCard";
import { InsightsSection } from "@/components/dashboard/InsightsSection";
import { DataTable } from "@/components/dashboard/DataTable";
import { Users, CheckCircle, XCircle, FolderOpen } from "lucide-react";

const opCoList = ["AIRTECH", "ATS", "C&J", "DORSE", "EBS", "EP", "ETARIOS"];

// OpCo-specific data extracted from Excel files
const opCoData: Record<string, {
  stats: { label: string; value: number; subtitle: string; icon: typeof Users; variant: "primary" | "success" | "warning" | "accent"; highlightText?: string }[];
  reconSummaryData: { metric: string; customer: number | string; customerSitesBillTo: number | string; customerSitesShipTo: number | string }[];
  loadPercentData: { metric: string; customer: string; customerSitesBillTo: string; customerSitesShipTo: string }[];
  insights: { type: "info" | "success" | "warning"; highlight: string; text: string }[];
}> = {
  AIRTECH: {
    stats: [
      { label: "Total Source Records", value: 850, subtitle: "Customer records received", icon: Users, variant: "primary" },
      { label: "Successfully Converted", value: 812, subtitle: "", icon: CheckCircle, variant: "success", highlightText: "95.5% conversion rate" },
      { label: "Fusion Error Records", value: 0, subtitle: "Errors in fusion load", icon: XCircle, variant: "warning" },
      { label: "Valid Source Records", value: 812, subtitle: "After deduplication", icon: FolderOpen, variant: "accent" },
    ],
    reconSummaryData: [
      { metric: "Total Source File Records", customer: 850, customerSitesBillTo: 920, customerSitesShipTo: 920 },
      { metric: "Records Excluded / Not Valid", customer: 38, customerSitesBillTo: 108, customerSitesShipTo: 485 },
      { metric: "Valid Source Records", customer: 812, customerSitesBillTo: 812, customerSitesShipTo: 435 },
      { metric: "Total FBDI Records for Upload", customer: 812, customerSitesBillTo: 812, customerSitesShipTo: 435 },
      { metric: "Errored in FBDI Upload", customer: 0, customerSitesBillTo: 0, customerSitesShipTo: 0 },
      { metric: "FBDI Records loaded Successful", customer: 812, customerSitesBillTo: 812, customerSitesShipTo: 435 },
    ],
    loadPercentData: [
      { metric: "Load Percent (Valid Records)", customer: "95.5%", customerSitesBillTo: "88.3%", customerSitesShipTo: "47.3%" },
      { metric: "Load Percent (InValid Records)", customer: "4.5%", customerSitesBillTo: "11.7%", customerSitesShipTo: "52.7%" },
    ],
    insights: [
      { type: "success", highlight: "FBDI Upload", text: "completed with 100% success rate - all 812 valid customer records loaded successfully." },
      { type: "info", highlight: "Customer Sites", text: "Bill To: 812 records, Ship To: 435 records loaded." },
      { type: "warning", highlight: "38 records excluded", text: "from customer data - review exclusion criteria." },
    ],
  },
  ATS: {
    stats: [
      { label: "Total Source Records", value: 1935, subtitle: "Customer records received", icon: Users, variant: "primary" },
      { label: "Successfully Converted", value: 1843, subtitle: "", icon: CheckCircle, variant: "success", highlightText: "95.2% conversion rate" },
      { label: "Fusion Error Records", value: 0, subtitle: "Errors in fusion load", icon: XCircle, variant: "warning" },
      { label: "Valid Source Records", value: 1843, subtitle: "After deduplication", icon: FolderOpen, variant: "accent" },
    ],
    reconSummaryData: [
      { metric: "Total Source File Records", customer: 1935, customerSitesBillTo: 2602, customerSitesShipTo: 2602 },
      { metric: "Records Excluded / Not Valid", customer: 92, customerSitesBillTo: 759, customerSitesShipTo: 1933 },
      { metric: "Valid Source Records", customer: 1843, customerSitesBillTo: 1843, customerSitesShipTo: 669 },
      { metric: "Total FBDI Records for Upload", customer: 1843, customerSitesBillTo: 1843, customerSitesShipTo: 669 },
      { metric: "Errored in FBDI Upload", customer: 0, customerSitesBillTo: 0, customerSitesShipTo: 0 },
      { metric: "FBDI Records loaded Successful", customer: 1843, customerSitesBillTo: 1843, customerSitesShipTo: 669 },
    ],
    loadPercentData: [
      { metric: "Load Percent (Valid Records)", customer: "95.2%", customerSitesBillTo: "70.8%", customerSitesShipTo: "25.7%" },
      { metric: "Load Percent (InValid Records)", customer: "4.8%", customerSitesBillTo: "29.2%", customerSitesShipTo: "74.3%" },
    ],
    insights: [
      { type: "success", highlight: "FBDI Upload", text: "completed with 100% success rate - all 1,843 valid customer records loaded successfully." },
      { type: "info", highlight: "Customer Sites", text: "Bill To: 1,843 records, Ship To: 669 records loaded." },
      { type: "warning", highlight: "92 records excluded", text: "from customer data - review exclusion criteria." },
    ],
  },
  "C&J": {
    stats: [
      { label: "Total Source Records", value: 124, subtitle: "Customer records received", icon: Users, variant: "primary" },
      { label: "Successfully Converted", value: 119, subtitle: "", icon: CheckCircle, variant: "success", highlightText: "96.0% conversion rate" },
      { label: "Fusion Error Records", value: 0, subtitle: "Errors in fusion load", icon: XCircle, variant: "warning" },
      { label: "Valid Source Records", value: 119, subtitle: "After deduplication", icon: FolderOpen, variant: "accent" },
    ],
    reconSummaryData: [
      { metric: "Total Source File Records", customer: 124, customerSitesBillTo: 124, customerSitesShipTo: 124 },
      { metric: "Records Excluded / Not Valid", customer: 5, customerSitesBillTo: 5, customerSitesShipTo: 40 },
      { metric: "Valid Source Records", customer: 119, customerSitesBillTo: 119, customerSitesShipTo: 84 },
      { metric: "Total FBDI Records for Upload", customer: 119, customerSitesBillTo: 119, customerSitesShipTo: 84 },
      { metric: "Errored in FBDI Upload", customer: 0, customerSitesBillTo: 0, customerSitesShipTo: 0 },
      { metric: "FBDI Records loaded Successful", customer: 119, customerSitesBillTo: 119, customerSitesShipTo: 84 },
    ],
    loadPercentData: [
      { metric: "Load Percent (Valid Records)", customer: "96.0%", customerSitesBillTo: "96.0%", customerSitesShipTo: "67.7%" },
      { metric: "Load Percent (InValid Records)", customer: "4.0%", customerSitesBillTo: "4.0%", customerSitesShipTo: "32.3%" },
    ],
    insights: [
      { type: "success", highlight: "FBDI Upload", text: "completed with 100% success rate - all 119 valid customer records loaded successfully." },
      { type: "info", highlight: "Customer Sites", text: "Bill To: 119 records, Ship To: 84 records loaded." },
      { type: "warning", highlight: "5 records excluded", text: "from customer data - review exclusion criteria." },
    ],
  },
  DORSE: {
    stats: [
      { label: "Total Source Records", value: 7572, subtitle: "Customer records received", icon: Users, variant: "primary" },
      { label: "Successfully Converted", value: 3194, subtitle: "", icon: CheckCircle, variant: "success", highlightText: "42.2% conversion rate" },
      { label: "Fusion Error Records", value: 0, subtitle: "Errors in fusion load", icon: XCircle, variant: "warning" },
      { label: "Valid Source Records", value: 3194, subtitle: "After deduplication", icon: FolderOpen, variant: "accent" },
    ],
    reconSummaryData: [
      { metric: "Total Source File Records", customer: 7572, customerSitesBillTo: 7572, customerSitesShipTo: 7572 },
      { metric: "Records Excluded / Not Valid", customer: 4378, customerSitesBillTo: 5268, customerSitesShipTo: 6682 },
      { metric: "Valid Source Records", customer: 3194, customerSitesBillTo: 2304, customerSitesShipTo: 890 },
      { metric: "Total FBDI Records for Upload", customer: 3194, customerSitesBillTo: 2304, customerSitesShipTo: 890 },
      { metric: "Errored in FBDI Upload", customer: 0, customerSitesBillTo: 0, customerSitesShipTo: 0 },
      { metric: "FBDI Records loaded Successful", customer: 3194, customerSitesBillTo: 2304, customerSitesShipTo: 890 },
    ],
    loadPercentData: [
      { metric: "Load Percent (Valid Records)", customer: "42.2%", customerSitesBillTo: "30.4%", customerSitesShipTo: "11.8%" },
      { metric: "Load Percent (InValid Records)", customer: "57.8%", customerSitesBillTo: "69.6%", customerSitesShipTo: "88.2%" },
    ],
    insights: [
      { type: "success", highlight: "FBDI Upload", text: "completed with 100% success rate - all 3,194 valid customer records loaded successfully." },
      { type: "warning", highlight: "57.8% of records excluded", text: "(4,378 records) - review exclusion criteria and data quality for improvement." },
      { type: "info", highlight: "Customer Sites", text: "Bill To: 2,304 records, Ship To: 890 records loaded." },
    ],
  },
  EBS: {
    stats: [
      { label: "Total Source Records", value: 1362, subtitle: "Customer records received", icon: Users, variant: "primary" },
      { label: "Successfully Converted", value: 1330, subtitle: "", icon: CheckCircle, variant: "success", highlightText: "97.7% conversion rate" },
      { label: "Fusion Error Records", value: 0, subtitle: "Errors in fusion load", icon: XCircle, variant: "warning" },
      { label: "Valid Source Records", value: 1330, subtitle: "After deduplication", icon: FolderOpen, variant: "accent" },
    ],
    reconSummaryData: [
      { metric: "Total Source File Records", customer: 1362, customerSitesBillTo: 1362, customerSitesShipTo: 1362 },
      { metric: "Records Excluded / Not Valid", customer: 32, customerSitesBillTo: 32, customerSitesShipTo: 1362 },
      { metric: "Valid Source Records", customer: 1330, customerSitesBillTo: 1330, customerSitesShipTo: 0 },
      { metric: "Total FBDI Records for Upload", customer: 1330, customerSitesBillTo: 1330, customerSitesShipTo: 0 },
      { metric: "Errored in FBDI Upload", customer: 0, customerSitesBillTo: 0, customerSitesShipTo: 0 },
      { metric: "FBDI Records loaded Successful", customer: 1330, customerSitesBillTo: 1330, customerSitesShipTo: 0 },
    ],
    loadPercentData: [
      { metric: "Load Percent (Valid Records)", customer: "97.7%", customerSitesBillTo: "97.7%", customerSitesShipTo: "0%" },
      { metric: "Load Percent (InValid Records)", customer: "2.3%", customerSitesBillTo: "2.3%", customerSitesShipTo: "100%" },
    ],
    insights: [
      { type: "success", highlight: "FBDI Upload", text: "completed with 100% success rate - all 1,330 valid customer records loaded successfully." },
      { type: "info", highlight: "Customer Sites", text: "Bill To: 1,330 records loaded. No Ship To records." },
      { type: "warning", highlight: "32 records excluded", text: "from customer data - review exclusion criteria." },
    ],
  },
  EP: {
    stats: [
      { label: "Total Source Records", value: 639, subtitle: "Customer records received", icon: Users, variant: "primary" },
      { label: "Successfully Converted", value: 621, subtitle: "", icon: CheckCircle, variant: "success", highlightText: "97.2% conversion rate" },
      { label: "Fusion Error Records", value: 0, subtitle: "Errors in fusion load", icon: XCircle, variant: "warning" },
      { label: "Valid Source Records", value: 621, subtitle: "After deduplication", icon: FolderOpen, variant: "accent" },
    ],
    reconSummaryData: [
      { metric: "Total Source File Records", customer: 639, customerSitesBillTo: 744, customerSitesShipTo: 744 },
      { metric: "Records Excluded / Not Valid", customer: 18, customerSitesBillTo: 123, customerSitesShipTo: 638 },
      { metric: "Valid Source Records", customer: 621, customerSitesBillTo: 621, customerSitesShipTo: 106 },
      { metric: "Total FBDI Records for Upload", customer: 621, customerSitesBillTo: 621, customerSitesShipTo: 106 },
      { metric: "Errored in FBDI Upload", customer: 0, customerSitesBillTo: 0, customerSitesShipTo: 0 },
      { metric: "FBDI Records loaded Successful", customer: 621, customerSitesBillTo: 621, customerSitesShipTo: 106 },
    ],
    loadPercentData: [
      { metric: "Load Percent (Valid Records)", customer: "97.2%", customerSitesBillTo: "83.5%", customerSitesShipTo: "14.2%" },
      { metric: "Load Percent (InValid Records)", customer: "2.8%", customerSitesBillTo: "16.5%", customerSitesShipTo: "85.8%" },
    ],
    insights: [
      { type: "success", highlight: "FBDI Upload", text: "completed with 100% success rate - all 621 valid customer records loaded successfully." },
      { type: "info", highlight: "Customer Sites", text: "Bill To: 621 records, Ship To: 106 records loaded." },
      { type: "warning", highlight: "18 records excluded", text: "from customer data - review exclusion criteria." },
    ],
  },
  ETARIOS: {
    stats: [
      { label: "Total Source Records", value: 2172, subtitle: "Customer records received", icon: Users, variant: "primary" },
      { label: "Successfully Converted", value: 2052, subtitle: "", icon: CheckCircle, variant: "success", highlightText: "94.5% conversion rate" },
      { label: "Fusion Error Records", value: 0, subtitle: "Errors in fusion load", icon: XCircle, variant: "warning" },
      { label: "Valid Source Records", value: 2052, subtitle: "After deduplication", icon: FolderOpen, variant: "accent" },
    ],
    reconSummaryData: [
      { metric: "Total Source File Records", customer: 2172, customerSitesBillTo: 2474, customerSitesShipTo: 2474 },
      { metric: "Records Excluded / Not Valid", customer: 120, customerSitesBillTo: 422, customerSitesShipTo: 2172 },
      { metric: "Valid Source Records", customer: 2052, customerSitesBillTo: 2052, customerSitesShipTo: 302 },
      { metric: "Total FBDI Records for Upload", customer: 2052, customerSitesBillTo: 2052, customerSitesShipTo: 302 },
      { metric: "Errored in FBDI Upload", customer: 0, customerSitesBillTo: 0, customerSitesShipTo: 0 },
      { metric: "FBDI Records loaded Successful", customer: 2052, customerSitesBillTo: 2052, customerSitesShipTo: 302 },
    ],
    loadPercentData: [
      { metric: "Load Percent (Valid Records)", customer: "94.5%", customerSitesBillTo: "82.9%", customerSitesShipTo: "12.2%" },
      { metric: "Load Percent (InValid Records)", customer: "5.5%", customerSitesBillTo: "17.1%", customerSitesShipTo: "87.8%" },
    ],
    insights: [
      { type: "success", highlight: "FBDI Upload", text: "completed with 100% success rate - all 2,052 valid customer records loaded successfully." },
      { type: "info", highlight: "Customer Sites", text: "Bill To: 2,052 records, Ship To: 302 records loaded." },
      { type: "warning", highlight: "120 records excluded", text: "from customer data - review exclusion criteria." },
    ],
  },
};

export default function CustomerDashboard() {
  const [selectedOpCo, setSelectedOpCo] = useState("AIRTECH");
  const currentData = opCoData[selectedOpCo];

  return (
    <SidebarLayout pageTitle="Air Control Concepts Data Reconciliation (UAT)" pageSubtitle="Customer Conversion Dashboard">
      {/* OpCo Selection Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {opCoList.map((opCo) => (
          <button
            key={opCo}
            onClick={() => setSelectedOpCo(opCo)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedOpCo === opCo
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {opCo}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {currentData.stats.map((stat) => (
          <LargeStatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Recon Summary Table */}
      <DataTable
        title="Recon Summary"
        columns={[
          { key: "metric", header: "Metric" },
          { key: "customer", header: "CUSTOMER", render: (item: typeof currentData.reconSummaryData[0]) => typeof item.customer === 'number' ? item.customer.toLocaleString() : item.customer },
          { key: "customerSitesBillTo", header: "CUSTOMER_SITES (BILL_TO)", render: (item: typeof currentData.reconSummaryData[0]) => typeof item.customerSitesBillTo === 'number' ? item.customerSitesBillTo.toLocaleString() : item.customerSitesBillTo },
          { key: "customerSitesShipTo", header: "CUSTOMER_SITES (SHIP_TO)", render: (item: typeof currentData.reconSummaryData[0]) => typeof item.customerSitesShipTo === 'number' ? item.customerSitesShipTo.toLocaleString() : item.customerSitesShipTo },
        ]}
        data={currentData.reconSummaryData}
      />

      {/* Load Percent Table */}
      <div className="mt-6">
        <DataTable
          title="Load Percentage"
          columns={[
            { key: "metric", header: "Metric" },
            { key: "customer", header: "CUSTOMER" },
            { key: "customerSitesBillTo", header: "CUSTOMER_SITES (BILL_TO)" },
            { key: "customerSitesShipTo", header: "CUSTOMER_SITES (SHIP_TO)" },
          ]}
          data={currentData.loadPercentData}
        />
      </div>

      {/* Insights */}
      <div className="mt-8">
        <InsightsSection title="Key Insights & Recommendations" insights={currentData.insights} />
      </div>
    </SidebarLayout>
  );
}
