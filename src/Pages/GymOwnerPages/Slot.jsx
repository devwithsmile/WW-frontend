import { TimePicker, DatePicker, Space } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdOutlineAddBox } from "react-icons/md";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const disableDate = (current) => {
  const today = dayjs().startOf("day"); // Start of today to avoid time issues
  const year = today.add(12, "month");
  return current.isBefore(today) || current.isAfter(year);
};

const Slot = () => {
  const {
    control,
    handleSubmit,
    watch,
    getValues,
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
  const navigate = useNavigate();
  const { status } = useAuth();

  // Watch fields
  const selectedDays = watch("selectedDays");
  const times = watch("times");
  const frequency = watch("frequency");

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

  const validateFromTime = (fromValue, toValue) => {
    const fromTime = dayjs(fromValue, format);
    const toTime = dayjs(toValue, format);

    if (!fromValue || !toValue) return true; // If either time is missing, consider it valid

    // Check if 'From' time is before 'To' time
    if (fromTime.isAfter(toTime)) {
      return "Start time < End time";
    }

    // Check if the duration is at least 1 hour
    if (toTime.diff(fromTime, "hour") < 1) {
      return "Slot must be ≥ 1 hour";
    }

    return true;
  };

  const validateToTime = (fromValue, toValue) => {
    const fromTime = dayjs(fromValue, format);
    const toTime = dayjs(toValue, format);

    if (!fromValue || !toValue) return true; // If either time is missing, consider it valid

    // Check if 'To' time is before 'From' time
    if (toTime.isBefore(fromTime)) {
      return "Start time < End time";
    }

    // Check if the duration is at least 1 hour
    if (toTime.diff(fromTime, "hour") < 1) {
      return "Slot must be ≥ 1 hour";
    }

    return true;
  };

  // Compare "from" and "to" times to check past/future times
  const validateTimeRange = (from, to) => {
    if (!from || !to) return true; // If either time is missing, consider it valid

    const fromTime = dayjs(from, format);
    const toTime = dayjs(to, format);

    return fromTime.isBefore(toTime);
  };

  // Check slot duration is minimum 1 hour
  const isAtLeastOneHour = (from, to) => {
    if (!from || !to) return true; // If either time is missing, consider it valid

    const fromTime = dayjs(from, format);
    const toTime = dayjs(to, format);

    return toTime.diff(fromTime, "hour") >= 1;
  };

  // Find any duplicate in the slots
  const findDuplicateSlots = (slots) => {
    return slots
      .map((daySlots, dayIndex) => {
        const seenSlots = new Set();
        const duplicates = [];

        daySlots.forEach((slot, index) => {
          const slotKey = `${slot.from}-${slot.to}`;
          if (seenSlots.has(slotKey)) {
            duplicates.push({ index, slotKey });
          } else {
            seenSlots.add(slotKey);
          }
        });

        return duplicates.length > 0 ? { dayIndex, duplicates } : null;
      })
      .filter(Boolean); // Remove null entries
  };

  // Remove duplicate in that slots
  const removeDuplicateSlots = (slots) => {
    return slots.map((daySlots) => {
      const uniqueSlots = new Set();
      return daySlots.filter((slot) => {
        const slotString = JSON.stringify(slot);
        if (uniqueSlots.has(slotString)) {
          return false;
        }
        uniqueSlots.add(slotString);
        return true;
      });
    });
  };

  const onSubmit = async (data) => {
    const formattedTimes = data.times.map((dayTimes) =>
      (dayTimes || []).map(({ from, to }) => ({
        from: from ? dayjs(from).format(format) : undefined,
        to: to ? dayjs(to).format(format) : undefined,
      }))
    );

    // Check for duplicate slots
    const duplicates = findDuplicateSlots(formattedTimes);

    if (duplicates.length > 0) {
      const errorMessage = duplicates
        .map(({ dayIndex, duplicates }) => {
          const dayName = daysOfWeek[dayIndex];
          const duplicateTimes = duplicates
            .map(({ slotKey }) => {
              const [from, to] = slotKey.split("-");
              return `${from} to ${to}`;
            })
            .join(", ");
          return `Day: ${dayName}, Duplicate times: ${duplicateTimes}`;
        })
        .join("; ");

      return toast.error(`Duplicate time slots found: ${errorMessage}`);
    }

    // Remove duplicate slots for submission
    const uniqueTimes = removeDuplicateSlots(formattedTimes);

    // Check for minimum 1-hour duration
    const invalidDurationSlots = uniqueTimes.flatMap((dayTimes) =>
      dayTimes.filter(({ from, to }) => !isAtLeastOneHour(from, to))
    );

    if (invalidDurationSlots.length > 0) {
      return toast.error("Each time slot must be at least 1 hour long.");
    }

    // Check if every day has no time slots
    const allDaysEmpty = uniqueTimes.every((dayTimes) => dayTimes.length === 0);

    if (allDaysEmpty) {
      return toast.error("Please add at least one time slot for a day.");
    }

    // Validate time ranges
    const invalidTimeSlots = uniqueTimes.flatMap((dayTimes) =>
      dayTimes.filter(({ from, to }) => !validateTimeRange(from, to))
    );

    if (invalidTimeSlots.length > 0) {
      return toast.error("Please ensure that 'From' time is before 'To' time.");
    }

    // console.log(uniqueTimes);

    // Convert data to day-wise format
    const dayWiseData = daysOfWeek.reduce((result, day, index) => {
      result[day] = uniqueTimes[index] || []; // Map each index to a day
      return result;
    }, {});

    // console.log(dayWiseData);

    try {
      const formData = {
        slots: dayWiseData,
        blockedDates: selectedDates,
        frequency: frequency,
      };

      const response = await api.post(`/gyms/schedule`, formData);

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
      <div className="flex flex-col justify-center mx-4 shadow-lg md:flex-row md:space-x-12 md:px-16">
        {/* Time Container */}
        <div className="flex flex-col justify-center p-4">
          <h2 className="mb-2 text-2xl font-semibold">Slots</h2>
          <p className="mb-4 text-base text-gray-500">
            Set available workout time slots for your clients
          </p>
          {daysOfWeek.map((day, index) => (
            <div key={day} className="flex flex-col my-2 space-y-2 md:flex-row">
              {/* Check box */}
              <div className="w-full flex items-center my-6 md:!hidden">
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
                      className="hidden mr-2"
                    />
                    <label
                      htmlFor={day}
                      className="w-24 hidden text-base text-white md:!block"
                    >
                      {day}
                    </label>
                    <button
                      type="button"
                      className="mr-2 text-right text-red-500 lg:mr-0"
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
                          rules={{
                            required: "Start time is required",
                            validate: (value) => {
                              // Validate against the end time
                              const endTime = getValues(
                                `times[${index}][${timeIndex}].to`
                              );
                              return (
                                validateFromTime(value, endTime) ||
                                "Invalid time slot"
                              );
                            },
                          }}
                          render={({ field }) => (
                            <TimePicker
                              format={format}
                              className="w-full text-white border border-gray-600 rounded-none bg-wwbg focus:outline-none focus:border-red-500"
                              {...field}
                            />
                          )}
                        />
                        {errors.times?.[index]?.[timeIndex]?.from && (
                          <p className="mt-1 text-xs text-right text-red-500">
                            {errors.times[index][timeIndex].from.message}*
                          </p>
                        )}
                      </div>

                      <div className="w-full">
                        <Controller
                          name={`times[${index}][${timeIndex}].to`}
                          control={control}
                          rules={{
                            required: "End time is required",
                            validate: (value) => {
                              // Validate against the start time
                              const startTime = getValues(
                                `times[${index}][${timeIndex}].from`
                              );
                              return (
                                validateToTime(startTime, value) ||
                                "Invalid time slot"
                              );
                            },
                          }}
                          render={({ field }) => (
                            <TimePicker
                              format={format}
                              className="w-full text-white border border-gray-600 rounded-none bg-wwbg focus:outline-none focus:border-red-500"
                              {...field}
                            />
                          )}
                        />
                        {errors.times?.[index]?.[timeIndex]?.to && (
                          <p className="mt-1 text-xs text-right text-red-500">
                            {errors.times[index][timeIndex].to.message}*
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        className="mt-2 text-red-500"
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
        <div className="flex flex-col justify-">
          {/* Frequency Dropdown */}
          <div className="p-4">
            <h2 className="mb-2 text-2xl font-semibold">Frequency</h2>
            <p className="mb-4 text-base text-gray-500">
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
                </select>
              )}
            />
          </div>

          {/* Block Date Container */}
          <div className="p-4">
            <h2 className="mb-2 text-2xl font-semibold">Block Dates</h2>
            <p className="mb-4 text-base text-gray-500">
              Add dates when you will be unavailable to take calls
            </p>

            {/* Date Picker */}
            <div className="flex flex-col items-start my-4 space-y-2">
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
                      disabledDate={disableDate}
                    />
                  )}
                />
              </Space>
            </div>

            {/* Selected Dates List */}
            {selectedDates.length > 0 && (
              <div className="my-4">
                <h3 className="mb-2 text-lg">Selected Dates</h3>
                <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-3">
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
