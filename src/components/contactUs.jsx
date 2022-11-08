import React from "react";
import { useForm } from "react-hook-form";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getContact = (data, e) => {
    console.log(data);
  };

  return (
    <section className="container py-5 my-md-5" id="contact-us">
      <h1 className="text-center fw-700 pb-5">Contact Us</h1>
      <div className="row">
        <div className="col-12 col-md-9 mx-auto">
          <div
            className="p-5"
            style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
          >
            <form onSubmit={handleSubmit(getContact)}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  autoComplete="off"
                  {...register("name", { required: true })}
                />
                {errors.name && <span>This field is required</span>}
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  autoComplete="off"
                  {...register("email", { required: true })}
                />
                {errors.email && <span>This field is required</span>}
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  cols="25"
                  rows="10"
                  className="form-control"
                  autoCapitalize="off"
                  autoComplete="off"
                  {...register("message")}
                ></textarea>
              </div>

              <div className="">
                <input type="submit" className="btn btn-primary px-5 py-2" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
