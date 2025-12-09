import { Link, useLocation } from "react-router-dom";
import { Database, Home, ClipboardCheck, ShoppingCart, Boxes, DollarSign, FolderKanban, ChevronLeft, ChevronRight } from "lucide-react";
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
  { path: "/customer", label: "Sales Order", icon: ClipboardCheck, count: 6 },
  { path: "/supplier", label: "Purchase Order", icon: ShoppingCart, count: 4 },
  { path: "/employee", label: "On-Hand Inventory", icon: Boxes, count: 5 },
  { path: "/items", label: "Opportunity", icon: DollarSign, count: 4 },
  { path: "/project", label: "Project", icon: FolderKanban, count: 1 },
];

const opcosList = ["AirTech", "ATS", "C&J", "Dorse", "EBS", "EP", "Etairos"];

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
        "relative flex flex-col bg-card transition-all duration-300 shadow-sm",
        collapsed ? "w-16" : "w-72"
      )}>
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(200,85%,55%)] to-[hsl(200,85%,65%)] shadow-md">
              <Database className="h-5 w-5 text-white" />
            </div>
            {!collapsed && (
              <div className="animate-fade-in">
                <h1 className="text-sm font-bold text-foreground">Air Control Concepts</h1>
                <p className="text-xs text-primary">Data Reconciliation</p>
              </div>
            )}
          </div>
          {!collapsed && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-muted transition-colors"
            >
              <ChevronLeft className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Collapse Button when collapsed */}
        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-md hover:bg-muted transition-colors"
          >
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        )}

        {/* Scrollable Navigation */}
        <ScrollArea className="flex-1 px-3">
          <nav className="space-y-6 py-2">
            {/* Overview Section */}
            <div>
              {!collapsed && (
                <p className="px-3 text-[11px] font-semibold uppercase text-muted-foreground tracking-wider mb-3">
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
                        "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all",
                        isActive 
                          ? "text-primary bg-primary/10" 
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        collapsed && "justify-center px-2"
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
                <p className="px-3 text-[11px] font-semibold uppercase text-muted-foreground tracking-wider mb-3">
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
                        "flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all",
                        isActive 
                          ? "text-primary bg-primary/10" 
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        collapsed && "justify-center px-2"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && <span>{item.label}</span>}
                      </div>
                      {!collapsed && (
                        <span className="flex items-center justify-center min-w-[28px] h-7 px-2.5 text-xs font-medium rounded-full bg-muted text-muted-foreground">
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
                <p className="px-3 text-[11px] font-semibold uppercase text-muted-foreground tracking-wider mb-3">
                  OpCos
                </p>
                <div className="px-3 py-2">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {opcosList.join(" • ")}
                    <span className="ml-1 text-muted-foreground/70">▼</span>
                  </p>
                </div>
              </div>
            )}
          </nav>
        </ScrollArea>

        {/* Footer */}
        {!collapsed && (
          <div className="p-4 border-t border-border">
            <p className="text-xs text-primary font-medium">ACC • UAT Environment</p>
            <p className="text-xs text-muted-foreground">Last Updated: Dec 04, 2025</p>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-background">
        {/* Top Bar */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="px-8 py-3 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Published: {currentDate}
            </span>
          </div>
        </div>

        {/* Page Header */}
        <div className="px-8 py-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{pageTitle}</h1>
            <p className="text-sm text-primary font-medium">{pageSubtitle}</p>
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
