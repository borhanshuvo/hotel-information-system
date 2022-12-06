import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import { ContextState } from "../context/contextProvider";
import { BASE_URL } from "../data/baseURL";

const Search = () => {
  const [isSearchable, setIsSearchable] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const tomorrow = new Date(startDate);
  const nextDate = tomorrow.setDate(startDate.getDate() + 1);
  const [endDate, setEndDate] = useState(tomorrow.setDate(tomorrow.getDate()));
  const [allHotels, setAllHotels] = useState([]);
  const { number, loading, setLoading, navigate } = ContextState();
  const [hotelId, setHotelId] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}/hotel/get`)
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setAllHotels(result.hotels);
          setLoading(false);
        } else {
          toast.error(result.message);
          setLoading(false);
        }
      });
  }, [number, setLoading]);

  const option = allHotels?.map((hotel) => ({
    label: hotel?.user?.name,
    value: hotel?._id,
  }));

  function handleSelect(event) {
    setHotelId(event.value);
  }

  const searchRoom = (data) => {
    if (hotelId) {
      navigate(`hotel/${hotelId}?adult=${data.adult}&child=${data.child}`);
    } else {
      toast.error("Please choose hotel");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 bg-white shadow p-4 rounded">
          <h5 className="mb-4">Check Booking Availability</h5>
          <form onSubmit={handleSubmit(searchRoom)}>
            <div className="row align-items-end">
              <div className="col-lg-3 mb-3">
                <label htmlFor="" className="form-label">
                  Destination
                </label>
                <ReactSelect
                  className="basic-single"
                  classNamePrefix="select"
                  isSearchable={isSearchable}
                  onChange={handleSelect}
                  name="color"
                  options={option}
                />
              </div>

              <div className="col-lg-2 mb-3">
                <label htmlFor="" className="form-label">
                  Check-in
                </label>
                <DatePicker
                  selected={startDate}
                  minDate={new Date()}
                  onChange={(date) => setStartDate(date)}
                  className="form-control shadow-none"
                />
                {/* <input type="date" className="form-control shadow-none" /> */}
              </div>

              <div className="col-lg-2 mb-3">
                <label htmlFor="" className="form-label">
                  Check-out
                </label>
                <DatePicker
                  selected={endDate}
                  minDate={nextDate}
                  onChange={(date) => setEndDate(date)}
                  className="form-control shadow-none"
                />
                {/* <input type="date" className="form-control shadow-none" /> */}
              </div>

              <div className="col-lg-2 mb-3">
                <label htmlFor="" className="form-label">
                  Adult
                </label>
                <input
                  type="number"
                  min={1}
                  defaultValue={1}
                  {...register("adult")}
                  className="form-control shadow-none"
                />
              </div>

              <div className="col-lg-2 mb-3">
                <label htmlFor="" className="form-label">
                  Child
                </label>
                <input
                  type="number"
                  min={0}
                  defaultValue={0}
                  {...register("child")}
                  className="form-control shadow-none"
                />
              </div>

              <div className="col-lg-1 mb-lg-3 mt-3">
                <input
                  type="submit"
                  value="Search"
                  className="btn btn-base bg-base text-white px-3 shadow-none"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;
