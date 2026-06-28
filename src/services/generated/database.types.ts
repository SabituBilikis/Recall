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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      collections: {
        Row: {
          color: Database["public"]["Enums"]["collection_color"]
          created_at: string
          deleted_at: string | null
          description: string
          icon: Database["public"]["Enums"]["collection_icon"]
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          color?: Database["public"]["Enums"]["collection_color"]
          created_at?: string
          deleted_at?: string | null
          description?: string
          icon?: Database["public"]["Enums"]["collection_icon"]
          id?: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          color?: Database["public"]["Enums"]["collection_color"]
          created_at?: string
          deleted_at?: string | null
          description?: string
          icon?: Database["public"]["Enums"]["collection_icon"]
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string
          saved_item_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          saved_item_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          saved_item_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_saved_item_id_fkey"
            columns: ["saved_item_id"]
            isOneToOne: false
            referencedRelation: "saved_items"
            referencedColumns: ["id"]
          },
        ]
      }
      files: {
        Row: {
          created_at: string
          file_name: string
          id: string
          mime_type: string | null
          saved_item_id: string
          size_bytes: number | null
          storage_path: string
          user_id: string
        }
        Insert: {
          created_at?: string
          file_name: string
          id?: string
          mime_type?: string | null
          saved_item_id: string
          size_bytes?: number | null
          storage_path: string
          user_id: string
        }
        Update: {
          created_at?: string
          file_name?: string
          id?: string
          mime_type?: string | null
          saved_item_id?: string
          size_bytes?: number | null
          storage_path?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "files_saved_item_id_fkey"
            columns: ["saved_item_id"]
            isOneToOne: false
            referencedRelation: "saved_items"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string
          created_at: string
          data: Json | null
          id: string
          read_at: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Insert: {
          body?: string
          created_at?: string
          data?: Json | null
          id?: string
          read_at?: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          data?: Json | null
          id?: string
          read_at?: string | null
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          first_name: string
          id: string
          last_name: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string
          id: string
          last_name?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string
          id?: string
          last_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      saved_item_tags: {
        Row: {
          saved_item_id: string
          tag_id: string
          user_id: string
        }
        Insert: {
          saved_item_id: string
          tag_id: string
          user_id: string
        }
        Update: {
          saved_item_id?: string
          tag_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_item_tags_saved_item_id_fkey"
            columns: ["saved_item_id"]
            isOneToOne: false
            referencedRelation: "saved_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_item_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_items: {
        Row: {
          collection_id: string | null
          content: string
          created_at: string
          deleted_at: string | null
          description: string
          file_type: string | null
          fts: unknown
          id: string
          title: string
          type: Database["public"]["Enums"]["saved_item_type"]
          updated_at: string
          url: string | null
          user_id: string
        }
        Insert: {
          collection_id?: string | null
          content?: string
          created_at?: string
          deleted_at?: string | null
          description?: string
          file_type?: string | null
          fts?: unknown
          id?: string
          title?: string
          type: Database["public"]["Enums"]["saved_item_type"]
          updated_at?: string
          url?: string | null
          user_id: string
        }
        Update: {
          collection_id?: string | null
          content?: string
          created_at?: string
          deleted_at?: string | null
          description?: string
          file_type?: string | null
          fts?: unknown
          id?: string
          title?: string
          type?: Database["public"]["Enums"]["saved_item_type"]
          updated_at?: string
          url?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_items_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          created_at: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      collection_item_counts: {
        Row: {
          collection_id: string | null
          item_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "saved_items_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      archive_saved_item: { Args: { p_id: string }; Returns: undefined }
      save_item_with_file: {
        Args: {
          p_collection_id?: string
          p_file_name: string
          p_file_type?: string
          p_mime_type?: string
          p_size_bytes?: number
          p_storage_path: string
          p_title: string
          p_type: Database["public"]["Enums"]["saved_item_type"]
        }
        Returns: {
          collection_id: string | null
          content: string
          created_at: string
          deleted_at: string | null
          description: string
          file_type: string | null
          fts: unknown
          id: string
          title: string
          type: Database["public"]["Enums"]["saved_item_type"]
          updated_at: string
          url: string | null
          user_id: string
        }
        SetofOptions: {
          from: "*"
          to: "saved_items"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      search_saved_items: {
        Args: { query: string }
        Returns: {
          collection_id: string | null
          content: string
          created_at: string
          deleted_at: string | null
          description: string
          file_type: string | null
          fts: unknown
          id: string
          title: string
          type: Database["public"]["Enums"]["saved_item_type"]
          updated_at: string
          url: string | null
          user_id: string
        }[]
        SetofOptions: {
          from: "*"
          to: "saved_items"
          isOneToOne: false
          isSetofReturn: true
        }
      }
    }
    Enums: {
      collection_color: "purple" | "blue" | "grey" | "green" | "yellow" | "red"
      collection_icon:
        | "folder"
        | "briefcase"
        | "folderOpen"
        | "tray"
        | "book"
        | "bookmark"
      notification_type:
        | "welcome"
        | "reminder"
        | "system"
        | "item"
        | "collection"
      saved_item_type: "screenshot" | "link" | "note" | "file"
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
      collection_color: ["purple", "blue", "grey", "green", "yellow", "red"],
      collection_icon: [
        "folder",
        "briefcase",
        "folderOpen",
        "tray",
        "book",
        "bookmark",
      ],
      notification_type: [
        "welcome",
        "reminder",
        "system",
        "item",
        "collection",
      ],
      saved_item_type: ["screenshot", "link", "note", "file"],
    },
  },
} as const
