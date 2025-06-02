import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between h-12">
          <div className="flex items-center">
            <Link to="/" className="text-sm font-medium text-gray-800">
              CyberTools
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={`px-3 py-1 rounded text-sm transition-colors ${
                location.pathname === "/"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Tools
            </Link>
            <Link
              to="/search"
              className={`px-3 py-1 rounded text-sm transition-colors ${
                location.pathname === "/search"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Topics
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;