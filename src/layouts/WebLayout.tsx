import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const WebLayout = () => {
  const { profile } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-sticky h-topbar flex items-center border-b border-border bg-card px-4">
            <SidebarTrigger className="mr-4" />
            <div className="ml-auto flex items-center gap-2">
              <Button variant="ghost" size="icon-sm">
                <Bell className="h-4 w-4" />
              </Button>
              <div className="h-8 w-8 rounded-pill bg-primary flex items-center justify-center text-primary-foreground text-caption font-medium">
                {(profile?.full_name || "U").charAt(0)}
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <div className="container py-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default WebLayout;
