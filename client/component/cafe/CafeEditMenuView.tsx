"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useEditMenu } from "@/hooks/cafe/useEditMenu";

// Category style & icon mapper
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

// Helper for Veg / Non-Veg
const isNonVegItem = (itemName: string): boolean => {
    const lower = itemName.toLowerCase();
    return lower.includes("chicken") || lower.includes("egg") || lower.includes("omlette");
};

export default function CafeEditMenuView() {
    const router = useRouter();

    const {
        filteredItems,
        categories,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        isLoading,
        isSubmitting,
        errorMessage,
        successMessage,
        clearMessages,

        isAddModalOpen,
        openAddModal,
        closeAddModal,
        addForm,
        setAddForm,
        handleAddSubmit,

        isEditModalOpen,
        openEditModal,
        closeEditModal,
        editForm,
        setEditForm,
        handleEditSubmit,

        isDeleteModalOpen,
        deletingItem,
        openDeleteModal,
        closeDeleteModal,
        handleDeleteSubmit,
    } = useEditMenu();

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
                            onClick={() => router.push("/cafe/menu")}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs shadow-2xs cursor-pointer transition-all"
                        >
                            <span>🍽️</span> View Live Menu
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
                                <span>⚙️</span> Menu Management
                            </div>
                            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-white mb-1">
                                Edit Cafe Menu
                            </h1>
                            <p className="text-amber-100/85 text-xs sm:text-sm font-medium">
                                Update dish prices, rename items, manage availability, or add and delete menu items.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={openAddModal}
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-orange-500/25 active:scale-95 transition-all cursor-pointer shrink-0"
                        >
                            <span>+ Add New Item</span>
                        </button>
                    </div>
                </header>

                {/* Alerts */}
                {errorMessage && (
                    <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-semibold flex items-center justify-between gap-2 shadow-2xs">
                        <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-black text-xs shrink-0">!</span>
                            <span>{errorMessage}</span>
                        </div>
                        <button type="button" onClick={clearMessages} className="text-rose-400 hover:text-rose-700 font-bold px-2">✕</button>
                    </div>
                )}

                {successMessage && (
                    <div className="mb-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center justify-between gap-2 shadow-2xs">
                        <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs shrink-0">✓</span>
                            <span>{successMessage}</span>
                        </div>
                        <button type="button" onClick={clearMessages} className="text-emerald-500 hover:text-emerald-800 font-bold px-2">✕</button>
                    </div>
                )}

                {/* Search Bar & Category Filter */}
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
                            placeholder="Filter dishes by name or category (e.g. coffee, burger, maggi)..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-9 py-2.5 text-base sm:text-sm font-medium text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery("")}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 text-xs font-bold"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {/* Category Filter Pills */}
                    <div className="-mx-2 px-2 overflow-x-auto no-scrollbar flex items-center gap-1.5 pb-1">
                        {categories.map((cat) => {
                            const isSelected = selectedCategory === cat;
                            const meta = categoryMeta[cat] || { icon: "🍽️", bg: "bg-slate-50", text: "text-slate-700", border: "border-slate-200" };

                            return (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer active:scale-95 ${
                                        isSelected
                                            ? "bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-[1.02]"
                                            : `${meta.bg} ${meta.text} border ${meta.border} hover:opacity-90 shadow-2xs`
                                    }`}
                                >
                                    <span className="text-xs">{meta.icon}</span>
                                    <span>{cat}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Items Counter Bar */}
                <div className="flex items-center justify-between mb-3 px-1 text-xs font-bold text-slate-500">
                    <span>
                        Showing {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"}
                    </span>
                    {selectedCategory !== "All" && (
                        <button
                            type="button"
                            onClick={() => setSelectedCategory("All")}
                            className="text-orange-600 hover:underline"
                        >
                            Reset Category
                        </button>
                    )}
                </div>

                {/* Items List */}
                {isLoading ? (
                    <div className="py-16 text-center space-y-3 bg-white rounded-3xl border border-slate-200">
                        <div className="w-8 h-8 mx-auto border-3 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-xs font-bold text-slate-400">Loading menu items...</p>
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-sm">
                        <div className="text-4xl mb-3">🍽️</div>
                        <h3 className="text-base font-bold text-slate-800 mb-1">No items found</h3>
                        <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto mb-4">
                            No dishes match "{searchQuery}" in "{selectedCategory}". You can add a new item or reset search.
                        </p>
                        <button
                            type="button"
                            onClick={openAddModal}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-xs uppercase tracking-wider"
                        >
                            + Add New Item
                        </button>
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden divide-y divide-slate-100">
                        {filteredItems.map((item, idx) => {
                            const isNonVeg = isNonVegItem(item.item);
                            const meta = categoryMeta[item.category] || { icon: "🍽️", bg: "bg-slate-50", text: "text-slate-700", border: "border-slate-200" };

                            return (
                                <div
                                    key={item._id || `${item.item}-${idx}`}
                                    className="p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors"
                                >
                                    {/* Item Details */}
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            {/* Veg / Non-Veg Indicator */}
                                            <span
                                                className={`w-3.5 h-3.5 rounded-xs border flex items-center justify-center shrink-0 ${
                                                    isNonVeg ? "border-rose-600" : "border-emerald-600"
                                                }`}
                                                title={isNonVeg ? "Non-Vegetarian" : "Vegetarian"}
                                            >
                                                <span
                                                    className={`w-1.5 h-1.5 rounded-full ${
                                                        isNonVeg ? "bg-rose-600" : "bg-emerald-600"
                                                    }`}
                                                ></span>
                                            </span>

                                            <h3 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                                                {item.item}
                                            </h3>

                                            {item.isAvailable === false && (
                                                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                                                    Unavailable
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${meta.bg} ${meta.text} ${meta.border}`}>
                                                <span>{meta.icon}</span>
                                                <span>{item.category}</span>
                                            </span>

                                            <span className="text-xs font-black text-orange-600 font-mono">
                                                {item.price}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Buttons: Edit & Delete */}
                                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => openEditModal(item)}
                                            className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-200 font-bold text-xs transition-colors cursor-pointer"
                                            title="Edit Item"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            <span className="hidden sm:inline">Edit</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => openDeleteModal(item)}
                                            className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs transition-colors cursor-pointer"
                                            title="Delete Item"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            <span className="hidden sm:inline">Delete</span>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

            </div>

            {/* ── ADD ITEM MODAL ── */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="px-5 py-4 bg-gradient-to-r from-stone-900 via-amber-950 to-orange-950 text-white flex items-center justify-between">
                            <h2 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                                <span>➕</span> Add New Menu Item
                            </h2>
                            <button
                                type="button"
                                onClick={closeAddModal}
                                disabled={isSubmitting}
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center text-sm font-bold"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleAddSubmit} className="p-5 space-y-4">
                            {/* Category Selector */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                    Category <span className="text-rose-500">*</span>
                                </label>
                                <select
                                    value={addForm.category}
                                    onChange={(e) => setAddForm({ ...addForm, category: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                >
                                    {categories.filter((c) => c !== "All").map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Item Name */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                    Item / Dish Name <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={addForm.item}
                                    onChange={(e) => setAddForm({ ...addForm, item: e.target.value })}
                                    placeholder="e.g. Masala Chai, Veg Burger, Chicken Wrap..."
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm font-semibold text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                    Price <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={addForm.price}
                                    onChange={(e) => setAddForm({ ...addForm, price: e.target.value })}
                                    placeholder="e.g. ₹50, ₹120, or M.R.P."
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm font-semibold text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                />
                            </div>

                            {/* Availability Toggle */}
                            <div className="flex items-center justify-between pt-1">
                                <span className="text-xs font-bold text-slate-700">Available to Order</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={addForm.isAvailable}
                                        onChange={(e) => setAddForm({ ...addForm, isAvailable: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                                </label>
                            </div>

                            {/* Footer Buttons */}
                            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                                <button
                                    type="button"
                                    onClick={closeAddModal}
                                    disabled={isSubmitting}
                                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-xs uppercase tracking-wider shadow-md hover:from-orange-600 active:scale-95 transition-all"
                                >
                                    {isSubmitting ? "Adding..." : "+ Add to Menu"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ── EDIT ITEM MODAL ── */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="px-5 py-4 bg-gradient-to-r from-stone-900 via-amber-950 to-orange-950 text-white flex items-center justify-between">
                            <h2 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                                <span>✏️</span> Edit Menu Item
                            </h2>
                            <button
                                type="button"
                                onClick={closeEditModal}
                                disabled={isSubmitting}
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center text-sm font-bold"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleEditSubmit} className="p-5 space-y-4">
                            {/* Category Selector */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                    Category <span className="text-rose-500">*</span>
                                </label>
                                <select
                                    value={editForm.category}
                                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                >
                                    {categories.filter((c) => c !== "All").map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Item Name */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                    Item Name <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={editForm.item}
                                    onChange={(e) => setEditForm({ ...editForm, item: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm font-semibold text-slate-800 outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                    Price <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={editForm.price}
                                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                                    placeholder="e.g. ₹50 or M.R.P."
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm font-semibold text-slate-800 outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                />
                            </div>

                            {/* Availability Toggle */}
                            <div className="flex items-center justify-between pt-1">
                                <span className="text-xs font-bold text-slate-700">Available to Order</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={editForm.isAvailable}
                                        onChange={(e) => setEditForm({ ...editForm, isAvailable: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                                </label>
                            </div>

                            {/* Footer Buttons */}
                            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                                <button
                                    type="button"
                                    onClick={closeEditModal}
                                    disabled={isSubmitting}
                                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-xs uppercase tracking-wider shadow-md hover:from-orange-600 active:scale-95 transition-all"
                                >
                                    {isSubmitting ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ── DELETE ITEM CONFIRMATION MODAL ── */}
            {isDeleteModalOpen && deletingItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 text-center space-y-4 border border-slate-200 animate-in zoom-in-95 duration-200">
                        <div className="w-14 h-14 mx-auto rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xl">
                            🗑️
                        </div>

                        <div className="space-y-1">
                            <h3 className="text-lg font-black text-slate-900">
                                Delete Menu Item?
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                                Are you sure you want to remove <strong className="text-slate-900 font-extrabold">"{deletingItem.item}"</strong> from the cafe menu? This action cannot be undone.
                            </p>
                        </div>

                        <div className="pt-2 flex items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={closeDeleteModal}
                                disabled={isSubmitting}
                                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteSubmit}
                                disabled={isSubmitting}
                                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all"
                            >
                                {isSubmitting ? "Deleting..." : "Yes, Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
