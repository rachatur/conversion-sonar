import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { LargeStatCard } from "@/components/dashboard/LargeStatCard";
import { InsightsSection } from "@/components/dashboard/InsightsSection";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { DataTable } from "@/components/dashboard/DataTable";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Users, CheckCircle, XCircle, Copy, AlertTriangle, FolderOpen } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, AreaChart, Area } from "recharts";

const stats = [
  { label: "Total Source Records", value: 45892, subtitle: "Customer records received", icon: Users, variant: "primary" as const },
  { label: "Successfully Converted", value: 42150, subtitle: "", icon: CheckCircle, variant: "success" as const, highlightText: "91.8% conversion rate" },
  { label: "Fusion Error Records", value: 1523, subtitle: "Errors in fusion load", icon: XCircle, variant: "warning" as const },
  { label: "Valid Source Records", value: 44369, subtitle: "After deduplication", icon: FolderOpen, variant: "accent" as const },
];

const summaryCards = [
  { label: "Customer Types", value: 8, icon: Users },
  { label: "Duplicates Found", value: 856, icon: Copy },
  { label: "Missing Fields", value: 1245, icon: AlertTriangle },
  { label: "Missing Category", value: 423, icon: FolderOpen },
];

const insights = [
  { type: "success" as const, highlight: "North America region", text: "shows highest conversion rate at 96.7% with 17,890 records loaded successfully across 3 OpCos." },
  { type: "warning" as const, highlight: "Middle East & Africa", text: "has low conversion rate (62.2%) - needs investigation on data quality and address formatting." },
  { type: "success" as const, highlight: "Corporate customers", text: "consistently perform well with 94.2% conversion rate across all OpCos." },
  { type: "info" as const, highlight: "Tax ID validation", text: "improved by 8.5% after implementing new validation rules across 12 OpCos." },
];

const errorTrendData = [
  { week: "Week 1", errors: 1250, resolved: 980 },
  { week: "Week 2", errors: 890, resolved: 820 },
  { week: "Week 3", errors: 650, resolved: 610 },
  { week: "Week 4", errors: 520, resolved: 490 },
  { week: "Week 5", errors: 432, resolved: 410 },
];

const customerTypeData = [
  { name: "Corporate", value: 12450, color: "hsl(207, 90%, 54%)" },
  { name: "Individual", value: 33442, color: "hsl(160, 84%, 39%)" },
];

const comparisonData = [
  { field: "Customer Name", source: 45892, target: 45892, match: true },
  { field: "Address Line 1", source: 45892, target: 44647, match: false },
  { field: "City", source: 45892, target: 45120, match: false },
  { field: "State/Province", source: 45892, target: 45678, match: false },
  { field: "Tax Registration", source: 41523, target: 40631, match: false },
  { field: "Payment Terms", source: 45892, target: 45892, match: true },
];

const opCoBreakdown = [
  { opCo: "OpCo-NA-01", region: "North America", total: 8500, converted: 8234, failed: 266, rate: 96.9 },
  { opCo: "OpCo-NA-02", region: "North America", total: 5200, converted: 5012, failed: 188, rate: 96.4 },
  { opCo: "OpCo-EU-01", region: "Europe", total: 7300, converted: 6680, failed: 620, rate: 91.5 },
  { opCo: "OpCo-EU-02", region: "Europe", total: 5000, converted: 4570, failed: 430, rate: 91.4 },
  { opCo: "OpCo-AP-01", region: "Asia Pacific", total: 8900, converted: 8120, failed: 780, rate: 91.2 },
  { opCo: "OpCo-LA-01", region: "Latin America", total: 4200, converted: 3650, failed: 550, rate: 86.9 },
  { opCo: "OpCo-LA-02", region: "Latin America", total: 2800, converted: 2456, failed: 344, rate: 87.7 },
  { opCo: "OpCo-MEA-01", region: "Middle East & Africa", total: 1992, converted: 1240, failed: 752, rate: 62.2 },
  { opCo: "OpCo-MEA-02", region: "Middle East & Africa", total: 2000, converted: 1188, failed: 812, rate: 59.4 },
];

const exceptions = [
  { id: "CUS-001", opCo: "OpCo-MEA-01", name: "Acme Corp", issue: "Duplicate entry", status: "warning" as const },
  { id: "CUS-002", opCo: "OpCo-EU-01", name: "TechGlobal Inc", issue: "Missing tax ID", status: "error" as const },
  { id: "CUS-003", opCo: "OpCo-LA-01", name: "Smith & Co", issue: "Invalid address", status: "error" as const },
  { id: "CUS-004", opCo: "OpCo-AP-01", name: "GlobalTrade Ltd", issue: "Missing category", status: "warning" as const },
  { id: "CUS-005", opCo: "OpCo-NA-01", name: "FastShip LLC", issue: "Under investigation", status: "info" as const },
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

      {/* Charts Row - Only 2 charts now */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Error Trends" subtitle="Weekly error tracking">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={errorTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Area type="monotone" dataKey="errors" fill="hsl(var(--warning) / 0.2)" stroke="hsl(var(--warning))" />
              <Area type="monotone" dataKey="resolved" fill="hsl(var(--success) / 0.2)" stroke="hsl(var(--success))" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Customer Types" subtitle="Distribution breakdown">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={customerTypeData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={75}
                paddingAngle={2}
                dataKey="value"
              >
                {customerTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
              <Tooltip formatter={(value: number) => value.toLocaleString()} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Comparison Table */}
      <DataTable
        title="Source vs Target Comparison"
        columns={[
          { key: "field", header: "Field" },
          { key: "source", header: "Source Count", render: (item: typeof comparisonData[0]) => item.source.toLocaleString() },
          { key: "target", header: "Target Count", render: (item: typeof comparisonData[0]) => item.target.toLocaleString() },
          {
            key: "match",
            header: "Status",
            render: (item: typeof comparisonData[0]) => (
              <StatusBadge status={item.match ? "success" : "warning"}>
                {item.match ? "Match" : "Mismatch"}
              </StatusBadge>
            ),
          },
        ]}
        data={comparisonData}
      />

      {/* OpCo Breakdown Table */}
      <div className="mt-6">
        <DataTable
          title="OpCo-wise Breakdown"
          columns={[
            { key: "opCo", header: "OpCo" },
            { key: "region", header: "Region" },
            { key: "total", header: "Total", render: (item: typeof opCoBreakdown[0]) => item.total.toLocaleString() },
            { key: "converted", header: "Converted", render: (item: typeof opCoBreakdown[0]) => item.converted.toLocaleString() },
            { key: "failed", header: "Failed", render: (item: typeof opCoBreakdown[0]) => item.failed.toLocaleString() },
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

      {/* Exceptions Table */}
      <div className="mt-6">
        <DataTable
          title="OpCo-wise Exceptions & Issues"
          columns={[
            { key: "id", header: "ID" },
            { key: "opCo", header: "OpCo" },
            { key: "name", header: "Customer" },
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
