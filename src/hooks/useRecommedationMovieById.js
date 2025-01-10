import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchRecommendationMovieById = (id) => {
  return api.get(`/movie/${id}/recommendations`);
};

export const useRecommendationMovieByIdQuery = (id) => {
  return useQuery({
    queryKey: ["recommedation-movie", id],
    queryFn: () => fetchRecommendationMovieById(id),
    select: (result) => result.data.results,
  });
};
