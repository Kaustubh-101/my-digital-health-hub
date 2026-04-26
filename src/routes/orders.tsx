import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Truck } from "lucide-react";

export const Route = createFileRoute("/orders")({
  component: Orders,
});

const orders = [
  { id: "ORD-5021", customer: "Emily Johnson", items: 3, total: 24.50, status: "Delivered", date: "2026-04-26" },
  { id: "ORD-5020", customer: "Michael Brown", items: 2, total: 18.20, status: "Out for Delivery", date: "2026-04-26" },
  { id: "ORD-5019", customer: "Walk-in", items: 1, total: 4.50, status: "Completed", date: "2026-04-26" },
  { id: "ORD-5018", customer: "Sophia Davis", items: 4, total: 62.00, status: "Processing", date: "2026-04-25" },
  { id: "ORD-5017", customer: "James Wilson", items: 5, total: 89.75, status: "Delivered", date: "2026-04-25" },
];

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  Delivered: "secondary",
  Completed: "secondary",
  "Out for Delivery": "default",
  Processing: "outline",
};

function Orders() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground mt-1">Walk-in sales and home-delivery orders.</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" />New Order</Button>
      </div>

      <Card className="border-0 shadow-[var(--shadow-card)]">
        <CardHeader><CardTitle className="flex items-center gap-2"><Truck className="h-5 w-5 text-primary" />Recent Orders</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead><TableHead>Customer</TableHead>
                <TableHead>Items</TableHead><TableHead>Total</TableHead>
                <TableHead>Date</TableHead><TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-mono text-xs">{o.id}</TableCell>
                  <TableCell className="font-medium">{o.customer}</TableCell>
                  <TableCell>{o.items}</TableCell>
                  <TableCell>${o.total.toFixed(2)}</TableCell>
                  <TableCell>{o.date}</TableCell>
                  <TableCell><Badge variant={statusVariant[o.status] ?? "secondary"}>{o.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
