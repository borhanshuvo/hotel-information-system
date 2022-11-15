import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddHotel from "./components/dashboard/addHotel";
import AddRoom from "./components/dashboard/addRoom";
import AddUser from "./components/dashboard/addUser";
import Admin from "./components/dashboard/admin/admin";
import Customer from "./components/dashboard/customer/customer";
import Hotel from "./components/dashboard/hotel/hotel";
import Profile from "./components/dashboard/hotel/profile";
import ManageHotel from "./components/dashboard/manageHotel";
import ManageUser from "./components/dashboard/manageUser";
import { ContextState } from "./context/contextProvider";
import AllHotels from "./pages/allHotels";
import HotelById from "./pages/hotelById";
const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));
const Dashboard = lazy(() => import("./pages/dashboard"));

const App = () => {
  const { user } = ContextState();

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="fs-14 fw-700"
      />
      <Routes>
        <Route
          path="/"
          index
          element={
            <Suspense fallback={""}>
              <Home />
            </Suspense>
          }
        />

        <Route
          path="/login"
          element={
            <Suspense fallback={""}>
              <Login />
            </Suspense>
          }
        />

        <Route
          path="all-hotel"
          element={
            <Suspense fallback={""}>
              <AllHotels />
            </Suspense>
          }
        />

        <Route
          path="/hotel/:id"
          element={
            <Suspense fallback={""}>
              <HotelById />
            </Suspense>
          }
        />

        <Route
          path="dashboard"
          element={
            <Suspense fallback={""}>
              <Dashboard />
            </Suspense>
          }
        >
          <Route
            path=""
            element={
              (user?.role === "admin" && <Admin />) ||
              (user?.role === "hotel" && <Hotel />) ||
              (user?.role === "customer" && <Customer />)
            }
          />
          <Route path="admin/add-user" element={<AddUser />} />
          <Route path="admin/manage-user" element={<ManageUser />} />
          <Route path="admin/add-hotel" element={<AddHotel />} />
          <Route path="admin/manage-hotel" element={<ManageHotel />} />
          <Route path="admin/add-room" element={<AddRoom />} />
          <Route
            path="profile"
            element={user?.role === "hotel" && <Profile />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
