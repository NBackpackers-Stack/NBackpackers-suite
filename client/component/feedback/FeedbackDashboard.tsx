'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useMessFeedback, FeedbackData } from '@/hooks/feedback/useMessFeedback';

// Helper to determine sentiment based on ratingOverall
export const getSentiment = (rating: number): 'positive' | 'neutral' | 'negative' => {
  if (rating >= 4) return 'positive';
  if (rating === 3) return 'neutral';
  return 'negative';
};

const renderStars = (rating: number) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${star <= (rating || 0) ? 'text-amber-400 drop-shadow-sm' : 'text-slate-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export const FeedbackDashboard: React.FC = () => {
  const { feedbacks, isLoading, error, refetch } = useMessFeedback();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'positive' | 'neutral' | 'negative'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);
  const [daysRange, setDaysRange] = useState<number>(7); // default 7 days

  // Compute key statistics
  const stats = useMemo(() => {
    if (!feedbacks || feedbacks.length === 0) {
      return {
        total: 0,
        positive: 0,
        neutral: 0,
        negative: 0,
        posPercent: 0,
        neuPercent: 0,
        negPercent: 0,
        avgOverall: '0.0',
        avgTaste: '0.0',
        avgFreshness: '0.0',
        avgQuality: '0.0',
        avgPortion: '0.0',
      };
    }

    let positive = 0;
    let neutral = 0;
    let negative = 0;
    let sumOverall = 0;
    let sumTaste = 0;
    let sumFreshness = 0;
    let sumQuality = 0;
    let sumPortion = 0;

    feedbacks.forEach((item) => {
      const sentiment = getSentiment(item.ratingOverall);
      if (sentiment === 'positive') positive++;
      else if (sentiment === 'neutral') neutral++;
      else negative++;

      sumOverall += item.ratingOverall || 0;
      sumTaste += item.ratingTaste || 0;
      sumFreshness += item.ratingFreshness || 0;
      sumQuality += item.ratingQuality || 0;
      sumPortion += item.ratingPortion || 0;
    });

    const total = feedbacks.length;
    return {
      total,
      positive,
      neutral,
      negative,
      posPercent: Math.round((positive / total) * 100),
      neuPercent: Math.round((neutral / total) * 100),
      negPercent: Math.round((negative / total) * 100),
      avgOverall: (sumOverall / total).toFixed(1),
      avgTaste: (sumTaste / total).toFixed(1),
      avgFreshness: (sumFreshness / total).toFixed(1),
      avgQuality: (sumQuality / total).toFixed(1),
      avgPortion: (sumPortion / total).toFixed(1),
    };
  }, [feedbacks]);

  // Aggregate day-wise feedback data
  const dayWiseData = useMemo(() => {
    if (!feedbacks || feedbacks.length === 0) return [];

    // Map by date key (YYYY-MM-DD)
    const map: { [key: string]: { dateStr: string; label: string; positive: number; neutral: number; negative: number; total: number } } = {};

    // Sort feedbacks chronologically (oldest to newest for graph representation)
    const sortedFeedbacks = [...feedbacks].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    sortedFeedbacks.forEach((item) => {
      const d = new Date(item.createdAt);
      const key = d.toISOString().split('T')[0];
      const label = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

      if (!map[key]) {
        map[key] = { dateStr: key, label, positive: 0, neutral: 0, negative: 0, total: 0 };
      }

      const sentiment = getSentiment(item.ratingOverall);
      if (sentiment === 'positive') map[key].positive++;
      else if (sentiment === 'neutral') map[key].neutral++;
      else map[key].negative++;
      map[key].total++;
    });

    const result = Object.values(map);

    // Filter by date range if applicable
    if (daysRange > 0 && result.length > daysRange) {
      return result.slice(-daysRange);
    }

    return result;
  }, [feedbacks, daysRange]);

  // Filter feedback items for list view
  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter((item) => {
      const sentiment = getSentiment(item.ratingOverall);
      const matchesFilter = selectedFilter === 'all' || sentiment === selectedFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.message.toLowerCase().includes(q) ||
        (item.batchNumber && item.batchNumber.toLowerCase().includes(q));
      return matchesFilter && matchesQuery;
    });
  }, [feedbacks, selectedFilter, searchQuery]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center py-24">
        <div className="relative w-20 h-20 mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-indigo-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
        </div>
        <p className="text-slate-500 font-medium animate-pulse">Loading feedback analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50/90 backdrop-blur-md text-red-600 p-8 rounded-3xl text-center font-medium border border-red-100 shadow-xl max-w-lg mx-auto my-12">
        <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Unable to Load Dashboard</h3>
        <p className="text-sm text-slate-600 mb-6">{error}</p>
        <button
          onClick={refetch}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md active:scale-95"
        >
          Try Reloading
        </button>
      </div>
    );
  }

  // Calculate max total in dayWiseData for scaling chart height
  const maxDayCount = Math.max(...dayWiseData.map((d) => d.total), 1);

  return (
    <div className="space-y-8">
      {/* Top Controls & Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Analytics Overview</h2>
          <p className="text-xs text-slate-500">Real-time metrics calculated from {stats.total} total feedback submissions</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={refetch}
            className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border border-indigo-200/60 active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Data
          </button>
        </div>
      </div>

      {/* Stats Summary Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Total Feedbacks */}
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-5 text-white shadow-xl shadow-indigo-500/20 col-span-2 md:col-span-1 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform"></div>
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-semibold text-indigo-100 uppercase tracking-wider">Total Received</span>
            <span className="p-2 bg-white/15 rounded-xl">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </span>
          </div>
          <div className="text-3xl font-black tracking-tight">{stats.total}</div>
          <div className="text-[11px] text-indigo-100 mt-1 font-medium">Submissions recorded</div>
        </div>

        {/* Positive Feedbacks */}
        <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-lg shadow-emerald-500/5 relative overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Positive</span>
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl font-black text-xs">
              {stats.posPercent}%
            </span>
          </div>
          <div className="text-3xl font-black text-slate-800 tracking-tight">{stats.positive}</div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Rating 4 & 5 Stars
          </div>
        </div>

        {/* Neutral Feedbacks */}
        <div className="bg-white rounded-3xl p-5 border border-amber-100 shadow-lg shadow-amber-500/5 relative overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Neutral</span>
            <span className="p-2 bg-amber-50 text-amber-600 rounded-xl font-black text-xs">
              {stats.neuPercent}%
            </span>
          </div>
          <div className="text-3xl font-black text-slate-800 tracking-tight">{stats.neutral}</div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1 font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Rating 3 Stars
          </div>
        </div>

        {/* Negative Feedbacks */}
        <div className="bg-white rounded-3xl p-5 border border-rose-100 shadow-lg shadow-rose-500/5 relative overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Negative</span>
            <span className="p-2 bg-rose-50 text-rose-600 rounded-xl font-black text-xs">
              {stats.negPercent}%
            </span>
          </div>
          <div className="text-3xl font-black text-slate-800 tracking-tight">{stats.negative}</div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1 font-medium">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            Rating 1 & 2 Stars
          </div>
        </div>

        {/* Avg Overall Rating */}
        <div className="bg-white rounded-3xl p-5 border border-indigo-100 shadow-lg shadow-indigo-500/5 relative overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Avg Score</span>
            <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-xl">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>
          </div>
          <div className="text-3xl font-black text-slate-800 tracking-tight flex items-baseline gap-1">
            {stats.avgOverall}
            <span className="text-xs font-bold text-slate-400">/ 5.0</span>
          </div>
          <div className="mt-1">{renderStars(Math.round(Number(stats.avgOverall)))}</div>
        </div>
      </div>

      {/* Main Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Day-wise Submissions Interactive Graph */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">Day-wise Feedback Trends</h3>
                <p className="text-xs text-slate-500 font-medium">Daily count of feedback received and sentiment breakdown</p>
              </div>

              {/* Timeframe Filter Buttons */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl gap-1">
                {[
                  { label: '7 Days', value: 7 },
                  { label: '14 Days', value: 14 },
                  { label: '30 Days', value: 30 },
                  { label: 'All', value: 0 },
                ].map((tf) => (
                  <button
                    key={tf.value}
                    onClick={() => setDaysRange(tf.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      daysRange === tf.value
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {tf.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mb-8 text-xs font-semibold">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-emerald-500 shadow-sm"></span>
                <span className="text-slate-600">Positive (4-5 stars)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-amber-400 shadow-sm"></span>
                <span className="text-slate-600">Neutral (3 stars)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-rose-500 shadow-sm"></span>
                <span className="text-slate-600">Negative (1-2 stars)</span>
              </div>
            </div>

            {/* SVG Graph Container */}
            {dayWiseData.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <svg className="w-12 h-12 text-slate-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="text-sm font-medium text-slate-400">No day-wise feedback data to render graph</p>
              </div>
            ) : (
              <div className="relative pt-8 pb-4 px-2">
                {/* Y-Axis Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 pb-8">
                  <div className="border-b border-slate-300 w-full"></div>
                  <div className="border-b border-slate-300 w-full"></div>
                  <div className="border-b border-slate-300 w-full"></div>
                  <div className="border-b border-slate-300 w-full"></div>
                </div>

                {/* Bars Representation */}
                <div className="relative z-10 flex items-end justify-around h-64 gap-2 md:gap-4 pt-6">
                  {dayWiseData.map((item, idx) => {
                    const barHeightPercent = Math.max(Math.round((item.total / maxDayCount) * 100), 12);
                    const posPct = item.total > 0 ? (item.positive / item.total) * 100 : 0;
                    const neuPct = item.total > 0 ? (item.neutral / item.total) * 100 : 0;
                    const negPct = item.total > 0 ? (item.negative / item.total) * 100 : 0;
                    const isHovered = hoveredBarIndex === idx;

                    return (
                      <div
                        key={item.dateStr}
                        className="flex flex-col items-center flex-1 h-full justify-end group cursor-pointer relative"
                        onMouseEnter={() => setHoveredBarIndex(idx)}
                        onMouseLeave={() => setHoveredBarIndex(null)}
                      >
                        {/* Hover Tooltip Popup */}
                        {isHovered && (
                          <div className="absolute -top-16 z-30 bg-slate-900 text-white p-3 rounded-2xl shadow-2xl text-xs whitespace-nowrap animate-fade-in-up border border-slate-700 pointer-events-none min-w-[140px]">
                            <div className="font-bold border-b border-slate-700 pb-1 mb-1.5 text-indigo-300 flex justify-between">
                              <span>{item.label}</span>
                              <span className="text-white font-black">{item.total} Total</span>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between items-center text-emerald-400">
                                <span>Positive:</span>
                                <span className="font-bold">{item.positive}</span>
                              </div>
                              <div className="flex justify-between items-center text-amber-300">
                                <span>Neutral:</span>
                                <span className="font-bold">{item.neutral}</span>
                              </div>
                              <div className="flex justify-between items-center text-rose-400">
                                <span>Negative:</span>
                                <span className="font-bold">{item.negative}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Top Total Count Label */}
                        <span className="text-[11px] font-extrabold text-slate-700 mb-1 group-hover:text-indigo-600 transition-colors">
                          {item.total}
                        </span>

                        {/* Stacked Vertical Bar */}
                        <div
                          className="w-full max-w-[42px] rounded-2xl overflow-hidden flex flex-col justify-end shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-indigo-500/20 bg-slate-100"
                          style={{ height: `${barHeightPercent}%` }}
                        >
                          {/* Positive Stack (Top) */}
                          {posPct > 0 && (
                            <div
                              className="bg-gradient-to-t from-emerald-500 to-emerald-400 transition-all"
                              style={{ height: `${posPct}%` }}
                              title={`Positive: ${item.positive}`}
                            ></div>
                          )}
                          {/* Neutral Stack (Middle) */}
                          {neuPct > 0 && (
                            <div
                              className="bg-gradient-to-t from-amber-400 to-yellow-300 transition-all"
                              style={{ height: `${neuPct}%` }}
                              title={`Neutral: ${item.neutral}`}
                            ></div>
                          )}
                          {/* Negative Stack (Bottom) */}
                          {negPct > 0 && (
                            <div
                              className="bg-gradient-to-t from-rose-600 to-rose-500 transition-all"
                              style={{ height: `${negPct}%` }}
                              title={`Negative: ${item.negative}`}
                            ></div>
                          )}
                        </div>

                        {/* X-Axis Date Label */}
                        <span className="text-[11px] font-bold text-slate-500 mt-2 tracking-tight group-hover:text-slate-900 transition-colors">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-400 flex justify-between items-center">
            <span>Hover over any bar to see detailed breakdown</span>
            <span className="font-semibold text-indigo-600">Day-wise Distribution</span>
          </div>
        </div>

        {/* Right Column (1 Col): Sentiment Breakdown & Category Breakdown */}
        <div className="space-y-6">
          {/* Sentiment Distribution Card */}
          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-1">Sentiment Share</h3>
            <p className="text-xs text-slate-500 mb-5">Proportion of student sentiment</p>

            {/* Segmented Bar */}
            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex mb-6 p-0.5 shadow-inner">
              <div
                className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full transition-all duration-700 first:rounded-l-full last:rounded-r-full"
                style={{ width: `${stats.posPercent}%` }}
                title={`Positive: ${stats.posPercent}%`}
              ></div>
              <div
                className="bg-gradient-to-r from-amber-400 to-yellow-300 h-full transition-all duration-700 first:rounded-l-full last:rounded-r-full"
                style={{ width: `${stats.neuPercent}%` }}
                title={`Neutral: ${stats.neuPercent}%`}
              ></div>
              <div
                className="bg-gradient-to-r from-rose-500 to-rose-600 h-full transition-all duration-700 first:rounded-l-full last:rounded-r-full"
                style={{ width: `${stats.negPercent}%` }}
                title={`Negative: ${stats.negPercent}%`}
              ></div>
            </div>

            {/* List Breakdown */}
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-bold text-slate-700">Positive Feedback</span>
                </div>
                <span className="text-xs font-black text-emerald-700">{stats.positive} ({stats.posPercent}%)</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-amber-50/60 rounded-2xl border border-amber-100/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <span className="text-xs font-bold text-slate-700">Neutral Feedback</span>
                </div>
                <span className="text-xs font-black text-amber-700">{stats.neutral} ({stats.neuPercent}%)</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-rose-50/60 rounded-2xl border border-rose-100/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <span className="text-xs font-bold text-slate-700">Negative Feedback</span>
                </div>
                <span className="text-xs font-black text-rose-700">{stats.negative} ({stats.negPercent}%)</span>
              </div>
            </div>
          </div>

          {/* Detailed Category Ratings Card */}
          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-1">Aspect Averages</h3>
            <p className="text-xs text-slate-500 mb-5">Average rating out of 5 stars per metric</p>

            <div className="space-y-4">
              {[
                { label: 'Taste', value: stats.avgTaste, color: 'bg-indigo-500' },
                { label: 'Freshness', value: stats.avgFreshness, color: 'bg-blue-500' },
                { label: 'Quality', value: stats.avgQuality, color: 'bg-teal-500' },
                { label: 'Portion', value: stats.avgPortion, color: 'bg-purple-500' },
                { label: 'Overall Satisfaction', value: stats.avgOverall, color: 'bg-amber-500' },
              ].map((cat) => {
                const pct = (Number(cat.value) / 5) * 100;
                return (
                  <div key={cat.label} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-700">{cat.label}</span>
                      <span className="text-slate-900">{cat.value} <span className="text-slate-400 font-normal">/ 5.0</span></span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${cat.color} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Filtered Feedback Cards Section */}
      <div className="pt-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 shadow-md">
          <div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Feedback Explorer</h3>
            <p className="text-xs text-slate-500 font-medium">Browse, search, and filter individual student feedback entries</p>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, email, message..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs font-medium text-slate-800 placeholder-slate-400 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center bg-slate-100 p-1 rounded-2xl gap-1">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-3 py-2 rounded-xl text-xs font-extrabold transition-all ${
                  selectedFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                All ({stats.total})
              </button>
              <button
                onClick={() => setSelectedFilter('positive')}
                className={`px-3 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1 ${
                  selectedFilter === 'positive' ? 'bg-emerald-500 text-white shadow-md' : 'text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                Positive ({stats.positive})
              </button>
              <button
                onClick={() => setSelectedFilter('neutral')}
                className={`px-3 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1 ${
                  selectedFilter === 'neutral' ? 'bg-amber-400 text-slate-900 shadow-md' : 'text-amber-600 hover:bg-amber-50'
                }`}
              >
                Neutral ({stats.neutral})
              </button>
              <button
                onClick={() => setSelectedFilter('negative')}
                className={`px-3 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1 ${
                  selectedFilter === 'negative' ? 'bg-rose-500 text-white shadow-md' : 'text-rose-600 hover:bg-rose-50'
                }`}
              >
                Negative ({stats.negative})
              </button>
            </div>
          </div>
        </div>

        {/* Feedback Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeedbacks.length === 0 ? (
            <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-slate-200/60 shadow-sm">
              <svg className="w-16 h-16 mx-auto text-slate-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-slate-600 font-bold text-lg">No matching feedback found</p>
              <p className="text-slate-400 text-xs mt-1">Try resetting search criteria or selecting a different filter.</p>
            </div>
          ) : (
            filteredFeedbacks.map((item) => {
              const sentiment = getSentiment(item.ratingOverall);
              let badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
              let badgeLabel = 'Positive';
              if (sentiment === 'neutral') {
                badgeColor = 'bg-amber-50 text-amber-700 border-amber-200';
                badgeLabel = 'Neutral';
              } else if (sentiment === 'negative') {
                badgeColor = 'bg-rose-50 text-rose-700 border-rose-200';
                badgeLabel = 'Negative';
              }

              return (
                <div
                  key={item._id}
                  className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4 gap-3">
                      <div>
                        <h4 className="font-bold text-slate-900 text-base capitalize leading-tight group-hover:text-indigo-600 transition-colors">
                          {item.name || 'Anonymous'}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">{item.email}</p>
                        <p className="text-[11px] text-slate-400">Phone: {item.number}</p>
                        {item.batchNumber && <p className="text-[11px] text-slate-400">Batch: {item.batchNumber}</p>}
                      </div>
                      <div className="flex flex-col items-end shrink-0 gap-1.5">
                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${badgeColor}`}>
                          {badgeLabel}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    </div>

                    {/* Ratings Matrix */}
                    <div className="bg-slate-50/80 rounded-2xl p-3 mb-4 border border-slate-100 space-y-2">
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="flex justify-between items-center bg-white px-2 py-1.5 rounded-xl border border-slate-100">
                          <span className="text-slate-600 font-medium">Taste</span>
                          {renderStars(item.ratingTaste)}
                        </div>
                        <div className="flex justify-between items-center bg-white px-2 py-1.5 rounded-xl border border-slate-100">
                          <span className="text-slate-600 font-medium">Freshness</span>
                          {renderStars(item.ratingFreshness)}
                        </div>
                        <div className="flex justify-between items-center bg-white px-2 py-1.5 rounded-xl border border-slate-100">
                          <span className="text-slate-600 font-medium">Quality</span>
                          {renderStars(item.ratingQuality)}
                        </div>
                        <div className="flex justify-between items-center bg-white px-2 py-1.5 rounded-xl border border-slate-100">
                          <span className="text-slate-600 font-medium">Portion</span>
                          {renderStars(item.ratingPortion)}
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-slate-200/60 px-1">
                        <span className="text-xs font-bold text-slate-800">Overall Rating</span>
                        {renderStars(item.ratingOverall)}
                      </div>
                    </div>

                    {/* Message Body */}
                    <div className="mb-4">
                      <h5 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">
                        Student Message
                      </h5>
                      <p className="text-xs text-slate-700 leading-relaxed bg-slate-50/60 p-3 rounded-xl border border-slate-100">
                        {item.message || <span className="text-slate-400 italic">No message provided.</span>}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer (Image attachment if available) */}
                  <div className="pt-3 border-t border-slate-100">
                    {item.image ? (
                      <button
                        onClick={() => setSelectedImage(item.image!)}
                        className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        View Attachment Photo
                      </button>
                    ) : (
                      <div className="text-[11px] text-slate-400 text-center font-medium py-1">No photo attached</div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-opacity"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-xl bg-black rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-2.5 transition-all z-10"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative w-full min-h-[50vh] max-h-[80vh] flex items-center justify-center">
              <Image src={selectedImage} alt="Attachment" layout="fill" objectFit="contain" className="rounded-xl" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
