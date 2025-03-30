// import Link from "next/link"
// import { Search } from "lucide-react"

// import { Montserrat } from 'next/font/google';

// export const montserrat = Montserrat({
//   subsets: ['latin'],
//   weight: ['300', '400', '500', '600', '700'],
//   variable: '--font-montserrat',
//   display: 'swap',
// });

// export default function Home() {
//   return (
//     <div className="flex flex-col">
//       {/* Hero Section */}
//       <section className="py-12 bg-white">
//         <div className="container px-4 mx-auto text-center md:px-6">
//           <h1 className="mb-6 text-3xl font-bold md:text-4xl">Find a doctor at your own ease</h1>
//           <div className="max-w-xl mx-auto mb-8">
//             <div className="flex">
//               <div className="relative flex-grow">
//                 <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
//                 <input
//                   type="text"
//                   placeholder="Search doctors..."
//                   className="w-full h-12 pl-10 pr-4 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
//                 />
//               </div>
//               <button className="h-12 px-6 text-white rounded-r-md bg-primary hover:bg-primary/90">Search</button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Doctors Section */}
//       <section className="py-12 bg-gray-50">
//         <div className="container px-4 mx-auto md:px-6">
//           <h2 className="mb-2 text-2xl font-bold text-center md:text-3xl">6 doctors available</h2>
//           <p className="mb-8 text-center text-gray-500">
//             Book appointments with minimum wait time & verified doctor details.
//           </p>

//           <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
//             {/* Filters */}
//             <div className="md:col-span-3">
//               <div className="p-4 bg-white rounded-lg shadow-sm">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="font-medium">Filter By:</h3>
//                   <button className="text-sm text-primary hover:underline">Reset</button>
//                 </div>

//                 {/* Rating Filter */}
//                 <div className="mb-6">
//                   <h4 className="mb-2 font-medium">Rating</h4>
//                   <div className="space-y-2">
//                     <label className="flex items-center">
//                       <input type="radio" name="rating" className="w-4 h-4 text-primary" defaultChecked />
//                       <span className="ml-2 text-sm">Show all</span>
//                     </label>
//                     {[1, 2, 3, 4, 5].map((rating) => (
//                       <label key={rating} className="flex items-center">
//                         <input type="radio" name="rating" className="w-4 h-4 text-primary" />
//                         <span className="ml-2 text-sm">{rating} star</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Experience Filter */}
//                 <div className="mb-6">
//                   <h4 className="mb-2 font-medium">Experience</h4>
//                   <div className="space-y-2">
//                     <label className="flex items-center">
//                       <input type="radio" name="experience" className="w-4 h-4 text-primary" defaultChecked />
//                       <span className="ml-2 text-sm">10+ years</span>
//                     </label>
//                     <label className="flex items-center">
//                       <input type="radio" name="experience" className="w-4 h-4 text-primary" />
//                       <span className="ml-2 text-sm">10-15 years</span>
//                     </label>
//                     <label className="flex items-center">
//                       <input type="radio" name="experience" className="w-4 h-4 text-primary" />
//                       <span className="ml-2 text-sm">5-10 years</span>
//                     </label>
//                     <label className="flex items-center">
//                       <input type="radio" name="experience" className="w-4 h-4 text-primary" />
//                       <span className="ml-2 text-sm">3-5 years</span>
//                     </label>
//                     <label className="flex items-center">
//                       <input type="radio" name="experience" className="w-4 h-4 text-primary" />
//                       <span className="ml-2 text-sm">1-3 years</span>
//                     </label>
//                     <label className="flex items-center">
//                       <input type="radio" name="experience" className="w-4 h-4 text-primary" />
//                       <span className="ml-2 text-sm">0-1 years</span>
//                     </label>
//                   </div>
//                 </div>

//                 {/* Gender Filter */}
//                 <div>
//                   <h4 className="mb-2 font-medium">Gender</h4>
//                   <div className="space-y-2">
//                     <label className="flex items-center">
//                       <input type="radio" name="gender" className="w-4 h-4 text-primary" defaultChecked />
//                       <span className="ml-2 text-sm">Show All</span>
//                     </label>
//                     <label className="flex items-center">
//                       <input type="radio" name="gender" className="w-4 h-4 text-primary" />
//                       <span className="ml-2 text-sm">Male</span>
//                     </label>
//                     <label className="flex items-center">
//                       <input type="radio" name="gender" className="w-4 h-4 text-primary" />
//                       <span className="ml-2 text-sm">Female</span>
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Doctor Cards */}
//             <div className="md:col-span-9">
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//                 {/* Doctor 1 */}
//                 <div className="overflow-hidden bg-white rounded-lg shadow-sm">
//                   <div className="p-4 text-center">
//                     <div className="flex justify-center mb-2">
//                       <div className="w-24 h-24 overflow-hidden rounded-full">
//                         <img
//                           src="/placeholder.svg?height=96&width=96"
//                           alt="Dr Jane Doe"
//                           className="object-cover w-full h-full"
//                         />
//                       </div>
//                     </div>
//                     <h3 className="mb-1 text-lg font-medium">Dr Jane Doe, MBBS</h3>
//                     <div className="flex items-center justify-center mb-2 text-sm text-gray-500">
//                       <span>Dentist</span>
//                       <span className="mx-2">•</span>
//                       <span>5 Years</span>
//                     </div>
//                     <div className="flex items-center justify-center mb-4">
//                       <div className="flex">
//                         {[1, 2, 3, 4, 5].map((star) => (
//                           <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                         ))}
//                       </div>
//                     </div>
//                     <Link
//                       href="/doctors/jane-doe"
//                       className="block w-full py-2 text-center text-white rounded-md bg-primary hover:bg-primary/90"
//                     >
//                       Book Appointment
//                     </Link>
//                   </div>
//                 </div>

