import React from "react";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import Footer from "./components/Footer/Footer";
import Router from "./Router";

const App = () => {
  return (
    <>
      <Header />
      <Banner />
      <main className="page-main">
        <Router />
      </main>
      <div>MovieHub</div>
      <Footer />
    </>
  );
};

export default App;
