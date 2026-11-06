"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AnimatedLoader from "@/component/AnimatedLoader";
import { useTripReport, ReportStatusFilter, ReportSortOption, ITripStats } from "@/hooks/trips/useTripReport";

export default function TripReportView() {
    const router = useRouter();
    const {
        isLoading,
        error,
        tripsStats,
        allTripsStats,
        currentMetrics,
        availableMonths,
        selectedMonth,
        setSelectedMonth,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        sortBy,
        setSortBy,
        expandedTripId,
        toggleExpandTrip,
        resetFilters,
        refetch,
    } = useTripReport();

    const filterTabs: { id: ReportStatusFilter; label: string; count: number }[] = [
        { id: "all", label: "All Status", count: currentMetrics.totalTrips },
        { id: "completed", label: "100% Done", count: currentMetrics.completedTripsCount },
        { id: "in-progress", label: "In Progress", count: currentMetrics.inProgressTripsCount },
        { id: "pending", label: "Not Started", count: currentMetrics.pendingTripsCount },
    ];

    const activeMonthObj = availableMonths.find((m) => m.key === selectedMonth);

    return (
        <>
            {isLoading && <AnimatedLoader />}
            <div
                className={`min-h-screen flex flex-col items-center pt-24 sm:pt-28 pb-16 ${isLoading ? "blur-sm pointer-events-none" : ""}`}
                style={{ background: "linear-gradient(180deg, #f0f4ff 0%, #fafafa 100%)" }}
            >
                <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">

                    {/* Navigation Top Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => router.push("/trips/status")}
                                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors py-1.5 px-3.5 rounded-full bg-white/90 hover:bg-white border border-slate-200/80 shadow-xs active:scale-95 cursor-pointer"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to Status
                            </button>
                            <button
                                onClick={() => router.push("/trips")}
                                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors py-1.5 px-3 rounded-full hover:bg-white/80 border border-slate-200/60 shadow-xs"
                            >
                                Trips Panel
                            </button>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={refetch}
                                title="Refresh report data"
                                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-indigo-600 py-1.5 px-3 rounded-full bg-white/80 border border-slate-200/70 hover:border-indigo-200 shadow-xs transition-all active:scale-95 cursor-pointer"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Refresh
                            </button>
                            <div
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase text-white shadow-sm"
                                style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                Brief Report
                            </div>
                        </div>
                    </div>

                    {/* Header */}
                    <header className="mb-6">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
                            <span className="text-[11px] font-bold tracking-widest uppercase text-indigo-600">Executive Task Analytics</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-2">
                            Trips Brief Report
                        </h1>
                        <p className="text-slate-500 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
                            Visualizing tasks done out of total tasks per trip with month-wise filtering and detailed milestone progress.
                        </p>
                    </header>

                    {error && (
                        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center justify-between">
                            <span>{error}</span>
                            <button onClick={refetch} className="font-bold underline text-xs">Retry</button>
                        </div>
                    )}

                    {/* ── MONTH-WISE FILTER BAR ── */}
                    <div className="mb-7 bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
                            <div className="flex items-center gap-2">
                                <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </span>
                                <div>
                                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
                                        Month-Wise Filter
                                    </h3>
                                    <p className="text-[11px] text-slate-400 font-medium">
                                        Displaying trips grouped by month instead of all at once
                                    </p>
                                </div>
                            </div>

                            {activeMonthObj && selectedMonth !== "all" && (
                                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60 self-start sm:self-auto">
                                    {activeMonthObj.tripsCount} trips • {activeMonthObj.completedTasks}/{activeMonthObj.totalTasks} tasks ({activeMonthObj.completionRate}%)
                                </span>
                            )}
                        </div>

                        {/* Month Pills Tabs */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                            {availableMonths.map((m) => {
                                const isSelected = selectedMonth === m.key;
                                return (
                                    <button
                                        key={m.key}
                                        onClick={() => setSelectedMonth(m.key)}
                                        className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                            isSelected
                                                ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200 scale-102"
                                                : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/70"
                                        }`}
                                    >
                                        <span>{m.label}</span>
                                        <span
                                            className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                                                isSelected ? "bg-white/20 text-white" : "bg-slate-200/80 text-slate-700"
                                            }`}
                                        >
                                            {m.tripsCount}
                                        </span>
                                    </button>
                                );
                            })}

                            {/* View All Months option */}
                            <button
                                onClick={() => setSelectedMonth("all")}
                                className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                    selectedMonth === "all"
                                        ? "bg-slate-900 text-white shadow-sm scale-102"
                                        : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200/70"
                                }`}
                            >
                                <span>Show All Months</span>
                                <span
                                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                                        selectedMonth === "all" ? "bg-white/20 text-white" : "bg-slate-200/80 text-slate-600"
                                    }`}
                                >
                                    {allTripsStats.length}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* ── KPI METRICS CARDS ── */}
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-7">
                        {/* Overall Completion Card */}
                        <div className="col-span-2 sm:col-span-1 bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm relative overflow-hidden flex flex-col justify-between">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none -mr-6 -mt-6"></div>
                            <div>
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                                    {selectedMonth === "all" ? "All Trips Progress" : `${activeMonthObj?.label || "Month"} Progress`}
                                </span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl sm:text-4xl font-black text-indigo-600 tracking-tight">
                                        {currentMetrics.overallCompletionRate}%
                                    </span>
                                    <span className="text-xs font-semibold text-slate-500">done</span>
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-700 ease-out"
                                        style={{ width: `${currentMetrics.overallCompletionRate}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1.5 font-medium">
                                    <span>{currentMetrics.totalCompletedTasks} completed</span>
                                    <span>{currentMetrics.totalTasks} total tasks</span>
                                </div>
                            </div>
                        </div>

                        {/* Total Trips */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
                            <div>
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                                    Active Trips
                                </span>
                                <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                                    {currentMetrics.totalTrips}
                                </span>
                            </div>
                            <div className="mt-2.5 flex flex-wrap gap-1.5">
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                                    {currentMetrics.completedTripsCount} done
                                </span>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                                    {currentMetrics.inProgressTripsCount} active
                                </span>
                            </div>
                        </div>

                        {/* Tasks Ratio */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
                            <div>
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                                    Tasks Completed
                                </span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight">
                                        {currentMetrics.totalCompletedTasks}
                                    </span>
                                    <span className="text-slate-400 text-sm font-bold">
                                        / {currentMetrics.totalTasks}
                                    </span>
                                </div>
                            </div>
                            <div className="mt-2.5 text-[11px] text-slate-500 font-medium">
                                {currentMetrics.totalPendingTasks} tasks remaining
                            </div>
                        </div>

                        {/* Photo Verification */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
                            <div>
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                                    Photos Uploaded
                                </span>
                                <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                                    {currentMetrics.totalPhotosUploaded}
                                </span>
                            </div>
                            <div className="mt-2.5 text-[11px] text-slate-500 font-medium">
                                verified checklist proofs
                            </div>
                        </div>
                    </div>

                    {/* ── FILTER & SEARCH CONTROLS ── */}
                    <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                        {/* Search Input */}
                        <div className="relative flex-1">
                            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search in this month by trip name, coordinator..."
                                className="w-full bg-white border border-slate-200/90 rounded-2xl pl-10 pr-10 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 outline-none shadow-xs focus:border-indigo-500 focus:ring-3 focus:ring-indigo-100 transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        {/* Sort Selector */}
                        <div className="flex items-center gap-2">
                            <label className="text-xs font-bold text-slate-500 shrink-0">Sort:</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as ReportSortOption)}
                                className="bg-white border border-slate-200/90 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 outline-none shadow-xs cursor-pointer focus:border-indigo-500"
                            >
                                <option value="progress-desc">Highest Progress</option>
                                <option value="progress-asc">Lowest Progress</option>
                                <option value="tasks-desc">Most Tasks</option>
                                <option value="date-desc">Trip Date</option>
                                <option value="name-asc">Trip Name (A-Z)</option>
                            </select>
                        </div>
                    </div>

                    {/* Status Tabs */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 scrollbar-none">
                        {filterTabs.map((tab) => {
                            const isActive = statusFilter === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setStatusFilter(tab.id)}
                                    className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                                        isActive
                                            ? "bg-slate-900 text-white shadow-sm scale-102"
                                            : "bg-white text-slate-600 hover:bg-slate-100/80 border border-slate-200/60"
                                    }`}
                                >
                                    <span>{tab.label}</span>
                                    <span
                                        className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                                            isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                                        }`}
                                    >
                                        {tab.count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* ── DETAILED TRIP BREAKDOWN CARDS: 3-COL (BIG DISPLAY) / 2-COL (TAB) / 1-COL (SMARTPHONE) ── */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-1">
                            <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                                Detailed Trip Cards ({tripsStats.length})
                            </h3>
                            {selectedMonth !== "all" && (
                                <span className="text-[11px] text-slate-400 font-medium">
                                    Filtered by: <span className="font-bold text-slate-700">{activeMonthObj?.label || selectedMonth}</span>
                                </span>
                            )}
                        </div>

                        {tripsStats.length === 0 ? (
                            <div className="bg-white rounded-3xl p-10 text-center border border-slate-200/80 shadow-xs">
                                <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-base font-bold text-slate-800 mb-1">No trips found in this month/filter</h3>
                                <p className="text-slate-500 text-xs sm:text-sm mb-4">
                                    Try selecting "Show All Months" or clearing your search filters.
                                </p>
                                <button
                                    onClick={resetFilters}
                                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                                {tripsStats.map((item: ITripStats) => {
                                    const isExpanded = expandedTripId === item.trip._id;
                                    const isDone = item.statusCategory === "completed";
                                    const isInProgress = item.statusCategory === "in-progress";

                                    return (
                                        <div
                                            key={item.trip._id}
                                            className={`bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between ${
                                                isExpanded ? "col-span-1 md:col-span-2 lg:col-span-3 ring-2 ring-indigo-500/20" : "col-span-1"
                                            }`}
                                        >
                                            {/* Card Header & Main Progress */}
                                            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex items-start justify-between gap-2 mb-2">
                                                        <div className="min-w-0">
                                                            <div className="flex items-center gap-1.5 mb-1">
                                                                <span
                                                                    className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                                                                        isDone
                                                                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                                            : isInProgress
                                                                            ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                                                                            : "bg-amber-50 text-amber-700 border-amber-200"
                                                                    }`}
                                                                >
                                                                    {isDone ? "Completed" : isInProgress ? "In Progress" : "Pending"}
                                                                </span>
                                                            </div>
                                                            <h3 className="text-base font-black text-slate-900 tracking-tight leading-snug line-clamp-2">
                                                                {item.trip.tripName || "Untitled Trip"}
                                                            </h3>
                                                        </div>

                                                        {/* Live View Button */}
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                router.push(`/trips/tripStatusPage/${item.trip._id}`);
                                                            }}
                                                            className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100/70 px-2.5 py-1 rounded-lg border border-indigo-200/50 transition-all shrink-0 cursor-pointer"
                                                            title="Open real-time status page"
                                                        >
                                                            <span>Live</span>
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                            </svg>
                                                        </button>
                                                    </div>

                                                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-400 font-medium mb-3">
                                                        {item.trip.tripDate && (
                                                            <span className="flex items-center gap-1 text-slate-500">
                                                                <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                                {item.trip.tripDate}
                                                            </span>
                                                        )}
                                                        {item.totalDays > 0 && (
                                                            <span>• {item.totalDays}d</span>
                                                        )}
                                                        {item.trip.tripCoordinatorId && (
                                                            <span className="truncate max-w-[140px]">• Coord: <span className="font-semibold text-slate-600">{item.trip.tripCoordinatorId}</span></span>
                                                        )}
                                                    </div>

                                                    {/* Discussion note if present */}
                                                    {item.trip.tripDiscussion && (
                                                        <p className="text-xs text-slate-500 mb-3 line-clamp-2 italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                                                            "{item.trip.tripDiscussion}"
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Progress Bar & Ratio Highlight */}
                                                <div>
                                                    <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/60 mb-3">
                                                        <div className="flex items-center justify-between mb-1.5">
                                                            <div className="flex items-baseline gap-1.5">
                                                                <span className="text-xs sm:text-sm font-extrabold text-slate-800">
                                                                    {item.completedTasks} / {item.totalTasks} tasks
                                                                </span>
                                                                <span className="text-[10px] font-medium text-slate-400">
                                                                    ({item.pendingTasks} left)
                                                                </span>
                                                            </div>
                                                            <span className="text-xs sm:text-sm font-black text-indigo-600">
                                                                {item.completionRate}%
                                                            </span>
                                                        </div>
                                                        <div className="h-2 w-full bg-slate-200/80 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full rounded-full transition-all duration-500 ${
                                                                    isDone
                                                                        ? "bg-emerald-500"
                                                                        : item.completionRate > 50
                                                                        ? "bg-indigo-600"
                                                                        : item.completionRate > 0
                                                                        ? "bg-amber-500"
                                                                        : "bg-slate-300"
                                                                }`}
                                                                style={{ width: `${item.completionRate}%` }}
                                                            ></div>
                                                        </div>

                                                        {/* Mini Day pills preview */}
                                                        {item.daysBreakdown.length > 0 && (
                                                            <div className="flex flex-wrap items-center gap-1.5 mt-2.5 pt-2 border-t border-slate-200/50">
                                                                {item.daysBreakdown.map((day, idx) => (
                                                                    <div
                                                                        key={idx}
                                                                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                                                                            day.totalTasks > 0 && day.completedTasks === day.totalTasks
                                                                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                                                : day.completedTasks > 0
                                                                                ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                                                                                : "bg-white text-slate-600 border-slate-200"
                                                                        }`}
                                                                    >
                                                                        <span className="truncate max-w-[80px]">{day.date}:</span>
                                                                        <span className="font-extrabold">{day.completedTasks}/{day.totalTasks}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Toggle breakdown button */}
                                                    <button
                                                        onClick={() => toggleExpandTrip(item.trip._id)}
                                                        className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/70 py-2 rounded-xl border border-slate-200 transition-all cursor-pointer"
                                                    >
                                                        <span>{isExpanded ? "Hide Day Breakdown" : "View Day Breakdown"}</span>
                                                        <svg
                                                            className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Expandable Detailed Breakdown Section */}
                                            {isExpanded && (
                                                <div className="bg-slate-50/70 border-t border-slate-200/80 p-4 sm:p-5 animate-in fade-in duration-200">
                                                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
                                                        <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                        </svg>
                                                        Day-by-Day Task Checklist
                                                    </h4>

                                                    {item.daysBreakdown.length === 0 ? (
                                                        <p className="text-xs text-slate-400 italic">No days or tasks configured for this trip.</p>
                                                    ) : (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                            {item.daysBreakdown.map((dayGroup, gIdx) => (
                                                                <div
                                                                    key={gIdx}
                                                                    className="bg-white rounded-xl p-3 border border-slate-200/70 shadow-2xs"
                                                                >
                                                                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                                                                            <span className="text-xs font-black text-slate-800">
                                                                                {dayGroup.date}
                                                                            </span>
                                                                        </div>
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="text-[11px] font-bold text-slate-600">
                                                                                {dayGroup.completedTasks} / {dayGroup.totalTasks}
                                                                            </span>
                                                                            <span
                                                                                className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded ${
                                                                                    dayGroup.completionRate === 100
                                                                                        ? "bg-emerald-100 text-emerald-800"
                                                                                        : dayGroup.completionRate > 0
                                                                                        ? "bg-indigo-100 text-indigo-800"
                                                                                        : "bg-slate-100 text-slate-600"
                                                                                }`}
                                                                            >
                                                                                {dayGroup.completionRate}%
                                                                            </span>
                                                                        </div>
                                                                    </div>

                                                                    {/* Task item list */}
                                                                    <div className="divide-y divide-slate-100">
                                                                        {dayGroup.tasks.map((task, tIdx) => (
                                                                            <div
                                                                                key={task._id || tIdx}
                                                                                className="py-2 flex items-start justify-between gap-3 text-xs"
                                                                            >
                                                                                <div className="flex items-start gap-2 min-w-0">
                                                                                    <span
                                                                                        className={`shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5 ${
                                                                                            task.status
                                                                                                ? "bg-emerald-500 text-white"
                                                                                                : "bg-slate-200 text-slate-400"
                                                                                        }`}
                                                                                    >
                                                                                        {task.status ? "✓" : "•"}
                                                                                    </span>
                                                                                    <div>
                                                                                        <p className={`font-bold ${task.status ? "text-slate-800" : "text-slate-600"}`}>
                                                                                            {task.name}
                                                                                        </p>
                                                                                        {task.description && (
                                                                                            <p className="text-[11px] text-slate-400 line-clamp-1">
                                                                                                {task.description}
                                                                                            </p>
                                                                                        )}
                                                                                        {task.userRemark && (
                                                                                            <p className="text-[10px] text-indigo-600 font-semibold mt-0.5">
                                                                                                Remark: "{task.userRemark}"
                                                                                            </p>
                                                                                        )}
                                                                                    </div>
                                                                                </div>

                                                                                <div className="shrink-0 flex items-center gap-2">
                                                                                    {task.time && (
                                                                                        <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                                                                                            {task.time}
                                                                                        </span>
                                                                                    )}
                                                                                    {(task.firstImageUrl || task.secondImageUrl) && (
                                                                                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-200/50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                                                                            📷 Photo
                                                                                        </span>
                                                                                    )}
                                                                                    <span
                                                                                        className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                                                                            task.status
                                                                                                ? "bg-emerald-50 text-emerald-700"
                                                                                            : "bg-slate-100 text-slate-500"
                                                                                        }`}
                                                                                    >
                                                                                        {task.status ? "Done" : "Pending"}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
}
