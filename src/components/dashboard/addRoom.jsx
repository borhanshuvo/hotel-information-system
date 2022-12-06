import { useState } from "react";
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
  const { accessToken, user } = ContextState();
  const [roomImage, setRoomImage] = useState(null);

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    setRoomImage(newFile);
  };

  const addRoom = (data, e) => {
    const formData = new FormData();
    formData.append("hotels", user?._id);
    formData.append("hotelEmail", user?.email);
    formData.append("name", data.name);
    formData.append("roomAmenities", data.roomAmenities);
    formData.append("adult", data.adult);
    formData.append("child", data.child);
    formData.append("price", data.price);
    formData.append("numberOfBed", data.numberOfBed);
    formData.append("bedPrice", data.bedPrice);
    formData.append("discount", data.discount);
    formData.append("roomImageURL", roomImage);
    fetch(`${BASE_URL}/room/add-room`, {
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
                <p>Room Information</p>
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
                <label htmlFor="roomAmenities" className="instructor-label">
                  Room Amenities
                </label>
                <textarea
                  name="roomAmenities"
                  id="roomAmenities"
                  cols="30"
                  rows="10"
                  className="instructor-textarea-control form-control"
                  autoCapitalize="off"
                  autoComplete="off"
                  {...register("roomAmenities")}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="adult" className="instructor-label">
                  Adult
                </label>
                <input
                  type="number"
                  min={1}
                  className="instructor-control form-control"
                  id="adult"
                  autoComplete="off"
                  defaultValue={1}
                  {...register("adult", { required: true })}
                />
                {errors.adult && <span>This field is required</span>}
              </div>

              <div className="mb-3">
                <label htmlFor="child" className="instructor-label">
                  Child
                </label>
                <input
                  type="number"
                  min={0}
                  className="instructor-control form-control"
                  id="child"
                  autoComplete="off"
                  defaultValue={0}
                  {...register("child")}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="price" className="instructor-label">
                  Room Price
                </label>
                <input
                  type="number"
                  min={0}
                  className="instructor-control form-control"
                  id="price"
                  autoComplete="off"
                  defaultValue={0}
                  {...register("price", { required: true })}
                />
                {errors.price && <span>This field is required</span>}
              </div>

              <div className="mb-3">
                <label htmlFor="numberOfBed" className="instructor-label">
                  Number of Bed
                </label>
                <input
                  type="number"
                  min={0}
                  className="instructor-control form-control"
                  id="numberOfBed"
                  autoComplete="off"
                  defaultValue={0}
                  {...register("numberOfBed", { required: true })}
                />
                {errors.numberOfBed && <span>This field is required</span>}
              </div>

              <div className="mb-3">
                <label htmlFor="bedPrice" className="instructor-label">
                  Bed Price
                </label>
                <input
                  type="number"
                  min={0}
                  className="instructor-control form-control"
                  id="bedPrice"
                  autoComplete="off"
                  defaultValue={0}
                  {...register("bedPrice", { required: true })}
                />
                {errors.price && <span>This field is required</span>}
              </div>

              <div className="mb-3">
                <label htmlFor="discount" className="instructor-label">
                  Discount
                </label>
                <input
                  type="number"
                  max={100}
                  min={0}
                  className="instructor-control form-control"
                  id="discount"
                  autoComplete="off"
                  defaultValue={0}
                  {...register("discount")}
                />
              </div>

              <div className="mb-5">
                <label htmlFor="roomImageURL" className="instructor-label">
                  Room Image
                </label>
                <input
                  type="file"
                  className="cursor-pointer border"
                  id="roomImageURL"
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
