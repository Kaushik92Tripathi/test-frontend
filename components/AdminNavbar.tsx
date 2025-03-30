import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, X, ChevronDown, LogOut, User, Users, Calendar, Settings, Home } from 'lucide-react'

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and primary nav */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/admin/dashboard" className="text-xl font-bold text-primary">
                MedCare Admin
              </Link>
            </div>
            
          </div>

          {/* Profile dropdown */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                <User className="w-6 h-6" />
                <span>Admin</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/admin/dashboard"
              className="flex items-center px-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-100"
            >
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </Link>
            <Link
              href="/admin/doctors"
              className="flex items-center px-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-100"
            >
              <Users className="w-4 h-4 mr-2" />
              Doctors
            </Link>
            <Link
              href="/admin/appointments"
              className="flex items-center px-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-100"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Appointments
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center px-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-100"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="flex w-full items-center px-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-100"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  )
} 