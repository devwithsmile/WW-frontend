// TableComponentSkeleton.js
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const TableComponentSkeleton = ({  rows = 3, columns = 5, }) => {
  return (
    <div className="overflow-auto bg-wwpopdiv">
      <table className="min-w-full divide-y divide-red-700">
        <thead className="bg-wwbg">
          <tr>
            {Array(columns)
              .fill()
              .map((_, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-wwtext"
                >
                  <Skeleton
                    baseColor="#171717"
                    highlightColor="#2e2727"
                    width={300}
                    height={20}
                  />
                </th>
              ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-700">
          {Array(rows)
            .fill()
            .map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array(columns)
                  .fill()
                  .map((_, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-6 py-4 text-sm font-medium text-wwtext whitespace-nowrap "
                    >
                      <Skeleton
                        baseColor="#171717"
                        highlightColor="#2e2727"
                        width={120}
                        height={20}
                      />
                    </td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponentSkeleton;