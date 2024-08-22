import React, { useState, useEffect } from 'react';
import { FaChartBar, FaDollarSign, FaClock, FaUser } from 'react-icons/fa';
import api from '../../api/axios';
import TableComponent from '../../components/Bookings/TableComponent';
import { usePagination } from 'pagination-react-js';

const OwnerDashboard = () => {
    const [stats, setStats] = useState({
        totalBookings: { current: 0, growthPercentage: 0 },
        totalRevenue: { current: 0, growthPercentage: 0 },
        totalHours: { current: 0, growthPercentage: 0 },
        totalUniqueUsers: { current: 0, growthPercentage: 0 }
    });

    const [extensionRequests, setExtensionRequests] = useState([])
    const [upcomingBookings, setUpcomingBookings] = useState([])

    useEffect(() => {
        api.get('/gyms/owners/stats')
            .then(response => {
                setStats(response.data);
            })
            .catch(error => {
                console.error('Error fetching stats:', error);
            });

        api.get('/gyms/extensions')
            .then(res => {
                setExtensionRequests(res.data.extensionRequests);
            })
            .catch(error => {
                console.error('Error fetching stats:', error);
            });

            api.get('/gyms/bookings/upcoming')
            .then(res => {                
                setUpcomingBookings(res.data.bookings);
            })
            .catch(error => {
                console.error('Error fetching stats:', error);
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
                                className={`pagination-item ${number === pageNumbers.activePage ? "active" : ""
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
            {/* stats */}
            <div className='px-4 py-8'>
                <div className='mx-auto max-w-7xl'>
                    <h1 className='mb-8 text-3xl font-bold text-center'>Owner Dashboard</h1>
                    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
                        <div className='flex items-center p-1 space-x-4 rounded-lg shadow-lg md:p-6 bg-wwpopdiv'>
                            <div className='flex-shrink-0 text-blue-500'>
                                <FaChartBar size={24} />
                            </div>
                            <div>
                                <h2 className='text-xl font-semibold'>Total Bookings</h2>
                                <p className='text-wwtext'>Current: {stats.totalBookings.current}</p>
                                <p className='text-wwsecondarytext'>Growth: {stats.totalBookings.growthPercentage}%</p>
                            </div>
                        </div>
                        <div className='flex items-center p-1 space-x-4 rounded-lg shadow-lg md:p-6 bg-wwpopdiv'>
                            <div className='flex-shrink-0 text-green-500'>
                                <FaDollarSign size={24} />
                            </div>
                            <div>
                                <h2 className='text-xl font-semibold'>Total Revenue</h2>
                                <p className='text-wwtext'>Current: ${stats.totalRevenue.current.toLocaleString()}</p>
                                <p className='text-wwsecondarytext'>Growth: {stats.totalRevenue.growthPercentage}%</p>
                            </div>
                        </div>
                        <div className='flex items-center p-1 space-x-4 rounded-lg shadow-lg md:p-6 bg-wwpopdiv'>
                            <div className='flex-shrink-0 text-yellow-500'>
                                <FaClock size={24} />
                            </div>
                            <div>
                                <h2 className='text-xl font-semibold'>Total Hours</h2>
                                <p className='text-wwtext'>Current: {stats.totalHours.current} hrs</p>
                                <p className='text-wwsecondarytext'>Growth: {stats.totalHours.growthPercentage}%</p>
                            </div>
                        </div>
                        <div className='flex items-center p-1 space-x-4 rounded-lg shadow-lg md:p-6 bg-wwpopdiv'>
                            <div className='flex-shrink-0 text-red-500'>
                                <FaUser size={24} />
                            </div>
                            <div>
                                <h2 className='text-xl font-semibold'>Total Unique Users</h2>
                                <p className='text-wwtext'>Current: {stats.totalUniqueUsers.current}</p>
                                <p className='text-wwsecondarytext'>Growth: {stats.totalUniqueUsers.growthPercentage}%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* extends session requests table with buttons to approve or deny */}
            <div className='extends'>
                {/* <TableComponent /> */}

                {extensionRequests.length > 0 &&
                    renderTableWithPagination(
                        extensionWithPagination,
                        removeUnwantedFromPastbookings,
                        "Extension Requests"
                    )}
            </div>


            {/* upcoming bookings */}
             <div className='upcoming'>
              

                {upcomingBookings.length > 0 &&
                    renderTableWithPagination(
                        upcomingBookingsWithPagination,
                        removeUnwantedFromUpcomingbookings,
                        "Upcoming Bookings"
                    )}
            </div>


        </div>

    );
};

export default OwnerDashboard;