import { Link, useLocation } from "react-router-dom";
import { Database, Home, Users, UserCheck, Package, Boxes, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  pageSubtitle: string;
}

const overviewItems = [
  { path: "/", label: "Dashboard", icon: Home },
];

const moduleItems = [
  { path: "/customer", label: "Customer", icon: Users, count: 45892, countLabel: "OpCo: 12" },
  { path: "/employee", label: "Employee", icon: UserCheck, count: 3247, countLabel: "OpCo: 8" },
  { path: "/supplier", label: "Supplier", icon: Package, count: 1856, countLabel: "OpCo: 10" },
  { path: "/items", label: "Items", icon: Boxes, count: 128459, countLabel: "Branches: 15" },
];

export function SidebarLayout({ children, pageTitle, pageSubtitle }: SidebarLayoutProps) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}K`;
    }
    return count.toString();
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={cn(
        "flex flex-col border-r border-sidebar-border bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}>
        {/* Sidebar Header - White with blue icon */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
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
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute right-0 top-20 translate-x-1/2 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card shadow-sm hover:bg-muted z-10"
        >
          {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>

        {/* Scrollable Navigation */}
        <ScrollArea className="flex-1 sidebar-scroll" type="always">
          <nav className="p-3 space-y-6">
            {/* Overview Section */}
            <div>
              {!collapsed && (
                <p className="px-4 text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">
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
                        "sidebar-nav-item",
                        isActive ? "bg-primary text-primary-foreground" : "sidebar-nav-item-inactive"
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
                <p className="px-4 text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">
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
                        "sidebar-nav-item justify-between",
                        isActive ? "bg-primary text-primary-foreground" : "sidebar-nav-item-inactive"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && <span>{item.label}</span>}
                      </div>
                      {!collapsed && (
                        <div className="flex flex-col items-end">
                          <span className={cn(
                            "badge-count",
                            isActive && "bg-primary-foreground/20 text-primary-foreground"
                          )}>{formatCount(item.count)}</span>
                          <span className={cn(
                            "text-[10px]",
                            isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                          )}>{item.countLabel}</span>
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>
        </ScrollArea>

        {/* Footer */}
        {!collapsed && (
          <div className="p-4 border-t border-sidebar-border">
            <p className="text-xs text-muted-foreground">Air Control Concepts • UAT</p>
            <p className="text-xs text-muted-foreground">Last Updated: {currentDate}</p>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="px-8 py-4 text-sm text-muted-foreground">
          Published: {currentDate}
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
