"use client";

import React, { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMakeOrder, MenuItemType } from "@/hooks/cafe/useMakeOrder";

export default function MakeOrderForm() {
    const router = useRouter();
    const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const {
        customerName,
        setCustomerName,
        customerNumber,
        setCustomerNumber,
        notes,
        setNotes,
        items,
        addItemRow,
        removeItemRow,
        handleItemNameChange,
        selectMenuItem,
        handlePriceChange,
        handleQuantityChange,
        activeSuggestionRowId,
        setActiveSuggestionRowId,
        getSuggestionsForText,
        totalPrice,
        totalUnits,
        isValid,
        isSubmitting,
        orderSuccess,
        errorMessage,
        resetForm,
        handleSubmit,
    } = useMakeOrder();

    // Close suggestions dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (activeSuggestionRowId) {
                const currentRef = dropdownRefs.current[activeSuggestionRowId];
                if (currentRef && !currentRef.contains(event.target as Node)) {
                    setActiveSuggestionRowId(null);
                }
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [activeSuggestionRowId, setActiveSuggestionRowId]);

    // Popular quick items
    const quickItems: MenuItemType[] = [
        { category: "Hot Beverage", item: "Tea", price: "₹15" },
        { category: "Hot Beverage", item: "Coffee", price: "₹25" },
        { category: "Cold Beverage", item: "Cold Coffee", price: "₹70" },
        { category: "Snacks & Bites", item: "Samosa", price: "₹15" },
        { category: "Maggi & More", item: "Plain Maggi", price: "₹40" },
        { category: "Italian", item: "Grilled Sandwich", price: "₹80" },
    ];

    const handleQuickAdd = (menuItem: MenuItemType) => {
        const lastItem = items[items.length - 1];
        if (lastItem && !lastItem.itemName.trim()) {
            selectMenuItem(lastItem.id, menuItem);
        } else {
            addItemRow();
            setTimeout(() => {
                selectMenuItem(items[items.length - 1]?.id || "", menuItem);
            }, 0);
        }
    };

    return (
        <div className="w-full max-w-full overflow-x-hidden min-h-screen bg-gradient-to-b from-emerald-50/70 via-slate-50 to-emerald-50/40 font-sans selection:bg-emerald-200 pt-3 sm:pt-6 pb-36 px-3 sm:px-4">
            <div className="w-full max-w-md sm:max-w-lg mx-auto">

                {/* Mobile Top Header Bar */}
                <div className="flex items-center justify-between gap-2 mb-3.5 pt-1">
                    <button
                        type="button"
                        onClick={() => router.push("/cafe")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs shadow-2xs active:scale-95 transition-all cursor-pointer"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>Back</span>
                    </button>

                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            Cafe Desk
                        </span>
                        {items.some(i => i.itemName) && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="text-[11px] font-bold text-slate-400 hover:text-rose-600 px-2 py-1"
                            >
                                Reset
                            </button>
                        )}
                    </div>
                </div>

                {/* Mobile-Optimized Hero Banner */}
                <header className="mb-4 bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 text-white rounded-2xl p-4 sm:p-5 shadow-md shadow-emerald-900/15 relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-6 -mr-6 w-28 h-28 bg-emerald-400/15 rounded-full blur-2xl pointer-events-none"></div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-600/60 text-emerald-100 border border-emerald-400/30 text-[10px] font-bold tracking-wider uppercase mb-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M17 8h1a4 4 0 110 8h-1M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8zM6 2v3M10 2v3M14 2v3" />
                            </svg>
                            Backpacker Hospitality
                        </div>
                        <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-tight mb-1">
                            Backpacker Cafe Order
                        </h1>
                        <p className="text-emerald-100/90 text-xs font-medium leading-relaxed">
                            Select items from menu, set quantity & generate instant order.
                        </p>
                    </div>
                </header>

                {/* Error Banner */}
                {errorMessage && (
                    <div className="mb-3.5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center justify-between gap-2 shadow-2xs animate-in fade-in">
                        <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 shrink-0 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{errorMessage}</span>
                        </div>
                        <button type="button" onClick={() => {}} className="text-rose-500 hover:text-rose-800 font-bold px-1">✕</button>
                    </div>
                )}

                {/* Order Success Card */}
                {orderSuccess ? (
                    <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-lg text-center animate-in zoom-in-95 duration-200">
                        <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mb-0.5">
                            Order Placed!
                        </h2>
                        <p className="text-slate-500 text-xs mb-4">
                            Order for <strong className="text-emerald-800">{customerName}</strong> ({customerNumber}) recorded.
                        </p>

                        {/* Receipt Box */}
                        <div className="bg-emerald-50/60 rounded-xl p-3.5 border border-emerald-200/80 mb-4 text-left">
                            <div className="flex justify-between items-center pb-2 border-b border-emerald-200/60 text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                                <span>Item Details</span>
                                <span>Subtotal</span>
                            </div>
                            <div className="divide-y divide-emerald-100 my-1">
                                {items.filter(i => i.itemName).map((item, idx) => (
                                    <div key={idx} className="py-1.5 flex justify-between items-center text-xs">
                                        <div className="min-w-0 pr-2">
                                            <p className="font-bold text-slate-800 truncate">{item.itemName}</p>
                                            <p className="text-[10px] text-slate-400">
                                                ₹{item.price} × {item.quantity}
                                            </p>
                                        </div>
                                        <span className="font-black text-slate-900 shrink-0">₹{item.subtotal}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="pt-2 border-t border-emerald-200/60 flex justify-between items-center">
                                <div>
                                    <span className="text-[10px] font-bold text-emerald-800 block uppercase">Total Amount</span>
                                    {notes && <span className="text-[10px] text-slate-500 italic line-clamp-1">"{notes}"</span>}
                                </div>
                                <span className="text-xl font-black text-emerald-800">₹{totalPrice}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <button
                                type="button"
                                onClick={resetForm}
                                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm active:scale-95 transition-all cursor-pointer"
                            >
                                + Take Another Order
                            </button>
                            <button
                                type="button"
                                onClick={() => router.push("/cafe")}
                                className="w-full py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer"
                            >
                                Back to Cafe
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-3.5">

                        {/* Customer Information Card */}
                        <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-emerald-100 shadow-2xs">
                            <div className="flex items-center gap-1.5 mb-2.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                <h2 className="text-xs font-black uppercase tracking-wider text-emerald-950">
                                    Customer Details
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {/* Customer Name */}
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                                        Customer Name <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-600">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            value={customerName}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                            placeholder="e.g. Rahul Sharma"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-base sm:text-sm font-semibold text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Customer Number */}
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                                        Mobile Number <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-700 font-bold text-xs">
                                            +91
                                        </div>
                                        <input
                                            type="tel"
                                            required
                                            maxLength={10}
                                            value={customerNumber}
                                            onChange={(e) => setCustomerNumber(e.target.value.replace(/\D/g, ""))}
                                            placeholder="10-digit mobile"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-3 py-2 text-base sm:text-sm font-semibold text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Add Popular Items Bar */}
                        <div className="bg-emerald-50/70 border border-emerald-200/70 rounded-2xl p-3">
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-900 flex items-center gap-1">
                                    <span>⚡</span> Popular Items
                                </span>
                                <span className="text-[9px] text-emerald-700 font-bold">Tap to add</span>
                            </div>
                            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                                {quickItems.map((qi, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => handleQuickAdd(qi)}
                                        className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white hover:bg-emerald-100/70 border border-emerald-200/90 text-xs font-bold text-slate-800 shadow-2xs active:scale-95 transition-all cursor-pointer"
                                    >
                                        <span className="text-emerald-600 font-extrabold">+</span>
                                        <span>{qi.item}</span>
                                        <span className="text-emerald-700 font-black text-[11px] ml-0.5">{qi.price}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Order Items Section */}
                        <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-emerald-100 shadow-2xs">
                            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-100">
                                <div>
                                    <h2 className="text-xs font-black uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                        Order Items ({items.length})
                                    </h2>
                                    <p className="text-[10px] text-slate-400 font-medium">
                                        Type name to choose from menu
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={addItemRow}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-2xs active:scale-95 cursor-pointer"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add Item
                                </button>
                            </div>

                            {/* Item Rows - Mobile Structured Layout */}
                            <div className="space-y-2.5">
                                {items.map((itemRow, index) => {
                                    const suggestions = getSuggestionsForText(itemRow.itemName);
                                    const showDropdown = activeSuggestionRowId === itemRow.id && suggestions.length > 0;

                                    return (
                                        <div
                                            key={itemRow.id}
                                            className="p-3 rounded-xl bg-slate-50/90 border border-emerald-100/90 space-y-2"
                                        >
                                            {/* Top Line: Item # badge & Delete button */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[9px] flex items-center justify-center">
                                                        {index + 1}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                                        Item Selection
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-1.5">
                                                    {itemRow.category && (
                                                        <span className="text-[9px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">
                                                            {itemRow.category}
                                                        </span>
                                                    )}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItemRow(itemRow.id)}
                                                        className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 active:scale-90 transition-colors cursor-pointer"
                                                        title="Remove item"
                                                    >
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Item Name Input with Autocomplete */}
                                            <div
                                                className="relative"
                                                ref={(el) => {
                                                    dropdownRefs.current[itemRow.id] = el;
                                                }}
                                            >
                                                <input
                                                    type="text"
                                                    value={itemRow.itemName}
                                                    onFocus={() => setActiveSuggestionRowId(itemRow.id)}
                                                    onChange={(e) => {
                                                        handleItemNameChange(itemRow.id, e.target.value);
                                                        setActiveSuggestionRowId(itemRow.id);
                                                    }}
                                                    placeholder="Type name (Tea, Coffee, Maggi, Dosa)..."
                                                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-base sm:text-sm font-semibold text-slate-800 placeholder-slate-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                                />

                                                {/* Suggestions Dropdown */}
                                                {showDropdown && (
                                                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-emerald-200 rounded-xl shadow-xl z-50 max-h-48 overflow-y-auto divide-y divide-slate-100">
                                                        {suggestions.map((sug, sIdx) => (
                                                            <button
                                                                key={sIdx}
                                                                type="button"
                                                                onMouseDown={() => selectMenuItem(itemRow.id, sug)}
                                                                className="w-full px-3 py-2 text-left hover:bg-emerald-50 transition-colors flex items-center justify-between gap-2 cursor-pointer"
                                                            >
                                                                <div className="min-w-0">
                                                                    <span className="text-xs font-bold text-slate-800 block truncate">
                                                                        {sug.item}
                                                                    </span>
                                                                    <span className="text-[9px] text-slate-400 block">
                                                                        {sug.category}
                                                                    </span>
                                                                </div>
                                                                <span className="text-xs font-black text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                                                                    {sug.price}
                                                                </span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Bottom Line: Unit Price, Stepper, Subtotal */}
                                            <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-200/50">
                                                {/* Unit Price */}
                                                <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-2 py-1">
                                                    <span className="text-slate-400 font-bold text-xs">₹</span>
                                                    <input
                                                        type="number"
                                                        min={0}
                                                        value={itemRow.price === 0 && itemRow.isMrp ? "" : itemRow.price}
                                                        onChange={(e) => handlePriceChange(itemRow.id, parseFloat(e.target.value) || 0)}
                                                        placeholder={itemRow.isMrp ? "MRP" : "0"}
                                                        className="w-12 sm:w-16 text-xs sm:text-sm font-black text-slate-800 outline-none bg-transparent"
                                                    />
                                                </div>

                                                {/* Quantity Stepper */}
                                                <div className="flex items-center bg-white border border-slate-200 rounded-lg overflow-hidden">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleQuantityChange(itemRow.id, itemRow.quantity - 1)}
                                                        className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-emerald-50 active:bg-emerald-100 font-black text-xs cursor-pointer"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-7 text-center text-xs font-black text-slate-900">
                                                        {itemRow.quantity}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleQuantityChange(itemRow.id, itemRow.quantity + 1)}
                                                        className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-emerald-50 active:bg-emerald-100 font-black text-xs cursor-pointer"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                {/* Subtotal */}
                                                <div className="text-right">
                                                    <span className="text-[9px] font-bold text-slate-400 block uppercase leading-none">
                                                        Subtotal
                                                    </span>
                                                    <span className="text-sm font-black text-emerald-800 leading-tight">
                                                        ₹{itemRow.subtotal}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Add More Items Button */}
                            <button
                                type="button"
                                onClick={addItemRow}
                                className="w-full mt-3 py-2.5 rounded-xl border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/40 hover:bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-98"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                                </svg>
                                Add Another Item
                            </button>
                        </div>

                        {/* Special Instructions / Notes Card */}
                        <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-emerald-100 shadow-2xs">
                            <div className="flex items-center gap-1.5 mb-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                <label className="text-[11px] font-black uppercase tracking-wider text-emerald-950">
                                    Special Instructions / Notes (Optional)
                                </label>
                            </div>
                            <textarea
                                rows={2}
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="e.g. Less spicy, without onion, extra hot, parcel..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-base sm:text-sm font-semibold text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all resize-none"
                            />
                        </div>

                        {/* Sticky Bottom Floating Order Bar - Safe Area Inset Support */}
                        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-emerald-200/90 shadow-[0_-8px_25px_rgba(0,0,0,0.08)] px-4 py-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                            <div className="max-w-md sm:max-w-lg mx-auto flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block leading-tight">
                                        Total ({totalUnits} {totalUnits === 1 ? "unit" : "units"})
                                    </span>
                                    <span className="text-2xl font-black text-emerald-800 tracking-tight leading-none">
                                        ₹{totalPrice}
                                    </span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={!isValid || isSubmitting}
                                    className={`px-6 sm:px-8 py-3 rounded-xl text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer shrink-0 ${
                                        isValid && !isSubmitting
                                            ? "bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 shadow-emerald-700/25"
                                            : "bg-slate-300 cursor-not-allowed text-slate-500 shadow-none"
                                    }`}
                                >
                                    {isSubmitting ? "Placing..." : "Place Order"}
                                </button>
                            </div>
                        </div>

                    </form>
                )}

            </div>
        </div>
    );
}
