import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, X, ChevronDown, LogOut, User, Users, Calendar, Settings, Home, LayoutDashboard } from 'lucide-react'

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  const navLinks = [
    { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/doctors', icon: Users, label: 'Doctors' },
    { href: '/admin/appointments', icon: Calendar, label: 'Appointments' },
    { href: '/admin/settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and primary nav */}
          <div className="flex items-center">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary">
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-primary">MedCare Admin</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center ml-8 space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary"
                >
                  <link.icon className="w-4 h-4 mr-2" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Profile dropdown and mobile menu button */}
          <div className="flex items-center gap-4">
            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary text-white flex items-center justify-center">
                  <User className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="hidden sm:inline">Admin</span>
                <ChevronDown className="hidden sm:block w-4 h-4" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-10">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-white" ref={menuRef}>
          <div className="px-4 py-3">
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="flex w-full items-center text-red-600 hover:text-red-700"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  )
} 