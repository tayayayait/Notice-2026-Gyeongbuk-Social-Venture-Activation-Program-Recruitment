export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      collection_requests: {
        Row: {
          actual_kg: number | null
          assigned_logistics_id: string | null
          completed_at: string | null
          created_at: string
          estimated_kg: number
          farm_id: string | null
          farmer_id: string
          id: string
          material_type: string
          notes: string | null
          photo_urls: string[] | null
          pickup_date: string | null
          pickup_time: string | null
          status: string
          updated_at: string
        }
        Insert: {
          actual_kg?: number | null
          assigned_logistics_id?: string | null
          completed_at?: string | null
          created_at?: string
          estimated_kg?: number
          farm_id?: string | null
          farmer_id: string
          id?: string
          material_type: string
          notes?: string | null
          photo_urls?: string[] | null
          pickup_date?: string | null
          pickup_time?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          actual_kg?: number | null
          assigned_logistics_id?: string | null
          completed_at?: string | null
          created_at?: string
          estimated_kg?: number
          farm_id?: string | null
          farmer_id?: string
          id?: string
          material_type?: string
          notes?: string | null
          photo_urls?: string[] | null
          pickup_date?: string | null
          pickup_time?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "collection_requests_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      esg_reports: {
        Row: {
          created_at: string
          id: string
          period_end: string
          period_start: string
          report_data: Json | null
          title: string
          total_carbon_reduction_kg: number | null
          total_collection_kg: number | null
          total_revenue: number | null
          total_transactions: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          period_end: string
          period_start: string
          report_data?: Json | null
          title: string
          total_carbon_reduction_kg?: number | null
          total_collection_kg?: number | null
          total_revenue?: number | null
          total_transactions?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          period_end?: string
          period_start?: string
          report_data?: Json | null
          title?: string
          total_carbon_reduction_kg?: number | null
          total_collection_kg?: number | null
          total_revenue?: number | null
          total_transactions?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      farms: {
        Row: {
          address: string
          area_sqm: number | null
          city: string
          created_at: string
          crops: string[] | null
          district: string
          farmer_id: string
          id: string
          latitude: number | null
          longitude: number | null
          name: string
          updated_at: string
        }
        Insert: {
          address?: string
          area_sqm?: number | null
          city?: string
          created_at?: string
          crops?: string[] | null
          district?: string
          farmer_id: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          name: string
          updated_at?: string
        }
        Update: {
          address?: string
          area_sqm?: number | null
          city?: string
          created_at?: string
          crops?: string[] | null
          district?: string
          farmer_id?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      materials: {
        Row: {
          category: string
          created_at: string
          description: string | null
          expire_date: string | null
          farm_id: string | null
          harvest_date: string | null
          id: string
          image_url: string | null
          location: string | null
          name: string
          quantity_kg: number
          status: string
          unit_price: number | null
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string | null
          expire_date?: string | null
          farm_id?: string | null
          harvest_date?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          name: string
          quantity_kg?: number
          status?: string
          unit_price?: number | null
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          expire_date?: string | null
          farm_id?: string | null
          harvest_date?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          name?: string
          quantity_kg?: number
          status?: string
          unit_price?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "materials_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          buyer_id: string
          created_at: string
          id: string
          material_id: string
          notes: string | null
          quantity_kg: number
          shipping_address: string | null
          status: string
          total_price: number
          updated_at: string
        }
        Insert: {
          buyer_id: string
          created_at?: string
          id?: string
          material_id: string
          notes?: string | null
          quantity_kg: number
          shipping_address?: string | null
          status?: string
          total_price?: number
          updated_at?: string
        }
        Update: {
          buyer_id?: string
          created_at?: string
          id?: string
          material_id?: string
          notes?: string | null
          quantity_kg?: number
          shipping_address?: string | null
          status?: string
          total_price?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "materials"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string
          id: string
          organization: string | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          id?: string
          organization?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          id?: string
          organization?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      sample_requests: {
        Row: {
          buyer_id: string
          created_at: string
          id: string
          material_id: string
          notes: string | null
          quantity_kg: number
          shipping_address: string | null
          status: string
          updated_at: string
        }
        Insert: {
          buyer_id: string
          created_at?: string
          id?: string
          material_id: string
          notes?: string | null
          quantity_kg?: number
          shipping_address?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          buyer_id?: string
          created_at?: string
          id?: string
          material_id?: string
          notes?: string | null
          quantity_kg?: number
          shipping_address?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sample_requests_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "materials"
            referencedColumns: ["id"]
          },
        ]
      }
      settlements: {
        Row: {
          account_number: string | null
          amount: number
          bank_name: string | null
          collection_request_id: string | null
          created_at: string
          farmer_id: string
          id: string
          settled_at: string | null
          status: string
        }
        Insert: {
          account_number?: string | null
          amount?: number
          bank_name?: string | null
          collection_request_id?: string | null
          created_at?: string
          farmer_id: string
          id?: string
          settled_at?: string | null
          status?: string
        }
        Update: {
          account_number?: string | null
          amount?: number
          bank_name?: string | null
          collection_request_id?: string | null
          created_at?: string
          farmer_id?: string
          id?: string
          settled_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "settlements_collection_request_id_fkey"
            columns: ["collection_request_id"]
            isOneToOne: false
            referencedRelation: "collection_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "buyer" | "farmer" | "logistics"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "buyer", "farmer", "logistics"],
    },
  },
} as const
