import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { ContextState } from "../../context/contextProvider";
import { BASE_URL } from "../../data/baseURL";
import SingleRoom from "./singleRoom";

const ManageRoom = () => {
  const [allRooms, setAllRooms] = useState([]);
  const { accessToken, number, loading, setLoading } = ContextState();

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}/room/get-room`)
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setAllRooms(result.rooms);
          setLoading(false);
        } else {
          toast.error(result.message);
        }
      });
  }, [number, setLoading]);

  return (
    <div>
      <Helmet>
        <title>Dashboard || Manage Room</title>
      </Helmet>
      <h1 className="fw-700 pt-5">Manage Room</h1>
      <hr className="py-4" />
      <table className="table table-striped table-hover text-center">
        <thead className="table-dark">
          <tr>
            <th scope="col">#Sl</th>
            <th scope="col">Name</th>
            <th scope="col">Adult</th>
            <th scope="col">Child</th>
            <th scope="col">Number of Room</th>
            <th scope="col">Number of Bed</th>
            <th scope="col">Price</th>
            <th scope="col">Discount</th>
            <th scope="col">Available</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {allRooms?.map((room, index) => (
            <SingleRoom key={index} room={room} index={index} />
          ))}
          {loading && (
            <tr>
              <td colSpan={10}>
                {" "}
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </td>
            </tr>
          )}
          {allRooms?.length <= 0 && (
            <tr>
              <td colSpan={10}>Sorry!!! No room.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRoom;
