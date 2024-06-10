import { useKeyword } from "@/services/queries"

export const getAllKeywords = () => {
  const { data: keywordsResponse, isLoading, error } = useKeyword();

  return {
    keywords: keywordsResponse?.data,
    keywordValues: keywordsResponse?.data.map(keywordValue => keywordValue.keyword),
    isLoading,
    error
  }
}