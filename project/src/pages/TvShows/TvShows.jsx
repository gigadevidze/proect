import { useEffect, useState } from "react";
import { getTvShows } from "../../tdmb";
import "./TvShovs.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const TvShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        const data = await getTvShows();
        setTvShows(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTvShows();
  }, []);

  if (loading) {
    return <h2>სერიალები იტვირთება...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="tv-shows">
      <h1>პოპულარული სერიალები</h1>

      <div className="tv-shows-list">
        {tvShows.map((show) => (
          <div key={show.id} className="tv-show-card">
            <img
              src={
                show.poster_path
                  ? `${IMAGE_BASE_URL}${show.poster_path} `
                  : "/no-image.png"
              }
              alt={show.name}
            />

            <h3>{show.name}</h3>

            <p>რეიტინგი: {show.vote_average.toFixed(1)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TvShows;
