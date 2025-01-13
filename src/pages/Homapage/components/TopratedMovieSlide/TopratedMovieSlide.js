import React from "react";
import { useTopratedMoviesQuery } from "../../../../hooks/useTopratedMovies";
import { Alert, Spinner } from "react-bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsice";

const TopratedMovieSlide = () => {
  const { data, isLoading, isError, error } = useTopratedMoviesQuery();

  if (isLoading) {
    return (
      <div className="spinner-area">
        <Spinner
          animation="border"
          variant="danger"
          style={{ width: "5rem", height: "5rem" }}
        />
      </div>
    );
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
