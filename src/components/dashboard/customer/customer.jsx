import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { CgProfile } from "react-icons/cg";
import { ContextState } from "../../../context/contextProvider";
import { BASE_URL } from "../../../data/baseURL";

const Customer = () => {
  const { accessToken, user } = ContextState();
  const [bookingInfo, setBookingInfo] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/booking/get-booking`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email: user?.email }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          setBookingInfo(result.bookingUser);
        }
      });
  }, [user?.email]);

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
              <p>Total Booking</p>
              <p>{bookingInfo.length}</p>
            </div>
            <div>
              <p className="profile-card-icon">
                <CgProfile size={25} className="text-primary" />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Customer;
