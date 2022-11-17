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

const Login = () => {
  const [newUser, setNewUser] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { navigate, setUser, setAccessToken, loading, setLoading } =
    ContextState();

  const onSubmitLogin = (data, e) => {
    setLoading(true);
    fetch(`${BASE_URL}/login/post`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setUser(result?.user);
          setAccessToken(result.accessToken);
          localStorage.setItem("userInfo", JSON.stringify(result?.user));
          localStorage.setItem("token", JSON.stringify(result.accessToken));
          setLoading(false);
          e.target.reset();
          navigate("/dashboard");
        } else {
          setLoading(false);
          toast.error(result.message);
        }
      });
  };

  const onSubmitRegister = (data, e) => {
    setLoading(true);
    fetch(`${BASE_URL}/user/add-user`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        // password: data.password,
        role: data.role,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setLoading(false);
          toast.success(result.message);
          e.target.reset();
        } else {
          setLoading(false);
          toast.error(result.message);
        }
      });
  };

  useScrollTop();

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Navbar />
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
              <h4 className="text-center">
                {newUser ? "Registration" : "Login"}
              </h4>
              <br />
              {!newUser && (
                <form onSubmit={handleSubmit(onSubmitLogin)}>
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
                    <span className="text-danger">This field is required</span>
                  )}

                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      name="password"
                      autoComplete="off"
                      {...register("password", { required: true })}
                      className="form-control"
                    />
                  </div>
                  {errors.password && (
                    <span className="text-danger">This field is required</span>
                  )}

                  <div>
                    <input
                      type="submit"
                      className="btn btn-base bg-base text-white form-control"
                      value="Sign in"
                    />
                  </div>
                </form>
              )}
              {newUser && (
                <form onSubmit={handleSubmit(onSubmitRegister)}>
                  <div className="mb-3">
                    <label className="form-label">Choose your Role</label>
                    <select
                      className="form-select"
                      {...register("role", { required: true })}
                    >
                      <option value="customer" selected>
                        Customer
                      </option>
                      <option value="hotel">Hotel</option>
                    </select>
                  </div>
                  {errors.role && (
                    <span className="text-danger">This field is required</span>
                  )}

                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      autoComplete="off"
                      className="form-control"
                      {...register("name", { required: true })}
                    />
                  </div>
                  {errors.name && (
                    <span className="text-danger">This field is required</span>
                  )}

                  <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                      type="email"
                      name="email"
                      autoComplete="off"
                      className="form-control"
                      {...register("email", { required: true })}
                    />
                  </div>
                  {errors.email && (
                    <span className="text-danger">This field is required</span>
                  )}

                  {/* <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      name="password"
                      autoComplete="off"
                      className="form-control"
                      {...register("password", { required: true })}
                    />
                  </div>
                  {errors.password && (
                    <span className="text-danger">This field is required</span>
                  )}

                  <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      name="cPassword"
                      autoComplete="off"
                      className="form-control"
                      {...register("cPassword", { required: true })}
                    />
                  </div>
                  {errors.cPassword && (
                    <span className="text-danger">This field is required</span>
                  )} */}

                  <div>
                    <input
                      type="submit"
                      className="btn btn-base bg-base text-white form-control"
                      value="Sign up"
                    />
                  </div>
                </form>
              )}
              <br />
              <p className="text-center">
                {newUser ? "Already have an Account? " : "Don't have account? "}
                <button
                  name="newUser"
                  onClick={() => setNewUser(!newUser)}
                  style={{
                    border: "none",
                    backgroundColor: "white",
                    color: "blue",
                  }}
                >
                  {newUser ? "Login" : "Create a new Account"}
                </button>
              </p>
              <p className="text-center">
                <Link to="/reset-password">Forget Password</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
