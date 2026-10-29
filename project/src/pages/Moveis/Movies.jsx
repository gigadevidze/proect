import { useEffect, useState } from "react";
import { getMovies } from "../../tdmb";
import "./Movies.css";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await getMovies();
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
      <div className="movies-header">
        <h2 className="movies-heading">ფილმები</h2>
        <span className="movies-count">{movies.length} ფილმი</span>
      </div>

      <div className="movies-grid">
        {movies.map((movie) => (
          <article className="movie-card" key={movie.id}>
            <div className="movie-poster-wrapper">
              {movie.poster_path ? (
                <img
                  src={`${IMAGE_BASE}${movie.poster_path}`}
                  alt={movie.title || movie.original_title}
                  className="movie-poster"
                  loading="lazy"
                />
              ) : (
                <div className="movie-poster movie-poster-empty">
                  პოსტერი არ არის
                </div>
              )}

              <span className="movie-rating">
                <span aria-hidden="true">★</span>{" "}
                {Number(movie.vote_average || 0).toFixed(1)}
              </span>
            </div>

            <div className="movie-info">
              <h3 className="movie-title">
                {movie.title || movie.original_title}
              </h3>

              <div className="movie-meta">
                <span>
                  {movie.release_date
                    ? movie.release_date.slice(0, 4)
                    : "თარიღი უცნობია"}
                </span>

                <span className="movie-language">
                  {movie.original_language?.toUpperCase()}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Movies;
