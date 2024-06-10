export interface GetAllKeywordResponse {
  data: Keyword[]
}

export interface Keyword {
  id: number
  keyword: string
  likes_number: any
  created_at: string
  updated_at: string
  created_by: any
  updated_by: any
}