import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, AlertCircle, Pill, Heart, Plus } from "lucide-react";

export const Route = createFileRoute("/patients")({
  component: Patients,
});

const patients = [
  {
    id: "P-001", name: "Emily Johnson", age: 34, gender: "Female", phone: "+1 555-0142",
    allergies: ["Penicillin", "Peanuts"],
    history: ["Hypertension (2021)", "Asthma (2018)"],
    current: ["Lisinopril 10mg — OD", "Albuterol inhaler — PRN"],
  },
  {
    id: "P-002", name: "Michael Brown", age: 52, gender: "Male", phone: "+1 555-0198",
    allergies: ["Sulfa drugs"],
    history: ["Type 2 Diabetes (2015)", "Hyperlipidemia (2019)"],
    current: ["Metformin 850mg — BID", "Atorvastatin 20mg — OD"],
  },
  {
    id: "P-003", name: "Sophia Davis", age: 28, gender: "Female", phone: "+1 555-0177",
    allergies: [],
    history: ["Migraine (2020)"],
    current: ["Sumatriptan 50mg — PRN"],
  },
  {
    id: "P-004", name: "James Wilson", age: 67, gender: "Male", phone: "+1 555-0123",
    allergies: ["Aspirin", "Iodine"],
    history: ["Coronary Artery Disease (2017)", "COPD (2020)"],
    current: ["Clopidogrel 75mg — OD", "Tiotropium — OD", "Atorvastatin 40mg — OD"],
  },
];

function Patients() {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(patients[0]);
  const filtered = patients.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patient Records</h1>
          <p className="text-muted-foreground mt-1">Allergies, medical history and active medications.</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" />Add Patient</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 border-0 shadow-[var(--shadow-card)]">
          <CardHeader>
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search patients…" className="pl-9" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1 max-h-[600px] overflow-y-auto">
            {filtered.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelected(p)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                  selected.id === p.id ? "bg-accent" : "hover:bg-muted/50"
                }`}
              >
                <Avatar><AvatarFallback className="bg-primary/10 text-primary">{p.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback></Avatar>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.id} · {p.age} yrs · {p.gender}</div>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-0 shadow-[var(--shadow-card)]">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16"><AvatarFallback className="bg-primary text-primary-foreground text-xl">{selected.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback></Avatar>
              <div className="flex-1">
                <CardTitle className="text-2xl">{selected.name}</CardTitle>
                <div className="text-sm text-muted-foreground mt-1">{selected.id} · {selected.age} yrs · {selected.gender} · {selected.phone}</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="allergies">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="allergies">Allergies</TabsTrigger>
                <TabsTrigger value="history">Medical History</TabsTrigger>
                <TabsTrigger value="current">Current Medications</TabsTrigger>
              </TabsList>

              <TabsContent value="allergies" className="mt-6 space-y-2">
                {selected.allergies.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No known allergies.</p>
                ) : (
                  selected.allergies.map((a) => (
                    <div key={a} className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                      <AlertCircle className="h-5 w-5 text-destructive" />
                      <span className="font-medium">{a}</span>
                      <Badge variant="destructive" className="ml-auto">Severe</Badge>
                    </div>
                  ))
                )}
              </TabsContent>

              <TabsContent value="history" className="mt-6 space-y-2">
                {selected.history.map((h) => (
                  <div key={h} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Heart className="h-4 w-4 text-primary" />
                    <span>{h}</span>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="current" className="mt-6 space-y-2">
                {selected.current.map((m) => (
                  <div key={m} className="flex items-center gap-3 p-3 rounded-lg bg-accent">
                    <Pill className="h-4 w-4 text-accent-foreground" />
                    <span className="font-medium">{m}</span>
                    <Badge variant="secondary" className="ml-auto">Active</Badge>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
