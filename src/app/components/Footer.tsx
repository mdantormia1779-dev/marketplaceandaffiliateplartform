'use client';

import React from 'react';
import { Send, MapPin, Phone, Mail } from 'lucide-react';

/* ---- Custom brand icons ---- */

const FacebookIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.44-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
  </svg>
);

/* ------------------------------------------------------------------ */

export default function Footer() {
  return (
    <footer className="bg-[#f8f9fa] text-gray-600 text-sm pt-12 pb-6 border-t border-gray-100 font-sans transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">

          {/* Column 1: Brand & Newsletter (4 cols) */}
          <div className="lg:col-span-4 space-y-4 animate-fade-in">
            {/* Logo with Hover Scale & Pulse */}
            <div className="flex items-center gap-3 group cursor-pointer w-fit">
              <div className="bg-[#4F46E5] text-white p-2.5 rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 tracking-tight leading-none transition-colors group-hover:text-[#4F46E5]">
                  Sokoni
                </span>
                <span className="text-[10px] tracking-[0.2em] text-gray-400 font-semibold uppercase mt-0.5">
                  MARKETPLACE
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-500 text-sm leading-relaxed pr-4">
              A premium multi-vendor marketplace and affiliate commerce platform. Shop from verified suppliers, or earn by selling and promoting the products you love.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <p className="font-semibold text-gray-900 text-sm mb-3">
                Get exclusive deals & affiliate tips
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all duration-200 placeholder:text-gray-400"
                />
                <button
                  type="submit"
                  className="group bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 text-sm whitespace-nowrap shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  Subscribe
                </button>
              </form>
            </div>

            {/* Social Icons with Hover Lift & Scale */}
            <div className="flex items-center gap-2 pt-2">
              {[
                { icon: <FacebookIcon />, key: 'fb' },
                { icon: <InstagramIcon />, key: 'insta' },
                { icon: <span className="font-semibold text-xs">X</span>, key: 'x' },
                { icon: <LinkedinIcon />, key: 'linkedin' },
                { icon: <YoutubeIcon />, key: 'yt' },
              ].map((item) => (
                <a
                  key={item.key}
                  href="#"
                  className="w-9 h-9 border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 bg-white transition-all duration-300 hover:text-white hover:bg-[#4F46E5] hover:border-[#4F46E5] hover:-translate-y-1 hover:shadow-md active:translate-y-0"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Marketplace (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">Marketplace</h3>
            <ul className="space-y-2.5 text-sm">
              {['About Sokoni', 'All Categories', 'Featured Suppliers', 'Flash Sale', 'New Arrivals'].map((link) => (
                <li key={link}>
                  <a href="#" className="inline-block text-gray-600 hover:text-[#4F46E5] hover:translate-x-1.5 transition-all duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Sell & Earn (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">Sell & Earn</h3>
            <ul className="space-y-2.5 text-sm">
              {['Become a Supplier', 'Supplier Registration', 'Become an Affiliate', 'Affiliate Registration', 'Commission Structure'].map((link) => (
                <li key={link}>
                  <a href="#" className="inline-block text-gray-600 hover:text-[#4F46E5] hover:translate-x-1.5 transition-all duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Help & Legal (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">Help & Legal</h3>
            <ul className="space-y-2.5 text-sm">
              {['Help Center', 'Contact Us', 'Terms of Service', 'Privacy Policy', 'Return & Refund'].map((link) => (
                <li key={link}>
                  <a href="#" className="inline-block text-gray-600 hover:text-[#4F46E5] hover:translate-x-1.5 transition-all duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Contact (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">Contact</h3>
            <div className="flex items-start gap-2 text-sm text-gray-600 group cursor-pointer">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0 transition-colors group-hover:text-[#4F46E5]" />
              <span className="transition-colors group-hover:text-gray-900">Level 8, Gulshan Avenue, Dhaka 1212</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-600 group cursor-pointer">
              <Phone className="w-4 h-4 text-gray-400 mt-0.5 shrink-0 transition-colors group-hover:text-[#4F46E5]" />
              <span className="transition-colors group-hover:text-gray-900">+880 9612 345 678</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-600 group cursor-pointer">
              <Mail className="w-4 h-4 text-gray-400 mt-0.5 shrink-0 transition-colors group-hover:text-[#4F46E5]" />
              <span className="break-all transition-colors group-hover:text-gray-900">support@sokoni.com</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Gateways */}
        <div className="pt-8 border-t border-gray-200/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © 2026 Sokoni Commerce Ltd. All rights reserved.
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="mr-1 text-gray-400">Secure payments</span>
            {['VISA', 'Mastercard', 'bKash', 'Nagad', 'SSLCommerz'].map((pay) => (
              <span
                key={pay}
                className="px-2.5 py-1 bg-white border border-gray-200 rounded font-semibold text-gray-700 transition-all duration-300 hover:border-[#4F46E5] hover:text-[#4F46E5] hover:scale-105 cursor-pointer shadow-2xs"
              >
                {pay}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}