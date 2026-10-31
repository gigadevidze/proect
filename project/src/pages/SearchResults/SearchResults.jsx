import { useLocation } from "react-router-dom";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const SearchResults = () => {
  const location = useLocation();

  const movies = location.state?.movies || [];
  const query = location.state?.query || "";

  return (
    <section className="search-results">
      <h2>ძიების შედეგები: {query}</h2>

      {movies.length === 0 ? (
        <p>ფილმები ვერ მოიძებნა.</p>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              {movie.poster_path && (
                <img
                  src={`${IMAGE_BASE}${movie.poster_path}`}
                  alt={movie.title}
                />
              )}

              <h3>{movie.title}</h3>
              <p>{movie.release_date?.slice(0, 4)}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SearchResults;
