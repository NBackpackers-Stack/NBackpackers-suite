"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AnimatedLoader from '@/component/AnimatedLoader';

export default function Page() {

    const router = useRouter();
    const [tripData, setTripData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchTripStatus();
    }, []);

    const fetchTripStatus = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get("/api/getAllTrips");
            console.log("----", response.data);

            setTripData(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleTripClick = (id: string) => {
        console.log("Trip ID clicked:", id);
        router.push(`/trips/tripStatusPage/${id}`);

    }

    const accentColors = [
        { border: "#6366f1", bg: "#eef2ff", text: "#4f46e5", label: "bg-indigo-50 text-indigo-600" },
        { border: "#10b981", bg: "#ecfdf5", text: "#059669", label: "bg-emerald-50 text-emerald-600" },
        { border: "#f59e0b", bg: "#fffbeb", text: "#d97706", label: "bg-amber-50 text-amber-600" },
        { border: "#ec4899", bg: "#fdf2f8", text: "#db2777", label: "bg-pink-50 text-pink-600" },
        { border: "#3b82f6", bg: "#eff6ff", text: "#2563eb", label: "bg-blue-50 text-blue-600" },
    ];

    return (
        <>
        {isLoading && <AnimatedLoader />}
        <div className={`min-h-screen flex flex-col items-center ${isLoading ? 'blur-sm pointer-events-none' : ''}`} style={{ background: "linear-gradient(180deg, #f0f4ff 0%, #fafafa 100%)" }}>
            <div className="w-full max-w-md px-5 py-10 sm:px-6">

                {/* Header */}
                <header className="mb-10">
                    <div
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-white mb-4 shadow-md"
                        style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        Live Status
                    </div>
                    <h1 className="text-[2.25rem] font-black text-slate-900 tracking-tight leading-[1.1] mb-2">
                        Your Trips
                    </h1>
                    <p className="text-slate-400 text-[15px] font-medium">Tap a trip to see its dashboard.</p>
                </header>

                {!isLoading && tripData.length === 0 ? (
                    <div className="text-center bg-white rounded-3xl py-16 px-8 border border-slate-100 shadow-sm">
                        <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-5" style={{ background: "linear-gradient(135deg, #eef2ff, #fdf2f8)" }}>
                            <svg className="w-9 h-9 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-1">No trips yet</h3>
                        <p className="text-slate-400 text-sm max-w-[220px] mx-auto">When trips are created, they will appear here.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {tripData.map((trip: any, index: number) => {
                            const accent = accentColors[index % accentColors.length];

                            return (
                                <div
                                    key={trip._id}
                                    onClick={() => handleTripClick(trip._id)}
                                    className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm transition-all duration-200 active:scale-[0.97] cursor-pointer flex items-stretch overflow-hidden"
                                >
                                    {/* Colored left accent strip */}
                                    <div
                                        className="w-[5px] flex-shrink-0 rounded-l-2xl"
                                        style={{ backgroundColor: accent.border }}
                                    ></div>

                                    <div className="flex items-center gap-4 p-5 flex-grow min-w-0">
                                        {/* Icon circle */}
                                        <div
                                            className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                                            style={{ backgroundColor: accent.bg }}
                                        >
                                            <svg style={{ color: accent.text }} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        </div>

                                        {/* Trip info */}
                                        <div className="flex flex-col flex-grow min-w-0">
                                            <h2 className="text-[15px] font-bold text-slate-800 leading-snug line-clamp-1 mb-1">
                                                {trip.tripName || "Untitled Trip"}
                                            </h2>
                                            <div className="flex items-center text-xs text-slate-400 font-medium">
                                                <svg className="w-3.5 h-3.5 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                <span className="truncate">{trip.tripDate || "Date not set"}</span>
                                            </div>
                                        </div>

                                        {/* Arrow */}
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-50 group-active:bg-indigo-50 flex items-center justify-center text-slate-300 group-active:text-indigo-500 transition-colors">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
        </>
    )
}