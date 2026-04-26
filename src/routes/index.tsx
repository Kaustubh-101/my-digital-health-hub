import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity, Users, Package, FileText, TrendingUp, AlertTriangle, Clock, DollarSign,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

const stats = [
  { label: "Today's Prescriptions", value: "128", change: "+12%", icon: FileText, tone: "primary" },
  { label: "Active Patients", value: "2,847", change: "+5.2%", icon: Users, tone: "success" },
  { label: "Inventory Items", value: "1,432", change: "-2.1%", icon: Package, tone: "warning" },
  { label: "Revenue (Today)", value: "$8,420", change: "+18%", icon: DollarSign, tone: "primary" },
];

const recentRx = [
  { id: "RX-2841", patient: "Emily Johnson", doctor: "Dr. R. Patel", time: "10 min ago", status: "Pending" },
  { id: "RX-2840", patient: "Michael Brown", doctor: "Dr. K. Singh", time: "32 min ago", status: "Filled" },
  { id: "RX-2839", patient: "Sophia Davis", doctor: "Dr. L. Wong", time: "1 h ago", status: "Filled" },
  { id: "RX-2838", patient: "James Wilson", doctor: "Dr. R. Patel", time: "2 h ago", status: "Ready" },
];

const lowStock = [
  { name: "Amoxicillin 500mg", qty: 12, threshold: 50 },
  { name: "Metformin 850mg", qty: 24, threshold: 100 },
  { name: "Atorvastatin 20mg", qty: 8, threshold: 40 },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back — here's what's happening today.</p>
        </div>
        <Button asChild><Link to="/prescriptions">New Prescription</Link></Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="border-0 shadow-[var(--shadow-card)]">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                    <p className="text-3xl font-bold mt-2">{s.value}</p>
                    <div className="flex items-center gap-1 mt-2 text-xs">
                      <TrendingUp className="h-3 w-3 text-success" />
                      <span className="text-success font-medium">{s.change}</span>
                      <span className="text-muted-foreground">vs yesterday</span>
                    </div>
                  </div>
                  <div className="h-11 w-11 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-0 shadow-[var(--shadow-card)]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5 text-primary" />Recent Prescriptions</CardTitle>
            <Button variant="ghost" size="sm" asChild><Link to="/prescriptions">View all</Link></Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentRx.map((r) => (
              <div key={r.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
                    <FileText className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <div>
                    <div className="font-medium">{r.patient}</div>
                    <div className="text-xs text-muted-foreground">{r.id} · {r.doctor}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{r.time}</span>
                  <Badge variant={r.status === "Pending" ? "destructive" : r.status === "Ready" ? "default" : "secondary"}>{r.status}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-warning" />Low Stock Alert</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {lowStock.map((m) => (
              <div key={m.name} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{m.name}</span>
                  <span className="text-destructive font-semibold">{m.qty}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-destructive rounded-full" style={{ width: `${(m.qty / m.threshold) * 100}%` }} />
                </div>
                <div className="text-xs text-muted-foreground">Reorder threshold: {m.threshold}</div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full mt-2" asChild>
              <Link to="/inventory">Manage inventory</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
