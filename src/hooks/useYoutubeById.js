import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchYoutubeById = (id) => {
  return api.get(`/movie/${id}/videos`);
};

export const useYoutubeByIdQuery = (id) => {
  return useQuery({
    queryKey: ["youtube-id", id],
    queryFn: () => fetchYoutubeById(id),
    select: (result) => result.data.results,
  });
};
