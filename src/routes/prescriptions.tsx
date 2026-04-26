import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Plus, FileText, Trash2, Printer } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/prescriptions")({
  component: Prescriptions,
});

type Item = { drug: string; dose: string; freq: string; duration: string };

const initial = [
  { id: "RX-2841", patient: "Emily Johnson", doctor: "Dr. R. Patel", date: "2026-04-26", items: 3, status: "Pending" },
  { id: "RX-2840", patient: "Michael Brown", doctor: "Dr. K. Singh", date: "2026-04-26", items: 2, status: "Filled" },
  { id: "RX-2839", patient: "Sophia Davis", doctor: "Dr. L. Wong", date: "2026-04-25", items: 1, status: "Filled" },
  { id: "RX-2838", patient: "James Wilson", doctor: "Dr. R. Patel", date: "2026-04-25", items: 4, status: "Ready" },
  { id: "RX-2837", patient: "Olivia Martinez", doctor: "Dr. K. Singh", date: "2026-04-24", items: 2, status: "Filled" },
];

function Prescriptions() {
  const [list, setList] = useState(initial);
  const [open, setOpen] = useState(false);
  const [patient, setPatient] = useState("");
  const [doctor, setDoctor] = useState("");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<Item[]>([{ drug: "", dose: "", freq: "", duration: "" }]);

  const addItem = () => setItems([...items, { drug: "", dose: "", freq: "", duration: "" }]);
  const removeItem = (i: number) => setItems(items.filter((_, idx) => idx !== i));
  const updateItem = (i: number, key: keyof Item, val: string) => {
    setItems(items.map((it, idx) => (idx === i ? { ...it, [key]: val } : it)));
  };

  const submit = () => {
    if (!patient || !doctor || items.some((i) => !i.drug)) {
      toast.error("Please fill patient, doctor and at least one medicine.");
      return;
    }
    const id = `RX-${2842 + list.length}`;
    setList([{ id, patient, doctor, date: new Date().toISOString().slice(0, 10), items: items.length, status: "Pending" }, ...list]);
    toast.success(`Prescription ${id} created`);
    setOpen(false);
    setPatient(""); setDoctor(""); setNotes(""); setItems([{ drug: "", dose: "", freq: "", duration: "" }]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">E-Prescriptions</h1>
          <p className="text-muted-foreground mt-1">Create, track and dispense digital prescriptions.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />New Prescription</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Create E-Prescription</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Patient name</Label>
                  <Input value={patient} onChange={(e) => setPatient(e.target.value)} placeholder="Jane Doe" />
                </div>
                <div className="space-y-2">
                  <Label>Prescribing doctor</Label>
                  <Input value={doctor} onChange={(e) => setDoctor(e.target.value)} placeholder="Dr. Smith" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Medications</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addItem}><Plus className="h-3 w-3 mr-1" />Add</Button>
                </div>
                {items.map((it, i) => (
                  <div key={i} className="grid grid-cols-12 gap-2 items-end p-3 rounded-lg bg-muted/40">
                    <div className="col-span-4 space-y-1"><Label className="text-xs">Drug</Label><Input value={it.drug} onChange={(e) => updateItem(i, "drug", e.target.value)} placeholder="Amoxicillin" /></div>
                    <div className="col-span-2 space-y-1"><Label className="text-xs">Dose</Label><Input value={it.dose} onChange={(e) => updateItem(i, "dose", e.target.value)} placeholder="500mg" /></div>
                    <div className="col-span-3 space-y-1"><Label className="text-xs">Frequency</Label>
                      <Select value={it.freq} onValueChange={(v) => updateItem(i, "freq", v)}>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="OD">Once daily</SelectItem>
                          <SelectItem value="BID">Twice daily</SelectItem>
                          <SelectItem value="TID">Thrice daily</SelectItem>
                          <SelectItem value="QID">Four times daily</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2 space-y-1"><Label className="text-xs">Duration</Label><Input value={it.duration} onChange={(e) => updateItem(i, "duration", e.target.value)} placeholder="7 days" /></div>
                    <div className="col-span-1">
                      {items.length > 1 && <Button type="button" variant="ghost" size="icon" onClick={() => removeItem(i)}><Trash2 className="h-4 w-4 text-destructive" /></Button>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Additional instructions…" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={submit}>Create Prescription</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-0 shadow-[var(--shadow-card)]">
        <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-primary" />All Prescriptions</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead><TableHead>Patient</TableHead><TableHead>Doctor</TableHead>
                <TableHead>Date</TableHead><TableHead>Items</TableHead><TableHead>Status</TableHead><TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-mono text-xs">{r.id}</TableCell>
                  <TableCell className="font-medium">{r.patient}</TableCell>
                  <TableCell>{r.doctor}</TableCell>
                  <TableCell>{r.date}</TableCell>
                  <TableCell>{r.items}</TableCell>
                  <TableCell><Badge variant={r.status === "Pending" ? "destructive" : r.status === "Ready" ? "default" : "secondary"}>{r.status}</Badge></TableCell>
                  <TableCell><Button variant="ghost" size="icon"><Printer className="h-4 w-4" /></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
