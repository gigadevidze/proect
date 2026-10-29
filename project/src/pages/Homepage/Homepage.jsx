import { useEffect, useState } from "react";
import { getPopularMovies } from "../../tdmb";
import "./Homepage.css";

const Homepage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await getPopularMovies();
        setMovies(data);
      } catch (err) {
        setError(err.message || "ფილმების ჩატვირთვა ვერ მოხერხდა");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  if (loading) {
    return <p className="movies-status">ფილმები იტვირთება...</p>;
  }

  if (error) {
    return <p className="movies-status">{error}</p>;
  }

  return (
    <section className="movies-section">
      <h2 className="movies-heading">პოპულარული ფილმები</h2>

      <div className="movies-grid">
        {movies.map((movie) => (
          <article className="movie-card" key={movie.id}>
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
                loading="lazy"
              />
            ) : (
              <div className="movie-poster movie-poster-empty">
                პოსტერი არ არის
              </div>
            )}

            <div className="movie-info">
              <h3>{movie.title}</h3>

              <div className="movie-meta">
                <span>{movie.release_date?.slice(0, 4) || "—"}</span>
                <span className="movie-rating">
                  ★ {Number(movie.vote_average || 0).toFixed(1)}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Homepage;
