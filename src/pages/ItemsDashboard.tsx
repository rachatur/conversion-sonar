import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { LargeStatCard } from "@/components/dashboard/LargeStatCard";
import { InsightsSection } from "@/components/dashboard/InsightsSection";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { DataTable } from "@/components/dashboard/DataTable";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { ConsolidatedReconTable } from "@/components/dashboard/ConsolidatedReconTable";
import { Boxes, CheckCircle, XCircle, FolderOpen, Tag, Layers } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

// Item Recon Branch Summary Data
const itemReconBranchData = [
  { 
    name: "Manufacturer_Branch",
    data: [
      { metric: "Total Source File Records", value: 24945 },
      { metric: "Records Excluded / Not Valid", value: 0 },
      { metric: "Valid Source Records", value: 24945 },
      { metric: "", value: 0 },
      { metric: "Total FBDI Records for Upload", value: 24945 },
      { metric: "Errored in FBDI Upload", value: 0 },
      { metric: "FBDI Records loaded Successful", value: 24945 },
    ]
  },
  { 
    name: "Equipment_All_Branches",
    data: [
      { metric: "Total Source File Records", value: 233180 },
      { metric: "Records Excluded / Not Valid", value: 0 },
      { metric: "Valid Source Records", value: 233180 },
      { metric: "", value: 0 },
      { metric: "Total FBDI Records for Upload", value: 233180 },
      { metric: "Errored in FBDI Upload", value: 0 },
      { metric: "FBDI Records loaded Successful", value: 233180 },
    ]
  },
  { 
    name: "Parts_ALL_Branches",
    data: [
      { metric: "Total Source File Records", value: 134200 },
      { metric: "Records Excluded / Not Valid", value: 0 },
      { metric: "Valid Source Records", value: 134200 },
      { metric: "", value: 0 },
      { metric: "Total FBDI Records for Upload", value: 134200 },
      { metric: "Errored in FBDI Upload", value: 0 },
      { metric: "FBDI Records loaded Successful", value: 134200 },
    ]
  },
  { 
    name: "Service_All_Branches",
    data: [
      { metric: "Total Source File Records", value: 94000 },
      { metric: "Records Excluded / Not Valid", value: 0 },
      { metric: "Valid Source Records", value: 94000 },
      { metric: "", value: 0 },
      { metric: "Total FBDI Records for Upload", value: 94000 },
      { metric: "Errored in FBDI Upload", value: 0 },
      { metric: "FBDI Records loaded Successful", value: 94000 },
    ]
  },
];

// Item Recon Summary Data (Category Assignments)
const itemReconSummaryData = [
  { 
    name: "Category_Assignment_lob",
    data: [
      { metric: "Total Source File Records", value: 20719 },
      { metric: "Records Excluded / Not Valid", value: 0 },
      { metric: "Valid Source Records", value: 20719 },
      { metric: "", value: 0 },
      { metric: "Total FBDI Records for Upload", value: 20719 },
      { metric: "Errored in FBDI Upload", value: 0 },
      { metric: "FBDI Records loaded Successful", value: 20719 },
    ]
  },
  { 
    name: "Category_Assignment_Parent",
    data: [
      { metric: "Total Source File Records", value: 20719 },
      { metric: "Records Excluded / Not Valid", value: 0 },
      { metric: "Valid Source Records", value: 20719 },
      { metric: "", value: 0 },
      { metric: "Total FBDI Records for Upload", value: 20719 },
      { metric: "Errored in FBDI Upload", value: 0 },
      { metric: "FBDI Records loaded Successful", value: 20719 },
    ]
  },
  { 
    name: "Category_Assignment_PRO_LINE",
    data: [
      { metric: "Total Source File Records", value: 20719 },
      { metric: "Records Excluded / Not Valid", value: 0 },
      { metric: "Valid Source Records", value: 20719 },
      { metric: "", value: 0 },
      { metric: "Total FBDI Records for Upload", value: 20719 },
      { metric: "Errored in FBDI Upload", value: 0 },
      { metric: "FBDI Records loaded Successful", value: 20719 },
    ]
  },
  { 
    name: "Category_Assignment_PO",
    data: [
      { metric: "Total Source File Records", value: 20719 },
      { metric: "Records Excluded / Not Valid", value: 0 },
      { metric: "Valid Source Records", value: 20719 },
      { metric: "", value: 0 },
      { metric: "Total FBDI Records for Upload", value: 20719 },
      { metric: "Errored in FBDI Upload", value: 0 },
      { metric: "FBDI Records loaded Successful", value: 20719 },
    ]
  },
  { 
    name: "IMO_Items",
    data: [
      { metric: "Total Source File Records", value: 20719 },
      { metric: "Records Excluded / Not Valid", value: 0 },
      { metric: "Valid Source Records", value: 20719 },
      { metric: "", value: 0 },
      { metric: "Total FBDI Records for Upload", value: 20719 },
      { metric: "Errored in FBDI Upload", value: 0 },
      { metric: "FBDI Records loaded Successful", value: 20719 },
    ]
  },
];

