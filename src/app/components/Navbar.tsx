"use client";

import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, Bell, ChevronDown, User } from 'lucide-react';

interface NavbarProps {
  wishlistCount?: number;
  cartCount?: number;
  notificationCount?: number;
}

export default function Navbar({
  wishlistCount = 5,
  cartCount = 4,
  notificationCount = 3,
}: NavbarProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("RH");

  return (
    <header className="w-full bg-white border-b border-gray-100 py-3 px-4 md:px-8 font-sans sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8">
        
        {/* Left Side: Logo with Hover Scale & Rotate Animation */}
        <div className="flex items-center gap-3 shrink-0 cursor-pointer group">
          <div className="w-10 h-10 bg-[#4F46E5] rounded-xl flex items-center justify-center text-white shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-900 tracking-tight leading-none transition-colors duration-200 group-hover:text-[#4F46E5]">
              Sokoni
            </span>
            <span className="text-[10px] tracking-[0.2em] text-gray-400 font-semibold uppercase mt-0.5">
              MARKETPLACE
            </span>
          </div>
        </div>

        {/* Center: Search Bar with Focus Ring Animation */}
        <div className="flex-1 max-w-2xl hidden md:flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-[#4F46E5]/20 transition-all duration-300 bg-white shadow-2xs">
          <button className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 font-medium hover:bg-gray-50 border-r border-gray-100 transition-colors shrink-0 group">
            <span>All Categories</span>
            <ChevronDown className="w-4 h-4 text-gray-400 transition-transform duration-200 group-hover:translate-y-0.5" />
          </button>
          
          <div className="flex-1 flex items-center px-3">
            <input
              type="text"
              placeholder="Search products, brands and stores..."
              className="w-full py-2 px-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent"
            />
            <button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white p-2.5 rounded-lg transition-all duration-200 shrink-0 ml-1 hover:scale-105 active:scale-95 shadow-sm">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Side: Actions with Badge Pulse & Hover Effects */}
        <div className="flex items-center gap-4 md:gap-6 shrink-0">
          
          {/* Wishlist Icon */}
          <button className="relative text-gray-700 hover:text-[#4F46E5] transition-all duration-200 p-1 hover:scale-110 active:scale-95 group">
            <Heart className="w-6 h-6 stroke-[1.75] transition-transform duration-200 group-hover:rotate-6" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#4F46E5] text-white text-[11px] font-semibold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Icon */}
          <button className="relative text-gray-700 hover:text-[#4F46E5] transition-all duration-200 p-1 hover:scale-110 active:scale-95 group">
            <ShoppingBag className="w-6 h-6 stroke-[1.75] transition-transform duration-200 group-hover:-rotate-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#4F46E5] text-white text-[11px] font-semibold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Notifications Icon */}
          <button className="relative text-gray-700 hover:text-[#4F46E5] transition-all duration-200 p-1 hover:scale-110 active:scale-95 group">
            <Bell className="w-6 h-6 stroke-[1.75] transition-transform duration-200 group-hover:rotate-12" />
            {notificationCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#4F46E5] text-white text-[11px] font-semibold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Conditional Auth Buttons */}
          {isLoggedIn ? (
            /* Logged In Avatar Dropdown */
            <div className="flex items-center gap-1 cursor-pointer pl-1 group">
              <div 
                onClick={() => setIsLoggedIn(false)} 
                title="Click to logout"
                className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100 text-[#4F46E5] font-semibold text-sm flex items-center justify-center transition-all duration-300 hover:bg-[#4F46E5] hover:text-white hover:shadow-md hover:scale-105 active:scale-95"
              >
                {userName}
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 transition-transform duration-200 group-hover:translate-y-0.5" />
            </div>
          ) : (
            /* Logged Out Sign In / Register Buttons with Hover Lift */
            <div className="flex items-center gap-2 pl-1">
              <button 
                onClick={() => setIsLoggedIn(true)} 
                className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-gray-700 hover:text-[#4F46E5] transition-all duration-200 hover:-translate-y-0.5"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </button>

              <button 
                onClick={() => setIsLoggedIn(true)} 
                className="bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
              >
                Register
              </button>
            </div>
          )}

        </div>
      </div>
    </header>
  );
}