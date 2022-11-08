import React, { useEffect, useState } from "react";
import { reviewData } from "../data/reviewData";
import quoteIcon from "../images/icon.svg";

const Review = () => {
  const [number, setNumber] = useState(0);
  const [currentReview, setCurrentReview] = useState(reviewData[number]);
  console.log(currentReview);

  useEffect(() => {
    const interval = setInterval(() => {
      if (number >= reviewData.length - 1) {
        setNumber(0);
        setCurrentReview(reviewData[number]);
      } else {
        setNumber(number + 1);
        setCurrentReview(reviewData[number]);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [number]);

  const handleChange = (id) => {
    setCurrentReview(reviewData[id]);
  };
  return (
    <section className="container py-5 my-md-5" id="review">
      <h1 className="text-center fw-700 pb-5">Review</h1>
      <div className="row">
        <div className="col-12 col-md-7 boxShadow mx-auto mb-3 mt-5 position-relative">
          <div className="position-absolute left-38">
            <img src={quoteIcon} alt="quoteIcon" height="80" width="80" />
          </div>
          <div className="p-2 p-md-5 text-center">
            <img
              src={currentReview?.image}
              alt="Loading..."
              width="70"
              height="70"
              className="rounded-circle borderColor"
            />
            <p className="fst-italic my-3 fs-14 lh-32">
              “{currentReview?.text}”
            </p>
            <h3 className="fw-bold fs-18 font-family-roboto lh-26">
              {currentReview?.name}
            </h3>
            <p className="fs-14 lh-26">{currentReview?.jobTitle}</p>
          </div>
          <div className="position-absolute right-38 d-flex flex-md-column">
            {reviewData.map((data, index) => {
              return (
                <div
                  key={data._id}
                  className="cursor-pointer mx-1"
                  onClick={() => handleChange(index)}
                >
                  {currentReview.id === data.id ? (
                    <img
                      src={data?.image}
                      alt="Loading..."
                      height="30"
                      width="30"
                      className="rounded-circle border border-warning"
                    />
                  ) : (
                    <img
                      src={data?.image}
                      alt="Loading..."
                      height="24"
                      width="24"
                      className="rounded-circle border border-warning"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Review;
