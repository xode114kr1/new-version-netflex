import React from "react";
import "./MovieDetailpage.style.css";
import { useParams } from "react-router-dom";
import { useFineMovieByIdQuery } from "../../hooks/useFindMovieById";
import { Alert, Col, Container, Row } from "react-bootstrap";

const MovieDetailpage = () => {
  const { id } = useParams();
  const { data: movie, isLoaing, isError, error } = useFineMovieByIdQuery(id);

  const budget = movie?.budget;
  const formattedBudget = new Intl.NumberFormat("en-US").format(budget);
  const revenue = movie?.revenue;
  const formattedRevenue = new Intl.NumberFormat("en-US").format(revenue);

  if (isLoaing || !movie) {
    return <h1>Loading</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error}</Alert>;
  }
  console.log(movie);
  return (
    <Container style={{ padding: "2rem" }}>
      <Row style={{ height: "70vh" }}>
        <Col
          lg={4}
          sm={0}
          style={{
            background: `url("http://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}") no-repeat center`,
          }}
        ></Col>
        <Col lg={8} sm={12} className="detail-contanier">
          <div className="detail-genre">
            {movie.genres.map((genre, index) => (
              <div className="genre-item">{genre.name}</div>
            ))}
          </div>
          <div className="detail-title">{movie.title}</div>
          <div className="detail-tagline">{movie.tagline}</div>
          <div className="detail-vote">
            <div className="vote-icon">V</div>
            <div>{movie.vote_average}</div>
            <div className="vote-icon">P</div>
            <div>{movie.popularity}</div>
          </div>
          <div className="detail-overview">{movie.overview}</div>
          <div className="detail-etc-contanier">
            <div className="etc-box">Budget</div>
            <div>$ {formattedBudget}</div>
          </div>
          <div className="detail-etc-contanier">
            <div className="etc-box">revenue</div>
            <div>$ {formattedRevenue}</div>
          </div>
          <div className="detail-etc-contanier">
            <div className="etc-box">release date</div>
            <div> {movie.release_date}</div>
          </div>
          <div className="detail-etc-contanier">
            <div className="etc-box">runtime</div>
            <div> {movie.runtime}분</div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>Review</div>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetailpage;
