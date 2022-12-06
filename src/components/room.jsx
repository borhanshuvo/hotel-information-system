import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ContextState } from "../context/contextProvider";
import { BASE_URL } from "../data/baseURL";

const Room = ({ hotel, room, index }) => {
  const { user, accessToken, navigate, setShowConfetti } = ContextState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [startDate, setStartDate] = useState(new Date());
  const tomorrow = new Date(startDate);
  const nextDate = tomorrow.setDate(startDate.getDate() + 1);
  const [endDate, setEndDate] = useState(tomorrow.setDate(tomorrow.getDate()));

  const numberDates = (startDate, endDate) => {
    const start = new Date(startDate); //clone
    const end = new Date(endDate); //clone
    let dayCount = 0;

    while (end > start) {
      dayCount++;
      start.setDate(start.getDate() + 1);
    }

    return dayCount;
  };

  const addBooking = (data, e) => {
    const hotelDiscount = parseInt(hotel?.discount);
    const roomDiscount = parseInt(room?.discount);
    const numberOfBed = parseInt(data.numberOfBed);
    const bedPrice = parseInt(room?.bedPrice);
    const price = parseInt(room?.price);
    const date = parseInt(numberDates(startDate, endDate));

    let totalPrice;
    if (hotelDiscount > 0) {
      const total = (price + numberOfBed * bedPrice) * date;
      totalPrice = total - total * (hotelDiscount / 100);
    } else if (roomDiscount > 0) {
      const total = (price + numberOfBed * bedPrice) * date;
      totalPrice = total - total * (roomDiscount / 100);
    } else {
      totalPrice = (price + numberOfBed * bedPrice) * date;
    }

    const bookingInfo = {
      customerName: user?.name,
      customerEmail: user?.email,
      customerPhoneNumber: user?.phoneNumber,
      rooms: room?._id,
      hotels: hotel._id,
      roomPrice: room?.price,
      numberOfBed: parseInt(data.numberOfBed),
      bedPrice: parseInt(room.bedPrice),
      adult: parseInt(data.adult),
      child: parseInt(data.child),
      totalDays: date,
      from: startDate,
      to: new Date(endDate),
      price: totalPrice,
      discount:
        hotelDiscount > 0 ? hotelDiscount : roomDiscount > 0 ? roomDiscount : 0,
    };

    fetch(`${BASE_URL}/booking/add-booking`, {
      mode: "cors",
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookingInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          window.location.replace(result.url);
        }
      });
  };

  const handleCheckLogin = () => {
    if (!user?.email) {
      toast.error("Please Login First");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };
  return (
    <>
      <div
        className="row border p-2 rounded mt-3 align-items-center accordion"
        id={`accordionExample${index + 1}`}
        key={index}
      >
        <div className="col-lg-3 mb-3 position-relative">
          <img
            src={`${BASE_URL}/${room?.roomImageURL}`}
            className="img-fluid rounded"
            alt=""
          />
          {room?.discount > 0 && (
            <div className="position-absolute top-0 start-0">
              <p
                className="bg-base text-white py-1 px-2 rounded fs-600"
                style={{ fontSize: "12px" }}
              >
                {room?.discount}% Discount
              </p>
            </div>
          )}
        </div>
        <div className="col-lg-3 mb-3">
          <p className="text-capitalize mb-1 fs-20">{room?.name}</p>
          <p className="mb-1">Adult: {room?.adult}</p>
          <p className="mb-1">Child: {room?.child}</p>
        </div>
        <div className="col-lg-3 mb-3">
          <p className="mb-0">
            <span className="fs-20 text-base fw-600">৳{room?.price}</span>{" "}
            <small>Per Night</small>
          </p>
          <p
            className="bg-base text-white py-2 px-3 d-inline-block mt-3 rounded cursor-pointer"
            data-bs-toggle="collapse"
            data-bs-target={`#collapseOne${index + 1}`}
            aria-expanded="true"
            aria-controls={`collapseOne${index + 1}`}
          >
            More Details
          </p>
        </div>
        <div className="col-lg-3 mb-3">
          {/* <p className="d-flex mb-1">No Room: {data?.numberOfRoom}</p> */}
          <p className="d-flex">Extra Bed: {room?.numberOfBed}</p>
          <p>
            <input
              type="submit"
              value="Book Now"
              data-bs-toggle={user?.email ? "modal" : ""}
              data-bs-target={`#bookingConfirm${index}`}
              className="btn btn-base bg-base text-white px-4"
              onClick={handleCheckLogin}
            />
          </p>
        </div>
        <div className="col-lg-12">
          <div
            id={`collapseOne${index + 1}`}
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent={`#accordionExample${index + 1}`}
          >
            <div className="border-top py-3 text-align-justify">
              {room?.roomAmenities}
            </div>
          </div>
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
                <form onSubmit={handleSubmit(addBooking)}>
                  <div className="mb-3">
                    <p htmlFor="name" className="form-label text-start">
                      Number Of Extra Bed (৳ {room?.bedPrice})
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
                      {[...Array(room?.numberOfBed)].map((data, index) => (
                        <option defaultValue={index + 1}>{index + 1}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="adult" className="form-label">
                      Adult ( {room?.adult} allow)
                    </label>
                    <input
                      type="number"
                      className="form-control shadow-none"
                      max={room?.adult}
                      defaultValue={1}
                      min={1}
                      id="adult"
                      {...register("adult", {
                        required: true,
                      })}
                    />
                    {errors.adult && <span>This field is required</span>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="child" className="form-label">
                      Child ( {room?.child} allow)
                    </label>
                    <input
                      type="number"
                      className="form-control shadow-none"
                      max={room?.child}
                      defaultValue={0}
                      min={0}
                      id="child"
                      {...register("child", {
                        required: true,
                      })}
                    />
                    {errors.child && <span>This field is required</span>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Check-in
                    </label>
                    <DatePicker
                      selected={startDate}
                      minDate={new Date()}
                      onChange={(date) => setStartDate(date)}
                      className="form-control shadow-none"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Check-out
                    </label>
                    <DatePicker
                      selected={endDate}
                      minDate={nextDate}
                      onChange={(date) => setEndDate(date)}
                      className="form-control shadow-none"
                    />
                  </div>

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
    </>
  );
};

export default Room;
