import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { LargeStatCard } from "@/components/dashboard/LargeStatCard";
import { InsightsSection } from "@/components/dashboard/InsightsSection";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { DataTable } from "@/components/dashboard/DataTable";

import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { UserCheck, Users, XCircle, FolderOpen } from "lucide-react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const stats = [
  { label: "Total Source Records", value: 3247, subtitle: "Employee records received", icon: Users, variant: "primary" as const },
  { label: "Successfully Converted", value: 3102, subtitle: "", icon: UserCheck, variant: "success" as const, highlightText: "95.5% conversion rate" },
  { label: "Fusion Error Records", value: 89, subtitle: "Errors in fusion load", icon: XCircle, variant: "warning" as const },
  { label: "Valid Source Records", value: 3191, subtitle: "After deduplication", icon: FolderOpen, variant: "accent" as const },
];


const employeeStatusData = [
  { name: "Active", value: 2891, color: "hsl(160, 84%, 39%)" },
  { name: "Inactive", value: 356, color: "hsl(215, 16%, 47%)" },
];


const roleMapping = [
  { sourceRole: "Software Engineer", targetRole: "Engineer - Software", count: 245, status: "success" as const },
  { sourceRole: "Sales Manager", targetRole: "Manager - Sales", count: 56, status: "success" as const },
  { sourceRole: "Accountant", targetRole: "Specialist - Finance", count: 34, status: "warning" as const },
  { sourceRole: "HR Coordinator", targetRole: "Coordinator - HR", count: 23, status: "success" as const },
  { sourceRole: "Data Analyst", targetRole: "Analyst - Data", count: 67, status: "success" as const },
  { sourceRole: "Unknown", targetRole: "Pending Assignment", count: 12, status: "error" as const },
];


const keySteps = [
  { sNo: 1, activity: "Create Employee at Master Org (HCM)", description: "Establish employee records centrally in the Master HR Organization to serve as the source of truth.", owner: "Conversion Team", status: "Not Started" },
  { sNo: 2, activity: "Create Department Hierarchy", description: "Define department structures and reporting hierarchies for organizational alignment.", owner: "Conversion Team", status: "Not Started" },
  { sNo: 3, activity: "Create Job Titles/Positions", description: "Set up job titles and positions with proper grade levels and compensation structures.", owner: "Conversion Team", status: "Not Started" },
  { sNo: 4, activity: "Create Location Master", description: "Define work locations, offices, and site assignments for employees.", owner: "Conversion Team", status: "Not Started" },
  { sNo: 5, activity: "Assign Employee to Department", description: "Map employees to their respective departments based on organizational structure.", owner: "Conversion Team", status: "Not Started" },
  { sNo: 6, activity: "Assign Employee to Manager", description: "Establish reporting relationships by linking employees to their direct managers.", owner: "Conversion Team", status: "Not Started" },
  { sNo: 7, activity: "Assign Employee to Location", description: "Associate employees with their primary work location for HR and payroll purposes.", owner: "Conversion Team", status: "Not Started" },
  { sNo: 8, activity: "Assign Job Title/Position", description: "Link employees to their designated job titles and positions.", owner: "Conversion Team", status: "Not Started" },
  { sNo: 9, activity: "Associate Employee to Cost Center", description: "Map employees to cost centers for financial reporting and budgeting.", owner: "Conversion Team", status: "Not Started" },
  { sNo: 10, activity: "Associate Employee to Business Unit", description: "Assign employees to specific business units for operational alignment.", owner: "Conversion Team", status: "Not Started" },
  { sNo: 11, activity: "Set Employee Grade/Level", description: "Define employee grade levels for compensation and career progression.", owner: "Conversion Team", status: "Not Started" },
  { sNo: 12, activity: "Configure Payroll Elements", description: "Set up salary components, deductions, and payroll configurations.", owner: "Conversion Team", status: "Not Started" },
  { sNo: 13, activity: "Validate Manager Hierarchy", description: "Verify reporting chain integrity and resolve circular references.", owner: "Conversion Team", status: "Not Started" },
  { sNo: 14, activity: "Validate Department Assignments", description: "Ensure all employees have valid department assignments.", owner: "Conversion Team", status: "Not Started" },
  { sNo: 15, activity: "Create Role Mapping Matrix", description: "Define source-to-target role mapping for position conversions.", owner: "Functional Team", status: "Not Started" },
  { sNo: 16, activity: "Create Department Mapping Lookup", description: "Establish mapping between legacy and new department codes.", owner: "Functional Team", status: "Not Started" },
  { sNo: 17, activity: "Determine Inactive Employee Logic", description: "Define rules for handling terminated/inactive employee records.", owner: "Functional Team", status: "Not Started" },
  { sNo: 18, activity: "Create Employee Type Classification", description: "Categorize employees as full-time, part-time, contractor, etc.", owner: "Functional Team", status: "Not Started" },
];

export default function EmployeeDashboard() {
  return (
    <SidebarLayout pageTitle="Air Control Concepts Data Reconciliation (UAT)" pageSubtitle="Employee Conversion Dashboard">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {stats.map((stat) => (
          <LargeStatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="mb-8">
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

      {/* Key Steps Activity Tracking */}
      <div className="mt-6">
        <DataTable
          title="Key Steps - Employee Conversion Activities"
          columns={[
            { key: "sNo", header: "S.No" },
            { key: "activity", header: "Activity" },
            { key: "description", header: "Description" },
            { key: "owner", header: "Owner" },
            {
              key: "status",
              header: "Status",
              render: (item: typeof keySteps[0]) => (
                <StatusBadge 
                  status={
                    item.status === "Completed" ? "success" : 
                    item.status === "In Progress" ? "warning" : 
                    "info"
                  }
                >
                  {item.status}
                </StatusBadge>
              ),
            },
          ]}
          data={keySteps}
        />
      </div>
    </SidebarLayout>
  );
}
