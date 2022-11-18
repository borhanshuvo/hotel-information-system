import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { ContextState } from "../../context/contextProvider";
import { BASE_URL } from "../../data/baseURL";

const SingleRoom = ({ room, index }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { accessToken, setNumber } = ContextState();
  const [roomImage, setRoomImage] = useState(null);

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    setRoomImage(newFile);
  };

  const editHotel = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("adult", data.adult);
    formData.append("child", data.child);
    formData.append("price", data.price);
    formData.append("bedPrice", data.bedPrice);
    formData.append("discount", data.discount);
    formData.append("numberOfBed", data.numberOfBed);
    formData.append("numberOfRoom", data.numberOfRoom);
    formData.append("roomAmenities", data.roomAmenities);
    formData.append("roomImage", roomImage);

    fetch(`${BASE_URL}/room/update/${data._id}`, {
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

  const updateStatus = (val, id) => {
    const formData = new FormData();
    formData.append("available", val);
    fetch(`${BASE_URL}/room/update/${id}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          toast.success("Status changed Successfully!");
          setNumber((prevState) => prevState + 1);
        }
      });
  };

  return (
    <>
      <tr>
        <th className="fs-600">{index + 1}</th>
        <td>{room?.name}</td>
        <td>{room?.adult}</td>
        <td>{room?.child}</td>
        <td>{room?.numberOfRoom}</td>
        <td>{room?.price}</td>
        <td>{room?.numberOfBed}</td>
        <td>{room?.bedPrice}</td>
        <td>{room?.discount}</td>
        <td>
          <input
            type="checkbox"
            defaultChecked={room?.available}
            onChange={() => {
              updateStatus(!room?.available, room?._id);
            }}
          />{" "}
          {room?.available ? "Yes" : "No"}
        </td>
        <td>
          <FaEdit
            className="text-primary cursor-pointer"
            data-bs-toggle="modal"
            data-bs-target={`#roomEditModal${index + 1}`}
          />
        </td>
      </tr>

      {/* Edit Modal */}
      <div
        className="modal fade"
        id={`roomEditModal${index + 1}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {room?.name}
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
                    defaultValue={room?.name}
                    id="name"
                    autoComplete="off"
                    {...register("name", { required: true })}
                  />
                  {errors.name && <span>This field is required</span>}
                </div>

                <div className="mb-3">
                  <p htmlFor="roomAmenities" className="form-label text-start">
                    Room Amenities
                  </p>
                  <textarea
                    name="roomAmenities"
                    id="roomAmenities"
                    cols="10"
                    rows="6"
                    className="form-control"
                    defaultValue={room?.roomAmenities}
                    autoCapitalize="off"
                    autoComplete="off"
                    {...register("roomAmenities")}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <p htmlFor="adult" className="form-label text-start">
                    Adult
                  </p>
                  <input
                    type="number"
                    min={1}
                    className="form-control"
                    defaultValue={room?.adult}
                    id="adult"
                    autoComplete="off"
                    {...register("adult", { required: true })}
                  />
                  {errors.adult && <span>This field is required</span>}
                </div>

                <div className="mb-3">
                  <p htmlFor="child" className="form-label text-start">
                    Child
                  </p>
                  <input
                    type="number"
                    min={0}
                    className="form-control"
                    defaultValue={room?.child}
                    id="child"
                    autoComplete="off"
                    {...register("child", { required: true })}
                  />
                  {errors.child && <span>This field is required</span>}
                </div>

                <div className="mb-3">
                  <p htmlFor="numberOfRoom" className="form-label text-start">
                    Number Of Room
                  </p>
                  <input
                    type="number"
                    min={1}
                    className="form-control"
                    defaultValue={room?.numberOfRoom}
                    id="numberOfRoom"
                    autoComplete="off"
                    {...register("numberOfRoom", { required: true })}
                  />
                  {errors.numberOfRoom && <span>This field is required</span>}
                </div>

                <div className="mb-3">
                  <p htmlFor="price" className="form-label text-start">
                    Room Price
                  </p>
                  <input
                    type="number"
                    min={0}
                    className="form-control"
                    defaultValue={room?.price}
                    id="price"
                    autoComplete="off"
                    {...register("price", { required: true })}
                  />
                  {errors.price && <span>This field is required</span>}
                </div>

                <div className="mb-3">
                  <p htmlFor="numberOfBed" className="form-label text-start">
                    Number Of bed
                  </p>
                  <input
                    type="number"
                    min={0}
                    className="form-control"
                    defaultValue={room?.numberOfBed}
                    id="numberOfBed"
                    autoComplete="off"
                    {...register("numberOfBed", { required: true })}
                  />
                  {errors.numberOfBed && <span>This field is required</span>}
                </div>

                <div className="mb-3">
                  <p htmlFor="bedPrice" className="form-label text-start">
                    Bed Price
                  </p>
                  <input
                    type="number"
                    min={0}
                    className="form-control"
                    defaultValue={room?.bedPrice}
                    id="bedPrice"
                    autoComplete="off"
                    {...register("bedPrice", { required: true })}
                  />
                  {errors.bedPrice && <span>This field is required</span>}
                </div>

                <div className="mb-3">
                  <p htmlFor="discount" className="form-label text-start">
                    Discount
                  </p>
                  <input
                    type="number"
                    min={0}
                    className="form-control"
                    defaultValue={room?.discount}
                    id="discount"
                    autoComplete="off"
                    {...register("discount", { required: true })}
                  />
                  {errors.discount && <span>This field is required</span>}
                </div>

                <div className="text-start">
                  <img
                    src={`${BASE_URL}/${room?.roomImageURL}`}
                    height={80}
                    width={80}
                    alt=""
                  />
                </div>

                <div className="mb-5 text-start">
                  <p htmlFor="roomImageURL" className="form-label">
                    Room Image
                  </p>
                  <input
                    type="file"
                    className="cursor-pointer border"
                    id="roomImageURL"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>

                <input
                  type="hidden"
                  defaultValue={room?._id}
                  {...register("_id")}
                />

                <div className="text-end">
                  <input
                    type="submit"
                    className="btn btn-base bg-base text-white px-3 py-2"
                    value="Save Changes"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleRoom;
