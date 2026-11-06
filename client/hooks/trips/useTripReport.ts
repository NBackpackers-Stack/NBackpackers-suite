"use client";

import { useEffect, useMemo, useState } from "react";
import { tripReportService, ITripReportItem, ITask, IDayGroup } from "@/services/tripReport.service";

export type ReportStatusFilter = "all" | "completed" | "in-progress" | "pending";
export type ReportSortOption = "progress-desc" | "progress-asc" | "tasks-desc" | "date-desc" | "name-asc";

export interface IDayBreakdown {
    date: string;
    totalTasks: number;
    completedTasks: number;
    completionRate: number;
    tasks: ITask[];
}

export interface ITripStats {
    trip: ITripReportItem;
    totalTasks: number;
    completedTasks: number;
    pendingTasks: number;
    completionRate: number;
    totalDays: number;
    photosUploadedCount: number;
    remarksCount: number;
    statusCategory: "completed" | "in-progress" | "pending";
    daysBreakdown: IDayBreakdown[];
    dateObj: Date | null;
    monthKey: string;
    monthLabel: string;
}

export interface IMonthOption {
    key: string;
    label: string;
    tripsCount: number;
    totalTasks: number;
    completedTasks: number;
    completionRate: number;
}

export const parseTripDate = (dateStr?: string): Date | null => {
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

    // Standard JS date parse (e.g. "26 September 2026")
    const parsed = new Date(trimmed);
    if (!isNaN(parsed.getTime())) return parsed;

    // Fallback: e.g. "9 MAY" -> "9 MAY 2026"
    const withYear = new Date(`${trimmed} ${new Date().getFullYear()}`);
    if (!isNaN(withYear.getTime())) return withYear;

    return null;
};

const getTripDateObj = (trip: ITripReportItem): Date | null => {
    let d = parseTripDate(trip.tripDate);
    if (d) return d;

    if (Array.isArray(trip.groups) && trip.groups.length > 0) {
        for (const g of trip.groups) {
            d = parseTripDate(g.date);
            if (d) return d;
        }
    }

    if (trip.createdAt) {
        const parsed = new Date(trip.createdAt);
        if (!isNaN(parsed.getTime())) return parsed;
    }

    if (trip._id && typeof trip._id === "string" && trip._id.length >= 8) {
        const sec = parseInt(trip._id.substring(0, 8), 16);
        if (!isNaN(sec) && sec > 0) return new Date(sec * 1000);
    }

    return null;
};

