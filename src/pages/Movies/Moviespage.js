import React, { useEffect, useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import "./Moviespage.style.css";
import SortBox from "./components/SortBox";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

// 경로 2가지
// 1. nav 바에서 클릭해서 온 경우 => popularMovie 보여줌
// 2. ketword를 입력해서 온 경우 => keyword와 관련된 영화들을 보여줌

const Moviespage = () => {
  // useNavigate
  const navigate = useNavigate();
  // useParams
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");

  // useStates
  const [filterList, setFilterList] = useState([]);
  const [page, setPage] = useState(1);
  const [sortedMovies, setSortedMovies] = useState([]);
  const [sortBy, setSortBy] = useState("none");

  // hooks
  const { data: genreData } = useMovieGenreQuery();
  const { data, isloading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });

  // function
  const handleCardClick = (movie) => {
    navigate(`/movies/${movie.id}`);
  };

  const handlePageChange = ({ selected }) => {
    setPage(selected + 1);
  };

  const handleFilterClick = (id) => {
    setFilterList((prev) =>
      prev.includes(id)
        ? prev.filter((genreId) => genreId !== id)
        : [...prev, id]
    );
  };

  const isClickedButton = (id) => filterList.includes(id);

  const sortMovies = (filtered) => {
    if (sortBy === "none") {
      const sorted = [...filtered];
      setSortedMovies(sorted);
    }
    if (sortBy === "Popularity(Asc)") {
      const sorted = [...filtered].sort((a, b) => a.popularity - b.popularity);
      setSortedMovies(sorted);
    }
    if (sortBy === "Popularity(Desc)") {
      const sorted = [...filtered].sort((a, b) => b.popularity - a.popularity);
      setSortedMovies(sorted);
    }
    if (sortBy === "Vote(Asc)") {
      const sorted = [...filtered].sort(
        (a, b) => a.vote_average - b.vote_average
      );
      setSortedMovies(sorted);
    }
    if (sortBy === "Vote(Desc)") {
      const sorted = [...filtered].sort(
        (a, b) => b.vote_average - a.vote_average
      );
      setSortedMovies(sorted);
    }
  };

  // useEffect
  useEffect(() => {
    if (data && data?.results) {
      setSortedMovies(data?.results);
    }
  }, [data]);

  useEffect(() => {
    const filtered = data?.results.filter((item) =>
      filterList.every((val) => item?.genre_ids.includes(val))
    );
    if (filtered) {
      sortMovies(filtered);
    }
  }, [filterList, sortBy, data]);

  // console.log

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
      {/* <Row>
        <Col lg={4} sm={12} xs={12}>
          <div className="filter-contanier">
            <SortBox
              sortBy={sortBy}
              sortMovies={sortMovies}
              setSortBy={setSortBy}
            />
            <div className="filter-Box">
              {genreData?.map((genre, index) => (
                <button
                  className={
                    isClickedButton(genre.id)
                      ? "genre-button clicked"
                      : "genre-button"
                  }
                  onClick={() => handleFilterClick(genre.id)}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>
        </Col>
        <Col lg={8} sm={12} xs={12}>
          <Row>
            {sortedMovies?.map((movie, index) => (
              <Col
                key={index}
                lg={4}
                sm={6}
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
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
      <div style={{ marginTop: "40px" }}>
        {" "}
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
      </div> */}
    </Container>
  );
};

export default Moviespage;
