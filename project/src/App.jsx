import React from "react";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import Footer from "./components/Footer/Footer";
import Movies from "./components/Movies/Movies";

const App = () => {
  return (
    <>
      <Header />
      <Banner />
      <main className="page-main">
        <Movies />
      </main>
      <div>MovieHub</div>
      <Footer />
    </>
  );
};

export default App;
