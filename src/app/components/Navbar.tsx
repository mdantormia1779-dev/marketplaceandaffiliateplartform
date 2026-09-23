"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Bell, ChevronDown, User, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import Link from 'next/link';

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
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState("RH");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ড্রপডাউনের বাইরে ক্লিক করলে মেনু বন্ধ হয়ে যাবে
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full bg-white border-b border-gray-100 py-3 px-4 md:px-8 font-sans sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left Side: Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 cursor-pointer group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#4F46E5] rounded-xl flex items-center justify-center text-white shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight leading-none transition-colors duration-200 group-hover:text-[#4F46E5]">
              Sokoni
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.2em] text-gray-400 font-semibold uppercase mt-0.5">
              MARKETPLACE
            </span>
          </div>
        </Link>

        {/* Center: Search Bar (Desktop) */}
        <div className="hidden lg:flex flex-1 max-w-xl items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-[#4F46E5]/20 transition-all duration-300 bg-white">
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

        {/* Right Side: Actions & Profile */}
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          
          {/* Wishlist */}
          <button className="relative text-gray-700 hover:text-[#4F46E5] transition-all duration-200 p-1 hover:scale-110 active:scale-95 group">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-[#4F46E5] text-white text-[10px] font-semibold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-white">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart */}
          <button className="relative text-gray-700 hover:text-[#4F46E5] transition-all duration-200 p-1 hover:scale-110 active:scale-95 group">
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-[#4F46E5] text-white text-[10px] font-semibold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* Notifications */}
          <button className="relative text-gray-700 hover:text-[#4F46E5] transition-all duration-200 p-1 hover:scale-110 active:scale-95 group hidden sm:block">
            <Bell className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-[#4F46E5] text-white text-[10px] font-semibold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-white">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Desktop Auth & Dropdown Menu */}
          <div className="hidden md:flex items-center">
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <div 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1 cursor-pointer pl-1 group"
                >
                  <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100 text-[#4F46E5] font-semibold text-sm flex items-center justify-center transition-all duration-300 hover:bg-[#4F46E5] hover:text-white hover:shadow-md hover:scale-105 active:scale-95">
                    {userName}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </div>

                {/* Dropdown Box */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-800">Riaz Hasan</p>
                      <p className="text-[11px] text-slate-400 truncate">supplier@sokoni.com</p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/supplierdashboard"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-indigo-50/60 hover:text-[#4F46E5] transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-slate-400" />
                        <span>Supplier Dashboard</span>
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 pt-1">
                      <button
                        onClick={() => {
                          setIsLoggedIn(false);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-1">
                <button 
                  onClick={() => setIsLoggedIn(true)} 
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#4F46E5] transition-all"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </button>

                <button 
                  onClick={() => setIsLoggedIn(true)} 
                  className="bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-medium px-4 py-2 rounded-lg transition-all shadow-sm"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-[#4F46E5] p-1 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Search Bar Row */}
      <div className="mt-3 flex lg:hidden items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-[#4F46E5]/20 bg-white">
        <input
          type="text"
          placeholder="Search products, brands..."
          className="w-full py-2 px-3 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent"
        />
        <button className="bg-[#4F46E5] text-white p-2 shrink-0 m-1 rounded-lg">
          <Search className="w-4 h-4" />
        </button>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg py-4 px-6 space-y-4 animate-in slide-in-from-top-2 duration-200 z-50">
          {isLoggedIn ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 text-[#4F46E5] font-bold text-sm flex items-center justify-center">
                  {userName}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Riaz Hasan</p>
                  <p className="text-xs text-slate-400">supplier@sokoni.com</p>
                </div>
              </div>

              <Link
                href="/supplierdashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#4F46E5]"
              >
                <LayoutDashboard className="w-4 h-4 text-slate-400" />
                <span>Supplier Dashboard</span>
              </Link>

              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 py-2 text-sm font-semibold text-rose-600 border-t border-gray-100 pt-3"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5 pt-2">
              <button 
                onClick={() => { setIsLoggedIn(true); setIsMobileMenuOpen(false); }} 
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </button>

              <button 
                onClick={() => { setIsLoggedIn(true); setIsMobileMenuOpen(false); }} 
                className="w-full bg-[#4F46E5] text-white text-sm font-medium py-2.5 rounded-xl shadow-sm"
              >
                Register
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}