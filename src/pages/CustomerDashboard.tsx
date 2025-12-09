import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { DataTable } from "@/components/dashboard/DataTable";
import { ProgressBar } from "@/components/dashboard/ProgressBar";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Users, CheckCircle, XCircle, AlertTriangle, Building, MapPin, FileText, Copy } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend, AreaChart, Area } from "recharts";

const stats = [
  { title: "Customers Received", value: 45892, icon: Users, variant: "info" as const },
  { title: "Successfully Converted", value: 42150, icon: CheckCircle, variant: "success" as const },
  { title: "Failed Conversion", value: 3742, icon: XCircle, variant: "error" as const },
  { title: "Duplicates Found", value: 856, icon: Copy, variant: "warning" as const },
];

const summaryCards = [
  { title: "Corporate Customers", value: 12450, icon: Building },
  { title: "Individual Customers", value: 33442, icon: Users },
  { title: "Missing Address Data", value: 1245, icon: MapPin },
  { title: "Missing Tax Info", value: 892, icon: FileText },
];

const errorTrendData = [
  { date: "Week 1", errors: 1250, resolved: 980 },
  { date: "Week 2", errors: 890, resolved: 820 },
  { date: "Week 3", errors: 650, resolved: 610 },
  { date: "Week 4", errors: 520, resolved: 490 },
  { date: "Week 5", errors: 432, resolved: 410 },
];

const customerTypeData = [
  { name: "Corporate", value: 12450, color: "hsl(210, 100%, 45%)" },
  { name: "Individual", value: 33442, color: "hsl(172, 66%, 40%)" },
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
    <DashboardLayout title="Customer Conversion" subtitle="Customer Conversion Dashboard">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Summary Cards */}
      <h2 className="section-title mb-4">Customer Summary</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {summaryCards.map((card) => (
          <div key={card.title} className="stat-card">
            <div className="flex items-center gap-3">
              <div className="stat-card-icon bg-secondary text-primary">
                <card.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{card.value.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">{card.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ChartCard title="Error Trends" subtitle="Weekly error tracking">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={errorTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Area type="monotone" dataKey="errors" fill="hsl(var(--destructive) / 0.2)" stroke="hsl(var(--destructive))" />
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
    </DashboardLayout>
  );
}
