'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type FieldType = 'rating' | 'text' | 'textarea' | 'image';

import useRecciTour from '@/hooks/trips/useRecciTour';

interface FieldDef {
    name: string;
    type: FieldType;
}

const LOCATIONS = [
    { value: "shimla", label: "Shimla" },
    { value: "dharamshala", label: "Dharamshala" },
    { value: "jaipur", label: "Jaipur" },
    { value: "manali", label: "Manali" },
    { value: "goa", label: "Goa" },
    { value: "rishikesh", label: "Rishikesh" },
    { value: "Diu", label: "Diu" },
    { value: "Somnath", label: "Somnath" },
    { value: "Gir", label: "Gir" },
    { value: "other", label: "Other (Specify in comments)" },
];

const CATEGORIES: Record<string, FieldDef[]> = {
    "Location": [
        { name: "Distance from major attractions", type: "rating" },
        { name: "Road condition", type: "rating" },
        { name: "Bus accessibility", type: "rating" },
        { name: "Bus parking", type: "rating" },
        { name: "Safe boarding/deboarding", type: "rating" },
        { name: "Nearby hospital", type: "rating" },
        { name: "Nearby pharmacy", type: "rating" },
        { name: "Mobile network", type: "rating" },
        { name: "Overall location", type: "rating" },
        { name: "Review", type: "textarea" },
    ],
    "Exterior": [
        { name: "Overall cleanliness", type: "rating" },
        { name: "Entrance appearance", type: "rating" },
        { name: "Security gate", type: "rating" },
        { name: "Boundary wall", type: "rating" },
        { name: "CCTV coverage", type: "rating" },
        { name: "Night lighting", type: "rating" },
        { name: "Parking area", type: "rating" },
        { name: "Landscaping", type: "rating" },
        { name: "Overall exterior", type: "rating" },
        { name: "Review", type: "textarea" },
    ],
    "Reception": [
        { name: "Reception capacity", type: "rating" },
        { name: "Check-in efficiency", type: "rating" },
        { name: "Reception staff", type: "rating" },
        { name: "Luggage holding area", type: "rating" },
        { name: "Waiting area", type: "rating" },
        { name: "Washrooms", type: "rating" },
        { name: "Drinking water", type: "rating" },
        { name: "Hospitality", type: "rating" },
        { name: "Overall reception", type: "rating" },
        { name: "Review", type: "textarea" },
    ],
    "Rooms": [
        { name: "Room size", type: "rating" },
        { name: "Bed & mattress", type: "rating" },
        { name: "Bedsheet & linen", type: "rating" },
        { name: "Pillow quality", type: "rating" },
        { name: "Towels", type: "rating" },
        { name: "Door lock", type: "rating" },
        { name: "Window lock", type: "rating" },
        { name: "Balcony safety", type: "rating" },
        { name: "Lighting", type: "rating" },
        { name: "AC", type: "rating" },
        { name: "Fan", type: "rating" },
        { name: "Heater", type: "rating" },
        { name: "TV", type: "rating" },
        { name: "Cupboard", type: "rating" },
        { name: "Tea/Coffee maker", type: "rating" },
        { name: "Charging points", type: "rating" },
        { name: "Wi-Fi", type: "rating" },
        { name: "Mobile network", type: "rating" },
        { name: "Room odour", type: "rating" },
        { name: "Luggage space", type: "rating" },
        { name: "Overall room condition", type: "rating" },
        { name: "Review", type: "textarea" },
    ],
    "Bathrooms": [
        { name: "Hot water", type: "rating" },
        { name: "Flush", type: "rating" },
        { name: "Wash basin", type: "rating" },
        { name: "Shower", type: "rating" },
        { name: "Water pressure", type: "rating" },
        { name: "Drainage", type: "rating" },
        { name: "Toilet cleanliness", type: "rating" },
        { name: "Exhaust fan", type: "rating" },
        { name: "Mirror", type: "rating" },
        { name: "Soap & toiletries", type: "rating" },
        { name: "Bucket & mug", type: "rating" },
        { name: "Anti-slip flooring", type: "rating" },
        { name: "Odour", type: "rating" },
        { name: "Overall bathroom", type: "rating" },
        { name: "Review", type: "textarea" },
    ],
    "Dining": [
        { name: "Dining capacity", type: "rating" },
        { name: "Group seating", type: "rating" },
        { name: "Buffet setup", type: "rating" },
        { name: "Buffet counters", type: "rating" },
        { name: "Hand wash area", type: "rating" },
        { name: "Drinking water", type: "rating" },
        { name: "Seating comfort", type: "rating" },
        { name: "Lighting", type: "rating" },
        { name: "Ventilation", type: "rating" },
        { name: "Cleanliness", type: "rating" },
        { name: "Food refill speed", type: "rating" },
        { name: "Queue management", type: "rating" },
        { name: "Overall dining", type: "rating" },
        { name: "Review", type: "textarea" },
    ],
    "Kitchen": [
        { name: "Staff hygiene", type: "rating" },
        { name: "Staff uniforms", type: "rating" },
        { name: "Hair caps", type: "rating" },
        { name: "Gloves", type: "rating" },
        { name: "Clean utensils", type: "rating" },
        { name: "Food storage", type: "rating" },
        { name: "Refrigeration", type: "rating" },
        { name: "Vegetable washing area", type: "rating" },
        { name: "Dishwashing area", type: "rating" },
        { name: "Garbage disposal", type: "rating" },
        { name: "Pest control", type: "rating" },
        { name: "Cooking oil quality", type: "rating" },
        { name: "Overall kitchen hygiene", type: "rating" },
        { name: "Review", type: "textarea" },
    ],
    "Food": [
        { name: "Breakfast", type: "rating" },
        { name: "Lunch", type: "rating" },
        { name: "Dinner", type: "rating" },
        { name: "Snacks", type: "rating" },
        { name: "Taste", type: "rating" },
        { name: "Freshness", type: "rating" },
        { name: "Variety", type: "rating" },
        { name: "Presentation", type: "rating" },
        { name: "Portion size", type: "rating" },
        { name: "Hygiene", type: "rating" },
        { name: "Student-friendly menu", type: "rating" },
        { name: "Jain food availability", type: "rating" },
        { name: "Special diet availability", type: "rating" },
        { name: "Overall food quality", type: "rating" },
        { name: "Review", type: "textarea" },
    ],
    "Safety": [
        { name: "Fire extinguishers", type: "rating" },
        { name: "Smoke detectors", type: "rating" },
        { name: "Fire alarm system", type: "rating" },
        { name: "Emergency exits", type: "rating" },
        { name: "Emergency signage", type: "rating" },
        { name: "First aid kit", type: "rating" },
        { name: "Security guards", type: "rating" },
        { name: "Night security", type: "rating" },
        { name: "CCTV", type: "rating" },
        { name: "Boundary security", type: "rating" },
        { name: "Staircase safety", type: "rating" },
        { name: "Balcony safety", type: "rating" },
        { name: "Electrical safety", type: "rating" },
        { name: "Swimming pool safety", type: "rating" },
        { name: "Overall safety", type: "rating" },
        { name: "Review", type: "textarea" },
    ],
    "Activities": [
        { name: "Adventure equipment", type: "rating" },
        { name: "Safety gear", type: "rating" },
        { name: "Helmets", type: "rating" },
        { name: "Harness", type: "rating" },
        { name: "Certified instructors", type: "rating" },
        { name: "SOP availability", type: "rating" },
        { name: "Indoor games", type: "rating" },
        { name: "Outdoor games", type: "rating" },
        { name: "Bonfire area", type: "rating" },
        { name: "DJ area", type: "rating" },
        { name: "Amphitheatre", type: "rating" },
        { name: "Garden", type: "rating" },
        { name: "Sports ground", type: "rating" },
        { name: "Swimming pool", type: "rating" },
        { name: "Overall recreation", type: "rating" },
        { name: "Review", type: "textarea" },
    ],
    "Medical": [
        { name: "Doctor on call", type: "rating" },
        { name: "Ambulance", type: "rating" },
        { name: "First aid room", type: "rating" },
        { name: "First aid box", type: "rating" },
        { name: "Wheelchair", type: "rating" },
        { name: "Emergency contacts", type: "rating" },
        { name: "Overall medical preparedness", type: "rating" },
        { name: "Review", type: "textarea" },
    ],
    "Staff": [
        { name: "Courtesy", type: "rating" },
        { name: "Grooming", type: "rating" },
        { name: "Uniform", type: "rating" },
        { name: "Communication", type: "rating" },
        { name: "Reception staff", type: "rating" },
        { name: "Restaurant staff", type: "rating" },
        { name: "Housekeeping staff", type: "rating" },
        { name: "Security staff", type: "rating" },
        { name: "Group handling experience", type: "rating" },
        { name: "Overall professionalism", type: "rating" },
        { name: "Review", type: "textarea" },
    ],
    "Commercial": [
        { name: "Driver accommodation", type: "rating" },
        { name: "Driver meals", type: "rating" },
        { name: "Welcome drink", type: "rating" },
        { name: "Bonfire inclusion", type: "rating" },
        { name: "DJ inclusion", type: "rating" },
        { name: "Activities inclusion", type: "rating" },
        { name: "Early check-in", type: "rating" },
        { name: "Late check-out", type: "rating" },
        { name: "Packed breakfast", type: "rating" },
        { name: "Packed lunch", type: "rating" },
        { name: "Late dinner", type: "rating" },
        { name: "Meal customization", type: "rating" },
        { name: "Review", type: "textarea" },
    ],
    "Image documentation": [
        { name: "Hotel entrance", type: "image" },
        { name: "Parking", type: "image" },
        { name: "Reception", type: "image" },
        { name: "Standard rooms", type: "image" },
        { name: "Washrooms", type: "image" },
        { name: "Dining hall", type: "image" },
        { name: "Adventure area", type: "image" },
        { name: "Play area", type: "image" },
        { name: "Fire extinguishers", type: "image" },
        { name: "Emergency exits", type: "image" },
        { name: "View", type: "image" },
        { name: "Corridors", type: "image" },
        { name: "Staircases", type: "image" },
        { name: "Bus parking", type: "image" },
        { name: "Night lighting", type: "image" },
        { name: "Review", type: "textarea" },
    ],
    "Final Review": [
        { name: "Overall hotel score", type: "rating" },
        { name: "Strengths", type: "textarea" },
        { name: "Weaknesses", type: "textarea" },
        { name: "Critical observations", type: "textarea" },
    ],
};

