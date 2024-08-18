import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import api from '../../api/axios.js'
import { usePagination } from 'pagination-react-js'
import TableComponent from '../../components/Bookings/TableComponent.jsx'
import TodaysBookingSection from '../../components/Bookings/TodaysBookingSection.jsx'
import moment from 'moment'

function Bookings() {
  const [todayBookings, setTodayBookings] = useState([])
  const [pastBookings, setPastBookings] = useState([])
  const [futureBookings, setFutureBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { isAuthenticated } = useAuth()

  const todayPagination = usePagination({
    activePage: 1,
    recordsPerPage: 5,
    totalRecordsLength: todayBookings.length,
    navCustomPageSteps: { prev: 1, next: 1 },
    offset: 2,
    permanentFirstNumber: true,
    permanentLastNumber: true,
  })

  const pastPagination = usePagination({
    activePage: 1,
    recordsPerPage: 5,
    totalRecordsLength: pastBookings.length,
    navCustomPageSteps: { prev: 1, next: 1 },
    offset: 2,
    permanentFirstNumber: true,
    permanentLastNumber: true,
  })

  const futurePagination = usePagination({
    activePage: 1,
    recordsPerPage: 5,
    totalRecordsLength: futureBookings.length,
    navCustomPageSteps: { prev: 1, next: 1 },
    offset: 2,
    permanentFirstNumber: true,
    permanentLastNumber: true,
  })

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get(`/users/bookings`)

        const bookings = response.data.bookingsWithGymName

        console.log(response)

        if (bookings.length > 0) {
          const today = new Date()
          today.setHours(0, 0, 0, 0) // Set today's time to 00:00:00 for accurate comparison

          const todayBookings = bookings.filter((booking) => {
            const bookingDate = moment(booking.date, 'DD/MM/YYYY').startOf(
              'day'
            )
            return bookingDate.isSame(today, 'day')
          })

          const dataToPass = todayBookings[0]
          console.log(dataToPass)

          const pastBookings = bookings.filter((booking) => {
            const bookingDate = moment(booking.date, 'DD/MM/YYYY').startOf(
              'day'
            )
            return bookingDate.isBefore(today, 'day')
          })

          const futureBookings = bookings.filter((booking) => {
            const bookingDate = moment(booking.date, 'DD/MM/YYYY').startOf(
              'day'
            )
            return bookingDate.isAfter(today, 'day')
          })

          setTodayBookings(todayBookings)
          setPastBookings(pastBookings)
          setFutureBookings(futureBookings)
        } else {
          setError('No bookings found.')
        }
      } catch (err) {
        setError('Failed to fetch bookings.')
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [isAuthenticated])

  // Remove ratings from future bookings
  const removeRatingsForFutureBookings = futureBookings.map(
    ({ ratings, ...booking }) => booking
  )

  const renderTableWithPagination = (pagination, data, title) => {
    const { records, pageNumbers, setActivePage } = pagination

    return (
      <div className='mb-8'>
        <h3 className='mb-4 text-lg font-bold'>{title}</h3>
        <TableComponent
          columns={Object.keys(data[0] || {}).length}
          headers={Object.keys(data[0] || {})}
          data={data.slice(records.indexOfFirst, records.indexOfLast + 1)}
        />
        <nav role='navigation' aria-label='Pagination Navigation'>
          <ul className='flex justify-center gap-4 mt-4 pagination sm:gap-8'>
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
                  number === pageNumbers.activePage ? 'active' : ''
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
    )
  }

  return (
    <div className='p-6'>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <TodaysBookingSection todayBookings={todayBookings} />
          {/* {todayBookings.length > 0 &&
            renderTableWithPagination(
              todayPagination,
              todayBookings,
              "Today's Bookings"
            )} */}
          {pastBookings.length > 0 &&
            renderTableWithPagination(
              pastPagination,
              pastBookings,
              'Past Bookings'
            )}
          {futureBookings.length > 0 &&
            renderTableWithPagination(
              futurePagination,
              removeRatingsForFutureBookings,
              'Future Bookings'
            )}
        </>
      )}
    </div>
  )
}

export default Bookings
