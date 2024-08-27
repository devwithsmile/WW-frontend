import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ApprovalStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { status } = useAuth();
  const { reason } = location.state || {
    reason: "Your gym registration is still under review.",
  };

  useEffect(() => {
    if (status === "active") {
      // Redirect to the dashboard if the user is active
      navigate("/owners/dashboard");
    }
  }, [status, navigate]);

  if (status === "inactive") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-wwbg">
        <h1 className="text-3xl font-bold mb-4 text-red-500">
          Approval Status
        </h1>
        <p className="text-xl mb-4">Status: Pending</p>
        <p className="text-lg text-gray-600 mt-4">{reason}</p>
      </div>
    );
  }

  if (status === "rejected") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-wwbg">
        <h1 className="text-3xl font-bold mb-4 text-red-500">
          Approval Status
        </h1>
        <p className="text-xl mb-4">Status: Denied</p>
        {/* TODO: Yet to setup a page for denied form */}
        <button
          onClick={() => navigate("/#")}
          className="px-6 py-3 text-white bg-red-500 border border-red-500 rounded-lg shadow-md hover:bg-red-600 transition-colors"
        >
          Refill the form
        </button>
      </div>
    );
  }

  // Default case for unknown status
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-wwbg">
      <h1 className="text-3xl font-bold mb-4 text-gray-500">Approval Status</h1>
      <p className="text-lg text-gray-600">Loading status...</p>
    </div>
  );
};

export default ApprovalStatus;
