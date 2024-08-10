import { useSchoolYear } from "@/services/queries"
import { useRouter } from "next/navigation";

export const getAllSchoolYear = () => {
  const { data: schoolYearResponse, isLoading, error } = useSchoolYear();
  const router = useRouter();
  if (error && error.response.status === 403) {
    router.push('/home')
  }
  return schoolYearResponse?.data
}
