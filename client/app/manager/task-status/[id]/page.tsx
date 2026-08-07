"use client"

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

interface Task {
    _id?: string;
    task: string;
    time?: string;
    status: "pending" | "done" | "raise";
    submittedAt?: string;
    firstImageUrl?: string;
    secondImageUrl?: string;
}

import AnimatedLoader from '@/component/AnimatedLoader';

export default function TaskStatusPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id;

    const [month, setMonth] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            fetchtask();
        }
    }, [id]);

    const fetchtask = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/manager/gettask/${id}`);
            console.log("Response: ", response.data);

            const data = response.data.tasks;
            if (data) {
                setTasks(data.tasks || []);

                let displayDate = data.date;
                if (displayDate) {
                    const d = new Date(displayDate);
                    if (!isNaN(d.getTime())) {
                        const day = String(d.getDate()).padStart(2, '0');
                        const monthStr = String(d.getMonth() + 1).padStart(2, '0');
                        const year = d.getFullYear();
                        displayDate = `${day}/${monthStr}/${year}`;
                    }
                }
                setDate(displayDate);
                setMonth(data.month);
            }
        }
        catch (error) {
            console.log("error in getting all tasks", error);
        } finally {
            setLoading(false);
        }
    }

    const getStatusStyles = (status: string) => {
        switch (status) {
            case "done":
                return "border-emerald-500 bg-emerald-50/50 shadow-emerald-100";
            case "raise":
                return "border-rose-500 bg-rose-50/50 shadow-rose-100";
            default: // pending
                return "border-amber-400 bg-amber-50/50 shadow-amber-100";
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "done":
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase tracking-wider">✅ Done</span>;
            case "raise":
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200 uppercase tracking-wider">🚨 Raised</span>;
            default:
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200 uppercase tracking-wider">⏳ Pending</span>;
        }
    }

    return (
        <>
        {loading && <AnimatedLoader />}
        <div className={`min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800 ${loading ? 'blur-sm pointer-events-none' : ''}`}>
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Header */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
                    <div className="relative z-10">
                        <button
                            onClick={() => router.back()}
                            className="text-slate-400 hover:text-indigo-600 mb-4 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Dates
                        </button>
                        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                            Megha Caterers
                        </h1>
                        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mt-1">
                            Daily Task Report
                        </h2>
                        <p className="text-slate-500 mt-2 font-medium bg-slate-100 inline-block px-3 py-1 rounded-lg text-sm">
                            {date && month ? `${date} • ${month}` : "Loading date..."}
                        </p>
                    </div>
                </div>

                {/* Tasks Grid */}
                {!loading && tasks.length === 0 ? (
                    <div className="bg-white py-20 rounded-3xl text-center shadow-sm border border-slate-100 text-slate-400 font-medium text-lg">
                        No tasks found for this date.
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {tasks.map((task, idx) => (
                            <div
                                key={idx}
                                className={`rounded-3xl border-2 p-4 md:p-5 flex flex-col md:flex-row md:items-center transition-all shadow-sm ${getStatusStyles(task.status)} gap-4 md:gap-6`}
                            >
                                {/* Task Info */}
                                <div className="flex justify-between items-start md:items-center md:w-1/3 shrink-0 gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-black text-slate-700 shadow-sm border border-slate-100 shrink-0">
                                            {idx + 1}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">Task Description</span>
                                            <p className="text-sm font-semibold text-slate-800 leading-tight line-clamp-2">
                                                {task.task || <span className="italic text-slate-400">No description</span>}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="shrink-0 block md:hidden">
                                        {getStatusBadge(task.status)}
                                    </div>
                                </div>

                                {/* Desktop Badge */}
                                <div className="hidden md:flex shrink-0 w-28 justify-center">
                                    {getStatusBadge(task.status)}
                                </div>

                                {/* Evidence Images */}
                                <div className="bg-white/60 p-2 md:p-3 rounded-2xl border border-white/50 shadow-sm flex-grow min-w-0">
                                    <div className="flex gap-3 justify-center md:justify-start items-center">
                                        {task.firstImageUrl || task.secondImageUrl ? (
                                            <>
                                                {task.firstImageUrl && (
                                                    <div 
                                                        onClick={() => setFullscreenImage(task.firstImageUrl || null)}
                                                        className="w-24 md:w-32 aspect-video rounded-xl overflow-hidden border-2 border-white shadow-sm relative group cursor-pointer shrink-0"
                                                    >
                                                        <img src={task.firstImageUrl} alt="Evidence 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                )}
                                                {task.secondImageUrl && (
                                                    <div 
                                                        onClick={() => setFullscreenImage(task.secondImageUrl || null)}
                                                        className="w-24 md:w-32 aspect-video rounded-xl overflow-hidden border-2 border-white shadow-sm relative group cursor-pointer shrink-0"
                                                    >
                                                        <img src={task.secondImageUrl} alt="Evidence 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <div className="w-full text-center text-slate-400 italic text-xs font-medium">
                                                No images attached
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Footer (Submission Time) */}
                                <div className="md:w-32 shrink-0 border-t md:border-t-0 md:border-l border-slate-200/50 pt-3 md:pt-0 md:pl-6 flex md:flex-col justify-between md:justify-center items-center gap-1">
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Submitted
                                    </div>
                                    <div className="text-sm font-black text-slate-700">
                                        {task.submittedAt
                                            ? new Date(task.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                            : <span className="text-slate-400 font-medium text-xs">--:--</span>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Fullscreen Image Modal */}
            {fullscreenImage && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4 md:p-8"
                    onClick={() => setFullscreenImage(null)}
                >
                    <button 
                        className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-all z-[60]"
                        onClick={(e) => { e.stopPropagation(); setFullscreenImage(null); }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <img 
                        src={fullscreenImage} 
                        alt="Fullscreen Evidence" 
                        className="max-w-full max-h-full object-contain rounded-xl shadow-2xl relative z-50"
                        onClick={(e) => e.stopPropagation()} 
                    />
                </div>
            )}
        </div>
        </>
    );
}
