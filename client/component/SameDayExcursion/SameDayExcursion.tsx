"use client";

import { useState, useMemo } from "react";
import { sameDayExcursions } from "../../utils/day";

interface ExcursionTheme {
    category: string;
    icon: string;
    badgeColor: string;
    gradient: string;
    accentColor: string;
    features: string[];
}

function getExcursionTheme(name: string, description: string): ExcursionTheme {
    const text = `${name} ${description}`.toLowerCase();

    if (text.includes("water") || text.includes("fun n food") || text.includes("worlds of wonder")) {
        return {
            category: "Water & Theme Park",
            icon: "water",
            badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
            gradient: "from-sky-500/10 via-cyan-500/5 to-transparent",
            accentColor: "text-sky-600",
            features: ["Water Rides", "Wave Pool", "Group Meals Available"],
        };
    }
    if (text.includes("astro") || text.includes("camping") || text.includes("stargazing")) {
        return {
            category: "Night Camping & Astronomy",
            icon: "sparkles",
            badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
            gradient: "from-indigo-500/15 via-purple-500/5 to-transparent",
            accentColor: "text-indigo-600",
            features: ["Telescope Stargazing", "Bonfire & DJ", "Buffet Meals"],
        };
    }
    if (text.includes("farm") || text.includes("rural") || text.includes("village")) {
        return {
            category: "Rural & Farm Tourism",
            icon: "sun",
            badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
            gradient: "from-amber-500/10 via-orange-500/5 to-transparent",
            accentColor: "text-amber-700",
            features: ["Village Life Experience", "Traditional Food", "Cultural Activities"],
        };
    }
    if (text.includes("museum") || text.includes("illusions") || text.includes("educational") || text.includes("kidzania")) {
        return {
            category: "Edutainment & Science",
            icon: "academic",
            badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
            gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
            accentColor: "text-emerald-700",
            features: ["Hands-on Learning", "Guided Tour", "Interactive Zones"],
        };
    }
    if (text.includes("game palacio") || text.includes("supercharged") || text.includes("arcade")) {
        return {
            category: "Arcade & Entertainment",
            icon: "gamepad",
            badgeColor: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
            gradient: "from-fuchsia-500/10 via-rose-500/5 to-transparent",
            accentColor: "text-fuchsia-600",
            features: ["Multiplayer Gaming", "VR & Bowling", "Food Combos"],
        };
    }
    return {
        category: "Adventure & Thrill",
        icon: "rocket",
        badgeColor: "bg-teal-50 text-teal-800 border-teal-200",
        gradient: "from-teal-500/10 via-emerald-500/5 to-transparent",
        accentColor: "text-teal-600",
        features: ["High-Rope Course", "Trampoline Park", "Certified Instructors"],
    };
}

function CategoryIcon({ icon, className }: { icon: string; className?: string }) {
    switch (icon) {
        case "water":
            return (
                <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2.34M16 2v4a2 2 0 0 0 2 2h4M12 9a3 3 0 0 0-3 3v2a3 3 0 0 0 6 0v-2a3 3 0 0 0-3-3z" />
                </svg>
            );
        case "sparkles":
            return (
                <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            );
        case "sun":
            return (
                <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            );
        case "academic":
            return (
                <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5" />
                </svg>
            );
        case "gamepad":
            return (
                <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0-8h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2m-6-8H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2m0-10V5m0 6v2m-3-4h6" />
                </svg>
            );
        default:
            return (
                <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            );
    }
}

