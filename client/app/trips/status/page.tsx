"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import AnimatedLoader from '@/component/AnimatedLoader';

type FilterType = "all" | "upcoming" | "past" | "completed" | "in-progress" | "pending";
type SortType = "date-desc" | "date-asc" | "name-asc";

export default function Page() {
    const router = useRouter();
    const [tripData, setTripData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Search, Filter & Sort states
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState<FilterType>("all");
    const [sortBy, setSortBy] = useState<SortType>("date-desc");
    const [specificDate, setSpecificDate] = useState("");
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 2500);
    };

    useEffect(() => {
        fetchTripStatus();
    }, []);

    const fetchTripStatus = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get("/api/getAllTrips");
            setTripData(response.data || []);
        } catch (error) {
            console.error("Error fetching trips:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleTripClick = (id: string) => {
        router.push(`/trips/tripStatusPage/${id}`);
    };

    // Helper: Parse date strings flexibly (YYYY-MM-DD, DD/MM/YYYY, etc.)
    const parseTripDate = (dateStr?: string): Date | null => {
        if (!dateStr || typeof dateStr !== "string") return null;
        const trimmed = dateStr.trim();
        if (!trimmed) return null;

        // YYYY-MM-DD
        if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
            const [y, m, d] = trimmed.split("-").map(Number);
            return new Date(y, m - 1, d);
        }

        // DD-MM-YYYY or DD/MM/YYYY
        const dmy = trimmed.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
        if (dmy) {
            return new Date(Number(dmy[3]), Number(dmy[2]) - 1, Number(dmy[1]));
        }

        // Standard JS date parse
        const parsed = new Date(trimmed);
        if (!isNaN(parsed.getTime())) return parsed;

        // Fallback: e.g. "9 MAY" -> "9 MAY 2026"
        const withYear = new Date(`${trimmed} ${new Date().getFullYear()}`);
        if (!isNaN(withYear.getTime())) return withYear;

        return null;
    };

    // Helper: Get timestamp for sorting and filtering
    const getTripTimestamp = (trip: any): number => {
        const dateObj = parseTripDate(trip.tripDate);
        if (dateObj && !isNaN(dateObj.getTime())) {
            return dateObj.getTime();
        }
        // Fallback: MongoDB ObjectId timestamp
        if (trip._id && typeof trip._id === "string" && trip._id.length >= 8) {
            const sec = parseInt(trip._id.substring(0, 8), 16);
            if (!isNaN(sec) && sec > 0) return sec * 1000;
        }
        if (trip.createdAt) {
            const t = new Date(trip.createdAt).getTime();
            if (!isNaN(t)) return t;
        }
        return 0;
    };

    // Helper: Format date for display with relative hint
    const formatDateDisplay = (dateStr?: string) => {
        if (!dateStr) return "Date not set";
        const dateObj = parseTripDate(dateStr);
        if (!dateObj || isNaN(dateObj.getTime())) return dateStr;

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const target = new Date(dateObj);
        target.setHours(0, 0, 0, 0);
        const diffDays = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        const formatted = dateObj.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });

        if (diffDays === 0) return `${formatted} · Today`;
        if (diffDays === 1) return `${formatted} · Tomorrow`;
        if (diffDays === -1) return `${formatted} · Yesterday`;
        return formatted;
    };

    // Calculate task metrics for a trip
    const getTripTaskMetrics = (trip: any) => {
        const tasks: any[] = [];
        if (Array.isArray(trip.groups)) {
            trip.groups.forEach((g: any) => {
                if (Array.isArray(g.tasks)) {
                    tasks.push(...g.tasks);
                }
            });
        }
        const total = tasks.length;
        const completed = tasks.filter((t) => t.status === true).length;
        const isCompleted = total > 0 && completed === total;
        const isInProgress = total > 0 && completed > 0 && completed < total;
        const isPending = total > 0 && completed === 0;

        return { total, completed, isCompleted, isInProgress, isPending };
    };

    // Calculate dynamic counts for filter pills
    const filterCounts = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const startOfToday = today.getTime();

        let upcoming = 0;
        let past = 0;
        let completed = 0;
        let inProgress = 0;
        let pending = 0;

        tripData.forEach((trip) => {
            const timestamp = getTripTimestamp(trip);
            if (timestamp >= startOfToday) {
                upcoming++;
            } else if (timestamp > 0 && timestamp < startOfToday) {
                past++;
            }

            const { isCompleted, isInProgress, isPending } = getTripTaskMetrics(trip);
            if (isCompleted) completed++;
            if (isInProgress) inProgress++;
            if (isPending) pending++;
        });

        return {
            all: tripData.length,
            upcoming,
            past,
            completed,
            "in-progress": inProgress,
            pending,
        };
    }, [tripData]);

    // Filter and sort trips
    const filteredTrips = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const startOfToday = today.getTime();
        const query = searchQuery.trim().toLowerCase();

        return tripData
            .filter((trip) => {
                // Search filter (name, date, discussion)
                if (query) {
                    const nameMatch = (trip.tripName || "").toLowerCase().includes(query);
                    const dateMatch = (trip.tripDate || "").toLowerCase().includes(query);
                    const discussionMatch = (trip.tripDiscussion || "").toLowerCase().includes(query);
                    if (!nameMatch && !dateMatch && !discussionMatch) {
                        return false;
                    }
                }

                // Specific Date filter
                if (specificDate) {
                    const parsedSpecific = parseTripDate(specificDate);
                    const tripParsed = parseTripDate(trip.tripDate);
                    if (parsedSpecific && tripParsed) {
                        const isSameDate =
                            parsedSpecific.getFullYear() === tripParsed.getFullYear() &&
                            parsedSpecific.getMonth() === tripParsed.getMonth() &&
                            parsedSpecific.getDate() === tripParsed.getDate();
                        if (!isSameDate) return false;
                    } else if (trip.tripDate !== specificDate) {
                        return false;
                    }
                }

                // Category filter
                const timestamp = getTripTimestamp(trip);
                const { isCompleted, isInProgress, isPending } = getTripTaskMetrics(trip);

                if (activeFilter === "upcoming") {
                    return timestamp >= startOfToday;
                }
                if (activeFilter === "past") {
                    return timestamp > 0 && timestamp < startOfToday;
                }
                if (activeFilter === "completed") {
                    return isCompleted;
                }
                if (activeFilter === "in-progress") {
                    return isInProgress;
                }
                if (activeFilter === "pending") {
                    return isPending;
                }

                return true;
            })
            .sort((a, b) => {
                // Arrange trips: Most recent at top by default
                if (sortBy === "date-desc") {
                    return getTripTimestamp(b) - getTripTimestamp(a);
                }
                if (sortBy === "date-asc") {
                    return getTripTimestamp(a) - getTripTimestamp(b);
                }
                if (sortBy === "name-asc") {
                    return (a.tripName || "").localeCompare(b.tripName || "");
                }
                return 0;
            });
    }, [tripData, searchQuery, activeFilter, sortBy, specificDate]);

    const resetFilters = () => {
        setSearchQuery("");
        setActiveFilter("all");
        setSpecificDate("");
        setSortBy("date-desc");
    };

    const hasActiveFilters = searchQuery !== "" || activeFilter !== "all" || specificDate !== "" || sortBy !== "date-desc";

    const accentColors = [
        { border: "#6366f1", bg: "#eef2ff", text: "#4f46e5" },
        { border: "#10b981", bg: "#ecfdf5", text: "#059669" },
        { border: "#f59e0b", bg: "#fffbeb", text: "#d97706" },
        { border: "#ec4899", bg: "#fdf2f8", text: "#db2777" },
        { border: "#3b82f6", bg: "#eff6ff", text: "#2563eb" },
    ];

    const filterTabs: { id: FilterType; label: string; count: number; isWip?: boolean }[] = [
        { id: "all", label: "All", count: filterCounts.all },
        { id: "upcoming", label: "Upcoming", count: filterCounts.upcoming },
        { id: "past", label: "Past", count: filterCounts.past },
        { id: "completed", label: "Done", count: filterCounts.completed, isWip: true },
        { id: "in-progress", label: "In Progress", count: filterCounts["in-progress"], isWip: true },
        { id: "pending", label: "Pending", count: filterCounts.pending, isWip: true },
    ];

    return (
        <>
            {/* Work in progress toast notification */}
            {toastMessage && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2.5 bg-slate-900/95 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-2xl border border-slate-700/60 backdrop-blur-md transition-all">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    <span>{toastMessage}</span>
                </div>
            )}
            {isLoading && <AnimatedLoader />}
            <div
                className={`min-h-screen flex flex-col items-center pb-16 ${isLoading ? 'blur-sm pointer-events-none' : ''}`}
                style={{ background: "linear-gradient(180deg, #f0f4ff 0%, #fafafa 100%)" }}
            >
                <div className="w-full max-w-xl px-4 py-8 sm:px-6">

                    {/* Navigation Back */}
                    <div className="flex items-center justify-between mb-4">
                        <button
                            onClick={() => router.push("/trips")}
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors py-1.5 px-3 rounded-full hover:bg-white/80 border border-slate-200/60 shadow-xs"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                            </svg>
                            Trips Panel
                        </button>
                        <div
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase text-white shadow-sm"
                            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                        >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Live Status
                        </div>
                    </div>

                    {/* Header */}
                    <header className="mb-6">
                        <h1 className="text-3xl sm:text-[2.25rem] font-black text-slate-900 tracking-tight leading-[1.1] mb-1.5">
                            Your Trips
                        </h1>
                        <p className="text-slate-500 text-sm font-medium">
                            Sorted by most recent. Tap a trip to view live task progress.
                        </p>
                    </header>

                    {/* Search Box & Controls */}
                    <div className="mb-6 flex flex-col gap-3">
                        {/* Search Input Bar */}
                        <div className="relative flex items-center">
                            <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by trip name or date..."
                                className="w-full bg-white border border-slate-200/90 rounded-2xl pl-10 pr-20 py-3 text-sm font-semibold text-slate-800 placeholder-slate-400 outline-none shadow-sm focus:border-indigo-500 focus:ring-3 focus:ring-indigo-100 transition-all"
                            />
                            <div className="absolute right-2 flex items-center gap-1">
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        aria-label="Clear search"
                                        className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                                <button
                                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                                    aria-label="Toggle filters"
                                    className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors ${showAdvancedFilters || specificDate || sortBy !== "date-desc"
                                        ? "bg-indigo-50 text-indigo-600 border border-indigo-200"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                        }`}
                                    title="More filter options"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Quick Filter Tabs (Horizontal Scrollable) */}
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar pt-0.5">
                            {filterTabs.map((tab) => {
                                const isActive = activeFilter === tab.id;
                                const isWip = tab.isWip;

                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => {
                                            if (isWip) {
                                                showToast("Work in progress");
                                                return;
                                            }
                                            setActiveFilter(tab.id);
                                        }}
                                        title={isWip ? "Work in progress" : undefined}
                                        className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${isWip
                                            ? "bg-slate-100 text-slate-400 border border-slate-200/60 hover:bg-slate-200/70 cursor-pointer active:scale-[0.98]"
                                            : isActive
                                                ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                                                : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
                                            }`}
                                    >
                                        <span>{tab.label}</span>
                                        <span
                                            className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${isWip
                                                ? "bg-slate-200/70 text-slate-400"
                                                : isActive
                                                    ? "bg-indigo-700/60 text-indigo-100"
                                                    : "bg-slate-100 text-slate-500"
                                                }`}
                                        >
                                            {tab.count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Collapsible Advanced Filter & Sort Tray */}
                        {showAdvancedFilters && (
                            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm animate-fade-in flex flex-col gap-3">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {/* Sort Dropdown */}
                                    <div>
                                        <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-1">
                                            Sort By
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={sortBy}
                                                onChange={(e) => setSortBy(e.target.value as SortType)}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-300 transition-all appearance-none pr-8"
                                            >
                                                <option value="date-desc">Date: Most Recent First</option>
                                                <option value="date-asc">Date: Oldest First</option>
                                                <option value="name-asc">Trip Name (A to Z)</option>
                                            </select>
                                            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Filter by Specific Date */}
                                    <div>
                                        <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-1">
                                            Filter Specific Date
                                        </label>
                                        <div className="relative flex items-center">
                                            <input
                                                type="date"
                                                value={specificDate}
                                                onChange={(e) => setSpecificDate(e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
                                            />
                                            {specificDate && (
                                                <button
                                                    onClick={() => setSpecificDate("")}
                                                    className="absolute right-2 text-slate-400 hover:text-slate-600 p-1"
                                                    title="Clear date"
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {hasActiveFilters && (
                                    <div className="flex justify-end pt-1">
                                        <button
                                            onClick={resetFilters}
                                            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                                        >
                                            Reset all filters
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Active Filter Status & Reset Line */}
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 px-1">
                            <span>
                                Showing <strong className="text-slate-700">{filteredTrips.length}</strong> of {tripData.length} trips
                            </span>
                            {hasActiveFilters && (
                                <button
                                    onClick={resetFilters}
                                    className="text-xs text-indigo-600 hover:text-indigo-800 font-bold underline transition-colors"
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Trip List */}
                    {!isLoading && tripData.length === 0 ? (
                        <div className="text-center bg-white rounded-3xl py-16 px-8 border border-slate-100 shadow-sm">
                            <div
                                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-5"
                                style={{ background: "linear-gradient(135deg, #eef2ff, #fdf2f8)" }}
                            >
                                <svg className="w-9 h-9 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-1">No trips yet</h3>
                            <p className="text-slate-400 text-sm max-w-[220px] mx-auto">When trips are created, they will appear here.</p>
                        </div>
                    ) : !isLoading && filteredTrips.length === 0 ? (
                        <div className="text-center bg-white rounded-3xl py-14 px-8 border border-slate-100 shadow-sm">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-1">No matching trips</h3>
                            <p className="text-slate-400 text-sm max-w-[240px] mx-auto mb-5">
                                No trips matched your current search and filter criteria.
                            </p>
                            <button
                                onClick={resetFilters}
                                className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold hover:bg-indigo-100 transition-colors"
                            >
                                Reset all filters
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3.5">
                            {filteredTrips.map((trip: any, index: number) => {
                                const accent = accentColors[index % accentColors.length];
                                const { total, completed, isCompleted, isInProgress, isPending } = getTripTaskMetrics(trip);

                                return (
                                    <div
                                        key={trip._id || index}
                                        onClick={() => handleTripClick(trip._id)}
                                        className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98] cursor-pointer flex items-stretch overflow-hidden"
                                    >
                                        {/* Colored left accent strip */}
                                        <div
                                            className="w-[5px] flex-shrink-0 rounded-l-2xl"
                                            style={{ backgroundColor: accent.border }}
                                        ></div>

                                        <div className="flex items-center gap-3.5 p-4 sm:p-5 flex-grow min-w-0">
                                            {/* Icon circle */}
                                            <div
                                                className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex-shrink-0 flex items-center justify-center transition-transform group-hover:scale-105"
                                                style={{ backgroundColor: accent.bg }}
                                            >
                                                <svg
                                                    style={{ color: accent.text }}
                                                    className="w-5 h-5 sm:w-6 sm:h-6"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            </div>

                                            {/* Trip info */}
                                            <div className="flex flex-col flex-grow min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h2 className="text-[15px] font-bold text-slate-800 leading-snug line-clamp-1 group-hover:text-indigo-600 transition-colors">
                                                        {trip.tripName || "Untitled Trip"}
                                                    </h2>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 font-medium">
                                                    <div className="flex items-center text-slate-500">
                                                        <svg className="w-3.5 h-3.5 mr-1 flex-shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <span className="truncate font-semibold">{formatDateDisplay(trip.tripDate)}</span>
                                                    </div>

                                                    {/* Task Status Pill */}
                                                    {total > 0 && (
                                                        <span
                                                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${isCompleted
                                                                ? "bg-emerald-50 text-emerald-700"
                                                                : isInProgress
                                                                    ? "bg-amber-50 text-amber-700"
                                                                    : "bg-slate-100 text-slate-600"
                                                                }`}
                                                        >
                                                            {isCompleted ? (
                                                                <>
                                                                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                                    </svg>
                                                                    {total}/{total} Done
                                                                </>
                                                            ) : isInProgress ? (
                                                                <>
                                                                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                    </svg>
                                                                    {completed}/{total} Done
                                                                </>
                                                            ) : (
                                                                <>{total} Tasks</>
                                                            )}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Arrow */}
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-50 group-hover:bg-indigo-50 group-active:bg-indigo-100 flex items-center justify-center text-slate-300 group-hover:text-indigo-600 transition-colors">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                                </svg>
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
    );
}