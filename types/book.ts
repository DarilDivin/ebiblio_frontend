import { Dispatch, SetStateAction } from "react";
import { SchoolYear } from "./schoolyear"

export interface GetAllBookResponse {
  data: Book[]
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

export interface Book {
  id: number
  title: string
  slug: string
  summary: string
  author: string
  editor: string
  editing_year: string
  cote: string
  number_pages: number
  ISBN: string
  available_stock: string
  available: number
  loaned: number
  has_ebooks: number
  is_physical: number
  has_audios: number
  likes_number: number
  views_number: number
  stars_number: number
  file_path: string | null
  created_at: string
  updated_at: string
  created_by: string | null
  updated_by: string | null
  school_year: SchoolYear
}

export interface CreateBookErrorType {
  title?: string[]
  slug?: string[]
  summary?: string[]
  author?: string[]
  editor?: string[]
  editing_year?: string[]
  cote?: string[]
  number_pages?: string[]
  ISBN?: string[]
  available_stock?: string[]
  available?: string[]
  loaned?: string[]
  has_ebooks?: string[]
  is_physical?: string[]
  has_audios?: string[]
  likes_number?: string[]
  views_number?: string[]
  stars_number?: string[]
  keywords?: string[]
  file_path?: string[]
  school_year_id?: string[]
}

export interface CreateBookProps {
  title: string
  slug?: string
  summary: string
  author: string
  editor: string
  editing_year: string
  cote: string
  number_pages: number
  ISBN: string
  available_stock: number
  available?: number
  loaned?: number
  has_ebooks?: number
  is_physical?: number
  has_audios?: number
  likes_number?: number | null
  views_number?: number | null
  stars_number?: number
  keywords: string[]
  file_path: File
  school_year_id: number

  setErrors: Dispatch<SetStateAction<CreateBookErrorType>>
  setStatus: Dispatch<SetStateAction<string | null>>
}

export interface UpdateBookProps {
  title: string
  slug?: string
  summary: string
  author: string
  editor: string
  editing_year: string
  cote: string
  number_pages: number
  ISBN: string
  available_stock: number
  available?: number
  loaned?: number
  has_ebooks?: number
  is_physical?: number
  has_audios?: number
  likes_number?: number | null
  views_number?: number | null
  stars_number?: number
  keywords: string[]
  file_path: File | null
  school_year_id: number

  article: number
  setErrors: Dispatch<SetStateAction<CreateBookErrorType>>
  setStatus: Dispatch<SetStateAction<string | null>>
}
