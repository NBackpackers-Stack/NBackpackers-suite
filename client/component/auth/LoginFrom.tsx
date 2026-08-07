"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useLogin from "@/hooks/auth/useLogin";

export default function LoginFrom() {

  const { formData, handleChange, handleSubmit } = useLogin();


  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        @keyframes flyRight {
          0% { transform: translate(0, 0) rotate(15deg); }
          50% { transform: translate(30px, -20px) rotate(15deg); }
          100% { transform: translate(0, 0) rotate(15deg); }
        }
        
        .animate-fade-in { animation: fadeIn 1s ease-out forwards; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-fly { animation: flyRight 8s ease-in-out infinite; }
      `}</style>

      <div className="flex min-h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans m-0 p-0">

        {/* Left Side: Form */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-8 md:p-12 bg-white z-10 shadow-none md:shadow-[20px_0_50px_rgba(0,0,0,0.03)] min-h-screen md:min-h-auto w-full">
          <div className="w-full max-w-sm sm:max-w-[400px] animate-fade-in opacity-0">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-slate-800 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-slate-500 mb-8 sm:mb-10 text-sm sm:text-base">
              Please enter your details to sign in.
            </p>

            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  className="peer w-full p-3.5 sm:p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm sm:text-base outline-none transition-all duration-300 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] placeholder-transparent"
                  placeholder="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm sm:text-base pointer-events-none transition-all duration-300 peer-focus:top-0 peer-focus:scale-85 peer-focus:bg-white peer-focus:px-2 peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:text-blue-600 origin-left"
                >
                  Email Address
                </label>
              </div>

              <div className="relative">
                <input
                  type="password"
                  id="password"
                  className="peer w-full p-3.5 sm:p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm sm:text-base outline-none transition-all duration-300 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] placeholder-transparent"
                  placeholder="Password"
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm sm:text-base pointer-events-none transition-all duration-300 peer-focus:top-0 peer-focus:scale-85 peer-focus:bg-white peer-focus:px-2 peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:text-blue-600 origin-left"
                >
                  Password
                </label>
              </div>

              <div className="text-right mt-[-8px]">
                <a href="#" className="text-blue-600 text-sm font-medium no-underline transition-colors duration-300 hover:text-blue-700 hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="p-3.5 sm:p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-base sm:text-lg font-semibold cursor-pointer transition-all duration-300 mt-2 shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(59,130,246,0.4)] hover:from-blue-700 hover:to-indigo-700 active:translate-y-0"
              >
                Sign In
              </button>
            </form>

            <p className="mt-6 sm:mt-8 text-center text-slate-500 text-sm sm:text-base">
              Don't have an account?{' '}
              <a href="#" className="text-blue-600 font-semibold no-underline transition-colors duration-300 hover:text-blue-700">
                Sign up
              </a>
            </p>
          </div>
        </div>

        {/* Right Side: Travel & Transparency Animation */}
        <div className="hidden md:flex flex-[1.2] relative bg-gradient-to-br from-blue-400 via-sky-300 to-indigo-400 items-center justify-center overflow-hidden">

          {/* Decorative Floating SVGs */}
          {/* Airplane */}
          <div className="absolute top-[15%] right-[20%] text-white/30 animate-fly w-40 h-40">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L3 8l6 5-4 4-3-1-1 1 3 4 4 3 1-1-1-3 4-4 5 6l1.2-.7c.4-.2.7-.6.6-1.1z" />
            </svg>
          </div>

          {/* Globe */}
          <div className="absolute bottom-[10%] left-[10%] text-white/20 animate-float w-56 h-56" style={{ animationDelay: '1s', animationDuration: '9s' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              <path d="M2 12h20" />
            </svg>
          </div>

          {/* Efficiency Graph */}
          <div className="absolute top-[30%] left-[15%] text-white/20 animate-float w-24 h-24" style={{ animationDelay: '2s', animationDuration: '7s' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
          </div>

          {/* Central Glass Card with Logo */}
          <div className="relative z-10 bg-white/40 backdrop-blur-2xl border border-white/50 p-10 md:p-12 rounded-3xl text-center max-w-[480px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] animate-float" style={{ animationDuration: '6s' }}>

            <div className="flex justify-center mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.3s' }}>
              <div className="bg-white/80 px-8 py-5 rounded-2xl shadow-sm border border-white/60">
                <Image
                  src="/backpackers.png"
                  alt="Backpackers Logo"
                  width={220}
                  height={60}
                  className="h-10 w-auto object-contain transition-transform duration-500 hover:scale-105"
                  priority
                />
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-5 text-slate-800 tracking-tight animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
              Tour & Travel Suite
            </h2>
            <p className="text-slate-700 text-lg leading-relaxed font-medium animate-fade-in opacity-0" style={{ animationDelay: '0.9s' }}>
              Your ultimate travel and operations companion. Plan adventures, automate workflows, and oversee your branches with complete <span className="text-blue-800 font-bold bg-blue-100/50 px-2 py-0.5 rounded">transparency</span> and <span className="text-indigo-800 font-bold bg-indigo-100/50 px-2 py-0.5 rounded">efficiency</span>.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
