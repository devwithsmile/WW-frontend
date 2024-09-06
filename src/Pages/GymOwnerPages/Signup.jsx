import React, { lazy, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import api from "../../api/axios.js";
const GoogleLoginButton = lazy(() =>
  import("../../components/GoogleLoginButton.jsx")
);

const Signup = () => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  // Watch password field to use for validation
  const password = watch("password");

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
      const response = await api.post(`/api/auth/owners/register`, body, {
        headers: { "Content-Type": "application/json" },
      });

      // Handle successful login
      if (response.status === 200) {
        toast.success(response.data.message);
        // Redirect the user to the home page or dashboard
        navigate("/owners/login");
      }
    } catch (error) {
      console.error("Error during registration:", error);

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
        {/* Left side with promotional content */}
        <div className="flex flex-col justify-center w-full p-6 md:w-1/2 md:p-12">
          <h2 className="mb-4 text-2xl font-semibold md:text-3xl">
            Are you a gym owner?
          </h2>
          <p className="mb-6 text-sm md:text-lg">
            Partner with us, watch your membership soar! Manage bookings,
            showcase your amenities, and connect with a community of dedicated
            gym-goers.
          </p>
          <ul className="pl-5 space-y-2 list-disc">
            <li className="text-red-500">
              <span className="text-white">Global Exposure</span>
            </li>
            <li className="text-red-500">
              <span className="text-white">Flexible Integration</span>
            </li>
            <li className="text-red-500">
              <span className="text-white">Increased Revenue</span>
            </li>
          </ul>
        </div>

        {/* Right side with registration form */}
        <div className="flex flex-col justify-center w-full p-6 md:w-1/2 lg:w-1/3 md:p-12">
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
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long",
                      },
                      validate: {
                        hasUppercase: (value) =>
                          /[A-Z]/.test(value) ||
                          "Password must include at least one uppercase letter",
                        hasLowercase: (value) =>
                          /[a-z]/.test(value) ||
                          "Password must include at least one lowercase letter",
                        hasNumber: (value) =>
                          /[0-9]/.test(value) ||
                          "Password must include at least one number",
                        hasSpecialChar: (value) =>
                          /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                          "Password must include at least one special character",
                      },
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

            <div className="mb-6">
              <label
                className="block mb-1 text-sm font-medium"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  placeholder="**************"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password ||
                      "Ensure both passwords are the same",
                  })}
                  className={`w-full px-3 py-2 border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-600"
                  } bg-wwbg text-white focus:outline-none focus:border-red-500`}
                  onPaste={(e) => e.preventDefault()}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEye />
                  ) : (
                    <AiOutlineEyeInvisible />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-wwred py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <Link to="/owners/login" className="text-red-500">
              Sign In
            </Link>{" "}
            here
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="py-6 text-white border-t-2 md:py-12 border-t-red-700">
        <div className="container flex flex-col items-center justify-center gap-4 mx-auto md:flex-row">
          <h3 className="mb-2 text-xl font-semibold md:text-2xl md:mb-0">
            Still got some questions?
          </h3>
          <Link
            to="/contact"
            className="py-2.5 px-4 bg-wwred text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
