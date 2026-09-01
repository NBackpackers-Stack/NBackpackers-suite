"use client"

import { useEffect, useState } from 'react';

const travelQuotes = [
  "Not all those who wander are lost. – J.R.R. Tolkien",
  "The world is a book, and those who do not travel read only a page. – Saint Augustine",
  "Travel is the only thing you buy that makes you richer.",
  "To travel is to live. – Hans Christian Andersen",
  "Adventure is worthwhile in itself. – Amelia Earhart",
  "Oh the places you'll go. – Dr. Seuss"
];

export default function WelcomeAnimation() {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const hasSeenAnimation = sessionStorage.getItem('hasSeenWelcomeAnimation');
    if (hasSeenAnimation) {
      setIsHidden(true);
      return;
    }
    sessionStorage.setItem('hasSeenWelcomeAnimation', 'true');

    // Pick random quote on client-side to prevent Next.js hydration mismatch
    setQuote(travelQuotes[Math.floor(Math.random() * travelQuotes.length)]);

    // Prevent scrolling while animation is active
    document.body.style.overflow = 'hidden';

    // Start fading out after 4 seconds
    const fadeOutTimeout = setTimeout(() => {
      setIsFadingOut(true);
      document.body.style.overflow = 'auto'; // Restore scrolling
    }, 4500);

    // Completely hide after 5.5 seconds
    const hideTimeout = setTimeout(() => {
      setIsHidden(true);
    }, 5500);

    return () => {
      clearTimeout(fadeOutTimeout);
      clearTimeout(hideTimeout);
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (isHidden) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&display=swap');
        
        .handwriting-text {
          font-family: 'Caveat', cursive;
          color: #0f172a; /* Deep Slate 900 (Black) */
          clip-path: inset(0 100% 0 0);
          animation: handwriting-reveal 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          animation-delay: 0.8s;
        }

        @keyframes handwriting-reveal {
          0% { clip-path: inset(0 100% 0 0); }
          100% { clip-path: inset(0 0 0 0); }
        }

        @keyframes subtle-scale {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-subtle-scale {
          animation: subtle-scale 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fade-in-up {
          0% { transform: translateY(15px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1.5s ease-out forwards;
          animation-delay: 2s;
          opacity: 0;
        }
      `}</style>
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#fdfdfd] overflow-hidden transition-opacity duration-1000 ease-in-out ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
      >
        {/* Very subtle premium radial gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-50 via-white to-slate-100 opacity-60"></div>

        <div className="relative z-10 flex flex-col items-center justify-center px-6 w-full h-full">
          {/* Brand Logo - Premium Subtle Scale (No Bounce) */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-60 md:h-60 mb-6 md:mb-10 flex items-center justify-center animate-subtle-scale">
            <img
              src="/backpackers.png"
              alt="Backpackers Suite Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Handwriting Text - Deep Black */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold text-center max-w-4xl tracking-tight min-h-[6rem] md:min-h-[8rem] flex items-center justify-center leading-tight px-2">
            <span className="handwriting-text inline-block pb-2 px-2">
              Welcome to Backpackers Suite
            </span>
          </h1>
        </div>

        {/* Travel Quote (Bottom) */}
        <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 px-6 text-center max-w-xl mx-auto z-10 w-full animate-fade-in-up">
          <div className="w-12 h-[1px] bg-slate-300 mx-auto mb-4 md:mb-6"></div>
          <p className="text-slate-500 text-xs sm:text-sm md:text-lg italic font-light tracking-wide font-serif">
            {quote ? `"${quote}"` : ""}
          </p>
        </div>

      </div>
    </>
  );
}
