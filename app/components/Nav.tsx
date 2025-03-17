"use client";

import Link from "next/link";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <img
                src="/logo_skull.webp"
                alt="The John Connor Project"
                className="h-10 w-auto"
              />
            </Link>
          </div>
          {/* Desktop Menu */}
          <div className="hidden font-sans md:flex space-x-8">
            <Link
              href="/"
              className="block mt-4 md:mt-0 hover:text-red-500 transition duration-300"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block mt-4 md:mt-0 hover:text-red-500 transition duration-300"
            >
              About
            </Link>
            <Link
              href="/mission"
              className="block mt-4 md:mt-0 hover:text-red-500 transition duration-300"
            >
              Mission
            </Link>
            <Link
              href="/your-cloud"
              className="block mt-4 md:mt-0 hover:text-red-500 transition duration-300"
            >
              Not Your Photos
            </Link>
            <Link
              href="/protect-the-internet"
              className="block mt-4 md:mt-0 hover:text-red-500 transition duration-300"
            >
              Decentralized Internet
            </Link>
            <Link
              href="/your-stock-vote"
              className="block mt-4 md:mt-0 hover:text-red-500 transition duration-300"
            >
              Who Owns Your Stock Vote?
            </Link>
            <Link
              href="/directory"
              className="block mt-4 md:mt-0 hover:text-red-500 transition duration-300"
            >
              Directory
            </Link>
            <Link
              href="/get-involved"
              className="block mt-4 md:mt-0 hover:text-red-500 transition duration-300"
            >
              Get Involved
            </Link>
            <Link
              href="/resources"
              className="block mt-4 md:mt-0 hover:text-red-500 transition duration-300"
            >
              Resources
            </Link>
            <Link
              href="/contact"
              className="block mt-4 md:mt-0 hover:text-red-500 transition duration-300"
            >
              Contact
            </Link>
            <Link
              href="/get-involved"
              className="block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md mt-4 md:mt-0 transition duration-300"
            >
              Join the Resistance
            </Link>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-900">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block mt-4 md:mt-0 hover:text-red-500 transition duration-300"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block mt-4 md:mt-0 hover:text-red-500 transition duration-300"
            >
              About
            </Link>
            <Link
              href="/mission"
              className="block mt-4 md:mt-0 hover:text-red-500 transition duration-300"
            >
              Mission
            </Link>
            <Link
              href="/your-cloud"
              className="block mt-4 md:mt-0 hover:text-red-500 transition duration-300"
            >
              Not Your Photos
            </Link>
            <Link
              href="/protect-the-internet"
              className="block mt-4 md:mt-0 hover:text-red-500 transition duration-300"
            >
              Decentralized Internet
            </Link>
            <Link
              href="/your-stock-vote"
              className="block mt-4 md:mt-0 hover:text-red-500 transition duration-300"
            >
              Who Owns Your Stock Vote?
            </Link>
            <Link
              href="/directory"
              className="block mt-4 md:mt-0 hover:text-red-500 transition duration-300"
            >
              Directory
            </Link>
            <Link
              href="/get-involved"
              className="block mt-4 md:mt-0 hover:text-red-500 transition duration-300"
            >
              Get Involved
            </Link>
            <Link
              href="/resources"
              className="block mt-4 md:mt-0 hover:text-red-500 transition duration-300"
            >
              Resources
            </Link>
            <Link
              href="/contact"
              className="block mt-4 md:mt-0 hover:text-red-500 transition duration-300"
            >
              Contact
            </Link>
            <Link
              href="/get-involved"
              className="block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md mt-4 md:mt-0 transition duration-300"
            >
              Join the Resistance
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
