import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { CgCheck, CgHome } from "react-icons/cg";
import { ContextState } from "../../../context/contextProvider";
import { BASE_URL } from "../../../data/baseURL";

const Hotel = () => {
  const { accessToken, user } = ContextState();
  const [allRooms, setAllRooms] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/room/get-room/${user?.email}`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setAllRooms(result.rooms);
        }
      });
  }, [accessToken, user?.email]);

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
              <p>{allRooms?.length}</p>
            </div>
            <div>
              <p className="profile-card-icon">
                <CgHome size={30} className="text-base" />
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 mb-3">
          <div className="card-shadow d-flex justify-content-between align-items-center fs-18 fw-700">
            <div>
              <p>Total Booking</p>
              <p>0</p>
            </div>
            <div>
              <p className="profile-card-icon">
                <CgCheck size={30} className="text-base" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotel;
