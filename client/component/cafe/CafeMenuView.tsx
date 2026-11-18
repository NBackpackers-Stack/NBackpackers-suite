"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { menuItems } from "@/utils/menu";
import { useCafeCart, MenuItemType } from "@/hooks/cafe/useCafeCart";

// Helper to determine if an item is non-veg
const isNonVegItem = (itemName: string): boolean => {
    const lower = itemName.toLowerCase();
    return lower.includes("chicken") || lower.includes("egg") || lower.includes("omlette");
};

// Category style & icon mapper for vibrant, multi-colored UI
const categoryMeta: { [key: string]: { icon: string; bg: string; text: string; border: string } } = {
    "All": { icon: "🍽️", bg: "bg-slate-900 text-white", text: "text-white", border: "border-slate-900" },
    "Hot Beverage": { icon: "☕", bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200" },
    "Cold Beverage": { icon: "🥤", bg: "bg-cyan-50", text: "text-cyan-800", border: "border-cyan-200" },
    "Snacks & Bites": { icon: "🥟", bg: "bg-orange-50", text: "text-orange-800", border: "border-orange-200" },
    "Maggi & More": { icon: "🍜", bg: "bg-yellow-50", text: "text-yellow-900", border: "border-yellow-200" },
    "Breakfast": { icon: "🍳", bg: "bg-lime-50", text: "text-lime-900", border: "border-lime-200" },
    "Indian": { icon: "🍛", bg: "bg-red-50", text: "text-red-900", border: "border-red-200" },
    "Chinese": { icon: "🥡", bg: "bg-rose-50", text: "text-rose-900", border: "border-rose-200" },
    "Italian": { icon: "🍕", bg: "bg-emerald-50", text: "text-emerald-900", border: "border-emerald-200" },
    "Burgers": { icon: "🍔", bg: "bg-amber-50", text: "text-amber-900", border: "border-amber-200" },
    "Wraps": { icon: "🌯", bg: "bg-teal-50", text: "text-teal-900", border: "border-teal-200" },
    "Subway": { icon: "🥪", bg: "bg-emerald-50", text: "text-emerald-900", border: "border-emerald-200" },
    "Momos": { icon: "🥟", bg: "bg-indigo-50", text: "text-indigo-900", border: "border-indigo-200" },
    "Pasta": { icon: "🍝", bg: "bg-violet-50", text: "text-violet-900", border: "border-violet-200" },
    "Desserts & Others": { icon: "🍰", bg: "bg-pink-50", text: "text-pink-900", border: "border-pink-200" },
};

export default function CafeMenuView() {
    const router = useRouter();
    const { addToCart, decrementItem, getItemQuantity, totalQuantity, totalPrice } = useCafeCart();

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    // Extract unique categories
    const categories = useMemo(() => {
        const unique = Array.from(new Set(menuItems.map((m) => m.category)));
        return ["All", ...unique];
    }, []);

    // Filtered menu items
    const filteredItems = useMemo(() => {
        return menuItems.filter((item) => {
            const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
            const matchesSearch =
                searchQuery.trim() === "" ||
                item.item.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
                item.category.toLowerCase().includes(searchQuery.toLowerCase().trim());
            return matchesCategory && matchesSearch;
        });
    }, [searchQuery, selectedCategory]);

    // Group items by category for clean section display
    const groupedItems = useMemo(() => {
        const groups: { [key: string]: MenuItemType[] } = {};
        filteredItems.forEach((item) => {
            if (!groups[item.category]) {
                groups[item.category] = [];
            }
            groups[item.category].push(item);
        });
        return groups;
    }, [filteredItems]);

    return (
        <div className="w-full max-w-full overflow-x-hidden min-h-screen bg-gradient-to-b from-orange-50/40 via-amber-50/20 to-slate-50 font-sans selection:bg-orange-200 pt-3 sm:pt-6 pb-28 px-3.5 sm:px-4">
            <div className="w-full max-w-md sm:max-w-xl mx-auto">

                {/* Mobile Top App Bar */}
                <div className="flex items-center justify-between gap-2 mb-3 pt-1">
                    <button
                        type="button"
                        onClick={() => router.push("/cafe")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-orange-50 border border-slate-200 text-slate-700 font-bold text-xs shadow-2xs active:scale-95 transition-all cursor-pointer"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>Dashboard</span>
                    </button>

                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                            IDST Branch
                        </span>

                        {totalQuantity > 0 && (
                            <button
                                type="button"
                                onClick={() => router.push("/cafe/cart")}
                                className="relative p-2 rounded-full bg-slate-900 text-white shadow-sm hover:bg-black active:scale-95 transition-all cursor-pointer"
                                title="View Cart"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-500 text-white font-black text-[9px] flex items-center justify-center ring-2 ring-white">
                                    {totalQuantity}
                                </span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Vibrant Hero Header Card */}
                <header className="mb-4 bg-gradient-to-br from-stone-900 via-amber-950 to-orange-950 text-white rounded-3xl p-5 sm:p-6 shadow-xl shadow-amber-950/20 relative overflow-hidden border border-amber-800/30">
                    <div className="absolute top-0 right-0 -mt-6 -mr-6 w-36 h-36 bg-gradient-to-br from-orange-500/20 to-amber-400/20 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none"></div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-amber-200 border border-white/15 text-[10px] font-bold tracking-wider uppercase mb-2">
                            <span>☕</span> IDST Campus Cafe
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight mb-1 text-white">
                            IDST Backpackers Cafe
                        </h1>
                        <p className="text-amber-100/85 text-xs sm:text-sm font-medium leading-relaxed">
                            Freshly brewed coffees, hot teas, Maggi, wraps & full meals. Tap ADD to build your order!
                        </p>
                    </div>
                </header>

                {/* Search Bar */}
                <div className="relative mb-3.5">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-orange-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search dishes (e.g. cold coffee, dosa, burger)..."
                        className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-9 py-2.5 text-base sm:text-sm font-semibold text-slate-800 placeholder-slate-400 shadow-2xs outline-none focus:border-orange-500 focus:ring-3 focus:ring-orange-100 transition-all"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 font-bold text-xs"
                        >
                            ✕
                        </button>
                    )}
                </div>

                {/* Multi-Colored Horizontal Category Chips */}
                <div className="mb-4 flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
                    {categories.map((cat) => {
                        const isSelected = selectedCategory === cat;
                        const meta = categoryMeta[cat] || { icon: "🍽️", bg: "bg-slate-50", text: "text-slate-700", border: "border-slate-200" };

                        return (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setSelectedCategory(cat)}
                                className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                    isSelected
                                        ? "bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-102"
                                        : `${meta.bg} ${meta.text} hover:opacity-90 border ${meta.border} shadow-2xs`
                                }`}
                            >
                                <span>{meta.icon}</span>
                                <span>{cat}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Menu Items List - Grouped by Category */}
                {Object.keys(groupedItems).length === 0 ? (
                    <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 shadow-2xs">
                        <div className="w-12 h-12 mx-auto rounded-full bg-orange-50 text-orange-600 flex items-center justify-center text-xl mb-2">
                            🍽️
                        </div>
                        <h3 className="text-sm font-bold text-slate-800 mb-1">No matching food found</h3>
                        <p className="text-xs text-slate-400 mb-3">Try checking spelling or reset filters.</p>
                        <button
                            type="button"
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedCategory("All");
                            }}
                            className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold shadow-xs cursor-pointer"
                        >
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {Object.entries(groupedItems).map(([categoryName, itemsList]) => {
                            const meta = categoryMeta[categoryName] || { icon: "🍽️", bg: "bg-slate-50", text: "text-slate-800", border: "border-slate-200" };

                            return (
                                <div key={categoryName} className="space-y-2">
                                    {/* Category Section Header */}
                                    <div className="flex items-center justify-between px-1">
                                        <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                                            <span className="text-sm">{meta.icon}</span>
                                            <span>{categoryName}</span>
                                        </h2>
                                        <span className="text-[10px] font-bold text-slate-400">
                                            {itemsList.length} {itemsList.length === 1 ? "dish" : "dishes"}
                                        </span>
                                    </div>

                                    {/* Items Cards */}
                                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs divide-y divide-slate-100 overflow-hidden">
                                        {itemsList.map((item, idx) => {
                                            const qty = getItemQuantity(item.item);
                                            const isNonVeg = isNonVegItem(item.item);

                                            return (
                                                <div
                                                    key={idx}
                                                    className="p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors"
                                                >
                                                    {/* Left: Veg/Non-veg icon, Item name, Category pill, Price */}
                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex items-center gap-1.5 mb-1">
                                                            {/* Veg / Non-veg dot indicator */}
                                                            <span
                                                                className={`w-3.5 h-3.5 rounded-xs border flex items-center justify-center ${
                                                                    isNonVeg ? "border-rose-600" : "border-emerald-600"
                                                                }`}
                                                                title={isNonVeg ? "Non-Veg" : "Veg"}
                                                            >
                                                                <span
                                                                    className={`w-1.5 h-1.5 rounded-full ${
                                                                        isNonVeg ? "bg-rose-600" : "bg-emerald-600"
                                                                    }`}
                                                                ></span>
                                                            </span>
                                                            <span className={`text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.2 rounded ${meta.bg} ${meta.text}`}>
                                                                {item.category}
                                                            </span>
                                                        </div>

                                                        <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                                                            {item.item}
                                                        </h3>

                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-sm font-black text-slate-900">
                                                                {item.price}
                                                            </span>
                                                            {item.price.toUpperCase() === "M.R.P." && (
                                                                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200">
                                                                    Retail MRP
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Right: Zomato-Style ADD Button / Stepper */}
                                                    <div className="shrink-0">
                                                        {qty === 0 ? (
                                                            <button
                                                                type="button"
                                                                onClick={() => addToCart(item)}
                                                                className="px-4 sm:px-5 py-1.5 rounded-xl bg-white hover:bg-orange-50 active:bg-orange-100 border-2 border-orange-500 text-orange-600 font-black text-xs sm:text-sm uppercase tracking-wider shadow-2xs active:scale-95 transition-all cursor-pointer flex items-center gap-1"
                                                            >
                                                                <span>ADD</span>
                                                                <span className="text-base leading-none font-bold">+</span>
                                                            </button>
                                                        ) : (
                                                            <div className="flex items-center bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl overflow-hidden shadow-xs border border-orange-600">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => decrementItem(item.item)}
                                                                    className="w-8 h-8 flex items-center justify-center text-white hover:bg-orange-600 active:bg-orange-700 font-black text-sm cursor-pointer transition-colors"
                                                                >
                                                                    -
                                                                </button>
                                                                <span className="w-8 text-center text-xs sm:text-sm font-black text-white">
                                                                    {qty}
                                                                </span>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => addToCart(item)}
                                                                    className="w-8 h-8 flex items-center justify-center text-white hover:bg-orange-600 active:bg-orange-700 font-black text-sm cursor-pointer transition-colors"
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

            </div>

            {/* ── ZOMATO-STYLE FLOATING BOTTOM CART BAR (Vibrant & High-Contrast) ── */}
            {totalQuantity > 0 && (
                <div className="fixed bottom-3 inset-x-3 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-96 z-50 animate-in slide-in-from-bottom-5 duration-300">
                    <button
                        type="button"
                        onClick={() => router.push("/cafe/cart")}
                        className="w-full bg-gradient-to-r from-slate-900 via-stone-900 to-amber-950 text-white p-3.5 rounded-2xl shadow-2xl shadow-orange-950/30 border border-amber-500/30 flex items-center justify-between active:scale-98 transition-all cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white text-lg shadow-md shadow-orange-500/30">
                                🛒
                            </div>
                            <div className="text-left">
                                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 block leading-tight">
                                    {totalQuantity} {totalQuantity === 1 ? "ITEM" : "ITEMS"} IN CART
                                </span>
                                <span className="text-xl font-black text-white tracking-tight leading-tight">
                                    ₹{totalPrice}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-1.5 font-black text-xs uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 px-4 py-2 rounded-xl shadow-md shadow-orange-500/20">
                            <span>View Cart</span>
                            <span className="text-sm font-bold">→</span>
                        </div>
                    </button>
                </div>
            )}
        </div>
    );
}
