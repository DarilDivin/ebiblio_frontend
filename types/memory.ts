import { Dispatch, SetStateAction } from "react";
import { Sector } from "./sector";
import { Soutenance } from "./soutenance";

export interface Memoire {
  id: number;
  theme: string;
  start_at: string;
  ends_at: string;
  first_author_matricule: string;
  first_author_firstname: string;
  first_author_lastname: string;
  second_author_matricule: string;
  second_author_firstname: string;
  second_author_lastname: string;
  first_author_email: string;
  second_author_email: string;
  first_author_phone: string;
  second_author_phone: string;
  jury_president_name: string;
  memory_master_name: string;
  memory_master_email: string;
  cote: string;
  status: string;
  file_path: string | null;
  cover_page_path: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  updated_by: string | null;
  sector: Sector;
  soutenance: Soutenance;
}

export interface GetAllMemoryResponse {
  data: Memoire[];
  links?: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta?: {
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

export interface DepotMemoireErrorType {
  first_author_matricule?: string[];
  first_author_firstname?: string[];
  first_author_lastname?: string[];
  first_author_email?: string[];
  first_author_phone?: string[];

  second_author_matricule?: string[];
  second_author_firstname?: string[];
  second_author_lastname?: string[];
  second_author_email?: string[];
  second_author_phone?: string[];

  theme?: string[];
  sector_id?: string[];
  soutenance_id?: string[];
  start_at?: string[];
  ends_at?: string[];
  jury_president_name?: string[];
  memory_master_name?: string[];
  memory_master_email?: string[];
  file_path?: string[];
  cover_page_path?: string[];
}

export interface DepotMemoireProps {
  first_author_matricule: string;
  first_author_firstname: string;
  first_author_lastname: string;
  first_author_email: string;
  first_author_phone: string;

  second_author_matricule: string;
  second_author_firstname: string;
  second_author_lastname: string;
  second_author_email: string;
  second_author_phone: string;

  theme: string;
  start_at: string;
  ends_at: string;
  sector_id: number;
  soutenance_id: number;
  jury_president_name: string;
  memory_master_name: string;
  memory_master_email: string;
  file_path: File;
  cover_page_path: File;

  setErrors: Dispatch<SetStateAction<DepotMemoireErrorType>>;
  setStatus: Dispatch<SetStateAction<string | null>>;
}

export interface ValidateMemoryProps {
  supportedMemory: number;
}

export interface RejectMemoryProps {
  supportedMemory: number;
  reason: string;
} 