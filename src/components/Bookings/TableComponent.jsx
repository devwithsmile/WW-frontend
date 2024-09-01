/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import TableComponentSkeleton from "../Skeletons/TableComponentSkeleton";
import { FaCheck } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";

/* pass any number of headers , it will turn into that no. of headers
eg : 
<TableComponent
columns={headers.length}
headers={headers}
data={data}
actions={{ onApprove, onReject }}
/> */

const TableComponent = ({ columns, data, headers, actions }) => {

  // Prepare table headers for display
  const displayHeaders = headers.filter((header) => header !== "_id"); // Remove _id for display

  // Prepare table data for display
  const displayData = data.map(({ _id, ...rest }) => rest); // Remove _id and rating for display



  return (
    <>
      <div className="overflow-auto bg-wwpopdiv">
        <table className="min-w-full divide-y divide-red-700">
          <thead className="bg-wwbg">
            <tr>
              {displayHeaders.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-wwtext"
                >
                  {header}
                </th>
              ))}
              {actions && (
                <th className="px-6 py-3 text-xs font-medium text-left uppercase text-wwtext">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-700">
            {displayData.length === 0 ? (
              <tr>
                <td colSpan={columns} className="px-6 py-4 text-center">
                  No data available
                </td>
              </tr>
            ) : (
              displayData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-6 py-4 text-sm font-medium text-wwtext whitespace-nowrap"
                    >
                      {cell}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-4 space-x-5 text-sm font-medium whitespace-nowrap">
                      <button
                        onClick={() => actions.onApprove(data[rowIndex])}
                        className="mr-2 text-wwred hover:text-red-500"
                      >
                        <FaCheck size={16} />
                      </button>
                      <button
                        onClick={() => actions.onReject(data[rowIndex])}
                        className="text-wwred hover:text-red-500"
                      >
                        <IoMdCloseCircleOutline size={20} />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </>
  );
};

export default TableComponent;
