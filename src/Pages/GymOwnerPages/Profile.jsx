import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { PiCurrencyInrLight } from "react-icons/pi";
import indianPincodes from "indian-pincodes";
import api from "../../api/axios";
import dataStates from "../../data/states.json";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const GAP_FROM_TOP = 150; // When submitting focusing on input will give 150 gap on top
// Price-related constants
const PRICE = {
  DEFAULT: 150,
  MAX: 500,
  MIN: 1,
};
// Facilities constants
const FACILITIES = [
  "Shower",
  "Locker",
  "Air Conditioning",
  "Parking",
  "Cardio",
  "Calisthenics",
  "Steam Room",
  "Yoga Studio",
];

const states = dataStates;
const Profile = () => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setFocus,
    setValue,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm();
  const [initialValues, setInitialValues] = useState([]);
  const [displayValue, setDisplayValue] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { status } = useAuth();

  // Watch fields
  const watchFacilities = watch("facilities", []);
  const watchImages = watch("images");
  const price = watch("price");

  // Checks Owners status and navigate them accordingly
  useEffect(() => {
    if (status === "inactive" || status === "rejected") {
      navigate("/owners/status");
      toast.error("Not allowed to view this form");
    } else if (status === "new") {
      navigate("/owners/gymForm");
      toast.error("Not allowed to view this form");
    }
  }, [status]);

  // Render the values for all the fields
  useEffect(() => {
    const fetchGymDetails = async () => {
      try {
        const response = await api.get(`/users/owners`);
        if (response.status === 200) {
          const gymData = response.data;
          // console.log("Fetched gym data:", gymData.map_detail);

          // Google Map Link
          // const googleMapsLink = `https://maps.google.com/maps?q=${gymData.map_detail?.coordinates[1]},${gymData.map_detail?.coordinates[0]}`;

          // console.log(googleMapsLink);

          // Use reset to initialize or update form values
          reset({
            gymName: gymData.gym_name || "",
            description: gymData.description || "",
            addressLine1: gymData.address?.address_line_1 || "",
            addressLine2: gymData.address?.address_line_2 || "",
            city: gymData.address?.city || "",
            state: gymData.address?.state || "", // TODO: state is not showing the data
            pincode: gymData.address?.pincode || "",
            price: gymData.price || "",
            maxOccupants: gymData.total_occupancy || "",
            gstNumber: gymData.gst_number || "",
            facilities: gymData.facilities || [],
            // googleMapsLink: googleMapsLink || "",
            // TODO: TypeError: Failed to execute 'createObjectURL' on 'URL': Overload resolution failed.
            images: gymData.images || [],
          });
          setInitialValues(gymData);
        }
      } catch (error) {
        console.error("Failed to fetch gym details", error);
      }
    };

    fetchGymDetails();
  }, [reset]);

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
            top: elementPosition - GAP_FROM_TOP,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [errors, setFocus]);

  // Remove https from map link
  useEffect(() => {
    const values = getValues();

    if (values.googleMapsLink) {
      setDisplayValue(values.googleMapsLink.replace(/^https:\/\//, ""));
    }
  }, [getValues]);

  const handlePincodeChange = () => {
    const pincode = getValues("pincode");

    if (pincode && /^\d{6}$/.test(pincode)) {
      const address = indianPincodes.getPincodeDetails(Number(pincode));
      // console.log(address);
      if (address) {
        setValue("city", address.name);
        setValue("state", address.state);
        // console.log(getValues("pincode"));
        // console.log(getValues("city"));
        // console.log(getValues("state"));
      }
    }
  };

  // setting the price
  const handleSliderChange = (event) => {
    setValue("price", event.target.value);
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = (index, onChange, value) => {
    const updatedImages = value.filter((_, idx) => idx !== index);
    onChange(updatedImages);
  };

  const onSubmit = async (data) => {
    try {
      // Prepare data to send only modified fields
      // TODO: Compare the initial data and changed data and send only new changes
      //   // console.log(data)
      //   // console.log(initialValues._id)

      //   const updatedFields = {}

      //   Object.keys(data).forEach((key) => {
      //     if (data[key] !== initialValues[key]) {
      //       updatedFields[key] = data[key]
      //     }
      //   })

      //   // console.log('updatedFields gym data:', updatedFields)

      const response = await api.patch(`/gyms`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        // console.log("response : " + response);
        toast.success("Gym details updated successfully.");
      }

      //   if (Object.keys(updatedFields).length > 0) {
      // const response = await api.patch(`/gyms`, data, {
      //   headers: { 'Content-Type': 'multipart/form-data' },
      // })
      // if (response.status === 200) {
      //   // console.log('response : ' + response)
      //   toast.success('Gym details updated successfully.')
      // }
      //   } else {
      // toast.success('No changes detected.')
      //   }
    } catch (error) {
      console.error("Failed to update gym details", error);

      if (error.response.data.errors[0]) {
        toast.error(error.response.data.errors[0]);
      } else {
        toast.error("Failed to update gym details. Something went wrong");
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-wwbg text-white mt-4 md:my-12">
      <div className="w-full max-w-2xl bg-wwbg shadow-lg p-8">
        <h3 className="text-2xl font-bold text-center text-wwred mb-4">
          Account Settings
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Gym Name */}
          <div className="space-y-4">
            <label
              className="block mb-1 text-sm font-medium wwred"
              htmlFor="gymName"
            >
              Gym Name<span className="text-red-500">*</span>
            </label>
            <Controller
              name="gymName"
              control={control}
              defaultValue=""
              rules={{
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
              }}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Gym Name"
                  className={`w-full px-3 py-2 border ${
                    errors.gymName ? "border-red-500" : "border-gray-600"
                  } bg-wwbg text-white focus:outline-none focus:border-red-500`}
                />
              )}
            />
            {errors.gymName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.gymName.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-4">
            <label
              className="block mb-1 text-sm font-medium wwred"
              htmlFor="description"
            >
              Description<span className="text-red-500">*</span>
            </label>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{
                required: "Description is required",
                minLength: {
                  value: 200,
                  message: "Description must be at least 200 characters long",
                },
              }}
              render={({ field }) => (
                <textarea
                  {...field}
                  placeholder="Description"
                  className={`w-full px-3 py-2 h-28 border ${
                    errors.description ? "border-red-500" : "border-gray-600"
                  } bg-wwbg text-white focus:outline-none focus:border-red-500`}
                />
              )}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold mb-4 text-wwred">Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Address Line 1 */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1 text-white"
                  htmlFor="addressLine1"
                >
                  Address Line 1<span className="text-red-500">*</span>
                </label>
                <Controller
                  name="addressLine1"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Address Line 1 is required",
                    minLength: {
                      value: 3,
                      message:
                        "Address Line 1 must be at least 3 characters long",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Address 1"
                      className={`w-full px-3 py-2 border ${
                        errors.addressLine1
                          ? "border-red-500"
                          : "border-gray-600"
                      } bg-wwbg text-white focus:outline-none focus:border-red-500`}
                    />
                  )}
                />
                {errors.addressLine1 && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.addressLine1.message}
                  </p>
                )}
              </div>
              {/* Address Line 2 */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1 text-white"
                  htmlFor="addressLine2"
                >
                  Address Line 2
                </label>
                <Controller
                  name="addressLine2"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Address 2"
                      className="w-full px-3 py-2 border border-gray-600 bg-wwbg text-white focus:outline-none focus:border-red-500"
                    />
                  )}
                />
              </div>
              {/* City */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1 text-white"
                  htmlFor="city"
                >
                  City<span className="text-red-500">*</span>
                </label>
                <Controller
                  name="city"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "City is required",
                    minLength: {
                      value: 2,
                      message: "City must be at least 2 characters long",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="City"
                      className={`w-full px-3 py-2 border ${
                        errors.city ? "border-red-500" : "border-gray-600"
                      } bg-wwbg text-white focus:outline-none focus:border-red-500`}
                    />
                  )}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>
              {/* State Dropdown */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1 text-white"
                  htmlFor="state"
                >
                  State<span className="text-red-500">*</span>
                </label>
                <Controller
                  name="state"
                  control={control}
                  defaultValue="AP"
                  rules={{ required: "State is required" }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className={`w-full px-3 py-2 border ${
                        errors.state ? "border-red-500" : "border-gray-600"
                      } bg-wwbg text-white focus:outline-none focus:border-red-500`}
                    >
                      <option className="text-muted" value="">
                        Select State
                      </option>
                      {states.map((state) => (
                        <option key={state.code} value={state.name}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.state.message}
                  </p>
                )}
              </div>
              {/* Pincode Dropdown */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1 text-white"
                  htmlFor="pincode"
                >
                  PIN Code<span className="text-red-500">*</span>
                </label>
                <Controller
                  name="pincode"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "PIN Code is required",
                    pattern: {
                      value: /^\d{6}$/,
                      message: "PIN Code must be exactly 6 digits",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Pincode"
                      onChange={(e) => {
                        field.onChange(e);
                        handlePincodeChange();
                      }}
                      className={`w-full px-3 py-2 border ${
                        errors.pincode ? "border-red-500" : "border-gray-600"
                      } bg-wwbg text-white focus:outline-none focus:border-red-500`}
                    />
                  )}
                />
                {errors.pincode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.pincode.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Pricing and Location */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold mb-4 text-wwred">
              Pricing and Location
            </h3>
            {/* Google Maps Link */}
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1 text-white"
                htmlFor="googleMapsLink"
              >
                Google Maps Link
              </label>
              <div className="relative">
                <Controller
                  name="googleMapsLink"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      value={displayValue}
                      placeholder="maps.google.com/maps/4Zmd31STWKRtpko96"
                      onChange={(e) => {
                        const val = e.target.value;
                        setDisplayValue(val.replace(/^https:\/\//, ""));
                        field.onChange(e);
                      }}
                      onBlur={() => {
                        if (displayValue) {
                          // Make sure the value in the form is updated to include `https://`
                          setValue("googleMapsLink", `https://${displayValue}`);
                        }
                      }}
                      className={`w-full pl-16 px-3 py-2 border ${
                        errors.googleMapsLink
                          ? "border-red-500"
                          : "border-gray-600"
                      } bg-wwbg text-white focus:outline-none focus:border-red-500`}
                    />
                  )}
                />
                <span className="absolute top-0 left-0 pl-3 py-2 text-gray-500 bg-transparent">
                  https://
                </span>
              </div>
              {errors.googleMapsLink && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.googleMapsLink.message}
                </p>
              )}
            </div>
            {/* Max Occupants */}
            <div className="flex flex-col md:flex-row justify-center mb-4 gap-4">
              <div className="w-full">
                <label
                  className="block text-sm font-medium mb-1 text-white"
                  htmlFor="maxOccupants"
                >
                  Max Customers<span className="text-red-500">*</span>
                </label>
                <Controller
                  name="maxOccupants"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Maximum number of customers is required",
                    min: {
                      value: 1,
                      message: "Number of customers must be at least 1",
                    },
                    max: {
                      value: 100,
                      message: "Number of customers must be below 100",
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Please enter a valid number",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Enter maximum number"
                      type="number"
                      min="1"
                      className={`w-full px-3 py-2 border ${
                        errors.maxOccupants
                          ? "border-red-500"
                          : "border-gray-600"
                      } bg-wwbg text-white focus:outline-none focus:border-red-500`}
                    />
                  )}
                />
                {errors.maxOccupants && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.maxOccupants.message}
                  </p>
                )}
              </div>
              {/* GST Number */}
              <div className="w-full">
                <label
                  className="block text-sm font-medium mb-1 text-white"
                  htmlFor="gstNumber"
                >
                  GST Number<span className="text-red-500">*</span>
                </label>
                <Controller
                  name="gstNumber"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Enter maximum number"
                      type="text"
                      min="1"
                      className={`w-full px-3 py-2 border ${
                        errors.gstNumber ? "border-red-500" : "border-gray-600"
                      } bg-wwbg text-white focus:outline-none focus:border-red-500`}
                    />
                  )}
                />
                {errors.gstNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.gstNumber.message}
                  </p>
                )}
              </div>
            </div>
            {/* Price */}
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1 text-white"
                htmlFor="price"
              >
                Price (per hour)<span className="text-red-500">*</span>
              </label>
              <Controller
                name="price"
                control={control}
                defaultValue={PRICE.DEFAULT}
                rules={{
                  min: {
                    value: 1,
                    message: "Price must be at least 1",
                  },
                  max: {
                    value: 500,
                    message: "Price cannot exceed 1000",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <div className="flex flex-col items-center">
                    <input
                      type="range"
                      min={PRICE.MIN}
                      max={PRICE.MAX}
                      step="1"
                      value={value}
                      onChange={(e) => {
                        onChange(e.target.value);
                        handleSliderChange(e);
                      }}
                      className="w-full accent-red-600"
                    />
                    <div className="flex items-center text-red-600 font-semibold mt-2">
                      <PiCurrencyInrLight size={16} />
                      {value}
                    </div>
                  </div>
                )}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
          </div>

          {/* Upload Images */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold mb-4 text-wwred">
              Upload Images
            </h3>
            <Controller
              name="images"
              control={control}
              defaultValue={[]}
              render={({ field: { onChange, value } }) => (
                <div className="flex flex-wrap items-center justify-start gap-3 ">
                  {value &&
                    value.length > 0 &&
                    value.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative w-28 h-28 bg-wwbg border border-gray-600"
                      >
                        <img
                          src={
                            img instanceof File ? URL.createObjectURL(img) : img
                          }
                          alt={`Gym Photo ${idx + 1}`}
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-2 bg-transparent"
                          onClick={() =>
                            handleRemoveImage(idx, onChange, value)
                          }
                        >
                          <span className="text-red-500 font-medium text-lg">
                            x
                          </span>
                        </button>
                      </div>
                    ))}
                  <div
                    className="relative w-28 h-28 bg-wwbg flex items-center justify-center border border-gray-600 cursor-pointer"
                    onClick={handleFileInputClick}
                  >
                    <span className="text-red-500 text-3xl">+</span>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept=".jpg, .jpeg, .png, .svg, .heic, .webp"
                    ref={fileInputRef}
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      onChange([...value, ...files]);
                    }}
                    className="hidden"
                  />
                </div>
              )}
            />
          </div>

          {/* Facilities */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold mb-4 text-wwred">
              Facilities
            </h3>
            <p className="mb-2">
              Select all of the facilities available at your gym
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {FACILITIES.map((facility) => (
                <label
                  key={facility}
                  className="flex items-center cursor-pointer"
                >
                  <Controller
                    name="facilities"
                    control={control}
                    defaultValue={[]}
                    render={({ field: { onChange, value } }) => (
                      <>
                        <div
                          className="relative flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-wwbg border cursor-pointer transition-all duration-300 ease-in-out border-gray-600"
                          onClick={() => {
                            const updatedFacilities = value.includes(facility)
                              ? value.filter((f) => f !== facility)
                              : [...value, facility];
                            onChange(updatedFacilities);
                          }}
                        >
                          {value.includes(facility) && (
                            <span className="text-2xl absolute text-red-500">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </span>
                          )}
                        </div>
                        <span className="text-base ml-2 font-base text-white">
                          {facility}
                        </span>
                      </>
                    )}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-2 mt-6 text-center">
            <button
              type="submit"
              className="w-full md:w-40 px-4 bg-wwred py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
