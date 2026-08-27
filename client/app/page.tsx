"use client"

import Link from "next/link"
import WelcomeAnimation from "../component/WelcomeAnimation"
import PortalCard from "../component/PortalCard"

export default function page() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200 overflow-hidden">
      <WelcomeAnimation />

      <main className="pt-28 pb-24 px-4 md:px-8 max-w-7xl mx-auto space-y-24">

        {/* Hero Section */}
        <section className="relative flex flex-col lg:flex-row items-center gap-12 mt-4 lg:mt-12">
          {/* Text Content */}
          <div className="flex-1 space-y-8 z-10 text-center lg:text-left">
            <div className="inline-block px-5 py-2 rounded-full bg-blue-100/80 text-blue-700 font-bold text-sm tracking-widest uppercase shadow-sm border border-blue-200/50 backdrop-blur-sm">
              Discover The World
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight">
              Embark on your next <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Great Adventure
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Experience breathtaking destinations, manage your itineraries effortlessly, and join a vibrant community of passionate travelers. Your journey starts right here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link href="#development" className="px-8 py-4 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold transition-all shadow-xl shadow-gray-900/20 hover:shadow-gray-900/40 hover:-translate-y-1 text-lg">
                Start Exploring
              </Link>
            </div>
          </div>

          {/* Image Content */}
          <div className="flex-1 w-full relative group">
            <div className="relative h-[450px] lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Beautiful mountain landscape with a traveler"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            {/* Decorative abstract elements behind image */}
            <div className="absolute -z-10 -bottom-8 -right-8 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
            <div className="absolute -z-10 -top-8 -left-8 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
        </section>

        {/* Current Development Section */}
        <section id="development" className="py-16 relative">
          {/* Decorative background for the section */}
          <div className="absolute inset-0 bg-white rounded-[3rem] shadow-sm border border-slate-100 -z-10 transform scale-x-[1.02]"></div>

          <div className="text-center mb-16 space-y-4 px-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Current Development</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
              Choose your dedicated dashboard below. Plan personal travels or oversee branch operations.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 md:px-8">
            <PortalCard
              href="/trips"
              title="TRIP"
              description="Plan your next great adventure, view comprehensive itineraries, and manage all your travel details seamlessly in one unified space."
              theme="blue"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />

            <PortalCard
              href="/mess"
              title="Mess"
              description="Track mess stock levels, manage supplies, and ensure everything runs smoothly in your inventory system."
              theme="emerald"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              }
            />

            <PortalCard
              href="/manager"
              title="Manager"
              description="Access your secure administrative dashboard to oversee global bookings, manage branches, and view high-level analytics."
              theme="purple"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
            />



            <PortalCard
              href="/social-media-automation"
              title="Social Media Automation"
              description="Automate your social media presence, schedule engaging posts, and seamlessly interact with your community."
              theme="pink"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              }
            />

            <PortalCard
              href="/itinerary-generator"
              title="Itinerary Generator"
              description="Instantly create perfectly planned, customizable itineraries for any destination using our AI-powered tool."
              theme="amber"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              }
            />

            <PortalCard
              href="/same-day-excursion"
              title="Same Day Excursion"
              description="Plan quick and exciting day trips. Discover local attractions, manage bookings, and create unforgettable short getaways."
              theme="blue"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              }
            />
          </div>
        </section>

      </main>
    </div>
  )
}