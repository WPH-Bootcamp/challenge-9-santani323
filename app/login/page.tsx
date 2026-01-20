'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';

// Validation Rules
const validationRules = {
  email: [
    {
      validate: (value: string) => !!value,
      message: 'Email is required'
    },
    {
      validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Please enter a valid email address'
    }
  ],
  password: [
    {
      validate: (value: string) => !!value,
      message: 'Password is required'
    },
    {
      validate: (value: string) => value.length >= 6,
      message: 'Password must be at least 6 characters'
    }
  ]
};

// Validate field based on rules
const validateField = (fieldName: keyof typeof validationRules, value: string): string => {
  const rules = validationRules[fieldName];
  for (const rule of rules) {
    if (!rule.validate(value)) {
      return rule.message;
    }
  }
  return '';
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError) {
      setEmailError(validateField('email', value));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (passwordError) {
      setPasswordError(validateField('password', value));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const emailErr = validateField('email', email);
    const passwordErr = validateField('password', password);
    
    setEmailError(emailErr);
    setPasswordError(passwordErr);
    
    // If no errors, proceed with login
    if (!emailErr && !passwordErr) {
      console.log('Login:', { email, password });
      // Handle login logic here
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-black">
        <Image
          src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
          alt="Delicious Burger"
          fill
          className="object-cover opacity-90"
          priority
        />
      </div>

      {/* Right Side - Login Form */}
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
            <div className="flex-1 text-center py-3 px-6 bg-white font-semibold text-gray-900 rounded-lg shadow-sm">
              Sign in
            </div>
            <Link href="/register" className="flex-1 text-center py-3 px-6 font-semibold text-gray-600 hover:text-gray-900 rounded-lg transition-colors">
              Sign up
            </Link>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                id="email"
                name="email"
                type="email"
                label="Email Address"
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                fullWidth
                error={emailError}
              />

              <Input
                id="password"
                name="password"
                type="password"
                label="Password"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                fullWidth
                error={passwordError}
              />
            </div>

            <div className="flex items-center justify-between">
              <Checkbox
                id="remember-me"
                name="remember-me"
                label="Remember me"
              />

              <div className="text-sm">
                <a href="/forgot-password" className="font-medium text-red-600 hover:text-red-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
              >
                Sign in
              </Button>
            </div>

            <div className="text-center text-sm">
              <span className="text-gray-600">Don't have an account? </span>
              <Link href="/register" className="font-medium text-red-600 hover:text-red-500">
                Sign up
              </Link>
            </div>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
              </button>
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
