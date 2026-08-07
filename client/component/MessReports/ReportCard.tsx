import React from 'react';
import { MEAL_TYPES } from '@/constants/messReports.constants';

interface ReportCardProps {
    record: any;
    activeTab: 'consumption' | 'purchase';
    onImageClick: (url: string) => void;
}

export const ReportCard: React.FC<ReportCardProps> = ({ record, activeTab, onImageClick }) => {
    const formatDate = (dateString: string) => {
        if (!dateString) return "Unknown Date";
        const d = new Date(dateString);
        return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const isConsumption = activeTab === 'consumption';
    const themeColor = isConsumption ? 'indigo' : 'emerald';
    const gradientFrom = isConsumption ? 'from-indigo-500' : 'from-emerald-500';
    const gradientTo = isConsumption ? 'to-purple-500' : 'to-teal-500';

    return (
        <div className="bg-white rounded-[1.5rem] p-4 md:p-6 shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col gap-4 relative overflow-hidden transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1">
            {/* Top Accent Gradient */}
            <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${gradientFrom} ${gradientTo}`}></div>
            
            {/* Header Section */}
            <div className="flex justify-between items-center pt-1">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${themeColor}-50 text-${themeColor}-600 shadow-sm border border-${themeColor}-100`}>
                        {isConsumption ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                        )}
                    </div>
                    <div>
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5 block">Recorded On</span>
                        <h3 className="text-base md:text-lg font-extrabold text-slate-800 leading-none">
                            {formatDate(record.createdAt || record.date)}
                        </h3>
                    </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white shadow-sm`}>
                    {activeTab}
                </div>
            </div>

            <div className="border-t border-slate-100/60 pt-4">
                {isConsumption ? (
                    <div className="space-y-4">
                        {MEAL_TYPES.map(meal => {
                            if (record[meal] && record[meal].length > 0) {
                                return (
                                    <div key={meal} className="bg-slate-50/50 rounded-xl p-3 border border-slate-100">
                                        <h4 className="text-xs font-extrabold text-slate-700 mb-2.5 flex items-center gap-2">
                                            <span className={`w-1.5 h-1.5 rounded-full bg-${themeColor}-500 shadow-[0_0_8px_rgba(0,0,0,0.2)] shadow-${themeColor}-500/50`}></span>
                                            {meal}
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {record[meal].map((item: any, i: number) => (
                                                <div key={i} className="flex justify-between items-center bg-white px-3 py-2 rounded-lg border border-slate-100 shadow-sm transition-all hover:border-indigo-200">
                                                    <span className="text-[11px] md:text-xs font-bold text-slate-600 truncate mr-2">{item.item}</span>
                                                    <span className={`text-[11px] font-black text-${themeColor}-700 bg-${themeColor}-50 px-2 py-0.5 rounded-md shrink-0`}>
                                                        {item.quantity} <span className={`text-[9px] text-${themeColor}-500/70 font-bold ml-0.5`}>{item.unit}</span>
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            }
                            return null;
                        })}
                    </div>
                ) : (
                    <div className="bg-slate-50/50 rounded-xl p-3 border border-slate-100">
                        <h4 className="text-xs font-extrabold text-slate-700 mb-2.5 flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(0,0,0,0.2)] shadow-emerald-500/50`}></span>
                            Purchased Items
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {record.items && record.items.map((item: any, i: number) => (
                                <div key={i} className="flex justify-between items-center bg-white px-3 py-2 rounded-lg border border-slate-100 shadow-sm transition-all hover:border-emerald-200">
                                    <span className="text-[11px] md:text-xs font-bold text-slate-600 truncate mr-2">{item.item}</span>
                                    <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md shrink-0">
                                        {item.quantity} <span className="text-[9px] text-emerald-500/70 font-bold ml-0.5">{item.unit}</span>
                                    </span>
                                </div>
                            ))}
                            {(!record.items || record.items.length === 0) && (
                                <div className="col-span-full text-center py-3 text-[11px] font-medium text-slate-400">
                                    No items listed for this purchase.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Image Evidence */}
            {record.imageUrl && (
                <div className="pt-3 border-t border-slate-100 mt-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                        Attachment
                    </span>
                    <div 
                        onClick={() => onImageClick(record.imageUrl)}
                        className={`w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden border-2 md:border-4 border-white shadow-md relative group cursor-pointer hover:border-${themeColor}-100 transition-all`}
                    >
                        <img src={record.imageUrl} alt="Receipt" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors duration-300 flex items-center justify-center">
                            <div className="bg-white/90 backdrop-blur-sm w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                                <svg className={`w-4 h-4 md:w-5 md:h-5 text-${themeColor}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
