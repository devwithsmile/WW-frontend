/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import Carousel from '../../components/GymDetails/Carousel';
import { FaArrowLeft, FaArrowRight, FaCheck, FaTimes } from 'react-icons/fa';
import moment from 'moment';

const GymDetails = ({ gym, handlePrev, handleNext, handleApprove, handleDeny, page, totalPages }) => {
    return (
        <div className="flex flex-col p-6 text-gray-200 bg-black border rounded-lg shadow-md gym-details lg:flex-row">
            {gym.images && gym.images.length > 0 && (
                <div className="mb-4 lg:mb-0 lg:mr-6 lg:w-96">
                    <Carousel images={gym.images} />
                </div>
            )}

            <div className="flex-1">
                <div className="flex justify-between">
                    <h2 className="mb-4 text-3xl font-bold text-gray-100">{gym.gym_name}</h2>
                    <span className="self-center hidden text-sm text-gray-500 md:!block">
                        {page}/{totalPages}
                    </span>
                </div>

                <p className="mb-4">
                    <strong className="text-gray-300">Description:</strong>
                    <span className="text-gray-400"> {gym.description}</span>
                </p>
                <hr className="my-6 border-gray-600" />

                <div className="flex flex-col my-4 lg:flex-row">
                    <div className="mb-4 lg:w-1/2 lg:mb-0">
                        <h4 className="font-semibold text-gray-300">Address:</h4>
                        <p className="text-gray-400">{gym.address.address_line_1}</p>
                        <p className="text-gray-400">{gym.address.address_line_2}</p>
                        <p className="text-gray-400">{gym.address.city}, {gym.address.state} - {gym.address.pincode}</p>
                    </div>
                    <div className="lg:w-1/2">
                        <h4 className="font-semibold text-gray-300">Coordinates:</h4>
                        <p className="text-gray-400">Latitude: {gym.map_detail.coordinates[1]}</p>
                        <p className="text-gray-400">Longitude: {gym.map_detail.coordinates[0]}</p>
                    </div>
                </div>
                <hr className="my-6 border-gray-600" />

                <div className="flex flex-col md:flex-row">
                    <div className="mb-4 md:mb-0">
                        <p><strong className="text-gray-300">GST:</strong> <span className="text-gray-400">{gym.gst_number}</span></p>
                        <p><strong className="text-gray-300">Occupancy:</strong> <span className="text-gray-400">{gym.total_occupancy}</span></p>
                    </div>
                    <hr className="my-6 md:hidden" />
                    <div className="md:ml-48">
                        <p><strong className="text-gray-300">Status:</strong> <span className="text-gray-400">{gym.status}</span></p>
                        <p><strong className="text-gray-300">Request Date:</strong> <span className="text-gray-400">{moment(gym.req_creation_Date).format('D MMMM YYYY')}</span></p>
                    </div>
                </div>
                <hr className="my-6 border-gray-600" />
                <div className='flex flex-col gap-10 md:gap-24 md:flex-row '>
                    <div>
                        <p><strong className="text-gray-300">Email:</strong> <span className="text-gray-400">{gym.owner_id.email}</span></p>
                        <p><strong className="text-gray-300">Phone Number:</strong> <span className="text-gray-400">{gym.owner_id.phone_number}</span></p>
                    </div>
                    <div>
                        <p><strong className="text-gray-300">Upi:</strong> <span className="text-gray-400">{gym.owner_id.upi_id}</span></p>

                    </div>
                </div>
                <hr className="my-6 border-gray-600" />

                <div className="flex flex-col items-center justify-between mt-6 space-y-4 lg:flex-row lg:space-y-0">
                    {/* Left side: Prev and Next buttons */}
                    <div className="flex justify-start space-x-4 lg:w-1/2">
                        <button onClick={handlePrev} className="flex items-center px-4 py-2 text-white bg-blue-500 rounded">
                            <FaArrowLeft className="mr-2" /> Prev
                        </button>
                        <button onClick={handleNext} className="flex items-center px-4 py-2 text-white bg-blue-500 rounded">
                            Next <FaArrowRight className="ml-2" />
                        </button>
                    </div>

                    {/* Right side: Approve and Deny buttons */}
                    <div className="flex justify-end space-x-4 lg:w-1/2">
                        <button onClick={handleApprove} className="flex items-center px-4 py-2 text-white bg-green-500 rounded">
                            <FaCheck className="mr-2" /> Approve
                        </button>
                        <button onClick={handleDeny} className="flex items-center px-4 py-2 text-white bg-red-500 rounded">
                            <FaTimes className="mr-2" /> Deny
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

function AdminPage() {
    const [gym, setGym] = useState(null);
    const [pageNo, setPageNo] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Assuming you get the total number of pages from the API

    const fetchGymData = async (page) => {
        try {
            const response = await api.get(`gyms/admin/pending?limit=1&page=${page}`);

            setGym(response.data.data[0]);
            setTotalPages(response.data.pagination.totalPages); // Set the total number of pages from the response
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchGymData(pageNo);
    }, [pageNo]);

    const handlePrev = () => {
        if (pageNo > 1) {
            setPageNo(prev => prev - 1);
        }
    };

    const handleNext = () => {
        if (pageNo < totalPages) {
            setPageNo(prev => prev + 1);
        }
    };

    const handleApprove = async () => {
        try {
            const response = await api.patch(`gyms/${gym._id}/response`, { "status": "approve" });
            console.log(response);

            alert('Gym approved successfully.');
            fetchGymData(pageNo);
        } catch (error) {
            console.error('Error approving gym:', error);
        }
    };

    const handleDeny = async () => {
        try {
            const response = await api.patch(`gyms/${gym._id}/response`, { "status": "reject" });
            console.log(response);
            alert('Gym denied successfully.');
            fetchGymData(pageNo);
        } catch (error) {
            console.error('Error denying gym:', error);
        }
    };

    return (
        <div className="container p-4 mx-auto admin-page">
            {gym ? (
                <GymDetails
                    gym={gym}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    handleApprove={handleApprove}
                    handleDeny={handleDeny}
                    page={pageNo}
                    totalPages={totalPages}
                />
            ) : (
                <p>Loading gym data...</p>
            )}
        </div>
    );
}


export default AdminPage;