// Stats from UAT Item Counts
const stats = [
  { label: "Total Item Count", value: 233014, subtitle: "Items in system", icon: Boxes, variant: "primary" as const },
  { label: "Item EFF Counts", value: 17477, subtitle: "Extensible Flexfields", icon: Tag, variant: "success" as const },
  { label: "Item Categories", value: 52334, subtitle: "Category assignments", icon: Layers, variant: "accent" as const },
  { label: "IMO Items", value: 13060, subtitle: "Master Org items", icon: FolderOpen, variant: "warning" as const },
];

const insights = [
  { type: "success" as const, highlight: "All branch uploads", text: "completed with 100% success rate - no errors in FBDI upload across all branches." },
  { type: "success" as const, highlight: "Category assignments", text: "fully loaded with 20,719 records each for LOB, Parent, Product Line, and PO categories." },
  { type: "info" as const, highlight: "Equipment branch", text: "has the highest record count at 233,180 items across all branches." },
  { type: "info" as const, highlight: "31 key steps", text: "identified for item conversion process - all currently in 'Not Started' status." },
];

// Branch-wise item distribution for chart
const branchDistribution = [
  { name: "Equipment", value: 233180, color: "hsl(207, 90%, 54%)" },
  { name: "Parts", value: 134200, color: "hsl(160, 84%, 39%)" },
  { name: "Service", value: 94000, color: "hsl(32, 95%, 60%)" },
  { name: "Manufacturer", value: 24945, color: "hsl(280, 65%, 60%)" },
];

// Item counts by BU
const itemCountsByBU = [
  { name: "EBS", count: 56485 },
  { name: "Etairos", count: 49178 },
  { name: "Airetech", count: 56946 },
  { name: "Dorse", count: 38629 },
  { name: "ATS", count: 19654 },
  { name: "Engineered Products", count: 12222 },
];

