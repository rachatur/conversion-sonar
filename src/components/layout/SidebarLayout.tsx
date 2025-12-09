import { Link, useLocation } from "react-router-dom";
import { Database, Home, FileText, ShoppingCart, Package, DollarSign, Folder, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SidebarLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  pageSubtitle: string;
}

const overviewItems = [
  { path: "/", label: "Dashboard", icon: Home },
];

const moduleItems = [
  { path: "/customer", label: "Sales Order", icon: FileText, count: 6 },
  { path: "/supplier", label: "Purchase Order", icon: ShoppingCart, count: 4 },
  { path: "/items", label: "On-Hand Inventory", icon: Package, count: 5 },
  { path: "/employee", label: "Opportunity", icon: DollarSign, count: 4 },
  { path: "/project", label: "Project", icon: Folder, count: 1 },
];

export function SidebarLayout({ children, pageTitle, pageSubtitle }: SidebarLayoutProps) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={cn(
        "flex flex-col border-r border-sidebar-border bg-card transition-all duration-300 relative",
        collapsed ? "w-16" : "w-64"
      )}>
        {/* Sidebar Header */}
        <div className="p-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Database className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="text-sm font-bold text-foreground">Air Control Concepts</h1>
              <p className="text-xs text-muted-foreground">Data Reconciliation</p>
            </div>
          )}
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute right-0 top-5 translate-x-1/2 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card shadow-sm hover:bg-muted z-10"
        >
          <ChevronLeft className={cn("h-3 w-3 transition-transform", collapsed && "rotate-180")} />
        </button>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
          {/* Overview Section */}
          <div>
            {!collapsed && (
              <p className="px-3 text-[11px] font-semibold uppercase text-muted-foreground tracking-wider mb-2">
                Overview
              </p>
            )}
            <div className="space-y-1">
              {overviewItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors relative",
                      isActive 
                        ? "bg-sidebar-accent text-primary before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary before:rounded-r-sm" 
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Modules Section */}
          <div>
            {!collapsed && (
              <p className="px-3 text-[11px] font-semibold uppercase text-muted-foreground tracking-wider mb-2">
                Modules
              </p>
            )}
            <div className="space-y-1">
              {moduleItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md transition-colors relative",
                      isActive 
                        ? "bg-sidebar-accent text-primary before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary before:rounded-r-sm" 
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span>{item.label}</span>}
                    </div>
                    {!collapsed && (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                        {item.count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* OpCos Section */}
          {!collapsed && (
            <div>
              <p className="px-3 text-[11px] font-semibold uppercase text-muted-foreground tracking-wider mb-2">
                OpCos
              </p>
              <p className="px-3 text-xs text-muted-foreground leading-relaxed">
                AirTech • ATS • C&J • Dorse • EBS • EP • Fisher
              </p>
            </div>
          )}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="p-4 border-t border-sidebar-border">
            <p className="text-xs text-muted-foreground">ACC • UAT Environment</p>
            <p className="text-xs text-muted-foreground">Last Updated: Dec 04, 2025</p>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="px-8 py-4 text-sm text-muted-foreground">
          Published: December 04, 2025
        </div>

        {/* Page Header */}
        <div className="px-8 pb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <Database className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{pageTitle}</h1>
              <p className="text-sm text-muted-foreground">{pageSubtitle}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pb-8">
          <div className="animate-fade-in">{children}</div>
        </div>
      </main>
    </div>
  );
}