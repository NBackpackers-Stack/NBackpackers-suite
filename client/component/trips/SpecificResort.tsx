"use client";
import React from 'react';
import Link from 'next/link';
import useSpecificResort from '@/hooks/trips/useSpecificResort';

export default function SpecificResort({ id }: { id: string }) {
    const { resort, loading, error } = useSpecificResort(id);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex justify-center items-center font-sans">
                <div className="flex flex-col items-center animate-pulse">
                    <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-slate-500 font-medium">Loading Resort Details...</p>
                </div>
            </div>
        );
    }

    if (error || !resort) {
        return (
            <div className="min-h-screen bg-slate-50 flex justify-center items-center font-sans">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-100 text-center max-w-md">
                    <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Oops! Something went wrong.</h2>
                    <p className="text-slate-500">{error || "Resort not found."}</p>
                    <Link href="/trips/allResort" className="inline-block mt-6 px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors">
                        Go Back
                    </Link>
                </div>
            </div>
        );
    }

    // Helper to filter out top level non-category fields
    const excludedKeys = ['_id', '__v', 'schoolName', 'coordinatorName', 'location', 'travelDate', 'coordinatorContact', 'Resort Score', 'createdAt', 'updatedAt', 'Image documentation', 'Final Review'];
    const categories = Object.keys(resort).filter(key => !excludedKeys.includes(key) && typeof resort[key] === 'object' && resort[key] !== null);

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-5 sm:px-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-8 animate-fade-in-down">
                    <Link href="/trips/allResort" className="p-2 bg-white rounded-full shadow-sm hover:bg-slate-100 transition-colors border border-slate-200">
                        <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Report Details</h1>
                </div>

                {/* Header Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8 relative overflow-hidden animate-fade-up">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-6 mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">{resort.schoolName || "Unnamed Resort"}</h2>
                            <p className="text-slate-500 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                {resort.location || "Location not provided"}
                            </p>
                        </div>
                        <div className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-3 rounded-xl text-center">
                            <p className="text-xs font-bold uppercase tracking-wide opacity-80 mb-1">Total Score</p>
                            <p className="text-2xl font-black">{resort["Resort Score"] || 0} <span className="text-lg font-bold opacity-60">/ 65</span></p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Coordinator</p>
                            <p className="font-medium text-slate-800">{resort.coordinatorName || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Contact</p>
                            <p className="font-medium text-slate-800">{resort.coordinatorContact || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Travel Date</p>
                            <p className="font-medium text-slate-800">
                                {resort.travelDate ? new Date(resort.travelDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : "N/A"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Score Categories (Accordion) */}
                <h3 className="text-2xl font-bold text-slate-800 mb-6 px-2 animate-fade-up" style={{animationDelay: '0.1s'}}>Inspection Categories</h3>
                <div className="space-y-4 mb-10">
                    {categories.map((category, idx) => {
                        const catData = resort[category];
                        return (
                            <details key={category} className="group bg-white rounded-xl shadow-sm border border-slate-200 animate-fade-up overflow-hidden" style={{animationDelay: `${0.1 + (idx * 0.05)}s`}}>
                                <summary className="flex justify-between items-center font-bold text-lg md:text-xl cursor-pointer list-none p-5 text-indigo-900 hover:bg-slate-50 transition-colors [&::-webkit-details-marker]:hidden">
                                    {category}
                                    <span className="transition-transform duration-300 group-open:rotate-180 text-indigo-400">
                                        <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9"/></svg>
                                    </span>
                                </summary>
                                <div className="p-5 md:p-6 border-t border-slate-100 bg-slate-50/50">
                                    <ul className="space-y-4">
                                        {Object.entries(catData).map(([field, value]) => {
                                            return (
                                                <li key={field} className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm md:text-base gap-2 sm:gap-4 border-b border-slate-200/60 pb-3 last:border-0 last:pb-0">
                                                    <span className="text-slate-600 font-medium">{field}</span>
                                                    <span className="font-bold text-slate-800 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm sm:text-right self-start sm:self-auto">{String(value)}</span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </details>
                        )
                    })}
                </div>

                {/* Final Review & Images */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12 animate-fade-up" style={{animationDelay: '0.4s'}}>
                    
                    {/* Final Review */}
                    <div className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl shadow-sm border border-indigo-100 p-8">
                        <h3 className="text-xl font-bold text-indigo-900 mb-6 flex items-center gap-2">
                            <svg className="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                            Final Review
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Strengths</p>
                                <p className="text-slate-700 bg-white p-4 rounded-xl border border-indigo-50 leading-relaxed">
                                    {resort["Final Review"]?.Strengths || "None noted."}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">Critical Observations</p>
                                <p className="text-slate-700 bg-white p-4 rounded-xl border border-rose-50 leading-relaxed">
                                    {resort["Final Review"]?.["Critical observations"] || "None noted."}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Image Documentation */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            Image Documentation
                        </h3>
                        
                        {resort["Image documentation"] && Object.keys(resort["Image documentation"]).length > 0 ? (
                            <div className="grid grid-cols-2 gap-4">
                                {Object.entries(resort["Image documentation"]).map(([key, url]) => {
                                    if(typeof url === 'string' && url.startsWith('http')) {
                                        return (
                                            <a key={key} href={url} target="_blank" rel="noreferrer" className="block group relative rounded-xl overflow-hidden border border-slate-200 aspect-[4/3] bg-slate-100">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={url} alt={key} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                                                    <span className="text-white text-xs font-medium truncate">{key}</span>
                                                </div>
                                            </a>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        ) : (
                            <div className="h-full min-h-[200px] flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-100 rounded-xl">
                                <svg className="w-8 h-8 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                <p className="text-sm font-medium">No images uploaded</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
