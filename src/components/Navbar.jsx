import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import { GiLibertyWing } from 'react-icons/gi';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header border-b-2 border-b-red-700">
      <nav className="navbar">
        <span id='logo'>

          <Link to="/" className="logo flex items-center">
            <span className="text-red-700 raleway">Workout</span>
            <GiLibertyWing className="text-slate-50 inline pl-1" size={20} />
          </Link>
        </span>

        <span id='hamburger'>
          <div className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <FaTimes size={30} className="text-red-700" /> : <FaBars size={30} className="text-red-700" />}
          </div>
        </span>

   

          {/* Desktop Menu */}
          <ul className="md:flex space-x-4 nav-menu">
            
            <li className="nav-item">
              <NavLink to="/" exact activeClassName="text-red-500" onClick={closeMenu}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/search" activeClassName="text-red-500" onClick={closeMenu}>SearchGYM</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/bookings" activeClassName="text-red-500" onClick={closeMenu}>Bookings</NavLink>
            </li>
            
          
            <li className="nav-item">
              <Link to="/login" className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded" onClick={closeMenu}>Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="bg-red-700 hover:bg-red-800 text-slate-100 font-semibold py-2 px-4 border border-red-300 rounded shadow" onClick={closeMenu}>Register</Link>
            </li>
          </ul>

     

   

          {/* Mobile Menu */}
          <ul className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-800 transition-transform transform ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} nav-menu`}>
            <li className="nav-item">
              <NavLink to="/" exact activeClassName="text-red-500" onClick={closeMenu}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/search" activeClassName="text-red-500" onClick={closeMenu}>SearchGYM</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/bookings" activeClassName="text-red-500" onClick={closeMenu}>Bookings</NavLink>
            </li>
            <li className="nav-item">
              <Link to="/login" className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded" onClick={closeMenu}>Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="bg-red-700 hover:bg-red-800 text-slate-100 font-semibold py-2 px-4 border border-slate-300 rounded shadow" onClick={closeMenu}>Register</Link>
            </li>
            <button className="absolute top-4 right-4 text-white" onClick={closeMenu}>
              <FaTimes size={30} />
            </button>
          </ul>
      

      </nav>
    </header>
  );
};

export default Navbar;