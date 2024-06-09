import { useSchoolYear } from "@/services/queries"

export const getAllSchoolYear = () => {
  const { data: schoolYearResponse, isLoading, error } = useSchoolYear();

  return schoolYearResponse?.data
}
