'use client';

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  console.log(user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="border-b">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary">
              <svg
                className="w-6 h-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-primary">MedCare</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-500 hover:text-primary">
              Home
            </Link>
            <Link href="/appointments" className="text-gray-500 hover:text-primary">
              Appointments
            </Link>
            <Link href="/emergency" className="text-gray-500 hover:text-primary">
              Help
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center focus:outline-none"
              >
                {user.profile_picture ? (
                  <Image
                    src={user.profile_picture}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-lg font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    <div className="font-medium truncate">{user.name}</div>
                    <div className="text-xs text-gray-500 truncate max-w-full">{user.email}</div>
                  </div>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    View Profile
                  </Link>
                  {user.role === 'admin' && (
                    <Link
                      href="/admin/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 text-sm font-medium border rounded-md hover:bg-gray-50">
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-sm font-medium text-white rounded-md bg-primary hover:bg-primary/90"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}