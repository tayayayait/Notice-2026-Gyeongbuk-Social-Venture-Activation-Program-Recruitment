import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      setSent(true);
      toast.success("비밀번호 재설정 이메일을 전송했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <button onClick={() => navigate("/auth")} className="text-muted-foreground hover:text-foreground mb-2 flex items-center gap-1 text-body2 cursor-pointer">
            <ArrowLeft className="h-4 w-4" /> 로그인으로 돌아가기
          </button>
          <CardTitle className="text-h1">비밀번호 재설정</CardTitle>
        </CardHeader>
        <CardContent>
          {sent ? (
            <p className="text-body2 text-muted-foreground">이메일을 확인하고 비밀번호 재설정 링크를 클릭하세요.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-body2 font-medium text-neutral-700">이메일</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" loading={loading}>재설정 이메일 보내기</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
