import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { ContextState } from "../../context/contextProvider";
import { BASE_URL } from "../../data/baseURL";

const ManageUser = () => {
  const [allUsers, setAllUsers] = useState([]);
  const { accessToken } = ContextState();

  useEffect(() => {
    fetch(`${BASE_URL}/user/get`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setAllUsers(result.users);
        } else {
          toast.error(result.message);
        }
      });
  }, [accessToken]);

  return (
    <div className="">
      <Helmet>
        <title>Dashboard || Manage User</title>
      </Helmet>
      <h1 className="fw-700 pt-5">Manage User</h1>
      <hr className="py-4" />
      <table className="table table-striped table-hover text-center">
        <thead className="table-dark">
          <tr>
            <th scope="col">#Sl</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers?.map((user, index) => (
            <tr key={index}>
              <th className="fs-600">{index + 1}</th>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
              <td>
                <FaEdit className="text-primary cursor-pointer" /> |{" "}
                <MdDelete className="text-danger cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUser;
