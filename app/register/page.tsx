'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register:', { fullName, email, password, confirmPassword });
    // Handle registration logic here
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
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Welcome Back</h1>
            <p className="text-lg text-gray-600">Good to see you again! Let's eat</p>
          </div>

          {/* Tabs Navigation */}
          <div className="flex gap-3 mb-8 bg-gray-100 p-2 rounded-xl">
            <Link href="/login" className="flex-1 text-center py-3 px-6 font-semibold text-gray-600 hover:text-gray-900 rounded-lg transition-colors">
              Sign in
            </Link>
            <div className="flex-1 text-center py-3 px-6 bg-white font-semibold text-gray-900 rounded-lg shadow-sm">
              Sign up
            </div>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
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
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
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
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
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
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                Create Account
              </button>
            </div>

           
          </form>

         
        </div>
      </div>
    </div>
  );
}
