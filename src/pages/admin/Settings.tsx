import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminSettings = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-h1 text-foreground">설정</h1>
      <p className="text-body2 text-muted-foreground mt-1">플랫폼 설정을 관리합니다.</p>
    </div>
    <Card>
      <CardHeader><CardTitle className="text-h3">일반 설정</CardTitle></CardHeader>
      <CardContent>
        <p className="text-body2 text-muted-foreground">추후 알림, 계정, 권한 설정이 추가됩니다.</p>
      </CardContent>
    </Card>
  </div>
);

export default AdminSettings;
