import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import useAuth from "../../hooks/useAuth.jsx";
import api from "../../api/axios.js";
import GoogleLoginButton from "../../components/GoogleLoginButton.jsx";

const Login = () => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Set focus when required field is not there
  useEffect(() => {
    const firstErrorField = Object.keys(errors)[0];
    if (firstErrorField) {
      setFocus(firstErrorField);
      setTimeout(() => {
        const element = document.getElementById(firstErrorField);
        if (element) {
          // Calculate the desired scroll position
          const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - 150,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [errors, setFocus]);

  const onSubmit = async (data) => {
    try {
      let body = data;
      if (data?.googleData) {
        body = {
          googleAccessToken: data.googleData,
        };
      } else {
        body = {
          email: data.email,
          password: data.password,
        };
      }
      const response = await api.post("/api/auth/owners/login", body, {
        headers: { "Content-Type": "application/json" },
      });

      // Handle successful login
      if (response.status === 200) {
        toast.success(response.data.message);

        // console.log("Logged In data : ", response.data);
        const { status, reason } = response.data;
        // console.log(reason, status);

        login(response.data.token, status);

        if (status === "active") {
          navigate("/owners/dashboard");
        } else if (status === "inactive" || status === "rejected") {
          navigate("/owners/status", {
            state: { reason, status },
          });
        } else if (status === "new") {
          navigate("/owners/gymForm");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);

      if (error.response && error.response.data) {
        const errors = error.response.data;

        if (errors.global) {
          toast.error(errors.global);
        }
      }
    }
  };

  return (
    <div className="flex flex-col text-white wwbg">
      <div className="flex flex-col items-center justify-center py-4 md:flex-row md:py-12">
        {/* Left side with login form */}
        <div className="flex flex-col justify-center order-1 w-full p-6 md:order-0 md:w-1/2 lg:w-1/3 md:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <GoogleLoginButton onSubmit={onSubmit} />

            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-red-600"></div>
              <span className="mx-4 text-white-400">Or</span>
              <div className="flex-grow border-t border-red-600"></div>
            </div>

            <div className="mb-4">
              <label
                className="block mb-1 text-sm font-medium wwred"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="abc@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-600"
                }  bg-wwbg text-white focus:outline-none focus:border-red-500`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                className="block mb-1 text-sm font-medium"
                htmlFor="password"
              >
                Password
              </label>
              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="new-password"
                    placeholder="**************"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className={`w-full px-3 py-2 border ${
                      errors.password ? "border-red-500" : "border-gray-600"
                    } bg-wwbg text-white focus:outline-none focus:border-red-500`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                  >
                    {showPassword ? (
                      <AiOutlineEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-wwred py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign In
            </button>
          </form>

          <p className="my-4 text-sm text-center">
            Don’t have an account?{" "}
            <Link to="/owners/register" className="text-red-500">
              Sign Up
            </Link>{" "}
            here
          </p>

          <p className="text-center">
            <Link to="/forgotpassword" className="text-red-500 underline">
              Forgot Password
            </Link>
          </p>
        </div>

        {/* TODO: left in mobile center in desktop */}
        {/* Right side with welcome message */}
        <div className="flex flex-col items-center justify-center w-full p-6 order-0 md:order-1 md:w-1/2 md:p-12">
          <h2 className="mb-4 text-2xl font-semibold md:text-3xl">
            Welcome <span className="text-red-500">Fitness Arena,</span>
          </h2>
          <ul className="space-y-2 text-sm md:text-lg">
            <li className="text-red-500">
              • <span className="text-white">Manage your gym effortlessly</span>
            </li>
            <li className="text-red-500">
              •{" "}
              <span className="text-white">
                Attract new users with WorkoutWings
              </span>
            </li>
            <li className="text-red-500">
              •{" "}
              <span className="text-white">
                Log in now to start optimizing bookings
              </span>
            </li>
            <li className="text-red-500">
              •{" "}
              <span className="text-white">
                Connect with fitness enthusiasts
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
