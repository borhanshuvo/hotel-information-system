import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { BASE_URL } from "../../data/baseURL";

const AddUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [show, setShow] = useState(false);

  const addInstructor = (data, e) => {
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
          toast.success(result.message);
          e.target.reset();
        } else {
          toast.error(result.message);
        }
      });
  };

  return (
    <div className="">
      <Helmet>
        <title>Dashboard || Add User</title>
      </Helmet>
      <h1 className="font-roboto fw-700 fs-38 pt-5">Add User</h1>
      <hr className="pt-4" />
      <form onSubmit={handleSubmit(addInstructor)}>
        <div className="instructor-form-container">
          <div className="row">
            <div className="col-lg-4 p-5">
              <div className="fs-16 text-gunmetal">
                <p className="fw-700">Basic Information</p>
                <p>Create an account details for Instructor.</p>
              </div>
            </div>
            <div className="col-lg-8 instructor-form p-5">
              <div className="mb-3">
                <label htmlFor="name" className="instructor-label">
                  Name
                </label>
                <input
                  type="text"
                  className="instructor-control form-control"
                  id="name"
                  autoComplete="off"
                  {...register("name", { required: true })}
                />
                {errors.name && <span>This field is required</span>}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="instructor-label">
                  Email
                </label>
                <input
                  type="email"
                  className="instructor-control form-control"
                  id="email"
                  autoCapitalize="off"
                  autoComplete="off"
                  {...register("email", { required: true })}
                />
                {errors.email && <span>This field is required</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="instructor-form-container">
          <div className="row">
            <div className="col-lg-4 p-5">
              <div className="fs-16 text-gunmetal">
                <p className="fw-700">Create Password</p>
                <p>Create password for User.</p>
              </div>
            </div>
            <div className="col-lg-8 instructor-form p-5">
              <div className="">
                <div className="mb-3">
                  <label htmlFor="password" className="instructor-label">
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      type={show ? "text" : "password"}
                      className="instructor-control form-control"
                      id="password"
                      autoCapitalize="off"
                      autoComplete="off"
                      {...register("password", { required: true })}
                    />
                    <div
                      class="input-group-text"
                      onClick={() => setShow(!show)}
                    >
                      {!show ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </div>
                  </div>
                  {errors.password && <span>This field is required</span>}
                </div>

                <div className="mb-3">
                  <label htmlFor="cPassword" className="instructor-label">
                    Confirm Password
                  </label>
                  <div className="input-group">
                    <input
                      type={show ? "text" : "password"}
                      className="instructor-control form-control"
                      id="cPassword"
                      autoCapitalize="off"
                      autoComplete="off"
                      {...register("cPassword", { required: true })}
                    />
                    <div
                      class="input-group-text"
                      onClick={() => setShow(!show)}
                    >
                      {!show ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </div>
                  </div>
                  {errors.cPassword && <span>This field is required</span>}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-md-flex justify-content-end">
          <input type="submit" className="btn btn-warning px-5 py-2" />
        </div>
      </form>
    </div>
  );
};

export default AddUser;
