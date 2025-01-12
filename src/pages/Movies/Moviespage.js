import React, { useEffect, useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import "./Moviespage.style.css";
import SortBox from "./components/SortBox";

// 경로 2가지
// 1. nav 바에서 클릭해서 온 경우 => popularMovie 보여줌
// 2. ketword를 입력해서 온 경우 => keyword와 관련된 영화들을 보여줌

const Moviespage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();

  const [page, setPage] = useState(1);
  const [sortedMovies, setSortedMovies] = useState([]);
  const [sortBy, setSortBy] = useState("none");

  const keyword = query.get("q");
  const { data, isloading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });

  const handleCardClick = (movie) => {
    navigate(`/movies/${movie.id}`);
  };

  const handlePageChange = ({ selected }) => {
    setPage(selected + 1);
  };

  const sortMovies = (keyword) => {
    setSortBy(keyword);
    if (keyword === "none") {
      const sorted = [...data?.results];
      setSortedMovies(sorted);
    }
    if (keyword === "Popularity(Asc)") {
      const sorted = [...data?.results].sort(
        (a, b) => a.popularity - b.popularity
      );
      setSortedMovies(sorted);
    }
    if (keyword === "Popularity(Desc)") {
      const sorted = [...data?.results].sort(
        (a, b) => b.popularity - a.popularity
      );
      setSortedMovies(sorted);
    }
    if (keyword === "Vote(Asc)") {
      const sorted = [...data?.results].sort(
        (a, b) => a.vote_average - b.vote_average
      );
      setSortedMovies(sorted);
    }
    if (keyword === "Vote(Desc)") {
      const sorted = [...data?.results].sort(
        (a, b) => b.vote_average - a.vote_average
      );
      setSortedMovies(sorted);
    }
  };

  useEffect(() => {
    if (data && data?.results) {
      setSortedMovies(data?.results);
    }
  }, [data]);

  if (isloading) {
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
    <Container className="contanier moviepage">
      <Row>
        <Col lg={4} sm={12} xs={12} className="filter-contanier">
          <SortBox sortBy={sortBy} sortMovies={sortMovies} />
        </Col>
        <Col lg={8} sm={12} xs={12}>
          <Row>
            {sortedMovies?.map((movie, index) => (
              <Col key={index} lg={4} sm={6} xs={12}>
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
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={data?.total_pages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
        forcePage={page - 1}
      />
    </Container>
  );
};

export default Moviespage;
