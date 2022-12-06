import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { CgProfile } from "react-icons/cg";
import { toast } from "react-toastify";
import { ContextState } from "../../../context/contextProvider";
import { BASE_URL } from "../../../data/baseURL";

const Admin = () => {
  const [hotels, setHotels] = useState([]);
  const [users, setUsers] = useState([]);
  const [allBookingInfo, setAllBookingInfo] = useState([]);
  const { accessToken } = ContextState();

  useEffect(() => {
    fetch(`${BASE_URL}/hotel/get`)
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setHotels(result.hotels);
        } else {
          toast.error(result.message);
        }
      });

    fetch(`${BASE_URL}/user/get-user`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setUsers(result.users);
        } else {
          toast.error(result.message);
        }
      });

    fetch(`${BASE_URL}/booking/get-all/booking`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setAllBookingInfo(result.bookingInfo);
        } else {
        }
      });
  }, [accessToken]);

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
              <p>{users?.length}</p>
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
              <p>{hotels?.length}</p>
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
              <p>{allBookingInfo?.length}</p>
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
