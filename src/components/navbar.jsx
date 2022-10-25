import React from "react";
import { Link } from "react-router-dom";
import { ContextState } from "../context/contextProvider";

const Navbar = () => {
  const { user, setUser } = ContextState();

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">
        <Link className="navbar-brand fs-20 fw-700" to="/">
          Hotel Information System
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="">
                Hotel
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="">
                About Us
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="">
                Review
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="">
                Contact Us
              </Link>
            </li>

            {user?.email ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <p
                    className="nav-link cursor-pointer"
                    onClick={() => {
                      localStorage.removeItem("userInfo");
                      localStorage.removeItem("token");
                      setUser({});
                    }}
                  >
                    Logout
                  </p>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/login"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
