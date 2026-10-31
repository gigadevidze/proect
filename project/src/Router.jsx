import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Movies from "./pages/Moveis/Movies";
import TvShows from "./pages/TvShows/TvShows";
import SearchResults from "./pages/SearchResults/SearchResults";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/tvshows" element={<TvShows />} />
      <Route path="/search" element={<SearchResults />} />
    </Routes>
  );
};

export default Router;
