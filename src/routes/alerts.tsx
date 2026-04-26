import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Calendar, Package, Pill } from "lucide-react";

export const Route = createFileRoute("/alerts")({
  component: Alerts,
});

const alerts = [
  { type: "Low Stock", msg: "Atorvastatin 20mg has only 8 units left (threshold 40).", time: "5 min ago", icon: Package, tone: "destructive" },
  { type: "Expiring Soon", msg: "Clopidogrel 75mg (Batch B-2407) expires in 22 days.", time: "1 h ago", icon: Calendar, tone: "warning" },
  { type: "Drug Interaction", msg: "Patient James Wilson — possible interaction between Clopidogrel and Aspirin.", time: "2 h ago", icon: Pill, tone: "destructive" },
  { type: "Low Stock", msg: "Amoxicillin 500mg has only 12 units left (threshold 50).", time: "3 h ago", icon: Package, tone: "destructive" },
  { type: "Expiring Soon", msg: "Atorvastatin 20mg (Batch B-2403) expires in 45 days.", time: "Yesterday", icon: Calendar, tone: "warning" },
];

function Alerts() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Alerts & Notifications</h1>
        <p className="text-muted-foreground mt-1">System alerts that need your attention.</p>
      </div>

      <Card className="border-0 shadow-[var(--shadow-card)]">
        <CardHeader><CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-warning" />Active Alerts</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {alerts.map((a, i) => {
            const Icon = a.icon;
            const isDestructive = a.tone === "destructive";
            return (
              <div key={i} className={`flex items-start gap-4 p-4 rounded-lg border ${isDestructive ? "bg-destructive/5 border-destructive/20" : "bg-warning/5 border-warning/20"}`}>
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${isDestructive ? "bg-destructive/10" : "bg-warning/20"}`}>
                  <Icon className={`h-5 w-5 ${isDestructive ? "text-destructive" : "text-warning"}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={isDestructive ? "destructive" : "outline"}>{a.type}</Badge>
                    <span className="text-xs text-muted-foreground">{a.time}</span>
                  </div>
                  <p className="mt-1.5 text-sm">{a.msg}</p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
