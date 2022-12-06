import React from "react";
import {
  BsFacebook,
  BsFillCaretRightFill,
  BsFillTelephoneFill,
  BsInstagram,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";
import { FaLocationArrow } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
// import Button from "./button";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-5">
      <div className="bg-dark pb-4">
        <div className="pt-5">
          <div
            style={{ border: "0.01rem solid rgba(155, 155, 153, 0.24)" }}
          ></div>
        </div>
        <div className="container">
          <div className="mt-5">
            <div className="row text-white">
              <div className="col-lg-3 mb-5 mb-lg-0">
                <p className="fs-20 fw-600">Hotel Information System</p>
                <p className="pt-2">
                  Hotel Information Systems (HIS) announces its intent to
                  develop a two-way interface to Best Western International's
                  worldwide Central Reservation System and HIS' epitome PMS for
                  Windows.
                </p>
                <p className="text-center text-lg-start">
                  <span className="mx-3">
                    <a href="/" target="_blank" rel="noreferrer">
                      <BsFacebook className="cursor-pointer social-icon text-white" />
                    </a>
                  </span>
                  <span className="mx-3">
                    <a href="/" target="_blank" rel="noreferrer">
                      <BsTwitter className="cursor-pointer social-icon text-white" />
                    </a>
                  </span>
                  <span className="mx-3">
                    <a href="/" target="_blank" rel="noreferrer">
                      <BsInstagram className="cursor-pointer social-icon text-white" />
                    </a>
                  </span>
                  <span className="mx-3">
                    <a href="/" target="_blank" rel="noreferrer">
                      <BsYoutube className="cursor-pointer social-icon text-white" />
                    </a>
                  </span>
                </p>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div className="ms-0 ms-md-5 ps-0 ps-md-5">
                  <p className="">Discover</p>
                  <div className="py-3">
                    <p>
                      <span className="text-american-yellow me-3">
                        <BsFillCaretRightFill />
                      </span>
                      <Link to="/" className="text-decoration-none footer-text">
                        Home
                      </Link>
                    </p>
                    <p>
                      <span className="text-american-yellow me-3">
                        <BsFillCaretRightFill />
                      </span>
                      <Link
                        to="/terms-and-condition"
                        className="text-decoration-none footer-text"
                      >
                        Terms & Condition
                      </Link>
                    </p>
                    <p>
                      <span className="text-american-yellow me-3">
                        <BsFillCaretRightFill />
                      </span>
                      <Link
                        to="/privacy-policy"
                        className="text-decoration-none footer-text"
                      >
                        Privacy Policy
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div className="ms-0">
                  <p className="">Deals & Packages</p>
                  <div className="py-3">
                    <p>
                      <span className="text-american-yellow me-3">
                        <BsFillCaretRightFill />
                      </span>
                      <Link to="" className="text-decoration-none footer-text">
                        Deals
                      </Link>
                    </p>
                    <p>
                      <span className="text-american-yellow me-3">
                        <BsFillCaretRightFill />
                      </span>
                      <Link to="" className="text-decoration-none footer-text">
                        Resorts
                      </Link>
                    </p>
                    <p>
                      <span className="text-american-yellow me-3">
                        <BsFillCaretRightFill />
                      </span>
                      <Link to="" className="text-decoration-none footer-text">
                        Experience
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <p className="">Contact Info</p>
                <div className="py-3">
                  <p>
                    <span className="text-american-yellow me-3">
                      <FaLocationArrow />
                    </span>
                    Gazipur, Dhaka, Bangladesh
                  </p>
                  <p>
                    <span className="text-american-yellow me-3">
                      <BsFillTelephoneFill />
                    </span>
                    +8801725698745
                  </p>
                  <p className="mb-5 mb-lg-0">
                    <span className="text-american-yellow me-3">
                      <MdEmail />
                    </span>
                    admin@hotelinformationsystem.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-base">
        <div className="container py-3">
          <p className="text-center">
            Copy right @{new Date().getFullYear()}{" "}
            <span className="text-white">Hotel Information System</span> All
            Right Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
