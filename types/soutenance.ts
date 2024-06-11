import { Dispatch, SetStateAction } from "react";
import { Cycle } from "./cycle";
import { Memoire } from "./memory";
import { SchoolYear } from "./schoolyear";

export interface Soutenance {
  id: number;
  name: string;
  slug: string;
  start_date: string;
  end_date: string;
  number_memories_expected: number;
  school_year: SchoolYear;
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

export interface CreateSoutenanceErrorType {
  start_date?: string[],
  end_date?: string[],
  number_memories_expected?: string[],
  cycle_id?: string[],
  school_year_id?: string[],
}

export interface CreateSoutenanceProps {
  start_date: string,
  end_date: string,
  number_memories_expected: number,
  cycle_id: number,
  school_year_id: number,

  setErrors: Dispatch<SetStateAction<CreateSoutenanceErrorType>>;
}

export interface EditSoutenanceProps {
  start_date: string,
  end_date: string,
  number_memories_expected: number,
  cycle_id: number,
  school_year_id: number,
  soutenance: number

  setErrors: Dispatch<SetStateAction<CreateSoutenanceErrorType>>;
}