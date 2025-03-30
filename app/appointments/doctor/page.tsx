"use client"

import Link from "next/link"
import { Star, MapPin, Calendar, Clock, ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { format } from "date-fns"
import { useSearchParams } from "next/navigation"
import DoctorReviews from '@/components/DoctorReviews'
import { DoctorProfileSkeleton } from '../../components/ui/Shimmer'
import { Spinner } from '../../components/ui/Spinner'

interface DoctorData {
  id: number
  user_id: number
  name: string
  profile_picture: string | null
  degree: string
  experience_years: number
  avg_rating: number
  bio: string
  consultation_fee: string
  specialty_id: number | null
  specialty_name: string | null
  location_id: number | null
  location_name: string | null
  address: string | null
  city: string | null
  state: string | null
}

interface Availability {
  day_of_week: number
  time_slot_id: number
  start_time: string
  end_time: string
}

interface ApiResponse {
  doctor: DoctorData
  availability: Availability[]
  error?: string
}

export default function DoctorProfile() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [doctorData, setDoctorData] = useState<DoctorData | null>(null)
  const [availability, setAvailability] = useState<Availability[]>([])
  const [canReview, setCanReview] = useState(false)

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      if (!id) {
        setError("Doctor ID is required")
        setLoading(false)
        return
      }

      try {
        const [doctorRes, appointmentRes] = await Promise.all([
          fetch(`/api/doctors/${id}`),
          fetch(`/api/appointments?doctorId=${id}&status=completed`)
        ]);

        const [doctorData, appointmentData] = await Promise.all([
          doctorRes.json(),
          appointmentRes.json()
        ]);
        
        if (!doctorRes.ok) {
          throw new Error(doctorData.error || "Failed to fetch doctor details")
        }
        
        setDoctorData(doctorData.doctor)
        setAvailability(doctorData.availability)
        setCanReview(appointmentData.appointments?.length > 0)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch doctor details")
      } finally {
        setLoading(false)
      }
    }

    fetchDoctorDetails()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container px-4 py-8 mx-auto md:px-6">
          <Link 
            href="/appointments" 
            className="inline-flex items-center mb-6 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Appointments
          </Link>
          <DoctorProfileSkeleton />
        </div>
      </div>
    )
  }

  if (error || !doctorData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container px-4 py-8 mx-auto md:px-6">
          <Link 
            href="/appointments" 
            className="inline-flex items-center mb-6 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Appointments
          </Link>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="flex flex-col items-center justify-center min-h-[200px]">
              <div className="text-lg font-medium text-red-600 mb-2">
                {error || "Failed to load doctor details"}
              </div>
              <button
                onClick={() => window.location.reload()}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Convert availability array to days array without duplicates
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const availableDaySet = new Set(availability.map(a => days[a.day_of_week]))
  const availableDays = days.filter(day => availableDaySet.has(day))

  // Format hours safely
  const formatTimeDisplay = (timeString: string): string => {
    if (!timeString) return "";
    
    // Ensure the time is in the correct format (HH:MM)
    let formattedTime = timeString;
    if (timeString.length < 5) {
      // If it's just hours (e.g., "9"), make it "09:00"
      if (timeString.length === 1) {
        formattedTime = `0${timeString}:00`;
      } 
      // If it's hours and partial minutes (e.g., "9:3"), make it "09:30"
      else if (timeString.length === 3 && timeString.includes(':')) {
        const [hours, minutes] = timeString.split(':');
        formattedTime = `0${hours}:${minutes}0`;
      }
      // If it's just hours and minutes with single digit hour (e.g., "9:30"), make it "09:30"
      else if (timeString.length === 4 && timeString.includes(':')) {
        formattedTime = `0${timeString}`;
      }
    }
    
    try {
      // Use a safer parsing approach
      const [hours, minutes] = formattedTime.split(':').map(num => parseInt(num, 10));
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
      return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    } catch (e) {
      return timeString; // Fallback to original string if parsing fails
    }
  };

  // Get the first time slot's hours for display
  const hours = availability.length > 0
    ? `${formatTimeDisplay(availability[0].start_time)} - ${formatTimeDisplay(availability[0].end_time)}`
    : "Not available";

  // Format location
  const location = [doctorData.location_name, doctorData.address, doctorData.city, doctorData.state]
    .filter(Boolean)
    .join(", ")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container px-4 py-8 mx-auto md:px-6">
        <Link 
          href="/appointments" 
          className="inline-flex items-center mb-6 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Appointments
        </Link>
        <div className="grid gap-8 md:grid-cols-3">
          {/* Doctor Profile Card */}
          <div className="md:col-span-1">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 mb-4 overflow-hidden rounded-full">
                  <img
                    src={doctorData.profile_picture || "/default-avatar.png"}
                    alt={doctorData.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h1 className="mb-1 text-xl font-bold">{doctorData.name}</h1>
                <p className="mb-2 text-sm text-gray-500">{doctorData.degree}</p>
                <div className="flex items-center mb-4">
                  <div className="flex mr-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.floor(doctorData.avg_rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {doctorData.avg_rating.toFixed(1)} ({doctorData.avg_rating} reviews)
                  </span>
                </div>

                <Link
                  href={`/appointments/book/doctor?id=${doctorData.id}`}
                  className="w-full py-2 mb-4 text-center text-white rounded-md bg-primary hover:bg-primary/90"
                >
                  Book Appointment
                </Link>

                <div className="w-full pt-4 mt-4 border-t">
                  <div className="flex items-start mb-3">
                    <MapPin className="w-5 h-5 mr-2 text-gray-500 shrink-0" />
                    <p className="text-sm text-gray-600">{location}</p>
                  </div>
                  <div className="flex items-center mb-3">
                    <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                    <p className="text-sm text-gray-600">{availableDays.join(", ")}</p>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-gray-500" />
                    <p className="text-sm text-gray-600">{hours}</p>
                  </div>
                </div>

                {doctorData.bio && (
                  <div className="w-full pt-4 mt-4 border-t">
                    <h3 className="mb-2 text-sm font-medium">About</h3>
                    <p className="text-sm text-gray-600">{doctorData.bio}</p>
                  </div>
                )}

                {doctorData.consultation_fee && (
                  <div className="w-full pt-4 mt-4 border-t">
                    <h3 className="mb-2 text-sm font-medium">Consultation Fee</h3>
                    <p className="text-2xl font-bold text-primary">₹{doctorData.consultation_fee}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Reviews */}
          <div className="md:col-span-2">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              {doctorData && (
                <DoctorReviews 
                  doctorId={doctorData.id} 
                  canReview={canReview} 
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}