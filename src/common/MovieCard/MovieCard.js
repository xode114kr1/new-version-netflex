import React from "react";
import "./MovieCard.style.css";
import { Badge } from "react-bootstrap";

const MovieCard = ({ movie, index }) => {
  return (
    <div
      style={{
        backgroundImage:
          "url(https://media.themoviedb.org/t/p/w300_and_h450_bestv2" +
          `${movie.poster_path}` +
          ")",
      }}
      className="movie-card"
    >
      <div className="overlay">
        <h3>{movie.title}</h3>
        {movie.genre_ids.map((id) => (
          <Badge bg="danger">{id}</Badge>
        ))}
        <div>
          <div>{movie.vote_average}</div>
          <div>{movie.popularity}</div>
          <div>{movie.adult ? "over18" : "under18"}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
