import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/dashboard/navbar";
import { useScrollTop } from "../hook/useScrollTop";

const Dashboard = () => {
  useScrollTop();
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="container outlet-container">
        <Outlet />
      </div>
      {/* <div>
        <Footer />
      </div> */}
    </>
  );
};

export default Dashboard;
