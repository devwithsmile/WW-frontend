import React, { lazy, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const CheckoutCard = lazy(() => import("../../components/CheckoutCard.jsx"));

const Payment = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to /bookings after 3 seconds
    const timer = setTimeout(() => {
      navigate("/bookings");
    }, 3000);

    // Clean up the timer if the component unmounts before the 3 seconds
    return () => clearTimeout(timer);
  }, [navigate]);

  return <CheckoutCard />;
};

export default Payment;
