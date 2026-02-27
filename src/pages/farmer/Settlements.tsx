import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Wallet } from "lucide-react";

const statusVariant: Record<string, "success" | "warning" | "danger" | "neutral"> = {
  pending: "neutral", processing: "warning", completed: "success", failed: "danger",
};
const statusLabel: Record<string, string> = {
  pending: "대기", processing: "처리중", completed: "완료", failed: "실패",
};

const FarmerSettlements = () => {
  const { user } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["farmer-settlements", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase.from("settlements").select("*").eq("farmer_id", user.id).order("created_at", { ascending: false });
      return data || [];
    },
    enabled: !!user,
  });

  return (
    <div className="space-y-4">
      <h1 className="text-h1 text-foreground">정산 확인</h1>
      {isLoading ? (
        <p className="text-center text-muted-foreground py-8">불러오는 중...</p>
      ) : !data?.length ? (
        <EmptyState title="정산 내역이 없습니다" description="수거 완료 후 정산이 진행됩니다." icon={<Wallet className="h-12 w-12 stroke-1" />} />
      ) : (
        data.map((s) => (
          <Card key={s.id}>
            <CardContent className="pt-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">{Number(s.amount).toLocaleString()}원</p>
                <p className="text-caption text-muted-foreground">{new Date(s.created_at).toLocaleDateString("ko-KR")}</p>
              </div>
              <StatusBadge variant={statusVariant[s.status] || "neutral"}>{statusLabel[s.status] || s.status}</StatusBadge>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default FarmerSettlements;
