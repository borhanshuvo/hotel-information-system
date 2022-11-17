import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { ContextState } from "../../../context/contextProvider";
import { BASE_URL } from "../../../data/baseURL";

const Profile = () => {
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
    navigate,
    setLoading,
  } = ContextState();
  const [show, setShow] = useState(false);
  const [allInfo, setAllInfo] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [hotelImage, setHotelImage] = useState(null);

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
          const {
            _id,
            address,
            price,
            discount,
            activate,
            overview,
            locationId,
            checkIn,
            checkOut,
            policy,
          } = result?.hotelInfo;
          reset({
            _id,
            name,
            email,
            phoneNumber,
            address,
            overview,
            locationId,
            checkIn,
            checkOut,
            policy,
            price,
            discount,
            activate,
          });
        }
      });
  }, [accessToken, user?._id, reset, number]);

  const handleProfileChange = (e) => {
    const newFile = e.target.files[0];
    setProfileImage(newFile);
  };

  const handleHotelChange = (e) => {
    const newFile = e.target.files[0];
    setHotelImage(newFile);
  };

  const updateProfile = (data, e) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("address", data.address);
    formData.append("overview", data.overview);
    formData.append("locationId", data.locationId);
    formData.append("checkIn", data.checkIn);
    formData.append("checkOut", data.checkOut);
    formData.append("policy", data.policy);
    formData.append("price", data.price);
    formData.append("discount", data.discount);
    formData.append("activate", data.activate);
    formData.append("profileImageURL", profileImage);
    formData.append("thumbnailImageURL", hotelImage);
    fetch(`${BASE_URL}/user/update/${data._id}`, {
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
          toast.success(result.message);
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
                  {...register("phoneNumber", { required: true })}
                />
                {errors.phoneNumber && <span>This field is required</span>}
              </div>

              <div className="mb-3">
                <label htmlFor="address" className="instructor-label">
                  Address
                </label>
                <textarea
                  name="address"
                  id="address"
                  cols="30"
                  rows="10"
                  className="instructor-textarea-control form-control"
                  autoCapitalize="off"
                  autoComplete="off"
                  defaultValue={allInfo?.hotelInfo?.address}
                  {...register("address")}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="overview" className="instructor-label">
                  Overview
                </label>
                <textarea
                  name="overview"
                  id="overview"
                  cols="30"
                  rows="10"
                  className="instructor-textarea-control form-control"
                  autoCapitalize="off"
                  autoComplete="off"
                  defaultValue={allInfo?.hotelInfo?.overview}
                  {...register("overview")}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="locationId" className="instructor-label">
                  Location Embed URL
                </label>
                <textarea
                  name="locationId"
                  id="locationId"
                  cols="30"
                  rows="10"
                  className="instructor-textarea-control form-control"
                  autoCapitalize="off"
                  autoComplete="off"
                  defaultValue={allInfo?.hotelInfo?.locationId}
                  {...register("locationId")}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="policy" className="instructor-label">
                  Privacy Policy
                </label>
                <textarea
                  name="policy"
                  id="policy"
                  cols="30"
                  rows="10"
                  className="instructor-textarea-control form-control"
                  autoCapitalize="off"
                  autoComplete="off"
                  defaultValue={allInfo?.hotelInfo?.policy}
                  {...register("policy")}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="checkIn" className="instructor-label">
                  Check In
                </label>
                <input
                  type="text"
                  className="instructor-control form-control"
                  id="checkIn"
                  autoComplete="off"
                  defaultValue={allInfo?.hotelInfo?.checkIn}
                  {...register("checkIn", { required: true })}
                />
                {errors.checkIn && <span>This field is required</span>}
              </div>

              <div className="mb-3">
                <label htmlFor="checkOut" className="instructor-label">
                  Check Out
                </label>
                <input
                  type="text"
                  className="instructor-control form-control"
                  id="checkOut"
                  autoComplete="off"
                  defaultValue={allInfo?.hotelInfo?.checkOut}
                  {...register("checkOut", { required: true })}
                />
                {errors.checkOut && <span>This field is required</span>}
              </div>

              <div className="mb-3">
                <label htmlFor="price" className="instructor-label">
                  Price
                </label>
                <input
                  type="number"
                  min={0}
                  className="instructor-control form-control"
                  id="price"
                  autoCapitalize="off"
                  autoComplete="off"
                  defaultValue={allInfo?.hotelInfo?.price}
                  {...register("price", { required: true })}
                />
                {errors.price && <span>This field is required</span>}
              </div>

              <div className="mb-3">
                <label htmlFor="discount" className="instructor-label">
                  Discount
                </label>
                <input
                  type="number"
                  min={0}
                  className="instructor-control form-control"
                  id="discount"
                  autoCapitalize="off"
                  autoComplete="off"
                  defaultValue={allInfo?.hotelInfo?.discount}
                  {...register("discount", { required: true })}
                />
                {errors.discount && <span>This field is required</span>}
              </div>

              <div className="mb-3">
                <label htmlFor="activate" className="instructor-label">
                  Activate
                </label>
                <select
                  {...register("activate", { required: true })}
                  className="instructor-control form-select"
                >
                  <option value={allInfo?.hotelInfo?.activate} selected>{`${
                    allInfo?.hotelInfo?.activate ? "Yes" : "No"
                  }`}</option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
                {errors.activate && <span>This field is required</span>}
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

              <div className="text-start">
                <img
                  src={`${BASE_URL}/${allInfo?.hotelInfo?.thumbnailImageURL}`}
                  height={80}
                  width={80}
                  alt=""
                />
              </div>

              <div className="mb-5">
                <label htmlFor="image" className="instructor-label">
                  Thumbnail
                </label>
                <input
                  type="file"
                  className="cursor-pointer border"
                  id="image"
                  accept="image/*"
                  onChange={handleHotelChange}
                />
              </div>

              <input
                type="hidden"
                defaultValue={allInfo?.hotelInfo?._id}
                {...register("_id")}
              />
            </div>
          </div>
        </div>

        <div className="d-md-flex justify-content-end">
          <input type="submit" className="btn btn-warning px-5 py-2" />
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

export default Profile;
