'use client';

import React from 'react';
import Link from 'next/link';
import { MessFeedbackTable } from '@/component/feedback/MessFeedbackTable';

export default function MessFeedbackPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient Background Blur Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-50/80 to-transparent z-0 pointer-events-none"></div>
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl z-0 pointer-events-none mix-blend-multiply"></div>
      <div className="absolute top-[20%] left-[-10%] w-72 h-72 bg-blue-200/40 rounded-full blur-3xl z-0 pointer-events-none mix-blend-multiply"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Navigation / Back Button */}
        <div className="mb-6">
          <Link href="/mess" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-all bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full shadow-sm border border-gray-200/60 hover:shadow-md hover:-translate-y-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        {/* Premium Header Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 shadow-xl shadow-indigo-100/40 border border-white/50 mb-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
          {/* Decorative subtle pattern */}
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-400 via-transparent to-transparent group-hover:opacity-30 transition-opacity duration-700"></div>

          <div className="flex items-start sm:items-center gap-6 z-10 w-full flex-col sm:flex-row">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 flex-shrink-0 transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 mb-3 tracking-tight">
                Mess Feedback
              </h1>
              <p className="text-base text-gray-500 max-w-2xl font-medium leading-relaxed">
                Review and analyze all feedback submitted by students. Stay connected with their concerns and suggestions to continually improve the dining experience.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative z-10">
          <MessFeedbackTable />
        </div>
      </div>
    </div>
  );
}
