import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/status-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Users } from "lucide-react";

const roleLabel: Record<string, string> = { admin: "관리자", buyer: "구매자", farmer: "농가", logistics: "물류" };
const roleVariant: Record<string, "success" | "info" | "warning" | "neutral"> = { admin: "info", buyer: "success", farmer: "warning", logistics: "neutral" };

const AdminUsers = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data: profiles } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
      const { data: roles } = await supabase.from("user_roles").select("*");
      return (profiles || []).map((p) => ({
        ...p,
        role: roles?.find((r) => r.user_id === p.user_id)?.role || "unknown",
      }));
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h1 text-foreground">사용자 관리</h1>
        <p className="text-body2 text-muted-foreground mt-1">플랫폼 사용자를 관리합니다.</p>
      </div>
      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <p className="text-center text-muted-foreground py-8">불러오는 중...</p>
          ) : !users?.length ? (
            <EmptyState title="등록된 사용자가 없습니다" icon={<Users className="h-12 w-12 stroke-1" />} />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>이름</TableHead>
                  <TableHead>소속</TableHead>
                  <TableHead>연락처</TableHead>
                  <TableHead>역할</TableHead>
                  <TableHead>가입일</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">{u.full_name || "—"}</TableCell>
                    <TableCell>{u.organization || "—"}</TableCell>
                    <TableCell className="text-muted-foreground">{u.phone || "—"}</TableCell>
                    <TableCell><StatusBadge variant={roleVariant[u.role] || "neutral"} dot={false}>{roleLabel[u.role] || u.role}</StatusBadge></TableCell>
                    <TableCell className="text-muted-foreground">{new Date(u.created_at).toLocaleDateString("ko-KR")}</TableCell>
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

export default AdminUsers;
