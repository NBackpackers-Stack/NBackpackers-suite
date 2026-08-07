"use client"
import React, { useEffect } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';

import AnimatedLoader from '@/component/AnimatedLoader';

function page() {
    const router = useRouter();
    const [allDate, setAllDates] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        fetchAlltask()
    }, []);

    const fetchAlltask = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/manager/getalltask");
            console.log("Response: ", response.data);
            setAllDates(response.data.tasks)
        }
        catch (error) {
            console.log("error in getting all tasks", error);
        } finally {
            setLoading(false);
        }
    }

    const handleRowClick = (id: string) => {
        console.log("Clicked ID:", id);
        router.push(`/manager/task-status/${id}`);
    }

    const formatDateStr = (isoString: string) => {
        if (!isoString) return "";
        try {
            const d = new Date(isoString);
            if (!isNaN(d.getTime())) {
                const day = String(d.getDate()).padStart(2, '0');
                const monthStr = String(d.getMonth() + 1).padStart(2, '0');
                const year = d.getFullYear();
                return `${day}/${monthStr}/${year}`;
            }
        } catch (e) {
            // ignore
        }
        return isoString;
    }

    return (
        <>
        {loading && <AnimatedLoader />}
        <div className={`min-h-screen bg-slate-50 p-4 md:p-6 font-sans text-slate-800 ${loading ? 'blur-sm pointer-events-none' : ''}`}>
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                            Megha Caterers
                        </h1>
                        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mt-1">
                            All Manager Tasks
                        </h2>
                    </div>
                </div>

                {/* List Area */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 md:p-6">
                    {!loading && allDate.length === 0 ? (
                        <div className="py-12 text-center text-slate-400 font-medium">
                            No records found.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {allDate.map((item, idx) => (
                                <div
                                    key={item._id || idx}
                                    onClick={() => handleRowClick(item._id)}
                                    className="group cursor-pointer bg-white border border-slate-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all active:scale-95 flex items-center justify-between"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                                            {formatDateStr(item.date)}
                                        </span>
                                        <span className="text-sm font-medium text-slate-500 mt-1">
                                            {item.month}
                                        </span>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    )
}

export default page