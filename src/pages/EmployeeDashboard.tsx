import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { LargeStatCard } from "@/components/dashboard/LargeStatCard";
import { InsightsSection } from "@/components/dashboard/InsightsSection";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { DataTable } from "@/components/dashboard/DataTable";
import { ProgressBar } from "@/components/dashboard/ProgressBar";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { UserCheck, Users, UserX, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const stats = [
  { label: "Total Source Records", value: 3247, subtitle: "Employee records received", icon: Users, variant: "primary" as const },
  { label: "Successfully Converted", value: 3102, subtitle: "", icon: UserCheck, variant: "success" as const, highlightText: "95.5% conversion rate" },
  { label: "Inactive Employees", value: 356, subtitle: "Archived records", icon: UserX, variant: "warning" as const },
  { label: "Missing Fields", value: 178, subtitle: "Data gaps identified", icon: AlertTriangle, variant: "accent" as const },
];

const insights = [
  { type: "success" as const, highlight: "Engineering department", text: "shows highest data quality with 99.2% field completeness and 98.7% conversion rate." },
  { type: "warning" as const, highlight: "Sales department", text: "has 12 employees with missing manager mappings - needs HR review." },
  { type: "success" as const, highlight: "Role mapping", text: "completed successfully for 437 unique job titles across all departments." },
  { type: "info" as const, highlight: "Hierarchy validation", text: "passed for 97.3% of employee records with proper reporting structure." },
];

const departmentData = [
  { name: "Sales", converted: 485, failed: 12 },
  { name: "Engineering", converted: 620, failed: 8 },
  { name: "Operations", converted: 412, failed: 23 },
  { name: "Finance", converted: 156, failed: 5 },
  { name: "HR", converted: 89, failed: 3 },
  { name: "Marketing", converted: 234, failed: 15 },
];

const employeeStatusData = [
  { name: "Active", value: 2891, color: "hsl(160, 84%, 39%)" },
  { name: "Inactive", value: 356, color: "hsl(215, 16%, 47%)" },
];

const dataQualityData = [
  { field: "Name", quality: 100 },
  { field: "Email", quality: 98.6 },
  { field: "Department", quality: 99.2 },
  { field: "Manager", quality: 95.4 },
  { field: "Phone", quality: 97.3 },
  { field: "Start Date", quality: 99.8 },
];

const roleMapping = [
  { sourceRole: "Software Engineer", targetRole: "Engineer - Software", count: 245, status: "success" as const },
  { sourceRole: "Sales Manager", targetRole: "Manager - Sales", count: 56, status: "success" as const },
  { sourceRole: "Accountant", targetRole: "Specialist - Finance", count: 34, status: "warning" as const },
  { sourceRole: "HR Coordinator", targetRole: "Coordinator - HR", count: 23, status: "success" as const },
  { sourceRole: "Data Analyst", targetRole: "Analyst - Data", count: 67, status: "success" as const },
  { sourceRole: "Unknown", targetRole: "Pending Assignment", count: 12, status: "error" as const },
];

const hierarchyValidation = [
  { level: "Executive", total: 12, valid: 12, invalid: 0, rate: 100 },
  { level: "Director", total: 45, valid: 44, invalid: 1, rate: 97.8 },
  { level: "Manager", total: 312, valid: 298, invalid: 14, rate: 95.5 },
  { level: "Senior", total: 856, valid: 832, invalid: 24, rate: 97.2 },
  { level: "Junior", total: 2022, valid: 1967, invalid: 55, rate: 97.3 },
];

const exceptions = [
  { id: "EMP-1001", name: "John Smith", issue: "Missing manager", status: "warning" as const },
  { id: "EMP-1042", name: "Sarah Johnson", issue: "Invalid department", status: "error" as const },
  { id: "EMP-1089", name: "Mike Brown", issue: "Duplicate entry", status: "warning" as const },
  { id: "EMP-1156", name: "Emily Davis", issue: "Terminated - still active", status: "error" as const },
  { id: "EMP-1203", name: "Robert Wilson", issue: "Review pending", status: "info" as const },
];

export default function EmployeeDashboard() {
  return (
    <SidebarLayout pageTitle="Employee Conversion Dashboard" pageSubtitle="Employee data migration and validation">
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
        <ChartCard title="Conversion by Department" subtitle="Records by department">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={departmentData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <YAxis dataKey="name" type="category" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} width={80} />
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

        <ChartCard title="Employee Status" subtitle="Active vs Inactive">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={employeeStatusData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={75}
                paddingAngle={2}
                dataKey="value"
              >
                {employeeStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
              <Tooltip formatter={(value: number) => value.toLocaleString()} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Data Quality Score" subtitle="Field-level completeness">
          <div className="space-y-3">
            {dataQualityData.map((item) => (
              <div key={item.field}>
                <ProgressBar
                  value={item.quality}
                  label={item.field}
                  variant={item.quality >= 98 ? "success" : item.quality >= 95 ? "warning" : "error"}
                />
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Role Mapping Table */}
      <DataTable
        title="Role/Position Mapping"
        columns={[
          { key: "sourceRole", header: "Source Role" },
          { key: "targetRole", header: "Target Role" },
          { key: "count", header: "Count", render: (item: typeof roleMapping[0]) => item.count.toLocaleString() },
          {
            key: "status",
            header: "Status",
            render: (item: typeof roleMapping[0]) => (
              <StatusBadge status={item.status}>
                {item.status === "success" ? "Mapped" : item.status === "warning" ? "Review" : "Unmapped"}
              </StatusBadge>
            ),
          },
        ]}
        data={roleMapping}
      />

      {/* Breakdown Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <DataTable
          title="Hierarchy Validation"
          columns={[
            { key: "level", header: "Level" },
            { key: "total", header: "Total" },
            { key: "valid", header: "Valid" },
            { key: "invalid", header: "Invalid" },
            {
              key: "rate",
              header: "Rate",
              render: (item: typeof hierarchyValidation[0]) => (
                <StatusBadge status={item.rate >= 98 ? "success" : item.rate >= 95 ? "warning" : "error"}>
                  {item.rate}%
                </StatusBadge>
              ),
            },
          ]}
          data={hierarchyValidation}
        />

        <DataTable
          title="Exceptions & Issues"
          columns={[
            { key: "id", header: "ID" },
            { key: "name", header: "Employee" },
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
