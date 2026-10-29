import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Movies from "./pages/Moveis/Movies";
import TvShows from "./pages/TvShows/TvShows";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/tvshows" element={<TvShows />} />
    </Routes>
  );
};

export default Router;
