import React from "react";

const NotAuthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center p-6 bg-wwpopdiv shadow-lg max-w-md w-full mx-3">
        <h1 className="text-3xl font-bold text-wwTitleRed mb-4">
          Access Denied
        </h1>
        <p className="text-lg text-wwtext mb-6">
          You do not have permission to access this page. Please contact your
          administrator if you believe this is an error.
        </p>
      </div>
    </div>
  );
};

export default NotAuthorized;
