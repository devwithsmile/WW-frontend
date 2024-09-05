import React from "react";
import { FcGoogle } from "react-icons/fc"; // Ensure you have installed react-icons
import useGoogleAuth from "../hooks/useGoogleAuth"; // Adjust the path as needed

const GoogleLoginButton = ({ onSubmit }) => {
  const googleLogin = useGoogleAuth(onSubmit);

  return (
    <button
      className="w-full flex items-center justify-center bg-transparent py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-wwred focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 lg:w-full mb-2 text-center border border-wwred"
      onClick={() => googleLogin()}
    >
      <FcGoogle className="w-6 h-6 mr-2" alt="Google Logo" />
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;
