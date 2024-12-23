import React from "react";
import "./TopratedMovieSlide.style.css";
import { useTopratedMoviesQuery } from "../../../../hooks/useTopratedMovies";
import Carousel from "react-multi-carousel";
import { Alert } from "react-bootstrap";
import MovieCard from "../MovieCard/MovieCard";

const TopratedMovieSlide = () => {
  const { data, isLoading, isError, error } = useTopratedMoviesQuery();
  console.log(data);
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
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div>
      <h3>Top Rated Movies</h3>
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

export default TopratedMovieSlide;
