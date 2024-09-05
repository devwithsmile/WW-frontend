import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import App from "./App.jsx";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from "react-redux";
import { store } from './store.js'
import { GoogleOAuthProvider } from '@react-oauth/google';
import config from "./config.js";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Add your default query options here
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
      <GoogleOAuthProvider clientId= {config.GOOGLE_OUATH_CLIENT_ID}>
        <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
          </Provider>
        </QueryClientProvider>
        </GoogleOAuthProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
