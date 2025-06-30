import React from "react"
import { Link } from 'react-router-dom';
import { FaHeartbeat } from 'react-icons/fa';

const LandingPage = (): React.ReactElement => {
  return (
    <div className="min-h-screen bg-gradient-to-tl from-blue-50 via-blue-100 to-teal-200 flex items-center justify-center px-6 py-12">
      <div className="max-w-3xl text-center animate-fade-in">
        <div className="flex justify-center items-center mb-4">
          <FaHeartbeat className="text-4xl text-red-400 animate-pulse" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Welcome to <span className="text-teal-500">MEDICare</span>
        </h1>
        <p className="text-gray-600 md:text-lg">
          Your trusted digital companion for <span className="font-medium text-teal-500">health monitoring</span>,
          medical records, and daily wellness.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/sign-in">
            <button className="cursor-pointer px-8 py-3 bg-teal-600 text-white rounded-2xl font-semibold shadow-lg hover:bg-teal-700 transition duration-100">
              Sign In
            </button>
          </Link>
          <Link to="/sign-up">
            <button className="cursor-pointer px-8 py-3 border-2 border-teal-600 text-teal-600 rounded-2xl font-semibold hover:bg-teal-50 transition duration-100">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
