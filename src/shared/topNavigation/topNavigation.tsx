import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Logo from '../logo';
import { getItemFromCookies } from '../utils';

const TopNavBar = (): React.ReactElement => {
  const patientId = sessionStorage.getItem('patientid')
  const [menuOpen, setMenuOpen] = useState(false);
  const { cookieUserId } = getItemFromCookies();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-gray-50 shadow-xs fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-white">
          <Logo navigatePath={`/dashboard/${cookieUserId}/${patientId}`} />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to={`/dashboard/${cookieUserId}/${patientId}`} className="text-sky-600 hover:text-sky-700 font-bold">Dashboard</Link>
          <Link to={`/lab-data/${cookieUserId}/${patientId}`} className="text-sky-600 hover:text-sky-700 font-bold">Lab Data</Link>
          <Link to={`/list-patients/${cookieUserId}`} className="text-sky-600 hover:text-sky-700 font-bold">List Patient</Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-sky-700 focus:outline-none">
            {menuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 text-white shadow">
          <Link to={`/dashboard/${cookieUserId}/${patientId}`} onClick={toggleMenu} className="block text-sky-600 hover:text-sky-700">Dashboard</Link>
          <Link to={`/lab-data/${cookieUserId}/${patientId}`} onClick={toggleMenu} className="block text-sky-600 hover:text-sky-700">Lab Data</Link>
          <Link to={`/list-patients/${cookieUserId}`} onClick={toggleMenu} className="block text-sky-600 hover:text-sky-700">List Patient</Link>
        </div>
      )}
    </nav>
  );
};

export default TopNavBar;
