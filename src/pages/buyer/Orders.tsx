import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/status-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { ShoppingCart } from "lucide-react";

const statusVariant: Record<string, "success" | "warning" | "danger" | "info" | "neutral"> = {
  pending: "neutral", confirmed: "info", processing: "warning", shipped: "warning", delivered: "success", cancelled: "danger",
};
const statusLabel: Record<string, string> = {
  pending: "대기", confirmed: "확정", processing: "처리중", shipped: "배송중", delivered: "배송완료", cancelled: "취소",
};

const BuyerOrders = () => {
  const { user } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["buyer-orders", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase.from("orders").select("*, materials(name)").eq("buyer_id", user.id).order("created_at", { ascending: false });
      return data || [];
    },
    enabled: !!user,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h1 text-foreground">구매 내역</h1>
        <p className="text-body2 text-muted-foreground mt-1">주문 현황을 확인합니다.</p>
      </div>
      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <p className="text-center text-muted-foreground py-8">불러오는 중...</p>
          ) : !data?.length ? (
            <EmptyState title="구매 내역이 없습니다" icon={<ShoppingCart className="h-12 w-12 stroke-1" />} />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>원료</TableHead>
                  <TableHead>수량</TableHead>
                  <TableHead>금액</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>주문일</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((o: any) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-medium">{o.materials?.name || "—"}</TableCell>
                    <TableCell>{o.quantity_kg} kg</TableCell>
                    <TableCell>{Number(o.total_price).toLocaleString()}원</TableCell>
                    <TableCell><StatusBadge variant={statusVariant[o.status] || "neutral"}>{statusLabel[o.status] || o.status}</StatusBadge></TableCell>
                    <TableCell className="text-muted-foreground">{new Date(o.created_at).toLocaleDateString("ko-KR")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BuyerOrders;
