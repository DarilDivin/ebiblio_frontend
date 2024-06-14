export interface GetAllUserResponse {
  data: User[]
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

export interface User {
  id: number
  matricule?: string
  firstname?: string
  lastname?: string
  slug?: string
  email: string
  email_verified_at?: string
  password: string
  two_factor_secret?: string
  two_factor_recovery_codes?: string
  two_factor_confirmed_at?: string
  phone_number?: string
  birth_date?: string
  sex?: string
  profile_picture_path?: any
  has_paid: number
  has_access: number
  debt_amount: number
  remember_token?: string
  created_at?: string
  updated_at?: string
  created_by?: any
  updated_by?: any
  roles?: Role[]
  permissions?: Permission[]
}

export interface Role {
  id: number
  name: string
  slug: string
  guard_name: string
  created_by: any
  updated_by: any
  deleted_by: any
  created_at: string
  updated_at: string
  deleted_at: any
  role_type_id: number
  pivot: Pivot
}

export interface Pivot {
  model_type: string
  model_id: number
  role_id: number
}

export interface Permission {
  id: number
  name: string
  slug: string
  guard_name: string
  created_by: any
  updated_by: any
  deleted_by: any
  created_at: string
  updated_at: string
  deleted_at: any
  pivot: Pivot2
}

export interface Pivot2 {
  model_type: string
  model_id: number
  permission_id: number
}

export interface Links {
  first: string
  last: string
  prev: any
  next: any
}

export interface Meta {
  current_page: number
  from: number
  last_page: number
  links: Link[]
  path: string
  per_page: number
  to: number
  total: number
}

export interface Link {
  url?: string
  label: string
  active: boolean
}
