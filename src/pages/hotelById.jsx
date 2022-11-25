import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useParams } from "react-router-dom";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Room from "../components/room";
import { ContextState } from "../context/contextProvider";
import { BASE_URL } from "../data/baseURL";
import { useScrollTop } from "../hook/useScrollTop";

const HotelById = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState({});
  const [rooms, setRooms] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { setLoading } = ContextState();

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}/hotel/get/${id}`)
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
  }, [id, setLoading]);

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
            <form>
              <div className="row align-items-end border shadow p-2 rounded">
                <h5 className="mb-4 mt-2 text-center">Book Now</h5>
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
                  {/* <input type="date" className="form-control shadow-none" /> */}
                </div>

                <div className="col-12 mb-3">
                  <label htmlFor="" className="form-label">
                    Check-out
                  </label>
                  <DatePicker
                    selected={endDate}
                    minDate={new Date()}
                    onChange={(date) => setEndDate(date)}
                    className="form-control shadow-none"
                  />
                  {/* <input type="date" className="form-control shadow-none" /> */}
                </div>

                <div className="col-12 mb-3">
                  <label htmlFor="" className="form-label">
                    Adult
                  </label>
                  <input
                    type="number"
                    min={0}
                    defaultValue={0}
                    className="form-control shadow-none"
                  />
                </div>

                <div className="col-12 mb-3">
                  <label htmlFor="" className="form-label">
                    Children
                  </label>
                  <input
                    type="number"
                    min={0}
                    defaultValue={0}
                    className="form-control shadow-none"
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
      </div>
      <div>
        <Footer />
      </div>
    </section>
  );
};

export default HotelById;
