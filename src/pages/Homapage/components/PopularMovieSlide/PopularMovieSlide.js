import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./PopularMovieSlide.style.css";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { Alert } from "bootstrap";
import MovieCard from "../MovieCard/MovieCard";

const PopularMovieSlide = () => {
  const { data, isLoaing, isError, error } = usePopularMoviesQuery();
  console.log(data);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
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
  if (isLoaing) {
    return <h1>Loading</h1>;
  }
  if (isError) {
    return <Alert varient="danger">{error.message}</Alert>;
  }
  return (
    <div>
      <h3>Popular movies</h3>
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

export default PopularMovieSlide;
