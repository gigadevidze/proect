import { useEffect, useState } from "react";
import { getUpcomingMovies } from "../../tdmb";
import "./Banner.css";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

const Banner = () => {
  const [movies, setMovies] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await getUpcomingMovies();
        setMovies(data);
      } catch (err) {
        setError(err.message || "ფილმების ჩატვირთვა ვერ მოხერხდა");
      }
    };

    loadMovies();
  }, []);

  useEffect(() => {
    if (movies.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % movies.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [movies.length]);

  if (error) {
    return (
      <section className="banner">
        <p>{error}</p>
      </section>
    );
  }

  if (!movies.length) {
    return (
      <section className="banner">
        <p className="banner-loading">მომავალი ფილმები იტვირთება...</p>
      </section>
    );
  }

  const movie = movies[activeIndex];

  const backgroundImage = movie.backdrop_path || movie.poster_path;

  return (
    <section
      className="banner"
      style={{
        backgroundImage: backgroundImage
          ? `url("${IMAGE_BASE}${backgroundImage}")`
          : "none",
      }}
    >
      <div className="banner-overlay" />

      <div className="banner-content" key={movie.id}>
        <p className="banner-label">მალე კინოთეატრებში</p>

        <h1 className="banner-title">{movie.title || movie.original_title}</h1>

        <p className="banner-description">
          {movie.overview ||
            "გაეცანი ფილმის დეტალებს და დაელოდე მის პრემიერას."}
        </p>

        {movie.release_date && (
          <p className="banner-release">
            გამოსვლის თარიღი: {movie.release_date}
          </p>
        )}
      </div>

      <div className="banner-pagination">
        {movies.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={
              index === activeIndex ? "pagination-active" : "pagination-dot"
            }
            onClick={() => setActiveIndex(index)}
            aria-label={`ფილმი ${index + 1}: ${item.title}`}
            aria-current={index === activeIndex ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;
