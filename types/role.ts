export interface GetAllRoleResponse {
  data: Role[];
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

export interface Role {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
  created_by: any;
  updated_by: any;
  permissions: Permission[];
}

export interface Permission {
  id: number;
  name: string;
  slug: string;
  guard_name: string;
  created_by: any;
  updated_by: any;
  deleted_by: any;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  pivot: Pivot;
}

export interface Pivot {
  role_id: number;
  permission_id: number;
}
