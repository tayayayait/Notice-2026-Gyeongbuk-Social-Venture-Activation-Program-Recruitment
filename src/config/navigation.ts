import {
  LayoutDashboard, Truck, Package, Users, FileText, Settings,
  Search, ClipboardList, ShoppingCart, Award,
  PlusCircle, Wallet, User,
  Calendar, MapPin, CheckCircle,
} from "lucide-react";

export type NavItem = {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
};

export const adminNav: NavItem[] = [
  { title: "대시보드", url: "/admin", icon: LayoutDashboard },
  { title: "수거 관리", url: "/admin/collections", icon: Truck },
  { title: "원료 관리", url: "/admin/materials", icon: Package },
  { title: "사용자 관리", url: "/admin/users", icon: Users },
  { title: "ESG 리포트", url: "/admin/esg", icon: FileText },
  { title: "설정", url: "/admin/settings", icon: Settings },
];

export const buyerNav: NavItem[] = [
  { title: "원료 탐색", url: "/buyer", icon: Search },
  { title: "샘플 신청", url: "/buyer/samples", icon: ClipboardList },
  { title: "구매 내역", url: "/buyer/orders", icon: ShoppingCart },
  { title: "ESG 인증서", url: "/buyer/esg", icon: Award },
];

export const farmerNav: NavItem[] = [
  { title: "수거 요청", url: "/farmer", icon: PlusCircle },
  { title: "정산 확인", url: "/farmer/settlements", icon: Wallet },
  { title: "내 농가", url: "/farmer/profile", icon: User },
];

export const logisticsNav: NavItem[] = [
  { title: "수거 일정", url: "/logistics", icon: Calendar },
  { title: "배차 관리", url: "/logistics/dispatch", icon: MapPin },
  { title: "수거 완료", url: "/logistics/complete", icon: CheckCircle },
];
