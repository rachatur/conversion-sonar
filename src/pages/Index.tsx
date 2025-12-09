import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { LargeStatCard } from "@/components/dashboard/LargeStatCard";
import { InsightsSection } from "@/components/dashboard/InsightsSection";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { Database, TrendingUp, AlertCircle, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const overallStats = [
  { label: "Total Source Records", value: 78815, subtitle: "Across all 4 modules", icon: Database, variant: "primary" as const },
  { label: "Successfully Loaded", value: 53374, subtitle: "", icon: TrendingUp, variant: "success" as const, highlightText: "67.72% overall load rate" },
  { label: "Records Excluded", value: 25441, subtitle: "Invalid/filtered records", icon: AlertCircle, variant: "warning" as const },
  { label: "Active OpCos", value: 7, subtitle: "All reporting data", icon: Users, variant: "accent" as const },
];

const insights = [
  { type: "success" as const, highlight: "Opportunity module", text: "shows highest load rate at 91.89% with 39,363 records loaded successfully." },
  { type: "warning" as const, highlight: "Sales Order EP", text: "has low load rate (21.55%) - needs investigation on data quality and exclusion criteria." },
  { type: "info" as const, highlight: "C&J", text: "consistently performs well across PO (84.13%) and Opportunity (99.72%) with minimal errors." },
];

const conversionByModule = [
  { name: "Sales Order", converted: 15234, failed: 8742 },
  { name: "Purchase Order", converted: 12456, failed: 3102 },
  { name: "On-Hand Inventory", converted: 8654, failed: 4202 },
  { name: "Opportunity", converted: 39363, failed: 3523 },
];

const statusDistribution = [
  { name: "Loaded", value: 53374, color: "hsl(160, 84%, 39%)" },
  { name: "Excluded", value: 25441, color: "hsl(32, 95%, 60%)" },
];

const Index = () => {
  return (
    <SidebarLayout pageTitle="Reconciliation Dashboard" pageSubtitle="Air Control Concepts UAT Environment">
      {/* Large Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {overallStats.map((stat) => (
          <LargeStatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Insights Section */}
      <div className="mb-8">
        <InsightsSection title="Key Insights & Recommendations" insights={insights} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Load Rate by Module" subtitle="Records processed per module">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={conversionByModule} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <YAxis dataKey="name" type="category" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => value.toLocaleString()}
              />
              <Bar dataKey="converted" fill="hsl(var(--success))" name="Loaded" radius={[0, 4, 4, 0]} />
              <Bar dataKey="failed" fill="hsl(var(--warning))" name="Excluded" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Overall Status" subtitle="Load success distribution">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
              <Tooltip formatter={(value: number) => value.toLocaleString()} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </SidebarLayout>
  );
};

export default Index;