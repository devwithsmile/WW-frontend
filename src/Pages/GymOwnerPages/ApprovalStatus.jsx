import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const ApprovalStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { status } = useAuth();
  const { reason } = location.state || {
    reason: "Your gym registration is still under review.",
  };

  // Checks Owners status and navigate them accordingly
  useEffect(() => {
    if (status === "active") {
      // Redirect to the dashboard if the user is active
      navigate("/owners/dashboard");
    } else if (status === "new") {
      // Redirect to the gymForm if the user is new
      navigate("/owners/gymForm");
      toast.error("Not allowed to view this form");
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
        <button
          onClick={() => navigate("/owners/resubmit")}
          className="w-full px-4 py-2 text-white bg-red-600 md:w-1/4 hover:bg-red-700"
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
