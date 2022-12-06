import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Room from "../components/room";
import { ContextState } from "../context/contextProvider";
import { BASE_URL } from "../data/baseURL";
import { useScrollTop } from "../hook/useScrollTop";

const HotelById = () => {
  const { id } = useParams();
  const search = useLocation().search;
  const adult = new URLSearchParams(search).get("adult") || 0;
  const child = new URLSearchParams(search).get("child") || 0;
  const [hotel, setHotel] = useState({});
  const [rooms, setRooms] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const tomorrow = new Date(startDate);
  const nextDate = tomorrow.setDate(startDate.getDate() + 1);
  const [endDate, setEndDate] = useState(tomorrow.setDate(tomorrow.getDate()));
  const { setLoading, user, accessToken, navigate } = ContextState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}/hotel/get/${id}?adult=${adult}&child=${child}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setRooms(result.room);
          setHotel(result.hotel);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
  }, [id, setLoading, adult, child]);

  const bookingInfoSearch = (data) => {
    navigate(`hotel/${id}?adult=${data.adult}&child=${data.child}`);
  };

  const handleReview = (data, e) => {
    fetch(`${BASE_URL}/review/add-review`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        users: user?._id,
        review: data.review,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
          e.target.reset();
        } else {
          toast.error(result.message);
        }
      });
  };

  useScrollTop();

  return (
    <section>
      <div>
        <Navbar />
      </div>
      <div className="container mt-5 pt-md-5">
        <h2>{hotel?.user?.name}</h2>
        <div className="row">
          <div className="col-md-8">
            <div className="card border-0 shadow">
              <div className="card-header shadow-none position-relative">
                <img
                  src={`${BASE_URL}/${hotel?.thumbnailImageURL}`}
                  className="img-fluid rounded"
                  alt=""
                />
                {hotel?.discount > 0 && (
                  <div className="position-absolute top-0 start-0">
                    <p className="bg-base text-white py-2 px-3 rounded fs-600">
                      {hotel?.discount}% Discount
                    </p>
                  </div>
                )}
              </div>
              <div className="card-body">
                <div>
                  <h5>Available Room</h5>
                  {rooms?.map((room, index) => (
                    <Room room={room} index={index} key={index} hotel={hotel} />
                  ))}
                  {rooms?.length <= 0 && (
                    <div className="text-center">
                      <p>Sorry!!! No room available.</p>
                    </div>
                  )}
                </div>
                <div>
                  <h5 className="my-4">Hotel Overview</h5>
                  <p className="text-align-justify">{hotel?.overview}</p>
                </div>
                <div>
                  <h5 className="my-4">Location</h5>
                  <p>
                    <iframe
                      src={hotel?.locationId}
                      width="100%"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Hotel"
                    ></iframe>
                  </p>
                </div>
                <div>
                  <h5 className="my-4">Privacy & Policy</h5>
                  <p className="text-align-justify">{hotel?.policy}</p>
                  <p className="">Check-in At: {hotel?.checkIn}</p>
                  <p className="">Check-in Out: {hotel?.checkOut}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-5 mt-md-0">
            <form
              className="position-sticky top-0"
              onSubmit={handleSubmit(bookingInfoSearch)}
            >
              <div className="row align-items-end border shadow p-2 rounded">
                <h5 className="mb-4 mt-2 text-center">{hotel?.user?.name}</h5>
                <hr />
                <div className="col-12">
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

                <div className="col-12 mb-3">
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

                <div className="col-12 mb-3">
                  <label htmlFor="adult" className="form-label">
                    Adult
                  </label>
                  <input
                    type="number"
                    id="adult"
                    min={0}
                    defaultValue={0}
                    className="form-control shadow-none"
                    {...register("adult")}
                  />
                </div>

                <div className="col-12 mb-3">
                  <label htmlFor="child" className="form-label">
                    Child
                  </label>
                  <input
                    type="number"
                    id="child"
                    min={0}
                    defaultValue={0}
                    className="form-control shadow-none"
                    {...register("child")}
                  />
                </div>

                <div className="col-12 mb-3 mt-3">
                  <input
                    type="submit"
                    value="Search"
                    className="btn bg-base btn-base text-white w-100 shadow-none"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        {user?.role === "customer" ? (
          <div className="row">
            <div className="col-md-8">
              <div className="card border-0 shadow mt-5">
                <div className="card-body">
                  <form onSubmit={handleSubmit(handleReview)}>
                    <h5 className="mb-4 mt-2 text-center">Write Review</h5>
                    <hr />
                    <div className="row">
                      <div className="mb-3">
                        <label htmlFor="name" className="instructor-label">
                          Name
                        </label>
                        <input
                          type="text"
                          defaultValue={user?.name}
                          disabled={true}
                          className="instructor-control form-control"
                          id="name"
                          autoComplete="off"
                          {...register("name")}
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="email" className="instructor-label">
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue={user?.email}
                          disabled={true}
                          className="instructor-control form-control"
                          id="email"
                          autoCapitalize="off"
                          autoComplete="off"
                          {...register("email")}
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="review" className="instructor-label">
                          Review
                        </label>
                        <textarea
                          name="review"
                          id="review"
                          cols="30"
                          rows="10"
                          className="instructor-textarea-control form-control border"
                          autoCapitalize="off"
                          autoComplete="off"
                          {...register("review")}
                        ></textarea>
                      </div>

                      <div className="col-12 mb-3 mt-3">
                        <input
                          type="submit"
                          value="Submit"
                          className="btn bg-base btn-base text-white w-100 shadow-none"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div>
        <Footer />
      </div>
    </section>
  );
};

export default HotelById;
