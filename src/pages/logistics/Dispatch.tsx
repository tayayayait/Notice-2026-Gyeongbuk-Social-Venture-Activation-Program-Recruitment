import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { MapPin } from "lucide-react";

const LogisticsDispatch = () => {
  const { user } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["logistics-dispatch", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase.from("collection_requests").select("*").eq("assigned_logistics_id", user.id).order("created_at", { ascending: false });
      return data || [];
    },
    enabled: !!user,
  });

  return (
    <div className="space-y-4">
      <h1 className="text-h1 text-foreground">배차 관리</h1>
      {isLoading ? (
        <p className="text-center text-muted-foreground py-8">불러오는 중...</p>
      ) : !data?.length ? (
        <EmptyState title="배차 내역이 없습니다" icon={<MapPin className="h-12 w-12 stroke-1" />} />
      ) : (
        data.map((r) => (
          <Card key={r.id}>
            <CardContent className="pt-4">
              <p className="font-medium text-foreground">{r.material_type}</p>
              <p className="text-body2 text-muted-foreground">예상량: {r.estimated_kg} kg | 수거일: {r.pickup_date || "미정"}</p>
              <p className="text-caption text-muted-foreground mt-1">상태: {r.status}</p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default LogisticsDispatch;
