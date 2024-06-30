export interface GetAllLoanResponse {
  data: Loan[]
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

export interface Loan {
  id: number
  title: string
  slug: string
  status: string
  duration: number
  renewals: number
  loan_date: string
  accepted_at?: string
  processing_date?: string
  book_must_returned_on?: string
  book_recovered_at?: string
  book_returned_at?: string
  created_at: string
  updated_at: string
  created_by: string
  updated_by?: string
  article: Book
  user: User
}

interface Book {
  id: number
  type: string
  title: string
  slug: string
  summary: string
  author: string
  editor: string
  editing_year: string
  cote: string
  number_pages: number
  ISBN: string
  available_stock: number
  available: number
  loaned: number
  reserved: number
  has_ebooks: number
  is_physical: number
  has_audios: number
  thumbnail_path: any
  file_path: any
  files_paths: any
  likes_number: number
  views_number: number
  stars_number: number
  created_by: any
  updated_by?: string
  deleted_by: any
  created_at: string
  updated_at: string
  deleted_at: any
  school_year_id: number
}

interface User {
  id: number
  matricule: any
  firstname: string
  lastname: string
  slug: string
  email: string
  email_verified_at: any
  two_factor_secret: any
  two_factor_recovery_codes: any
  two_factor_confirmed_at: any
  phone_number: any
  birth_date: any
  sex: any
  profile_picture_path: any
  has_paid: number
  has_access: number
  can_do_loan_request: number
  can_reniew_loan_request: number
  debt_amount: number
  created_by: any
  updated_by: any
  deleted_by: any
  created_at: string
  updated_at: string
  deleted_at: any
}
