import "./App.css";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";
import Layout from "./components/Layout";
import LandingPage from "./Pages/GymUserPages/LandingPage";
import Home from "./Pages/GymUserPages/Home";
import Search from "./Pages/GymUserPages/Search";
import Bookings from "./Pages/GymUserPages/Bookings";
import Login from "./Pages/GymUserPages/Login";
import Register from "./Pages/GymUserPages/Register";
import GymDetails from "./Pages/GymUserPages/GymDetails";
import PageNotFound from "./Pages/Error/PageNotFound";
import Profile from "./Pages/GymUserPages/Profile";
import OwnerSignup from "./Pages/GymOwnerPages/OwnerSignup";
import OwnerLogin from "./Pages/GymOwnerPages/OwnerLogin";
import OwnerProfile from "./Pages/GymOwnerPages/Profile";
import GymForm from "./Pages/GymOwnerPages/GymForm";
import ForgotPasswordForm from "./Pages/ResetPassword/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import SlotPage from "./Pages/GymOwnerPages/SlotPage";
import OwnerDashboard from "./Pages/GymOwnerPages/OwnerDashboard";
import NotAuthorized from "./Pages/Error/NotAuthorized";
import ApprovalStatus from "./Pages/GymOwnerPages/ApprovalStatus";
import Payment from "./Pages/GymUserPages/Payment";

// Main application component
function App() {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <Layout>
            <Routes>
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
                path="/owners/slots"
                element={
                  <PrivateRoute element={<SlotPage />} allowedRoles="owner" />
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
  );
}

export default App;
