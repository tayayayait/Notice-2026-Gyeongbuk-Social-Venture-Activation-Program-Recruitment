import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { DataViewer } from "@/components/DataViewer";
import { Package, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AdminMaterials = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", category: "과수", quantity_kg: 0, unit_price: 0, location: "" });

  const { data: materials, isLoading } = useQuery({
    queryKey: ["admin-materials"],
    queryFn: async () => {
      const { data } = await supabase.from("materials").select("*").order("created_at", { ascending: false });
      return data || [];
    },
  });

  const create = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("materials").insert({ ...form, quantity_kg: Number(form.quantity_kg), unit_price: Number(form.unit_price) });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-materials"] });
      setOpen(false);
      setForm({ name: "", category: "과수", quantity_kg: 0, unit_price: 0, location: "" });
      toast.success("원료가 등록되었습니다.");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const statusVariant: Record<string, "success" | "warning" | "danger" | "neutral"> = {
    available: "success", reserved: "warning", sold: "neutral", expired: "danger",
  };
  const statusLabel: Record<string, string> = {
    available: "가용", reserved: "예약", sold: "판매됨", expired: "만료",
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1 text-foreground">원료 관리</h1>
          <p className="text-body2 text-muted-foreground mt-1">등록된 원료를 관리합니다.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" /> 원료 등록</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>원료 등록</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <label className="text-body2 font-medium">원료명</label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="사과 부산물" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-body2 font-medium">카테고리</label>
                  <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <label className="text-body2 font-medium">지역</label>
                  <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="경산시" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-body2 font-medium">수량 (kg)</label>
                  <Input type="number" value={form.quantity_kg} onChange={(e) => setForm({ ...form, quantity_kg: Number(e.target.value) })} />
                </div>
                <div className="space-y-1">
                  <label className="text-body2 font-medium">단가 (원/kg)</label>
                  <Input type="number" value={form.unit_price} onChange={(e) => setForm({ ...form, unit_price: Number(e.target.value) })} />
                </div>
              </div>
              <Button className="w-full" onClick={() => create.mutate()} disabled={create.isPending}>등록</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="pt-6">
          <DataViewer 
            isLoading={isLoading} 
            isError={false}
            lastUpdated={new Date()}
            onRefresh={() => queryClient.invalidateQueries({ queryKey: ["admin-materials"] })}
          >
            {!materials?.length && !isLoading ? (
              <EmptyState title="등록된 원료가 없습니다" icon={<Package className="h-12 w-12 stroke-1" />} action={{ label: "원료 등록", onClick: () => setOpen(true) }} />
            ) : (
              <Table>
                <TableHeader className="bg-neutral-50 sticky top-[64px] z-sticky">
                  <TableRow>
                    <TableHead>원료명</TableHead>
                    <TableHead>카테고리</TableHead>
                    <TableHead className="text-right">수량</TableHead>
                    <TableHead className="text-right">단가</TableHead>
                    <TableHead className="text-center">상태</TableHead>
                    <TableHead>지역</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {materials?.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell className="font-medium">{m.name}</TableCell>
                      <TableCell>{m.category}</TableCell>
                      <TableCell className="text-right">{m.quantity_kg?.toLocaleString() ?? 0} kg</TableCell>
                      <TableCell className="text-right">{Number(m.unit_price).toLocaleString()}원</TableCell>
                      <TableCell className="text-center"><StatusBadge variant={statusVariant[m.status] || "neutral"}>{statusLabel[m.status] || m.status}</StatusBadge></TableCell>
                      <TableCell className="text-muted-foreground">{m.location || "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </DataViewer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMaterials;
