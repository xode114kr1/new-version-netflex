import React from "react";
import { useTopratedMoviesQuery } from "../../../../hooks/useTopratedMovies";
import { Alert } from "react-bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsice";

const TopratedMovieSlide = () => {
  const { data, isLoading, isError, error } = useTopratedMoviesQuery();

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div>
      <MovieSlider
        title="Top Rated Movies"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default TopratedMovieSlide;
