import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { PlusCircle, Truck } from "lucide-react";
import { toast } from "sonner";

const statusVariant: Record<string, "success" | "warning" | "danger" | "info" | "neutral"> = {
  pending: "neutral", approved: "info", assigned: "info", in_progress: "warning", completed: "success", cancelled: "danger",
};
const statusLabel: Record<string, string> = {
  pending: "대기", approved: "승인", assigned: "배차", in_progress: "진행중", completed: "완료", cancelled: "취소",
};

const FarmerRequests = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ material_type: "", estimated_kg: 0, pickup_date: "", notes: "" });

  const { data: requests, isLoading } = useQuery({
    queryKey: ["farmer-requests", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase.from("collection_requests").select("*").eq("farmer_id", user.id).order("created_at", { ascending: false });
      return data || [];
    },
    enabled: !!user,
  });

  const create = useMutation({
    mutationFn: async () => {
      if (!user) return;
      const { error } = await supabase.from("collection_requests").insert({
        farmer_id: user.id,
        material_type: form.material_type,
        estimated_kg: form.estimated_kg,
        pickup_date: form.pickup_date || null,
        notes: form.notes,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["farmer-requests"] });
      setShowForm(false);
      setForm({ material_type: "", estimated_kg: 0, pickup_date: "", notes: "" });
      toast.success("수거 요청이 등록되었습니다.");
    },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="space-y-4 max-w-[600px] mx-auto pb-20">
      <div className="flex items-center justify-between pb-2 border-b border-border">
        <h1 className="text-h1 text-foreground">수거 요청</h1>
        
        <Drawer open={showForm} onOpenChange={setShowForm}>
          <DrawerTrigger asChild>
            <Button size="sm" className="h-11 px-4 cursor-interactive shadow-1">
              <PlusCircle className="h-4 w-4 mr-2" /> 새 요청
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>수거 요청 등록</DrawerTitle>
            </DrawerHeader>
            <div className="p-4 space-y-4 overflow-y-auto max-h-[60vh] pb-8">
              <div className="space-y-2">
                <label className="text-body2 font-medium">부산물 종류</label>
                <Input 
                  className="h-11"
                  value={form.material_type} 
                  onChange={(e) => setForm({ ...form, material_type: e.target.value })} 
                  placeholder="예: 사과 전정지" 
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-body2 font-medium">예상 수량 (kg)</label>
                  <Input 
                    type="number" 
                    className="h-11"
                    value={form.estimated_kg} 
                    onChange={(e) => setForm({ ...form, estimated_kg: Number(e.target.value) })} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-body2 font-medium">희망 수거일</label>
                  <Input 
                    type="date" 
                    className="h-11"
                    value={form.pickup_date} 
                    onChange={(e) => setForm({ ...form, pickup_date: e.target.value })} 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-body2 font-medium">메모</label>
                <Input 
                  className="h-11"
                  value={form.notes} 
                  onChange={(e) => setForm({ ...form, notes: e.target.value })} 
                  placeholder="추가 사항" 
                />
              </div>
            </div>
            <DrawerFooter className="pt-2 pb-6 border-t border-border bg-background">
              <Button className="h-11" onClick={() => create.mutate()} disabled={create.isPending}>요청하기</Button>
              <DrawerClose asChild>
                <Button variant="outline" className="h-11">취소</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      {isLoading ? (
        <p className="text-center text-muted-foreground py-8">불러오는 중...</p>
      ) : !requests?.length ? (
        <EmptyState title="수거 요청이 없습니다" description="부산물 수거를 요청해보세요." icon={<Truck className="h-12 w-12 stroke-1" />} action={{ label: "수거 요청", onClick: () => setShowForm(true) }} />
      ) : (
        <div className="space-y-3">
          {requests.map((r) => (
            <Card key={r.id} className="active:scale-[0.98] transition-transform duration-200 cursor-interactive">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-foreground text-h3">{r.material_type}</span>
                  <StatusBadge variant={statusVariant[r.status] || "neutral"}>{statusLabel[r.status] || r.status}</StatusBadge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-body2 bg-neutral-50 p-2.5 rounded-md border border-border">
                  <div className="flex flex-col"><span className="text-muted-foreground text-caption">예상량</span> <span className="font-medium text-foreground">{r.estimated_kg} kg</span></div>
                  <div className="flex flex-col"><span className="text-muted-foreground text-caption">수거일</span> <span className="font-medium text-foreground">{r.pickup_date || "미정"}</span></div>
                </div>
                {r.notes && <p className="text-caption text-neutral-600 mt-3 p-2 bg-neutral-50 rounded italic">"{r.notes}"</p>}
                <p className="text-caption text-muted-foreground mt-3 text-right">{new Date(r.created_at).toLocaleDateString("ko-KR")} 요청</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmerRequests;
