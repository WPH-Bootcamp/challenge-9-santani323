"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  registerUser,
  resetError,
  resetRegistration,
} from "@/lib/redux/features/authSlice";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error, isRegistered } = useAppSelector(
    (state) => state.auth,
  );

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (isRegistered) {
      // Show success message
      alert("Registrasi berhasil! Silakan login.");
      dispatch(resetRegistration());
      router.push("/login");
    }
  }, [isRegistered, dispatch, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");
    dispatch(resetError());

    // Validation
    if (password !== confirmPassword) {
      setValidationError("Password tidak cocok");
      return;
    }

    if (password.length < 6) {
      setValidationError("Password minimal 6 karakter");
      return;
    }

    // Dispatch register action
    dispatch(
      registerUser({
        name: "John Doe",
        email: "1ttt99@example.com",
        phone: "081234567895",
        password: "password123",
      }),
    );
    // dispatch(registerUser({ fullName, email, password }));
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-black">
        <Image
          src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80"
          alt="Delicious Burger"
          fill
          className="object-cover opacity-90"
          priority
        />
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full space-y-8">
          {/* Logo and Branding */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/logo_read.svg"
                alt="Foody Logo"
                width={48}
                height={48}
                className="w-12 h-12"
              />
              <span className="text-4xl font-bold text-gray-900">Foody</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Welcome Back
            </h1>
            <p className="text-lg text-gray-600">
              Good to see you again! Let's eat
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className="flex gap-3 mb-8 bg-gray-100 p-2 rounded-xl">
            <Link
              href="/login"
              className="flex-1 text-center py-3 px-6 font-semibold text-gray-600 hover:text-gray-900 rounded-lg transition-colors"
            >
              Sign in
            </Link>
            <div className="flex-1 text-center py-3 px-6 bg-white font-semibold text-gray-900 rounded-lg shadow-sm">
              Sign up
            </div>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* Error Messages */}
            {(error || validationError) && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error || validationError}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  autoComplete="name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Create a password"
                />
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
