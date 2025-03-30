"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, User, Phone, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });
      const data = await response.json();
      console.log(data);
      
      if (!response.ok) throw new Error(data.error || "Registration failed");
      
      // Store the token in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      router.push("/appointments");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during registration");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    // window.location.href = `http://localhost:5000/api/auth/google`;
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <Image
        src="/signup.svg"
        alt="Register Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0"
      />

      <div className="relative z-10 w-full max-w-md p-6 border border-white/40 rounded-xl shadow-lg backdrop-blur-lg bg-white/10">
        <h1 className="mb-6 text-2xl font-bold text-center">Sign Up</h1>

        <p className="mb-6 text-sm text-center text-gray-500">
          Already a member? {" "}
          <Link href="/login" className="text-primary hover:underline">Login</Link>.
        </p>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label htmlFor="role" className="text-sm font-medium text-gray-500">Role</label>
            <div className="relative">
              <User className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <select
                id="role"
                className="w-full h-10 pl-10 pr-4 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="patient">Patient</option>
                {/* <option value="doctor">Doctor</option> */}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="name" className="text-sm font-medium text-gray-500">Name</label>
            <div className="relative">
              <User className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="w-full h-10 pl-10 pr-4 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="phone" className="text-sm font-medium text-gray-500">Phone</label>
            <div className="relative">
              <Phone className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                className="w-full h-10 pl-10 pr-4 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-500">Email</label>
            <div className="relative">
              <Mail className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="w-full h-10 pl-10 pr-4 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-500">Password</label>
            <div className="relative">
              <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full h-10 pl-10 pr-10 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute transform -translate-y-1/2 right-3 top-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-500">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full h-10 pl-10 pr-10 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="w-full py-2 text-white rounded-md bg-primary hover:bg-primary/90" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
          <button type="button" className="w-full py-2 text-white rounded-md bg-gray-400 hover:bg-gray-500" onClick={() => setFormData({ role: "", name: "", phone: "", email: "", password: "", confirmPassword: "" })}>
            Reset
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500 bg-white">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="w-full py-2 text-gray-700 bg-white border rounded-md hover:bg-gray-50"
          >
            <div className="flex items-center justify-center">
              <Image
                src="/google.svg"
                alt="Google"
                width={20}
                height={20}
                className="mr-2"
              />
              Sign up with Google
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}
