export interface Sector {
  id: number;
  type: string;
  name: string;
  slug: string;
  acronym: string;
  created_by: string;
  updated_by: string | null;
  deleted_by: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  sector: Sector;
}

export interface GetAllSectorResponse {
  data: Sector[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}