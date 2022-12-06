import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { ContextState } from "../../../context/contextProvider";
import { BASE_URL } from "../../../data/baseURL";
import Booking from "./booking";

const Customer = () => {
  const { accessToken, user, loading, setLoading } = ContextState();
  const [bookingInfo, setBookingInfo] = useState([]);

  useEffect(() => {
    setLoading(true);
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
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
  }, [user?.email, setLoading]);

  return (
    <div>
      <Helmet>
        <title>Dashboard || {user?.name}</title>
      </Helmet>
      <h1 className="font-roboto fw-700 fs-38 pt-5">{user?.name} Dashboard</h1>
      <hr className="py-4" />
      {/* <div className="row">
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
      </div> */}
      <div className="table-responsive">
        <table className="table table-striped table-hover text-center">
          <thead className="table-dark">
            <tr>
              <th scope="col">#Sl</th>
              <th scope="col">Hotel Name</th>
              <th scope="col">Room Name</th>
              <th scope="col">Extra Bed</th>
              <th scope="col">Amount</th>
              <th scope="col">Discount</th>
              <th scope="col">From</th>
              <th scope="col">To</th>
              <th scope="col">Days</th>
              <th scope="col">Payment Validate</th>
              <th scope="col">Invoice</th>
            </tr>
          </thead>
          <tbody>
            {bookingInfo?.map((book, index) => (
              <Booking key={index} book={book} index={index} />
            ))}
            {loading && (
              <tr>
                <td colSpan={11}>
                  {" "}
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            )}
            {bookingInfo?.length <= 0 && (
              <tr>
                <td colSpan={11}>
                  Sorry!!! You have no information right now.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customer;