const StarRating = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
    const [hoverValue, setHoverValue] = useState(0);
    return (
        <div className="flex gap-1" onMouseLeave={() => setHoverValue(0)}>
            {[1, 2, 3, 4, 5].map(rating => (
                <button
                    key={rating}
                    type="button"
                    onClick={() => onChange(rating.toString())}
                    onMouseEnter={() => setHoverValue(rating)}
                    className="p-1 focus:outline-none transform transition-transform hover:scale-110 active:scale-95"
                >
                    <svg
                        className={`w-7 h-7 transition-colors duration-200 ${rating <= (hoverValue || parseInt(value) || 0)
                            ? 'text-amber-400 fill-amber-400 drop-shadow-sm'
                            : 'text-slate-200 fill-transparent'
                            }`}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                </button>
            ))}
            <span className="ml-2 text-xs font-medium text-slate-400 self-center min-w-[60px]">
                {value === '1' && 'Poor'}
                {value === '2' && 'Fair'}
                {value === '3' && 'Good'}
                {value === '4' && 'Very Good'}
                {value === '5' && 'Excellent'}
            </span>
        </div>
    );
};

export default function RecciForm() {
    const {
        formData,
        expandedCategory,
        categoryData,
        isSubmitting,
        handleChange,
        handleCategoryFieldChange,
        toggleCategory,
        handleSubmit,
    } = useRecciTour();


    return (
        <div className="min-h-screen bg-slate-50 pt-20 pb-12 px-5 font-sans">
            {/* Header / Back button */}
            <div className="mb-6 flex items-center animate-fade-in-down">
                <Link href="/trips" className="mr-3 p-2 bg-white rounded-full shadow-sm hover:bg-slate-100 transition-colors border border-slate-200">
                    <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </Link>
                <h1 className="text-2xl font-bold text-slate-800">New RECCI Tour</h1>
            </div>

            {/* Main Form Card */}
            <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-100 overflow-hidden animate-fade-in-up">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl pointer-events-none"></div>
                    <h2 className="text-xl font-bold mb-1 relative z-10 drop-shadow-sm">Plan a Recce Visit</h2>
                    <p className="text-indigo-100 text-sm relative z-10">Fill out the details below to initiate a location reconnaissance.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">

                    {/* Section 1: Core Details */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider flex items-center border-b border-slate-100 pb-2">
                            <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                            Hotel Details
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700">Name of Hotel/Resort</label>
                                <input
                                    type="text"
                                    name="schoolName"
                                    value={formData.schoolName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                                    placeholder="e.g. Delhi Public School"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700">Coordinator Name</label>
                                <input
                                    type="text"
                                    name="coordinatorName"
                                    value={formData.coordinatorName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Destination & Dates */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider flex items-center border-b border-slate-100 pb-2">
                            <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            Trip Requirements
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700">Target Location</label>
                                <div className="relative">
                                    <select
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none appearance-none"
                                    >
                                        <option value="" disabled>Select a destination</option>
                                        {LOCATIONS.map(loc => (
                                            <option key={loc.value} value={loc.value}>{loc.label}</option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700">Date</label>
                                <input
                                    type="date"
                                    name="travelDate"
                                    value={formData.travelDate}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Assessment Categories (Accordions) */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider flex items-center border-b border-slate-100 pb-2">
                            <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                            Inspection Checklist
                        </h3>

                        <div className="space-y-3">
                            {Object.entries(CATEGORIES).map(([category, fields]) => {
                                const isExpanded = expandedCategory === category;
                                // Calculate how many fields are filled in this category
                                const filledFields = fields.filter(f => categoryData[category]?.[f.name]).length;

                                return (
                                    <div key={category} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all">
                                        <button
                                            type="button"
                                            onClick={() => toggleCategory(category)}
                                            className={`w-full flex items-center justify-between p-4 transition-colors ${isExpanded ? 'bg-indigo-50/50' : 'hover:bg-slate-50'}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`p-1.5 rounded-lg ${filledFields === fields.length ? 'bg-green-100 text-green-600' : 'bg-indigo-100 text-indigo-600'}`}>
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        {filledFields === fields.length
                                                            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                        }
                                                    </svg>
                                                </div>
                                                <span className="font-semibold text-slate-700">{category}</span>
                                                <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                                                    {filledFields}/{fields.length} completed
                                                </span>
                                            </div>
                                            <svg className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </button>

                                        {isExpanded && (
                                            <div className="p-5 border-t border-slate-100 bg-slate-50/50 animate-fade-in-down">
                                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-6">
                                                    {fields.map((field, idx) => {
                                                        const value = categoryData[category]?.[field.name] || '';

                                                        return (
                                                            <div key={idx} className={`space-y-2 ${field.type === 'textarea' ? 'xl:col-span-2' : ''}`}>
                                                                <label className="text-sm font-medium text-slate-700 flex justify-between items-center">
                                                                    <span>{field.name}</span>
                                                                </label>

                                                                {field.type === 'rating' ? (
                                                                    <StarRating
                                                                        value={value}
                                                                        onChange={(val) => handleCategoryFieldChange(category, field.name, val)}
                                                                    />
                                                                ) : field.type === 'textarea' ? (
                                                                    <textarea
                                                                        value={value}
                                                                        onChange={(e) => handleCategoryFieldChange(category, field.name, e.target.value)}
                                                                        rows={3}
                                                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none resize-none shadow-sm"
                                                                        placeholder={`Enter ${field.name.toLowerCase()}...`}
                                                                    ></textarea>
                                                                ) : field.type === 'image' ? (
                                                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:border-indigo-400 transition-colors bg-white">
                                                                        <div className="space-y-1 text-center">
                                                                            <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                            </svg>
                                                                            <div className="flex text-sm text-slate-600 justify-center">
                                                                                <label htmlFor={`file-upload-${category}-${idx}`} className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                                                    <span>Upload a file</span>
                                                                                    <input id={`file-upload-${category}-${idx}`} name={`file-upload-${category}-${idx}`} type="file" accept="image/*" className="sr-only" onChange={(e) => {
                                                                                        if (e.target.files && e.target.files.length > 0) {
                                                                                            handleCategoryFieldChange(category, field.name, e.target.files[0]);
                                                                                        }
                                                                                    }} />
                                                                                </label>
                                                                                <p className="pl-1">or drag and drop</p>
                                                                            </div>
                                                                            <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                                                                            {value && <p className="text-xs text-indigo-600 font-semibold mt-2">Selected: {value.name || value}</p>}
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <input
                                                                        type="text"
                                                                        value={value}
                                                                        onChange={(e) => handleCategoryFieldChange(category, field.name, e.target.value)}
                                                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none shadow-sm"
                                                                        placeholder={`Enter ${field.name.toLowerCase()}...`}
                                                                    />
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 border-t border-slate-100">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-4 px-4 rounded-xl text-white font-semibold text-lg shadow-md transition-all duration-300 flex items-center justify-center
                                ${isSubmitting
                                    ? 'bg-indigo-400 cursor-not-allowed'
                                    : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg active:scale-[0.98]'
                                }
                            `}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving Assessment...
                                </>
                            ) : 'Save Assessment Report'}
                        </button>
                    </div>

                </form>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in-up {
          opacity: 0;
          animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.1s;
        }
      `}} />
        </div>
    );
}
