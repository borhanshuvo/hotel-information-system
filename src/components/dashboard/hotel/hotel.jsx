import { Helmet } from "react-helmet";
import { CgProfile } from "react-icons/cg";
import { ContextState } from "../../../context/contextProvider";

const Hotel = () => {
  const { accessToken, user } = ContextState();

  return (
    <div>
      <Helmet>
        <title>Dashboard || {user?.name}</title>
      </Helmet>
      <h1 className="font-roboto fw-700 fs-38 pt-5">{user?.name} Dashboard</h1>
      <hr className="py-4" />
      <div className="row">
        <div className="col-lg-3 mb-3">
          <div className="card-shadow d-flex justify-content-between align-items-center fs-18 fw-700">
            <div>
              <p>Total Rooms</p>
              <p>10</p>
            </div>
            <div>
              <p className="profile-card-icon">
                <CgProfile size={25} className="text-primary" />
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 mb-3">
          <div className="card-shadow d-flex justify-content-between align-items-center fs-18 fw-700">
            <div>
              <p>Total Booking</p>
              <p>10</p>
            </div>
            <div>
              <p className="profile-card-icon">
                <CgProfile size={25} className="text-primary" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotel;
