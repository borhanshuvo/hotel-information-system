import React from "react";
import AboutUs from "../components/aboutUs";
import ContactUs from "../components/contactUs";
import Footer from "../components/footer";
import Header from "../components/header";
import Hotel from "../components/hotel";
import Navbar from "../components/navbar";
import Review from "../components/review";

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
        <AboutUs />
      </div>
      <div>
        <Review />
      </div>
      <div>
        <ContactUs />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
