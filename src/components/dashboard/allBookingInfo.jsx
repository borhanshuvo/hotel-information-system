import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { ContextState } from "../../context/contextProvider";
import { BASE_URL } from "../../data/baseURL";

const AllBookingInfo = () => {
  const { accessToken, setLoading, loading } = ContextState();
  const [allBookingInfo, setAllBookingInfo] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}/booking/get-all/booking`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setAllBookingInfo(result.bookingInfo);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
  }, [setLoading, accessToken]);
  console.log(allBookingInfo);

  return (
    <div>
      <Helmet>
        <title>Dashboard || Booking</title>
      </Helmet>
      <h1 className="fw-700 pt-5">All Booking List</h1>
      <hr className="py-4" />
      <div className="table-responsive">
        <table className="table table-striped table-hover text-center">
          <thead className="table-dark">
            <tr>
              <th scope="col">#Sl</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Hotel Name</th>
              <th scope="col">Room Name</th>
              <th scope="col">Price</th>
              <th scope="col">Discount</th>
              <th scope="col">Payment Validate</th>
            </tr>
          </thead>
          <tbody>
            {allBookingInfo?.map((bookInfo, index) => (
              <tr key={index}>
                <th className="fs-600">{index + 1}</th>
                <td>{bookInfo?.customerName}</td>
                <td>{bookInfo?.hotels?.user?.name}</td>
                <td>{bookInfo?.rooms?.name}</td>
                <td>{bookInfo?.price}</td>
                <td>{bookInfo?.discount}%</td>
                <td>{bookInfo?.paymentSuccess ? "Yes" : "No"}</td>
              </tr>
            ))}
            {loading && (
              <tr>
                <td colSpan={7}>
                  {" "}
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            )}
            {allBookingInfo?.length <= 0 && (
              <tr>
                <td colSpan={7}>Sorry!!! No room.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBookingInfo;
