import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { LargeStatCard } from "@/components/dashboard/LargeStatCard";
import { InsightsSection } from "@/components/dashboard/InsightsSection";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { DataTable } from "@/components/dashboard/DataTable";
import { ProgressBar } from "@/components/dashboard/ProgressBar";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Users, CheckCircle, XCircle, Copy, Building, MapPin, FileText, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, AreaChart, Area } from "recharts";

const stats = [
  { label: "Total Source Records", value: 45892, subtitle: "Customer records received", icon: Users, variant: "primary" as const },
  { label: "Successfully Converted", value: 42150, subtitle: "", icon: CheckCircle, variant: "success" as const, highlightText: "91.8% conversion rate" },
  { label: "Records Excluded", value: 3742, subtitle: "Failed/filtered records", icon: XCircle, variant: "warning" as const },
  { label: "Duplicates Found", value: 856, subtitle: "Pending review", icon: Copy, variant: "accent" as const },
];

const insights = [
  { type: "success" as const, highlight: "North America region", text: "shows highest conversion rate at 96.7% with 17,890 records loaded successfully." },
  { type: "warning" as const, highlight: "Middle East & Africa", text: "has low conversion rate (62.2%) - needs investigation on data quality and address formatting." },
  { type: "success" as const, highlight: "Corporate customers", text: "consistently perform well with 94.2% conversion rate across all regions." },
  { type: "info" as const, highlight: "Tax ID validation", text: "improved by 8.5% after implementing new validation rules." },
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

const completenessData = [
  { field: "Name", complete: 99.8 },
  { field: "Address", complete: 97.3 },
  { field: "Phone", complete: 95.2 },
  { field: "Email", complete: 92.1 },
  { field: "Tax ID", complete: 88.5 },
];

const comparisonData = [
  { field: "Customer Name", source: 45892, target: 45892, match: true },
  { field: "Address Line 1", source: 45892, target: 44647, match: false },
  { field: "City", source: 45892, target: 45120, match: false },
  { field: "State/Province", source: 45892, target: 45678, match: false },
  { field: "Tax Registration", source: 41523, target: 40631, match: false },
  { field: "Payment Terms", source: 45892, target: 45892, match: true },
];

const hierarchyBreakdown = [
  { region: "North America", total: 18500, converted: 17890, failed: 610, rate: 96.7 },
  { region: "Europe", total: 12300, converted: 11250, failed: 1050, rate: 91.5 },
  { region: "Asia Pacific", total: 8900, converted: 8120, failed: 780, rate: 91.2 },
  { region: "Latin America", total: 4200, converted: 3650, failed: 550, rate: 86.9 },
  { region: "Middle East & Africa", total: 1992, converted: 1240, failed: 752, rate: 62.2 },
];

const exceptions = [
  { id: "CUS-001", name: "Acme Corp", issue: "Duplicate entry", status: "warning" as const },
  { id: "CUS-002", name: "TechGlobal Inc", issue: "Missing tax ID", status: "error" as const },
  { id: "CUS-003", name: "Smith & Co", issue: "Invalid address", status: "error" as const },
  { id: "CUS-004", name: "GlobalTrade Ltd", issue: "Pending review", status: "info" as const },
  { id: "CUS-005", name: "FastShip LLC", issue: "Under investigation", status: "warning" as const },
];

export default function CustomerDashboard() {
  return (
    <SidebarLayout pageTitle="Customer Conversion Dashboard" pageSubtitle="Customer data migration and validation">
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

        <ChartCard title="Data Completeness" subtitle="Field-level analysis">
          <div className="space-y-3">
            {completenessData.map((item) => (
              <div key={item.field}>
                <ProgressBar
                  value={item.complete}
                  label={item.field}
                  variant={item.complete >= 95 ? "success" : item.complete >= 90 ? "warning" : "error"}
                />
              </div>
            ))}
          </div>
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

      {/* Breakdown Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <DataTable
          title="Regional Breakdown"
          columns={[
            { key: "region", header: "Region" },
            { key: "total", header: "Total", render: (item: typeof hierarchyBreakdown[0]) => item.total.toLocaleString() },
            { key: "converted", header: "Converted", render: (item: typeof hierarchyBreakdown[0]) => item.converted.toLocaleString() },
            {
              key: "rate",
              header: "Rate",
              render: (item: typeof hierarchyBreakdown[0]) => (
                <StatusBadge status={item.rate >= 90 ? "success" : item.rate >= 80 ? "warning" : "error"}>
                  {item.rate}%
                </StatusBadge>
              ),
            },
          ]}
          data={hierarchyBreakdown}
        />

        <DataTable
          title="Exceptions & Issues"
          columns={[
            { key: "id", header: "ID" },
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
