import { Helmet } from "react-helmet";
import { CgProfile } from "react-icons/cg";

const Admin = () => {
  return (
    <div>
      <Helmet>
        <title>Dashboard || Admin</title>
      </Helmet>
      <h1 className="font-roboto fw-700 fs-38 pt-5">Admin Dashboard</h1>
      <hr className="py-4" />
      <div className="row">
        <div className="col-lg-3 mb-3">
          <div className="card-shadow d-flex justify-content-between align-items-center fs-18 fw-700">
            <div>
              <p>Total Users</p>
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
              <p>Total Hotel</p>
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

export default Admin;
