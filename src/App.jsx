import React, { lazy, Suspense } from "react";
import Confetti from "react-confetti";
import "react-datepicker/dist/react-datepicker.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddHotel from "./components/dashboard/addHotel";
import AddRoom from "./components/dashboard/addRoom";
import AddUser from "./components/dashboard/addUser";
import Admin from "./components/dashboard/admin/admin";
import AllBookingInfo from "./components/dashboard/allBookingInfo";
import AllRoom from "./components/dashboard/allRoom";
import Customer from "./components/dashboard/customer/customer";
import Hotel from "./components/dashboard/hotel/hotel";
import Profile from "./components/dashboard/hotel/profile";
import ManageHotel from "./components/dashboard/manageHotel";
import ManageRoom from "./components/dashboard/manageRoom";
import ManageUser from "./components/dashboard/manageUser";
import UserProfile from "./components/dashboard/userProfile";
import { ContextState } from "./context/contextProvider";
import AllHotels from "./pages/allHotels";
import ConfirmOrder from "./pages/confirmOrder";
import HotelById from "./pages/hotelById";
import ResetPassword from "./pages/resetPassword";
const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));
const Dashboard = lazy(() => import("./pages/dashboard"));

const App = () => {
  const { user, showConfetti } = ContextState();
  const width = window.innerWidth - 20;
  const height = window.innerHeight;

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
      <div>
        {showConfetti && (
          <Confetti width={width} height={height} tweenDuration={1000} />
        )}
      </div>
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
          path="/reset-password"
          element={
            <Suspense fallback={""}>
              <ResetPassword />
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
          <Route path="admin/all-room" element={<AllRoom />} />
          <Route path="admin/manage-hotel" element={<ManageHotel />} />
          <Route path="admin/all-booking-info" element={<AllBookingInfo />} />
          <Route path="hotel/add-room" element={<AddRoom />} />
          <Route path="hotel/manage-room" element={<ManageRoom />} />
          <Route
            path="profile"
            element={user?.role === "hotel" ? <Profile /> : <UserProfile />}
          />
        </Route>
        <Route path="order/:id" element={<ConfirmOrder />} />
      </Routes>
    </>
  );
};

export default App;
