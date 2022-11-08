import React from "react";
import aboutUsImage from "../images/about_us.jpg";

const AboutUs = () => {
  return (
    <section className="py-5 my-md-5" id="about-us">
      <h1 className="text-center fw-700 pb-5">About US</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 my-auto">
            <p style={{ textAlign: "justify", fontSize: "18px" }}>
              Hotel management system providing the best and user friendly
              application to our customers, with extensive tools specially for
              online travel business from hotels booking to flights reservation,
              we also provide custom web solutions and services. With over 4
              years of experienceHotel management system have unquestionably won
              a reputation for being a trusted source, a reliable partner and an
              expert in the area of online travel business applications. The
              combination of our services, 24/5 nonstop support, our pricing,
              friendly way of conducting business, and our compassionate
              corporate philosophy is very unique in today's business world. We
              pride ourselves on exceptional customer service and strive to
              build lasting relationships with our customers by making it easy
              and profitable for them to do business with us.
            </p>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-5">
            <div>
              <img src={aboutUsImage} className="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
