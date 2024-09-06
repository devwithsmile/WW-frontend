import "./App.css";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";
import Layout from "./components/Layout";
import React, { lazy, Suspense } from 'react';

// User
const Home = lazy(() => import("./Pages/GymUserPages/Home"));
const Bookings = lazy(() => import("./Pages/GymUserPages/Bookings"));
const Login = lazy(() => import("./Pages/GymUserPages/Login"));
const Register = lazy(() => import("./Pages/GymUserPages/Register"));
const PageNotFound = lazy(() => import("./Pages/Error/PageNotFound"));
const Profile = lazy(() => import("./Pages/GymUserPages/Profile"));
const Payment = lazy(() => import("./Pages/GymUserPages/Payment"));
// Owner
const OwnerSignup = lazy(() => import("./Pages/GymOwnerPages/Signup"));
const OwnerLogin = lazy(() => import("./Pages/GymOwnerPages/Login"));
const OwnerProfile = lazy(() => import("./Pages/GymOwnerPages/Profile"));
const GymForm = lazy(() => import("./Pages/GymOwnerPages/GymForm"));
const ResubmitForm = lazy(() => import("./Pages/GymOwnerPages/ResubmitForm"));
const OwnerSlot = lazy(() => import("./Pages/GymOwnerPages/Slot"));
const OwnerDashboard = lazy(() => import("./Pages/GymOwnerPages/Dashboard"));
const ApprovalStatus = lazy(() => import("./Pages/GymOwnerPages/ApprovalStatus"));
// Common to All
const Search = lazy(() => import("./Pages/GymUserPages/Search"));
const GymDetails = lazy(() => import("./Pages/GymUserPages/GymDetails"));
const ForgotPasswordForm = lazy(() => import("./Pages/ResetPassword/ForgotPassword"));
const ResetPassword = lazy(() => import("./Pages/ResetPassword/ResetPassword"));
const NotAuthorized = lazy(() => import("./Pages/Error/NotAuthorized"));
// Admin
const AdminPage = lazy(() => import("./Pages/Admin/AdminPage"));
const LandingPage = lazy(() => import("./Pages/GymUserPages/LandingPage"));



// Main application component
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                {/* Admin's Routes */}
                <Route
                  path="/admin"
                  element={
                    <PrivateRoute
                      element={<AdminPage />}
                      allowedRoles="customer" // TODO: change it into moderator when moderator is implemented
                    />
                  }
                />
                {/* User's Routes */}
                <Route
                  path="/"
                  element={<PublicRoute element={<LandingPage />} />}
                />
                <Route
                  path="/home"
                  element={
                    <PrivateRoute element={<Home />} allowedRoles="customer" />
                  }
                />
                <Route path="/search" element={<Search />} />
                <Route
                  path="/bookings"
                  element={
                    <PrivateRoute
                      element={<Bookings />}
                      allowedRoles="customer"
                    />
                  }
                />
                <Route
                  path="/payment"
                  element={
                    <PrivateRoute element={<Payment />} allowedRoles="customer" />
                  }
                />
                <Route
                  path="/login"
                  element={<PublicRoute element={<Login />} />}
                />
                <Route
                  path="/register"
                  element={<PublicRoute element={<Register />} />}
                />
                <Route path="/gym/:id" element={<GymDetails />} />
                <Route
                  path="/users"
                  element={
                    <PrivateRoute element={<Profile />} allowedRoles="customer" />
                  }
                />
                {/* Reset/Forgot Password */}
                <Route path="/forgotpassword" element={<ForgotPasswordForm />} />
                <Route path="/resetpassword" element={<ResetPassword />} />
                {/* Owner's Routes */}
                <Route
                  path="/owners/register"
                  element={<PublicRoute element={<OwnerSignup />} />}
                />
                <Route
                  path="/owners/login"
                  element={<PublicRoute element={<OwnerLogin />} />}
                />
                <Route
                  path="/owners/gymForm"
                  element={
                    <PrivateRoute element={<GymForm />} allowedRoles="owner" />
                  }
                />
                <Route
                  path="/owners/accounts"
                  element={
                    <PrivateRoute
                      element={<OwnerProfile />}
                      allowedRoles="owner"
                    />
                  }
                />
                <Route
                  path="/owners/resubmit"
                  element={
                    <PrivateRoute element={<ResubmitForm />} allowedRoles="owner" />
                  }
                />
                <Route
                  path="/owners/slots"
                  element={
                    <PrivateRoute element={<OwnerSlot />} allowedRoles="owner" />
                  }
                />
                <Route
                  path="/owners/dashboard"
                  element={
                    <PrivateRoute
                      element={<OwnerDashboard />}
                      allowedRoles="owner"
                    />
                  }
                />
                <Route
                  path="/owners/status"
                  element={
                    <PrivateRoute
                      element={<ApprovalStatus />}
                      allowedRoles="owner"
                    />
                  }
                />
                {/* Error Routes */}
                <Route path="/not-authorized" element={<NotAuthorized />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
