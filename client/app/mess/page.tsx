"use client";

import React from 'react';
import Link from 'next/link';

const MessDashboardPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 mb-4">
                        Delhi Delight
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Comprehensive Mess Management System. Oversee your operations, manage inventory, track consumption, and handle staff effortlessly.
                    </p>
                </div>

                {/* Top Actions: Add Mess */}
                <div className="flex justify-center mb-16">
                    <button className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-md border border-gray-200 transition-all hover:shadow-xl hover:-translate-y-1 flex items-center gap-4 w-full max-w-md">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <div className="text-left">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">Add Mess</h3>
                            <p className="text-sm text-gray-500">Register a new mess branch</p>
                        </div>
                    </button>
                </div>

                {/* ITS Mess Section */}
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 relative overflow-hidden">
                    {/* Decorative Background Element */}
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-orange-50 rounded-full z-0 opacity-50"></div>

                    <div className="relative z-10 flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">ITS</h2>
                            <p className="text-gray-500">Active Mess Dashboard</p>
                        </div>
                    </div>

                    {/* Animated Tiles Grid for ITS */}
                    <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">

                        {/* 0. Current Stock */}
                        <Link href="/mess/inventory" className="group flex flex-col items-center p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-cyan-100">
                            <div className="w-14 h-14 mb-4 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-800 text-center text-sm sm:text-base">Current Stock</h3>
                        </Link>

                        {/* 1. Add Item */}
                        <Link href="/mess/addItems" className="group flex flex-col items-center p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-blue-100">
                            <div className="w-14 h-14 mb-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-800 text-center">Add Item</h3>
                        </Link>

                        {/* 2. Add Stock (Inventory) */}
                        <Link href="/mess/purchaseStock" className="group flex flex-col items-center p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-emerald-100">
                            <div className="w-14 h-14 mb-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-800 text-center">Purchase Stock</h3>
                        </Link>

                        {/* 3. Add Consumption */}
                        <Link href="/mess/addConsumption" className="group flex flex-col items-center p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-amber-100">
                            <div className="w-14 h-14 mb-4 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-800 text-center text-sm">Add Consump.</h3>
                        </Link>

                        {/* 4. Report */}
                        <Link href="/mess/reports" className="group flex flex-col items-center p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-purple-100">
                            <div className="w-14 h-14 mb-4 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-800 text-center">Report</h3>
                        </Link>

                        {/* 5. Managing Staff */}
                        <Link href="/mess/staff" className="group flex flex-col items-center p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-pink-100">
                            <div className="w-14 h-14 mb-4 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-800 text-center">Staff</h3>
                        </Link>

                        {/* 6. Issues */}
                        <Link href="/mess/issues" className="group flex flex-col items-center p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-red-100">
                            <div className="w-14 h-14 mb-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-red-500 group-hover:text-white transition-all duration-300 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-800 text-center">Issues</h3>
                        </Link>

                        {/* 7. Feedbacks */}
                        <Link href="/feedback/messFeedback" className="group flex flex-col items-center p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-indigo-100">
                            <div className="w-14 h-14 mb-4 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-800 text-center">Feedbacks</h3>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessDashboardPage;
