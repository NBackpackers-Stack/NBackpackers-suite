import React from 'react';

interface FilterBarProps {
    dateFilter: string;
    setDateFilter: (val: string) => void;
    itemFilter: string;
    setItemFilter: (val: string) => void;
    onSearch: () => void;
    onClear: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ 
    dateFilter, setDateFilter, itemFilter, setItemFilter, onSearch, onClear 
}) => {
    return (
        <div className="bg-white/80 backdrop-blur-xl p-3 md:p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-2.5">
            <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <input 
                        type="date" 
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                    />
                </div>
                
                <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search by item name..." 
                        value={itemFilter}
                        onChange={(e) => setItemFilter(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                    />
                </div>
            </div>
            
            <div className="flex gap-2 justify-end">
                {(dateFilter || itemFilter) && (
                    <button 
                        onClick={onClear}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                    >
                        Clear
                    </button>
                )}
                <button 
                    onClick={onSearch}
                    className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 hover:shadow-lg transition-all active:scale-95 flex items-center gap-1.5"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
};
