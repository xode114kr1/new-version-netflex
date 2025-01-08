import React from "react";
import "./MovieSlider.style.css";
import MovieCard from "../MovieCard/MovieCard";
import Carousel from "react-multi-carousel";
import { useNavigate } from "react-router-dom";
const MovieSlider = ({ title, movies, responsive }) => {
  const navigate = useNavigate();
  const handleCardClick = (movie) => {
    navigate(`/movies/${movie.id}`);
  };
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
          <MovieCard
            movie={movie}
            index={index}
            handleCardClick={() => handleCardClick(movie)}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default MovieSlider;
