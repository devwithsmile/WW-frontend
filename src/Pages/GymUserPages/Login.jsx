import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import useAuth from "../../hooks/useAuth";
import signin_img from "../../assets/images/signin.jpg";
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
      const response = await api.post(`/api/auth/login`, body, {
        headers: { "Content-Type": "application/json" },
      });

      // Handle successful login
      if (response.status === 200) {
        toast.success(response.data.message);
        login(response.data.token);

        // console.log('Logged In data : ', response.data)
        // Set a flag indicating the user has logged in
        const isFirstTimeUser = localStorage.getItem("firstTimeUser") || true;

        // Redirect based on first-time status
        if (isFirstTimeUser !== "false") {
          navigate("/users"); // Redirect to profile for first-time users
          toast.success("Please fill out your profile details");

          // Update local storage to indicate the user has logged in
          localStorage.setItem("firstTimeUser", "false");
        } else {
          console.log("Im coming here to else part with from", from);
          navigate(from, { replace: true });
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
    <div className="relative flex flex-col justify-center h-screen lg:flex-row">
      <button
        onClick={() => navigate(-1)}
        className="absolute text-red-500 top-4 left-4"
      >
        <IoCloseSharp size={24} />
      </button>

      {/* Left side with form */}
      <div className="flex items-center justify-center w-full p-6 lg:w-1/2 md:p-12">
        <div className="flex flex-col justify-center w-full max-w-md p-6 text-white shadow-lg wwbg md:p-12">
          <div className="flex flex-col mb-4 md:flex-row md:items-center md:justify-center">
            <h2 className="mb-2 text-2xl font-semibold text-center md:text-3xl md:text-left md:mb-0">
              Welcome back
              <span className="mx-1 font-bold text-red-700">,</span>
            </h2>
            <h2 className="text-2xl font-semibold text-center md:text-3xl md:text-left">
              Gym Goer
            </h2>
          </div>
          <p className="mb-8 text-sm text-center text-gray-300 md:text-start">
            Don’t have an account?{" "}
            <Link to="/register" className="text-red-500 underline">
              Sign Up
            </Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
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
              className="w-full bg-wwred py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-6"
            >
              Sign In
            </button>

            <p className="text-center">
              <Link to="/forgotpassword" className="text-red-500 underline">
                Forgot Password
              </Link>
            </p>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-red-600"></div>
            <span className="mx-4 text-white-400">Or</span>
            <div className="flex-grow border-t border-red-600"></div>
          </div>

          <GoogleLoginButton onSubmit={onSubmit} />
        </div>
      </div>

      {/* Right side with image, hidden on mobile */}
      <div className="hidden bg-center bg-cover lg:block lg:w-1/2">
        <img
          src={signin_img}
          alt="Workout"
          className="object-cover w-full h-full grayscale"
        />
      </div>
    </div>
  );
};

export default Login;
