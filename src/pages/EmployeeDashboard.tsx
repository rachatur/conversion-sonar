import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { LargeStatCard } from "@/components/dashboard/LargeStatCard";
import { DataTable } from "@/components/dashboard/DataTable";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { UserCheck, Users, XCircle, FolderOpen } from "lucide-react";

// Overall Employee Stats
const stats = [
  { label: "Total Employees in SIT", value: 382, subtitle: "Employee records in system", icon: Users, variant: "primary" as const },
  { label: "Employees Loaded Successfully", value: 381, subtitle: "", icon: UserCheck, variant: "success" as const, highlightText: "100% load success rate" },
  { label: "Failed Employee Records", value: 0, subtitle: "No failed records", icon: XCircle, variant: "warning" as const },
  { label: "Total Employees Intended", value: 381, subtitle: "After omissions", icon: FolderOpen, variant: "accent" as const },
];

// Employee Data Load Summary
const employeeLoadSummary = [
  { metric: "Total Employees in SIT", value: 382 },
  { metric: "Total No Of Lines in data file", value: 381 },
  { metric: "Number of records Omitted for load", value: 0 },
  { metric: "Total Employees Intended", value: 381 },
  { metric: "Employees Loaded Successfully", value: 381 },
  { metric: "Failed Employee Records", value: 0 },
  { metric: "Load Success Rate", value: "100%" },
  { metric: "Manual Implementation User extra in system", value: 1 },
];

// Manager Assignment Data Load Summary
const managerLoadSummary = [
  { metric: "Total Managers Loaded in SIT", value: 286 },
  { metric: "Total No Of Lines in data file", value: 369 },
  { metric: "Number of records Omitted for load (Bad or Out of Scope data)", value: 12 },
  { metric: "Total Employees Intended", value: 369 },
  { metric: "Employees Loaded Successfully", value: 286 },
  { metric: "Failed Employee Records", value: 83 },
  { metric: "Load Success Rate", value: "75%" },
  { metric: "Review Required", value: 84 },
];

// Source Count by OpCo
const sourceCountByOpCo = [
  { opCo: "Advanced Thermal Solutions, LLC", countOfEmployees: 29, countOfManager: 29 },
  { opCo: "Air Control Concepts, LLC", countOfEmployees: 81, countOfManager: 81 },
  { opCo: "Airetech Corporation", countOfEmployees: 63, countOfManager: 63 },
  { opCo: "C&J Building Solutions, LLC", countOfEmployees: 23, countOfManager: 23 },
  { opCo: "Dorse & Company, LLC", countOfEmployees: 47, countOfManager: 46 },
  { opCo: "Engineered Products, LLC", countOfEmployees: 13, countOfManager: 13 },
  { opCo: "Etairos HVAC JV, LLC", countOfEmployees: 57, countOfManager: 57 },
  { opCo: "Smart Enterprises, LLC (EBS)", countOfEmployees: 68, countOfManager: 68 },
  { opCo: "Grand Total", countOfEmployees: 381, countOfManager: 380 },
  { opCo: "Missing record", countOfEmployees: "", countOfManager: 1 },
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

      {/* Data Load Summary Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <DataTable
          title="Employee Data Load Summary Report"
          columns={[
            { key: "metric", header: "Metric" },
            { key: "value", header: "Value" },
          ]}
          data={employeeLoadSummary}
        />
        <DataTable
          title="Manager Assignment Data Load Summary Report"
          columns={[
            { key: "metric", header: "Metric" },
            { key: "value", header: "Value" },
          ]}
          data={managerLoadSummary}
        />
      </div>

      {/* Source Count by OpCo */}
      <div className="mb-8">
        <DataTable
          title="Source Count by OpCo"
          columns={[
            { key: "opCo", header: "OpCo" },
            { key: "countOfEmployees", header: "Count of Employees" },
            { key: "countOfManager", header: "Count of Manager" },
          ]}
          data={sourceCountByOpCo}
        />
      </div>

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
