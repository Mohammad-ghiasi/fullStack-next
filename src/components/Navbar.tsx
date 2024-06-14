// components/Navbar.js
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Dashboard</div>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-300 hover:text-white">Team</a>
          <a href="#" className="text-gray-300 hover:text-white">Projects</a>
          <a href="#" className="text-gray-300 hover:text-white">Calendar</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
