import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { LargeStatCard } from "@/components/dashboard/LargeStatCard";
import { InsightsSection } from "@/components/dashboard/InsightsSection";
import { DataTable } from "@/components/dashboard/DataTable";
import { Users, CheckCircle, XCircle, FolderOpen } from "lucide-react";

const stats = [
  { label: "Total Source Records", value: 7572, subtitle: "Customer records received", icon: Users, variant: "primary" as const },
  { label: "Successfully Converted", value: 3194, subtitle: "", icon: CheckCircle, variant: "success" as const, highlightText: "42% conversion rate" },
  { label: "Fusion Error Records", value: 0, subtitle: "Errors in fusion load", icon: XCircle, variant: "warning" as const },
  { label: "Valid Source Records", value: 3194, subtitle: "After deduplication", icon: FolderOpen, variant: "accent" as const },
];

const insights = [
  { type: "success" as const, highlight: "FBDI Upload", text: "completed with 100% success rate - all 3,194 valid records loaded successfully." },
  { type: "warning" as const, highlight: "58% of records excluded", text: "(4,378 records) - review exclusion criteria and data quality for improvement." },
  { type: "info" as const, highlight: "Customer Sites", text: "data matches Total Customers with 3,194 records each." },
];

const reconSummaryData = [
  { metric: "Total Source File Records", totalCustomers: 7572, customerSites: 7572 },
  { metric: "Records Excluded / Not Valid", totalCustomers: 4378, customerSites: 4378 },
  { metric: "Valid Source Records", totalCustomers: 3194, customerSites: 3194 },
  { metric: "Total FBDI Records for Upload", totalCustomers: 3194, customerSites: 3194 },
  { metric: "Errored in FBDI Upload", totalCustomers: 0, customerSites: 0 },
  { metric: "FBDI Records loaded Successful", totalCustomers: 3194, customerSites: 3194 },
];

const loadPercentData = [
  { metric: "Load Percent (Valid Records)", totalCustomers: "42%", customerSites: "42%" },
  { metric: "Load Percent (InValid Records)", totalCustomers: "58%", customerSites: "58%" },
];

export default function CustomerDashboard() {
  return (
    <SidebarLayout pageTitle="Air Control Concepts Data Reconciliation (UAT)" pageSubtitle="Customer Conversion Dashboard">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {stats.map((stat) => (
          <LargeStatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Recon Summary Table */}
      <DataTable
        title="Recon Summary"
        columns={[
          { key: "metric", header: "Metric" },
          { key: "totalCustomers", header: "Total Customers", render: (item: typeof reconSummaryData[0]) => typeof item.totalCustomers === 'number' ? item.totalCustomers.toLocaleString() : item.totalCustomers },
          { key: "customerSites", header: "CUSTOMER_SITES", render: (item: typeof reconSummaryData[0]) => typeof item.customerSites === 'number' ? item.customerSites.toLocaleString() : item.customerSites },
        ]}
        data={reconSummaryData}
      />

      {/* Load Percent Table */}
      <div className="mt-6">
        <DataTable
          title="Load Percentage"
          columns={[
            { key: "metric", header: "Metric" },
            { key: "totalCustomers", header: "Total Customers" },
            { key: "customerSites", header: "CUSTOMER_SITES" },
          ]}
          data={loadPercentData}
        />
      </div>

      {/* Insights */}
      <div className="mt-8">
        <InsightsSection title="Key Insights & Recommendations" insights={insights} />
      </div>
    </SidebarLayout>
  );
}
