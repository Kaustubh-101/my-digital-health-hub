import { Link, Outlet, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FileText,
  Users,
  Package,
  ShoppingCart,
  AlertTriangle,
  Pill,
  Bell,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/prescriptions", label: "E-Prescriptions", icon: FileText },
  { to: "/patients", label: "Patient Records", icon: Users },
  { to: "/inventory", label: "Inventory", icon: Package },
  { to: "/orders", label: "Orders", icon: ShoppingCart },
  { to: "/alerts", label: "Alerts", icon: AlertTriangle },
];

export function AppLayout() {
  const loc = useLocation();
  return (
    <div className="min-h-screen flex w-full bg-background">
      <aside className="w-64 border-r bg-card flex flex-col sticky top-0 h-screen">
        <div className="h-16 flex items-center gap-2 px-6 border-b">
          <div className="h-9 w-9 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
            <Pill className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <div className="font-bold tracking-tight">MediCare</div>
            <div className="text-xs text-muted-foreground -mt-0.5">Digital Pharmacy</div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map((item) => {
            const active = loc.pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-card)]"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t">
          <div className="rounded-xl p-4 text-sm" style={{ background: "var(--gradient-subtle)" }}>
            <div className="font-semibold text-foreground">Need help?</div>
            <div className="text-muted-foreground text-xs mt-1">Contact our 24/7 support team.</div>
            <Button size="sm" className="mt-3 w-full" variant="secondary">Contact</Button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b bg-card/80 backdrop-blur sticky top-0 z-10 flex items-center gap-4 px-8">
          <div className="relative flex-1 max-w-md">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search medicines, patients, prescriptions…" className="pl-9 bg-muted/50 border-0" />
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-semibold">Dr. Sarah Chen</div>
              <div className="text-xs text-muted-foreground">Head Pharmacist</div>
            </div>
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground">SC</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
