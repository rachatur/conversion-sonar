import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { LargeStatCard } from "@/components/dashboard/LargeStatCard";
import { InsightsSection } from "@/components/dashboard/InsightsSection";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { DataTable } from "@/components/dashboard/DataTable";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Package, CheckCircle, XCircle, Copy, AlertTriangle, FolderOpen } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, AreaChart, Area } from "recharts";

const stats = [
  { label: "Total Source Records", value: 1213, subtitle: "Supplier records received", icon: Package, variant: "primary" as const },
  { label: "Successfully Converted", value: 1101, subtitle: "", icon: CheckCircle, variant: "success" as const, highlightText: "90.8% conversion rate" },
  { label: "Fusion Error Records", value: 87, subtitle: "Errors in fusion load", icon: XCircle, variant: "warning" as const },
  { label: "OpCo Count", value: 10, subtitle: "Operating companies", icon: FolderOpen, variant: "accent" as const },
];

const summaryCards = [
  { label: "Supplier Types", value: 6, icon: Package },
  { label: "Duplicates Found", value: 9, icon: Copy },
  { label: "Missing Fields", value: 89, icon: AlertTriangle },
  { label: "Missing Category", value: 34, icon: FolderOpen },
];

const insights = [
  { type: "info" as const, highlight: "Source data count is 1,197", text: "and the actual load count is 1,188. The difference of 9 records is due to duplicate suppliers in the source data." },
  { type: "success" as const, highlight: "Only unique records", text: "were considered for the load. For details, please refer to the attached Duplicate Supplier List." },
  { type: "warning" as const, highlight: "FBDI Upload errors", text: "87 supplier records, 30 address records, 30 site records, and 41 contact records failed during upload." },
  { type: "success" as const, highlight: "Successfully loaded", text: "1,101 suppliers, 1,150 addresses, 1,150 sites, and 1,147 contacts into the system." },
];

const reconSummaryData = [
  { metric: "Total Source File Records", suppliers: 1213, supplierAddress: 1180, supplierSites: "-", supplierContacts: 717 },
  { metric: "Records Excluded / Not Valid", suppliers: 16, supplierAddress: "-", supplierSites: "-", supplierContacts: "-" },
  { metric: "Valid Source Records", suppliers: 1197, supplierAddress: 1180, supplierSites: "-", supplierContacts: 717 },
  { metric: "Total FBDI Records for Upload", suppliers: 1188, supplierAddress: 1180, supplierSites: 1180, supplierContacts: 1188 },
  { metric: "Errored in FBDI Upload", suppliers: 87, supplierAddress: 30, supplierSites: 30, supplierContacts: 41 },
  { metric: "FBDI Records Loaded Successfully", suppliers: 1101, supplierAddress: 1150, supplierSites: 1150, supplierContacts: 1147 },
];

const conversionRateData = [
  { week: "W1", rate: 85.2 },
  { week: "W2", rate: 87.5 },
  { week: "W3", rate: 89.1 },
  { week: "W4", rate: 88.4 },
  { week: "W5", rate: 90.8 },
];

const supplierTypeData = [
  { name: "Manufacturing", value: 345, color: "hsl(207, 90%, 54%)" },
  { name: "Distribution", value: 289, color: "hsl(160, 84%, 39%)" },
  { name: "Services", value: 234, color: "hsl(32, 95%, 60%)" },
  { name: "Raw Materials", value: 345, color: "hsl(280, 65%, 60%)" },
];

const issueBreakdown = [
  { type: "Address Issues", count: 30 },
  { type: "Site Issues", count: 30 },
  { type: "Contact Issues", count: 41 },
  { type: "Supplier Issues", count: 87 },
];

const sourceTargetComparison = [
  { field: "Supplier Name", source: 1213, target: 1101, match: false },
  { field: "Supplier Address", source: 1180, target: 1150, match: false },
  { field: "Supplier Sites", source: 1180, target: 1150, match: false },
  { field: "Supplier Contacts", source: 717, target: 1147, match: false },
  { field: "Bank Account", source: 1100, target: 1078, match: false },
  { field: "Payment Terms", source: 1213, target: 1101, match: false },
];

