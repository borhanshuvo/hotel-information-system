import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { ContextState } from "../../context/contextProvider";
import { BASE_URL } from "../../data/baseURL";
import SingleHotel from "./singleHotel";

const ManageHotel = () => {
  const [allHotels, setAllHotels] = useState([]);
  const { accessToken, number } = ContextState();

  useEffect(() => {
    fetch(`${BASE_URL}/hotel/get`)
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setAllHotels(result.hotels);
        } else {
          toast.error(result.message);
        }
      });
  }, [number]);

  const deleteHotel = (id) => {
    fetch(`${BASE_URL}/hotel/delete/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
          const newAllHotels = allHotels.filter((item) => item._id !== id);
          setAllHotels(newAllHotels);
        } else {
          toast.error(result.message);
        }
      });
  };

  return (
    <div className="">
      <Helmet>
        <title>Dashboard || Manage Hotel</title>
      </Helmet>
      <h1 className="fw-700 pt-5">Manage Hotel</h1>
      <hr className="py-4" />
      <table className="table table-striped table-hover text-center">
        <thead className="table-dark">
          <tr>
            <th scope="col">#Sl</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone No</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {allHotels?.map((hotel, index) => (
            <SingleHotel
              key={index}
              hotel={hotel}
              index={index}
              deleteHotel={deleteHotel}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageHotel;
