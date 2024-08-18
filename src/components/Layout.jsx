// Layout.jsx
import React from 'react'
import { useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import PropTypes from 'prop-types'
import Navbar from './Navbar'
import Footer from './Footer'
import 'react-toastify/dist/ReactToastify.css'

// Layout component that conditionally renders Navbar and Footer
const Layout = ({ children }) => {
  // Get the current path from the URL
  const location = useLocation()

  // Determine if the current path is for authentication pages
  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/register'

  return (
    <>
      {/* Toastify Notification */}
      <ToastContainer
        position='top-center'
        autoClose={4500}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
        transition:Bounce
        toastStyle={{ borderRadius: 0 }}
      />

      {/* Render Navbar only if not on authentication pages */}
      {!isAuthPage && <Navbar />}

      {/* Render the children components, which are the main routes */}
      {children}

      {/* Render Footer only if not on authentication pages */}
      {!isAuthPage && <Footer />}
    </>
  )
}

export default Layout

Layout.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children is a valid React node
}
