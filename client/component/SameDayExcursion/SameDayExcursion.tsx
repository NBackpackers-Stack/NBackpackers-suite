"use client";

import { useState } from "react";
import { sameDayExcursions } from "../../utils/day";

export default function SameDayExcursion() {
    const [selectedImg, setSelectedImg] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-teal-200">
            {/* Header Section */}
            <header className="pt-24 pb-12 px-4 md:px-8 text-center space-y-6 relative overflow-hidden flex flex-col items-center">
                {/* Decorative background blur */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-400/20 rounded-full blur-[100px] -z-10 mix-blend-multiply" />
                
                <div className="inline-block px-5 py-2 rounded-full bg-teal-100/80 text-teal-700 font-bold text-xs md:text-sm tracking-widest uppercase shadow-sm border border-teal-200/50 backdrop-blur-sm">
                    Discover Quick Getaways
                </div>
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight flex flex-col md:flex-row items-center justify-center gap-3 md:gap-5 mt-6">
                    <span className="leading-tight">In Collaboration with</span> 
                    {/* NBackpacker Logo representation */}
                    <div className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-2xl shadow-xl transform hover:scale-105 transition-all cursor-pointer border border-slate-700 mt-2 md:mt-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-9 md:w-9 text-teal-400" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        <span className="font-black text-xl md:text-2xl tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-white">NBackpackers</span>
                    </div>
                </h1>
                
                <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg pt-4 leading-relaxed px-2">
                    Explore our curated list of quick, thrilling day trips designed to help you recharge, uncover local attractions, and discover the world around you. 
                </p>
            </header>

            {/* Grid Section */}
            <main className="max-w-7xl mx-auto px-4 md:px-8 pb-24 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {sameDayExcursions.map((excursion) => (
                        <div 
                            key={excursion.id} 
                            className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 cursor-pointer flex flex-col transform hover:-translate-y-2 active:scale-95"
                            onClick={() => setSelectedImg(excursion.src)}
                        >
                            {/* Card Image */}
                            <div className="relative h-56 md:h-64 overflow-hidden bg-slate-200">
                                <img 
                                    src={excursion.src} 
                                    alt={excursion.name} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Gradient overlay for text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                                
                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <h3 className="text-xl md:text-2xl font-bold tracking-wide leading-tight">{excursion.name}</h3>
                                </div>
                                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur text-slate-900 text-sm font-black px-3 py-1.5 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-1">
                                    <span className="text-teal-600 text-xs">$</span>{excursion.price}
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
                                <p className="text-slate-600 text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-3">
                                    {excursion.description}
                                </p>
                                <div className="mt-5 md:mt-6 pt-4 border-t border-slate-100 text-teal-600 font-bold flex items-center justify-between group-hover:text-teal-700 transition-colors text-sm uppercase tracking-wide">
                                    View Full Image
                                    <span className="p-2 bg-teal-50 rounded-full group-hover:bg-teal-100 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Modal for Full Image */}
            {selectedImg && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-900/90 backdrop-blur-md transition-all duration-300 opacity-100" 
                    onClick={() => setSelectedImg(null)}
                >
                    <div 
                        className="relative max-w-6xl w-full flex flex-col items-center justify-center animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button 
                            className="absolute -top-14 right-0 text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full backdrop-blur-sm"
                            onClick={() => setSelectedImg(null)}
                            title="Close"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                        {/* Enlarged Image */}
                        <img 
                            src={selectedImg} 
                            alt="Full Screen Excursion" 
                            className="w-auto h-auto max-w-full max-h-[85vh] rounded-2xl shadow-2xl ring-1 ring-white/20 object-contain bg-slate-800"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
