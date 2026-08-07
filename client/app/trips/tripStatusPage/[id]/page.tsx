"use client"

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AnimatedLoader from '@/component/AnimatedLoader';

export default function Page() {

    const tripId = useParams();
    const router = useRouter();
    console.log("Trip ID: ", tripId);

    const [tripData, setTripData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchTripStatus();
    }, []);

    const fetchTripStatus = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`/api/get_trip/${tripId.id}`);
            console.log("Response:-------", response.data);
            setTripData(response.data.trip);
        } catch (error) {
            console.error("Error fetching trip:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
        {isLoading && <AnimatedLoader />}
        <div className={`min-h-screen flex flex-col items-center ${isLoading ? 'blur-sm pointer-events-none' : ''}`} style={{ background: "linear-gradient(180deg, #f0f4ff 0%, #fafafa 100%)" }}>
            <div className="w-full max-w-lg px-4 py-8 sm:px-6">

                {/* Back button + Header */}
                <header className="mb-8">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-slate-600 active:text-slate-800 transition-colors mb-5"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                        Back
                    </button>

                    {!isLoading && tripData && (
                        <>
                            <h1 className="text-[1.75rem] font-black text-slate-900 tracking-tight leading-tight mb-1">
                                {tripData.tripName}
                            </h1>
                            <p className="text-slate-400 text-sm font-medium">
                                {tripData.tripDate ? `📅 ${tripData.tripDate}` : "Task status overview"}
                            </p>
                        </>
                    )}
                </header>

                {!tripData && !isLoading ? (
                    <div className="text-center bg-white rounded-3xl py-16 px-8 border border-slate-100 shadow-sm">
                        <h3 className="text-xl font-bold text-slate-800 mb-1">Trip not found</h3>
                        <p className="text-slate-400 text-sm">Could not load trip details.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-8">
                        {tripData?.groups && tripData.groups.map((group: any, groupIndex: number) => (
                            <section key={groupIndex}>
                                {/* Day / Date Header */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-white shadow-sm"
                                        style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        {group.date || `Day ${groupIndex + 1}`}
                                    </div>
                                    <div className="flex-grow h-px bg-slate-200"></div>
                                </div>

                                {/* Task Cards */}
                                <div className="flex flex-col gap-3">
                                    {group.tasks && group.tasks.map((task: any, taskIndex: number) => {
                                        const isCompleted = task.status === true;

                                        return (
                                            <div
                                                key={taskIndex}
                                                className="relative bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex items-stretch"
                                            >
                                                {/* Left accent bar — green if done, amber if pending */}
                                                <div
                                                    className="w-[5px] flex-shrink-0 rounded-l-2xl"
                                                    style={{ backgroundColor: isCompleted ? "#10b981" : "#f59e0b" }}
                                                ></div>

                                                <div className="flex flex-col gap-3 p-4 flex-grow min-w-0">
                                                    {/* Row 1: Task Name + Status Badge */}
                                                    <div className="flex items-start justify-between gap-2">
                                                        <h3 className="text-[15px] font-bold text-slate-800 leading-snug line-clamp-2">
                                                            {task.name || "Unnamed Task"}
                                                        </h3>
                                                        <span
                                                            className="flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                                                            style={{
                                                                backgroundColor: isCompleted ? "#ecfdf5" : "#fffbeb",
                                                                color: isCompleted ? "#059669" : "#d97706"
                                                            }}
                                                        >
                                                            {isCompleted ? (
                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                                            ) : (
                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                            )}
                                                            {isCompleted ? "Done" : "Pending"}
                                                        </span>
                                                    </div>

                                                    {/* Row 2: Time Details */}
                                                    <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-slate-400 font-medium">
                                                        <div className="flex items-center gap-1">
                                                            <svg className="w-3.5 h-3.5 flex-shrink-0 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                            <span>Assigned: <strong className="text-slate-600">{task.time || "—"}</strong></span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <svg className="w-3.5 h-3.5 flex-shrink-0 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                            <span>Submitted: <strong className="text-slate-600">{task.submittedAt || "—"}</strong></span>
                                                        </div>
                                                    </div>

                                                    {/* Row 3: Images (if any) */}
                                                    {(task.firstImageUrl || task.secondImageUrl) && (
                                                        <div className="mt-3 flex gap-3">
                                                            {task.firstImageUrl && (
                                                                <a href={task.firstImageUrl} target="_blank" rel="noopener noreferrer" className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-xl overflow-hidden border border-slate-200 shadow-sm group flex items-center justify-center bg-slate-50">
                                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                                    <img src={task.firstImageUrl} alt="Task Evidence 1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                                        <svg className="w-5 h-5 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                                                                    </div>
                                                                </a>
                                                            )}
                                                            {task.secondImageUrl && (
                                                                <a href={task.secondImageUrl} target="_blank" rel="noopener noreferrer" className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-xl overflow-hidden border border-slate-200 shadow-sm group flex items-center justify-center bg-slate-50">
                                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                                    <img src={task.secondImageUrl} alt="Task Evidence 2" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                                        <svg className="w-5 h-5 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                                                                    </div>
                                                                </a>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        ))}
                    </div>
                )}
            </div>
        </div>
        </>
    );
}
