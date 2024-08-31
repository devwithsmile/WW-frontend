import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { IoCloseSharp } from "react-icons/io5";
import useAuth from "../../hooks/useAuth";
import signin_img from "../../assets/images/signin.jpg";
import api from "../../api/axios.js";

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
      const response = await api.post(
        `/api/auth/login`,
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

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
    <div className="flex flex-col justify-center relative lg:flex-row h-screen">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 text-red-500"
      >
        <IoCloseSharp size={24} />
      </button>

      {/* Left side with form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md wwbg text-white flex flex-col justify-center p-6 md:p-12 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-center mb-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-center md:text-left mb-2 md:mb-0">
              Welcome back
              <span className="mx-1 font-bold text-red-700">,</span>
            </h2>
            <h2 className="text-2xl md:text-3xl font-semibold text-center md:text-left">
              Gym Goer
            </h2>
          </div>
          <p className="text-sm text-gray-300 mb-8 text-center md:text-start">
            Don’t have an account?{" "}
            <Link to="/register" className="text-red-500 underline">
              Sign Up
            </Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
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
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                  >
                    {showPassword ? (
                      <AiOutlineEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
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

          <button className="w-full flex items-center justify-center bg-transparent py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-wwred focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 lg:w-full mb-2 text-center border border-wwred">
            <FcGoogle className="w-6 h-6 mr-2" alt="Google Logo" />
            Continue with Google
          </button>
        </div>
      </div>

      {/* Right side with image, hidden on mobile */}
      <div className="hidden lg:block lg:w-1/2 bg-cover bg-center">
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
