"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useGetOrders } from "@/hooks/cafe/useGetOrders";
import { OrderStatus, PaymentStatus } from "@/services/order.service";

const STATUS_FILTERS: { label: string; value: string }[] = [
    { label: "All", value: "All" },
    { label: "Pending", value: "pending" },
    { label: "Preparing", value: "preparing" },
    { label: "Ready", value: "ready" },
    { label: "Completed", value: "completed" },
    { label: "Cancelled", value: "cancelled" },
];

const statusBadgeStyle: Record<OrderStatus, string> = {
    pending: "bg-amber-50 text-amber-800 border-amber-200",
    preparing: "bg-sky-50 text-sky-800 border-sky-200",
    ready: "bg-emerald-50 text-emerald-800 border-emerald-200",
    completed: "bg-slate-100 text-slate-700 border-slate-200",
    cancelled: "bg-rose-50 text-rose-700 border-rose-200",
};

const paymentBadgeStyle: Record<PaymentStatus, string> = {
    paid: "bg-emerald-100 text-emerald-800 border-emerald-200",
    unpaid: "bg-orange-50 text-orange-700 border-orange-200",
};

const formatOrderDate = (isoDate?: string): string => {
    if (!isoDate) return "";
    const parsed = new Date(isoDate);
    if (Number.isNaN(parsed.getTime())) return "";
    return parsed.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export default function CafeOrderPanelView() {
    const router = useRouter();
    const {
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
    } = useGetOrders();

    return (
        <div className="w-full max-w-full overflow-x-hidden min-h-screen bg-gradient-to-b from-orange-50/40 via-amber-50/20 to-slate-50 font-sans selection:bg-orange-200 pt-20 sm:pt-24 pb-20 px-3.5 sm:px-6">
            <div className="w-full max-w-5xl mx-auto">

                {/* Top App Bar Navigation */}
                <div className="flex items-center justify-between gap-3 mb-5">
                    <button
                        type="button"
                        onClick={() => router.push("/cafe")}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-orange-50 border border-slate-200 text-slate-700 font-bold text-xs sm:text-sm shadow-2xs active:scale-95 transition-all cursor-pointer"
                    >
                        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>Back to Dashboard</span>
                    </button>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={refetchOrders}
                            disabled={isLoading}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs shadow-2xs active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                        >
                            <svg className={`w-3.5 h-3.5 text-orange-600 ${isLoading ? "animate-spin" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span>Refresh</span>
                        </button>

                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs">
                            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                            IDST Branch
                        </span>
                    </div>
                </div>

                {/* Header Card */}
                <header className="mb-6 bg-gradient-to-br from-stone-900 via-amber-950 to-orange-950 text-white rounded-3xl p-5 sm:p-7 shadow-xl shadow-amber-950/20 relative overflow-hidden border border-amber-800/30">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-44 h-44 bg-gradient-to-br from-orange-500/20 to-amber-400/20 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-amber-200 border border-white/15 text-[11px] font-bold tracking-wider uppercase mb-2">
                                <span>🧾</span> Live Cafe Queue
                            </div>
                            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-white mb-1">
                                Order Panel
                            </h1>
                            <p className="text-amber-100/85 text-xs sm:text-sm font-medium">
                                Review incoming and completed customer orders, inspect itemized dishes, and load history 10 orders at a time.
                            </p>
                        </div>

                        <div className="shrink-0 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl px-4 py-3 text-left sm:text-right">
                            <span className="text-[10px] font-black uppercase tracking-wider text-amber-200 block">
                                Loaded Orders
                            </span>
                            <span className="text-2xl font-black text-white">
                                {orders.length}
                                {totalOrders > 0 ? ` / ${totalOrders}` : ""}
                            </span>
                        </div>
                    </div>
                </header>

                {/* Error Alert */}
                {errorMessage && (
                    <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-semibold flex items-center justify-between gap-2 shadow-2xs">
                        <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-black text-xs shrink-0">!</span>
                            <span>{errorMessage}</span>
                        </div>
                        <button type="button" onClick={clearError} className="text-rose-400 hover:text-rose-700 font-bold px-2 cursor-pointer">✕</button>
                    </div>
                )}

                {/* Search & Status Filters */}
                <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-sm mb-6 space-y-3.5">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-orange-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by customer name, phone number, dish name, or order ID..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-9 py-2.5 text-base sm:text-sm font-medium text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery("")}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    <div className="-mx-2 px-2 overflow-x-auto no-scrollbar flex items-center gap-1.5 pb-1">
                        {STATUS_FILTERS.map((filter) => {
                            const isSelected = statusFilter === filter.value;
                            return (
                                <button
                                    key={filter.value}
                                    type="button"
                                    onClick={() => setStatusFilter(filter.value)}
                                    className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer active:scale-95 ${
                                        isSelected
                                            ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                                            : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-orange-50 hover:border-orange-200"
                                    }`}
                                >
                                    {filter.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Orders Counter Bar */}
                <div className="flex items-center justify-between mb-3 px-1 text-xs font-bold text-slate-500">
                    <span>
                        Showing {filteredOrders.length} {filteredOrders.length === 1 ? "order" : "orders"}
                        {totalOrders > orders.length ? ` (of ${totalOrders} total)` : ""}
                    </span>
                    {(statusFilter !== "All" || searchQuery) && (
                        <button
                            type="button"
                            onClick={() => {
                                setStatusFilter("All");
                                setSearchQuery("");
                            }}
                            className="text-orange-600 hover:underline cursor-pointer"
                        >
                            Reset Filters
                        </button>
                    )}
                </div>

                {/* Loading Skeleton */}
                {isLoading ? (
                    <div className="py-16 text-center space-y-3 bg-white rounded-3xl border border-slate-200 shadow-sm">
                        <div className="w-8 h-8 mx-auto border-3 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-xs font-bold text-slate-400">Loading cafe orders...</p>
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-sm">
                        <div className="text-4xl mb-3">🧾</div>
                        <h3 className="text-base font-black text-slate-900 mb-1">No orders found</h3>
                        <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
                            {orders.length === 0
                                ? "No cafe orders have been loaded yet. New customer orders will appear here."
                                : "No orders match your current search or status filter."}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredOrders.map((order) => {
                            const statusStyle = statusBadgeStyle[order.status] || statusBadgeStyle.pending;
                            const paymentStyle = paymentBadgeStyle[order.paymentStatus] || paymentBadgeStyle.unpaid;

                            return (
                                <div
                                    key={order._id}
                                    className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:border-orange-200 transition-colors"
                                >
                                    {/* Top Row: Customer Info & Badges */}
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
                                        <div>
                                            <div className="flex items-center gap-2 flex-wrap mb-1">
                                                <span className="text-[11px] font-black font-mono px-2 py-0.5 rounded-md bg-stone-900 text-amber-300">
                                                    #{order._id.slice(-6).toUpperCase()}
                                                </span>
                                                <h2 className="text-sm sm:text-base font-black text-slate-900">
                                                    {order.customerName}
                                                </h2>
                                                <span className="text-xs font-bold text-slate-500">
                                                    +91 {order.customerNumber}
                                                </span>
                                            </div>
                                            <p className="text-[11px] font-semibold text-slate-400">
                                                {formatOrderDate(order.createdAt)}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className={`px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border ${statusStyle}`}>
                                                {order.status}
                                            </span>
                                            <span className={`px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border ${paymentStyle}`}>
                                                {order.paymentStatus}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Ordered Items List */}
                                    <div className="divide-y divide-slate-100 my-2">
                                        {order.items.map((item, idx) => (
                                            <div
                                                key={item._id || `${order._id}-item-${idx}`}
                                                className="py-2 flex items-center justify-between gap-3 text-xs sm:text-sm"
                                            >
                                                <div className="min-w-0 flex-1">
                                                    <span className="font-bold text-slate-800">
                                                        {item.itemName}
                                                    </span>
                                                    <span className="ml-2 text-[11px] font-semibold text-slate-400">
                                                        ({item.category})
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 shrink-0">
                                                    <span className="text-xs font-semibold text-slate-500">
                                                        ₹{item.price} × {item.quantity}
                                                    </span>
                                                    <span className="font-black text-slate-900 min-w-[52px] text-right">
                                                        ₹{item.subtotal}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Notes (if any) */}
                                    {order.notes && (
                                        <div className="mt-2 mb-3 px-3 py-2 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-950">
                                            <span className="font-black uppercase tracking-wider text-[10px] text-amber-700 mr-1.5">
                                                Notes:
                                            </span>
                                            <span className="font-medium">{order.notes}</span>
                                        </div>
                                    )}

                                    {/* Footer Totals */}
                                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-500">
                                            {order.totalUnits} {order.totalUnits === 1 ? "item" : "items"} total
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                                                Order Total
                                            </span>
                                            <span className="text-lg font-black text-orange-600">
                                                ₹{order.totalPrice}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Pagination: Show 10 More */}
                {!isLoading && filteredOrders.length > 0 && (
                    <div className="mt-8 flex flex-col items-center gap-2">
                        {hasMore ? (
                            <button
                                type="button"
                                onClick={handleShowMore}
                                disabled={isLoadingMore}
                                className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-orange-500/25 active:scale-95 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isLoadingMore ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        <span>Loading 10 More...</span>
                                    </>
                                ) : (
                                    <span>Show 10 More Orders</span>
                                )}
                            </button>
                        ) : (
                            <p className="text-xs font-bold text-slate-400">
                                All loaded orders are shown ({orders.length} {orders.length === 1 ? "order" : "orders"}).
                            </p>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}
