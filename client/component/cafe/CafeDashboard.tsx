"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCreateMenu } from "@/hooks/cafe/useCreateMenu";
import CreateMenuModal from "@/component/cafe/CreateMenuModal";

export default function CafeDashboard() {
  const router = useRouter();
  const createMenuState = useCreateMenu();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/40 via-amber-50/20 to-slate-50 font-sans selection:bg-orange-200 pt-24 sm:pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation & Branch Header */}
        <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-slate-900 font-bold text-xs sm:text-sm shadow-2xs hover:shadow-xs transition-all cursor-pointer active:scale-95"
          >
            <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Home</span>
          </button>

          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            IDST Branch
          </span>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-amber-950 to-orange-950 text-white p-6 sm:p-10 shadow-xl shadow-amber-950/20 mb-8 sm:mb-10 border border-amber-800/30">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-gradient-to-br from-orange-500/20 to-amber-400/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-60 h-60 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-200 border border-white/15 text-xs font-bold tracking-wider uppercase mb-3">
              <span>☕</span> IDST Backpackers Cafe Portal
            </div>
            
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-2 text-white">
              Cafe Management Dashboard
            </h1>
            <p className="text-amber-100/85 text-xs sm:text-sm md:text-base font-medium leading-relaxed">
              Configure your cafe menu, manage inventory database, and take customer orders for hot drinks, snacks, and meals.
            </p>
          </div>
        </div>

        {/* Dashboard Operational Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          
          {/* Tile 1: Create Menu (Opens Modal Box to paste array of objects) */}
          <div
            onClick={createMenuState.openModal}
            className="group relative overflow-hidden bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/90 hover:border-orange-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 group-hover:bg-gradient-to-tr group-hover:from-orange-500 group-hover:to-amber-500 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-orange-700 bg-orange-100/70 border border-orange-200 px-2.5 py-1 rounded-full">
                  Database Setup
                </span>
              </div>

              <h2 className="text-xl font-black text-slate-900 group-hover:text-orange-600 transition-colors mb-2">
                Create Menu
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                Open the menu configuration box to paste your array of menu objects (with category, item name, and price) directly into the MongoDB database.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-orange-600 group-hover:text-orange-700">
              <span className="flex items-center gap-1.5">
                <span>📋</span> Paste & Save Menu Objects
              </span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Tile 2: Edit Menu (Manage, Edit, Add & Delete Items) */}
          <Link
            href="/cafe/editMenu"
            className="group relative overflow-hidden bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/90 hover:border-amber-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 group-hover:bg-gradient-to-tr group-hover:from-amber-500 group-hover:to-orange-500 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-amber-800 bg-amber-100/70 border border-amber-200 px-2.5 py-1 rounded-full">
                  Menu Management
                </span>
              </div>

              <h2 className="text-xl font-black text-slate-900 group-hover:text-amber-700 transition-colors mb-2">
                Edit Menu
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                Update dish prices, modify item names, manage availability status, add new dishes, and remove items from the cafe menu.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-amber-700 group-hover:text-amber-800">
              <span className="flex items-center gap-1.5">
                <span>✏️</span> Open Menu Editor
              </span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

        </div>

      </div>

      {/* Create Menu Box / Modal */}
      <CreateMenuModal {...createMenuState} />

    </div>
  );
}
