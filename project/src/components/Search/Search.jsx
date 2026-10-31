import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchMovies } from "../../tdmb";
import "./Search.css";

const Search = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    try {
      const results = await searchMovies(search.trim());

      navigate("/search", {
        state: {
          movies: results,
          query: search.trim(),
        },
      });
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="მოძებნე ფილმი..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default Search;
