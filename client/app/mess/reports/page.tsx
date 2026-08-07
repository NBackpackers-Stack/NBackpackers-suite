"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import AnimatedLoader from '@/component/AnimatedLoader';
import { useMessReports } from '@/hooks/useMessReports';
import { ReportCard } from '@/component/MessReports/ReportCard';
import { FullscreenImageModal } from '@/component/MessReports/FullscreenImageModal';
import { FilterBar } from '@/component/MessReports/FilterBar';

export default function ReportsPage() {
    const router = useRouter();
    const {
        activeTab,
        setActiveTab,
        data,
        isLoading,
        fullscreenImage,
        setFullscreenImage,
        dateFilter,
        setDateFilter,
        itemFilter,
        setItemFilter,
        fetchReports,
        handleClearFilters
    } = useMessReports();

    return (
        <>
            {isLoading && <AnimatedLoader />}
            <div className={`min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-sans text-slate-800 pb-20 ${isLoading ? 'blur-sm pointer-events-none' : ''}`}>
                
                {/* Header with glassmorphism */}
                <div className="bg-white/80 backdrop-blur-xl px-4 md:px-6 pt-6 md:pt-10 pb-4 shadow-sm border-b border-white sticky top-0 z-30">
                    <div className="flex items-center gap-3 mb-4">
                        <button
                            onClick={() => router.back()}
                            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white shadow-sm border border-slate-100 hover:scale-105 text-slate-500 hover:text-indigo-600 transition-all active:scale-95"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 tracking-tight leading-none">Reports</h1>
                            <p className="text-slate-500 text-[10px] md:text-xs font-bold tracking-widest uppercase mt-0.5">Mess History</p>
                        </div>
                    </div>

                    {/* Animated Tabs */}
                    <div className="flex p-1 bg-slate-200/50 rounded-xl relative shadow-inner max-w-sm">
                        <div 
                            className={`absolute inset-y-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-all duration-300 ease-out ${activeTab === 'consumption' ? 'left-1' : 'left-[calc(50%+2px)]'}`}
                        ></div>
                        
                        <button
                            onClick={() => setActiveTab('consumption')}
                            className={`flex-1 py-2 text-xs md:text-sm font-bold rounded-lg transition-colors relative z-10 ${activeTab === 'consumption'
                                    ? 'text-indigo-600'
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            Consumption
                        </button>
                        <button
                            onClick={() => setActiveTab('purchase')}
                            className={`flex-1 py-2 text-xs md:text-sm font-bold rounded-lg transition-colors relative z-10 ${activeTab === 'purchase'
                                    ? 'text-emerald-600'
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            Purchases
                        </button>
                    </div>
                </div>

                {/* Content List */}
                <div className="p-3 md:p-6 max-w-3xl mx-auto space-y-4">
                    
                    <FilterBar 
                        dateFilter={dateFilter}
                        setDateFilter={setDateFilter}
                        itemFilter={itemFilter}
                        setItemFilter={setItemFilter}
                        onSearch={() => fetchReports()}
                        onClear={handleClearFilters}
                    />

                    {!isLoading && data.length === 0 ? (
                        <div className="bg-white/80 backdrop-blur-sm py-20 px-6 rounded-[2rem] text-center shadow-sm border border-slate-100/50 flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mb-5 shadow-inner">
                                <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            </div>
                            <h3 className="text-xl font-extrabold text-slate-800 mb-2">No Records Found</h3>
                            <p className="text-slate-500 font-medium">There is no history available for this category yet.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6 mt-2">
                            {data.map((record, index) => (
                                <ReportCard 
                                    key={record._id || index}
                                    record={record}
                                    activeTab={activeTab}
                                    onImageClick={setFullscreenImage}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <FullscreenImageModal 
                imageUrl={fullscreenImage} 
                onClose={() => setFullscreenImage(null)} 
            />
        </>
    );
}
