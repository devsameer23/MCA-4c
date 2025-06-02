import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-12">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-sm font-medium text-white">AI CyberSec</span>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className={`px-2 py-1 rounded text-sm transition-colors ${
                location.pathname === "/"
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              to="/search"
              className={`px-2 py-1 rounded text-sm transition-colors ${
                location.pathname === "/search"
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              Search
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;