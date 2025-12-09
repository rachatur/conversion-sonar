import { useState } from "react";
import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { LargeStatCard } from "@/components/dashboard/LargeStatCard";
import { InsightsSection } from "@/components/dashboard/InsightsSection";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { DataTable } from "@/components/dashboard/DataTable";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Package, CheckCircle, XCircle, FolderOpen } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const opCoList = ["AIRETECH", "ATS", "C&J", "DORSE", "EBS", "EP", "ETARIOS"];

// OpCo-specific data
const opCoData: Record<string, {
  stats: { label: string; value: number; subtitle: string; icon: typeof Package; variant: "primary" | "success" | "warning" | "accent"; highlightText?: string }[];
  conversionRateData: { week: string; rate: number }[];
  issueBreakdown: { type: string; count: number }[];
  sourceTargetComparison: { field: string; source: number; target: number; match: boolean }[];
  opCoBreakdown: { opCo: string; region: string; suppliers: number; converted: number; failed: number; rate: number }[];
  siteMapping: { site: string; suppliers: number; converted: number; failed: number; rate: number }[];
  exceptions: { id: string; opCo: string; name: string; issue: string; status: "error" | "warning" | "info" }[];
  reconSummaryData: { metric: string; suppliers: number | string; supplierAddress: number | string; supplierSites: number | string; supplierContacts: number | string }[];
  insights: { type: "info" | "success" | "warning"; highlight: string; text: string }[];
}> = {
  AIRETECH: {
    stats: [
      { label: "Total Source Records", value: 245, subtitle: "Supplier records received", icon: Package, variant: "primary" },
      { label: "Successfully Converted", value: 228, subtitle: "", icon: CheckCircle, variant: "success", highlightText: "93.1% conversion rate" },
      { label: "Fusion Error Records", value: 12, subtitle: "Errors in fusion load", icon: XCircle, variant: "warning" },
      { label: "Valid Source Records", value: 240, subtitle: "After deduplication", icon: FolderOpen, variant: "accent" },
    ],
    conversionRateData: [
      { week: "W1", rate: 88.5 },
      { week: "W2", rate: 90.2 },
      { week: "W3", rate: 91.8 },
      { week: "W4", rate: 92.4 },
      { week: "W5", rate: 93.1 },
    ],
    issueBreakdown: [
      { type: "Address Issues", count: 8 },
      { type: "Site Issues", count: 6 },
      { type: "Contact Issues", count: 10 },
      { type: "Supplier Issues", count: 12 },
    ],
    sourceTargetComparison: [
      { field: "Supplier Name", source: 245, target: 228, match: false },
      { field: "Supplier Address", source: 238, target: 232, match: false },
      { field: "Supplier Sites", source: 238, target: 232, match: false },
      { field: "Supplier Contacts", source: 156, target: 248, match: false },
      { field: "Bank Account", source: 220, target: 215, match: false },
      { field: "Payment Terms", source: 245, target: 228, match: false },
    ],
    opCoBreakdown: [
      { opCo: "AIRETECH-HQ", region: "Domestic", suppliers: 85, converted: 82, failed: 3, rate: 96.5 },
      { opCo: "AIRETECH-WEST", region: "Domestic", suppliers: 72, converted: 68, failed: 4, rate: 94.4 },
      { opCo: "AIRETECH-EAST", region: "Domestic", suppliers: 48, converted: 44, failed: 4, rate: 91.7 },
      { opCo: "AIRETECH-INTL", region: "International", suppliers: 40, converted: 34, failed: 6, rate: 85.0 },
    ],
    siteMapping: [
      { site: "Site A - Primary", suppliers: 78, converted: 74, failed: 4, rate: 94.9 },
      { site: "Site B - Warehouse", suppliers: 62, converted: 58, failed: 4, rate: 93.5 },
      { site: "Site C - Distribution", suppliers: 55, converted: 51, failed: 4, rate: 92.7 },
      { site: "Site D - Regional", suppliers: 50, converted: 45, failed: 5, rate: 90.0 },
    ],
    exceptions: [
      { id: "SUP-101", opCo: "AIRETECH-INTL", name: "Global Parts Inc", issue: "Invalid bank account", status: "error" },
      { id: "SUP-102", opCo: "AIRETECH-EAST", name: "Pacific Trading Co", issue: "Missing tax certificate", status: "warning" },
      { id: "SUP-103", opCo: "AIRETECH-WEST", name: "Euro Supplies Ltd", issue: "Duplicate entry", status: "warning" },
    ],
    reconSummaryData: [
      { metric: "Total Source File Records", suppliers: 1213, supplierAddress: 1180, supplierSites: "-", supplierContacts: 717 },
      { metric: "Records Excluded / Not Valid", suppliers: 16, supplierAddress: "-", supplierSites: "-", supplierContacts: "-" },
      { metric: "Valid Source Records", suppliers: 1197, supplierAddress: 1180, supplierSites: "-", supplierContacts: 717 },
      { metric: "Total FBDI Records for Upload", suppliers: 1188, supplierAddress: 1180, supplierSites: 1180, supplierContacts: 1188 },
      { metric: "Errored in FBDI Upload", suppliers: 87, supplierAddress: 30, supplierSites: 30, supplierContacts: 41 },
      { metric: "FBDI Records Loaded Successfully", suppliers: 1101, supplierAddress: 1150, supplierSites: 1150, supplierContacts: 1147 },
    ],
    insights: [
      { type: "info", highlight: "AIRETECH source data count is 240", text: "and the actual load count is 240. The difference of 5 records is due to duplicate suppliers." },
      { type: "success", highlight: "93.1% conversion rate", text: "achieved for AIRETECH suppliers with minimal errors." },
      { type: "warning", highlight: "12 FBDI upload errors", text: "require attention for complete data migration." },
    ],
  },
  ATS: {
    stats: [
      { label: "Total Source Records", value: 189, subtitle: "Supplier records received", icon: Package, variant: "primary" },
      { label: "Successfully Converted", value: 172, subtitle: "", icon: CheckCircle, variant: "success", highlightText: "91.0% conversion rate" },
      { label: "Fusion Error Records", value: 14, subtitle: "Errors in fusion load", icon: XCircle, variant: "warning" },
      { label: "Valid Source Records", value: 186, subtitle: "After deduplication", icon: FolderOpen, variant: "accent" },
    ],
    conversionRateData: [
      { week: "W1", rate: 84.2 },
      { week: "W2", rate: 86.5 },
      { week: "W3", rate: 88.1 },
      { week: "W4", rate: 89.8 },
      { week: "W5", rate: 91.0 },
    ],
    issueBreakdown: [
      { type: "Address Issues", count: 6 },
      { type: "Site Issues", count: 5 },
      { type: "Contact Issues", count: 8 },
      { type: "Supplier Issues", count: 14 },
    ],
    sourceTargetComparison: [
      { field: "Supplier Name", source: 189, target: 172, match: false },
      { field: "Supplier Address", source: 182, target: 176, match: false },
      { field: "Supplier Sites", source: 182, target: 176, match: false },
      { field: "Supplier Contacts", source: 112, target: 178, match: false },
      { field: "Bank Account", source: 170, target: 165, match: false },
      { field: "Payment Terms", source: 189, target: 172, match: false },
    ],
    opCoBreakdown: [
      { opCo: "ATS-MAIN", region: "Domestic", suppliers: 68, converted: 64, failed: 4, rate: 94.1 },
      { opCo: "ATS-SOUTH", region: "Domestic", suppliers: 55, converted: 50, failed: 5, rate: 90.9 },
      { opCo: "ATS-NORTH", region: "Domestic", suppliers: 42, converted: 38, failed: 4, rate: 90.5 },
      { opCo: "ATS-INTL", region: "International", suppliers: 24, converted: 20, failed: 4, rate: 83.3 },
    ],
    siteMapping: [
      { site: "Site A - Primary", suppliers: 58, converted: 54, failed: 4, rate: 93.1 },
      { site: "Site B - Warehouse", suppliers: 48, converted: 44, failed: 4, rate: 91.7 },
      { site: "Site C - Distribution", suppliers: 45, converted: 40, failed: 5, rate: 88.9 },
      { site: "Site D - Regional", suppliers: 38, converted: 34, failed: 4, rate: 89.5 },
    ],
    exceptions: [
      { id: "SUP-201", opCo: "ATS-INTL", name: "Tech Components Ltd", issue: "Invalid bank account", status: "error" },
      { id: "SUP-202", opCo: "ATS-SOUTH", name: "Southern Materials", issue: "Missing category", status: "warning" },
    ],
    reconSummaryData: [
      { metric: "Total Source File Records", suppliers: 583, supplierAddress: 565, supplierSites: "-", supplierContacts: 55 },
      { metric: "Records Excluded / Not Valid", suppliers: 7, supplierAddress: "-", supplierSites: "-", supplierContacts: "-" },
      { metric: "Valid Source Records", suppliers: 575, supplierAddress: 565, supplierSites: "-", supplierContacts: "-" },
      { metric: "Total FBDI Records for Upload", suppliers: 575, supplierAddress: 565, supplierSites: 565, supplierContacts: 575 },
      { metric: "Errored in FBDI Upload", suppliers: 10, supplierAddress: 32, supplierSites: 162, supplierContacts: 26 },
      { metric: "FBDI Records Loaded Successfully", suppliers: 565, supplierAddress: 533, supplierSites: 403, supplierContacts: 549 },
    ],
    insights: [
      { type: "info", highlight: "ATS source data count is 186", text: "with 3 duplicate records excluded from processing." },
      { type: "success", highlight: "91.0% conversion rate", text: "achieved for ATS suppliers." },
      { type: "warning", highlight: "14 FBDI upload errors", text: "identified in supplier records." },
    ],
  },
  "C&J": {
    stats: [
      { label: "Total Source Records", value: 156, subtitle: "Supplier records received", icon: Package, variant: "primary" },
      { label: "Successfully Converted", value: 140, subtitle: "", icon: CheckCircle, variant: "success", highlightText: "89.7% conversion rate" },
      { label: "Fusion Error Records", value: 13, subtitle: "Errors in fusion load", icon: XCircle, variant: "warning" },
      { label: "Valid Source Records", value: 153, subtitle: "After deduplication", icon: FolderOpen, variant: "accent" },
    ],
    conversionRateData: [
      { week: "W1", rate: 82.5 },
      { week: "W2", rate: 85.2 },
      { week: "W3", rate: 87.1 },
      { week: "W4", rate: 88.4 },
      { week: "W5", rate: 89.7 },
    ],
    issueBreakdown: [
      { type: "Address Issues", count: 4 },
      { type: "Site Issues", count: 5 },
      { type: "Contact Issues", count: 6 },
      { type: "Supplier Issues", count: 13 },
    ],
    sourceTargetComparison: [
      { field: "Supplier Name", source: 156, target: 140, match: false },
      { field: "Supplier Address", source: 150, target: 145, match: false },
      { field: "Supplier Sites", source: 150, target: 145, match: false },
      { field: "Supplier Contacts", source: 95, target: 148, match: false },
      { field: "Bank Account", source: 142, target: 138, match: false },
      { field: "Payment Terms", source: 156, target: 140, match: false },
    ],
    opCoBreakdown: [
      { opCo: "C&J-CENTRAL", region: "Domestic", suppliers: 58, converted: 54, failed: 4, rate: 93.1 },
      { opCo: "C&J-WEST", region: "Domestic", suppliers: 48, converted: 43, failed: 5, rate: 89.6 },
      { opCo: "C&J-EAST", region: "Domestic", suppliers: 50, converted: 43, failed: 7, rate: 86.0 },
    ],
    siteMapping: [
      { site: "Site A - Primary", suppliers: 52, converted: 48, failed: 4, rate: 92.3 },
      { site: "Site B - Warehouse", suppliers: 42, converted: 38, failed: 4, rate: 90.5 },
      { site: "Site C - Distribution", suppliers: 35, converted: 30, failed: 5, rate: 85.7 },
      { site: "Site D - Regional", suppliers: 27, converted: 24, failed: 3, rate: 88.9 },
    ],
    exceptions: [
      { id: "SUP-301", opCo: "C&J-EAST", name: "Eastern Supplies", issue: "Duplicate entry", status: "warning" },
      { id: "SUP-302", opCo: "C&J-WEST", name: "Western Parts Co", issue: "Missing tax certificate", status: "warning" },
    ],
    reconSummaryData: [
      { metric: "Total Source File Records", suppliers: 156, supplierAddress: 150, supplierSites: "-", supplierContacts: 95 },
      { metric: "Records Excluded / Not Valid", suppliers: 3, supplierAddress: "-", supplierSites: "-", supplierContacts: "-" },
      { metric: "Valid Source Records", suppliers: 153, supplierAddress: 150, supplierSites: "-", supplierContacts: 95 },
      { metric: "Total FBDI Records for Upload", suppliers: 153, supplierAddress: 150, supplierSites: 150, supplierContacts: 154 },
      { metric: "Errored in FBDI Upload", suppliers: 13, supplierAddress: 5, supplierSites: 5, supplierContacts: 6 },
      { metric: "FBDI Records Loaded Successfully", suppliers: 140, supplierAddress: 145, supplierSites: 145, supplierContacts: 148 },
    ],
    insights: [
      { type: "info", highlight: "C&J source data count is 153", text: "after excluding 3 duplicate records." },
      { type: "success", highlight: "89.7% conversion rate", text: "achieved for C&J suppliers." },
      { type: "warning", highlight: "13 FBDI upload errors", text: "need resolution." },
    ],
  },
  DORSE: {
    stats: [
      { label: "Total Source Records", value: 178, subtitle: "Supplier records received", icon: Package, variant: "primary" },
      { label: "Successfully Converted", value: 162, subtitle: "", icon: CheckCircle, variant: "success", highlightText: "91.0% conversion rate" },
      { label: "Fusion Error Records", value: 12, subtitle: "Errors in fusion load", icon: XCircle, variant: "warning" },
      { label: "Valid Source Records", value: 174, subtitle: "After deduplication", icon: FolderOpen, variant: "accent" },
    ],
    conversionRateData: [
      { week: "W1", rate: 85.5 },
      { week: "W2", rate: 87.8 },
      { week: "W3", rate: 89.2 },
      { week: "W4", rate: 90.1 },
      { week: "W5", rate: 91.0 },
    ],
    issueBreakdown: [
      { type: "Address Issues", count: 4 },
      { type: "Site Issues", count: 4 },
      { type: "Contact Issues", count: 6 },
      { type: "Supplier Issues", count: 12 },
    ],
    sourceTargetComparison: [
      { field: "Supplier Name", source: 178, target: 162, match: false },
      { field: "Supplier Address", source: 172, target: 166, match: false },
      { field: "Supplier Sites", source: 172, target: 166, match: false },
      { field: "Supplier Contacts", source: 105, target: 168, match: false },
      { field: "Bank Account", source: 160, target: 156, match: false },
      { field: "Payment Terms", source: 178, target: 162, match: false },
    ],
    opCoBreakdown: [
      { opCo: "DORSE-MAIN", region: "Domestic", suppliers: 65, converted: 61, failed: 4, rate: 93.8 },
      { opCo: "DORSE-SOUTH", region: "Domestic", suppliers: 55, converted: 50, failed: 5, rate: 90.9 },
      { opCo: "DORSE-NORTH", region: "Domestic", suppliers: 58, converted: 51, failed: 7, rate: 87.9 },
    ],
    siteMapping: [
      { site: "Site A - Primary", suppliers: 58, converted: 54, failed: 4, rate: 93.1 },
      { site: "Site B - Warehouse", suppliers: 48, converted: 44, failed: 4, rate: 91.7 },
      { site: "Site C - Distribution", suppliers: 42, converted: 38, failed: 4, rate: 90.5 },
      { site: "Site D - Regional", suppliers: 30, converted: 26, failed: 4, rate: 86.7 },
    ],
    exceptions: [
      { id: "SUP-401", opCo: "DORSE-NORTH", name: "Northern Materials", issue: "Invalid bank account", status: "error" },
      { id: "SUP-402", opCo: "DORSE-SOUTH", name: "Southern Logistics", issue: "Pending approval", status: "info" },
    ],
    reconSummaryData: [
      { metric: "Total Source File Records", suppliers: 1117, supplierAddress: 1055, supplierSites: "-", supplierContacts: 73 },
      { metric: "Records Excluded / Not Valid", suppliers: 8, supplierAddress: 7, supplierSites: "-", supplierContacts: "-" },
      { metric: "Valid Source Records", suppliers: 1109, supplierAddress: 1048, supplierSites: 1109, supplierContacts: "-" },
      { metric: "Total FBDI Records for Upload", suppliers: 1082, supplierAddress: 1048, supplierSites: 1048, supplierContacts: 1109 },
      { metric: "Errored in FBDI Upload", suppliers: 19, supplierAddress: 20, supplierSites: 20, supplierContacts: 120 },
      { metric: "FBDI Records Loaded Successfully", suppliers: 1063, supplierAddress: 1028, supplierSites: 1028, supplierContacts: 989 },
    ],
    insights: [
      { type: "info", highlight: "DORSE source data count is 174", text: "with 4 duplicate records excluded." },
      { type: "success", highlight: "91.0% conversion rate", text: "achieved for DORSE suppliers." },
      { type: "warning", highlight: "12 FBDI upload errors", text: "identified." },
    ],
  },
  EBS: {
    stats: [
      { label: "Total Source Records", value: 145, subtitle: "Supplier records received", icon: Package, variant: "primary" },
      { label: "Successfully Converted", value: 128, subtitle: "", icon: CheckCircle, variant: "success", highlightText: "88.3% conversion rate" },
      { label: "Fusion Error Records", value: 14, subtitle: "Errors in fusion load", icon: XCircle, variant: "warning" },
      { label: "Valid Source Records", value: 142, subtitle: "After deduplication", icon: FolderOpen, variant: "accent" },
    ],
    conversionRateData: [
      { week: "W1", rate: 80.5 },
      { week: "W2", rate: 83.2 },
      { week: "W3", rate: 85.8 },
      { week: "W4", rate: 87.1 },
      { week: "W5", rate: 88.3 },
    ],
    issueBreakdown: [
      { type: "Address Issues", count: 5 },
      { type: "Site Issues", count: 5 },
      { type: "Contact Issues", count: 6 },
      { type: "Supplier Issues", count: 14 },
    ],
    sourceTargetComparison: [
      { field: "Supplier Name", source: 145, target: 128, match: false },
      { field: "Supplier Address", source: 140, target: 132, match: false },
      { field: "Supplier Sites", source: 140, target: 132, match: false },
      { field: "Supplier Contacts", source: 88, target: 135, match: false },
      { field: "Bank Account", source: 130, target: 125, match: false },
      { field: "Payment Terms", source: 145, target: 128, match: false },
    ],
    opCoBreakdown: [
      { opCo: "EBS-CENTRAL", region: "Domestic", suppliers: 55, converted: 50, failed: 5, rate: 90.9 },
      { opCo: "EBS-WEST", region: "Domestic", suppliers: 48, converted: 42, failed: 6, rate: 87.5 },
      { opCo: "EBS-EAST", region: "Domestic", suppliers: 42, converted: 36, failed: 6, rate: 85.7 },
    ],
    siteMapping: [
      { site: "Site A - Primary", suppliers: 48, converted: 44, failed: 4, rate: 91.7 },
      { site: "Site B - Warehouse", suppliers: 40, converted: 35, failed: 5, rate: 87.5 },
      { site: "Site C - Distribution", suppliers: 32, converted: 28, failed: 4, rate: 87.5 },
      { site: "Site D - Regional", suppliers: 25, converted: 21, failed: 4, rate: 84.0 },
    ],
    exceptions: [
      { id: "SUP-501", opCo: "EBS-EAST", name: "Eastern Components", issue: "Missing category", status: "warning" },
      { id: "SUP-502", opCo: "EBS-WEST", name: "Western Trading", issue: "Invalid bank account", status: "error" },
    ],
    reconSummaryData: [
      { metric: "Total Source File Records", suppliers: 595, supplierAddress: 219, supplierSites: "-", supplierContacts: 571 },
      { metric: "Records Excluded / Not Valid", suppliers: 19, supplierAddress: 357, supplierSites: "-", supplierContacts: "-" },
      { metric: "Valid Source Records", suppliers: 576, supplierAddress: 219, supplierSites: "-", supplierContacts: 571 },
      { metric: "Total FBDI Records for Upload", suppliers: 576, supplierAddress: 219, supplierSites: 219, supplierContacts: 571 },
      { metric: "Errored in FBDI Upload", suppliers: 9, supplierAddress: 11, supplierSites: 11, supplierContacts: 19 },
      { metric: "FBDI Records Loaded Successfully", suppliers: 567, supplierAddress: 208, supplierSites: 208, supplierContacts: 552 },
    ],
    insights: [
      { type: "info", highlight: "EBS source data count is 142", text: "after excluding duplicates." },
      { type: "success", highlight: "88.3% conversion rate", text: "achieved for EBS suppliers." },
      { type: "warning", highlight: "14 FBDI upload errors", text: "require attention." },
    ],
  },
  EP: {
    stats: [
      { label: "Total Source Records", value: 165, subtitle: "Supplier records received", icon: Package, variant: "primary" },
      { label: "Successfully Converted", value: 150, subtitle: "", icon: CheckCircle, variant: "success", highlightText: "90.9% conversion rate" },
      { label: "Fusion Error Records", value: 11, subtitle: "Errors in fusion load", icon: XCircle, variant: "warning" },
      { label: "Valid Source Records", value: 161, subtitle: "After deduplication", icon: FolderOpen, variant: "accent" },
    ],
    conversionRateData: [
      { week: "W1", rate: 84.8 },
      { week: "W2", rate: 87.2 },
      { week: "W3", rate: 88.9 },
      { week: "W4", rate: 90.1 },
      { week: "W5", rate: 90.9 },
    ],
    issueBreakdown: [
      { type: "Address Issues", count: 4 },
      { type: "Site Issues", count: 3 },
      { type: "Contact Issues", count: 5 },
      { type: "Supplier Issues", count: 11 },
    ],
    sourceTargetComparison: [
      { field: "Supplier Name", source: 165, target: 150, match: false },
      { field: "Supplier Address", source: 158, target: 153, match: false },
      { field: "Supplier Sites", source: 158, target: 153, match: false },
      { field: "Supplier Contacts", source: 98, target: 156, match: false },
      { field: "Bank Account", source: 148, target: 144, match: false },
      { field: "Payment Terms", source: 165, target: 150, match: false },
    ],
    opCoBreakdown: [
      { opCo: "EP-MAIN", region: "Domestic", suppliers: 62, converted: 58, failed: 4, rate: 93.5 },
      { opCo: "EP-SOUTH", region: "Domestic", suppliers: 52, converted: 48, failed: 4, rate: 92.3 },
      { opCo: "EP-NORTH", region: "Domestic", suppliers: 51, converted: 44, failed: 7, rate: 86.3 },
    ],
    siteMapping: [
      { site: "Site A - Primary", suppliers: 55, converted: 52, failed: 3, rate: 94.5 },
      { site: "Site B - Warehouse", suppliers: 45, converted: 41, failed: 4, rate: 91.1 },
      { site: "Site C - Distribution", suppliers: 38, converted: 34, failed: 4, rate: 89.5 },
      { site: "Site D - Regional", suppliers: 27, converted: 23, failed: 4, rate: 85.2 },
    ],
    exceptions: [
      { id: "SUP-601", opCo: "EP-NORTH", name: "Northern Supplies", issue: "Duplicate entry", status: "warning" },
      { id: "SUP-602", opCo: "EP-MAIN", name: "Main Distribution", issue: "Pending approval", status: "info" },
    ],
    reconSummaryData: [
      { metric: "Total Source File Records", suppliers: 37, supplierAddress: 30, supplierSites: "-", supplierContacts: 965 },
      { metric: "Records Excluded / Not Valid", suppliers: 7, supplierAddress: 6, supplierSites: "-", supplierContacts: "-" },
      { metric: "Valid Source Records", suppliers: 30, supplierAddress: 30, supplierSites: "-", supplierContacts: 965 },
      { metric: "Total FBDI Records for Upload", suppliers: 30, supplierAddress: 30, supplierSites: 30, supplierContacts: 965 },
      { metric: "Errored in FBDI Upload", suppliers: 0, supplierAddress: 0, supplierSites: 0, supplierContacts: 721 },
      { metric: "FBDI Records Loaded Successfully", suppliers: 30, supplierAddress: 30, supplierSites: 30, supplierContacts: 244 },
    ],
    insights: [
      { type: "info", highlight: "EP source data count is 161", text: "after excluding 4 duplicate records." },
      { type: "success", highlight: "90.9% conversion rate", text: "achieved for EP suppliers." },
      { type: "warning", highlight: "11 FBDI upload errors", text: "identified." },
    ],
  },
  ETARIOS: {
    stats: [
      { label: "Total Source Records", value: 135, subtitle: "Supplier records received", icon: Package, variant: "primary" },
      { label: "Successfully Converted", value: 121, subtitle: "", icon: CheckCircle, variant: "success", highlightText: "89.6% conversion rate" },
      { label: "Fusion Error Records", value: 11, subtitle: "Errors in fusion load", icon: XCircle, variant: "warning" },
      { label: "Valid Source Records", value: 132, subtitle: "After deduplication", icon: FolderOpen, variant: "accent" },
    ],
    conversionRateData: [
      { week: "W1", rate: 82.5 },
      { week: "W2", rate: 85.1 },
      { week: "W3", rate: 87.2 },
      { week: "W4", rate: 88.5 },
      { week: "W5", rate: 89.6 },
    ],
    issueBreakdown: [
      { type: "Address Issues", count: 4 },
      { type: "Site Issues", count: 4 },
      { type: "Contact Issues", count: 5 },
      { type: "Supplier Issues", count: 11 },
    ],
    sourceTargetComparison: [
      { field: "Supplier Name", source: 135, target: 121, match: false },
      { field: "Supplier Address", source: 130, target: 125, match: false },
      { field: "Supplier Sites", source: 130, target: 125, match: false },
      { field: "Supplier Contacts", source: 82, target: 128, match: false },
      { field: "Bank Account", source: 120, target: 116, match: false },
      { field: "Payment Terms", source: 135, target: 121, match: false },
    ],
    opCoBreakdown: [
      { opCo: "ETARIOS-MAIN", region: "Domestic", suppliers: 52, converted: 48, failed: 4, rate: 92.3 },
      { opCo: "ETARIOS-SOUTH", region: "Domestic", suppliers: 45, converted: 40, failed: 5, rate: 88.9 },
      { opCo: "ETARIOS-INTL", region: "International", suppliers: 38, converted: 33, failed: 5, rate: 86.8 },
    ],
    siteMapping: [
      { site: "Site A - Primary", suppliers: 45, converted: 42, failed: 3, rate: 93.3 },
      { site: "Site B - Warehouse", suppliers: 38, converted: 34, failed: 4, rate: 89.5 },
      { site: "Site C - Distribution", suppliers: 30, converted: 26, failed: 4, rate: 86.7 },
      { site: "Site D - Regional", suppliers: 22, converted: 19, failed: 3, rate: 86.4 },
    ],
    exceptions: [
      { id: "SUP-701", opCo: "ETARIOS-INTL", name: "Global Materials", issue: "Invalid bank account", status: "error" },
      { id: "SUP-702", opCo: "ETARIOS-SOUTH", name: "Southern Parts", issue: "Missing category", status: "warning" },
    ],
    reconSummaryData: [
      { metric: "Total Source File Records", suppliers: 1046, supplierAddress: 992, supplierSites: "-", supplierContacts: 73 },
      { metric: "Records Excluded / Not Valid", suppliers: 65, supplierAddress: 63, supplierSites: "-", supplierContacts: "-" },
      { metric: "Valid Source Records", suppliers: 981, supplierAddress: 927, supplierSites: "-", supplierContacts: 981 },
      { metric: "Total FBDI Records for Upload", suppliers: 981, supplierAddress: 927, supplierSites: 927, supplierContacts: 981 },
      { metric: "Errored in FBDI Upload", suppliers: 0, supplierAddress: 14, supplierSites: 14, supplierContacts: 62 },
      { metric: "FBDI Records Loaded Successfully", suppliers: 981, supplierAddress: 913, supplierSites: 913, supplierContacts: 919 },
    ],
    insights: [
      { type: "info", highlight: "ETARIOS source data count is 132", text: "after excluding 3 duplicate records." },
      { type: "success", highlight: "89.6% conversion rate", text: "achieved for ETARIOS suppliers." },
      { type: "warning", highlight: "11 FBDI upload errors", text: "identified." },
    ],
  },
};

