import { Outlet, useLocation } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/contexts/AuthContext";
import { farmerNav, logisticsNav, type NavItem } from "@/config/navigation";
import { ArrowLeft, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MobileLayout = () => {
  const { role, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const items: NavItem[] = role === "farmer" ? farmerNav : logisticsNav;
  const currentItem = items.find((i) => location.pathname.startsWith(i.url));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* App bar */}
      <header className="sticky top-0 z-sticky h-appbar flex items-center border-b border-border bg-card px-4">
        {location.pathname !== items[0]?.url && (
          <button onClick={() => navigate(-1)} className="mr-2 cursor-pointer">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
        )}
        <Leaf className="h-5 w-5 text-primary mr-2" />
        <h1 className="text-body font-semibold text-foreground">
          {currentItem?.title || "업사이클링"}
        </h1>
        <button onClick={signOut} className="ml-auto text-caption text-muted-foreground cursor-pointer hover:text-foreground">
          로그아웃
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto px-4 py-4 pb-[calc(var(--bottombar-height)+16px)]">
        <Outlet />
      </main>

      {/* Bottom tab */}
      <nav className="fixed bottom-0 left-0 right-0 z-sticky h-bottombar bg-card border-t border-border flex items-center justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {items.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.url === items[0].url}
            className="flex flex-col items-center gap-0.5 py-1 px-2 text-muted-foreground"
            activeClassName="text-primary"
          >
            <item.icon className="h-5 w-5" />
            <span className="text-caption">{item.title}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default MobileLayout;
