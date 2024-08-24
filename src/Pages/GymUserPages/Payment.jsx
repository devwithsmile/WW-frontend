import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutCard from "../../components/CheckoutCard";

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
