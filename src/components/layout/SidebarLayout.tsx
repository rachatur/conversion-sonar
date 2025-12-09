import { Link, useLocation } from "react-router-dom";
import { Database, Home, Users, UserCheck, Package, Boxes, ChevronLeft, ChevronRight, FileText, ShoppingCart, ClipboardList, DollarSign, FolderKanban } from "lucide-react";
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
  { path: "/customer", label: "Customer", icon: Users, count: 6 },
  { path: "/supplier", label: "Supplier", icon: Package, count: 4 },
  { path: "/employee", label: "Employee", icon: UserCheck, count: 5 },
  { path: "/items", label: "Items", icon: Boxes, count: 4 },
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
        "relative flex flex-col bg-card border-r border-border transition-all duration-300",
        collapsed ? "w-16" : "w-72"
      )}>
        {/* Sidebar Header - Blue gradient */}
        <div className="bg-gradient-to-r from-[hsl(207,90%,45%)] to-[hsl(207,90%,55%)] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
              <Database className="h-5 w-5 text-white" />
            </div>
            {!collapsed && (
              <div className="animate-fade-in">
                <h1 className="text-sm font-bold text-white">Reconciliation Dashboard</h1>
                <p className="text-xs text-white/80">Air Control Concepts UAT Environment</p>
              </div>
            )}
          </div>
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-[72px] flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card shadow-md hover:bg-muted transition-colors z-20"
        >
          {collapsed ? <ChevronRight className="h-3 w-3 text-muted-foreground" /> : <ChevronLeft className="h-3 w-3 text-muted-foreground" />}
        </button>

        {/* Scrollable Navigation */}
        <ScrollArea className="flex-1">
          <nav className="p-3 space-y-6">
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
                        "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all relative",
                        isActive 
                          ? "text-primary bg-primary/5" 
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        collapsed && "justify-center"
                      )}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
                      )}
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
                        "flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all relative",
                        isActive 
                          ? "text-primary bg-primary/5" 
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        collapsed && "justify-center"
                      )}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
                      )}
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && <span>{item.label}</span>}
                      </div>
                      {!collapsed && (
                        <span className="flex items-center justify-center min-w-[24px] h-6 px-2 text-xs font-medium rounded-full bg-muted text-muted-foreground">
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
          <div className="p-4 border-t border-border bg-muted/30">
            <p className="text-xs text-muted-foreground font-medium">ACC • UAT Environment</p>
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
