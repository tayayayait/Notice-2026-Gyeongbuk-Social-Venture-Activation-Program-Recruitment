import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { EmptyState } from "@/components/ui/empty-state";
import { Truck } from "lucide-react";

const statusOptions = [
  { value: "pending", label: "대기" },
  { value: "approved", label: "승인" },
  { value: "assigned", label: "배차" },
  { value: "in_progress", label: "진행중" },
  { value: "completed", label: "완료" },
  { value: "cancelled", label: "취소" },
];

const statusVariant: Record<string, "success" | "warning" | "danger" | "info" | "neutral"> = {
  pending: "neutral", approved: "info", assigned: "info", in_progress: "warning", completed: "success", cancelled: "danger",
};

const AdminCollections = () => {
  const queryClient = useQueryClient();

  const { data: requests, isLoading } = useQuery({
    queryKey: ["admin-all-collections"],
    queryFn: async () => {
      const { data } = await supabase.from("collection_requests").select("*").order("created_at", { ascending: false });
      return data || [];
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const update: any = { status };
      if (status === "completed") update.completed_at = new Date().toISOString();
      const { error } = await supabase.from("collection_requests").update(update).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-all-collections"] });
      toast.success("상태가 변경되었습니다.");
    },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h1 text-foreground">수거 관리</h1>
        <p className="text-body2 text-muted-foreground mt-1">수거 요청 현황을 관리합니다.</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-h3">수거 요청 목록</CardTitle></CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-center text-muted-foreground py-8">불러오는 중...</p>
          ) : !requests?.length ? (
            <EmptyState title="수거 요청이 없습니다" icon={<Truck className="h-12 w-12 stroke-1" />} />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>품목</TableHead>
                  <TableHead>예상량(kg)</TableHead>
                  <TableHead>수거일</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>상태 변경</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.material_type}</TableCell>
                    <TableCell>{r.estimated_kg}</TableCell>
                    <TableCell className="text-muted-foreground">{r.pickup_date || "미정"}</TableCell>
                    <TableCell>
                      <StatusBadge variant={statusVariant[r.status] || "neutral"}>
                        {statusOptions.find((s) => s.value === r.status)?.label || r.status}
                      </StatusBadge>
                    </TableCell>
                    <TableCell>
                      <Select value={r.status} onValueChange={(v) => updateStatus.mutate({ id: r.id, status: v })}>
                        <SelectTrigger className="w-28 h-8"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((s) => (
                            <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
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

export default AdminCollections;
