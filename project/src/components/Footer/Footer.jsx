import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p className="footer-copyright">© 2026 კადრი</p>

        <a href="#about" className="footer-about">
          ჩვენ შესახებ
        </a>

        <p className="footer-tagline">შენი შემდეგი საყვარელი ფილმი.</p>
      </div>
    </footer>
  );
};

export default Footer;
