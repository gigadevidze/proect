import { useEffect, useState } from "react";
import "./Movies.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ka-GE&page=1`,
        );

        if (!response.ok) {
          throw new Error("ფილმების ჩატვირთვა ვერ მოხერხდა");
        }

        const data = await response.json();
        setMovies(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p className="movies-status">იტვირთება...</p>;
  if (error) return <p className="movies-status">{error}</p>;

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

export default Movies;
