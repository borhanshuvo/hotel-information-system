import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ContextState } from "../../context/contextProvider";
import { BASE_URL } from "../../data/baseURL";

const AddRoom = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { accessToken } = ContextState();
  const [file, setFile] = useState(null);
  const [allHotels, setAllHotels] = useState([]);

  const option = allHotels?.map((hotel) => ({
    value: hotel?._id,
    label: hotel?.name,
  }));

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
  }, []);

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    setFile(newFile);
  };

  const addRoom = (data, e) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    formData.append("hotelImage", file);
    fetch(`${BASE_URL}/hotel/post`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      body: formData,
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
        <title>Dashboard || Add Room</title>
      </Helmet>
      <h1 className="font-roboto fw-700 fs-38 pt-5">Add Room</h1>
      <hr className="pt-4" />
      <form onSubmit={handleSubmit(addRoom)}>
        <div className="instructor-form-container">
          <div className="row">
            <div className="col-lg-4 p-5">
              <div className="fs-16 text-gunmetal">
                <p className="fw-700">Basic Information</p>
                <p>Room basic Information</p>
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

              <div className="mb-3">
                <label htmlFor="phone" className="instructor-label">
                  Phone
                </label>
                <input
                  type="text"
                  className="instructor-control form-control"
                  id="phone"
                  autoCapitalize="off"
                  autoComplete="off"
                  {...register("phone", { required: true })}
                />
                {errors.phone && <span>This field is required</span>}
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
                  {...register("address")}
                ></textarea>
              </div>

              <div className="mb-5">
                <label htmlFor="image" className="instructor-label">
                  Image (W:640, H:427)
                </label>
                <input
                  type="file"
                  className="cursor-pointer border"
                  id="image"
                  accept="image/*"
                  onChange={handleFileChange}
                />
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

export default AddRoom;
