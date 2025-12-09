import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { LargeStatCard } from "@/components/dashboard/LargeStatCard";
import { InsightsSection } from "@/components/dashboard/InsightsSection";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { DataTable } from "@/components/dashboard/DataTable";
import { ProgressBar } from "@/components/dashboard/ProgressBar";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Package, CheckCircle, XCircle, Copy } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, AreaChart, Area } from "recharts";

const stats = [
  { label: "Total Source Records", value: 1856, subtitle: "Supplier records received", icon: Package, variant: "primary" as const },
  { label: "Successfully Converted", value: 1654, subtitle: "", icon: CheckCircle, variant: "success" as const, highlightText: "89.1% conversion rate" },
  { label: "Records Excluded", value: 202, subtitle: "Rejected/filtered records", icon: XCircle, variant: "warning" as const },
  { label: "Duplicates Found", value: 45, subtitle: "Pending deduplication", icon: Copy, variant: "accent" as const },
];

const insights = [
  { type: "success" as const, highlight: "Domestic suppliers", text: "show excellent conversion rate at 94.2% with 1,172 records loaded successfully." },
  { type: "warning" as const, highlight: "International suppliers", text: "have lower rate (78.4%) due to bank account format validation issues." },
  { type: "info" as const, highlight: "Site E - International", text: "needs attention with only 73.4% conversion - investigate address and tax data." },
  { type: "success" as const, highlight: "Payment terms mapping", text: "completed for 98.9% of suppliers with proper currency alignment." },
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

const siteMapping = [
  { site: "Site A - Primary", suppliers: 456, converted: 432, failed: 24, rate: 94.7 },
  { site: "Site B - Warehouse", suppliers: 389, converted: 367, failed: 22, rate: 94.3 },
  { site: "Site C - Distribution", suppliers: 334, converted: 298, failed: 36, rate: 89.2 },
  { site: "Site D - Regional", suppliers: 312, converted: 289, failed: 23, rate: 92.6 },
  { site: "Site E - International", suppliers: 365, converted: 268, failed: 97, rate: 73.4 },
];

const exceptions = [
  { id: "SUP-001", name: "Global Parts Inc", issue: "Invalid bank account", status: "error" as const },
  { id: "SUP-012", name: "Pacific Trading Co", issue: "Missing tax certificate", status: "warning" as const },
  { id: "SUP-034", name: "Euro Supplies Ltd", issue: "Duplicate entry", status: "warning" as const },
  { id: "SUP-056", name: "Asia Materials", issue: "Address verification failed", status: "error" as const },
  { id: "SUP-078", name: "Local Logistics", issue: "Pending approval", status: "info" as const },
];

export default function SupplierDashboard() {
  return (
    <SidebarLayout pageTitle="Supplier Conversion Dashboard" pageSubtitle="Supplier data migration and validation">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {stats.map((stat) => (
          <LargeStatCard key={stat.label} {...stat} />
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
          title="Exceptions & Issues"
          columns={[
            { key: "id", header: "ID" },
            { key: "name", header: "Supplier" },
            { key: "issue", header: "Issue" },
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
