import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import api from "../../api/axios.js";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post(
        `/api/auth/forgetPassword`,
        { email: data.email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("Password reset email sent.");
      reset();
    } catch (error) {
      console.error("Error while saving user details:", error);

      if (error.response && error.response.data.errors) {
        const { errors } = error.response.data;

        if (errors.global) {
          toast.error(errors.global);
        }
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-[35rem] bg-wwbg text-white mt-4 md:my-12">
      <div className="w-full max-w-md bg-wwbg shadow-lg p-8">
        <div className="mb-8">
          <h2 className="text-3xl text-center text-wwred font-semibold">
            Forgot Your Password ?
          </h2>
          <p className="mt-3">
            Enter the email address associated with your account and we{"'"}ll
            send you a link to reset your password
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1 wwred"
            >
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address format",
                },
              })}
              className={`w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-600"
              } bg-wwbg text-white focus:outline-none focus:border-red-500`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
