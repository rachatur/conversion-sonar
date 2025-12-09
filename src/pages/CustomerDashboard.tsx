import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { LargeStatCard } from "@/components/dashboard/LargeStatCard";
import { InsightsSection } from "@/components/dashboard/InsightsSection";
import { OpCoLoadPerformance } from "@/components/dashboard/OpCoLoadPerformance";
import { Users, CheckCircle, XCircle, FolderOpen } from "lucide-react";

// OpCo Load Performance data for Customer Dashboard - matching screenshot format
const customerOpCoPerformance = [
  { name: "ATS", headers: { source: 424, valid: 47, loaded: 37 }, lines: { source: 6289, valid: 73, loaded: 54 }, loadRate: 1.36 },
  { name: "EBS", headers: { source: 2305, valid: 1078, loaded: 1078 }, lines: { source: 10423, valid: 4166, loaded: 4166 }, loadRate: 41.20 },
  { name: "EP", headers: { source: 99, valid: 35, loaded: 22 }, lines: { source: 583, valid: 274, loaded: 125 }, loadRate: 21.55 },
  { name: "Etairos", headers: { source: 231, valid: 153, loaded: 153 }, lines: { source: 608, valid: 362, loaded: 362 }, loadRate: 61.38 },
  { name: "Dorse Std", headers: { source: 380, valid: 121, loaded: 127 }, lines: { source: 1212, valid: 450, loaded: 489 }, loadRate: 38.69 },
  { name: "Dorse DS", headers: { source: 484, valid: 98, loaded: 98 }, lines: { source: 895, valid: 182, loaded: 182 }, loadRate: 20.30 },
];

// Stats data
const stats = [
  { label: "Total Source Records", value: 2249, subtitle: "Customer records received", icon: Users, variant: "primary" as const },
  { label: "Successfully Converted", value: 2158, subtitle: "", icon: CheckCircle, variant: "success" as const, highlightText: "96% conversion rate" },
  { label: "Fusion Error Records", value: 0, subtitle: "Errors in fusion load", icon: XCircle, variant: "warning" as const },
  { label: "Valid Source Records", value: 2158, subtitle: "After deduplication", icon: FolderOpen, variant: "accent" as const },
];

const insights = [
  { type: "success" as const, highlight: "FBDI Upload", text: "completed with 100% success rate - all 2,158 valid customer records loaded successfully." },
  { type: "info" as const, highlight: "Customer Sites", text: "Bill To: 2,652 records, Ship To: 195 records loaded." },
  { type: "warning" as const, highlight: "91 records excluded", text: "from customer data - review exclusion criteria." },
];

export default function CustomerDashboard() {
  return (
    <SidebarLayout pageTitle="Air Control Concepts Data Reconciliation (UAT)" pageSubtitle="Customer Conversion Dashboard">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {stats.map((stat) => (
          <LargeStatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* OpCo Load Performance */}
      <OpCoLoadPerformance data={customerOpCoPerformance} />

      {/* Insights */}
      <div className="mt-8">
        <InsightsSection title="Key Insights & Recommendations" insights={insights} />
      </div>
    </SidebarLayout>
  );
}