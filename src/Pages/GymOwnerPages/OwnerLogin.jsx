import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import api from "../../api/axios.js";

const OwnerLogin = () => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/home"; // Get redirect location or provide fallback

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
      const response = await api.post("/api/auth/owners/login", {
        email: data.email,
        password: data.password,
      });

      // Handle successful login
      if (response.status === 200) {
        toast.success(response.data.message);
        login(response.data.token);

        console.log("Logged In data : ", response.data);
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Error during login:", error);

      if (error.response && error.response.data.errors) {
        const { errors } = error.response.data;

        if (errors.global) {
          toast.error(errors.global);
        }
      }
    }
  };

  return (
    <div className="flex flex-col wwbg text-white">
      <div className="flex flex-col md:flex-row justify-center items-center py-4 md:py-12">
        {/* Left side with login form */}
        <div className="order-1 md:order-0 w-full md:w-1/2 lg:w-1/3 flex flex-col justify-center p-6 md:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <button className="w-full flex items-center justify-center bg-transparent py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-wwred focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 lg:w-full mb-2 text-center border border-wwred">
              <FcGoogle className="w-6 h-6 mr-2" alt="Google Logo" />
              Continue with Google
            </button>

            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-red-600"></div>
              <span className="mx-4 text-white-400">Or</span>
              <div className="flex-grow border-t border-red-600"></div>
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1 wwred"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="abc@example.com"
                {...register("email", { required: "Email is required" })}
                className={`w-full px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-600"
                }  bg-wwbg text-white focus:outline-none focus:border-red-500`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="password"
              >
                Password
              </label>
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
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                >
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-wwred py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign In
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <Link to="/owners/register" className="text-red-500">
              Sign Up
            </Link>{" "}
            here
          </p>
        </div>

        {/* TODO: left in mobile center in desktop */}
        {/* Right side with welcome message */}
        <div className="order-0 md:order-1 w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
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

export default OwnerLogin;
