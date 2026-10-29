import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-left">
        <NavLink to="/" className="header-brand">
          <span className="brand-icon">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 7h18v14H3z" />
              <path d="M3 7l2-4h18l-2 4" />
              <path d="M8 3 6 7M14 3l-2 4M20 3l-2 4" />
            </svg>
          </span>

          <span className="brand-name">კადრი</span>
        </NavLink>

        <nav className={`header-nav ${menuOpen ? "nav-open" : ""}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            მთავარი
          </NavLink>

          <NavLink
            to="/movies"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            ფილმები
          </NavLink>

          <NavLink
            to="/tvshows"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            სერიალები
          </NavLink>
        </nav>
      </div>

      <div className="header-right">
        <label className="header-search">
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m16 16 4 4" />
          </svg>

          <input
            type="search"
            placeholder="მოძებნე ფილმი..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="ფილმის ძიება"
          />
        </label>

        <button
          type="button"
          className="header-menu-button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="მენიუ"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
};

export default Header;
