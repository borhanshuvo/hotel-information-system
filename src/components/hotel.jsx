import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ContextState } from "../context/contextProvider";
import { BASE_URL } from "../data/baseURL";

const Hotel = () => {
  const [allHotels, setAllHotels] = useState([]);
  const { number } = ContextState();

  useEffect(() => {
    fetch(`${BASE_URL}/hotel/get`)
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setAllHotels(result.hotels);
        } else {
          toast.error(result.message);
        }
      });
  }, [number]);

  return (
    <section className="py-5 my-md-5" id="hotel">
      <h1 className="text-center fw-700 pb-5">Hotel</h1>
      <div className="container">
        <div className="row justify-content-center">
          {allHotels?.map((hotel, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card cursor-pointer card-hover-1">
                <div className="card-header">
                  <img
                    src={`${BASE_URL}/${hotel?.hotelImageURL}`}
                    className="img-fluid"
                    alt=""
                  />
                  <div className="card-body">
                    <p className="card-title">{hotel?.name}</p>
                    <p className="card-title">{hotel?.address}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hotel;