//                 {/* Doctor 2 */}
//                 <div className="overflow-hidden bg-white rounded-lg shadow-sm">
//                   <div className="p-4 text-center">
//                     <div className="flex justify-center mb-2">
//                       <div className="w-24 h-24 overflow-hidden rounded-full">
//                         <img
//                           src="/placeholder.svg?height=96&width=96"
//                           alt="Dr Sam Wilson"
//                           className="object-cover w-full h-full"
//                         />
//                       </div>
//                     </div>
//                     <h3 className="mb-1 text-lg font-medium">Dr Sam Wilson, BDS</h3>
//                     <div className="flex items-center justify-center mb-2 text-sm text-gray-500">
//                       <span>Dentist</span>
//                       <span className="mx-2">•</span>
//                       <span>5 Years</span>
//                     </div>
//                     <div className="flex items-center justify-center mb-4">
//                       <div className="flex">
//                         {[1, 2, 3, 4].map((star) => (
//                           <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                         ))}
//                         <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                       </div>
//                     </div>
//                     <Link
//                       href="/doctors/sam-wilson"
//                       className="block w-full py-2 text-center text-white rounded-md bg-primary hover:bg-primary/90"
//                     >
//                       Book Appointment
//                     </Link>
//                   </div>
//                 </div>

//                 {/* Doctor 3 */}
//                 <div className="overflow-hidden bg-white rounded-lg shadow-sm">
//                   <div className="p-4 text-center">
//                     <div className="flex justify-center mb-2">
//                       <div className="w-24 h-24 overflow-hidden rounded-full">
//                         <img
//                           src="/placeholder.svg?height=96&width=96"
//                           alt="Dr Pepper Potts"
//                           className="object-cover w-full h-full"
//                         />
//                       </div>
//                     </div>
//                     <h3 className="mb-1 text-lg font-medium">Dr Pepper Potts, BHMS</h3>
//                     <div className="flex items-center justify-center mb-2 text-sm text-gray-500">
//                       <span>Dentist</span>
//                       <span className="mx-2">•</span>
//                       <span>2 Years</span>
//                     </div>
//                     <div className="flex items-center justify-center mb-4">
//                       <div className="flex">
//                         {[1, 2, 3, 4, 5].map((star) => (
//                           <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                         ))}
//                       </div>
//                     </div>
//                     <Link
//                       href="/doctors/pepper-potts"
//                       className="block w-full py-2 text-center text-white rounded-md bg-primary hover:bg-primary/90"
//                     >
//                       Book Appointment
//                     </Link>
//                   </div>
//                 </div>

//                 {/* Doctor 4 */}
//                 <div className="overflow-hidden bg-white rounded-lg shadow-sm">
//                   <div className="p-4 text-center">
//                     <div className="flex justify-center mb-2">
//                       <div className="w-24 h-24 overflow-hidden rounded-full">
//                         <img
//                           src="/placeholder.svg?height=96&width=96"
//                           alt="Dr Tony Stark"
//                           className="object-cover w-full h-full"
//                         />
//                       </div>
//                     </div>
//                     <h3 className="mb-1 text-lg font-medium">Dr Tony Stark, MDS</h3>
//                     <div className="flex items-center justify-center mb-2 text-sm text-gray-500">
//                       <span>Dentist</span>
//                       <span className="mx-2">•</span>
//                       <span>4 Years</span>
//                     </div>
//                     <div className="flex items-center justify-center mb-4">
//                       <div className="flex">
//                         {[1, 2, 3, 4, 5].map((star) => (
//                           <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                         ))}
//                       </div>
//                     </div>
//                     <Link
//                       href="/doctors/tony-stark"
//                       className="block w-full py-2 text-center text-white rounded-md bg-primary hover:bg-primary/90"
//                     >
//                       Book Appointment
//                     </Link>
//                   </div>
//                 </div>

