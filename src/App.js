import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AppLayout from "./layout/AppLayout";
import Homapage from "./pages/Homapage/Homapage";
import Moviespage from "./pages/Movies/Moviespage";
import MovieDetailpage from "./pages/MovieDetail/MovieDetailpage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import "./App.css";

// 홈페이지 /
// 영화 전체 보여주는 페이지 (서치 기능) / movies
// 영화 디테일 페이지 /movies/:id

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homapage />} />
          <Route path="/movies">
            <Route path="" element={<Moviespage />} />
            <Route path=":id" element={<MovieDetailpage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
