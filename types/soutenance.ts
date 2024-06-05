import { Cycle } from "./cycle";
import { Memoire } from "./memory";

export interface Soutenance {
  id: number;
  name: string;
  slug: string;
  start_date: string;
  end_date: string;
  number_memories_expected: number;
  created_by: string | null;
  updated_by: string | null;
  deleted_by: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  cycle: Cycle;
  memoire: Memoire;
}

export interface GetAllSoutenanceResponse {
  data: Soutenance[];
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