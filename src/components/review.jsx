import React, { useEffect, useState } from "react";
import { BASE_URL } from "../data/baseURL";
import { reviewDummyData } from "../data/reviewData";
import quoteIcon from "../images/icon.svg";

const Review = () => {
  const [number, setNumber] = useState(0);
  const [reviewData, setReviewData] = useState([]);
  const [currentReview, setCurrentReview] = useState(reviewData[number]);

  useEffect(() => {
    fetch(`${BASE_URL}/review/get-review`)
      .then((res) => res.json())
      .then((result) => {
        if (result?.success) {
          setReviewData(result.reviews);
        } else {
          setReviewData(reviewDummyData);
        }
      });
  }, []);

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
  }, [number, reviewData]);

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
              src={`${BASE_URL}${currentReview?.users?.profileImageURL}`}
              alt="Loading..."
              width="70"
              height="70"
              className="rounded-circle borderColor"
            />
            <p className="fst-italic my-3 fs-14 lh-32">
              “{currentReview?.review}”
            </p>
            <h3 className="fw-bold fs-18 font-family-roboto lh-26">
              {currentReview?.users?.name}
            </h3>
          </div>
          <div className="position-absolute right-38 d-flex flex-md-column">
            {reviewData?.slice(0, 5)?.map((data, index) => {
              return (
                <div
                  key={data._id}
                  className="cursor-pointer mx-1"
                  onClick={() => handleChange(index)}
                >
                  {currentReview?._id === data?._id ? (
                    <img
                      src={`${BASE_URL}${data?.users?.profileImageURL}`}
                      alt="Loading..."
                      height="30"
                      width="30"
                      className="rounded-circle border border-warning"
                    />
                  ) : (
                    <img
                      src={`${BASE_URL}${data?.users?.profileImageURL}`}
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
