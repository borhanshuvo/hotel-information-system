import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { toast } from "react-toastify";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { ContextState } from "../context/contextProvider";
import { BASE_URL } from "../data/baseURL";

const AllHotels = () => {
  const [allHotels, setAllHotels] = useState([]);
  const { number, loading, setLoading, navigate } = ContextState();
  const [dis, setDis] = useState(50);

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}/hotel/get`)
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setAllHotels(result.hotels);
          setLoading(false);
        } else {
          toast.error(result.message);
          setLoading(false);
        }
      });
  }, [number, setLoading]);

  return (
    <section>
      <div>
        <Navbar />
      </div>
      <div className="py-5 my-md-5">
        <h1 className="text-center fw-700 pb-5">Hotel</h1>
        <div className="container">
          <div className="row justify-content-center">
            {loading && (
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
            {allHotels?.map((hotel, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div
                  className="card border-0 shadow cursor-pointer card-hover-1"
                  onClick={() => navigate(`hotel/${hotel?._id}`)}
                >
                  <div className="card-header position-relative">
                    <img
                      src={`${BASE_URL}/${hotel?.hotelImageURL}`}
                      className="img-fluid"
                      alt=""
                    />
                    {dis && (
                      <div className="position-absolute top-0 end-0">
                        <p className="bg-base text-white py-2 px-3 rounded fs-600">
                          {dis}% Discount
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="card-body">
                    <ReactStars
                      count={5}
                      size={24}
                      isHalf={true}
                      value={1.5}
                      edit={false}
                      activeColor="#FF9F26"
                    />
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="card-title">{hotel?.name}</p>
                        <p className="card-title">{hotel?.address}</p>
                      </div>
                      <div>
                        <p className="mb-0 fs-20 text-base fw-600">৳5000</p>
                        <p className="mb-0">
                          <small>Per Night</small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </section>
  );
};

export default AllHotels;
