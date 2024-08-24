import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ApprovalStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { reason, isActive } = location.state || {};

  useEffect(() => {
    if (isActive) {
      navigate("/owners/dashboard"); // Redirect to the dashboard page
    }
  }, [isActive, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-wwbg">
      <h1 className="text-3xl font-bold mb-4 text-red-500">Approval Status</h1>
      {reason ? (
        <div className="text-center">
          <p className="text-xl mb-4">
            Status: {reason === "denied" ? "Denied" : "Pending"}
          </p>
          {reason === "denied" && (
            <div className="mt-6">
              <p className="text-lg text-red-500 mb-4">Reason: {reason}</p>
              <button
                onClick={() => navigate("/contact-us")}
                className="px-6 py-3 text-white bg-red-500 border border-red-500 rounded-lg shadow-md hover:bg-red-600 transition-colors"
              >
                Contact Us
              </button>
            </div>
          )}
          {reason !== "denied" && (
            <p className="text-lg text-gray-600 mt-4">
              Please wait while we review your information.
            </p>
          )}
        </div>
      ) : (
        <p className="text-lg text-gray-600">Loading status...</p>
      )}
    </div>
  );
};

export default ApprovalStatus;
