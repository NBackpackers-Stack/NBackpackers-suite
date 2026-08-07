"use client";

import React, { useState, useMemo } from 'react';
import { destinations } from '../../../public/destination';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'profit-asc' | 'profit-desc' | 'ourPrice-asc' | 'ourPrice-desc';

const extractNumber = (str: string | number) => {
    if (str === null || str === undefined || str === '') return 0;
    if (typeof str === 'number') return str;
    const match = str.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
};

export default function DestinationsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState<SortOption>('default');

    const filteredAndSortedDestinations = useMemo(() => {
        let result = [...destinations];

        // Filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(dest =>
                dest.destinationName.toLowerCase().includes(query) ||
                dest.price.toLowerCase().includes(query) ||
                dest.address.toLowerCase().includes(query) ||
                String(dest.profit).includes(query) ||
                dest.ourPrice.toLowerCase().includes(query)
            );
        }

        // Sort
        if (sortConfig !== 'default') {
            result.sort((a, b) => {
                if (sortConfig === 'price-asc' || sortConfig === 'price-desc') {
                    const valA = extractNumber(a.price);
                    const valB = extractNumber(b.price);
                    return sortConfig === 'price-asc' ? valA - valB : valB - valA;
                }
                if (sortConfig === 'profit-asc' || sortConfig === 'profit-desc') {
                    return sortConfig === 'profit-asc' ? a.profit - b.profit : b.profit - a.profit;
                }
                if (sortConfig === 'ourPrice-asc' || sortConfig === 'ourPrice-desc') {
                    const valA = extractNumber(a.ourPrice);
                    const valB = extractNumber(b.ourPrice);
                    return sortConfig === 'ourPrice-asc' ? valA - valB : valB - valA;
                }
                return 0;
            });
        }

        return result;
    }, [searchQuery, sortConfig]);

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8 animate-fade-in-down">
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100/60 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                        <div className="relative z-10">
                            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2 flex items-center gap-3">
                                <span className="bg-blue-100 text-blue-600 p-2 rounded-xl">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                                Trip Destinations
                            </h1>
                            <p className="text-slate-500 font-medium text-sm ml-1">
                                Browse our curated list of exciting trip locations and their pricing details.
                            </p>
                        </div>

                        <div className="relative z-10">
                            <div className="inline-flex items-center justify-center px-4 py-2 bg-slate-100 text-slate-600 text-sm font-semibold rounded-full border border-slate-200 shadow-sm">
                                {filteredAndSortedDestinations.length} Destinations
                            </div>
                        </div>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center animate-fade-in-down" style={{ animationDelay: '100ms' }}>
                    {/* Search */}
                    <div className="relative w-full sm:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search destination, price, or address..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition duration-150 ease-in-out shadow-sm"
                        />
                    </div>

                    {/* Sorting */}
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        <select
                            value={sortConfig}
                            onChange={(e) => setSortConfig(e.target.value as SortOption)}
                            className="block w-full pl-3 pr-10 py-2.5 text-base text-slate-600 border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 sm:text-sm rounded-xl border shadow-sm transition duration-150 ease-in-out appearance-none"
                            style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")', backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                        >
                            <option value="default">Default Sort</option>
                            <option value="price-asc">Price (Low to High)</option>
                            <option value="price-desc">Price (High to Low)</option>
                            <option value="profit-asc">Profit (Low to High)</option>
                            <option value="profit-desc">Profit (High to Low)</option>
                            <option value="ourPrice-asc">Our Price (Low to High)</option>
                            <option value="ourPrice-desc">Our Price (High to Low)</option>
                        </select>
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-xl border border-white overflow-hidden animate-fade-up" style={{ animationDelay: '200ms' }}>
                    <div className="overflow-x-auto min-h-[400px]">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-800 text-white">
                                    <th className="py-5 px-6 text-xs font-bold uppercase tracking-widest opacity-90 rounded-tl-2xl">ID</th>
                                    <th className="py-5 px-6 text-xs font-bold uppercase tracking-widest opacity-90">Destination Name</th>
                                    <th className="py-5 px-6 text-xs font-bold uppercase tracking-widest opacity-90">Price Structure</th>
                                    <th className="py-5 px-6 text-xs font-bold uppercase tracking-widest opacity-90">Our Price</th>
                                    <th className="py-5 px-6 text-xs font-bold uppercase tracking-widest opacity-90 text-center">Profit</th>
                                    <th className="py-5 px-6 text-xs font-bold uppercase tracking-widest opacity-90 rounded-tr-2xl">Address</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredAndSortedDestinations.length > 0 ? (
                                    filteredAndSortedDestinations.map((dest, idx) => (
                                        <tr
                                            key={dest.id}
                                            className="group hover:bg-blue-50/40 transition-colors duration-300"
                                            style={{ animationDelay: `${idx * 40}ms` }}
                                        >
                                            <td className="py-4 px-6 text-sm font-semibold text-slate-400">
                                                #{String(dest.id).padStart(2, '0')}
                                            </td>
                                            <td className="py-4 px-6 text-sm font-bold text-slate-800">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0 group-hover:scale-110 transition-transform duration-300">
                                                        {dest.destinationName.charAt(0)}
                                                    </div>
                                                    {dest.destinationName}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-sm text-slate-600 font-medium">
                                                <div className="max-w-xs leading-relaxed whitespace-pre-wrap">
                                                    {dest.price}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-sm">
                                                {dest.ourPrice ? (
                                                    <span className="font-semibold text-slate-700">{dest.ourPrice}</span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200">
                                                        Pending
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-4 px-6 text-sm text-center">
                                                <div className="inline-flex items-center justify-center px-3 py-1 bg-green-100 text-green-700 rounded-lg font-bold text-xs border border-green-200 shadow-sm group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
                                                    Rs{dest.profit}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-sm text-slate-500 font-medium">
                                                <div className="flex items-start gap-2 max-w-sm">
                                                    <svg className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <span className="truncate group-hover:whitespace-normal group-hover:break-words transition-all duration-300">
                                                        {dest.address}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="py-12 px-6 text-center text-slate-500 font-medium">
                                            No destinations found matching your criteria.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
}
