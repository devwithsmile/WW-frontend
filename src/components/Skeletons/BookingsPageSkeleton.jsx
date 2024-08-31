import React from 'react'
import TodaysBookingSkeleton from './TodaysBookingSkeleton'
import TableComponentSkeleton from './TableComponentSkeleton'

function BookingsPageSkeleton() {
    return (
        <div>
            <TodaysBookingSkeleton />
            <TableComponentSkeleton  />
            <TableComponentSkeleton  />
        </div>
    )
}

export default BookingsPageSkeleton
