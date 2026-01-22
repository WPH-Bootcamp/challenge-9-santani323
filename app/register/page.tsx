"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  registerUser,
  resetError,
  resetRegistration,
} from "@/lib/redux/features/authSlice";
import { Alert } from "@/components/ui/Alert";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isLoading, error, isRegistered } = useAppSelector(
    (state) => state.auth,
  );

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    if (isRegistered) {
      setShowSuccessAlert(true);
      dispatch(resetRegistration());
      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  }, [isRegistered, dispatch, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");
    dispatch(resetError());

    if (!fullName || !email || !phoneNumber || !password || !confirmPassword) {
      setValidationError("Semua field wajib diisi");
      return;
    }

    if (password !== confirmPassword) {
      setValidationError("Password tidak cocok");
      return;
    }

    if (password.length < 6) {
      setValidationError("Password minimal 6 karakter");
      return;
    }

    dispatch(
      registerUser({
        name: fullName.trim(),
        email: email.trim(),
        password,
        phone: phoneNumber.trim(),
      }),
    );
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-black">
        <Image
          src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80"
          alt="Register Background"
          fill
          className="object-cover opacity-90"
          priority
        />
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/logo_read.svg"
                alt="Foody Logo"
                width={48}
                height={48}
              />
              <span className="text-4xl font-bold text-gray-900">
                Foody
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Create Account
            </h1>
            <p className="text-lg text-gray-600">
              Join us and start ordering food
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-3 bg-gray-100 p-2 rounded-xl">
            <Link
              href="/login"
              className="flex-1 text-center py-3 font-semibold text-gray-600 hover:text-gray-900 rounded-lg"
            >
              Sign in
            </Link>
            <div className="flex-1 text-center py-3 bg-white font-semibold text-gray-900 rounded-lg shadow-sm">
              Sign up
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {showSuccessAlert && (
              <Alert
                variant="success"
                title="Registrasi Berhasil!"
                onClose={() => setShowSuccessAlert(false)}
              >
                Akun Anda telah berhasil dibuat. Mengalihkan ke halaman login...
              </Alert>
            )}

            {(error || validationError) && (
              <Alert variant="danger" onClose={() => {
                setValidationError("");
                dispatch(resetError());
              }}>
                {error || validationError}
              </Alert>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="Create password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="Confirm password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-400"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
