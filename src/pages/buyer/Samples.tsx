import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/status-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { ClipboardList, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { DataViewer } from "@/components/DataViewer";
import { toast } from "sonner";

const statusVariant: Record<string, "success" | "warning" | "danger" | "info" | "neutral"> = {
  pending: "neutral", approved: "info", shipped: "warning", received: "success", rejected: "danger",
};
const statusLabel: Record<string, string> = {
  pending: "대기", approved: "승인", shipped: "배송중", received: "수령", rejected: "거절",
};

const BuyerSamples = () => {
  const { user } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["buyer-samples", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase.from("sample_requests").select("*, materials(name, category)").eq("buyer_id", user.id).order("created_at", { ascending: false });
      return data || [];
    },
    enabled: !!user,
  });

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ materialName: '', quantity: '', memo: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("샘플 신청이 완료되었습니다."); // 데모용
    setOpen(false);
    setFormData({ materialName: '', quantity: '', memo: '' });
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1 text-foreground">샘플 신청 내역</h1>
          <p className="text-body2 text-muted-foreground mt-1">샘플 신청 현황을 확인합니다.</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="shadow-1">
              <Plus className="w-4 h-4 mr-2" /> 새 샘플 신청
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[560px]">
            <DialogHeader>
              <DialogTitle className="text-h2">샘플 신청 폼</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-5 pt-4">
              <div className="space-y-2">
                <label className="text-body2 font-medium">원료 및 품번 명칭</label>
                <Input 
                  placeholder="예: 경산 사과 전정가지 A급 칩" 
                  value={formData.materialName}
                  onChange={e => setFormData(f => ({ ...f, materialName: e.target.value }))}
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-body2 font-medium">요청 수량 (kg)</label>
                <Input 
                  type="number" 
                  placeholder="예: 5" 
                  value={formData.quantity}
                  onChange={e => setFormData(f => ({ ...f, quantity: e.target.value }))}
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-body2 font-medium">배송 메시지 및 비고</label>
                <Textarea 
                  placeholder="추가 전달사항을 남겨주세요." 
                  className="resize-none h-24"
                  value={formData.memo}
                  onChange={e => setFormData(f => ({ ...f, memo: e.target.value }))}
                />
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-border">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>취소</Button>
                <Button type="submit">신청하기</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="pt-6">
          <DataViewer isLoading={isLoading} isError={false}>
            {!data?.length && !isLoading ? (
              <EmptyState title="샘플 신청 내역이 없습니다" icon={<ClipboardList className="h-12 w-12 stroke-1 text-muted-foreground" />} />
            ) : (
              <Table>
                <TableHeader className="bg-neutral-50">
                  <TableRow>
                    <TableHead>원료</TableHead>
                    <TableHead>수량</TableHead>
                    <TableHead className="text-center">상태</TableHead>
                    <TableHead>신청일</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.map((s: any) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.materials?.name || "—"}</TableCell>
                      <TableCell>{s.quantity_kg} kg</TableCell>
                      <TableCell className="text-center"><StatusBadge variant={statusVariant[s.status] || "neutral"}>{statusLabel[s.status] || s.status}</StatusBadge></TableCell>
                      <TableCell className="text-muted-foreground">{new Date(s.created_at).toLocaleDateString("ko-KR")}</TableCell>
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

export default BuyerSamples;
