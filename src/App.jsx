import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddUser from "./components/dashboard/addUser";
import Admin from "./components/dashboard/admin/admin";
import ManageUser from "./components/manageUser";
const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));
const Dashboard = lazy(() => import("./pages/dashboard"));

const App = () => {
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
          path="dashboard"
          element={
            <Suspense fallback={""}>
              <Dashboard />
            </Suspense>
          }
        >
          <Route path="" element={<Admin />} />
          <Route path="admin/add-user" element={<AddUser />} />
          <Route path="admin/manage-user" element={<ManageUser />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
