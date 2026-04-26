import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Package, AlertTriangle, Calendar } from "lucide-react";

export const Route = createFileRoute("/inventory")({
  component: Inventory,
});

const items = [
  { sku: "MED-1001", name: "Amoxicillin 500mg", category: "Antibiotic", stock: 12, threshold: 50, expiry: "2026-08-15", batch: "B-2401", price: 0.45 },
  { sku: "MED-1002", name: "Metformin 850mg", category: "Diabetes", stock: 24, threshold: 100, expiry: "2027-02-20", batch: "B-2402", price: 0.30 },
  { sku: "MED-1003", name: "Atorvastatin 20mg", category: "Cardiovascular", stock: 8, threshold: 40, expiry: "2026-06-10", batch: "B-2403", price: 0.85 },
  { sku: "MED-1004", name: "Lisinopril 10mg", category: "Cardiovascular", stock: 240, threshold: 80, expiry: "2027-09-12", batch: "B-2404", price: 0.20 },
  { sku: "MED-1005", name: "Albuterol Inhaler", category: "Respiratory", stock: 65, threshold: 30, expiry: "2026-11-30", batch: "B-2405", price: 18.50 },
  { sku: "MED-1006", name: "Ibuprofen 400mg", category: "Analgesic", stock: 480, threshold: 150, expiry: "2027-04-22", batch: "B-2406", price: 0.10 },
  { sku: "MED-1007", name: "Clopidogrel 75mg", category: "Cardiovascular", stock: 95, threshold: 50, expiry: "2026-05-18", batch: "B-2407", price: 1.20 },
  { sku: "MED-1008", name: "Sumatriptan 50mg", category: "Neurology", stock: 38, threshold: 20, expiry: "2027-01-05", batch: "B-2408", price: 4.50 },
];

function daysUntil(date: string) {
  return Math.ceil((new Date(date).getTime() - Date.now()) / 86400000);
}

function Inventory() {
  const [q, setQ] = useState("");
  const filtered = items.filter((i) => i.name.toLowerCase().includes(q.toLowerCase()) || i.sku.toLowerCase().includes(q.toLowerCase()));

  const totalItems = items.length;
  const lowStock = items.filter((i) => i.stock < i.threshold).length;
  const expiringSoon = items.filter((i) => daysUntil(i.expiry) < 90).length;

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
          <p className="text-muted-foreground mt-1">Track stock levels, batches and expiry dates.</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" />Add Item</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-[var(--shadow-card)]">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
              <Package className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Total SKUs</div>
              <div className="text-2xl font-bold">{totalItems}</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-[var(--shadow-card)]">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Low Stock</div>
              <div className="text-2xl font-bold">{lowStock}</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-[var(--shadow-card)]">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-warning/20 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-warning" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Expiring &lt; 90 days</div>
              <div className="text-2xl font-bold">{expiringSoon}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-[var(--shadow-card)]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Stock List</CardTitle>
            <div className="relative w-72">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or SKU…" className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead><TableHead>Medicine</TableHead><TableHead>Category</TableHead>
                <TableHead>Batch</TableHead><TableHead>Stock</TableHead><TableHead>Expiry</TableHead>
                <TableHead>Price</TableHead><TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((i) => {
                const days = daysUntil(i.expiry);
                const low = i.stock < i.threshold;
                const expiring = days < 90;
                return (
                  <TableRow key={i.sku}>
                    <TableCell className="font-mono text-xs">{i.sku}</TableCell>
                    <TableCell className="font-medium">{i.name}</TableCell>
                    <TableCell><Badge variant="outline">{i.category}</Badge></TableCell>
                    <TableCell className="text-muted-foreground">{i.batch}</TableCell>
                    <TableCell>
                      <span className={low ? "text-destructive font-semibold" : ""}>{i.stock}</span>
                      <span className="text-muted-foreground text-xs"> / {i.threshold}</span>
                    </TableCell>
                    <TableCell>
                      <div className={expiring ? "text-warning font-medium" : ""}>{i.expiry}</div>
                      <div className="text-xs text-muted-foreground">{days} days</div>
                    </TableCell>
                    <TableCell>${i.price.toFixed(2)}</TableCell>
                    <TableCell>
                      {low ? <Badge variant="destructive">Low Stock</Badge> :
                       expiring ? <Badge className="bg-warning text-warning-foreground hover:bg-warning/90">Expiring</Badge> :
                       <Badge variant="secondary">In Stock</Badge>}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