export const useTripReport = () => {
    const [trips, setTrips] = useState<ITripReportItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Filters and controls
    const [selectedMonth, setSelectedMonth] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<ReportStatusFilter>("all");
    const [sortBy, setSortBy] = useState<ReportSortOption>("progress-desc");
    const [expandedTripId, setExpandedTripId] = useState<string | null>(null);

    const fetchReports = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await tripReportService.fetchTripsReport();
            setTrips(data || []);
        } catch (err: any) {
            console.error("Failed to load trips report:", err);
            setError(err?.message || "Failed to fetch trip reports");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    // Calculate detailed stats for each trip
    const allTripsStats: ITripStats[] = useMemo(() => {
        return trips.map((trip) => {
            const allTasks: ITask[] = [];
            const daysBreakdown: IDayBreakdown[] = [];

            if (Array.isArray(trip.groups)) {
                trip.groups.forEach((group: IDayGroup, index: number) => {
                    const groupTasks = Array.isArray(group.tasks) ? group.tasks : [];
                    allTasks.push(...groupTasks);

                    const groupTotal = groupTasks.length;
                    const groupCompleted = groupTasks.filter((t) => t.status === true).length;
                    const groupRate = groupTotal > 0 ? Math.round((groupCompleted / groupTotal) * 100) : 0;

                    daysBreakdown.push({
                        date: group.date || `Day ${index + 1}`,
                        totalTasks: groupTotal,
                        completedTasks: groupCompleted,
                        completionRate: groupRate,
                        tasks: groupTasks,
                    });
                });
            }

            const totalTasks = allTasks.length;
            const completedTasks = allTasks.filter((t) => t.status === true).length;
            const pendingTasks = totalTasks - completedTasks;
            const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

            const photosUploadedCount = allTasks.filter(
                (t) => (t.firstImageUrl && t.firstImageUrl.trim() !== "") || (t.secondImageUrl && t.secondImageUrl.trim() !== "")
            ).length;

            const remarksCount = allTasks.filter(
                (t) => t.userRemark && t.userRemark.trim() !== ""
            ).length;

            let statusCategory: "completed" | "in-progress" | "pending" = "pending";
            if (totalTasks > 0 && completedTasks === totalTasks) {
                statusCategory = "completed";
            } else if (completedTasks > 0) {
                statusCategory = "in-progress";
            }

            const dateObj = getTripDateObj(trip);
            let monthKey = "undated";
            let monthLabel = "Undated / Other";

            if (dateObj) {
                const year = dateObj.getFullYear();
                const month = dateObj.getMonth() + 1;
                monthKey = `${year}-${String(month).padStart(2, "0")}`;
                monthLabel = dateObj.toLocaleDateString("en-US", { month: "long", year: "numeric" });
            }

            return {
                trip,
                totalTasks,
                completedTasks,
                pendingTasks,
                completionRate,
                totalDays: daysBreakdown.length,
                photosUploadedCount,
                remarksCount,
                statusCategory,
                daysBreakdown,
                dateObj,
                monthKey,
                monthLabel,
            };
        });
    }, [trips]);

    // Available months list grouped and sorted
    const availableMonths: IMonthOption[] = useMemo(() => {
        const monthMap = new Map<string, { label: string; tripsCount: number; totalTasks: number; completedTasks: number; sortTimestamp: number }>();

        allTripsStats.forEach((t) => {
            const key = t.monthKey;
            const label = t.monthLabel;
            const sortTimestamp = t.dateObj ? t.dateObj.getTime() : 0;

            if (!monthMap.has(key)) {
                monthMap.set(key, { label, tripsCount: 0, totalTasks: 0, completedTasks: 0, sortTimestamp });
            }

            const existing = monthMap.get(key)!;
            existing.tripsCount += 1;
            existing.totalTasks += t.totalTasks;
            existing.completedTasks += t.completedTasks;
            if (sortTimestamp > existing.sortTimestamp) {
                existing.sortTimestamp = sortTimestamp;
            }
        });

        const list: IMonthOption[] = Array.from(monthMap.entries()).map(([key, data]) => ({
            key,
            label: data.label,
            tripsCount: data.tripsCount,
            totalTasks: data.totalTasks,
            completedTasks: data.completedTasks,
            completionRate: data.totalTasks > 0 ? Math.round((data.completedTasks / data.totalTasks) * 100) : 0,
        }));

        // Sort descending: most recent month first, "undated" at end
        list.sort((a, b) => {
            if (a.key === "undated") return 1;
            if (b.key === "undated") return -1;
            return b.key.localeCompare(a.key);
        });

        return list;
    }, [allTripsStats]);

    // Set default month to most recent available month if not set
    useEffect(() => {
        if (!selectedMonth && availableMonths.length > 0) {
            setSelectedMonth(availableMonths[0].key);
        }
    }, [availableMonths, selectedMonth]);

    // Trips filtered by month first (month-wise view)
    const monthFilteredTrips = useMemo(() => {
        if (!selectedMonth || selectedMonth === "all") {
            return allTripsStats;
        }
        return allTripsStats.filter((t) => t.monthKey === selectedMonth);
    }, [allTripsStats, selectedMonth]);

    // Metrics for the currently selected view
    const currentMetrics = useMemo(() => {
        const totalTrips = monthFilteredTrips.length;
        const totalTasks = monthFilteredTrips.reduce((sum, item) => sum + item.totalTasks, 0);
        const totalCompletedTasks = monthFilteredTrips.reduce((sum, item) => sum + item.completedTasks, 0);
        const totalPendingTasks = totalTasks - totalCompletedTasks;
        const overallCompletionRate = totalTasks > 0 ? Math.round((totalCompletedTasks / totalTasks) * 100) : 0;

        const completedTripsCount = monthFilteredTrips.filter((t) => t.statusCategory === "completed").length;
        const inProgressTripsCount = monthFilteredTrips.filter((t) => t.statusCategory === "in-progress").length;
        const pendingTripsCount = monthFilteredTrips.filter((t) => t.statusCategory === "pending").length;
        const totalPhotosUploaded = monthFilteredTrips.reduce((sum, item) => sum + item.photosUploadedCount, 0);

        return {
            totalTrips,
            totalTasks,
            totalCompletedTasks,
            totalPendingTasks,
            overallCompletionRate,
            completedTripsCount,
            inProgressTripsCount,
            pendingTripsCount,
            totalPhotosUploaded,
        };
    }, [monthFilteredTrips]);

    // Filter and sort the trips stats within the selected month
    const filteredAndSortedStats = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return monthFilteredTrips
            .filter((item) => {
                // Status Filter
                if (statusFilter !== "all" && item.statusCategory !== statusFilter) {
                    return false;
                }

                // Search Query
                if (query) {
                    const nameMatch = (item.trip.tripName || "").toLowerCase().includes(query);
                    const dateMatch = (item.trip.tripDate || "").toLowerCase().includes(query);
                    const discMatch = (item.trip.tripDiscussion || "").toLowerCase().includes(query);
                    const coordMatch = (item.trip.tripCoordinatorId || "").toLowerCase().includes(query);
                    if (!nameMatch && !dateMatch && !discMatch && !coordMatch) {
                        return false;
                    }
                }

                return true;
            })
            .sort((a, b) => {
                if (sortBy === "progress-desc") {
                    return b.completionRate - a.completionRate;
                }
                if (sortBy === "progress-asc") {
                    return a.completionRate - b.completionRate;
                }
                if (sortBy === "tasks-desc") {
                    return b.totalTasks - a.totalTasks;
                }
                if (sortBy === "name-asc") {
                    return (a.trip.tripName || "").localeCompare(b.trip.tripName || "");
                }
                if (sortBy === "date-desc") {
                    const dateA = a.dateObj ? a.dateObj.getTime() : 0;
                    const dateB = b.dateObj ? b.dateObj.getTime() : 0;
                    return dateB - dateA;
                }
                return 0;
            });
    }, [monthFilteredTrips, searchQuery, statusFilter, sortBy]);

    const toggleExpandTrip = (id: string) => {
        setExpandedTripId((prev) => (prev === id ? null : id));
    };

    const resetFilters = () => {
        setSearchQuery("");
        setStatusFilter("all");
        setSortBy("progress-desc");
        if (availableMonths.length > 0) {
            setSelectedMonth(availableMonths[0].key);
        }
    };

    return {
        isLoading,
        error,
        tripsStats: filteredAndSortedStats,
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
        refetch: fetchReports,
    };
};
