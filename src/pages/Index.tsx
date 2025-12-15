import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { LargeStatCard } from "@/components/dashboard/LargeStatCard";
import { InsightsSection } from "@/components/dashboard/InsightsSection";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { useFileUpload } from "@/hooks/useFileUpload";
import { Database, TrendingUp, AlertCircle, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const overallStats = [
  { label: "Total Source Records", value: 152807, subtitle: "Across all 4 modules", icon: Database, variant: "primary" as const },
  { label: "Successfully Converted", value: 136377, subtitle: "", icon: TrendingUp, variant: "success" as const, highlightText: "89.2% overall conversion rate" },
  { label: "Records Excluded", value: 16430, subtitle: "Invalid/filtered records", icon: AlertCircle, variant: "warning" as const },
  { label: "Active Status", value: "Live", subtitle: "All modules operational", icon: Activity, variant: "success" as const },
];

const insights = [
  { type: "success" as const, highlight: "Items module", text: "shows highest volume with 128,459 records processed at 92.2% success rate across 15 branches." },
  { type: "warning" as const, highlight: "Supplier conversion", text: "has the lowest rate (89.1%) across 10 OpCos - needs investigation on address and bank data quality." },
  { type: "success" as const, highlight: "Employee module", text: "consistently performs well with 95.5% conversion rate across 8 OpCos." },
  { type: "info" as const, highlight: "Customer data", text: "shows 91.8% conversion across 12 OpCos with regional variations - Middle East & Africa needs attention." },
];

const conversionByModule = [
  { name: "Customer", converted: 38000, failed: 4500 },
  { name: "Employee", converted: 5000, failed: 300 },
  { name: "Supplier", converted: 4000, failed: 200 },
  { name: "Items", converted: 117000, failed: 15000 },
];

const statusDistribution = [
  { name: "Converted", value: 165326, color: "hsl(160, 84%, 39%)" },
  { name: "Failed", value: 14128, color: "hsl(32, 95%, 60%)" },
];

const opCoMappings: Record<string, string> = {
  "airtech": "AIRTECH",
  "airetech": "AIRETECH",
  "ats": "ATS",
  "c&j": "C&J",
  "cj": "C&J",
  "dorse": "DORSE",
  "ebs": "EBS",
  "ep": "EP",
  "etarios": "ETARIOS",
  "etairos": "ETARIOS",
};

const Index = () => {
  const { fileInputRef, handleFileSelect } = useFileUpload({
    storageKey: "dashboardUploadedFiles",
    opCoMappings,
  });

  return (
    <SidebarLayout 
      pageTitle="Air Control Concepts Data Reconciliation (UAT)" 
      pageSubtitle="Data Reconciliation Dashboard"
      showUpload={true}
      fileInputRef={fileInputRef}
      onFileSelect={handleFileSelect}
    >
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
        <ChartCard title="Conversion by Module" subtitle="Records processed per module">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={conversionByModule} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <YAxis dataKey="name" type="category" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} width={80} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => value.toLocaleString()}
              />
              <Bar dataKey="converted" fill="hsl(var(--success))" name="Converted" radius={[0, 4, 4, 0]} />
              <Bar dataKey="failed" fill="hsl(var(--warning))" name="Failed" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Overall Status" subtitle="Conversion success distribution">
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
