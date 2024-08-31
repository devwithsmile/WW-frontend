import React, { useState, useEffect } from "react";
import { FaChartBar, FaDollarSign, FaClock, FaUser } from "react-icons/fa";
import api from "../../api/axios";
import TableComponent from "../../components/Bookings/TableComponent";
import { usePagination } from "pagination-react-js";
import StatsSkeleton from "../../components/Skeletons/StasSkeleton";
import { useDispatch, useSelector } from "react-redux";
import {
  setStatsLoadingFalse,
  setStatsLoadingTrue,
} from "../../redux/statsSlice";
import {
  setTableCompLoadingFalse,
  setTableCompLoadingTrue,
} from "../../redux/tableCompSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: { current: 0, growthPercentage: 0 },
    totalRevenue: { current: 0, growthPercentage: 0 },
    totalHours: { current: 0, growthPercentage: 0 },
    totalUniqueUsers: { current: 0, growthPercentage: 0 },
  });
  const [extensionRequests, setExtensionRequests] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useAuth();

  const statsLoading = useSelector(
    (state) => state.isOwnerDashboardLoading.stats.loading
  );
  const tableLoading = useSelector(
    (state) => state.isOwnerDashboardLoading.tableComp.loading
  );

  const loading = statsLoading || tableLoading;

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

  // Fetch stats and booking details for the owner
  useEffect(() => {
    const fetchDashboard = async () => {
      dispatch(setStatsLoadingTrue());
      dispatch(setTableCompLoadingTrue());
      api
        .get("/gyms/owners/stats")
        .then((response) => {
          setStats(response.data);
        })
        .catch((error) => {
          console.error("Error fetching stats:", error);
        })
        .finally(dispatch(setStatsLoadingFalse()));

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
        })
        .finally(dispatch(setTableCompLoadingFalse()));
    };
    fetchDashboard();
  }, []);

  const handleApprove = async (request) => {
    try {
      console.log(request._id);
      console.log(request);
      await api.patch(`/bookings/extends`, {
        extensionId: request._id,
        status: "approved",
      });

      setExtensionRequests((prevRequests) =>
        prevRequests.filter((r) => r._id !== request._id)
      );
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const handleReject = async (request) => {
    try {
      await api.patch(`/bookings/extends`, {
        extensionId: request._id,
        status: "cancelled",
      });
      setExtensionRequests((prevRequests) =>
        prevRequests.filter((r) => r._id !== request._id)
      );
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

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

  const renderTableWithPagination = (pagination, data, title, actions) => {
    const { records, pageNumbers, setActivePage } = pagination;
    const paginatedData = data.slice(
      records.indexOfFirst,
      records.indexOfLast + 1
    );

    return (
      <section>
        <h3 className="mb-4 text-lg font-bold">{title}</h3>
        <TableComponent
          columns={Object.keys(data[0] || {}).length + 1} // +1 for actions column
          headers={[...Object.keys(data[0] || {})]}
          data={paginatedData}
          actions={actions}
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

  // Remove id from future bookings
  const removeUnwantedFromPastbookings = extensionRequests.map(
    ({ _id, ...extensionRequests }) => extensionRequests
  );

  // Remove id from future bookings
  const removeUnwantedFromUpcomingbookings = upcomingBookings.map(
    ({ booking_id, ...upcomingBookings }) => upcomingBookings
  );

  return (
    <div>
      <div className="px-4 py-8 space-y-6">
        {/* Stats */}
        {loading ? (
          <StatsSkeleton />
        ) : (
          <section>
            <h3 className="mb-4 text-lg font-bold">Stats</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Total Bookings */}
              <div className="flex items-center px-6 py-4 space-x-6 shadow-lg bg-wwpopdiv">
                <div className="flex-shrink-0 p-3">
                  <FaChartBar size={24} className="text-red-500" />
                </div>
                <div className="flex flex-col flex-1">
                  <h2 className="text-base font-semibold md:text-xl text-wwsecondarytext">
                    Total Bookings
                  </h2>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xl font-semibold md:text-2xl text-wwtext">
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
              <div className="flex items-center px-6 py-4 space-x-6 shadow-lg bg-wwpopdiv">
                <div className="flex-shrink-0 p-3">
                  <FaDollarSign size={24} className="text-red-500" />
                </div>
                <div className="flex flex-col flex-1">
                  <h2 className="text-base font-semibold md:text-xl text-wwsecondarytext">
                    Total Revenue
                  </h2>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xl font-semibold md:text-2xl text-wwtext">
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
              <div className="flex items-center px-6 py-4 space-x-6 shadow-lg bg-wwpopdiv">
                <div className="flex-shrink-0 p-3">
                  <FaClock size={24} className="text-red-500" />
                </div>
                <div className="flex flex-col flex-1">
                  <h2 className="text-base font-semibold md:text-xl text-wwsecondarytext">
                    Total Hours
                  </h2>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xl font-semibold md:text-2xl text-wwtext">
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
              <div className="flex items-center px-6 py-4 space-x-6 shadow-lg bg-wwpopdiv">
                <div className="flex-shrink-0 p-3">
                  <FaUser size={24} className="text-red-500" />
                </div>
                <div className="flex flex-col flex-1">
                  <h2 className="text-base font-semibold md:text-xl text-wwsecondarytext">
                    Total Users
                  </h2>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xl font-semibold md:text-2xl text-wwtext">
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
        )}

        {extensionRequests.length === 0 && (
          <div className="flex items-center justify-center w-full p-6 mb-6 text-center shadow-lg min-h-64 bg-wwpopdiv">
            <p className="text-lg text-wwtext">No Extension request to show</p>
          </div>
        )}

        {/* extends session requests table with buttons to approve or deny */}
        <div className="extends">
          {/* <TableComponent /> */}
          {extensionRequests.length > 0 &&
            renderTableWithPagination(
              extensionWithPagination,
              extensionRequests,
              "Extension Requests",
              { onApprove: handleApprove, onReject: handleReject }
            )}
        </div>

        {upcomingBookings.length === 0 && (
          <div className="flex items-center justify-center w-full p-6 mb-6 text-center shadow-lg min-h-64 bg-wwpopdiv">
            <p className="text-lg text-wwtext">No Upcoming bookings to show</p>
          </div>
        )}

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

export default Dashboard;
