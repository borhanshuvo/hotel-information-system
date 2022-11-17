import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { ContextState } from "../../context/contextProvider";
import { BASE_URL } from "../../data/baseURL";

const UserProfile = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const {
    accessToken,
    user,
    setUser,
    number,
    setNumber,
    loading,
    setLoading,
    navigate,
  } = ContextState();
  const [allInfo, setAllInfo] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/user/get-user/${user?._id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setAllInfo(result);
          const { name, email, phoneNumber } = result?.user;
          reset({
            name,
            email,
            phoneNumber,
          });
        }
      });
  }, [accessToken, user?._id, reset, number]);

  const handleProfileChange = (e) => {
    const newFile = e.target.files[0];
    setProfileImage(newFile);
  };

  const updateProfile = (data, e) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("profileImageURL", profileImage);

    fetch(`${BASE_URL}/user/user-update/${data._id}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setUser(result?.user);
          localStorage.setItem("userInfo", JSON.stringify(result?.user));
          setNumber(number + 1);
          toast.success("Profile update successfully!!!");
        }
      });
  };

  const updatePassword = (data, e) => {
    setLoading(true);
    fetch(`${BASE_URL}/user/password-change`, {
      mode: "cors",
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        email: user?.email,
        oldPassword: data.oldPassword,
        newPassword: data.password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          toast.success(`${result.message} & Please login again`);
          e.target.reset();
          setTimeout(() => {
            localStorage.removeItem("userInfo");
            localStorage.removeItem("token");
            setUser({});
            navigate("/login");
          }, 2000);
          setLoading(false);
        } else {
          toast.error(result.message);
          setLoading(false);
        }
      });
  };

  return (
    <section>
      <Helmet>
        <title>Dashboard || Profile</title>
      </Helmet>
      <h1 className="font-roboto fw-700 fs-38 pt-5">Profile</h1>
      <hr className="pt-4" />
      <form onSubmit={handleSubmit(updateProfile)}>
        <div className="instructor-form-container">
          <div className="row">
            <div className="col-lg-4 p-5">
              <div className="fs-16 text-gunmetal">
                <p className="fw-700">Basic Information</p>
                <p>Update Profile.</p>
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
                  defaultValue={allInfo?.user?.name}
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
                  disabled
                  defaultValue={allInfo?.user?.email}
                  {...register("email", { required: true })}
                />
                {errors.email && <span>This field is required</span>}
              </div>

              <div className="mb-3">
                <label htmlFor="phoneNumber" className="instructor-label">
                  Phone
                </label>
                <input
                  type="text"
                  className="instructor-control form-control"
                  id="phoneNumber"
                  autoCapitalize="off"
                  autoComplete="off"
                  defaultValue={allInfo?.user?.phoneNumber}
                  {...register("phoneNumber")}
                />
                {errors.phoneNumber && <span>This field is required</span>}
              </div>

              <div className="text-start">
                <img
                  src={`${BASE_URL}/${allInfo?.user?.profileImageURL}`}
                  height={80}
                  width={80}
                  alt=""
                />
              </div>

              <div className="mb-3">
                <label htmlFor="image" className="instructor-label">
                  Profile Image
                </label>
                <input
                  type="file"
                  className="cursor-pointer border"
                  id="image"
                  accept="image/*"
                  onChange={handleProfileChange}
                />
              </div>

              <input
                type="hidden"
                defaultValue={allInfo?.user?._id}
                {...register("_id")}
              />
            </div>
          </div>
        </div>

        <div className="d-md-flex justify-content-end">
          <input
            type="submit"
            className="btn btn-base bg-base text-white px-5 py-2"
          />
        </div>
      </form>
      <form onSubmit={handleSubmit(updatePassword)}>
        <div className="instructor-form-container">
          <div className="row">
            <div className="col-lg-4 p-5">
              <div className="fs-16 text-gunmetal">
                <p className="fw-700">Update Your Password</p>
                <p>Change your password.</p>
              </div>
            </div>
            <div className="col-lg-8 instructor-form p-5">
              <div className="">
                <div className="mb-3">
                  <label htmlFor="oldPassword" className="instructor-label">
                    Old Password
                  </label>
                  <div className="input-group">
                    <input
                      type={show ? "text" : "password"}
                      className="instructor-control form-control"
                      id="oldPassword"
                      autoCapitalize="off"
                      autoComplete="off"
                      {...register("oldPassword")}
                    />
                    <div
                      className="input-group-text"
                      onClick={() => setShow(!show)}
                    >
                      {!show ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="instructor-label">
                    New Password
                  </label>
                  <div className="input-group">
                    <input
                      type={show ? "text" : "password"}
                      className="instructor-control form-control"
                      id="password"
                      autoCapitalize="off"
                      autoComplete="off"
                      {...register("password")}
                    />
                    <div
                      className="input-group-text"
                      onClick={() => setShow(!show)}
                    >
                      {!show ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-md-flex justify-content-end">
          <input
            type="submit"
            className="btn btn-base bg-base text-white px-5 py-2"
          />
        </div>
      </form>
    </section>
  );
};

export default UserProfile;
