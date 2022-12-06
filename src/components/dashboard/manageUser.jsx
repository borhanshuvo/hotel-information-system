import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { ContextState } from "../../context/contextProvider";
import { BASE_URL } from "../../data/baseURL";

const ManageUser = () => {
  const [allUsers, setAllUsers] = useState([]);
  const { accessToken, setNumber, number, loading, setLoading } =
    ContextState();

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}/user/get-user`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setAllUsers(result.users);
          setLoading(false);
        } else {
          toast.error(result.message);
          setLoading(false);
        }
      });
  }, [accessToken, setLoading, number]);

  const updateStatus = (val, id) => {
    setNumber(false);
    fetch(`${BASE_URL}/user/update-user-status/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        status: val,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
          setNumber((prevState) => prevState + 1);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
  };

  return (
    <div className="">
      <Helmet>
        <title>Dashboard || Manage User</title>
      </Helmet>
      <h1 className="fw-700 pt-5">Manage User</h1>
      <hr className="py-4" />
      <div className="table-responsive">
        <table className="table table-striped table-hover text-center">
          <thead className="table-dark">
            <tr>
              <th scope="col">#Sl</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Role</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {allUsers?.map((user, index) => (
              <tr key={index}>
                <th className="fs-600">{index + 1}</th>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.phoneNumber}</td>
                <td>{user?.role}</td>
                <td>
                  <input
                    type="checkbox"
                    defaultChecked={user?.status}
                    onChange={() => {
                      updateStatus(!user?.status, user?._id);
                    }}
                  />{" "}
                  <span
                    className={`badge ${
                      user?.status ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {user?.status ? "Active" : "In-active"}
                  </span>
                </td>
              </tr>
            ))}
            {loading && (
              <tr>
                <td colSpan={6}>
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
