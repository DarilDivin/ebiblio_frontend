import { Soutenance } from "./soutenance";

export interface Cycle {
  id: number;
  name: string;
  slug: string;
  code: string;
  created_by: string | null;
  updated_by: string | null;
  deleted_by: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  soutenances: Soutenance[] | null;
}

export interface GetAllCycleResponse {
  data: Cycle[];
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

export interface CreateCycleProps {
  name: string;
  code: string;
}

export interface EditCycleProps {
  cycle: number;
  name: string;
  code: string;
}