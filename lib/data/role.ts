import { useRole } from "@/services/queries"

export const getAllRole = () => {
  const { data: roleResponse, isLoading, error } = useRole();

  return { roles: roleResponse?.data, isLoading, error };
}