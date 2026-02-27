import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

const FarmerProfile = () => {
  const { profile } = useAuth();

  return (
    <div className="space-y-4">
      <h1 className="text-h1 text-foreground">내 농가 정보</h1>
      <Card>
        <CardContent className="pt-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-pill bg-primary flex items-center justify-center text-primary-foreground text-h3 font-semibold">
              {(profile?.full_name || "U").charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-foreground">{profile?.full_name || "이름 없음"}</p>
              <p className="text-caption text-muted-foreground">{profile?.organization || "소속 없음"}</p>
            </div>
          </div>
          <div className="border-t border-border pt-3 space-y-2 text-body2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">연락처</span>
              <span>{profile?.phone || "—"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmerProfile;
