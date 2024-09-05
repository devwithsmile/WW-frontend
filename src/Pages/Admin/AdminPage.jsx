/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import Carousel from '../../components/GymDetails/Carousel';
import { FaArrowLeft, FaArrowRight, FaCheck, FaTimes } from 'react-icons/fa';
import moment from 'moment';


const GymDetails = ({ gym, handlePrev, handleNext, handleApprove, handleDeny, page, totalPages }) => {
    return (
        <div className="flex flex-col p-8 bg-transparent rounded-lg shadow-lg gym-details lg:flex-row lg:space-x-6">
            <div className="mb-6 lg:w-1/3 lg:mb-0">
                {gym.images && gym.images.length > 0 && (
                    <div className="overflow-hidden rounded-lg shadow-md">
                        <Carousel images={gym.images} />
                    </div>
                )}
            </div>

            <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-4xl font-extrabold text-white">{gym.gym_name}</h2>
                    <span className="text-sm text-gray-400">
                        Page {page} of {totalPages}
                    </span>
                </div>

                <p className="mb-4 text-gray-300">
                    <strong>Description:</strong> <span className="text-gray-200">{gym.description}</span>
                </p>
                <hr className="my-6 border-gray-600" />

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div>
                        <h4 className="font-semibold text-gray-300">Address:</h4>
                        <p className="text-gray-200">{gym.address.address_line_1}</p>
                        <p className="text-gray-200">{gym.address.address_line_2}</p>
                        <p className="text-gray-200">
                            {gym.address.city}, {gym.address.state} - {gym.address.pincode}
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-300">Coordinates:</h4>
                        <p className="text-gray-200">Latitude: {gym.map_detail.coordinates[1]}</p>
                        <p className="text-gray-200">Longitude: {gym.map_detail.coordinates[0]}</p>
                    </div>
                </div>
                <hr className="my-6 border-gray-600" />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <p><strong className="text-gray-300">GST:</strong> <span className="text-gray-200">{gym.gst_number}</span></p>
                        <p><strong className="text-gray-300">Occupancy:</strong> <span className="text-gray-200">{gym.total_occupancy}</span></p>
                    </div>
                    <div>
                        <p><strong className="text-gray-300">Status:</strong> <span className="text-gray-200">{gym.status}</span></p>
                        <p><strong className="text-gray-300">Request Date:</strong> <span className="text-gray-200">{moment(gym.req_creation_Date).format('D MMMM YYYY')}</span></p>
                    </div>
                </div>

                <hr className="my-6 border-gray-600" />

                <div className="flex flex-col gap-6 md:flex-row">
                    <div className="flex-1">
                        <p><strong className="text-gray-300">Email:</strong> <span className="text-gray-200">{gym.owner_id.email}</span></p>
                        <p><strong className="text-gray-300">Phone Number:</strong> <span className="text-gray-200">{gym.owner_id.phone_number}</span></p>
                    </div>
                    <div className="flex-1">
                        <p><strong className="text-gray-300">UPI:</strong> <span className="text-gray-200">{gym.owner_id.upi_id}</span></p>
                    </div>
                </div>

                <hr className="my-6 border-gray-600" />

                {/* Reason Textarea */}
                <div className="mb-6">
                    <label className="block mb-2 text-gray-300" htmlFor="reason">Reason:</label>
                    <textarea
                        id="reason"
                        rows="4"
                        className="w-full p-3 text-gray-900 border "
                        placeholder="Enter your reason here..."
                    />
                </div>

                <div className="flex flex-col items-center justify-between mt-6 space-y-4 lg:flex-row lg:space-y-0">
                    {/* Left side: Prev and Next buttons */}
                    <div className="flex justify-start space-x-4 lg:w-1/2">
                        <button onClick={handlePrev} className="flex items-center px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-500">
                            <FaArrowLeft className="mr-2" /> Prev
                        </button>
                        <button onClick={handleNext} className="flex items-center px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-500">
                            Next <FaArrowRight className="ml-2" />
                        </button>
                    </div>

                    {/* Right side: Approve and Deny buttons */}
                    <div className="flex justify-end space-x-4 lg:w-1/2">
                        <button onClick={handleApprove} className="flex items-center px-4 py-2 text-white transition bg-green-600 rounded-lg hover:bg-green-500">
                            <FaCheck className="mr-2" /> Approve
                        </button>
                        <button onClick={handleDeny} className="flex items-center px-4 py-2 text-white transition bg-red-600 rounded-lg hover:bg-red-500">
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
    const [totalPages, setTotalPages] = useState(1); 

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