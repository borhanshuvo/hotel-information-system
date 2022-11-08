import { FaUserEdit } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { ContextState } from "../../context/contextProvider";

const Navbar = () => {
  const { user, setUser, navigate } = ContextState();

  return (
    <div className="position-fixed w-100" style={{ zIndex: "2" }}>
      <nav className="navbar navbar-expand-lg py-2 px-xl-5 d-nav-container">
        <div className="container">
          <div>
            <Link className="navbar-brand fw-600" to="/">
              Hotel Information System
            </Link>
          </div>
          <div className="d-flex align-items-center d-block d-md-none nav-proflile-position">
            <p>
              <img
                // src={user?.image}
                src="https://imgs.search.brave.com/kZCNA3Oq4ZLojuVncmP84pENxYkgh_bPpVMRJzxqQQs/rs:fit:755:1080:1/g:ce/aHR0cHM6Ly9jZG4x/LnZlY3RvcnN0b2Nr/LmNvbS9pLzEwMDB4/MTAwMC83Ny8xMC9t/ZW4tZmFjZWxlc3Mt/cHJvZmlsZS12ZWN0/b3ItMTM1Njc3MTAu/anBn"
                alt=""
                className="profile-img cursor-pointer"
              />
            </p>
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 fs-16 fw-700 font-open-sans">
              <li className="nav-item dashboard">
                <div className="d-flex align-items-center mt-md-3">
                  <p>
                    <img
                      // src={user?.image}
                      src="https://imgs.search.brave.com/kZCNA3Oq4ZLojuVncmP84pENxYkgh_bPpVMRJzxqQQs/rs:fit:755:1080:1/g:ce/aHR0cHM6Ly9jZG4x/LnZlY3RvcnN0b2Nr/LmNvbS9pLzEwMDB4/MTAwMC83Ny8xMC9t/ZW4tZmFjZWxlc3Mt/cHJvZmlsZS12ZWN0/b3ItMTM1Njc3MTAu/anBn"
                      alt=""
                      className="profile-img cursor-pointer"
                    />
                  </p>
                  <p className="cursor-pointer text-white ps-2 text-capitalize">
                    {user?.name}
                  </p>
                </div>
                <ul className="dropdown-menu dashboard-menu">
                  <li>
                    <Link className="dropdown-item" to="profile">
                      <FaUserEdit /> Edit Account
                    </Link>
                  </li>
                  <li>
                    <p
                      className="dropdown-item cursor-pointer"
                      onClick={() => {
                        localStorage.removeItem("userInfo");
                        localStorage.removeItem("token");
                        setUser({});
                        navigate("/");
                      }}
                    >
                      <MdLogout /> Logout
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <nav className="navbar navbar-expand-lg py-4 px-xl-5 d-nav-container-2">
        <div className="container">
          <div className="d-block d-md-none nav-proflile-position">
            <p className="cursor-pointer text-gunmetal fs-16 ps-2">
              Borhan Uddin
            </p>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent1"
            aria-controls="navbarSupportedContent1"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent1"
          >
            <ul className="navbar-nav mb-2 mb-lg-0 fs-16 fw-700 font-open-sans">
              <li className="nav-item mx-2">
                <Link className="nav-link" to="">
                  Dashboard
                </Link>
              </li>

              <li className="nav-item dashboard mx-2">
                <p className="nav-link cursor-pointer">User</p>
                <ul className="dropdown-menu dashboard-menu">
                  <li>
                    <Link className="dropdown-item" to="admin/add-user">
                      Add User
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="admin/manage-user">
                      Manage User
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item dashboard mx-2">
                <p className="nav-link cursor-pointer">Hotel</p>
                <ul className="dropdown-menu dashboard-menu">
                  <li>
                    <Link className="dropdown-item" to="admin/add-hotel">
                      Add Hotel
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="admin/manage-hotel">
                      Manage Hotel
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item mx-2">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active-class nav-link" : "nav-link"
                  }
                  to=""
                >
                  Profile
                </NavLink>
              </li>

              <li className="nav-item mx-2">
                <p
                  className="nav-link cursor-pointer"
                  onClick={() => {
                    localStorage.removeItem("userInfo");
                    localStorage.removeItem("token");
                    setUser({});
                    navigate("/");
                  }}
                >
                  Logout
                </p>
              </li>

              <div className="d-block d-md-none">
                <li>
                  <Link className="dropdown-item" to="profile">
                    Edit Account
                  </Link>
                </li>
                <li>
                  <p
                    className="dropdown-item cursor-pointer"
                    onClick={() => {
                      setUser({});
                      localStorage.removeItem("userInfo");
                      navigate("/");
                    }}
                  >
                    Logout
                  </p>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;