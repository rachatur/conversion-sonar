import { Link, useLocation } from "react-router-dom";
import { Users, UserCheck, Package, Boxes, Home, Calendar } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/customer", label: "Customer Conversion", icon: Users },
  { path: "/employee", label: "Employee Conversion", icon: UserCheck },
  { path: "/supplier", label: "Supplier Conversion", icon: Package },
  { path: "/items", label: "Items Conversion", icon: Boxes },
];

export function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  const location = useLocation();
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-header text-header-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div>
              <h1 className="text-xl font-bold">RECON Project Data Conversion (UAT)</h1>
              <p className="text-sm text-header-foreground/70">{subtitle || title}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-header-foreground/70">
              <Calendar className="h-4 w-4" />
              <span>Published: {currentDate}</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-1 pb-2 overflow-x-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link flex items-center gap-2 whitespace-nowrap ${
                    isActive ? "nav-link-active" : "nav-link-inactive text-header-foreground/70 hover:text-header-foreground hover:bg-header-foreground/10"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="animate-fade-in">{children}</div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          RECON Project © {new Date().getFullYear()} | Data Conversion Analytics Dashboard
        </div>
      </footer>
    </div>
  );
}
