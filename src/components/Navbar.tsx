// components/Navbar.js
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Dashboard</div>
        <div className="flex space-x-4">
          <Link href="/auth/register">register</Link>
          <Link href="/auth/login">login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
