import React from "react";
import Banner from "./components/Banner/Banner";
import PopularMovieSlide from "./components/PopularMovieSlide/PopularMovieSlide";
import TopratedMovieSlide from "./components/TopratedMovieSlide/TopratedMovieSlide";
import UpcomingMovieSlide from "./components/UpcomingMovieSlide/UpcomingMovieSlide";

// 1. 베너 = popular 영화의 첫번 째 아이템으로 설정
// 2. populat, top rated, upcomming movies

const Homapage = () => {
  return (
    <div>
      <Banner />
      <PopularMovieSlide />
      <TopratedMovieSlide />
      <UpcomingMovieSlide />
    </div>
  );
};

export default Homapage;
