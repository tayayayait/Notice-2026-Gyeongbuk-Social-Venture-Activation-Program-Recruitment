import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiCard } from "@/components/ui/kpi-card";
import { EmptyState } from "@/components/ui/empty-state";
import { FileText, Leaf, BarChart3, Truck } from "lucide-react";

const AdminEsg = () => {
  const { data: reports, isLoading } = useQuery({
    queryKey: ["admin-esg"],
    queryFn: async () => {
      const { data } = await supabase.from("esg_reports").select("*").order("period_end", { ascending: false });
      return data || [];
    },
  });

  const latest = reports?.[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h1 text-foreground">ESG 리포트</h1>
        <p className="text-body2 text-muted-foreground mt-1">환경·사회·지배구조 성과를 확인합니다.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiCard title="총 수거량" value={latest?.total_collection_kg ?? "—"} unit="kg" icon={<Truck className="h-5 w-5" />} loading={isLoading} />
        <KpiCard title="탄소 감축량" value={latest?.total_carbon_reduction_kg ?? "—"} unit="kgCO₂e" icon={<Leaf className="h-5 w-5" />} loading={isLoading} />
        <KpiCard title="총 거래액" value={latest?.total_revenue ? Number(latest.total_revenue).toLocaleString() : "—"} unit="원" icon={<BarChart3 className="h-5 w-5" />} loading={isLoading} />
      </div>

      <Card>
        <CardHeader><CardTitle className="text-h3">리포트 목록</CardTitle></CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-center text-muted-foreground py-8">불러오는 중...</p>
          ) : !reports?.length ? (
            <EmptyState title="ESG 리포트가 없습니다" description="데이터가 쌓이면 리포트를 생성할 수 있습니다." icon={<FileText className="h-12 w-12 stroke-1" />} />
          ) : (
            <div className="space-y-3">
              {reports.map((r) => (
                <div key={r.id} className="flex items-center justify-between p-4 border border-border rounded-sm">
                  <div>
                    <p className="font-medium text-foreground">{r.title}</p>
                    <p className="text-caption text-muted-foreground">{r.period_start} ~ {r.period_end}</p>
                  </div>
                  <div className="text-body2 text-muted-foreground">{Number(r.total_carbon_reduction_kg).toLocaleString()} kgCO₂e</div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminEsg;
