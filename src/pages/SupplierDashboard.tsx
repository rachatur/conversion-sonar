import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { LargeStatCard } from "@/components/dashboard/LargeStatCard";
import { InsightsSection } from "@/components/dashboard/InsightsSection";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { DataTable } from "@/components/dashboard/DataTable";
import { ProgressBar } from "@/components/dashboard/ProgressBar";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Package, CheckCircle, XCircle, Copy, AlertTriangle, FolderOpen } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, AreaChart, Area } from "recharts";

const stats = [
  { label: "Total Source Records", value: 1856, subtitle: "Supplier records received", icon: Package, variant: "primary" as const },
  { label: "Successfully Converted", value: 1654, subtitle: "", icon: CheckCircle, variant: "success" as const, highlightText: "89.1% conversion rate" },
  { label: "Fusion Error Records", value: 156, subtitle: "Errors in fusion load", icon: XCircle, variant: "warning" as const },
  { label: "OpCo Count", value: 10, subtitle: "Operating companies", icon: FolderOpen, variant: "accent" as const },
];

const summaryCards = [
  { label: "Supplier Types", value: 6, icon: Package },
  { label: "Duplicates Found", value: 45, icon: Copy },
  { label: "Missing Fields", value: 89, icon: AlertTriangle },
  { label: "Missing Category", value: 34, icon: FolderOpen },
];

const insights = [
  { type: "success" as const, highlight: "Domestic suppliers", text: "show excellent conversion rate at 94.2% with 1,172 records loaded across 6 OpCos." },
  { type: "warning" as const, highlight: "International suppliers", text: "have lower rate (78.4%) due to bank account format validation issues in 4 OpCos." },
  { type: "info" as const, highlight: "OpCo-INT-02", text: "needs attention with only 73.4% conversion - investigate address and tax data." },
  { type: "success" as const, highlight: "Payment terms mapping", text: "completed for 98.9% of suppliers with proper currency alignment across all OpCos." },
];

const conversionRateData = [
  { week: "W1", rate: 85.2 },
  { week: "W2", rate: 87.5 },
  { week: "W3", rate: 89.1 },
  { week: "W4", rate: 88.4 },
  { week: "W5", rate: 89.1 },
];

const supplierTypeData = [
  { name: "Manufacturing", value: 645, color: "hsl(207, 90%, 54%)" },
  { name: "Distribution", value: 423, color: "hsl(160, 84%, 39%)" },
  { name: "Services", value: 356, color: "hsl(32, 95%, 60%)" },
  { name: "Raw Materials", value: 432, color: "hsl(280, 65%, 60%)" },
];

const issueBreakdown = [
  { type: "Address Issues", count: 89 },
  { type: "Bank Details", count: 78 },
  { type: "Tax Information", count: 56 },
  { type: "Contact Info", count: 34 },
  { type: "Payment Terms", count: 23 },
];

const sourceTargetComparison = [
  { field: "Supplier Name", source: 1856, target: 1856, match: true },
  { field: "Address", source: 1856, target: 1767, match: false },
  { field: "Bank Account", source: 1756, target: 1678, match: false },
  { field: "Tax ID", source: 1800, target: 1744, match: false },
  { field: "Payment Terms", source: 1856, target: 1845, match: false },
  { field: "Currency", source: 1856, target: 1856, match: true },
];

const opCoBreakdown = [
  { opCo: "OpCo-DOM-01", region: "Domestic", suppliers: 312, converted: 298, failed: 14, rate: 95.5 },
  { opCo: "OpCo-DOM-02", region: "Domestic", suppliers: 289, converted: 275, failed: 14, rate: 95.2 },
  { opCo: "OpCo-DOM-03", region: "Domestic", suppliers: 267, converted: 251, failed: 16, rate: 94.0 },
  { opCo: "OpCo-DOM-04", region: "Domestic", suppliers: 234, converted: 218, failed: 16, rate: 93.2 },
  { opCo: "OpCo-DOM-05", region: "Domestic", suppliers: 189, converted: 178, failed: 11, rate: 94.2 },
  { opCo: "OpCo-DOM-06", region: "Domestic", suppliers: 145, converted: 136, failed: 9, rate: 93.8 },
  { opCo: "OpCo-INT-01", region: "International", suppliers: 178, converted: 145, failed: 33, rate: 81.5 },
  { opCo: "OpCo-INT-02", region: "International", suppliers: 134, converted: 98, failed: 36, rate: 73.1 },
  { opCo: "OpCo-INT-03", region: "International", suppliers: 67, converted: 34, failed: 33, rate: 50.7 },
  { opCo: "OpCo-INT-04", region: "International", suppliers: 41, converted: 21, failed: 20, rate: 51.2 },
];

const siteMapping = [
  { site: "Site A - Primary", suppliers: 456, converted: 432, failed: 24, rate: 94.7 },
  { site: "Site B - Warehouse", suppliers: 389, converted: 367, failed: 22, rate: 94.3 },
  { site: "Site C - Distribution", suppliers: 334, converted: 298, failed: 36, rate: 89.2 },
  { site: "Site D - Regional", suppliers: 312, converted: 289, failed: 23, rate: 92.6 },
  { site: "Site E - International", suppliers: 365, converted: 268, failed: 97, rate: 73.4 },
];

const exceptions = [
  { id: "SUP-001", opCo: "OpCo-INT-02", name: "Global Parts Inc", issue: "Invalid bank account", status: "error" as const },
  { id: "SUP-012", opCo: "OpCo-INT-03", name: "Pacific Trading Co", issue: "Missing tax certificate", status: "warning" as const },
  { id: "SUP-034", opCo: "OpCo-INT-01", name: "Euro Supplies Ltd", issue: "Duplicate entry", status: "warning" as const },
  { id: "SUP-056", opCo: "OpCo-INT-04", name: "Asia Materials", issue: "Missing category", status: "warning" as const },
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

      {/* Insights */}
      <div className="mb-8">
        <InsightsSection title="Key Insights & Recommendations" insights={insights} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
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

        <ChartCard title="Supplier Types" subtitle="Category distribution">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={supplierTypeData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={75}
                paddingAngle={2}
                dataKey="value"
              >
                {supplierTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
              <Tooltip formatter={(value: number) => value.toLocaleString()} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Issue Breakdown" subtitle="By category">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={issueBreakdown} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <YAxis dataKey="type" type="category" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} width={90} />
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

      {/* Comparison Table */}
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
