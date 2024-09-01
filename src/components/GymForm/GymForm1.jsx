import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import gymFormImage from "../../assets/images/ownergymform.png";
import WelcomeModal from "./WelcomeModal";

const GAP_FROM_TOP = 150;

const GymForm1 = ({ onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
  });

  // Focus the input field on error
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
            top: elementPosition - GAP_FROM_TOP,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [errors, setFocus]);

  return (
    <>
      <WelcomeModal />
      <div className="flex items-center justify-center min-h-screen p-4 text-white bg-wwbg">
        <div className="flex flex-col w-full max-w-5xl overflow-hidden shadow-lg md:flex-row bg-wwbg">
          {/* Image Section */}
          <div className="hidden w-full md:block md:w-1/2">
            <img
              src={gymFormImage}
              alt="Gym Owner"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Form Section */}
          <div className="w-full p-8 md:w-1/2">
            <h2 className="mb-8 text-3xl font-semibold text-center text-wwred md:text-start">
              Gym Owner
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Full Name */}
              <div className="mb-4">
                <label
                  className="block mb-1 text-sm font-medium wwred"
                  htmlFor="fullName"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Enter your Name"
                  {...register("fullName", {
                    required: "Full Name is required",
                    minLength: {
                      value: 3,
                      message: "Full name must be at least 3 characters",
                    },
                    maxLength: {
                      value: 50,
                      message: "Full name must be less than 50 characters",
                    },
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message:
                        "Full name should only contain letters and spaces",
                    },
                  })}
                  className={`w-full px-3 py-2 border ${errors.fullName ? "border-red-500" : "border-gray-600"
                    } bg-wwbg text-white focus:outline-none focus:border-red-500`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Contact Information */}
              <div className="mb-4">
                <label
                  className="block mb-1 text-sm font-medium wwred"
                  htmlFor="contactInfo"
                >
                  Contact Information <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="contactInfo"
                  placeholder="9876543210"
                  minLength={10}
                  maxLength={10}
                  {...register("contactInfo", {
                    required: "Contact Information is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message:
                        "Invalid contact number format. Must be 10 digits.",
                    },
                  })}
                  className={`w-full px-3 py-2 border ${errors.contactInfo ? "border-red-500" : "border-gray-600"
                    } bg-wwbg text-white focus:outline-none focus:border-red-500`}
                />
                {errors.contactInfo && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.contactInfo.message}
                  </p>
                )}
              </div>

              <h2 className="mb-8 text-2xl font-semibold text-center text-wwred md:text-start">
                Business Details
              </h2>

              {/* Gym Name */}
              <div className="mb-4">
                <label
                  className="block mb-1 text-sm font-medium wwred"
                  htmlFor="gymName"
                >
                  Gym Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="gymName"
                  placeholder="Enter your GYM Name"
                  {...register("gymName", {
                    required: "Gym Name is required",
                    minLength: {
                      value: 2,
                      message: "Gym name must be at least 2 characters",
                    },
                    maxLength: {
                      value: 100,
                      message: "Gym name must be less than 100 characters",
                    },
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message:
                        "Gym name should only contain letters, numbers, and spaces",
                    },
                  })}
                  className={`w-full px-3 py-2 border ${errors.gymName ? "border-red-500" : "border-gray-600"
                    } bg-wwbg text-white focus:outline-none focus:border-red-500`}
                />
                {errors.gymName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.gymName.message}
                  </p>
                )}
              </div>

              {/* UPI ID */}
              <div className="mb-4">
                <label
                  className="block mb-1 text-sm font-medium wwred"
                  htmlFor="upiId"
                >
                  UPI ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="upiId"
                  placeholder="UPI ID"
                  {...register("upiId", {
                    required: "UPI ID is required",
                    pattern: {
                      value: /^(?=.{5,})([a-zA-Z0-9]+)@([a-zA-Z]{3,})$/,
                      message: "Invalid UPI ID format. Must be at least 5 characters long, contain '@', and have at least 3 letters after '@'.",
                    },
                  })}
                  className={`w-full px-3 py-2 border ${errors.upiId ? "border-red-500" : "border-gray-600"
                    } bg-wwbg text-white focus:outline-none focus:border-red-500`}
                />
                {errors.upiId && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.upiId.message}
                  </p>
                )}
              </div>

              {/* GST Number */}
              <div className="mb-4">
                <label
                  className="block mb-1 text-sm font-medium wwred"
                  htmlFor="gstNumber"
                >
                  GST Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="gstNumber"
                  placeholder="GST Number"
                  {...register("gstNumber", {
                    required: "GST Number is required",
                    pattern: {
                      value:
                        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z|0-9]{1}[Z]{1}[A-Z0-9]{1}$/,
                      message: "Invalid GST Number format",
                    },
                  })}
                  className={`w-full px-3 py-2 border ${errors.gstNumber ? "border-red-500" : "border-gray-600"
                    } bg-wwbg text-white focus:outline-none focus:border-red-500`}
                />
                {errors.gstNumber && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.gstNumber.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="mt-6 text-center">
                <button
                  type="submit"
                  className="w-full px-4 bg-wwred py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

GymForm1.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    fullName: PropTypes.string,
    contactInfo: PropTypes.string,
    gymName: PropTypes.string,
    upiId: PropTypes.string,
    gstNumber: PropTypes.string,
  }),
};

export default GymForm1;
