import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTopratedMovies = () => {
  return api.get(`/movie/top_rated`);
};

export const useTopratedMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-toprated"],
    queryFn: fetchTopratedMovies,
    select: (result) => result.data,
  });
};
