import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { LargeStatCard } from "@/components/dashboard/LargeStatCard";
import { InsightsSection } from "@/components/dashboard/InsightsSection";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { DataTable } from "@/components/dashboard/DataTable";
import { ProgressBar } from "@/components/dashboard/ProgressBar";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Boxes, CheckCircle, XCircle, Tag } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts";

const stats = [
  { label: "Total Source Records", value: 128459, subtitle: "Item records received", icon: Boxes, variant: "primary" as const },
  { label: "Successfully Converted", value: 118420, subtitle: "", icon: CheckCircle, variant: "success" as const, highlightText: "92.2% conversion rate" },
  { label: "Records Excluded", value: 10039, subtitle: "Failed/filtered records", icon: XCircle, variant: "warning" as const },
  { label: "Missing Category", value: 2456, subtitle: "Pending categorization", icon: Tag, variant: "accent" as const },
];

const insights = [
  { type: "success" as const, highlight: "Electronics product line", text: "shows highest conversion rate at 96.3% with 32,450 items loaded successfully." },
  { type: "warning" as const, highlight: "Consumables category", text: "has lower rate (88.5%) due to UOM mapping issues - needs standardization." },
  { type: "success" as const, highlight: "BOM mapping", text: "completed for 97.8% of items with proper parent-child relationships." },
  { type: "info" as const, highlight: "Valuation method", text: "standardized to weighted average for 98.2% of inventory items." },
];

const productLineData = [
  { name: "Electronics", converted: 32450, failed: 1245 },
  { name: "Machinery", converted: 28900, failed: 2340 },
  { name: "Raw Materials", converted: 24560, failed: 1890 },
  { name: "Consumables", converted: 18900, failed: 2456 },
  { name: "Spare Parts", converted: 13610, failed: 2108 },
];

const categoryDistribution = [
  { name: "Finished Goods", value: 45230, color: "hsl(207, 90%, 54%)" },
  { name: "Raw Materials", value: 38450, color: "hsl(160, 84%, 39%)" },
  { name: "WIP", value: 24560, color: "hsl(32, 95%, 60%)" },
  { name: "Services", value: 20219, color: "hsl(280, 65%, 60%)" },
];

const completenessData = [
  { field: "Item Name", complete: 99.9 },
  { field: "Description", complete: 97.8 },
  { field: "Category", complete: 98.1 },
  { field: "UOM", complete: 98.6 },
  { field: "Price", complete: 96.2 },
  { field: "Cost", complete: 94.5 },
];

const attributeIssues = [
  { week: "W1", issues: 3450, resolved: 2890 },
  { week: "W2", issues: 2890, resolved: 2560 },
  { week: "W3", issues: 2340, resolved: 2180 },
  { week: "W4", issues: 1890, resolved: 1780 },
  { week: "W5", issues: 1469, resolved: 1320 },
];

const sourceTargetComparison = [
  { field: "Item Code", source: 128459, target: 128459, match: true },
  { field: "Description", source: 128459, target: 125670, match: false },
  { field: "Category", source: 128459, target: 126003, match: false },
  { field: "UOM", source: 128459, target: 126636, match: false },
  { field: "List Price", source: 128459, target: 123578, match: false },
  { field: "Cost", source: 128459, target: 121345, match: false },
];

const bomMapping = [
  { type: "Single Level BOM", total: 45230, mapped: 43890, pending: 1340, rate: 97.0 },
  { type: "Multi-Level BOM", total: 28450, mapped: 26780, pending: 1670, rate: 94.1 },
  { type: "Phantom BOM", total: 12340, mapped: 11560, pending: 780, rate: 93.7 },
  { type: "Kit/Bundle", total: 8920, mapped: 8450, pending: 470, rate: 94.7 },
  { type: "Reference Only", total: 33519, mapped: 32890, pending: 629, rate: 98.1 },
];

const exceptions = [
  { id: "ITM-00145", name: "Electronic Component A", issue: "Missing category", status: "warning" as const },
  { id: "ITM-02389", name: "Machine Part B-234", issue: "Invalid UOM", status: "error" as const },
  { id: "ITM-04567", name: "Raw Material XY-90", issue: "Duplicate SKU", status: "warning" as const },
  { id: "ITM-06721", name: "Assembly Kit Z-12", issue: "BOM validation failed", status: "error" as const },
  { id: "ITM-08934", name: "Consumable Pack C", issue: "Price validation", status: "info" as const },
];

export default function ItemsDashboard() {
  return (
    <SidebarLayout pageTitle="Items Conversion Dashboard" pageSubtitle="Item master data migration and validation">
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
        <ChartCard title="Conversion by Product Line" subtitle="Top 5 product lines">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={productLineData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <YAxis dataKey="name" type="category" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} width={85} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="converted" fill="hsl(var(--success))" name="Converted" radius={[0, 4, 4, 0]} />
              <Bar dataKey="failed" fill="hsl(var(--warning))" name="Failed" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Category Distribution" subtitle="Item categories">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={categoryDistribution}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={75}
                paddingAngle={2}
                dataKey="value"
              >
                {categoryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
              <Tooltip formatter={(value: number) => value.toLocaleString()} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Attribute Issues Trend" subtitle="Weekly tracking">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={attributeIssues}>
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
              <Line type="monotone" dataKey="issues" stroke="hsl(var(--warning))" strokeWidth={2} dot={{ fill: "hsl(var(--warning))" }} />
              <Line type="monotone" dataKey="resolved" stroke="hsl(var(--success))" strokeWidth={2} dot={{ fill: "hsl(var(--success))" }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Data Completeness & Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Data Completeness" subtitle="Field-level analysis">
          <div className="space-y-3">
            {completenessData.map((item) => (
              <div key={item.field}>
                <ProgressBar
                  value={item.complete}
                  label={item.field}
                  variant={item.complete >= 98 ? "success" : item.complete >= 95 ? "warning" : "error"}
                />
              </div>
            ))}
          </div>
        </ChartCard>

        <DataTable
          title="Source vs Target Comparison"
          columns={[
            { key: "field", header: "Field" },
            { key: "source", header: "Source", render: (item: typeof sourceTargetComparison[0]) => item.source.toLocaleString() },
            { key: "target", header: "Target", render: (item: typeof sourceTargetComparison[0]) => item.target.toLocaleString() },
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
      </div>

      {/* Breakdown Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DataTable
          title="BOM Mapping Status"
          columns={[
            { key: "type", header: "BOM Type" },
            { key: "total", header: "Total", render: (item: typeof bomMapping[0]) => item.total.toLocaleString() },
            { key: "mapped", header: "Mapped", render: (item: typeof bomMapping[0]) => item.mapped.toLocaleString() },
            {
              key: "rate",
              header: "Rate",
              render: (item: typeof bomMapping[0]) => (
                <StatusBadge status={item.rate >= 95 ? "success" : item.rate >= 90 ? "warning" : "error"}>
                  {item.rate}%
                </StatusBadge>
              ),
            },
          ]}
          data={bomMapping}
        />

        <DataTable
          title="Exceptions & Issues"
          columns={[
            { key: "id", header: "ID" },
            { key: "name", header: "Item" },
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