export default function SameDayExcursion() {
    const [selectedImg, setSelectedImg] = useState<string | null>(null);
    const [selectedExcursion, setSelectedExcursion] = useState<typeof sameDayExcursions[0] | null>(null);
    const [filterCategory, setFilterCategory] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState<string>("");

    const enrichedExcursions = useMemo(() => {
        return sameDayExcursions.map((item) => {
            const theme = getExcursionTheme(item.name, item.description);
            return {
                ...item,
                theme,
            };
        });
    }, []);

    const categories = useMemo(() => {
        const unique = Array.from(new Set(enrichedExcursions.map((e) => e.theme.category)));
        return ["All", ...unique];
    }, [enrichedExcursions]);

    const filteredExcursions = useMemo(() => {
        return enrichedExcursions.filter((excursion) => {
            const matchesCategory = filterCategory === "All" || excursion.theme.category === filterCategory;
            const matchesSearch =
                excursion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                excursion.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                excursion.theme.category.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [enrichedExcursions, filterCategory, searchQuery]);

    const handleOpenModal = (excursion: typeof sameDayExcursions[0]) => {
        setSelectedImg(excursion.src);
        setSelectedExcursion(excursion);
    };

    const handleCloseModal = () => {
        setSelectedImg(null);
        setSelectedExcursion(null);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-teal-200">
            {/* Header Section */}
            <header className="pt-24 pb-12 px-4 md:px-8 text-center space-y-6 relative overflow-hidden flex flex-col items-center">
                {/* Decorative background blur */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-400/20 rounded-full blur-[100px] -z-10 mix-blend-multiply" />

                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-teal-100/80 text-teal-800 font-bold text-xs md:text-sm tracking-widest uppercase shadow-sm border border-teal-200/50 backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                    Curated School & Group Excursions
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight flex flex-col md:flex-row items-center justify-center gap-3 md:gap-5 mt-4">
                    <span className="leading-tight">In Collaboration with</span>
                    <div className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-2xl shadow-xl transform hover:scale-105 transition-all cursor-pointer border border-slate-700 mt-2 md:mt-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-9 md:w-9 text-teal-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        <span className="font-black text-xl md:text-2xl tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-white">NBackpackers</span>
                    </div>
                </h1>

                <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg pt-2 leading-relaxed px-2">
                    Discover unforgettable single-day school picnics, adventure camps, educational tours, and amusement park packages tailored for students and groups.
                </p>

                {/* Search & Filter Bar */}
                <div className="w-full max-w-4xl mx-auto pt-4 space-y-4">
                    <div className="relative max-w-md mx-auto">
                        <input
                            type="text"
                            placeholder="Search excursions by name, activity, or theme..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white/90 backdrop-blur rounded-2xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm text-slate-800 placeholder-slate-400 transition-all"
                        />
                        <svg
                            className="absolute left-4 top-3.5 h-5 w-5 text-slate-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 text-xs font-semibold p-1"
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilterCategory(cat)}
                                className={`px-4 py-1.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 border ${
                                    filterCategory === cat
                                        ? "bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/20"
                                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Grid Section */}
            <main className="max-w-7xl mx-auto px-4 md:px-8 pb-24 relative z-10">
                {filteredExcursions.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                        <p className="text-lg font-bold text-slate-700">No excursions found</p>
                        <p className="text-slate-500 text-sm mt-1">Try searching with a different term or clear filters.</p>
                        <button
                            onClick={() => {
                                setFilterCategory("All");
                                setSearchQuery("");
                            }}
                            className="mt-4 px-5 py-2 bg-teal-600 text-white rounded-xl text-sm font-semibold hover:bg-teal-700 transition"
                        >
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-7">
                        {filteredExcursions.map((excursion) => {
                            const formattedPrice = `₹${excursion.price.toLocaleString("en-IN")}`;

                            return (
                                <div
                                    key={excursion.id}
                                    className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 hover:border-teal-400/50 flex flex-col justify-between transform hover:-translate-y-1.5"
                                    onClick={() => handleOpenModal(excursion)}
                                >
                                    {/* Top Thematic Header Strip */}
                                    <div className={`relative p-5 pb-4 bg-gradient-to-br ${excursion.theme.gradient} border-b border-slate-100`}>
                                        {/* Background Subtle Pattern Graphic */}
                                        <div className="absolute top-2 right-2 opacity-10 text-slate-800 pointer-events-none">
                                            <CategoryIcon icon={excursion.theme.icon} className="w-24 h-24" />
                                        </div>

                                        <div className="relative z-10 space-y-3">
                                            {/* Category Badge & Excursion Index */}
                                            <div className="flex items-center justify-between gap-2">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-sm ${excursion.theme.badgeColor}`}
                                                >
                                                    <CategoryIcon icon={excursion.theme.icon} className="w-3.5 h-3.5" />
                                                    {excursion.theme.category}
                                                </span>
                                                <span className="text-[11px] font-extrabold text-slate-400 tracking-wider bg-white/70 px-2 py-0.5 rounded-md border border-slate-100">
                                                    #{String(excursion.id).padStart(2, "0")}
                                                </span>
                                            </div>

                                            {/* Destination / Excursion Title */}
                                            <h3 className="text-lg md:text-xl font-extrabold text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-2 leading-tight">
                                                {excursion.name}
                                            </h3>

                                            {/* Price Tag in INR */}
                                            <div className="flex items-baseline gap-1.5 pt-1">
                                                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Starting at</span>
                                                <span className="text-2xl font-black text-slate-900 tracking-tight">
                                                    {formattedPrice}
                                                </span>
                                                <span className="text-[11px] font-bold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-100">
                                                    + GST
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Body with Refined Description & Feature Highlights */}
                                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-white">
                                        {/* Description */}
                                        <p className="text-slate-600 text-xs md:text-sm leading-relaxed line-clamp-3">
                                            {excursion.description}
                                        </p>

                                        {/* Feature Badges */}
                                        <div className="flex flex-wrap gap-1.5">
                                            {excursion.theme.features.map((feat, idx) => (
                                                <span
                                                    key={idx}
                                                    className="inline-flex items-center text-[11px] font-medium text-slate-600 bg-slate-100/90 px-2.5 py-1 rounded-lg border border-slate-200/50"
                                                >
                                                    • {feat}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Bottom Action Bar */}
                                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                                            <span className="text-xs font-bold text-slate-700 group-hover:text-teal-600 transition-colors flex items-center gap-1.5">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                View Official Poster
                                            </span>

                                            <button
                                                className="p-1.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-teal-600 group-hover:text-white transition-all shadow-sm"
                                                title="View Full Brochure Poster"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleOpenModal(excursion);
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>

            {/* Modal for Full Image Poster */}
            {selectedImg && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-950/85 backdrop-blur-md transition-all duration-300 animate-in fade-in"
                    onClick={handleCloseModal}
                >
                    <div
                        className="relative max-w-4xl w-full flex flex-col items-center justify-center animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Top Bar with Title & Close Button */}
                        <div className="w-full flex items-center justify-between pb-3 text-white">
                            <div className="flex items-center gap-3">
                                {selectedExcursion && (
                                    <>
                                        <h3 className="font-bold text-lg md:text-xl text-white drop-shadow">
                                            {selectedExcursion.name}
                                        </h3>
                                        <span className="text-xs bg-teal-500/80 text-white font-semibold px-2.5 py-1 rounded-full backdrop-blur">
                                            ₹{selectedExcursion.price.toLocaleString("en-IN")} + GST
                                        </span>
                                    </>
                                )}
                            </div>

                            <button
                                className="text-white/80 hover:text-white transition-colors p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm"
                                onClick={handleCloseModal}
                                title="Close"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Enlarged Image */}
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/20 bg-slate-900 max-h-[80vh] flex items-center justify-center">
                            <img
                                src={selectedImg}
                                alt={selectedExcursion?.name || "Full Screen Excursion Poster"}
                                className="w-auto h-auto max-w-full max-h-[80vh] object-contain"
                            />
                        </div>

                        <p className="text-slate-300 text-xs mt-3 flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Click anywhere outside to close this brochure preview.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

