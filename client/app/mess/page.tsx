"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { MESS_ID } from '@/constants/mess.constants';
import { createInventory } from '@/services/inventory.services';

interface MessBranch {
    id: string;
    name: string;
    description: string;
    status: string;
}

const MessDashboardPage = () => {
    const [selectedMess, setSelectedMess] = useState<MessBranch | null>(null);

    const branches: MessBranch[] = [
        {
            id: "6a4fe5ee25faa16a764e7b2b",
            name: "ITS",
            description: "Active Mess Dashboard & Operations",
            status: "Active"
        },
        {
            id: "6aaa853e761f293372e69228",
            name: "PDDU",
            description: "Active Mess Dashboard & Operations",
            status: "Active"
        }
    ];

    const tiles = [
        {
            title: "Current Stock",
            href: "/mess/inventory",
            bgLight: "bg-cyan-100",
            textColor: "text-cyan-600",
            hoverBg: "group-hover:bg-cyan-500",
            borderColor: "hover:border-cyan-200",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
            )
        },
        {
            title: "Add Item",
            href: "/mess/addItems",
            bgLight: "bg-blue-100",
            textColor: "text-blue-600",
            hoverBg: "group-hover:bg-blue-500",
            borderColor: "hover:border-blue-200",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            title: "Purchase Stock",
            href: "/mess/purchaseStock",
            bgLight: "bg-emerald-100",
            textColor: "text-emerald-600",
            hoverBg: "group-hover:bg-emerald-500",
            borderColor: "hover:border-emerald-200",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            )
        },
        {
            title: "Add Consump.",
            href: "/mess/addConsumption",
            bgLight: "bg-amber-100",
            textColor: "text-amber-600",
            hoverBg: "group-hover:bg-amber-500",
            borderColor: "hover:border-amber-200",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
            )
        },
        {
            title: "Report",
            href: "/mess/reports",
            bgLight: "bg-purple-100",
            textColor: "text-purple-600",
            hoverBg: "group-hover:bg-purple-500",
            borderColor: "hover:border-purple-200",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        },
        {
            title: "Staff",
            href: "/mess/staff",
            bgLight: "bg-pink-100",
            textColor: "text-pink-600",
            hoverBg: "group-hover:bg-pink-500",
            borderColor: "hover:border-pink-200",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        },
        {
            title: "Issues",
            href: "/mess/issues",
            bgLight: "bg-red-100",
            textColor: "text-red-600",
            hoverBg: "group-hover:bg-red-500",
            borderColor: "hover:border-red-200",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            title: "Feedbacks",
            href: "/feedback/messFeedback",
            bgLight: "bg-indigo-100",
            textColor: "text-indigo-600",
            hoverBg: "group-hover:bg-indigo-500",
            borderColor: "hover:border-indigo-200",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
            )
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 mb-4">
                        Delhi Delight
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Comprehensive Mess Management System. Oversee your operations, manage inventory, track consumption, and handle staff effortlessly.
                    </p>
                </div>

                {/* Top Actions: Add Mess */}
                <div className="flex justify-center mb-12">
                    <button
                        onClick={async () => {
                            try {
                                alert("Creating inventory...");
                                const res = await createInventory();
                                alert("Inventory created successfully!");
                                console.log(res);
                            } catch (e) {
                                alert("Failed to create inventory. Check console.");
                                console.error(e);
                            }
                        }}
                        className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-md border border-gray-200 transition-all hover:shadow-xl hover:-translate-y-1 flex items-center gap-4 w-full max-w-md"
                    >
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

                {/* Mess Branches List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {branches.map((branch) => (
                        <div
                            key={branch.id}
                            onClick={() => setSelectedMess(branch)}
                            className="group cursor-pointer bg-white rounded-3xl p-7 shadow-md hover:shadow-2xl border border-gray-100 hover:border-orange-200 transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden flex flex-col justify-between"
                        >
                            {/* Decorative Background Blob */}
                            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-orange-50 rounded-full z-0 opacity-60 group-hover:scale-125 transition-transform duration-500"></div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-5">
                                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/25 group-hover:scale-105 group-hover:rotate-2 transition-all duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
                                        {branch.status}
                                    </span>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-2xl font-black text-gray-900 group-hover:text-orange-600 transition-colors">
                                            {branch.name}
                                        </h2>
                                        <span className="text-xs font-mono font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-md">
                                            {branch.id}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 font-medium">
                                        {branch.description}
                                    </p>
                                </div>
                            </div>

                            <div className="relative z-10 mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-orange-600 font-semibold text-sm group-hover:text-orange-700">
                                <span>Open Operations</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal with Tiles for Selected Mess */}
            {selectedMess && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-900/60 backdrop-blur-sm transition-opacity"
                    onClick={() => setSelectedMess(null)}
                >
                    <div
                        className="relative w-full max-w-4xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center text-white shadow-md shadow-orange-500/20">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-2xl font-black text-gray-900">{selectedMess.name} Mess</h3>
                                        <span className="text-xs font-mono font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-md">
                                            {selectedMess.id}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500">Select an action or module to manage</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedMess(null)}
                                className="p-2.5 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                                aria-label="Close modal"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Tiles Grid with Passed Mess ID in URL */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
                            {tiles.map((tile) => (
                                <Link
                                    key={tile.title}
                                    href={`${tile.href}?messId=${encodeURIComponent(selectedMess.id)}`}
                                    className={`group flex flex-col items-center justify-center p-5 bg-gray-50/80 rounded-2xl hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border border-transparent ${tile.borderColor}`}
                                >
                                    <div className={`w-14 h-14 mb-3 rounded-2xl ${tile.bgLight} ${tile.textColor} flex items-center justify-center group-hover:scale-110 ${tile.hoverBg} group-hover:text-white transition-all duration-200 shadow-sm`}>
                                        {tile.icon}
                                    </div>
                                    <h4 className="font-bold text-gray-800 text-center text-sm group-hover:text-gray-900">
                                        {tile.title}
                                    </h4>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessDashboardPage;
