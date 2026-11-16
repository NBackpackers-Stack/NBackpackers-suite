"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CafeDashboard() {
  const router = useRouter();

  const tiles = [
    {
      title: "Current Stock",
      description: "Monitor beverage ingredients, snacks, and consumable inventory levels.",
      href: "#stock",
      bgLight: "bg-amber-100",
      textColor: "text-amber-700",
      hoverBg: "group-hover:bg-amber-500",
      borderColor: "hover:border-amber-200",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      title: "Add Inventory Item",
      description: "Register new coffee beans, dairy, syrups, packaging, or snacks into stock.",
      href: "#add-item",
      bgLight: "bg-orange-100",
      textColor: "text-orange-700",
      hoverBg: "group-hover:bg-orange-500",
      borderColor: "hover:border-orange-200",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Menu & Pricing",
      description: "View and customize hot beverages, iced brews, bakery, and snack offerings.",
      href: "#menu",
      bgLight: "bg-amber-100",
      textColor: "text-amber-800",
      hoverBg: "group-hover:bg-amber-600",
      borderColor: "hover:border-amber-200",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: "Daily Consumption & Orders",
      description: "Log daily cafe supplies consumed and create customer beverage and food orders.",
      href: "/cafe/makeOrder",
      bgLight: "bg-rose-100",
      textColor: "text-rose-600",
      hoverBg: "group-hover:bg-rose-500",
      borderColor: "hover:border-rose-200",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      title: "Purchases & Procurement",
      description: "Record vendor restock invoices, milk deliveries, and wholesale supplies.",
      href: "#purchases",
      bgLight: "bg-emerald-100",
      textColor: "text-emerald-600",
      hoverBg: "group-hover:bg-emerald-500",
      borderColor: "hover:border-emerald-200",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: "Cafe Reports & Analytics",
      description: "Analyze daily sales volume, ingredient costs, and popular items.",
      href: "#reports",
      bgLight: "bg-indigo-100",
      textColor: "text-indigo-600",
      hoverBg: "group-hover:bg-indigo-500",
      borderColor: "hover:border-indigo-200",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-amber-200 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 font-semibold text-xs sm:text-sm shadow-xs hover:shadow transition-all cursor-pointer active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>

          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            Branch Operations
          </span>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950 text-white p-8 md:p-12 shadow-xl shadow-amber-950/20 mb-10 border border-amber-800/40">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30 text-xs font-bold tracking-wider uppercase mb-4 backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h1a4 4 0 110 8h-1M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8zM6 2v3M10 2v3M14 2v3" />
              </svg>
              Hospitality Portal
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-3">
              Cafe Operations Dashboard
            </h1>
            <p className="text-amber-100/90 text-sm md:text-base font-medium leading-relaxed">
              Track beverage inventory, manage menu offerings, log daily customer orders, and oversee branch cafe procurement seamlessly.
            </p>
          </div>
        </div>

        {/* Quick Operational Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tiles.map((tile, idx) => (
            <Link
              key={idx}
              href={tile.href}
              className={`group relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${tile.borderColor} flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl ${tile.bgLight} ${tile.textColor} ${tile.hoverBg} group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-inner`}>
                    {tile.icon}
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-600 transition-colors">
                    Portal
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-700 transition-colors mb-2">
                  {tile.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                  {tile.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700 group-hover:text-amber-800">
                <span>Access Module</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