const opCoBreakdown = [
  { opCo: "OpCo-DOM-01", region: "Domestic", suppliers: 312, converted: 298, failed: 14, rate: 95.5 },
  { opCo: "OpCo-DOM-02", region: "Domestic", suppliers: 289, converted: 275, failed: 14, rate: 95.2 },
  { opCo: "OpCo-DOM-03", region: "Domestic", suppliers: 167, converted: 151, failed: 16, rate: 90.4 },
  { opCo: "OpCo-DOM-04", region: "Domestic", suppliers: 134, converted: 118, failed: 16, rate: 88.1 },
  { opCo: "OpCo-INT-01", region: "International", suppliers: 178, converted: 145, failed: 33, rate: 81.5 },
  { opCo: "OpCo-INT-02", region: "International", suppliers: 133, converted: 114, failed: 19, rate: 85.7 },
];

const siteMapping = [
  { site: "Site A - Primary", suppliers: 356, converted: 332, failed: 24, rate: 93.3 },
  { site: "Site B - Warehouse", suppliers: 289, converted: 267, failed: 22, rate: 92.4 },
  { site: "Site C - Distribution", suppliers: 234, converted: 212, failed: 22, rate: 90.6 },
  { site: "Site D - Regional", suppliers: 212, converted: 189, failed: 23, rate: 89.2 },
  { site: "Site E - International", suppliers: 122, converted: 101, failed: 21, rate: 82.8 },
];

const exceptions = [
  { id: "SUP-001", opCo: "OpCo-INT-02", name: "Global Parts Inc", issue: "Invalid bank account", status: "error" as const },
  { id: "SUP-012", opCo: "OpCo-INT-01", name: "Pacific Trading Co", issue: "Missing tax certificate", status: "warning" as const },
  { id: "SUP-034", opCo: "OpCo-DOM-03", name: "Euro Supplies Ltd", issue: "Duplicate entry", status: "warning" as const },
  { id: "SUP-056", opCo: "OpCo-DOM-04", name: "Asia Materials", issue: "Missing category", status: "warning" as const },
  { id: "SUP-078", opCo: "OpCo-DOM-01", name: "Local Logistics", issue: "Pending approval", status: "info" as const },
];

