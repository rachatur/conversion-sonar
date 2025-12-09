import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { ProgressBar } from "@/components/dashboard/ProgressBar";
import { Link } from "react-router-dom";
import { Users, UserCheck, Package, Boxes, ArrowRight, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const overallStats = [
  { title: "Total Customers", value: 45892, icon: Users, variant: "info" as const, trend: { value: 12.5, isPositive: true } },
  { title: "Total Employees", value: 3247, icon: UserCheck, variant: "success" as const, trend: { value: 8.3, isPositive: true } },
  { title: "Total Suppliers", value: 1856, icon: Package, variant: "warning" as const, trend: { value: 5.2, isPositive: true } },
  { title: "Total Items", value: 128459, icon: Boxes, variant: "default" as const, trend: { value: 15.8, isPositive: true } },
];

const conversionData = [
  { name: "Customers", converted: 42150, failed: 3742, total: 45892 },
  { name: "Employees", converted: 3102, failed: 145, total: 3247 },
  { name: "Suppliers", converted: 1654, failed: 202, total: 1856 },
  { name: "Items", converted: 118420, failed: 10039, total: 128459 },
];

const pieData = [
  { name: "Converted", value: 165326, color: "hsl(142, 71%, 45%)" },
  { name: "Failed", value: 14128, color: "hsl(0, 84%, 60%)" },
];

const dashboardLinks = [
  { path: "/customer", title: "Customer Conversion", description: "Track customer data conversion progress", icon: Users, stats: { converted: 42150, failed: 3742 } },
  { path: "/employee", title: "Employee Conversion", description: "Monitor employee data migration", icon: UserCheck, stats: { converted: 3102, failed: 145 } },
  { path: "/supplier", title: "Supplier Conversion", description: "Analyze supplier data integration", icon: Package, stats: { converted: 1654, failed: 202 } },
  { path: "/items", title: "Items Conversion", description: "Review item master data conversion", icon: Boxes, stats: { converted: 118420, failed: 10039 } },
];

const Index = () => {
  return (
    <DashboardLayout title="Dashboard Overview" subtitle="Home">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {overallStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Conversion Status */}
        <ChartCard title="Overall Conversion Status" subtitle="All entity types combined">
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip formatter={(value: number) => value.toLocaleString()} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-success">92.1%</p>
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-destructive">7.9%</p>
              <p className="text-sm text-muted-foreground">Error Rate</p>
            </div>
          </div>
        </ChartCard>

        {/* Conversion by Type */}
        <ChartCard title="Conversion by Entity Type" subtitle="Records processed">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={conversionData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <YAxis dataKey="name" type="category" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} width={80} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="converted" fill="hsl(var(--success))" name="Converted" radius={[0, 4, 4, 0]} />
              <Bar dataKey="failed" fill="hsl(var(--destructive))" name="Failed" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Quick Stats */}
        <ChartCard title="Conversion Progress" subtitle="By entity type">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Customers</span>
                <span className="text-sm text-muted-foreground">42,150 / 45,892</span>
              </div>
              <ProgressBar value={91.8} variant="success" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Employees</span>
                <span className="text-sm text-muted-foreground">3,102 / 3,247</span>
              </div>
              <ProgressBar value={95.5} variant="success" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Suppliers</span>
                <span className="text-sm text-muted-foreground">1,654 / 1,856</span>
              </div>
              <ProgressBar value={89.1} variant="warning" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Items</span>
                <span className="text-sm text-muted-foreground">118,420 / 128,459</span>
              </div>
              <ProgressBar value={92.2} variant="success" />
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Dashboard Links */}
      <h2 className="section-title mb-4">Dashboard Navigation</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dashboardLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="stat-card group flex items-center justify-between hover:border-primary/50"
          >
            <div className="flex items-center gap-4">
              <div className="stat-card-icon bg-primary/10 text-primary">
                <link.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{link.title}</h3>
                <p className="text-sm text-muted-foreground">{link.description}</p>
                <div className="mt-2 flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1 text-success">
                    <CheckCircle className="h-3 w-3" />
                    {link.stats.converted.toLocaleString()} converted
                  </span>
                  <span className="flex items-center gap-1 text-destructive">
                    <XCircle className="h-3 w-3" />
                    {link.stats.failed.toLocaleString()} failed
                  </span>
                </div>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Index;
