import { TimePicker, DatePicker, Space } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdOutlineAddBox } from "react-icons/md";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import api from "../../api/axios";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Slot = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm({
    defaultValues: {
      times: daysOfWeek.map(() => []), // Initialize empty arrays for each day
      selectedDays: Array(daysOfWeek.length).fill(false),
      frequency: "weekly",
    },
  });

  const format = "HH:mm";
  const [selectedDates, setSelectedDates] = useState([]);

  const selectedDays = watch("selectedDays");
  const times = watch("times");
  const frequency = watch("frequency");

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

  const handleCheckboxChange = useCallback(
    (index) => {
      const newSelectedDays = [...selectedDays];
      newSelectedDays[index] = !newSelectedDays[index];
      setValue("selectedDays", newSelectedDays);
    },
    [selectedDays, setValue]
  );

  const handleDateChange = useCallback(
    (date, dateString) => {
      if (date && !selectedDates.includes(dateString)) {
        setSelectedDates([...selectedDates, dateString]);
      }
    },
    [selectedDates]
  );

  const handleRemoveDate = useCallback(
    (dateToRemove) => {
      setSelectedDates(selectedDates.filter((date) => date !== dateToRemove));
    },
    [selectedDates]
  );

  const addTimeSlot = (dayIndex) => {
    // console.log(dayIndex);
    // handleCheckboxChange(dayIndex);
    const newTimes = [...times];
    if (!newTimes[dayIndex]) {
      newTimes[dayIndex] = [];
    }
    newTimes[dayIndex].push({ from: "", to: "" });
    setValue("times", newTimes);
  };

  const removeTimeSlot = (dayIndex, intervalIndex) => {
    const newTimes = [...times];
    newTimes[dayIndex].splice(intervalIndex, 1);
    if (newTimes[dayIndex].length === 0) {
      newTimes[dayIndex] = [];
    }
    setValue("times", newTimes);
  };

  const onSubmit = async (data) => {
    const formattedTimes = data.times.map((dayTimes) =>
      (dayTimes || []).map(({ from, to }) => ({
        from: from ? dayjs(from).format(format) : undefined,
        to: to ? dayjs(to).format(format) : undefined,
      }))
    );

    // Check if every day has no time slots
    const allDaysEmpty = formattedTimes.every(
      (dayTimes) => dayTimes.length === 0
    );

    if (allDaysEmpty) {
      return toast.error("Please add at least one time slot for a day.");
    }

    try {
      const formData = {
        times: formattedTimes,
        blockedDates: selectedDates,
        frequency: frequency,
      };

      const response = await api.patch(`/gyms/schedule`, {
        formData,
      });

      // Handle successful login
      if (response.status === 200) {
        toast.success("Your slot has been saved successfully");
      }
    } catch (error) {
      console.error("Error while saving user details:", error);

      if (error.response && error.response.data.errors) {
        const { errors } = error.response.data;

        if (errors) {
          toast.error(errors.message);
        }
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[35rem] my-6">
      <div className="flex flex-col justify-center mx-4 md:flex-row md:space-x-12 md:px-16 shadow-lg">
        {/* Time Container */}
        <div className="flex flex-col justify-center p-4">
          <h2 className="mb-2 font-semibold text-2xl">Slots</h2>
          <p className="mb-4 text-gray-500 text-base">
            Set available workout time slots for your clients
          </p>
          {daysOfWeek.map((day, index) => (
            <div key={day} className="flex flex-col space-y-2 md:flex-row my-2">
              {/* Check box */}
              <div className="w-full flex items-center my-6 md:hidden">
                <div className="flex-grow border-t border-red-600"></div>
                <span className="mx-4 text-white-400">{day}</span>
                <div className="flex-grow border-t border-red-600"></div>
              </div>
              <Controller
                name={`selectedDays[${index}]`}
                control={control}
                render={({ field }) => (
                  <div className="flex items-center justify-end mb-2 lg:space-x-2">
                    <input
                      type="checkbox"
                      id={day}
                      {...field}
                      onChange={() => handleCheckboxChange(index)}
                      className="mr-2 hidden"
                    />
                    <label
                      htmlFor={day}
                      className="w-24 hidden text-base text-white md:block"
                    >
                      {day}
                    </label>
                    <button
                      type="button"
                      className="text-red-500 text-right mr-2 lg:mr-0"
                      onClick={() => addTimeSlot(index)}
                    >
                      <MdOutlineAddBox />
                    </button>
                  </div>
                )}
              />

              {/* Time Pickers */}
              <div className="flex flex-col space-y-2">
                {times[index] &&
                  times[index].map((time, timeIndex) => (
                    <div
                      key={timeIndex}
                      className="flex flex-col items-end space-y-3 lg:flex-row lg:space-y-0 lg:space-x-3 lg:items-center lg:ml-4"
                    >
                      <div className="w-full">
                        <Controller
                          name={`times[${index}][${timeIndex}].from`}
                          control={control}
                          rules={{ required: "Start time is required" }}
                          render={({ field }) => (
                            <TimePicker
                              format={format}
                              className="w-full rounded-none bg-wwbg text-white focus:outline-none focus:border-red-500 border border-gray-600"
                              {...field}
                            />
                          )}
                        />
                        {errors.times?.[index]?.[timeIndex]?.from && (
                          <p className="text-red-500 text-xs mt-1 text-right">
                            {errors.times[index][timeIndex].from.message}*
                          </p>
                        )}
                      </div>

                      <div className="w-full">
                        <Controller
                          name={`times[${index}][${timeIndex}].to`}
                          control={control}
                          rules={{ required: "End time is required" }}
                          render={({ field }) => (
                            <TimePicker
                              format={format}
                              className="w-full rounded-none bg-wwbg text-white focus:outline-none focus:border-red-500 border border-gray-600"
                              {...field}
                            />
                          )}
                        />
                        {errors.times?.[index]?.[timeIndex]?.to && (
                          <p className="text-red-500 text-xs mt-1 text-right">
                            {errors.times[index][timeIndex].to.message}*
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        className="text-red-500 mt-2"
                        onClick={() => removeTimeSlot(index, timeIndex)}
                      >
                        <IoMdCloseCircleOutline className="text-red-600" />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Frequency Dropdown and Block Date Container */}
        <div className="flex justify- flex-col">
          {/* Frequency Dropdown */}
          <div className="p-4">
            <h2 className="mb-2 font-semibold text-2xl">Frequency</h2>
            <p className="mb-4 text-gray-500 text-base">
              Select how often these slots should be applied
            </p>
            <Controller
              name="frequency"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full px-3 py-2 text-center text-white border border-red-500 rounded-none bg-wwbg focus:outline-none focus:border-red-500"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              )}
            />
          </div>

          {/* Block Date Container */}
          <div className="p-4">
            <h2 className="mb-2 font-semibold text-2xl">Block Dates</h2>
            <p className="mb-4 text-gray-500 text-base">
              Add dates when you will be unavailable to take calls
            </p>

            {/* Date Picker */}
            <div className="flex flex-col items-start space-y-2 my-4">
              <Space direction="vertical" style={{ width: "100%" }}>
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      className="w-full px-3 py-2 rounded-none bg-wwbg !text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border border-red-500 hover:bg-wwbg"
                      style={{ width: "100%" }}
                      onChange={handleDateChange}
                    />
                  )}
                />
              </Space>
            </div>

            {/* Selected Dates List */}
            {selectedDates.length > 0 && (
              <div className="my-4">
                <h3 className="mb-2 text-lg">Selected Dates</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                  {selectedDates.map((date, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="px-2 py-1 text-red-50">
                        {dayjs(date).format("YYYY-MM-DD")}
                      </span>
                      <button
                        className="text-red-500"
                        onClick={() => handleRemoveDate(date)}
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit button */}
            <button
              type="button"
              className="w-full md:w-40 px-4 bg-wwred py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slot;
