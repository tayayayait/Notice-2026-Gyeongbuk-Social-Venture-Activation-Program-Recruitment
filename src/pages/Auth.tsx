import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf } from "lucide-react";
import { toast } from "sonner";

type AuthMode = "login" | "signup";
type RoleOption = "farmer" | "buyer" | "logistics";

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<RoleOption>("farmer");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName, role },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast.success("회원가입이 완료되었습니다. 이메일을 확인해주세요.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("로그인 성공!");
        navigate("/");
      }
    } catch (err: any) {
      toast.error(err.message || "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const roles: { value: RoleOption; label: string; desc: string }[] = [
    { value: "farmer", label: "농가", desc: "부산물 수거 요청 및 정산" },
    { value: "buyer", label: "구매자", desc: "원료 탐색 및 구매" },
    { value: "logistics", label: "물류", desc: "수거 및 배차 관리" },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 bg-primary rounded-md flex items-center justify-center">
              <Leaf className="h-7 w-7 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-h1">
            {mode === "login" ? "로그인" : "회원가입"}
          </CardTitle>
          <CardDescription>
            경북 농업 부산물 업사이클링 플랫폼
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-2">
                <label className="text-body2 font-medium text-neutral-700">이름</label>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="홍길동"
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <label className="text-body2 font-medium text-neutral-700">이메일</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-body2 font-medium text-neutral-700">비밀번호</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="6자 이상"
                minLength={6}
                required
              />
            </div>
            {mode === "signup" && (
              <div className="space-y-2">
                <label className="text-body2 font-medium text-neutral-700">역할 선택</label>
                <div className="grid grid-cols-3 gap-2">
                  {roles.map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setRole(r.value)}
                      className={`p-3 rounded-sm border text-center transition-colors duration-fast cursor-pointer ${
                        role === r.value
                          ? "border-primary bg-primary-tint text-accent-foreground"
                          : "border-border bg-card text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <div className="text-body2 font-medium">{r.label}</div>
                      <div className="text-caption text-muted-foreground mt-0.5">{r.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            <Button type="submit" className="w-full" size="lg" loading={loading}>
              {mode === "login" ? "로그인" : "회원가입"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-body2 text-info hover:underline cursor-pointer"
            >
              {mode === "login"
                ? "계정이 없으신가요? 회원가입"
                : "이미 계정이 있으신가요? 로그인"}
            </button>
          </div>
          {mode === "login" && (
            <div className="mt-2 text-center">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-caption text-muted-foreground hover:text-info cursor-pointer"
              >
                비밀번호를 잊으셨나요?
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
