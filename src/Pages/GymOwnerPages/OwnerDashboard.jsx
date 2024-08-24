import React, { useState, useEffect } from "react";
import { FaChartBar, FaDollarSign, FaClock, FaUser } from "react-icons/fa";
import api from "../../api/axios";
import TableComponent from "../../components/Bookings/TableComponent";
import { usePagination } from "pagination-react-js";

const OwnerDashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: { current: 0, growthPercentage: 0 },
    totalRevenue: { current: 0, growthPercentage: 0 },
    totalHours: { current: 0, growthPercentage: 0 },
    totalUniqueUsers: { current: 0, growthPercentage: 0 },
  });

  const [extensionRequests, setExtensionRequests] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);

  useEffect(() => {
    api
      .get("/gyms/owners/stats")
      .then((response) => {
        setStats(response.data);
      })
      .catch((error) => {
        console.error("Error fetching stats:", error);
      });

    api
      .get("/gyms/extensions")
      .then((res) => {
        setExtensionRequests(res.data.extensionRequests);
      })
      .catch((error) => {
        console.error("Error fetching stats:", error);
      });

    api
      .get("/gyms/bookings/upcoming")
      .then((res) => {
        setUpcomingBookings(res.data.bookings);
      })
      .catch((error) => {
        console.error("Error fetching stats:", error);
      });
  }, []);

  const extensionWithPagination = usePagination({
    activePage: 1,
    recordsPerPage: 5,
    totalRecordsLength: extensionRequests.length,
    navCustomPageSteps: { prev: 1, next: 1 },
    offset: 2,
    permanentFirstNumber: true,
    permanentLastNumber: true,
  });

  const upcomingBookingsWithPagination = usePagination({
    activePage: 1,
    recordsPerPage: 5,
    totalRecordsLength: upcomingBookings.length,
    navCustomPageSteps: { prev: 1, next: 1 },
    offset: 2,
    permanentFirstNumber: true,
    permanentLastNumber: true,
  });

  const renderTableWithPagination = (pagination, data, title) => {
    const { records, pageNumbers, setActivePage } = pagination;

    return (
      <section>
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
      </section>
    );
  };

  // Remove ratings from future bookings
  const removeUnwantedFromPastbookings = extensionRequests.map(
    ({ _id, ...extensionRequests }) => extensionRequests
  );

  // Remove ratings from future bookings
  const removeUnwantedFromUpcomingbookings = upcomingBookings.map(
    ({ booking_id, ...upcomingBookings }) => upcomingBookings
  );

  return (
    <div>
      {/* Stats */}
      <div className="px-4 py-8 space-y-6">
        <section>
          <h3 className="mb-4 text-lg font-bold">Stats</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Total Bookings */}
            <div className="flex items-center space-x-6 px-6 py-4 bg-wwpopdiv shadow-lg">
              <div className="flex-shrink-0 p-3">
                <FaChartBar size={24} className="text-red-500" />
              </div>
              <div className="flex-1 flex flex-col">
                <h2 className="text-base md:text-xl font-semibold text-wwsecondarytext">
                  Total Bookings
                </h2>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xl md:text-2xl font-semibold text-wwtext">
                    {stats.totalBookings.current}
                  </p>
                  <span
                    className={`text-sm md:text-base font-semibold text-red-500 ml-4`}
                  >
                    {stats.totalBookings.growthPercentage > 0 ? "▲" : "▼"}{" "}
                    {stats.totalBookings.growthPercentage}%
                  </span>
                </div>
              </div>
            </div>

            {/* Total Revenue */}
            <div className="flex items-center space-x-6 px-6 py-4 bg-wwpopdiv shadow-lg">
              <div className="flex-shrink-0 p-3">
                <FaDollarSign size={24} className="text-red-500" />
              </div>
              <div className="flex-1 flex flex-col">
                <h2 className="text-base md:text-xl font-semibold text-wwsecondarytext">
                  Total Revenue
                </h2>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xl md:text-2xl font-semibold text-wwtext">
                    {stats.totalRevenue.current.toLocaleString()}
                  </p>
                  <span
                    className={`text-sm md:text-base font-semibold text-red-500 ml-4`}
                  >
                    {stats.totalRevenue.growthPercentage > 0 ? "▲" : "▼"}{" "}
                    {stats.totalRevenue.growthPercentage}%
                  </span>
                </div>
              </div>
            </div>

            {/* Total Hours */}
            <div className="flex items-center space-x-6 px-6 py-4 bg-wwpopdiv shadow-lg">
              <div className="flex-shrink-0 p-3">
                <FaClock size={24} className="text-red-500" />
              </div>
              <div className="flex-1 flex flex-col">
                <h2 className="text-base md:text-xl font-semibold text-wwsecondarytext">
                  Total Hours
                </h2>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xl md:text-2xl font-semibold text-wwtext">
                    {stats.totalHours.current} hr
                  </p>
                  <span
                    className={`text-sm md:text-base font-semibold text-red-500 ml-4`}
                  >
                    {stats.totalHours.growthPercentage > 0 ? "▲" : "▼"}{" "}
                    {stats.totalHours.growthPercentage}%
                  </span>
                </div>
              </div>
            </div>

            {/* Total Users */}
            <div className="flex items-center space-x-6 px-6 py-4 bg-wwpopdiv shadow-lg">
              <div className="flex-shrink-0 p-3">
                <FaUser size={24} className="text-red-500" />
              </div>
              <div className="flex-1 flex flex-col">
                <h2 className="text-base md:text-xl font-semibold text-wwsecondarytext">
                  Total Users
                </h2>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xl md:text-2xl font-semibold text-wwtext">
                    {stats.totalUniqueUsers.current}
                  </p>
                  <span
                    className={`text-sm md:text-base font-semibold text-red-500 ml-4`}
                  >
                    {stats.totalUniqueUsers.growthPercentage > 0 ? "▲" : "▼"}{" "}
                    {stats.totalUniqueUsers.growthPercentage}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* extends session requests table with buttons to approve or deny */}
        <div className="extends">
          {/* <TableComponent /> */}
          {extensionRequests.length > 0 &&
            renderTableWithPagination(
              extensionWithPagination,
              removeUnwantedFromPastbookings,
              "Extension Requests"
            )}
        </div>

        {/* upcoming bookings */}
        <div className="upcoming">
          {upcomingBookings.length > 0 &&
            renderTableWithPagination(
              upcomingBookingsWithPagination,
              removeUnwantedFromUpcomingbookings,
              "Upcoming Bookings"
            )}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
