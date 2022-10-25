import React from "react";
import image_3 from "../images/image-2506988.jpg";
import image_1 from "../images/image-261169.jpg";
import image_2 from "../images/image-594077.jpg";

const Hotel = () => {
  return (
    <section className="pt-5">
      <h1 className="text-center fw-700 fs-20 pb-5">Hotel</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <img src={image_1} className="img-fluid" alt="" />
                <div className="card-body">
                  <p className="card-title">Ujan Vati Restaurent</p>
                  <p className="card-title">
                    Hasan Plaza, Station Road, Gazipur
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <img src={image_2} className="img-fluid" alt="" />
                <div className="card-body">
                  <p className="card-title">Hotel Nirala , Nirala Tower</p>
                  <p className="card-title">
                    Hasan Plaza, Station Road, Gazipur
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <img src={image_3} className="img-fluid" alt="" />
                <div className="card-body">
                  <p className="card-title">Hotel River View, Ishakha Road</p>
                  <p className="card-title">
                    Hasan Plaza, Station Road, Gazipur
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hotel;