// Key Steps for Item Conversion
const keySteps = [
  { sno: 1, activity: "Create Item at Master Org (IMO)", owner: "Conversion Team", status: "not-started" as const },
  { sno: 2, activity: "Create Catalog: Parent LOB", owner: "Conversion Team", status: "not-started" as const },
  { sno: 3, activity: "Create Catalog: LOB", owner: "Conversion Team", status: "not-started" as const },
  { sno: 4, activity: "Create Catalog: Product Line", owner: "Conversion Team", status: "not-started" as const },
  { sno: 5, activity: "Equipment Branch", owner: "Conversion Team", status: "not-started" as const },
  { sno: 6, activity: "Parts Branch", owner: "Conversion Team", status: "not-started" as const },
  { sno: 7, activity: "Service Branch", owner: "Conversion Team", status: "not-started" as const },
  { sno: 8, activity: "Turnkey Branch", owner: "Conversion Team", status: "not-started" as const },
  { sno: 10, activity: "Associate item to 'Manufacturer' (EFF)", owner: "Conversion Team", status: "not-started" as const },
  { sno: 11, activity: "Associate item to 'Manufacturer Equipment Type' (EFF)", owner: "Conversion Team", status: "not-started" as const },
  { sno: 12, activity: "Associate item to 'Parent LOB'", owner: "Conversion Team", status: "not-started" as const },
  { sno: 13, activity: "Associate item to 'LOB'", owner: "Conversion Team", status: "not-started" as const },
  { sno: 14, activity: "Associate item to 'Product Line'", owner: "Conversion Team", status: "not-started" as const },
  { sno: 15, activity: "Associate item to 'Internal Equipment Type'", owner: "Conversion Team", status: "not-started" as const },
  { sno: 16, activity: "Associate item to 'Champion'", owner: "Conversion Team", status: "not-started" as const },
  { sno: 17, activity: "Associate item to 'Pricing Category'", owner: "Conversion Team", status: "not-started" as const },
  { sno: 18, activity: "Assign 'Sales Account' to items at Branches", owner: "Conversion Team", status: "not-started" as const },
  { sno: 19, activity: "Flag Item as 'Min Max'", owner: "Conversion Team", status: "not-started" as const },
  { sno: 20, activity: "Assign Min/Max Order Quantity", owner: "Conversion Team", status: "not-started" as const },
  { sno: 21, activity: "Assign 'Lead Time' at branch level", owner: "Conversion Team", status: "not-started" as const },
  { sno: 22, activity: "Flag Items as 'Drop Ship enabled'", owner: "Conversion Team", status: "not-started" as const },
  { sno: 23, activity: "Assign service items to 'Services' LOB branches", owner: "Conversion Team", status: "not-started" as const },
  { sno: 24, activity: "Create 'Manufacturer' (Lookup)", owner: "Functional Team", status: "not-started" as const },
  { sno: 25, activity: "Create 'Manufacturer Equipment Type' (Lookup)", owner: "Functional Team", status: "not-started" as const },
  { sno: 26, activity: "Create 'Manufacturer - Branch' Matrix", owner: "Functional Team", status: "not-started" as const },
  { sno: 27, activity: "Determine logic for 'Services' LOB assignment", owner: "Functional Team", status: "not-started" as const },
  { sno: 28, activity: "Determine logic for 'Turnkey' LOB assignment", owner: "Functional Team", status: "not-started" as const },
  { sno: 29, activity: "Create List of Service Items at Master Org", owner: "Functional Team", status: "not-started" as const },
  { sno: 30, activity: "Create List of Expense Items at Master Org", owner: "Functional Team", status: "not-started" as const },
  { sno: 31, activity: "Assign Expense items to all branches", owner: "Functional Team", status: "not-started" as const },
];

export default function ItemsDashboard() {
  return (
    <SidebarLayout pageTitle="Air Control Concepts Data Reconciliation (UAT)" pageSubtitle="Items Conversion Dashboard">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <LargeStatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Insights */}
      <div className="mb-8">
        <InsightsSection title="Key Insights & Status" insights={insights} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Branch Distribution" subtitle="Records by branch type">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={branchDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value.toLocaleString()}`}
              >
                {branchDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
              <Tooltip formatter={(value: number) => value.toLocaleString()} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Item Count by Business Unit" subtitle="Distribution across BUs">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={itemCountsByBU} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <YAxis dataKey="name" type="category" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} width={120} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => value.toLocaleString()}
              />
              <Bar dataKey="count" fill="hsl(var(--primary))" name="Item Count" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Item Recon Branch Summary Table */}
      <ConsolidatedReconTable
        title="Item Recon Branch Summary"
        opCoDataList={itemReconBranchData}
        dataColumns={[{ key: "value", label: "Count" }]}
      />

      {/* Item Recon Summary (Category Assignments) */}
      <div className="mt-6">
        <ConsolidatedReconTable
          title="Item Recon Summary (Category Assignments)"
          opCoDataList={itemReconSummaryData}
          dataColumns={[{ key: "value", label: "Count" }]}
        />
      </div>

      {/* Key Steps Table */}
      <div className="mt-6">
        <DataTable
          title="Key Steps - Item Conversion"
          columns={[
            { key: "sno", header: "S.No" },
            { key: "activity", header: "Activity" },
            { key: "owner", header: "Owner" },
            {
              key: "status",
              header: "Status",
              render: (item: typeof keySteps[0]) => (
                <StatusBadge status="warning">Not Started</StatusBadge>
              ),
            },
          ]}
          data={keySteps}
        />
      </div>
    </SidebarLayout>
  );
}
