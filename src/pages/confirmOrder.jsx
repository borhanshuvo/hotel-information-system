import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ContextState } from "../context/contextProvider";
import { BASE_URL } from "../data/baseURL";
import successImg from "../images/vfmov3.gif";

const ConfirmOrder = () => {
  const { id } = useParams();
  const { accessToken, setShowConfetti, navigate } = ContextState();
  const [bookingInfo, setBookingInfo] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch(`${BASE_URL}/booking/transaction/${id}`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setBookingInfo(result.bookingInfo);
        } else {
          navigate("/");
          toast.error(result.message);
        }
      });
  }, [id, accessToken, navigate]);

  const validatePayment = (data) => {
    const tranId = bookingInfo?.tranId;
    const valId = bookingInfo?.valId;
    const rating = parseInt(data.rating);

    fetch(`${BASE_URL}/booking/validate`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        tranId,
        valId,
        rating,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setShowConfetti(true);
          toast.success(result.message);
          setTimeout(() => {
            setShowConfetti(false);
            navigate("/dashboard");
          }, 3000);
        } else {
          toast.error(result.message);
        }
      });
  };

  return (
    <div style={{ backgroundColor: "#fafafa" }}>
      <div className="container">
        <div className="text-center">
          <h1 className="my-5 pt-md-5">
            Payment Successful. Confirm your Order
          </h1>
          <div className="row justify-content-center">
            <div className="col-md-4">
              <form onSubmit={handleSubmit(validatePayment)}>
                <div className="mb-3">
                  <label
                    htmlFor="rating"
                    className="instructor-label text-start"
                  >
                    Review
                  </label>
                  <select
                    {...register("rating")}
                    className="instructor-control form-select border"
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5} selected>
                      5
                    </option>
                  </select>
                </div>

                <div className="col-12 mb-3 mt-3">
                  <input
                    type="submit"
                    value="Confirm"
                    className="btn btn-base bg-base text-white px-5"
                  />
                </div>
              </form>
            </div>
          </div>
          <div>
            <img src={successImg} className="img-fluid" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
