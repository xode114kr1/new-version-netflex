import React from "react";
import "./MovieSlider.style.css";
import MovieCard from "../MovieCard/MovieCard";
import Carousel from "react-multi-carousel";
const MovieSlider = ({ title, movies, responsive }) => {
  return (
    <div>
      <h3>{title}</h3>
      <Carousel
        infinite={true}
        centerMode={true}
        itenClass="movie-slider p-1"
        containerClass="carousel-contanier"
        responsive={responsive}
      >
        {movies.map((movie, index) => (
          <MovieCard movie={movie} index={index} />
        ))}
      </Carousel>
    </div>
  );
};

export default MovieSlider;
