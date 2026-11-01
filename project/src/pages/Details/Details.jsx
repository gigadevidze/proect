import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetails, getMovieVideos } from "../../tdmb";
import "./Details.css";

const IMAGE_BASE = "https://image.tmdb.org/t/p/";
const Details = () => {
  const { mediaType, id } = useParams();

  const [details, setDetails] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError("");
        setDetails(null);
        setTrailer(null);

        const data = await getDetails(mediaType, id);

        if (!isActive) return;

        setDetails(data);

        try {
          const videos = await getMovieVideos(mediaType, id);

          const youtubeVideos = videos.filter(
            (video) => video.site === "YouTube",
          );

          const selectedTrailer =
            youtubeVideos.find(
              (video) => video.type === "Trailer" && video.official,
            ) ||
            youtubeVideos.find((video) => video.type === "Trailer") ||
            youtubeVideos.find((video) => video.type === "Teaser");

          if (isActive && selectedTrailer) {
            setTrailer(selectedTrailer);
          }
        } catch (videoError) {
          console.error("თრეილერის ჩატვირთვის შეცდომა:", videoError);
        }
      } catch (error) {
        if (isActive) {
          setError(error.message || "მონაცემების ჩატვირთვა ვერ მოხერხდა");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchDetails();

    return () => {
      isActive = false;
    };
  }, [mediaType, id]);

  if (loading) {
    return <div className="details-status">იტვირთება...</div>;
  }

  if (error) {
    return <div className="details-status">{error}</div>;
  }

  if (!details) {
    return <div className="details-status">მონაცემები ვერ მოიძებნა</div>;
  }

  const title = details.title || details.name;

  const backdrop = details.backdrop_path
    ? `${IMAGE_BASE}original${details.backdrop_path}`
    : details.poster_path
      ? `${IMAGE_BASE}w500${details.poster_path}`
      : "";

  const poster = details.poster_path
    ? `${IMAGE_BASE}w500${details.poster_path}`
    : "";

  const releaseDate =
    details.release_date || details.first_air_date || "უცნობია";

  const runtime = details.runtime || details.episode_run_time?.[0] || null;

  return (
    <section className="details-page">
      <div
        className="details-backdrop"
        style={backdrop ? { backgroundImage: `url("${backdrop}")` } : undefined}
      >
        <div className="details-overlay"></div>

        <div className="details-content">
          <div className="details-poster">
            {poster ? (
              <img src={poster} alt={title} />
            ) : (
              <div className="details-no-poster">პოსტერი მიუწვდომელია</div>
            )}
          </div>

          <div className="details-info">
            <span className="details-label">
              {mediaType === "movie" ? "ფილმი" : "სერიალი"}
            </span>

            <h1>{title}</h1>

            {details.tagline && (
              <p className="details-tagline">{details.tagline}</p>
            )}

            <div className="details-meta">
              <span>★ {details.vote_average?.toFixed(1) || "N/A"} / 10</span>

              <span>გამოშვება: {releaseDate}</span>

              {runtime && <span>{runtime} წუთი</span>}

              {details.number_of_seasons && (
                <span>{details.number_of_seasons} სეზონი</span>
              )}
            </div>

            <div className="details-genres">
              {details.genres?.map((genre) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </div>

            <div className="details-overview">
              <h2>ფილმის შესახებ</h2>

              <p>{details.overview || "აღწერა მიუწვდომელია"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="details-trailer-section">
        <h2>ოფიციალური თრეილერი</h2>

        {trailer ? (
          <div className="details-trailer">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${trailer.key}`}
              title={`${title} - Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        ) : (
          <p className="details-no-trailer">
            ამ ფილმის ან სერიალის თრეილერი ვერ მოიძებნა.
          </p>
        )}
      </div>
    </section>
  );
};

export default Details;
