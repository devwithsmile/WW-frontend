import { TimePicker } from "antd";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import dayjs from 'dayjs';

export default function App() {
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      times: Array(7).fill({ start: "", end: "" }),
      selectedDays: Array(7).fill(false),
      blockedDates: new Set(),
    },
  });

  const format = 'HH:mm';

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const times = watch("times");
  const selectedDays = watch("selectedDays");
  const blockedDates = watch("blockedDates");

  const handleTimeChange = (index, field, value) => {
    const newTimes = [...times];
    newTimes[index] = { ...newTimes[index], [field]: value };
    setValue("times", newTimes);
  };

  const handleCheckboxChange = (index) => {
    const newSelectedDays = [...selectedDays];
    newSelectedDays[index] = !newSelectedDays[index];
    setValue("selectedDays", newSelectedDays);
  };

  const handleSave = (data) => {
    const dataToSend = data.times
      .map((time, index) => {
        if (data.selectedDays[index]) {
          return { day: daysOfWeek[index], ...time };
        }
        return null;
      })
      .filter(Boolean);

    console.log("Data to send:", dataToSend);
    // Here you would make a POST request to your backend with dataToSend
  };

  const handleAddUnavailableDates = () => {
    setShowDatePicker(true);
  };

  const handleDateSubmit = () => {
    if (selectedDate) {
      const dateIndex = new Date(selectedDate).getDay(); // Get index (0 for Sunday, 1 for Monday, etc.)
      if (dateIndex >= 0 && dateIndex < 7) {
        setValue(
          "blockedDates",
          new Set([...blockedDates, dateIndex])
        );
        setValue(
          "selectedDays",
          selectedDays.map((day, index) =>
            index === dateIndex ? false : day
          )
        );
      }
      setShowDatePicker(false);
      setSelectedDate("");
    }
  };

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="flex flex-col h-screen">
      
      <div className="flex">
        
        <div className="flex flex-col w-2/3 shadow-md">
          <div className="flex items-center justify-between p-2">
            <h1 className="text-lg">Default</h1>
            <button
              className="px-4 py-2 border rounded"
              onClick={handleSubmit(handleSave)}
            >
              Save
            </button>
          </div>
          
          {daysOfWeek.map((day, index) => (
            <div
              key={day}
              className="grid items-center grid-cols-4 gap-3 mb-3"
            >
              <Controller
                name={`selectedDays[${index}]`}
                control={control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    id={day}
                    {...field}
                    onChange={() => handleCheckboxChange(index)}
                  />
                )}
              />
              <label htmlFor={day}>{day}</label>
              <Controller
                name={`times[${index}].start`}
                control={control}
                render={({ field }) => (
                    <TimePicker format={format} className="bg-transparent"/>
                )}
              />
              <Controller
                name={`times[${index}].end`}
                control={control}
                render={({ field }) => (
                    <TimePicker format={format} className="bg-transparent"/>
                )}
              />
            </div>
          ))}
        </div>

        <div className="flex">
          <div className="p-4 rounded-lg shadow-md">
            <h2 className="mb-2 text-lg">Block Dates</h2>
            <p className="mb-4">
              Add dates when you will be unavailable to take calls
            </p>
            <button
              className="w-full px-4 py-2 text-white bg-green-600 rounded-lg"
              onClick={handleAddUnavailableDates}
            >
              Add Unavailable Dates
            </button>
            {showDatePicker && (
              <div className="mt-4">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-2 py-1 mb-2 border rounded"
                />
                <button
                  className="px-4 py-2 border rounded"
                  onClick={handleDateSubmit}
                >
                  Block Date
                </button>
              </div>
            )}
            {blockedDates.size > 0 && (
              <div className="p-4 mt-4 rounded-lg">
                <h3>Blocked Dates</h3>
                <ul>
                  {[...blockedDates].map((dayIndex) => (
                    <li key={dayIndex}>{daysOfWeek[dayIndex]}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}