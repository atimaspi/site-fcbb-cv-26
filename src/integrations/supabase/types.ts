export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ads: {
        Row: {
          clicks: number | null
          created_at: string | null
          end_date: string | null
          id: string
          image_url: string | null
          link: string | null
          position: string | null
          start_date: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          clicks?: number | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          link?: string | null
          position?: string | null
          start_date?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          clicks?: number | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          link?: string | null
          position?: string | null
          start_date?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      championships: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string | null
          federation_id: string | null
          id: string
          name: string
          regional_association_id: string | null
          season: string
          start_date: string | null
          status: string
          type: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          federation_id?: string | null
          id?: string
          name: string
          regional_association_id?: string | null
          season: string
          start_date?: string | null
          status?: string
          type?: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          federation_id?: string | null
          id?: string
          name?: string
          regional_association_id?: string | null
          season?: string
          start_date?: string | null
          status?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "championships_federation_id_fkey"
            columns: ["federation_id"]
            isOneToOne: false
            referencedRelation: "federations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "championships_regional_association_id_fkey"
            columns: ["regional_association_id"]
            isOneToOne: false
            referencedRelation: "regional_associations"
            referencedColumns: ["id"]
          },
        ]
      }
      clubs: {
        Row: {
          active: boolean | null
          address: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          description: string | null
          founded_year: number | null
          id: string
          island: string
          logo_url: string | null
          name: string
          regional_association_id: string | null
          status: string | null
          website: string | null
        }
        Insert: {
          active?: boolean | null
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          founded_year?: number | null
          id?: string
          island: string
          logo_url?: string | null
          name: string
          regional_association_id?: string | null
          status?: string | null
          website?: string | null
        }
        Update: {
          active?: boolean | null
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          founded_year?: number | null
          id?: string
          island?: string
          logo_url?: string | null
          name?: string
          regional_association_id?: string | null
          status?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clubs_regional_association_id_fkey"
            columns: ["regional_association_id"]
            isOneToOne: false
            referencedRelation: "regional_associations"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_messages: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          status: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          status?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string | null
          event_date: string
          id: string
          location: string | null
          organizer: string | null
          title: string
          type: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          event_date: string
          id?: string
          location?: string | null
          organizer?: string | null
          title: string
          type?: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          event_date?: string
          id?: string
          location?: string | null
          organizer?: string | null
          title?: string
          type?: string
        }
        Relationships: []
      }
      federations: {
        Row: {
          acronym: string | null
          address: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          foundation_date: string | null
          id: string
          logo_url: string | null
          name: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          acronym?: string | null
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          foundation_date?: string | null
          id?: string
          logo_url?: string | null
          name: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          acronym?: string | null
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          foundation_date?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      gallery: {
        Row: {
          created_at: string | null
          description: string | null
          event: string | null
          id: string
          image_count: number | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          event?: string | null
          id?: string
          image_count?: number | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          event?: string | null
          id?: string
          image_count?: number | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      games: {
        Row: {
          away_score: number | null
          away_team_id: string | null
          competition_id: string | null
          created_at: string | null
          home_score: number | null
          home_team_id: string | null
          id: string
          round: string | null
          scheduled_date: string
          status: string | null
          venue: string | null
        }
        Insert: {
          away_score?: number | null
          away_team_id?: string | null
          competition_id?: string | null
          created_at?: string | null
          home_score?: number | null
          home_team_id?: string | null
          id?: string
          round?: string | null
          scheduled_date: string
          status?: string | null
          venue?: string | null
        }
        Update: {
          away_score?: number | null
          away_team_id?: string | null
          competition_id?: string | null
          created_at?: string | null
          home_score?: number | null
          home_team_id?: string | null
          id?: string
          round?: string | null
          scheduled_date?: string
          status?: string | null
          venue?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "games_away_team_id_fkey"
            columns: ["away_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_competition_id_fkey"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "championships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_home_team_id_fkey"
            columns: ["home_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      news: {
        Row: {
          author: string | null
          author_id: string | null
          category: string
          content: string
          created_at: string | null
          excerpt: string | null
          featured: boolean | null
          id: string
          image_url: string | null
          published: boolean | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author?: string | null
          author_id?: string | null
          category?: string
          content: string
          created_at?: string | null
          excerpt?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string | null
          author_id?: string | null
          category?: string
          content?: string
          created_at?: string | null
          excerpt?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      players: {
        Row: {
          active: boolean | null
          age: number | null
          birth_date: string | null
          club: string | null
          created_at: string | null
          first_name: string
          height_cm: number | null
          id: string
          jersey_number: number | null
          last_name: string
          nationality: string | null
          position: string | null
          status: string | null
          team_id: string | null
          weight_kg: number | null
        }
        Insert: {
          active?: boolean | null
          age?: number | null
          birth_date?: string | null
          club?: string | null
          created_at?: string | null
          first_name: string
          height_cm?: number | null
          id?: string
          jersey_number?: number | null
          last_name: string
          nationality?: string | null
          position?: string | null
          status?: string | null
          team_id?: string | null
          weight_kg?: number | null
        }
        Update: {
          active?: boolean | null
          age?: number | null
          birth_date?: string | null
          club?: string | null
          created_at?: string | null
          first_name?: string
          height_cm?: number | null
          id?: string
          jersey_number?: number | null
          last_name?: string
          nationality?: string | null
          position?: string | null
          status?: string | null
          team_id?: string | null
          weight_kg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "players_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          club_id: string | null
          full_name: string | null
          id: string
          regional_association_id: string | null
          role: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          club_id?: string | null
          full_name?: string | null
          id: string
          regional_association_id?: string | null
          role: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          club_id?: string | null
          full_name?: string | null
          id?: string
          regional_association_id?: string | null
          role?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_regional_association_id_fkey"
            columns: ["regional_association_id"]
            isOneToOne: false
            referencedRelation: "regional_associations"
            referencedColumns: ["id"]
          },
        ]
      }
      referees: {
        Row: {
          active: boolean | null
          certified_date: string | null
          created_at: string | null
          email: string | null
          first_name: string
          id: string
          island: string | null
          last_name: string
          level: string
          license_number: string | null
          phone: string | null
        }
        Insert: {
          active?: boolean | null
          certified_date?: string | null
          created_at?: string | null
          email?: string | null
          first_name: string
          id?: string
          island?: string | null
          last_name: string
          level: string
          license_number?: string | null
          phone?: string | null
        }
        Update: {
          active?: boolean | null
          certified_date?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string
          id?: string
          island?: string | null
          last_name?: string
          level?: string
          license_number?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      regional_associations: {
        Row: {
          acronym: string | null
          address: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          federation_id: string
          id: string
          island: string | null
          logo_url: string | null
          name: string
          updated_at: string | null
        }
        Insert: {
          acronym?: string | null
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          federation_id: string
          id?: string
          island?: string | null
          logo_url?: string | null
          name: string
          updated_at?: string | null
        }
        Update: {
          acronym?: string | null
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          federation_id?: string
          id?: string
          island?: string | null
          logo_url?: string | null
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "regional_associations_federation_id_fkey"
            columns: ["federation_id"]
            isOneToOne: false
            referencedRelation: "federations"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          category: string
          club_id: string | null
          created_at: string | null
          division: string | null
          id: string
          name: string
        }
        Insert: {
          category: string
          club_id?: string | null
          created_at?: string | null
          division?: string | null
          id?: string
          name: string
        }
        Update: {
          category?: string
          club_id?: string | null
          created_at?: string | null
          division?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "teams_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
