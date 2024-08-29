import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import api from "../../api/axios.js";
import { usePagination } from "pagination-react-js";
import TableComponent from "../../components/Bookings/TableComponent.jsx";
import TodaysBookingSection from "../../components/Bookings/TodaysBookingSection.jsx";
import moment from "moment";

function Bookings() {
  const [todayBookings, setTodayBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [futureBookings, setFutureBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noBookings, setNoBookings] = useState(false); // State to handle no bookings
  const { isAuthenticated } = useAuth();

  const pastPagination = usePagination({
    activePage: 1,
    recordsPerPage: 5,
    totalRecordsLength: pastBookings.length,
    navCustomPageSteps: { prev: 1, next: 1 },
    offset: 2,
    permanentFirstNumber: true,
    permanentLastNumber: true,
  });

  const futurePagination = usePagination({
    activePage: 1,
    recordsPerPage: 5,
    totalRecordsLength: futureBookings.length,
    navCustomPageSteps: { prev: 1, next: 1 },
    offset: 2,
    permanentFirstNumber: true,
    permanentLastNumber: true,
  });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get(`/users/bookings`);

        const bookings = response.data.bookingsWithGymName;
        console.log("All bookings : ", bookings);

        if (bookings.length > 0) {
          const today = new Date();
          today.setHours(0, 0, 0, 0); // Set today's time to 00:00:00 for accurate comparison

          const todayBookings = bookings.filter((booking) => {
            const bookingDate = moment(booking.date, "DD-MM-YYYY").startOf(
              "day"
            );
            return bookingDate.isSame(today, "day");
          });

          const pastBookings = bookings.filter((booking) => {
            const bookingDate = moment(booking.date, "DD-MM-YYYY").startOf(
              "day"
            );
            return bookingDate.isBefore(today, "day");
          });

          const futureBookings = bookings.filter((booking) => {
            const bookingDate = moment(booking.date, "DD-MM-YYYY").startOf(
              "day"
            );
            return bookingDate.isAfter(today, "day");
          });

          console.log("todayBookingstodayBookings", todayBookings);

          setTodayBookings(todayBookings);
          setPastBookings(pastBookings);
          setFutureBookings(futureBookings);

          if (
            todayBookings.length === 0 &&
            pastBookings.length === 0 &&
            futureBookings.length === 0
          ) {
            setNoBookings(true); // Set no bookings state to true
          } else {
            setNoBookings(false); // Ensure no bookings state is false if there are bookings
          }
        } else {
          setNoBookings(true);
        }
      } catch (err) {
        setError("Failed to fetch bookings.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [isAuthenticated]);

  // Remove ratings from future bookings
  const removeUnwantedForFutureBookings = futureBookings.map(
    ({ _id, rating, ...booking }) => booking
  );

  // Remove ratings from past bookings
  const removeUnwantedFromPastBookings = pastBookings.map(
    ({ _id, rating, ...booking }) => booking
  );

  const renderTableWithPagination = (pagination, data, title) => {
    const { records, pageNumbers, setActivePage } = pagination;

    return (
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-bold">{title}</h3>
        <TableComponent
          columns={Object.keys(data[0] || {}).length}
          headers={Object.keys(data[0] || {})}
          data={data.slice(records.indexOfFirst, records.indexOfLast + 1)}
        />
        <nav role="navigation" aria-label="Pagination Navigation">
          <ul className="flex justify-center gap-4 mt-4 pagination sm:gap-8">
            <li onClick={() => setActivePage(pageNumbers.firstPage)}>
              &laquo;
            </li>
            <li onClick={() => setActivePage(pageNumbers.previousPage)}>
              &lsaquo;
            </li>
            {pageNumbers.navigation.map((number, index) => (
              <li
                key={index}
                onClick={() => setActivePage(number)}
                className={`pagination-item ${
                  number === pageNumbers.activePage ? "active" : ""
                }`}
              >
                {number}
              </li>
            ))}
            <li onClick={() => setActivePage(pageNumbers.nextPage)}>
              &rsaquo;
            </li>
            <li onClick={() => setActivePage(pageNumbers.lastPage)}>&raquo;</li>
          </ul>
        </nav>
      </div>
    );
  };

  return (
    <div className="p-6">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center justify-center text-center p-6 h-64 bg-wwpopdiv shadow-lg max-w-md w-full md:mx-3">
            <h1 className="text-3xl font-bold text-wwTitleRed mb-4">Error</h1>
            <p className="text-lg text-wwtext mb-6">{error}</p>
          </div>
        </div>
      ) : noBookings ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center justify-center text-center p-6 h-64 bg-wwpopdiv shadow-lg max-w-md w-full md:mx-3">
            <h1 className="text-3xl font-bold text-wwTitleRed mb-4">
              No Bookings
            </h1>
            <p className="text-lg text-wwtext mb-6">
              You have no bookings at the moment.
            </p>
          </div>
        </div>
      ) : (
        <>
          <TodaysBookingSection todayBookings={todayBookings} />

          {futureBookings.length > 0 &&
            renderTableWithPagination(
              futurePagination,
              removeUnwantedForFutureBookings,
              "Future Bookings"
            )}

          {pastBookings.length > 0 &&
            renderTableWithPagination(
              pastPagination,
              removeUnwantedFromPastBookings,
              "Past Bookings"
            )}
        </>
      )}
    </div>
  );
}

export default Bookings;
