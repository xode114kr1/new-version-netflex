import React from "react";
import "react-multi-carousel/lib/styles.css";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { Alert, Spinner } from "react-bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsice";
import "./PopularMovieSlide.style.css";

const PopularMovieSlide = () => {
  const { data, isLoaing, isError, error } = usePopularMoviesQuery();
  if (isLoaing) {
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
    return <Alert varient="danger">{error.message}</Alert>;
  }
  if (!data) {
    return <div></div>;
  }
  return (
    <div>
      <MovieSlider
        title="Popular Movies"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default PopularMovieSlide;
