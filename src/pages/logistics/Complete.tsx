import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/empty-state";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";

const LogisticsComplete = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [actualKg, setActualKg] = useState<Record<string, number>>({});

  const { data, isLoading } = useQuery({
    queryKey: ["logistics-in-progress", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase.from("collection_requests").select("*").eq("assigned_logistics_id", user.id).in("status", ["assigned", "in_progress"]).order("pickup_date", { ascending: true });
      return data || [];
    },
    enabled: !!user,
  });

  const complete = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("collection_requests").update({
        status: "completed",
        actual_kg: actualKg[id] || 0,
        completed_at: new Date().toISOString(),
      }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logistics-in-progress"] });
      toast.success("수거 완료 처리되었습니다.");
    },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="space-y-4">
      <h1 className="text-h1 text-foreground">수거 완료 보고</h1>
      {isLoading ? (
        <p className="text-center text-muted-foreground py-8">불러오는 중...</p>
      ) : !data?.length ? (
        <EmptyState title="완료할 수거건이 없습니다" icon={<CheckCircle className="h-12 w-12 stroke-1" />} />
      ) : (
        data.map((r) => (
          <Card key={r.id}>
            <CardContent className="pt-4 space-y-3">
              <div className="flex justify-between">
                <span className="font-medium text-foreground">{r.material_type}</span>
                <span className="text-body2 text-muted-foreground">예상 {r.estimated_kg} kg</span>
              </div>
              <div className="space-y-1">
                <label className="text-body2 font-medium">실제 수거량 (kg)</label>
                <Input
                  type="number"
                  value={actualKg[r.id] ?? ""}
                  onChange={(e) => setActualKg({ ...actualKg, [r.id]: Number(e.target.value) })}
                  placeholder="실제 kg"
                />
              </div>
              <Button className="w-full" onClick={() => complete.mutate(r.id)} loading={complete.isPending}>
                수거 완료
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default LogisticsComplete;
