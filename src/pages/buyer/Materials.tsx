import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import { FilterChip } from "@/components/ui/filter-chip";
import { EmptyState } from "@/components/ui/empty-state";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Package, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const statusLabel: Record<string, string> = { available: "가용", reserved: "예약", sold: "판매됨", expired: "만료" };
const statusVariant: Record<string, "success" | "warning" | "danger" | "neutral"> = { available: "success", reserved: "warning", sold: "neutral", expired: "danger" };

const BuyerMaterials = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [sampleMaterial, setSampleMaterial] = useState<any>(null);
  const [sampleQty, setSampleQty] = useState(1);

  const { data: materials, isLoading } = useQuery({
    queryKey: ["buyer-materials"],
    queryFn: async () => {
      const { data } = await supabase.from("materials").select("*").order("created_at", { ascending: false });
      return data || [];
    },
  });

  const requestSample = useMutation({
    mutationFn: async () => {
      if (!user || !sampleMaterial) return;
      const { error } = await supabase.from("sample_requests").insert({
        buyer_id: user.id,
        material_id: sampleMaterial.id,
        quantity_kg: sampleQty,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("샘플 신청이 완료되었습니다.");
      setSampleMaterial(null);
      queryClient.invalidateQueries({ queryKey: ["buyer-samples"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const categories = ["전체", ...new Set((materials || []).map((m) => m.category))];
  const filtered = (materials || []).filter((m) => {
    if (selectedCategory !== "전체" && m.category !== selectedCategory) return false;
    if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h1 text-foreground">원료 탐색</h1>
        <p className="text-body2 text-muted-foreground mt-1">업사이클링 원료를 찾아보세요.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="원료명 검색..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <FilterChip key={c} selected={selectedCategory === c} onClick={() => setSelectedCategory(c)}>{c}</FilterChip>
          ))}
        </div>
      </div>

      {isLoading ? (
        <p className="text-center text-muted-foreground py-8">불러오는 중...</p>
      ) : !filtered.length ? (
        <EmptyState title="조건에 맞는 원료가 없습니다" icon={<Package className="h-12 w-12 stroke-1" />} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((m) => (
            <Card key={m.id} className="hover:shadow-2 transition-shadow duration-fast cursor-pointer">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-h3">{m.name}</CardTitle>
                  <StatusBadge variant={statusVariant[m.status] || "neutral"}>{statusLabel[m.status] || m.status}</StatusBadge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-body2">
                  <span className="text-muted-foreground">카테고리</span>
                  <span>{m.category}</span>
                </div>
                <div className="flex justify-between text-body2">
                  <span className="text-muted-foreground">수량</span>
                  <span>{m.quantity_kg} kg</span>
                </div>
                <div className="flex justify-between text-body2">
                  <span className="text-muted-foreground">단가</span>
                  <span>{Number(m.unit_price).toLocaleString()}원/kg</span>
                </div>
                {m.location && (
                  <div className="flex justify-between text-body2">
                    <span className="text-muted-foreground">지역</span>
                    <span>{m.location}</span>
                  </div>
                )}
                {m.status === "available" && (
                  <Button size="sm" variant="secondary" className="w-full mt-2" onClick={() => { setSampleMaterial(m); setSampleQty(1); }}>
                    <ShoppingCart className="h-4 w-4" /> 샘플 신청
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!sampleMaterial} onOpenChange={(o) => !o && setSampleMaterial(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>샘플 신청 — {sampleMaterial?.name}</DialogTitle></DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-1">
              <label className="text-body2 font-medium">수량 (kg)</label>
              <Input type="number" min={1} value={sampleQty} onChange={(e) => setSampleQty(Number(e.target.value))} />
            </div>
            <Button className="w-full" onClick={() => requestSample.mutate()} loading={requestSample.isPending}>신청하기</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BuyerMaterials;
