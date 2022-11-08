import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { ContextState } from "../context/contextProvider";
import { BASE_URL } from "../data/baseURL";
// import infoEmoji from "../images/info-emoji.svg";

const Login = () => {
  const [newUser, setNewUser] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { navigate, setUser, setAccessToken } = ContextState();

  const onSubmitLogin = (data) => {
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
          navigate("/dashboard");
        } else {
          toast.error(result.message);
        }
      });
  };

  const onSubmitRegister = (data, e) => {
    fetch(`${BASE_URL}/user/post`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          toast.success("Account create successfully!!!");
          e.target.reset();
        } else {
          toast.error(result.message);
        }
      });
  };

  const [show, setShow] = useState("block");

  return (
    <>
      <Navbar />
      <div className="container pt-5 mt-5">
        <div className="row mt-5">
          <div className="login-style">
            {/* <div style={{ display: show }} className="card pb-2 mb-5">
              <div className="d-flex justify-content-between p-2">
                <strong>
                  <img src={infoEmoji} className="rounded me-2" alt="" />
                  Login Information
                </strong>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                  onClick={() => setShow("none")}
                ></button>
              </div>
              <div className="text-center">
                <span>Admin: admin@gmail.com || Pass: 12345678</span>
                <br />
                <span>Member: member@gmail.com || Pass: 12345678</span>
              </div>
            </div> */}
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
                    className="btn btn-primary form-control"
                    value="Sign in"
                  />
                </div>
              </form>
            )}
            {newUser && (
              <form onSubmit={handleSubmit(onSubmitRegister)}>
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

                <div className="mb-3">
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
                )}

                <div>
                  <input
                    type="submit"
                    className="btn btn-primary form-control"
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
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
