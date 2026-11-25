"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { UseCreateMenuReturn } from "@/hooks/cafe/useCreateMenu";

export default function CreateMenuModal({
    rawJson,
    setRawJson,
    parsedItems,
    parseError,
    itemCount,
    isModalOpen,
    closeModal,
    isLoading,
    isSuccess,
    errorMessage,
    successMessage,
    loadSampleMenu,
    clearInput,
    handleSubmit,
}: UseCreateMenuReturn) {
    const router = useRouter();
    const [showPreview, setShowPreview] = useState<boolean>(true);

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            {/* Modal Dialog Card */}
            <div className="relative w-full max-w-2xl max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
                
                {/* Header */}
                <div className="px-5 sm:px-6 py-4 bg-gradient-to-r from-stone-900 via-amber-950 to-orange-950 text-white flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-orange-500/20 border border-orange-400/30 flex items-center justify-center text-lg shadow-inner">
                            📋
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-base sm:text-lg font-black tracking-tight text-white">
                                    Create Cafe Menu
                                </h2>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-orange-500 text-white">
                                    Database
                                </span>
                            </div>
                            <p className="text-amber-200/80 text-xs">
                                Paste your array of objects to seed or update the cafe menu
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={closeModal}
                        disabled={isLoading}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
                        title="Close modal"
                    >
                        ✕
                    </button>
                </div>

                {/* Body Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                    
                    {/* Success View */}
                    {isSuccess ? (
                        <div className="py-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
                            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-md">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-xl font-black text-slate-900">
                                    Menu Stored in Database!
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                                    {successMessage || `${itemCount} menu items have been successfully saved to MongoDB.`}
                                </p>
                            </div>

                            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-left max-w-md mx-auto">
                                <div className="flex justify-between items-center text-xs font-bold text-emerald-900">
                                    <span>Cafe Name:</span>
                                    <span>IDST Backpackers Cafe</span>
                                </div>
                                <div className="flex justify-between items-center text-xs font-bold text-emerald-900 mt-1">
                                    <span>Total Items Saved:</span>
                                    <span className="font-black text-emerald-700">{itemCount} items</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        closeModal();
                                        router.push("/cafe/menu");
                                    }}
                                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:from-orange-600 active:scale-95 transition-all cursor-pointer"
                                >
                                    View Live Menu →
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* Input & Validation View */
                        <form onSubmit={handleSubmit} className="space-y-3.5">
                            
                            {/* Toolbar Buttons */}
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="flex items-center gap-1.5">
                                    <button
                                        type="button"
                                        onClick={loadSampleMenu}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-800 text-xs font-bold transition-colors cursor-pointer"
                                    >
                                        <span>⚡</span> Load Current Menu Sample
                                    </button>
                                    {rawJson && (
                                        <button
                                            type="button"
                                            onClick={clearInput}
                                            className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-500 text-xs font-semibold transition-colors cursor-pointer"
                                        >
                                            Clear
                                        </button>
                                    )}
                                </div>

                                {/* Status Chip */}
                                {parseError ? (
                                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-full">
                                        ✕ Invalid JSON
                                    </span>
                                ) : itemCount > 0 ? (
                                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                                        ✓ {itemCount} items ready
                                    </span>
                                ) : null}
                            </div>

                            {/* Error Alert */}
                            {errorMessage && (
                                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-start gap-2">
                                    <span className="shrink-0 font-black text-sm leading-none">!</span>
                                    <span>{errorMessage}</span>
                                </div>
                            )}

                            {/* JSON Input Textarea */}
                            <div className="space-y-1">
                                <label className="block text-xs font-bold text-slate-700">
                                    Paste Array of Objects:
                                </label>
                                <div className="relative rounded-2xl border border-slate-300 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100 transition-all overflow-hidden bg-slate-900">
                                    <textarea
                                        rows={8}
                                        value={rawJson}
                                        onChange={(e) => setRawJson(e.target.value)}
                                        placeholder={`[\n  { "category": "Hot Beverage", "item": "Tea", "price": "₹15" },\n  { "category": "Snacks & Bites", "item": "Samosa", "price": "₹15" }\n]`}
                                        className="w-full p-3 font-mono text-xs text-amber-100 bg-transparent outline-none resize-y selection:bg-orange-500 selection:text-white"
                                        spellCheck={false}
                                    />
                                </div>
                                <p className="text-[11px] text-slate-400">
                                    Each item requires: <code className="text-slate-600 font-bold">category</code>, <code className="text-slate-600 font-bold">item</code>, and <code className="text-slate-600 font-bold">price</code>.
                                </p>
                            </div>

                            {/* Live Parsed Preview */}
                            {itemCount > 0 && (
                                <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50">
                                    <button
                                        type="button"
                                        onClick={() => setShowPreview(!showPreview)}
                                        className="w-full px-4 py-2.5 bg-slate-100/70 hover:bg-slate-100 flex items-center justify-between text-xs font-black text-slate-700 transition-colors cursor-pointer"
                                    >
                                        <span className="flex items-center gap-1.5">
                                            <span>👁️</span> Parsed Items Preview ({itemCount})
                                        </span>
                                        <span className="text-[10px] text-slate-500 font-bold">
                                            {showPreview ? "Collapse ▲" : "Expand ▼"}
                                        </span>
                                    </button>

                                    {showPreview && (
                                        <div className="max-h-44 overflow-y-auto p-3 divide-y divide-slate-100">
                                            {parsedItems.slice(0, 50).map((it, idx) => (
                                                <div key={idx} className="py-1.5 flex items-center justify-between gap-2 text-xs">
                                                    <div className="flex items-center gap-2 min-w-0">
                                                        <span className="w-5 text-[10px] text-slate-400 font-mono">
                                                            {idx + 1}.
                                                        </span>
                                                        <span className="font-bold text-slate-800 truncate">
                                                            {it.item}
                                                        </span>
                                                        <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-white border border-slate-200 text-slate-600 shrink-0">
                                                            {it.category}
                                                        </span>
                                                    </div>
                                                    <span className="font-black text-orange-600 shrink-0 font-mono">
                                                        {it.price}
                                                    </span>
                                                </div>
                                            ))}
                                            {itemCount > 50 && (
                                                <div className="pt-2 text-center text-[11px] text-slate-400 font-medium italic">
                                                    ... and {itemCount - 50} more items
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Footer Submit Buttons */}
                            <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    disabled={isLoading}
                                    className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={isLoading || itemCount === 0 || !!parseError}
                                    className={`px-6 py-2.5 rounded-xl text-white font-black text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2 ${
                                        isLoading || itemCount === 0 || !!parseError
                                            ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                                            : "bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 shadow-orange-500/25"
                                    }`}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                            <span>Saving...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Save Menu to Database</span>
                                            <span>→</span>
                                        </>
                                    )}
                                </button>
                            </div>

                        </form>
                    )}

                </div>

            </div>
        </div>
    );
}
