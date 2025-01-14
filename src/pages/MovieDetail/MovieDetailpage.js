import React, { useState } from "react";
import "./MovieDetailpage.style.css";
import { useNavigate, useParams } from "react-router-dom";
import { useFineMovieByIdQuery } from "../../hooks/useFindMovieById";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { useReviewByIdQuery } from "../../hooks/useReviewById";
import { useRecommendationMovieByIdQuery } from "../../hooks/useRecommedationMovieById";
import MovieCard from "../../common/MovieCard/MovieCard";
import PreviewModal from "./components/PreviewModal";

const MovieDetailpage = () => {
  const navigate = useNavigate();
  const handleCardClick = (movie) => {
    navigate(`/movies/${movie.id}`);
  };

  const [isModalShow, setIsModalShow] = useState(false);
  const [isReviewShow, setIsReviewShow] = useState(false);
  const [isRecommendationMovieShow, setIsRecommendationMovieShow] =
    useState(false);
  const { id } = useParams();
  const { data: movie, isLoaing, isError, error } = useFineMovieByIdQuery(id);
  const { data: reviews } = useReviewByIdQuery(id);
  const { data: recommendationMovie } = useRecommendationMovieByIdQuery(id);

  const budget = movie?.budget;
  const formattedBudget = new Intl.NumberFormat("en-US").format(budget);
  const revenue = movie?.revenue;
  const formattedRevenue = new Intl.NumberFormat("en-US").format(revenue);

  if (isLoaing || !movie || !reviews || !recommendationMovie) {
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
    return <Alert variant="danger">{error}</Alert>;
  }

  const handleReviewButton = () => {
    setIsReviewShow(!isReviewShow);
    setIsRecommendationMovieShow(false);
  };

  const handleRecommadationButton = () => {
    setIsRecommendationMovieShow(!isRecommendationMovieShow);
    setIsReviewShow(false);
  };

  const handleModalClose = () => {
    setIsModalShow(false);
  };

  const handlePreviewButton = () => {
    setIsModalShow(true);
  };

  return (
    <Container style={{ padding: "2rem", margin: "0px" }}>
      <PreviewModal
        isModalShow={isModalShow}
        handleModalClose={handleModalClose}
        id={id}
      />

      <Row>
        <Col
          lg={4}
          sm={0}
          className="movie-image"
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
            <div className="vote-icon" style={{ marginLeft: "20px" }}>
              P
            </div>
            <div>{movie.popularity}</div>
          </div>
          <div className="detail-overview">{movie.overview}</div>
          <div className="detail-etc-contanier">
            <div className="etc-box">Budget</div>
            <div>$ {formattedBudget}</div>
          </div>
          <div className="detail-etc-contanier">
            <div className="etc-box">Revenue</div>
            <div>$ {formattedRevenue}</div>
          </div>
          <div className="detail-etc-contanier">
            <div className="etc-box">Release Date</div>
            <div> {movie.release_date}</div>
          </div>
          <div className="detail-etc-contanier">
            <div className="etc-box">Run Time</div>
            <div> {movie.runtime} min</div>
          </div>
        </Col>
      </Row>

      <div className="preview-button-contanier">
        <button className="low-button" onClick={handlePreviewButton}>
          Preview
        </button>
      </div>
      <div className="button-contanier">
        <button
          className={`low-button ${isReviewShow ? "open" : ""}`}
          onClick={handleReviewButton}
        >
          Review ({Object.keys(reviews).length})
        </button>
        <button
          className={`low-button ${isRecommendationMovieShow ? "open" : ""}`}
          onClick={handleRecommadationButton}
        >
          Recommendation Movie ({Object.keys(recommendationMovie).length})
        </button>
      </div>
      <Row>
        <Col style={{ display: isReviewShow ? "block" : "none" }}>
          {reviews.map((review, index) => (
            <div className="review-contanier">
              <div className="review-author">{review.author}</div>
              <div className="review-content">{review.content}</div>
            </div>
          ))}
        </Col>
        <Col style={{ display: isRecommendationMovieShow ? "block" : "none" }}>
          <Row>
            {recommendationMovie.map((movie, index) => (
              <Col>
                {" "}
                <MovieCard
                  movie={movie}
                  index={index}
                  handleCardClick={handleCardClick}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetailpage;
