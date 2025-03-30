"use client"

import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()

  const handleGetStarted = () => {
    if (user) {
      router.push('/appointments')
    } else {
      router.push('/login')
    }
  }

  return (
    <div className="h-screen">
      <div className="grid md:grid-cols-2 h-full">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center p-8 md:p-12 bg-primary text-white"
        >
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl font-bold md:text-5xl mb-6"
            >
              Health in Your Hands.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lg mb-8"
            >
              Take control of your healthcare with CareMate. Book appointments with ease, explore health blogs, and stay
              on top of your well-being, all in one place.
            </motion.p>
            <motion.button
              onClick={handleGetStarted}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="inline-flex items-center px-6 py-3 text-lg font-medium text-primary bg-white rounded-md hover:bg-gray-100"
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative h-full"
        >
          <Image
            src="/hero.svg"
            alt="Doctor with patient"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </div>
    </div>
  )
}