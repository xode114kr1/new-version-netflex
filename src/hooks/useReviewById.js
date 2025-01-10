import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchReviewById = (id) => {
  return api.get(`/movie/${id}/reviews`);
};

export const useReviewByIdQuery = (id) => {
  return useQuery({
    queryKey: ["review", id],
    queryFn: () => fetchReviewById(id),
    select: (result) => result.data.results,
  });
};
