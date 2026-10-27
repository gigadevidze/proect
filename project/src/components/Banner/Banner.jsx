import React from "react";
import "./Banner.css";

const Banner = () => {
  return (
    <section className="banner">
      <div className="banner-overlay"></div>

      <div className="banner-content">
        <h1 className="banner-title">ინტერსტელარი</h1>

        <p className="banner-description">
          მოგზაურობა ვარსკვლავებს მიღმა, სადაც კაცობრიობის მომავალი და ერთი
          ოჯახის სიყვარული იკვეთება.
        </p>
      </div>

      <div className="banner-pagination">
        <span className="pagination-active"></span>
        <span className="pagination-dot"></span>
        <span className="pagination-dot"></span>
      </div>
    </section>
  );
};

export default Banner;
