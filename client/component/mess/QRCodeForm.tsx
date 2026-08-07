'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { useQRCodeForm } from '@/hooks/mess/useQRCodeForm';

export const QRCodeForm: React.FC = () => {
  const { formData, isSubmitting, isSuccess, handleTextChange, handleRatingChange, handleImageChange, handleSubmit, closeSuccessModal } = useQRCodeForm();

  useEffect(() => {
    if (isSuccess) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#10b981', '#84cc16', '#fcd34d']
      });
    }
  }, [isSuccess]);

  return (
    <div className="relative w-full max-w-lg">
      {/* Background glowing effects for premium look */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-lime-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>

      <form onSubmit={handleSubmit} className="relative bg-white/80 backdrop-blur-xl border border-white/50 p-8 sm:p-10 rounded-3xl shadow-2xl space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
            Delhi Delight Feedback form
          </h2>
          <p className="mt-2 text-gray-500 text-sm">We'd love to hear your thoughts to improve our services!</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleTextChange}
              required
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm"
              placeholder="Your Name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="number" className="block text-sm font-semibold text-gray-700">Contact Number</label>
            <input
              type="text"
              id="number"
              name="number"
              value={formData.number}
              onChange={handleTextChange}
              required
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm"
              placeholder="Your Contact Number"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="batchNumber" className="block text-sm font-semibold text-gray-700">Batch Number <span className="text-gray-400 font-normal">(Optional)</span></label>
            <input
              type="text"
              id="batchNumber"
              name="batchNumber"
              value={formData.batchNumber}
              onChange={handleTextChange}
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm"
              placeholder="Your Batch Number"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleTextChange}
              required
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm"
              placeholder="Your Email"
            />
          </div>

          {/* Rating Section */}
          <div className="space-y-4 bg-white/60 p-4 rounded-xl border border-gray-100">
            <div className="text-sm font-bold text-gray-700 mb-2 border-b pb-2 border-gray-200">
              Rate your experience (1 to 5 Stars)
            </div>

            {[
              { id: 'ratingTaste', label: '1. How would you rate the taste of the food served?' },
              { id: 'ratingFreshness', label: '2. How would you rate the freshness and serving temperature of the food?' },
              { id: 'ratingQuality', label: '3. How would you rate the quality and hygiene of the meal?' },
              { id: 'ratingPortion', label: '4. Was the quantity/portion served sufficient?' },
              { id: 'ratingOverall', label: '5. Overall, how satisfied are you with this meal?' },
            ].map((q) => (
              <div key={q.id} className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">{q.label}</label>
                <div className="flex max-w-sm gap-2">
                  {[1, 2, 3, 4, 5].map((num) => {
                    const currentValue = (formData as any)[q.id] || 0;
                    const isFilled = num <= currentValue;

                    return (
                      <label
                        key={num}
                        className={`cursor-pointer transition-all hover:scale-110 flex items-center justify-center p-1`}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          value={num}
                          checked={currentValue === num}
                          onChange={() => handleRatingChange(q.id, num)}
                          className="hidden"
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill={isFilled ? "currentColor" : "none"}
                          stroke="currentColor"
                          strokeWidth={1.5}
                          className={`w-8 h-8 sm:w-10 sm:h-10 transition-colors ${isFilled ? 'text-yellow-400 drop-shadow-sm border-none' : 'text-gray-300 hover:text-yellow-300'}`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                          />
                        </svg>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleTextChange}
              required
              rows={3}
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm resize-none"
              placeholder="Tell us everything..."
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="image" className="block text-sm font-semibold text-gray-700">Upload Image</label>
            <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-green-500 transition-colors bg-white/50">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="text-center flex flex-col items-center justify-center">
                <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mt-1 text-sm text-gray-500">
                  {formData.image ? formData.image.name : "Click or drag image to upload"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-4 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-bold rounded-xl shadow-lg transform hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : 'Submit Feedback'}
        </button>

        {/* Quote at the bottom */}
        <div className="pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-400 italic text-sm">"Your feedback is the compass that guides our continuous improvement."</p>
        </div>
      </form>

      {/* Success Modal */}
      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="relative bg-white rounded-3xl p-10 max-w-md w-full shadow-2xl transform scale-100 transition-transform flex flex-col items-center text-center">

            {/* Top Right Close Button */}
            <button
              onClick={closeSuccessModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            <div className="w-28 h-28 bg-green-50 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-inner">
              <Image
                src="/DD.webp"
                alt="Success"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">Thank You!</h3>
            <p className="text-gray-500 mb-8 text-lg">Your feedback has been successfully submitted. We appreciate your input!</p>

            <button
              onClick={() => {
                alert("Submitted"); // Add claim logic here
                closeSuccessModal();
              }}
              className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-bold text-lg rounded-xl shadow-[0_10px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_30px_rgba(16,185,129,0.4)] hover:-translate-y-1 transition-all duration-300"
            >
              Feedback submitted
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
