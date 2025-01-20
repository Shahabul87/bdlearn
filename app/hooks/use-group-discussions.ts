import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

interface UseGroupDiscussionsProps {
  groupId: string;
  page?: number;
  limit?: number;
}

export const useGroupDiscussions = ({ groupId, page = 1, limit = 10 }: UseGroupDiscussionsProps) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/groups/${groupId}/discussions?page=${page}&limit=${limit}`,
    fetcher
  );

  return {
    discussions: data?.discussions || [],
    metadata: data?.metadata,
    isLoading,
    error,
    mutate,
  };
}; 