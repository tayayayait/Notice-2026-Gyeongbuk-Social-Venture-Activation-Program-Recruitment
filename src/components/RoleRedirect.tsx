import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

const RoleRedirect = () => {
  const { role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  switch (role) {
    case "admin":
      return <Navigate to="/admin" replace />;
    case "buyer":
      return <Navigate to="/buyer" replace />;
    case "farmer":
      return <Navigate to="/farmer" replace />;
    case "logistics":
      return <Navigate to="/logistics" replace />;
    default:
      return <Navigate to="/auth" replace />;
  }
};

export default RoleRedirect;
