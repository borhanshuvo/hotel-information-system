import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { ContextState } from "../context/contextProvider";
import { BASE_URL } from "../data/baseURL";
import { useScrollTop } from "../hook/useScrollTop";

const ResetPassword = () => {
  const [newUser, setNewUser] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { navigate, setUser, setAccessToken, loading, setLoading } =
    ContextState();

  const onResetPassword = (data, e) => {
    setLoading(true);
    fetch(`${BASE_URL}/user/reset-password`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
          setLoading(false);
          e.target.reset();
        } else {
          setLoading(false);
          toast.error(result.message);
        }
      });
  };

  useScrollTop();

  return (
    <section>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <div>
        <Navbar />
      </div>
      <div className="container pt-5 mt-5">
        <div className="row mt-5">
          <div className="col-md-7 col-lg-5 mx-auto">
            {loading && (
              <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary mb-5" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            <div className="login-style">
              <h4 className="text-center">Password Reset</h4>
              <br />
              <form onSubmit={handleSubmit(onResetPassword)}>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    name="email"
                    autoComplete="off"
                    {...register("email", { required: true })}
                    className="form-control"
                  />
                </div>
                {errors.email && (
                  <span className="text-danger">Email Required</span>
                )}

                <div>
                  <input
                    type="submit"
                    className="btn btn-base bg-base text-white form-control"
                    value="Send"
                  />
                </div>
              </form>
              <br />
              <p className="text-center">
                <Link to="/login">Already have an Account?</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </section>
  );
};
export default ResetPassword;
