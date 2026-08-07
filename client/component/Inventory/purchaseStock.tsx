"use client";

import React from 'react';
import usePurchaseStock from '@/hooks/inventory/usePurchaseStock';
import AnimatedLoader from '@/component/AnimatedLoader';

export default function PurchaseStock() {
  const {
    items,
    error,
    isLoading,
    rows,
    handleAddRow,
    handleRemoveRow,
    handleItemChange,
    handleQuantityChange,
    image,
    setImage,
    handleSubmit
  } = usePurchaseStock();

  if (error) return <div className="p-6 text-center text-red-500 font-semibold bg-red-50 rounded-lg max-w-lg mx-auto mt-10 shadow-sm border border-red-100">Error: {error}</div>;

  return (
    <div className="relative min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100 via-purple-50 to-white overflow-hidden">
      {isLoading && <AnimatedLoader />}

      {/* Decorative blobs for modern aesthetic */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>

      <div className={`relative max-w-5xl mx-auto bg-white/70 backdrop-blur-2xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/60 overflow-hidden ${isLoading ? 'blur-sm pointer-events-none' : ''}`}>

        {/* Header Banner */}
        <div className="relative px-8 py-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 overflow-hidden">
          {/* Subtle overlay pattern */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3 drop-shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Purchase Stock
              </h2>
              <p className="text-indigo-100 mt-2 text-sm md:text-base font-medium max-w-lg">
                Easily record new shipments, update your inventory quantities, and attach digital invoices in one place.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-lg transform rotate-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-6 md:p-10 space-y-10">

          {/* Rows List */}
          <div className="space-y-4">
            {rows.map((row, index) => (
              <div key={row.id} className="relative group bg-white border border-gray-100 rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-300">
                {/* Row Number Badge */}
                <div className="absolute -left-3 -top-3 bg-gradient-to-br from-indigo-500 to-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg border-2 border-white z-10">
                  {index + 1}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-end">

                  {/* Item Selector */}
                  <div className="md:col-span-5">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Item</label>
                    <div className="relative">
                      <select
                        value={row.item_name}
                        onChange={(e) => handleItemChange(row.id, e.target.value)}
                        className="block w-full py-3 pl-4 pr-10 border-0 bg-gray-50/80 rounded-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] focus:ring-2 focus:ring-indigo-500 text-gray-700 font-semibold text-sm md:text-base appearance-none transition-all cursor-pointer hover:bg-gray-100"
                      >
                        <option value="" disabled>Select an item...</option>
                        {items && items.map((item) => (
                          <option key={item._id || item.item_id || item.item_name} value={item.item_name}>
                            {item.item_name}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Input */}
                  <div className="md:col-span-3">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Quantity</label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={row.quantity}
                      onChange={(e) => handleQuantityChange(row.id, e.target.value)}
                      className="block w-full py-3 px-4 border-0 bg-gray-50/80 rounded-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] focus:ring-2 focus:ring-indigo-500 text-gray-700 font-semibold text-sm md:text-base transition-all placeholder-gray-300"
                      placeholder="0.00"
                    />
                  </div>

                  {/* Unit Display */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Unit</label>
                    <input
                      type="text"
                      value={row.unit}
                      readOnly
                      className="block w-full py-3 px-4 bg-gray-100/50 border-0 rounded-xl text-gray-400 font-bold cursor-not-allowed text-center text-sm md:text-base"
                      placeholder="-"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="md:col-span-2 flex items-center justify-end md:justify-center h-[52px] space-x-2">
                    <button
                      onClick={() => handleAddRow()}
                      title="Add Row"
                      className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-500 hover:text-white hover:shadow-md transition-all duration-300 transform hover:scale-105"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                    </button>
                    {rows.length > 1 && (
                      <button
                        onClick={() => handleRemoveRow(row.id)}
                        title="Remove Row"
                        className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white hover:shadow-md transition-all duration-300 transform hover:scale-105"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" /></svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Upload Area */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 ml-1">Upload Invoice (Optional)</label>
            <div className="relative border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-indigo-50/30 hover:bg-indigo-50/60 rounded-3xl p-10 transition-all duration-300 flex flex-col items-center justify-center group cursor-pointer overflow-hidden">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImage(e.target.files[0]);
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="bg-white p-4 rounded-full shadow-md mb-4 text-indigo-500 group-hover:scale-110 group-hover:text-indigo-600 transition-transform duration-300 ring-4 ring-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <p className="text-gray-700 font-semibold text-center text-lg">
                <span className="text-indigo-600">Click to upload</span> or drag and drop
              </p>
              <p className="text-sm text-gray-400 mt-2 font-medium">PNG, JPG, GIF up to 5MB</p>

              {image && (
                <div className="mt-6 px-5 py-2.5 bg-indigo-100 text-indigo-800 rounded-xl flex items-center gap-3 text-sm font-bold z-20 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {image.name}
                </div>
              )}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 flex justify-center md:justify-end">
            <button
              onClick={handleSubmit}
              className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-lg rounded-2xl shadow-[0_10px_20px_rgba(79,70,229,0.3)] hover:shadow-[0_15px_30px_rgba(79,70,229,0.4)] hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 flex items-center justify-center gap-3"
            >
              Submit Purchase
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
