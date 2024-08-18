import './App.css'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/routes/PrivateRoute'
import PublicRoute from './components/routes/PublicRoute'
import Layout from './components/Layout'
import LandingPage from './Pages/GymUserPages/LandingPage'
import Home from './Pages/GymUserPages/Home'
import SearchPage from './Pages/GymUserPages/SearchPage'
import Bookings from './Pages/GymUserPages/Bookings'
import Login from './Pages/GymUserPages/Login'
import Register from './Pages/GymUserPages/Register'
import GymDetails from './Pages/GymUserPages/GymDetails'
import PageNotFound from './Pages/Error/PageNotFound'
import Profile from './Pages/GymUserPages/Profile'
import OwnerSignup from './Pages/GymOwnerPages/OwnerSignup'
import OwnerLogin from './Pages/GymOwnerPages/OwnerLogin'
import GymForm from './Pages/GymOwnerPages/GymForm'
import ForgotPasswordForm from './Pages/ResetPassword/ForgotPassword'
import ResetPassword from './Pages/ResetPassword/ResetPassword'

// Main application component
function App() {
  return (
    <Routes>
      <Route
        path='*'
        element={
          <Layout>
            <Routes>
              {/* User's Routes */}
              <Route
                path='/'
                element={<PublicRoute element={<LandingPage />} />}
              />
              <Route path='/home' element={<PrivateRoute element={<Home />} />}/>
              <Route path='/search' element={<SearchPage />} />
              <Route path='/bookings' element={<PrivateRoute element={<Bookings />} />}/>
              <Route
                path='/login'
                element={<PublicRoute element={<Login />} />}
              />
              <Route
                path='/register'
                element={<PublicRoute element={<Register />} />}
              />
              <Route path='/gymDetails/:id' element={<GymDetails />} />
              <Route
                path='/users'
                element={<PrivateRoute element={<Profile />} />}
              />
              {/* Reset/Forgot Password */}
              <Route path='/forgotpassword' element={<ForgotPasswordForm />} />
              <Route path='/resetpassword' element={<ResetPassword />} />
              {/* Owner's Routes */}
              <Route
                path='/owners/register'
                element={<PublicRoute element={<OwnerSignup />} />}
              />
              <Route
                path='/owners/login'
                element={<PublicRoute element={<OwnerLogin />} />}
              />
              <Route path='/owners/gymForm' element={<GymForm />} />
              {/* Error Routes */}
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  )
}

export default App
