import React from "react";
import { Link } from "react-router-dom";
import MyDocument from "../invoice";

const Booking = ({ book, index }) => {
  return (
    <tr>
      <th className="fs-600">{index + 1}</th>
      <td>{book?.hotels?.user?.name}</td>
      <td>{book?.rooms?.name}</td>
      <td>{book?.numberOfBed}</td>
      <td>{book?.price}</td>
      <td>{book?.discount}%</td>
      <td>{(book?.from).split("T")[0]}</td>
      <td>{(book?.to).split("T")[0]}</td>
      <td>{book?.totalDays} days</td>
      <td>{book?.paymentSuccess ? "Yes" : "No"}</td>
      <td>
        {book?.paymentSuccess ? (
          <MyDocument info={book} />
        ) : (
          <Link to={`/order/${book?.tranId}`}>Validate</Link>
        )}
      </td>
    </tr>
  );
};

export default Booking;
