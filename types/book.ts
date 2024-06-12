import { Dispatch, SetStateAction } from "react";
import { SchoolYear } from "./schoolyear"
import { Keyword } from "./keyword";

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
  keywords: Keyword[]
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
  available_stock?: number
  available?: number
  loaned?: number
  has_ebooks?: number
  is_physical?: number
  has_audios?: number
  likes_number?: number | null
  views_number?: number | null
  stars_number?: number
  keywords: string[]
  file_path?: File
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
  available_stock?: number
  available?: number
  loaned?: number
  has_ebooks?: number
  is_physical?: number
  has_audios?: number
  likes_number?: number | null
  views_number?: number | null
  stars_number?: number
  keywords: string[]
  file_path?: File | null
  school_year_id: number

  article: number
  setErrors: Dispatch<SetStateAction<CreateBookErrorType>>
  setStatus: Dispatch<SetStateAction<string | null>>
}

export interface GetOneBookResponse {
  message: string
  data: SingleBook
}

export interface SingleBook {
  id: number
  title: string
  slug: string
  summary: string
  author: string
  editor: string
  editing_year: string
  cote: string
  number_pages: number
  IBSN: any
  available_stock: any
  available: number
  loaned: number
  has_ebooks: number
  is_physical: number
  has_audios: number
  likes_number: number
  views_number: number
  stars_number: number
  file_path: any
  created_at: string
  updated_at: string
  created_by: any
  updated_by: any
  school_year_id: number
  comments: Comment[]
  keywords: Keyword[]
}

export interface Comment {
  id: number
  content: string
  likes_number: number
  created_by: any
  updated_by: any
  deleted_by: any
  created_at: string
  updated_at: string
  deleted_at: any
  article_id: number
  user_id: number
  user: User
}

export interface User {
  id: number
  name: any
  matricule: string
  firstname: string
  lastname: string
  slug: string
  email: string
  email_verified_at: string
  two_factor_secret: any
  two_factor_recovery_codes: any
  two_factor_confirmed_at: any
  phone_number: string
  birth_date: string
  sex: string
  profile_picture_path: any
  has_paid: number
  has_access: number
  debt_amount: number
  created_by: any
  updated_by: any
  deleted_by: any
  created_at: string
  updated_at: string
  deleted_at: any
}

