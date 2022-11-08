import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { ContextState } from "../../context/contextProvider";
import { BASE_URL } from "../../data/baseURL";

const SingleHotel = ({ hotel, index, deleteHotel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { accessToken, setNumber } = ContextState();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    setFile(newFile);
  };

  const editHotel = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    formData.append("hotelImage", file);

    fetch(`${BASE_URL}/hotel/update/${data._id}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
          setNumber((prevState) => prevState + 1);
        } else {
          toast.error(result.message);
        }
      });
  };

  return (
    <>
      <tr>
        <th className="fs-600">{index + 1}</th>
        <td>{hotel?.name}</td>
        <td>{hotel?.email}</td>
        <td>{hotel?.phone}</td>
        <td>
          <FaEdit
            className="text-primary cursor-pointer"
            data-bs-toggle="modal"
            data-bs-target={`#hotelEditModal${index + 1}`}
          />{" "}
          |{" "}
          <MdDelete
            className="text-danger cursor-pointer"
            data-bs-toggle="modal"
            data-bs-target={`#hotelDeleteModal${index + 1}`}
          />
        </td>
      </tr>

      {/* Edit Modal */}
      <div
        className="modal fade"
        id={`hotelEditModal${index + 1}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {hotel?.name}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(editHotel)}>
                <div className="mb-3">
                  <p htmlFor="name" className="form-label text-start">
                    Name
                  </p>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={hotel?.name}
                    id="name"
                    autoComplete="off"
                    {...register("name", { required: true })}
                  />
                  {errors.name && <span>This field is required</span>}
                </div>

                <div className="mb-3">
                  <p htmlFor="email" className="form-label text-start">
                    Email
                  </p>
                  <input
                    type="email"
                    className="form-control"
                    defaultValue={hotel?.email}
                    id="email"
                    autoCapitalize="off"
                    autoComplete="off"
                    {...register("email", { required: true })}
                  />
                  {errors.email && <span>This field is required</span>}
                </div>

                <div className="mb-3">
                  <p htmlFor="phone" className="form-label text-start">
                    Phone
                  </p>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={hotel?.phone}
                    id="phone"
                    autoCapitalize="off"
                    autoComplete="off"
                    {...register("phone", { required: true })}
                  />
                  {errors.phone && <span>This field is required</span>}
                </div>

                <div className="mb-3">
                  <p htmlFor="address" className="form-label text-start">
                    Address
                  </p>
                  <textarea
                    name="address"
                    id="address"
                    cols="10"
                    rows="6"
                    className="form-control"
                    defaultValue={hotel?.address}
                    autoCapitalize="off"
                    autoComplete="off"
                    {...register("address")}
                  ></textarea>
                </div>

                <div className="text-start">
                  <img
                    src={`${BASE_URL}/${hotel?.hotelImageURL}`}
                    height={80}
                    width={80}
                    alt=""
                  />
                </div>

                <div className="mb-5 text-start">
                  <p htmlFor="image" className="form-label">
                    Image
                  </p>
                  <input
                    type="file"
                    className="cursor-pointer border"
                    id="image"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>

                <input
                  type="hidden"
                  defaultValue={hotel?._id}
                  {...register("_id")}
                />

                <div className="text-end">
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Save Changes"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <div
        className="modal fade"
        id={`hotelDeleteModal${index + 1}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Are you want to sure for delete {hotel?.name}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>{hotel?.email}</p>
              <p>{hotel?.phone}</p>
              <p>{hotel?.address}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => deleteHotel(hotel?._id)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleHotel;
