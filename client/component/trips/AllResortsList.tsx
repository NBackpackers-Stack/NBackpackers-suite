"use client";
import React from 'react';
import Link from 'next/link';
import useAllResorts from '@/hooks/trips/useAllResorts';

export default function AllResortsList() {
    const { resorts, loading, error, handleResortClick } = useAllResorts();

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex justify-center items-center font-sans">
                <div className="flex flex-col items-center animate-pulse">
                    <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-slate-500 font-medium">Loading Resorts...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 flex justify-center items-center font-sans">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-100 text-center max-w-md">
                    <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Oops! Something went wrong.</h2>
                    <p className="text-slate-500">{error}</p>
                    <button onClick={() => window.location.reload()} className="mt-6 px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors">Try Again</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-5 sm:px-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 animate-fade-in-down">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Link href="/trips" className="p-2 bg-white rounded-full shadow-sm hover:bg-slate-100 transition-colors border border-slate-200">
                                <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </Link>
                            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">RECCI Reports</h1>
                        </div>
                        <p className="text-slate-500 ml-11">Overview of all inspected hotels and resorts.</p>
                    </div>
                </div>

                {resorts.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm animate-fade-up">
                        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-10 h-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">No Reports Found</h3>
                        <p className="text-slate-500 mt-2">There are currently no RECCI reports available.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resorts.map((resort, idx) => (
                            <div
                                key={resort._id}
                                onClick={() => handleResortClick(resort._id)}
                                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 cursor-pointer flex flex-col relative animate-fade-up"
                                style={{ animationDelay: `${idx * 0.05}s` }}
                            >
                                {/* Decorative Top Gradient */}
                                <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-80 group-hover:opacity-100 transition-opacity"></div>

                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                                            {resort.schoolName}
                                        </h3>
                                        <div className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg text-sm font-bold shadow-sm whitespace-nowrap flex items-center gap-1 border border-indigo-100">
                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                            {resort["Resort Score"] || 0}/65
                                        </div>
                                    </div>

                                    <div className="space-y-2.5 mb-6">
                                        <div className="flex items-center text-slate-600 text-sm">
                                            <svg className="w-4 h-4 mr-2.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                            <span className="font-medium">{resort.coordinatorName || "Unknown"}</span>
                                        </div>
                                        <div className="flex items-center text-slate-600 text-sm">
                                            <svg className="w-4 h-4 mr-2.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                            <span className="capitalize">{resort.location || "N/A"}</span>
                                        </div>
                                        <div className="flex items-center text-slate-600 text-sm">
                                            <svg className="w-4 h-4 mr-2.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            {resort.travelDate ? new Date(resort.travelDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : "Not Set"}
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="h-px w-full bg-slate-100 mb-4 mt-auto"></div>

                                    <div className="text-sm">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Final Review</p>
                                        <p className="text-slate-600 line-clamp-2 leading-relaxed">
                                            {resort["Final Review"]?.Strengths || resort["Final Review"]?.["Critical observations"] || "No final remarks provided."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
