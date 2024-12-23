import React from "react";
import "./UpcomingMovieSlide.style.css";
import { useUpcomingMoviesQuery } from "../../../../hooks/useUpcomingMovies";
import { Alert } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import MovieCard from "../MovieCard/MovieCard";

const UpcomingMovieSlide = () => {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (isError) {
    return <Alert>{error.message}</Alert>;
  }
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div>
      <h3>UpcomingMovieSlide</h3>
      <Carousel
        infinite={true}
        centerMode={true}
        itenClass="movie-slider p-1"
        containerClass="carousel-contanier"
        responsive={responsive}
      >
        {data.results.map((movie, index) => (
          <MovieCard movie={movie} index={index} />
        ))}
      </Carousel>
    </div>
  );
};

export default UpcomingMovieSlide;
