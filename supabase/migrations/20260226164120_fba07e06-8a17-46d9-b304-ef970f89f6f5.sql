
-- 1. Role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'buyer', 'farmer', 'logistics');

-- 2. User roles table (separate from profiles)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Convenience: check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin')
$$;

-- Get current user's role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.user_roles WHERE user_id = _user_id LIMIT 1
$$;

-- 4. Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL DEFAULT '',
  phone TEXT DEFAULT '',
  organization TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 5. Farms table
CREATE TABLE public.farms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  address TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT '',
  district TEXT NOT NULL DEFAULT '',
  crops TEXT[] DEFAULT '{}',
  area_sqm NUMERIC DEFAULT 0,
  latitude NUMERIC,
  longitude NUMERIC,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.farms ENABLE ROW LEVEL SECURITY;

-- 6. Materials table
CREATE TABLE public.materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_id UUID REFERENCES public.farms(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT '기타',
  description TEXT DEFAULT '',
  quantity_kg NUMERIC NOT NULL DEFAULT 0,
  unit_price NUMERIC DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'sold', 'expired')),
  location TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  harvest_date DATE,
  expire_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;

-- 7. Collection requests
CREATE TABLE public.collection_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  farm_id UUID REFERENCES public.farms(id) ON DELETE SET NULL,
  assigned_logistics_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  material_type TEXT NOT NULL,
  estimated_kg NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'assigned', 'in_progress', 'completed', 'cancelled')),
  pickup_date DATE,
  pickup_time TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  photo_urls TEXT[] DEFAULT '{}',
  actual_kg NUMERIC,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.collection_requests ENABLE ROW LEVEL SECURITY;

-- 8. Sample requests
CREATE TABLE public.sample_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  material_id UUID REFERENCES public.materials(id) ON DELETE CASCADE NOT NULL,
  quantity_kg NUMERIC NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'shipped', 'received', 'rejected')),
  shipping_address TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.sample_requests ENABLE ROW LEVEL SECURITY;

-- 9. Orders
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  material_id UUID REFERENCES public.materials(id) ON DELETE CASCADE NOT NULL,
  quantity_kg NUMERIC NOT NULL,
  total_price NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  shipping_address TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 10. Settlements
CREATE TABLE public.settlements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  collection_request_id UUID REFERENCES public.collection_requests(id) ON DELETE SET NULL,
  amount NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  settled_at TIMESTAMPTZ,
  bank_name TEXT DEFAULT '',
  account_number TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.settlements ENABLE ROW LEVEL SECURITY;

-- 11. ESG Reports
CREATE TABLE public.esg_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  total_collection_kg NUMERIC DEFAULT 0,
  total_carbon_reduction_kg NUMERIC DEFAULT 0,
  total_transactions NUMERIC DEFAULT 0,
  total_revenue NUMERIC DEFAULT 0,
  report_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.esg_reports ENABLE ROW LEVEL SECURITY;

-- 12. Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  
  -- Default role from metadata, fallback to 'farmer'
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, COALESCE(
    (NEW.raw_user_meta_data->>'role')::app_role,
    'farmer'
  ));
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 13. Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_farms_updated_at BEFORE UPDATE ON public.farms FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_materials_updated_at BEFORE UPDATE ON public.materials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_collection_requests_updated_at BEFORE UPDATE ON public.collection_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_sample_requests_updated_at BEFORE UPDATE ON public.sample_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_esg_reports_updated_at BEFORE UPDATE ON public.esg_reports FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 14. RLS Policies

-- user_roles: only admin can manage, users can read their own
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins can manage all roles" ON public.user_roles FOR ALL TO authenticated USING (public.is_admin());

-- profiles
CREATE POLICY "Authenticated users can view profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admins can manage all profiles" ON public.profiles FOR ALL TO authenticated USING (public.is_admin());

-- farms
CREATE POLICY "Admins can manage all farms" ON public.farms FOR ALL TO authenticated USING (public.is_admin());
CREATE POLICY "Farmers can view own farms" ON public.farms FOR SELECT TO authenticated USING (farmer_id = auth.uid());
CREATE POLICY "Farmers can create own farms" ON public.farms FOR INSERT TO authenticated WITH CHECK (farmer_id = auth.uid() AND public.has_role(auth.uid(), 'farmer'));
CREATE POLICY "Farmers can update own farms" ON public.farms FOR UPDATE TO authenticated USING (farmer_id = auth.uid() AND public.has_role(auth.uid(), 'farmer'));

-- materials: all authenticated can read, admin can manage
CREATE POLICY "Authenticated can view materials" ON public.materials FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage materials" ON public.materials FOR ALL TO authenticated USING (public.is_admin());

-- collection_requests
CREATE POLICY "Admins can manage all collection requests" ON public.collection_requests FOR ALL TO authenticated USING (public.is_admin());
CREATE POLICY "Farmers can view own requests" ON public.collection_requests FOR SELECT TO authenticated USING (farmer_id = auth.uid());
CREATE POLICY "Farmers can create requests" ON public.collection_requests FOR INSERT TO authenticated WITH CHECK (farmer_id = auth.uid() AND public.has_role(auth.uid(), 'farmer'));
CREATE POLICY "Farmers can update own pending requests" ON public.collection_requests FOR UPDATE TO authenticated USING (farmer_id = auth.uid() AND status IN ('pending', 'approved'));
CREATE POLICY "Logistics can view assigned requests" ON public.collection_requests FOR SELECT TO authenticated USING (assigned_logistics_id = auth.uid());
CREATE POLICY "Logistics can update assigned requests" ON public.collection_requests FOR UPDATE TO authenticated USING (assigned_logistics_id = auth.uid() AND public.has_role(auth.uid(), 'logistics'));

-- sample_requests
CREATE POLICY "Admins can manage all sample requests" ON public.sample_requests FOR ALL TO authenticated USING (public.is_admin());
CREATE POLICY "Buyers can view own sample requests" ON public.sample_requests FOR SELECT TO authenticated USING (buyer_id = auth.uid());
CREATE POLICY "Buyers can create sample requests" ON public.sample_requests FOR INSERT TO authenticated WITH CHECK (buyer_id = auth.uid() AND public.has_role(auth.uid(), 'buyer'));
CREATE POLICY "Buyers can update own sample requests" ON public.sample_requests FOR UPDATE TO authenticated USING (buyer_id = auth.uid());

-- orders
CREATE POLICY "Admins can manage all orders" ON public.orders FOR ALL TO authenticated USING (public.is_admin());
CREATE POLICY "Buyers can view own orders" ON public.orders FOR SELECT TO authenticated USING (buyer_id = auth.uid());
CREATE POLICY "Buyers can create orders" ON public.orders FOR INSERT TO authenticated WITH CHECK (buyer_id = auth.uid() AND public.has_role(auth.uid(), 'buyer'));
CREATE POLICY "Buyers can update own orders" ON public.orders FOR UPDATE TO authenticated USING (buyer_id = auth.uid());

-- settlements
CREATE POLICY "Admins can manage all settlements" ON public.settlements FOR ALL TO authenticated USING (public.is_admin());
CREATE POLICY "Farmers can view own settlements" ON public.settlements FOR SELECT TO authenticated USING (farmer_id = auth.uid());

-- esg_reports: all authenticated can read, admin can manage
CREATE POLICY "Authenticated can view esg reports" ON public.esg_reports FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage esg reports" ON public.esg_reports FOR ALL TO authenticated USING (public.is_admin());
