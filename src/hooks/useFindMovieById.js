import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const findMovieById = (id) => {
  return api.get(`/movie/${id}`);
};

export const useFineMovieByIdQuery = (id) => {
  return useQuery({
    queryKey: ["movie-by-id", id],
    queryFn: () => findMovieById(id),
    select: (result) => result.data,
  });
};
