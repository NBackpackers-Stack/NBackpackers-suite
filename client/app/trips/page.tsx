import Link from 'next/link';
import React from 'react';

// Using inline SVGs for fast loading and zero dependencies
const icons = {
    status: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    create: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
    all: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
    coordinators: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    upcoming: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    expense: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    stats: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    resort: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1v2H9V7zm0 4h1v2H9v-2zm0 4h1v2H9v-2zm3-8h1v2h-1V7zm0 4h1v2h-1v-2zm0 4h1v2h-1v-2zm3-8h1v2h-1V7zm0 4h1v2h-1v-2zm0 4h1v2h-1v-2z" /></svg>
};

const tiles = [
    { title: "Trip-Status", href: "/trips/status", icon: icons.status, color: "bg-blue-50 text-blue-600", border: "border-blue-100" },
    { title: "Create trip", href: "/trips/create_trip", icon: icons.create, color: "bg-green-50 text-green-600", border: "border-green-100" },
    { title: "All trips", href: "/trips/all", icon: icons.all, color: "bg-purple-50 text-purple-600", border: "border-purple-100" },
    { title: "Tour coordinators", href: "/trips/coordinators", icon: icons.coordinators, color: "bg-orange-50 text-orange-600", border: "border-orange-100" },
    { title: "Upcoming trips", href: "/trips/upcoming", icon: icons.upcoming, color: "bg-teal-50 text-teal-600", border: "border-teal-100" },
    { title: "Expense report", href: "/trips/expenses", icon: icons.expense, color: "bg-red-50 text-red-600", border: "border-red-100" },
    { title: "Stats", href: "/trips/stats", icon: icons.stats, color: "bg-indigo-50 text-indigo-600", border: "border-indigo-100" },
    { title: "Destinations", href: "/trips/destinations", icon: icons.all, color: "bg-purple-50 text-purple-600", border: "border-indigo-100" },
    { title: "Resort Listings", href: "/trips/allResort", icon: icons.resort, color: "bg-pink-50 text-pink-600", border: "border-pink-100" },
];

export default function TripsPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-5 font-sans">
            {/* Hero Section */}
            <section className="mb-8 animate-fade-in-down">
                <div className="relative h-48 mb-5 rounded-[2rem] overflow-hidden shadow-lg border border-slate-100/50">
                    {/* Main Hero Background Image */}
                    <img
                        src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
                        alt="Travel Scenery"
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    {/* Gradient Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-900/90 pointer-events-none"></div>

                    <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                        <div>
                            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-1 drop-shadow-sm">
                                Trips Panel
                            </h1>
                            <p className="text-slate-200 text-xs sm:text-sm font-medium leading-relaxed max-w-[200px]">
                                Manage all your trips, tracking, and reports smoothly.
                            </p>
                        </div>

                        {/* Small decorative overlapping images */}
                        <div className="flex -space-x-3 mb-1">
                            <img className="w-9 h-9 rounded-full border-2 border-slate-800 object-cover shadow-sm" src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop" alt="Team member" />
                            <img className="w-9 h-9 rounded-full border-2 border-slate-800 object-cover shadow-sm" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" alt="Team member" />
                            <img className="w-9 h-9 rounded-full border-2 border-slate-800 object-cover shadow-sm" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" alt="Team member" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Tiles Grid - Mobile First */}
            <section className="grid grid-cols-2 gap-4">
                <Link
                    href="/trips/recci-tours"
                    className="col-span-2 group relative flex items-center justify-between p-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-md border border-indigo-200 hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 ease-in-out tile-animate-up overflow-hidden"
                    style={{ animationDelay: '0ms' }}
                >
                     <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
                     <div className="z-10 flex flex-col items-start">
                         <h2 className="text-xl font-bold text-white leading-tight mb-1 drop-shadow-sm">
                             RECCI Tours
                         </h2>
                         <p className="text-indigo-100 text-sm font-medium">Plan and coordinate new locations</p>
                     </div>
                     <div className="z-10 p-4 rounded-full bg-white/20 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner">
                         <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                     </div>
                </Link>

                {tiles.map((tile, index) => (
                    <Link
                        key={tile.title}
                        href={tile.href}
                        className={`
              group relative flex flex-col items-center justify-center p-5 bg-white rounded-2xl shadow-sm border ${tile.border}
              hover:shadow-md hover:-translate-y-1 active:scale-[0.97] active:shadow-sm
              transition-all duration-200 ease-in-out tile-animate-up
            `}
                        style={{ animationDelay: `${(index + 1) * 60}ms` }}
                    >
                        <div className={`p-3.5 rounded-full mb-3 ${tile.color} transition-transform duration-300 group-hover:scale-110`}>
                            {tile.icon}
                        </div>
                        <h2 className="text-[13px] font-semibold text-slate-700 text-center leading-tight">
                            {tile.title}
                        </h2>
                    </Link>
                ))}
            </section>

        </div>
    );
}
