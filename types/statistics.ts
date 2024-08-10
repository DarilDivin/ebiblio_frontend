export interface GetAllStatisticsResponse {
  message: string
  usersCount: number
  managersNumber: number
  teachersNumber: number
  eneamiensNumber: number
  externesNumber: number
  memoriesCount: number
  validMemoriesCount: number
  invalidMemoriesCount: number
  booksCount: number
  ebooksCount: number
  physicalBooksCount: number
  memoriesMonthlyStats: MemoriesMonthlyStats
  ebooksMonthlyStats: EbooksMonthlyStats
  physicalMonthlyStats: PhysicalMonthlyStats
}

export interface MemoriesMonthlyStats {
  janvier?: Months
  fevrier?: Months
  mars?: Months
  avril?: Months
  mai?: Months
  juin?: Months
  juillet?: Months
  aout?: Months
  septembre?: Months
  octobre?: Months
  novembre?: Months
  decembre?: Months
}

export interface Months {
  Invalidé?: number
  Validé?: number
}

export interface EbooksMonthlyStats {
  janvier?: number
  fevrier?: number
  mars?: number
  avril?: number
  mai?: number
  juin?: number
  juillet?: number
  aout?: number
  septembre?: number
  octobre?: number
  novembre?: number
  decembre?: number
}

export interface PhysicalMonthlyStats {
  janvier?: number
  fevrier?: number
  mars?: number
  avril?: number
  mai?: number
  juin?: number
  juillet?: number
  aout?: number
  septembre?: number
  octobre?: number
  novembre?: number
  decembre?: number
}
