import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ContextState } from "../context/contextProvider";
import { BASE_URL } from "../data/baseURL";

const Room = ({ hotel, data, index }) => {
  const { user } = ContextState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addBooking = (data, e) => {
    console.log(data);
    const hotelDiscount = hotel?.discount / 100;
    const roomDiscount = data.discount / 100;
    const numberOfRoom = data.numberOfRoom;
    const numberOfBed = data.numberOfBed;
    const bedPrice = data.bedPrice;
    const price = data.price;
    let totalPrice;
    if (hotelDiscount > 0) {
      totalPrice =
        numberOfRoom * price +
        numberOfBed * bedPrice -
        (numberOfRoom * price + numberOfBed * bedPrice) * hotelDiscount;
    } else if (roomDiscount > 0) {
      totalPrice =
        numberOfRoom * price +
        numberOfBed * bedPrice -
        (numberOfRoom * price + numberOfBed * bedPrice) * roomDiscount;
    } else {
      totalPrice = numberOfRoom * price + numberOfBed * bedPrice;
    }
    alert(totalPrice);
  };

  const handleCheckLogin = () => {
    if (!user?.email) {
      toast.error("Please Login First");
    }
  };
  return (
    <div className="row border p-2 rounded mt-3 align-items-center" key={index}>
      <div className="col-lg-3 mb-3 position-relative">
        <img
          src={`${BASE_URL}/${data?.roomImageURL}`}
          className="img-fluid rounded"
          alt=""
        />
        {data?.discount > 0 && (
          <div className="position-absolute top-0 start-0">
            <p
              className="bg-base text-white py-1 px-2 rounded fs-600"
              style={{ fontSize: "12px" }}
            >
              {data?.discount}% Discount
            </p>
          </div>
        )}
      </div>
      <div className="col-lg-3 mb-3">
        <p className="text-capitalize mb-1 fs-20">{data?.name}</p>
        <p className="mb-1">Adult: {data?.adult}</p>
        <p className="mb-1">Child: {data?.child}</p>
      </div>
      <div className="col-lg-3 mb-3">
        <p className="mb-0">
          <span className="fs-20 text-base fw-600">৳{data?.price}</span>{" "}
          <small>Per Night</small>
        </p>
        <p className="bg-base text-white py-2 px-3 d-inline-block mt-3 rounded">
          More Details
        </p>
      </div>
      <div className="col-lg-3">
        <p className="d-flex mb-1">
          No Room: {data?.numberOfRoom}
          {/* <select
            className="form-select"
            {...register("numberOfRoom", { required: true })}
          >
            <option selected>Select Room</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select> */}
        </p>
        <p className="d-flex">
          Total Bed: {data?.numberOfBed}
          {/* <select
            className="form-select"
            {...register("numberOfBed", { required: true })}
          >
            <option selected>Select If Needed</option>
            <option value={500}>1 - ৳500</option>
            <option value={900}>2 - ৳900</option>
            <option value={1200}>3 - ৳1200</option>
          </select> */}
        </p>
        <p>
          <input
            type="submit"
            value="Book Now"
            data-bs-toggle={user?.email ? "modal" : ""}
            data-bs-target={`#bookingConfirm${index}`}
            className="btn btn-base bg-base text-white px-5 w-100"
            onClick={handleCheckLogin}
          />
        </p>
      </div>
      {/* Modal */}
      <div
        className="modal fade"
        id={`bookingConfirm${index}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {data?.name}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(addBooking)}>
                <div className="mb-3">
                  <p htmlFor="name" className="form-label text-start">
                    Name
                  </p>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={data?.name}
                    id="name"
                    autoComplete="off"
                    {...register("name", { required: true })}
                  />
                  {errors.name && <span>This field is required</span>}
                </div>

                <div className="mb-3">
                  <p htmlFor="name" className="form-label text-start">
                    Number Of Room (৳ {data?.price})
                  </p>
                  <select
                    className="form-select"
                    {...register("numberOfRoom", {
                      required: true,
                    })}
                  >
                    {[...Array(data?.numberOfRoom)].map((data, index) => (
                      <option
                        defaultValue={index + 1}
                        selected={index === 0 ? true : false}
                      >
                        {index + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <p htmlFor="name" className="form-label text-start">
                    Number Of Extra Bed (৳ {data?.bedPrice})
                  </p>
                  <select
                    className="form-select"
                    {...register("numberOfBed", {
                      required: true,
                    })}
                  >
                    <option value={0} selected>
                      Please select if you need extra bed
                    </option>
                    {[...Array(data?.numberOfBed)].map((data, index) => (
                      <option defaultValue={index + 1}>{index + 1}</option>
                    ))}
                  </select>
                </div>

                <input
                  type="hidden"
                  defaultValue={data?._id}
                  {...register("_id")}
                />

                <input
                  type="hidden"
                  defaultValue={data?.price}
                  {...register("price")}
                />

                <input
                  type="hidden"
                  defaultValue={data?.bedPrice}
                  {...register("bedPrice")}
                />

                <input
                  type="hidden"
                  defaultValue={data?.discount}
                  {...register("discount")}
                />

                <div className="text-end">
                  <input
                    type="submit"
                    className="btn btn-base bg-base text-white px-3 py-2"
                    value="Confirm"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
