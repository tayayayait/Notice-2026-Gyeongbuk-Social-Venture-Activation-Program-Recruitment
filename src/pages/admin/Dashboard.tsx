import { KpiCard } from "@/components/ui/kpi-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Truck, BarChart3, Users, Leaf } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MapBoard } from "@/components/MapBoard";
import { DataViewer } from "@/components/DataViewer";
import { useState } from "react";

const statusMap: Record<string, { variant: "success" | "warning" | "danger" | "info" | "neutral"; label: string }> = {
  pending: { variant: "neutral", label: "대기" },
  approved: { variant: "info", label: "승인" },
  assigned: { variant: "info", label: "배차" },
  in_progress: { variant: "warning", label: "진행중" },
  completed: { variant: "success", label: "완료" },
  cancelled: { variant: "danger", label: "취소" },
};

const MOCK_PINS = [
  { id: '1', lat: 50, lng: 50, state: 'available', title: '경산 사과농장 A', detail: '사과 전정가지 500kg' },
  { id: '2', lat: 30, lng: 60, state: 'scheduled', title: '청도 감농장', detail: '수거 예정' },
  { id: '3', lat: 70, lng: 40, state: 'limited', title: '영천 포도농장', detail: '물량 제한(소량)' },
  { id: '4', lat: 20, lng: 80, state: 'blocked', title: '안동 외곽지점', detail: '현재 접근 불가 도로' },
] as const;

const AdminDashboard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data: requests, isLoading } = useQuery({
    queryKey: ["admin-collection-requests"],
    queryFn: async () => {
      const { data } = await supabase.from("collection_requests").select("*").order("created_at", { ascending: false }).limit(10);
      return data || [];
    },
  });

  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [col, mat, profiles] = await Promise.all([
        supabase.from("collection_requests").select("id", { count: "exact" }),
        supabase.from("materials").select("id", { count: "exact" }),
        supabase.from("profiles").select("id", { count: "exact" }),
      ]);
      return {
        collections: col.count || 0,
        materials: mat.count || 0,
        users: profiles.count || 0,
      };
    },
  });

  const handleRefreshMap = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">
      <div>
        <h1 className="text-h1 text-foreground">대시보드</h1>
        <p className="text-body2 text-muted-foreground mt-1">플랫폼 현황과 수거 지역을 한눈에 확인하세요.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="총 수거 건수" value={stats?.collections ?? 0} unit="건" icon={<Truck className="h-5 w-5" />} loading={!stats} />
        <KpiCard title="등록 원료" value={stats?.materials ?? 0} unit="종" icon={<BarChart3 className="h-5 w-5" />} loading={!stats} />
        <KpiCard title="전체 사용자" value={stats?.users ?? 0} unit="명" icon={<Users className="h-5 w-5" />} loading={!stats} />
        <KpiCard title="탄소 감축량" value="—" unit="tCO₂e" icon={<Leaf className="h-5 w-5" />} />
      </div>

      <Card className="overflow-hidden border-border shadow-1">
        <CardHeader className="bg-neutral-50 border-b border-border pb-4">
          <CardTitle className="text-h3">지역 수급 현황 모니터링</CardTitle>
        </CardHeader>
        <MapBoard 
          pins={[...MOCK_PINS]} 
          onRefresh={handleRefreshMap}
          isStale={false}
          className="border-0 rounded-none border-b border-border" 
        />
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-h3">최근 수거 요청</CardTitle>
        </CardHeader>
        <CardContent>
          <DataViewer 
            isLoading={isLoading || isRefreshing} 
            isError={false}
            lastUpdated={new Date()}
            onRefresh={handleRefreshMap}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>품목</TableHead>
                  <TableHead>예상량</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>요청일</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!requests?.length ? (
                  <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">수거 요청이 없습니다.</TableCell></TableRow>
                ) : (
                  requests.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">{r.material_type}</TableCell>
                      <TableCell>{r.estimated_kg} kg</TableCell>
                      <TableCell>
                        <StatusBadge variant={statusMap[r.status]?.variant || "neutral"}>
                          {statusMap[r.status]?.label || r.status}
                        </StatusBadge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{new Date(r.created_at).toLocaleDateString("ko-KR")}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </DataViewer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
