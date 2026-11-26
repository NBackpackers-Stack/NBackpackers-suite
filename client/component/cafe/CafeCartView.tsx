"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCafeCart } from "@/hooks/cafe/useCafeCart";
import { useCreateOrder } from "@/hooks/cafe/useCreateOrder";

// Helper to determine if an item is non-veg
const isNonVegItem = (itemName: string): boolean => {
    const lower = itemName.toLowerCase();
    return lower.includes("chicken") || lower.includes("egg") || lower.includes("omlette");
};

// Category style & icon mapper matching the menu
const categoryMeta: { [key: string]: { icon: string; bg: string; text: string; border: string } } = {
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

export default function CafeCartView() {
    const router = useRouter();
    const {
        cartItems,
        addToCart,
        decrementItem,
        deleteItem,
        updateItemPrice,
        clearCart,
        totalQuantity,
        totalPrice,
        customerName,
        setCustomerName,
        customerNumber,
        setCustomerNumber,
        notes,
        setNotes,
    } = useCafeCart();

    const {
        isSubmitting,
        orderSuccess,
        errorMessage,
        clearError,
        isFormValid,
        handlePlaceOrder,
        handleNewOrder,
    } = useCreateOrder();

    return (
        <div className="w-full max-w-full overflow-x-hidden min-h-screen bg-gradient-to-b from-orange-50/40 via-amber-50/20 to-slate-50 font-sans selection:bg-orange-200 pt-3 sm:pt-6 pb-36 px-3.5 sm:px-4">
            <div className="w-full max-w-md sm:max-w-xl mx-auto">

                {/* Top Navigation */}
                <div className="flex items-center justify-between gap-2 mb-3.5 pt-1">
                    <button
                        type="button"
                        onClick={() => router.push("/cafe/menu")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-orange-50 border border-slate-200 text-slate-700 font-bold text-xs shadow-2xs active:scale-95 transition-all cursor-pointer"
                    >
                        <svg className="w-3.5 h-3.5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>Back to Menu</span>
                    </button>

                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                            Cart Checkout
                        </span>

                        {cartItems.length > 0 && !orderSuccess && (
                            <button
                                type="button"
                                onClick={clearCart}
                                className="text-[11px] font-bold text-slate-400 hover:text-rose-600 px-2 py-1 transition-colors cursor-pointer"
                            >
                                Clear All
                            </button>
                        )}
                    </div>
                </div>

                {/* Header Card - Vibrant Food Palette */}
                <header className="mb-4 bg-gradient-to-br from-stone-900 via-amber-950 to-orange-950 text-white rounded-3xl p-5 sm:p-6 shadow-xl shadow-amber-950/20 relative overflow-hidden border border-amber-800/30">
                    <div className="absolute top-0 right-0 -mt-6 -mr-6 w-36 h-36 bg-gradient-to-br from-orange-500/20 to-amber-400/20 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none"></div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-amber-200 border border-white/15 text-[10px] font-bold tracking-wider uppercase mb-2">
                            <span>🛒</span> IDST Campus Cafe
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight mb-1 text-white">
                            IDST Backpackers Cafe Cart
                        </h1>
                        <p className="text-amber-100/85 text-xs sm:text-sm font-medium leading-relaxed">
                            Review items, enter customer contact info & confirm order for preparation.
                        </p>
                    </div>
                </header>

                {/* Error Banner */}
                {errorMessage && (
                    <div className="mb-3.5 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center justify-between gap-2 shadow-2xs animate-in fade-in">
                        <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-black text-xs">!</span>
                            <span>{errorMessage}</span>
                        </div>
                        <button type="button" onClick={clearError} className="text-rose-400 hover:text-rose-700 font-bold px-1.5 py-0.5 text-sm">✕</button>
                    </div>
                )}

                {/* Success Order View */}
                {orderSuccess ? (
                    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-orange-100 shadow-xl shadow-orange-950/5 text-center animate-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center mb-3 shadow-lg shadow-emerald-500/25">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">
                            Order Confirmed! 🎉
                        </h2>
                        <p className="text-slate-500 text-xs sm:text-sm mb-5">
                            Order for <strong className="text-orange-600 font-bold">{customerName}</strong> ({customerNumber}) has been sent to the kitchen.
                        </p>

                        {/* Order Receipt Card */}
                        <div className="bg-gradient-to-b from-amber-50/60 to-orange-50/40 rounded-2xl p-4 border border-amber-200/80 mb-5 text-left shadow-2xs">
                            <div className="flex justify-between items-center pb-2.5 border-b border-amber-200/60 text-[11px] font-black text-amber-900 uppercase tracking-wider">
                                <span>Items Ordered</span>
                                <span>Subtotal</span>
                            </div>
                            <div className="divide-y divide-amber-100/70 my-1">
                                {cartItems.map((item, idx) => (
                                    <div key={idx} className="py-2 flex justify-between items-center text-xs">
                                        <div className="min-w-0 pr-2">
                                            <p className="font-extrabold text-slate-800 truncate">{item.name}</p>
                                            <p className="text-[10px] text-slate-500 font-medium">
                                                ₹{item.price} × {item.quantity}
                                            </p>
                                        </div>
                                        <span className="font-black text-slate-900 shrink-0">₹{item.subtotal}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="pt-2.5 border-t border-amber-200/60 flex justify-between items-center">
                                <div>
                                    <span className="text-[10px] font-black text-amber-900 block uppercase tracking-wider">Total Amount</span>
                                    {notes && <span className="text-[10px] text-slate-500 italic line-clamp-1">"{notes}"</span>}
                                </div>
                                <span className="text-2xl font-black text-orange-600">₹{totalPrice}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2.5">
                            <button
                                type="button"
                                onClick={handleNewOrder}
                                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 active:scale-95 transition-all cursor-pointer"
                            >
                                + Place Another Order
                            </button>
                            <button
                                type="button"
                                onClick={() => router.push("/cafe")}
                                className="w-full py-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer"
                            >
                                Back to Cafe Dashboard
                            </button>
                        </div>
                    </div>
                ) : cartItems.length === 0 ? (
                    /* Empty Cart State */
                    <div className="bg-white rounded-3xl p-8 text-center border border-slate-200/80 shadow-md">
                        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-orange-100 to-amber-100 text-orange-600 flex items-center justify-center text-3xl mb-4 shadow-inner">
                            🛒
                        </div>
                        <h2 className="text-lg sm:text-xl font-black text-slate-900 mb-1">
                            Your Cafe Cart is Empty
                        </h2>
                        <p className="text-slate-400 text-xs sm:text-sm max-w-xs mx-auto mb-6 leading-relaxed">
                            Explore our freshly prepared beverages, snacks, sandwiches, and meals to start building your order.
                        </p>
                        <button
                            type="button"
                            onClick={() => router.push("/cafe/menu")}
                            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-orange-500/25 active:scale-95 transition-all cursor-pointer"
                        >
                            Explore Menu
                        </button>
                    </div>
                ) : (
                    /* Cart Items & Form */
                    <form onSubmit={handlePlaceOrder} className="space-y-4">

                        {/* Cart Items List */}
                        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-sm">
                            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
                                <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                                    Order Items ({cartItems.length})
                                </h2>
                                <button
                                    type="button"
                                    onClick={() => router.push("/cafe/menu")}
                                    className="text-xs font-black text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
                                >
                                    <span>+ Add More</span>
                                </button>
                            </div>

                            <div className="divide-y divide-slate-100">
                                {cartItems.map((item, idx) => {
                                    const isNonVeg = isNonVegItem(item.name);
                                    const catStyle = categoryMeta[item.category] || { icon: "🍽️", bg: "bg-slate-50", text: "text-slate-700", border: "border-slate-200" };

                                    return (
                                        <div key={idx} className="py-3.5 flex items-center justify-between gap-3">
                                            {/* Item Name, Category Badge & Price */}
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <span
                                                        className={`w-3.5 h-3.5 rounded-xs border flex items-center justify-center shrink-0 ${
                                                            isNonVeg ? "border-rose-600" : "border-emerald-600"
                                                        }`}
                                                    >
                                                        <span
                                                            className={`w-1.5 h-1.5 rounded-full ${
                                                                isNonVeg ? "bg-rose-600" : "bg-emerald-600"
                                                            }`}
                                                        ></span>
                                                    </span>
                                                    <h3 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                                                        {item.name}
                                                    </h3>
                                                </div>

                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}>
                                                        <span>{catStyle.icon}</span>
                                                        <span>{item.category}</span>
                                                    </span>

                                                    {item.isMrp ? (
                                                        <div className="flex items-center gap-1 bg-amber-50 border border-amber-300 rounded-lg px-2 py-0.5">
                                                            <span className="text-[11px] text-amber-700 font-bold">₹</span>
                                                            <input
                                                                type="number"
                                                                min={0}
                                                                value={item.price === 0 ? "" : item.price}
                                                                onChange={(e) => updateItemPrice(item.name, parseFloat(e.target.value) || 0)}
                                                                placeholder="Enter MRP"
                                                                className="w-16 text-xs font-black text-slate-900 bg-transparent outline-none"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <span className="text-xs font-bold text-slate-500">
                                                            ₹{item.price} each
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Stepper, Subtotal & Delete */}
                                            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
                                                {/* Stepper */}
                                                <div className="flex items-center bg-orange-50/70 border border-orange-200 rounded-xl overflow-hidden shadow-2xs">
                                                    <button
                                                        type="button"
                                                        onClick={() => decrementItem(item.name)}
                                                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-orange-700 hover:bg-orange-100 active:bg-orange-200 font-black text-xs cursor-pointer transition-colors"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-6 text-center text-xs font-black text-slate-900">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => addToCart({ category: item.category, item: item.name, price: String(item.price) })}
                                                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-orange-700 hover:bg-orange-100 active:bg-orange-200 font-black text-xs cursor-pointer transition-colors"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                {/* Subtotal */}
                                                <span className="text-xs sm:text-sm font-black text-slate-900 min-w-[50px] text-right">
                                                    ₹{item.subtotal}
                                                </span>

                                                {/* Delete button */}
                                                <button
                                                    type="button"
                                                    onClick={() => deleteItem(item.name)}
                                                    className="w-7 h-7 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer"
                                                    title="Remove item"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Customer Information Card */}
                        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                                <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900">
                                    Customer Details
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {/* Customer Name */}
                                <div>
                                    <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1">
                                        Customer Name <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-orange-500">
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
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-base sm:text-sm font-semibold text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Customer Number */}
                                <div>
                                    <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1">
                                        Mobile Number <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-orange-600 font-black text-xs">
                                            +91
                                        </div>
                                        <input
                                            type="tel"
                                            required
                                            maxLength={10}
                                            value={customerNumber}
                                            onChange={(e) => setCustomerNumber(e.target.value.replace(/\D/g, ""))}
                                            placeholder="10-digit mobile"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-3 py-2.5 text-base sm:text-sm font-semibold text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Notes / Special Instructions Card */}
                        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                                <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900">
                                    Special Instructions / Notes (Optional)
                                </label>
                            </div>
                            <textarea
                                rows={2}
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="e.g. Extra spicy, parcel pack, no onion/garlic..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-base sm:text-sm font-semibold text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all resize-none"
                            />
                        </div>

                        {/* Bill Summary Card */}
                        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-2">
                            <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500">
                                <span>Item Total ({totalQuantity} items)</span>
                                <span className="font-bold text-slate-900">₹{totalPrice}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500">
                                <span>Taxes & Packing Charges</span>
                                <span className="font-bold text-emerald-600">Free / Included</span>
                            </div>
                            <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                                <span className="font-black text-slate-900 text-sm sm:text-base">To Pay</span>
                                <span className="font-black text-orange-600 text-lg sm:text-xl">₹{totalPrice}</span>
                            </div>
                        </div>

                        {/* Sticky Bottom Order Bar */}
                        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                            <div className="max-w-md sm:max-w-xl mx-auto flex items-center justify-between gap-3">
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block leading-tight">
                                        Total to Pay
                                    </span>
                                    <span className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                                        ₹{totalPrice}
                                    </span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={!isFormValid || isSubmitting}
                                    className={`px-7 sm:px-9 py-3.5 rounded-2xl text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all active:scale-95 cursor-pointer shrink-0 ${
                                        isFormValid && !isSubmitting
                                            ? "bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-700 shadow-orange-500/25"
                                            : "bg-slate-200 cursor-not-allowed text-slate-400 shadow-none"
                                    }`}
                                >
                                    {isSubmitting ? "Placing Order..." : "Place Order"}
                                </button>
                            </div>
                        </div>

                    </form>
                )}

            </div>
        </div>
    );
}
