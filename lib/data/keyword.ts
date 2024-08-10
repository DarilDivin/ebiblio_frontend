import { useKeyword } from "@/services/queries"
import { useRouter } from "next/navigation";

export const getAllKeywords = () => {
  const { data: keywordsResponse, isLoading, error } = useKeyword();
  const router = useRouter();
  if (error && error.response.status === 403) {
    router.push('/home')
  }
  return {
    keywords: keywordsResponse?.data,
    keywordValues: keywordsResponse?.data.map(keywordValue => keywordValue.keyword),
    isLoading,
    error
  }
}