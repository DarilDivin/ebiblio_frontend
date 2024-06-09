export interface GetAllSchoolYearResponse {
  data: SchoolYear[]
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

export interface SchoolYear {
  id: number
  start_date: string
  end_date: string
  school_year: string
  created_at: string
  updated_at: string
  created_by: any
  updated_by: any
}
