import { useRole } from "@/services/queries"
import { useRouter } from "next/navigation";

export const getAllRole = () => {
  const { data: roleResponse, isLoading, error } = useRole();
  const router = useRouter();
  if (error && error.response.status === 403) {
    router.push('/home')
  }
  return { roles: roleResponse?.data, isLoading, error };
}