import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Phone, CheckCircle2 } from "lucide-react";

const statusVariant: Record<string, "success" | "warning" | "info" | "neutral"> = {
  assigned: "info", in_progress: "warning", completed: "success",
};
const statusLabel: Record<string, string> = {
  assigned: "배차", in_progress: "진행중", completed: "완료",
};

const LogisticsSchedule = () => {
  const { user } = useAuth();
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["logistics-schedule", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase.from("collection_requests").select("*").eq("assigned_logistics_id", user.id).in("status", ["assigned", "in_progress"]).order("pickup_date", { ascending: true });
      return data || [];
    },
    enabled: !!user,
  });

  return (
    <div className="space-y-4 max-w-[600px] mx-auto pb-20">
      <div className="flex items-center justify-between pb-2 border-b border-border">
        <h1 className="text-h1 text-foreground">배차/수거 일정</h1>
      </div>

      {isLoading ? (
        <p className="text-center text-muted-foreground py-8">불러오는 중...</p>
      ) : !data?.length ? (
        <EmptyState title="배정된 수거 일정이 없습니다" icon={<Calendar className="h-12 w-12 stroke-1" />} />
      ) : (
        <div className="space-y-3">
          {data.map((r) => (
            <Card 
              key={r.id} 
              className="active:scale-[0.98] transition-transform duration-200 cursor-interactive"
              onClick={() => setSelectedRequest(r)}
            >
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-foreground text-h3">{r.material_type}</span>
                  <StatusBadge variant={statusVariant[r.status] || "neutral"}>{statusLabel[r.status] || r.status}</StatusBadge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-body2 bg-neutral-50 p-2.5 rounded-md border border-border">
                  <div className="flex flex-col"><span className="text-muted-foreground text-caption">예상 수거량</span> <span className="font-medium text-foreground">{r.estimated_kg} kg</span></div>
                  <div className="flex flex-col"><span className="text-muted-foreground text-caption">일정</span> <span className="font-medium text-foreground">{r.pickup_date || "미정"}</span></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* 모바일 최적화 상세 뷰 Drawer */}
      <Drawer open={!!selectedRequest} onOpenChange={(open) => !open && setSelectedRequest(null)}>
        <DrawerContent className="sm:max-w-[420px] mx-auto">
          <DrawerHeader>
            <DrawerTitle className="text-left text-h2">{selectedRequest?.material_type}</DrawerTitle>
            <div className="text-left text-body2 text-muted-foreground">
              {selectedRequest?.pickup_date} 수거 예정
            </div>
          </DrawerHeader>
          
          <div className="p-4 space-y-6 overflow-y-auto max-h-[60vh]">
            <div className="grid grid-cols-2 bg-neutral-50 rounded-lg p-3 border border-border">
              <div>
                <span className="text-caption text-muted-foreground block mb-1">상태</span>
                <StatusBadge variant={statusVariant[selectedRequest?.status || ''] || "neutral"}>
                  {statusLabel[selectedRequest?.status || ''] || selectedRequest?.status}
                </StatusBadge>
              </div>
              <div>
                <span className="text-caption text-muted-foreground block mb-1">배정량</span>
                <span className="font-medium">{selectedRequest?.estimated_kg} kg</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-h3 font-semibold border-b border-border pb-2">농가 정보</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-body2 font-medium">경북 영천시 금호읍 어딘가</p>
                    <p className="text-caption text-muted-foreground">지도로 보기</p>
                  </div>
                  <Button variant="outline" size="sm">지도맵</Button>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-info-tint flex items-center justify-center">
                    <Phone className="w-5 h-5 text-info" />
                  </div>
                  <div className="flex-1">
                    <p className="text-body2 font-medium">홍길동 농가</p>
                    <p className="text-caption text-muted-foreground">010-1234-5678</p>
                  </div>
                  <Button variant="outline" size="sm">전화걸기</Button>
                </div>
              </div>
            </div>

            {selectedRequest?.notes && (
              <div className="space-y-2">
                <h4 className="text-body2 font-medium text-muted-foreground">참고사항</h4>
                <div className="p-3 bg-neutral-50 rounded-md border border-border text-body2">
                  {selectedRequest.notes}
                </div>
              </div>
            )}
          </div>

          <DrawerFooter className="pt-2 pb-6 border-t border-border bg-background flex flex-col gap-2">
            <Button className="h-12 text-base font-semibold w-full">
              <CheckCircle2 className="w-5 h-5 mr-2" /> 수거 완료 처리
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" className="h-12 w-full">닫기</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default LogisticsSchedule;
