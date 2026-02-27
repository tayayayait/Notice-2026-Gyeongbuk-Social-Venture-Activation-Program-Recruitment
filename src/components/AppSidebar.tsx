import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Leaf, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { adminNav, buyerNav, type NavItem } from "@/config/navigation";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { role, profile, signOut } = useAuth();

  const items: NavItem[] = role === "admin" ? adminNav : buyerNav;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              {!collapsed && <span className="font-semibold text-foreground">업사이클링</span>}
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/admin" || item.url === "/buyer"}
                      className="hover:bg-muted/50"
                      activeClassName="bg-primary-tint text-accent-foreground font-medium"
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-2">
        {!collapsed && profile && (
          <div className="px-2 py-1 text-caption text-muted-foreground truncate">
            {profile.full_name || "사용자"}
          </div>
        )}
        <Button variant="ghost" size={collapsed ? "icon" : "default"} className="w-full justify-start" onClick={signOut}>
          <LogOut className="h-4 w-4" />
          {!collapsed && <span className="ml-2">로그아웃</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
