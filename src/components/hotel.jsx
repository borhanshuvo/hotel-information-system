import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ContextState } from "../context/contextProvider";
import { BASE_URL } from "../data/baseURL";

const Hotel = () => {
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
    <section className="py-5 my-md-5" id="hotel">
      <h1 className="text-center fw-700 pb-5">Hotel</h1>
      <div className="container">
        <div className="row justify-content-center">
          {loading && (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          {allHotels?.slice(0, 6)?.map((hotel, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div
                className="card border-0 shadow cursor-pointer card-hover-1"
                onClick={() => navigate(`hotel/${hotel?._id}`)}
              >
                <div className="card-header position-relative">
                  <img
                    src={`${BASE_URL}/${hotel?.thumbnailImageURL}`}
                    className="img-fluid"
                    alt=""
                  />
                  {hotel?.discount > 0 && (
                    <div className="position-absolute top-0 end-0">
                      <p className="bg-base text-white py-2 px-3 rounded fs-600">
                        {hotel?.discount}% Discount
                      </p>
                    </div>
                  )}
                </div>
                <div className="card-body">
                  <ReactStars
                    count={5}
                    size={24}
                    isHalf={true}
                    value={hotel?.rating ? hotel?.rating : 5}
                    edit={false}
                    activeColor="#FF9F26"
                  />
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="card-title">{hotel?.user?.name}</p>
                      <p className="card-title">{hotel?.address}</p>
                    </div>
                    <div>
                      <p className="mb-0 fs-20 text-base fw-600">
                        ৳{hotel?.price}
                      </p>
                      <p className="mb-0">
                        <small>Per Night</small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {allHotels?.length <= 0 && (
            <div className="text-center">
              <p>Sorry!!! There is no hotel information in our system.</p>
            </div>
          )}
          {allHotels?.length > 6 && (
            <div className="text-center mt-5">
              <Link
                to="/all-hotel"
                className="text-decoration-none bg-base text-white py-2 px-4 fw-600 fs-20 rounded link-btn"
              >
                See More
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hotel;
