'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useMessFeedback } from '@/hooks/feedback/useMessFeedback';

const renderStars = (rating: number) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg 
          key={star} 
          className={`w-3.5 h-3.5 ${star <= (rating || 0) ? 'text-yellow-400 drop-shadow-sm' : 'text-gray-200'}`} 
          fill="currentColor" viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export const MessFeedbackTable: React.FC = () => {
  const { feedbacks, isLoading, error, refetch } = useMessFeedback();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-500 p-6 rounded-2xl text-center font-medium shadow-sm border border-red-100">
        <svg className="w-10 h-10 mx-auto mb-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        {error}
        <button onClick={refetch} className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-semibold transition-colors">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.4s ease-out forwards;
        }
      `}</style>

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-xl md:text-2xl font-extrabold text-gray-800 tracking-tight">Recent Responses</h2>
        <button 
          onClick={refetch}
          className="p-2 md:px-4 md:py-2 bg-white text-blue-600 hover:bg-blue-50 border border-gray-200 rounded-xl shadow-sm text-sm font-semibold transition-all active:scale-95 flex items-center gap-2"
          aria-label="Refresh feedback"
        >
          <svg className="w-5 h-5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          <span className="hidden md:inline">Refresh</span>
        </button>
      </div>

      {/* Mobile-First Card Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {feedbacks.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-gray-100 shadow-sm">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
            <p className="text-gray-500 font-medium text-lg">No feedback received yet.</p>
            <p className="text-gray-400 text-sm mt-1">Responses will appear here automatically.</p>
          </div>
        ) : (
          feedbacks.map((item, index) => (
            <div 
              key={item._id} 
              className="bg-white border border-gray-100/80 rounded-3xl p-5 md:p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up flex flex-col h-full"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Card Header (Name + Email + Date) */}
              <div className="flex justify-between items-start mb-3 gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-lg leading-tight truncate capitalize">
                    {item.name || "Anonymous"}
                  </h3>
                  <p className="text-xs text-gray-500 truncate">{item.email}</p>
                  <p className="text-xs text-gray-500 truncate">Phone: {item.number}</p>
                  {item.batchNumber && (
                    <p className="text-xs text-gray-500 truncate">Batch: {item.batchNumber}</p>
                  )}
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100">
                    {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                  <span className="text-[10px] font-medium text-gray-400 mt-1 uppercase tracking-wider">
                    {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              {/* Ratings Summary Grid */}
              <div className="bg-slate-50/80 rounded-xl p-3 mb-4 border border-slate-100 shadow-inner">
                 <div className="grid grid-cols-2 gap-y-2.5 gap-x-3 text-xs">
                    <div className="flex justify-between items-center bg-white px-2 py-1 rounded-md shadow-sm border border-slate-100">
                       <span className="text-slate-600 font-medium">Taste</span>
                       {renderStars(item.ratingTaste)}
                    </div>
                    <div className="flex justify-between items-center bg-white px-2 py-1 rounded-md shadow-sm border border-slate-100">
                       <span className="text-slate-600 font-medium">Freshness</span>
                       {renderStars(item.ratingFreshness)}
                    </div>
                    <div className="flex justify-between items-center bg-white px-2 py-1 rounded-md shadow-sm border border-slate-100">
                       <span className="text-slate-600 font-medium">Quality</span>
                       {renderStars(item.ratingQuality)}
                    </div>
                    <div className="flex justify-between items-center bg-white px-2 py-1 rounded-md shadow-sm border border-slate-100">
                       <span className="text-slate-600 font-medium">Portion</span>
                       {renderStars(item.ratingPortion)}
                    </div>
                    <div className="col-span-2 flex justify-between items-center mt-1 pt-2.5 border-t border-slate-200">
                       <span className="text-slate-800 font-bold text-sm">Overall Satisfaction</span>
                       <div className="scale-125 origin-right">
                         {renderStars(item.ratingOverall)}
                       </div>
                    </div>
                 </div>
              </div>

              {/* Card Body (Message) */}
              <div className="flex-1 mb-5">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Feedback Message</h4>
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-3 bg-gray-50/50 p-3 rounded-lg border border-gray-100">
                  {item.message || <span className="text-gray-400 italic">No message provided.</span>}
                </p>
              </div>

              {/* Card Footer (Actions) */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                {item.image ? (
                  <button 
                    onClick={() => setSelectedImage(item.image!)}
                    className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-700 py-2.5 px-4 rounded-xl text-sm font-bold transition-all active:scale-95 flex items-center justify-center gap-2 group"
                  >
                    <svg className="w-5 h-5 text-blue-500 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    View Attached Image
                  </button>
                ) : (
                  <div className="w-full bg-gray-50 py-2.5 px-4 rounded-xl text-sm font-medium text-gray-400 flex items-center justify-center gap-2 border border-gray-100/50">
                    <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                    No Attachment
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/90 backdrop-blur-md transition-opacity" 
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative w-full max-w-lg bg-black rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up flex flex-col items-center justify-center" 
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full p-2.5 transition-all active:scale-90 z-10"
              aria-label="Close image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            
            <div className="relative w-full min-h-[40vh] max-h-[80vh] flex items-center justify-center">
              <Image 
                src={selectedImage} 
                alt="Feedback Attachment" 
                layout="fill"
                objectFit="contain"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