//                 {/* Doctor 5 */}
//                 <div className="overflow-hidden bg-white rounded-lg shadow-sm">
//                   <div className="p-4 text-center">
//                     <div className="flex justify-center mb-2">
//                       <div className="w-24 h-24 overflow-hidden rounded-full">
//                         <img
//                           src="/placeholder.svg?height=96&width=96"
//                           alt="Dr Meghan"
//                           className="object-cover w-full h-full"
//                         />
//                       </div>
//                     </div>
//                     <h3 className="mb-1 text-lg font-medium">Dr Meghan, MD</h3>
//                     <div className="flex items-center justify-center mb-2 text-sm text-gray-500">
//                       <span>Dentist</span>
//                       <span className="mx-2">•</span>
//                       <span>3 Years</span>
//                     </div>
//                     <div className="flex items-center justify-center mb-4">
//                       <div className="flex">
//                         {[1, 2, 3, 4, 5].map((star) => (
//                           <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                         ))}
//                       </div>
//                     </div>
//                     <Link
//                       href="/doctors/meghan"
//                       className="block w-full py-2 text-center text-white rounded-md bg-primary hover:bg-primary/90"
//                     >
//                       Book Appointment
//                     </Link>
//                   </div>
//                 </div>

//                 {/* Doctor 6 */}
//                 <div className="overflow-hidden bg-white rounded-lg shadow-sm">
//                   <div className="p-4 text-center">
//                     <div className="flex justify-center mb-2">
//                       <div className="w-24 h-24 overflow-hidden rounded-full">
//                         <img
//                           src="/placeholder.svg?height=96&width=96"
//                           alt="Dr Dev Patel"
//                           className="object-cover w-full h-full"
//                         />
//                       </div>
//                     </div>
//                     <h3 className="mb-1 text-lg font-medium">Dr Dev Patel, FNB</h3>
//                     <div className="flex items-center justify-center mb-2 text-sm text-gray-500">
//                       <span>Dentist</span>
//                       <span className="mx-2">•</span>
//                       <span>2 Years</span>
//                     </div>
//                     <div className="flex items-center justify-center mb-4">
//                       <div className="flex">
//                         {[1, 2, 3, 4, 5].map((star) => (
//                           <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                         ))}
//                       </div>
//                     </div>
//                     <Link
//                       href="/doctors/dev-patel"
//                       className="block w-full py-2 text-center text-white rounded-md bg-primary hover:bg-primary/90"
//                     >
//                       Book Appointment
//                     </Link>
//                   </div>
//                 </div>
//               </div>

//               {/* Pagination */}
//               <div className="flex justify-center mt-8">
//                 <nav className="flex items-center space-x-1">
//                   <Link
//                     href="#"
//                     className="px-3 py-2 text-sm font-medium text-gray-500 border rounded-md hover:bg-gray-50"
//                   >
//                     Prev
//                   </Link>
//                   <Link href="#" className="px-3 py-2 text-sm font-medium text-white border rounded-md bg-primary">
//                     1
//                   </Link>
//                   <Link
//                     href="#"
//                     className="px-3 py-2 text-sm font-medium text-gray-500 border rounded-md hover:bg-gray-50"
//                   >
//                     2
//                   </Link>
//                   <Link
//                     href="#"
//                     className="px-3 py-2 text-sm font-medium text-gray-500 border rounded-md hover:bg-gray-50"
//                   >
//                     3
//                   </Link>
//                   <span className="px-3 py-2 text-sm font-medium text-gray-500">...</span>
//                   <Link
//                     href="#"
//                     className="px-3 py-2 text-sm font-medium text-gray-500 border rounded-md hover:bg-gray-50"
//                   >
//                     22
//                   </Link>
//                   <Link
//                     href="#"
//                     className="px-3 py-2 text-sm font-medium text-gray-500 border rounded-md hover:bg-gray-50"
//                   >
//                     23
//                   </Link>
//                   <Link
//                     href="#"
//                     className="px-3 py-2 text-sm font-medium text-gray-500 border rounded-md hover:bg-gray-50"
//                   >
//                     Next
//                   </Link>
//                 </nav>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// // }


import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="h-screen">
      <div className="grid md:grid-cols-2 h-full">
        <div className="flex flex-col justify-center p-8 md:p-12 bg-primary text-white">
          <div>
            <h1 className="text-4xl font-bold md:text-5xl mb-6">Health in Your Hands.</h1>
            <p className="text-lg mb-8">
              Take control of your healthcare with CareMate. Book appointments with ease, explore health blogs, and stay
              on top of your well-being, all in one place.
            </p>
            <Link
              href="/appointments"
              className="inline-flex items-center px-6 py-3 text-lg font-medium text-primary bg-white rounded-md hover:bg-gray-100"
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className="relative h-full">
          <Image
            src="/hero.svg"
            alt="Doctor with patient"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  )
}