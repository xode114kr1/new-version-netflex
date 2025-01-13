import React, { useState } from "react";
import "./SortBox.style.css";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import { FiAlignJustify, FiX } from "react-icons/fi";

const SortBox = ({ sortBy, setSortBy, sortMovies }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleSortByButton = (keyword) => {
    setSortBy(keyword);
    // sortMovies(keyword);
    setIsOpen(true);
  };
  const handleSortListClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="sort-box">
      <div className="sort-box-header">
        Sort
        {isOpen ? (
          <FiAlignJustify className="sort-icon" onClick={handleSortListClick} />
        ) : (
          <FiX className="sort-icon" onClick={handleSortListClick} />
        )}
      </div>
      <div className="sort-box-main">
        {isOpen ? (
          <div className="sort-standard-show">
            <h4>Sort Result By</h4>
            <div style={{ color: "blue", fontSize: "15px", width: "150px" }}>
              Sort by
            </div>
            <div
              style={{
                borderBottom: "2px solid rgb(250, 250, 250)",
                width: "150px",
              }}
            >
              {sortBy == "none" ? "-" : sortBy}
            </div>
          </div>
        ) : (
          <div className="sort-list-show">
            <Container className="contanier sort-by">
              <Row>
                <Col className="col sort-by">
                  <button
                    className="sort-by-button"
                    onClick={() => handleSortByButton("none")}
                  >
                    none
                  </button>
                </Col>
              </Row>
              <Row>
                <Col className="col sort-by">
                  <button
                    className="sort-by-button"
                    onClick={() => handleSortByButton("Popularity(Asc)")}
                  >
                    Popularity(Asc)
                  </button>
                </Col>
                <Col className="col sort-by">
                  <button
                    className="sort-by-button"
                    onClick={() => handleSortByButton("Popularity(Desc)")}
                  >
                    Popularity(Desc)
                  </button>
                </Col>
              </Row>
              <Row>
                <Col className="col sort-by">
                  <button
                    className="sort-by-button"
                    onClick={() => handleSortByButton("Vote(Asc)")}
                  >
                    Vote(Asc)
                  </button>
                </Col>
                <Col className="col sort-by">
                  <button
                    className="sort-by-button"
                    onClick={() => handleSortByButton("Vote(Desc)")}
                  >
                    Vote(Desc)
                  </button>
                </Col>
              </Row>
            </Container>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortBox;