export default function SupplierDashboard() {
  return (
    <SidebarLayout pageTitle="Air Control Concepts Data Reconciliation (UAT)" pageSubtitle="Supplier Conversion Dashboard">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {stats.map((stat) => (
          <LargeStatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {summaryCards.map((card) => (
          <div key={card.label} className="stat-card p-4">
            <div className="flex items-center gap-3">
              <card.icon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">{card.label}</p>
                <p className="text-xl font-bold">{card.value.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Supplier Recon Summary Table */}
      <div className="mb-8">
        <div className="stat-card overflow-hidden">
          <div className="bg-primary px-4 py-3">
            <h3 className="text-sm font-semibold text-primary-foreground">Supplier Recon Summary</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground"></th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">Suppliers</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">Supplier Address</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">Supplier Sites</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">Supplier Contacts</th>
                </tr>
              </thead>
              <tbody>
                {reconSummaryData.map((row, index) => (
                  <tr key={index} className={`border-b border-border ${index === reconSummaryData.length - 1 ? 'bg-success/10' : ''}`}>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{row.metric}</td>
                    <td className={`px-4 py-3 text-sm text-center ${row.metric === 'Errored in FBDI Upload' ? 'text-destructive font-medium' : row.metric === 'FBDI Records Loaded Successfully' ? 'text-success font-medium' : 'text-primary font-medium'}`}>
                      {row.suppliers}
                    </td>
                    <td className={`px-4 py-3 text-sm text-center ${row.metric === 'Errored in FBDI Upload' ? 'text-destructive font-medium' : row.metric === 'FBDI Records Loaded Successfully' ? 'text-success font-medium' : 'text-primary font-medium'}`}>
                      {row.supplierAddress}
                    </td>
                    <td className={`px-4 py-3 text-sm text-center ${row.metric === 'Errored in FBDI Upload' ? 'text-destructive font-medium' : row.metric === 'FBDI Records Loaded Successfully' ? 'text-success font-medium' : 'text-primary font-medium'}`}>
                      {row.supplierSites}
                    </td>
                    <td className={`px-4 py-3 text-sm text-center ${row.metric === 'Errored in FBDI Upload' ? 'text-destructive font-medium' : row.metric === 'FBDI Records Loaded Successfully' ? 'text-success font-medium' : 'text-primary font-medium'}`}>
                      {row.supplierContacts}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 bg-warning/10 border-t border-warning/30">
            <p className="text-xs text-warning-foreground">
              <span className="font-semibold">**Note:</span> The source data count is 1,197, and the actual load count is 1,188. 
              The difference of 9 records is due to duplicate suppliers in the source data. Only unique records were considered for the load.
            </p>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="mb-8">
        <InsightsSection title="Key Insights & Recommendations" insights={insights} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Conversion Rate Trend" subtitle="Weekly performance">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={conversionRateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <YAxis domain={[80, 100]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => [`${value}%`, "Rate"]}
              />
              <Area type="monotone" dataKey="rate" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Issue Breakdown" subtitle="By category">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={issueBreakdown} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <YAxis dataKey="type" type="category" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="count" fill="hsl(var(--warning))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Source vs Target Comparison */}
      <DataTable
        title="Source vs Target Comparison"
        columns={[
          { key: "field", header: "Field" },
          { key: "source", header: "Source Count", render: (item: typeof sourceTargetComparison[0]) => item.source.toLocaleString() },
          { key: "target", header: "Target Count", render: (item: typeof sourceTargetComparison[0]) => item.target.toLocaleString() },
          {
            key: "match",
            header: "Status",
            render: (item: typeof sourceTargetComparison[0]) => (
              <StatusBadge status={item.match ? "success" : "warning"}>
                {item.match ? "Match" : "Mismatch"}
              </StatusBadge>
            ),
          },
        ]}
        data={sourceTargetComparison}
      />

      {/* OpCo Breakdown */}
      <div className="mt-6">
        <DataTable
          title="OpCo-wise Breakdown"
          columns={[
            { key: "opCo", header: "OpCo" },
            { key: "region", header: "Region" },
            { key: "suppliers", header: "Total" },
            { key: "converted", header: "Converted" },
            { key: "failed", header: "Failed" },
            {
              key: "rate",
              header: "Rate",
              render: (item: typeof opCoBreakdown[0]) => (
                <StatusBadge status={item.rate >= 90 ? "success" : item.rate >= 80 ? "warning" : "error"}>
                  {item.rate}%
                </StatusBadge>
              ),
            },
          ]}
          data={opCoBreakdown}
        />
      </div>

      {/* Breakdown Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <DataTable
          title="Site Mapping"
          columns={[
            { key: "site", header: "Site" },
            { key: "suppliers", header: "Total" },
            { key: "converted", header: "Converted" },
            {
              key: "rate",
              header: "Rate",
              render: (item: typeof siteMapping[0]) => (
                <StatusBadge status={item.rate >= 90 ? "success" : item.rate >= 80 ? "warning" : "error"}>
                  {item.rate}%
                </StatusBadge>
              ),
            },
          ]}
          data={siteMapping}
        />

        <DataTable
          title="OpCo-wise Exceptions & Issues"
          columns={[
            { key: "id", header: "ID" },
            { key: "opCo", header: "OpCo" },
            { key: "name", header: "Supplier" },
            {
              key: "status",
              header: "Status",
              render: (item: typeof exceptions[0]) => <StatusBadge status={item.status}>{item.issue}</StatusBadge>,
            },
          ]}
          data={exceptions}
        />
      </div>
    </SidebarLayout>
  );
}
