import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import RoleRedirect from "@/components/RoleRedirect";
import WebLayout from "@/layouts/WebLayout";
import MobileLayout from "@/layouts/MobileLayout";

// Auth pages
import Auth from "@/pages/Auth";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";

// Admin pages
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminCollections from "@/pages/admin/Collections";
import AdminMaterials from "@/pages/admin/Materials";
import AdminUsers from "@/pages/admin/Users";
import AdminEsg from "@/pages/admin/Esg";
import AdminSettings from "@/pages/admin/Settings";

// Buyer pages
import BuyerMaterials from "@/pages/buyer/Materials";
import BuyerSamples from "@/pages/buyer/Samples";
import BuyerOrders from "@/pages/buyer/Orders";
import BuyerEsg from "@/pages/buyer/Esg";

// Farmer pages
import FarmerRequests from "@/pages/farmer/Requests";
import FarmerSettlements from "@/pages/farmer/Settlements";
import FarmerProfile from "@/pages/farmer/Profile";

// Logistics pages
import LogisticsSchedule from "@/pages/logistics/Schedule";
import LogisticsDispatch from "@/pages/logistics/Dispatch";
import LogisticsComplete from "@/pages/logistics/Complete";

import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Role redirect */}
            <Route path="/" element={<ProtectedRoute><RoleRedirect /></ProtectedRoute>} />

            {/* Admin (Web layout) */}
            <Route element={<ProtectedRoute><WebLayout /></ProtectedRoute>}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/collections" element={<AdminCollections />} />
              <Route path="/admin/materials" element={<AdminMaterials />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/esg" element={<AdminEsg />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
            </Route>

            {/* Buyer (Web layout) */}
            <Route element={<ProtectedRoute><WebLayout /></ProtectedRoute>}>
              <Route path="/buyer" element={<BuyerMaterials />} />
              <Route path="/buyer/samples" element={<BuyerSamples />} />
              <Route path="/buyer/orders" element={<BuyerOrders />} />
              <Route path="/buyer/esg" element={<BuyerEsg />} />
            </Route>

            {/* Farmer (Mobile layout) */}
            <Route element={<ProtectedRoute><MobileLayout /></ProtectedRoute>}>
              <Route path="/farmer" element={<FarmerRequests />} />
              <Route path="/farmer/settlements" element={<FarmerSettlements />} />
              <Route path="/farmer/profile" element={<FarmerProfile />} />
            </Route>

            {/* Logistics (Mobile layout) */}
            <Route element={<ProtectedRoute><MobileLayout /></ProtectedRoute>}>
              <Route path="/logistics" element={<LogisticsSchedule />} />
              <Route path="/logistics/dispatch" element={<LogisticsDispatch />} />
              <Route path="/logistics/complete" element={<LogisticsComplete />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
