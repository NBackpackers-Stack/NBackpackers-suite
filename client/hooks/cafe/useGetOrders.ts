"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { getOrders, OrderRecord } from "@/services/order.service";

const PAGE_SIZE = 10;

export interface UseGetOrdersReturn {
    orders: OrderRecord[];
    filteredOrders: OrderRecord[];
    totalOrders: number;
    hasMore: boolean;
    isLoading: boolean;
    isLoadingMore: boolean;
    errorMessage: string | null;
    clearError: () => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    statusFilter: string;
    setStatusFilter: (status: string) => void;
    handleShowMore: () => Promise<void>;
    refetchOrders: () => Promise<void>;
}

/**
 * Custom hook to fetch and manage paginated cafe orders (10 at a time) with "Show 10 More" loading.
 */
export function useGetOrders(cafeName = "IDST Backpackers Cafe"): UseGetOrdersReturn {
    const [orders, setOrders] = useState<OrderRecord[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalOrders, setTotalOrders] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<string>("All");

    const clearError = useCallback(() => {
        setErrorMessage(null);
    }, []);

    const fetchOrdersBatch = useCallback(
        async (targetPage: number, append: boolean) => {
            try {
                if (append) {
                    setIsLoadingMore(true);
                } else {
                    setIsLoading(true);
                }
                setErrorMessage(null);

                const res = await getOrders({
                    cafeName,
                    page: targetPage,
                    limit: PAGE_SIZE,
                    status: statusFilter !== "All" ? statusFilter : undefined,
                });

                const incoming: OrderRecord[] = Array.isArray(res?.data) ? res.data : [];

                setOrders((prev) => {
                    if (!append) return incoming;
                    const seenIds = new Set(prev.map((o) => o._id));
                    const uniqueNext = incoming.filter((o) => !seenIds.has(o._id));
                    return [...prev, ...uniqueNext];
                });

                const resolvedTotal =
                    typeof res?.total === "number"
                        ? res.total
                        : append
                        ? undefined
                        : incoming.length;

                if (resolvedTotal !== undefined) {
                    setTotalOrders(resolvedTotal);
                } else if (append) {
                    setTotalOrders((prevTotal) => Math.max(prevTotal, targetPage * PAGE_SIZE));
                }

                // Determine whether more orders exist beyond this page
                if (typeof res?.hasMore === "boolean") {
                    setHasMore(res.hasMore);
                } else if (typeof res?.total === "number") {
                    setHasMore(targetPage * PAGE_SIZE < res.total);
                } else {
                    setHasMore(incoming.length === PAGE_SIZE);
                }

                setPage(targetPage);
            } catch (err: unknown) {
                console.error("Failed to fetch orders:", err);
                const message =
                    err && typeof err === "object" && "message" in err && typeof err.message === "string"
                        ? err.message
                        : "Failed to load orders.";
                setErrorMessage(message);
                if (!append) {
                    setOrders([]);
                    setHasMore(false);
                }
            } finally {
                if (append) {
                    setIsLoadingMore(false);
                } else {
                    setIsLoading(false);
                }
            }
        },
        [cafeName, statusFilter]
    );

    // Fetch first 10 orders on mount or when filter changes
    useEffect(() => {
        fetchOrdersBatch(1, false);
    }, [fetchOrdersBatch]);

    const handleShowMore = useCallback(async () => {
        if (isLoadingMore || !hasMore) return;
        await fetchOrdersBatch(page + 1, true);
    }, [fetchOrdersBatch, page, isLoadingMore, hasMore]);

    const refetchOrders = useCallback(async () => {
        await fetchOrdersBatch(1, false);
    }, [fetchOrdersBatch]);

    const filteredOrders = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        return orders.filter((order) => {
            const matchesStatus = statusFilter === "All" || order.status === statusFilter;
            const matchesQuery =
                query === "" ||
                order.customerName.toLowerCase().includes(query) ||
                order.customerNumber.toLowerCase().includes(query) ||
                order._id.toLowerCase().includes(query) ||
                order.items.some((it) => it.itemName.toLowerCase().includes(query));
            return matchesStatus && matchesQuery;
        });
    }, [orders, searchQuery, statusFilter]);

    return {
        orders,
        filteredOrders,
        totalOrders,
        hasMore,
        isLoading,
        isLoadingMore,
        errorMessage,
        clearError,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        handleShowMore,
        refetchOrders,
    };
}

export default useGetOrders;
