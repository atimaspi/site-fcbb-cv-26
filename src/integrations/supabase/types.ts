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
          documents: Json | null
          founded_year: number | null
          gallery_images: Json | null
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
          documents?: Json | null
          founded_year?: number | null
          gallery_images?: Json | null
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
          documents?: Json | null
          founded_year?: number | null
          gallery_images?: Json | null
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
      gallery_images: {
        Row: {
          alt_text: string | null
          caption: string | null
          created_at: string | null
          file_size: number | null
          gallery_id: string | null
          height: number | null
          id: string
          image_url: string
          order_index: number | null
          thumbnail_url: string | null
          width: number | null
        }
        Insert: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string | null
          file_size?: number | null
          gallery_id?: string | null
          height?: number | null
          id?: string
          image_url: string
          order_index?: number | null
          thumbnail_url?: string | null
          width?: number | null
        }
        Update: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string | null
          file_size?: number | null
          gallery_id?: string | null
          height?: number | null
          id?: string
          image_url?: string
          order_index?: number | null
          thumbnail_url?: string | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "gallery_images_gallery_id_fkey"
            columns: ["gallery_id"]
            isOneToOne: false
            referencedRelation: "gallery"
            referencedColumns: ["id"]
          },
        ]
      }
      game_results: {
        Row: {
          away_team_score: number
          created_at: string | null
          end_time: string | null
          game_id: string | null
          game_status: string | null
          home_team_score: number
          id: string
          player_stats: Json | null
          quarter_scores: Json | null
          referee_id: string | null
          start_time: string | null
          team_stats: Json | null
          updated_at: string | null
        }
        Insert: {
          away_team_score?: number
          created_at?: string | null
          end_time?: string | null
          game_id?: string | null
          game_status?: string | null
          home_team_score?: number
          id?: string
          player_stats?: Json | null
          quarter_scores?: Json | null
          referee_id?: string | null
          start_time?: string | null
          team_stats?: Json | null
          updated_at?: string | null
        }
        Update: {
          away_team_score?: number
          created_at?: string | null
          end_time?: string | null
          game_id?: string | null
          game_status?: string | null
          home_team_score?: number
          id?: string
          player_stats?: Json | null
          quarter_scores?: Json | null
          referee_id?: string | null
          start_time?: string | null
          team_stats?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "game_results_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_results_referee_id_fkey"
            columns: ["referee_id"]
            isOneToOne: false
            referencedRelation: "referees"
            referencedColumns: ["id"]
          },
        ]
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
      integrations: {
        Row: {
          config: Json
          created_at: string | null
          id: string
          is_active: boolean | null
          last_sync: string | null
          name: string
          type: string
          updated_at: string | null
        }
        Insert: {
          config?: Json
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_sync?: string | null
          name: string
          type: string
          updated_at?: string | null
        }
        Update: {
          config?: Json
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_sync?: string | null
          name?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      media_files: {
        Row: {
          alt_text: string | null
          category: string
          created_at: string | null
          description: string | null
          entity_id: string | null
          entity_type: string | null
          file_path: string
          file_size: number
          filename: string
          id: string
          is_featured: boolean | null
          mime_type: string
          original_filename: string
          updated_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          alt_text?: string | null
          category?: string
          created_at?: string | null
          description?: string | null
          entity_id?: string | null
          entity_type?: string | null
          file_path: string
          file_size: number
          filename: string
          id?: string
          is_featured?: boolean | null
          mime_type: string
          original_filename: string
          updated_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          alt_text?: string | null
          category?: string
          created_at?: string | null
          description?: string | null
          entity_id?: string | null
          entity_type?: string | null
          file_path?: string
          file_size?: number
          filename?: string
          id?: string
          is_featured?: boolean | null
          mime_type?: string
          original_filename?: string
          updated_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: []
      }
      news: {
        Row: {
          attachments: Json | null
          author: string | null
          author_id: string | null
          category: string
          content: string
          created_at: string | null
          excerpt: string | null
          featured: boolean | null
          featured_image_url: string | null
          gallery_images: Json | null
          id: string
          image_url: string | null
          published: boolean | null
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          attachments?: Json | null
          author?: string | null
          author_id?: string | null
          category?: string
          content: string
          created_at?: string | null
          excerpt?: string | null
          featured?: boolean | null
          featured_image_url?: string | null
          gallery_images?: Json | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          attachments?: Json | null
          author?: string | null
          author_id?: string | null
          category?: string
          content?: string
          created_at?: string | null
          excerpt?: string | null
          featured?: boolean | null
          featured_image_url?: string | null
          gallery_images?: Json | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          video_url?: string | null
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
          documents: Json | null
          first_name: string
          height_cm: number | null
          id: string
          jersey_number: number | null
          last_name: string
          nationality: string | null
          photo_url: string | null
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
          documents?: Json | null
          first_name: string
          height_cm?: number | null
          id?: string
          jersey_number?: number | null
          last_name: string
          nationality?: string | null
          photo_url?: string | null
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
          documents?: Json | null
          first_name?: string
          height_cm?: number | null
          id?: string
          jersey_number?: number | null
          last_name?: string
          nationality?: string | null
          photo_url?: string | null
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
          certificates: Json | null
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
          photo_url: string | null
        }
        Insert: {
          active?: boolean | null
          certificates?: Json | null
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
          photo_url?: string | null
        }
        Update: {
          active?: boolean | null
          certificates?: Json | null
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
          photo_url?: string | null
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
      sync_logs: {
        Row: {
          created_at: string | null
          data: Json | null
          id: string
          integration_id: string | null
          message: string | null
          status: string
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: string
          integration_id?: string | null
          message?: string | null
          status: string
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: string
          integration_id?: string | null
          message?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "sync_logs_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: false
            referencedRelation: "integrations"
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
      cleanup_orphaned_media: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_current_user_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
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
