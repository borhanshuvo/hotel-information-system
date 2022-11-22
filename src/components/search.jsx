import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import { ContextState } from "../context/contextProvider";
import { BASE_URL } from "../data/baseURL";

const Search = () => {
  const [isSearchable, setIsSearchable] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [allHotels, setAllHotels] = useState([]);
  const { number, loading, setLoading } = ContextState();

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
    label: hotel?.name,
    value: hotel?._id,
  }));

  function handleSelect(event) {
    console.log(event);
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 bg-white shadow p-4 rounded">
          <h5 className="mb-4">Check Booking Availability</h5>
          <form>
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
                  minDate={new Date()}
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
                  min={0}
                  defaultValue={0}
                  className="form-control shadow-none"
                />
              </div>

              <div className="col-lg-2 mb-3">
                <label htmlFor="" className="form-label">
                  Children
                </label>
                <input
                  type="number"
                  min={0}
                  defaultValue={0}
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
