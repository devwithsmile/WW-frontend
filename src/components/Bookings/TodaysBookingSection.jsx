import React, { useEffect, useRef, useState } from "react";
import imageforPage from "../../assets/images/signin.jpg";
import api from "../../api/axios";
import moment from "moment";
import { toast } from "react-toastify";
import { data } from "autoprefixer";
import TodaysBookingSkeleton from "../Skeletons/TodaysBookingSkeleton";

function TodaysBookingSection({ todayBookings = [] }) {
  const [gymImage, setGymImage] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [duration, setDuration] = useState(0); // needs to change dyanamically later. currently not setting to 0 bcuz backend will send error
  // Extend Modal
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const incrementDuration = () => setDuration((prev) => prev + 5);
  const decrementDuration = () =>
    setDuration((prev) => (prev > 0 ? prev - 5 : 0));

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  const [loading, setLoading] = useState(true); // State to manage loading
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 4000)); // Simulate 4 seconds network delay
      setLoading(false);
    };

    fetchData();
  }, []);


  useEffect(() => {
    if (todayBookings.length > 0) {
      const todayDate = moment().format("DD/MM/YYYY"); // Replace '/' with '-' for the API call
      console.log(todayDate);

      api
        .get(`users/bookings/images?date=${todayDate}`)
        .then((response) => {
          console.log(response);

          setGymImage(response.data.bookingsWithImages[0].image_urls[0]);
        })
        .catch((error) => {
          console.error("Error fetching gym image:", error);
          setGymImage(
            "https://workoutwingsbucket.s3.ap-south-1.amazonaws.com/owner/undefined/1723725094241_5am-fitness-namakkal-gyms-7fdsqtemq4.avif"
          ); // Fallback if image fetching fails
        });
    }
  }, [todayBookings]);

  // Modal
  useEffect(() => {
    // Add event listener for clicks outside the modal
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (todayBookings.length === 0) {
    return (
      <div className="flex items-center justify-center mb-6">
        <div className="w-full p-6 text-center shadow-lg bg-wwpopdiv md:mx-3">
          <p className="text-lg text-wwtext">No bookings for today.</p>
        </div>
      </div>
    );
  }

  function formatDate(inputDate) {
    const [day, month, year] = inputDate.split("-").map(Number);
    const date = new Date(year, month - 1, day); // Months are 0-based in JavaScript Date object
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const booking = todayBookings[0];

  console.log(booking);

  const gymName = booking.gym_name || "Gym Name";
  const bookingDate = formatDate(booking.date) || "Booking Date";
    
  const bookingSlot = `${booking.from} - ${booking.to}` || "Booking Slot";
  const welcomeMessage = `Welcome to ${gymName}!`;

  // Extend request goes here
  const handleExtend = async () => {
    if (duration <= 0) {
      return toast.warning("Extension duration must be 1 minute or more");
    }

    try {
      const response = await api.post(`/bookings/extends`, {
        bookingId: booking._id,
        duration: duration,
      });

      if (response.status == 201) {
        toast.success("Extension requested. Please wait for Gym's response");
      }
    } catch (error) {
      if (error.response.status === 500) {
        return toast.error(error.response.data.errors.global);
      }

      toast.error(error.response.data.message);
    }
  };

  // Cancel request goes here
  const handleCancel = async () => {
    try {
      const response = await api.patch("/bookings/cancel", {
        bookingId: booking._id,
      });

      if (response.status == 200) {
        toast.success(response.data.message);
        // TODO: page reload
      }
    } catch (error) {
      if (error.response.status === 500) {
        return toast.error(error.response.data.errors.global);
      }

      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      {loading ? (<TodaysBookingSkeleton />) : (<>
      <h3 className="mb-4 text-lg font-bold">Today{"'"}s Bookings</h3>
        <div className="flex flex-col items-center justify-center w-full mb-6 shadow-lg lg:flex-row">
          {/* Gym Image */}
          <div className="flex-none w-full lg:w-[30rem] h-[15rem] overflow-hidden relative">
            <img
              src={gymImage || imageforPage}
              alt="Gym Image"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="w-full px-3 my-3 md:px-6">
            {/* Gym Content */}
            <div className="flex flex-col items-center justify-between md:flex-row md:items-start">
              <div className="w-full">
                <h2 className="text-xl font-bold">{gymName}</h2>
                <p className="text-sm text-gray-400">{welcomeMessage}</p>
              </div>
              <div className="flex flex-row justify-between w-full mt-2 md:flex-col md:text-right md:mt-0">
                <p className="text-sm">{bookingDate}</p>
                <p className="text-sm">{bookingSlot}</p>
              </div>
            </div>

            {/* Review */}
            <div className="flex items-center mt-4">
              <p className="mr-4">How was your experience?</p>
              <div className="flex">
                {Array.from({ length: 5 }, (_, index) => index + 1).map(
                  (star) => (
                    <span
                      key={star}
                      className={`text-2xl cursor-pointer ${(hover || rating) >= star
                          ? "text-red-500"
                          : "text-gray-600"
                        }`}
                      onClick={async () =>
                        setRating(
                          star,
                          await api.patch("/bookings/ratings", {
                            booking_id: booking._id,
                            rating: rating,
                          })
                        )
                      }
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                    >
                      ★
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col items-center justify-center mt-6 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 md:justify-end">
              <div className="w-full md:w-auto">
                <button
                  type="button"
                  onClick={openModal}
                  className="w-full md:w-40 px-4 bg-wwred py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Extend Session
                </button>
                {/* Modal */}
                {isOpen && (
                  <div
                    ref={modalRef}
                    className="bg-wwbg text-white p-4 mt-5 shadow-lg border-[0.0001rem] border-gray-700  space-y-4 absolute ml-[15px] md:ml-[-60px] z-50"
                  >
                    <div className="text-center">
                      <label className="text-lg font-bold text-red-500">
                        Duration
                      </label>
                    </div>
                    <div className="flex items-center justify-center space-x-4">
                      <button
                        type="button"
                        onClick={decrementDuration}
                        className="px-3 py-1.5 text-lg font-bold border border-red-900"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        readOnly
                        value={duration}
                        className="w-20 px-1 py-2 text-center text-white border border-red-500 rounded-none cursor-not-allowed bg-wwbg focus:outline-none focus:border-red-500"
                      />
                      <button
                        type="button"
                        onClick={incrementDuration}
                        className="px-3 py-1.5 text-lg font-bold border border-red-900"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={handleExtend}
                        className="w-full px-4 bg-wwred py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={handleCancel}
                className="w-full md:w-40 px-4 bg-transparent py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-center border border-wwred"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        </>)}

      </>
      );
}

      export default TodaysBookingSection;
