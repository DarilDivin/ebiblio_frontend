export interface LastConfigResponse {
  message: string
  data: LastConfig
}

export interface LastConfig {
  id: number
  school_name: string
  school_acronym: string
  school_city: string
  eneamien_subscribe_amount: number
  extern_subscribe_amount: number
  student_debt_amount: number
  teacher_debt_amount: number
  student_loan_delay: number
  teacher_loan_delay: number
  student_renewals_number: number
  teacher_renewals_number: number
  max_books_per_student: number
  max_books_per_teacher: number
  max_copies_books_per_student: number
  max_copies_books_per_teacher: number
  created_at: string
  updated_at: string
  created_by: string
  updated_by: any
}