import { useStatistics } from "@/services/queries"
import { useRouter } from "next/navigation";

export const getAllStatistics = () => {
  const { data: statisticsResponse, isLoading, error } = useStatistics();
  const router = useRouter();
  if (error && error.response.status === 403) {
    router.push('/home')
  }

  return {
    statistics: statisticsResponse,
    isLoading,
    error
  };
}