export default function SupplierDashboard() {
  const [selectedOpCo, setSelectedOpCo] = useState("AIRETECH");
  const currentData = opCoData[selectedOpCo];

  return (
    <SidebarLayout pageTitle="Air Control Concepts Data Reconciliation (UAT)" pageSubtitle="Supplier Conversion Dashboard">
      {/* OpCo Tabs */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {opCoList.map((opCo) => (
            <button
              key={opCo}
              onClick={() => setSelectedOpCo(opCo)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedOpCo === opCo
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {opCo}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {currentData.stats.map((stat) => (
          <LargeStatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Supplier Recon Summary Table */}
      <div className="mb-8">
        <div className="stat-card overflow-hidden">
          <div className="bg-primary px-4 py-3">
            <h3 className="text-sm font-semibold text-primary-foreground">Supplier Recon Summary - {selectedOpCo}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground"></th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">Suppliers</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">Supplier Address</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">Supplier Sites</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">Supplier Contacts</th>
                </tr>
              </thead>
              <tbody>
                {currentData.reconSummaryData.map((row, index) => (
                  <tr key={index} className={`border-b border-border ${index === currentData.reconSummaryData.length - 1 ? 'bg-success/10' : ''}`}>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{row.metric}</td>
                    <td className={`px-4 py-3 text-sm text-center ${row.metric === 'Errored in FBDI Upload' ? 'text-destructive font-medium' : row.metric === 'FBDI Records Loaded Successfully' ? 'text-success font-medium' : 'text-primary font-medium'}`}>
                      {row.suppliers}
                    </td>
                    <td className={`px-4 py-3 text-sm text-center ${row.metric === 'Errored in FBDI Upload' ? 'text-destructive font-medium' : row.metric === 'FBDI Records Loaded Successfully' ? 'text-success font-medium' : 'text-primary font-medium'}`}>
                      {row.supplierAddress}
                    </td>
                    <td className={`px-4 py-3 text-sm text-center ${row.metric === 'Errored in FBDI Upload' ? 'text-destructive font-medium' : row.metric === 'FBDI Records Loaded Successfully' ? 'text-success font-medium' : 'text-primary font-medium'}`}>
                      {row.supplierSites}
                    </td>
                    <td className={`px-4 py-3 text-sm text-center ${row.metric === 'Errored in FBDI Upload' ? 'text-destructive font-medium' : row.metric === 'FBDI Records Loaded Successfully' ? 'text-success font-medium' : 'text-primary font-medium'}`}>
                      {row.supplierContacts}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="mb-8">
        <InsightsSection title="Key Insights & Recommendations" insights={currentData.insights} />
      </div>

    </SidebarLayout>
  );
}
