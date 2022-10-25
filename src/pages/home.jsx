import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Hotel from "../components/hotel";
import Navbar from "../components/navbar";

const Home = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <Header />
      </div>
      <div>
        <Hotel />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
