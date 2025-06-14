
export interface Team {
  id: string;
  name: string;
  category?: string;
  abbreviation?: string;
  city?: string;
  island?: string;
  status?: string;
}

export interface Club {
  id: string;
  name: string;
  island?: string;
  abbreviation?: string;
  city?: string;
  status?: string;
  active?: boolean;
  founded_year?: number;
  logo_url?: string;
  contact_email?: string;
  contact_phone?: string;
  address?: string;
  website?: string;
  description?: string;
  regional_association_id?: string;
}

export interface Competition {
  id: string;
  name: string;
  type?: string;
  season?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
}

export interface Game {
  id: string;
  competition_id?: string;
  home_team_id?: string;
  away_team_id?: string;
  scheduled_date: string;
  venue?: string;
  home_score?: number;
  away_score?: number;
  status?: string;
  round?: string;
}

export interface Player {
  id: string;
  first_name: string;
  last_name: string;
  team_id?: string;
  jersey_number?: number;
  position?: string;
  status?: string;
  active?: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  featured_image_url?: string;
  category?: string;
  published?: boolean;
  published_at?: string;
  status?: string;
  author?: string;
  featured?: boolean;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  event_date: string;
  location?: string;
  type?: string;
  status?: string;
}

export interface Referee {
  id: string;
  first_name: string;
  last_name: string;
  license_number?: string;
  level: string;
  phone?: string;
  email?: string;
  island?: string;
  active?: boolean;
}

export interface Coach {
  id: string;
  name: string;
  team_id?: string;
  license_number?: string;
  phone?: string;
  email?: string;
  status: string;
}

export interface Federation {
  id: string;
  name: string;
  acronym?: string;
  address?: string;
  contact_email?: string;
  contact_phone?: string;
  website?: string;
  logo_url?: string;
  foundation_date?: string;
}

export interface RegionalAssociation {
  id: string;
  name: string;
  island?: string;
  acronym?: string;
  address?: string;
  contact_email?: string;
  contact_phone?: string;
  logo_url?: string;
  federation_id?: string;
}
