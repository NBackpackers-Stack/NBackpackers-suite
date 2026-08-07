'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ManagerPage() {
  const gridRef = useRef<HTMLDivElement>(null);

  // Advanced Mouse move effect for tiles to create a stunning glowing border
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current) return;
      const cards = gridRef.current.getElementsByClassName('action-tile');
      for (const card of Array.from(cards)) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col relative overflow-hidden z-0">
      <style>{`
        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(5%, 5%) scale(1.1); }
          100% { transform: translate(-5%, -5%) scale(0.95); }
        }
        @keyframes pulse-glow {
          0% { opacity: 0.4; transform: scale(0.98); }
          100% { opacity: 0.7; transform: scale(1.02); }
        }
        @keyframes slideRightFade {
          0% { opacity: 0; transform: translateX(-40px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideLeftFade {
          0% { opacity: 0; transform: translateX(40px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideUpFade {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .hero-image {
          transform: rotateY(-10deg) rotateX(5deg);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-image-wrapper:hover .hero-image {
          transform: rotateY(-5deg) rotateX(2deg) scale(1.03);
        }
        
        .action-tile {
          position: relative;
          background-color: #ffffff;
          border-radius: 20px;
          cursor: pointer;
          padding: 1px;
          display: flex;
          flex-direction: column;
          animation: slideUpFade 1s cubic-bezier(0.16, 1, 0.3, 1) both;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
          text-align: left;
          border: none;
          color: inherit;
          outline: none;
          box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.05);
        }
        .action-tile:nth-child(1) { animation-delay: 0.3s; }
        .action-tile:nth-child(2) { animation-delay: 0.4s; }
        .action-tile:nth-child(3) { animation-delay: 0.5s; }
        
        .action-tile:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
        }
        
        .action-tile::before,
        .action-tile::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          opacity: 0;
          transition: opacity 500ms;
          pointer-events: none;
        }
        
        /* Subtle white inner glow for light theme */
        .action-tile::before {
          background: radial-gradient(
            800px circle at var(--mouse-x) var(--mouse-y), 
            rgba(255, 255, 255, 0.8),
            transparent 40%
          );
          z-index: 3;
        }
        
        .action-tile:hover::before, .action-grid:hover .action-tile::after {
          opacity: 1;
        }
        
        /* Colored ambient glow behind the card for light theme */
        .action-tile::after {  
          background: radial-gradient(
            600px circle at var(--mouse-x) var(--mouse-y), 
            rgba(99, 102, 241, 0.12),
            transparent 40%
          );
          z-index: -1;
        }

        .btn-glow::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }
        .btn-glow:hover::before {
          transform: translateX(100%);
        }
      `}</style>

      {/* Animated Background Orbs for Premium Light Vibe */}
      <div
        className="absolute rounded-full blur-[100px] -z-10 opacity-70 -top-[10%] -left-[10%] w-[50vw] h-[50vw]"
        style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.3) 0%, rgba(255,255,255,0) 70%)', animation: 'float 20s infinite alternate ease-in-out' }}
      ></div>
      <div
        className="absolute rounded-full blur-[100px] -z-10 opacity-70 -bottom-[20%] -right-[10%] w-[60vw] h-[60vw]"
        style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.2) 0%, rgba(255,255,255,0) 70%)', animation: 'float 20s infinite alternate ease-in-out -5s' }}
      ></div>
      <div
        className="absolute rounded-full blur-[100px] -z-10 opacity-70 top-[40%] left-[30%] w-[40vw] h-[40vw]"
        style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.15) 0%, rgba(255,255,255,0) 70%)', animation: 'float 20s infinite alternate ease-in-out -10s' }}
      ></div>

      {/* Hero Section */}
      <section className="w-full pt-24 pb-16 px-8 flex justify-center">
        <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-16 lg:text-left text-center">
          <div className="flex-1 max-w-2xl" style={{ animation: 'slideRightFade 1s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
            <div className="inline-block px-5 py-2 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 text-sm font-semibold tracking-wide uppercase mb-6 shadow-sm">
              Mess Facility System
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-800 bg-clip-text text-transparent tracking-tight drop-shadow-sm">
              Mess Management
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed font-medium">
              Oversee daily meals, track dining hall inventory, and streamline your mess operations from a single, powerful dashboard.
            </p>
          </div>
          <div
            className="hero-image-wrapper flex-1 relative h-[300px] md:h-[400px] w-full max-w-xl perspective-[1000px] group"
            style={{ animation: 'slideLeftFade 1s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
          >
            <div
              className="absolute -inset-5 bg-gradient-to-br from-indigo-300 to-emerald-200 blur-[40px] opacity-50 rounded-[40px] -z-10"
              style={{ animation: 'pulse-glow 4s infinite alternate ease-in-out' }}
            ></div>
            <Image
              src="/hero_light.png"
              alt="Mess Dashboard Preview"
              fill
              className="hero-image object-cover rounded-3xl border border-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] bg-white"
              priority
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-8 pb-24 w-full flex flex-col gap-16">
        <div
          className="flex flex-col md:flex-row items-center gap-6 bg-white/70 py-6 px-10 rounded-3xl backdrop-blur-xl border border-slate-200 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.05)] self-center"
          style={{ animation: 'slideUpFade 1s 0.2s cubic-bezier(0.16, 1, 0.3, 1) both' }}
        >
          <div className="relative">
            <div className="absolute -inset-1.5 bg-gradient-to-br from-emerald-400 to-indigo-400 rounded-full blur-md opacity-40"></div>
            <div className="relative w-16 h-16 bg-gradient-to-br from-slate-100 to-white border-2 border-white shadow-md rounded-full flex items-center justify-center text-3xl font-bold text-slate-800 z-10">
              G
            </div>
          </div>
          <div className="flex flex-col text-center md:text-left">
            <span className="text-sm text-slate-500 font-semibold uppercase tracking-wider">Current Mess Manager</span>
            <h2 className="text-4xl font-bold m-0 text-slate-800">
              Ganesh
            </h2>
          </div>
        </div>

        {/* Action Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full action-grid" ref={gridRef}>

          <Link href="/manager/mangerial/98dffo39jf9wu302">
            <button className="action-tile group text-left">
              <div className="bg-white/80 rounded-[19px] p-10 flex flex-col items-start gap-6 h-full z-10 relative backdrop-blur-md border border-slate-100 shadow-[inset_0_1px_1px_rgba(255,255,255,1)]">
                <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl text-indigo-600 flex items-center justify-center transition-all duration-400 group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-purple-600 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_10px_25px_rgba(99,102,241,0.3)] group-hover:border-transparent">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xl font-bold text-slate-800 tracking-wide">Get Mess Task</span>
                  <span className="text-base text-slate-500 leading-relaxed font-medium">Log the daily menu, inventory checks, or new meal assignments.</span>
                </div>
              </div>
            </button>
          </Link>

          <Link href="/manager/manager-status">
            <button className="action-tile group text-left">
              <div className="bg-white/80 rounded-[19px] p-10 flex flex-col items-start gap-6 h-full z-10 relative backdrop-blur-md border border-slate-100 shadow-[inset_0_1px_1px_rgba(255,255,255,1)]">
                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl text-emerald-600 flex items-center justify-center transition-all duration-400 group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:to-teal-600 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_10px_25px_rgba(16,185,129,0.3)] group-hover:border-transparent">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18"></path>
                    <path d="m19 9-5 5-4-4-3 3"></path>
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xl font-bold text-slate-800 tracking-wide">Check Day Wise Status</span>
                  <span className="text-base text-slate-500 leading-relaxed font-medium">Review meal counts, feedback, and daily mess operations.</span>
                </div>
              </div>
            </button>
          </Link>

          <button className="action-tile group text-left">
            <div className="bg-white/80 rounded-[19px] p-10 flex flex-col items-start gap-6 h-full z-10 relative backdrop-blur-md border border-slate-100 shadow-[inset_0_1px_1px_rgba(255,255,255,1)]">
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl text-blue-600 flex items-center justify-center transition-all duration-400 group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-cyan-600 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_10px_25px_rgba(59,130,246,0.3)] group-hover:border-transparent">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xl font-bold text-slate-800 tracking-wide">Open Mess Controls</span>
                <span className="text-base text-slate-500 leading-relaxed font-medium">Manage overall facility settings, budgets, and staff.</span>
              </div>
            </div>
          </button>
        </div>

        {/* Footer Action */}
        <div className="mt-12 flex justify-center" style={{ animation: 'slideUpFade 1s 0.6s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
          <button className="btn-glow group bg-slate-900 text-white border-none px-12 py-5 rounded-full text-lg font-bold cursor-pointer flex items-center gap-3 transition-all duration-300 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.4)] hover:-translate-y-1 hover:shadow-[0_20px_40px_-5px_rgba(15,23,42,0.5)] relative overflow-hidden">
            <span className="flex items-center justify-center transition-transform duration-400 group-hover:rotate-90 z-10 relative">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </span>
            <span className="z-10 relative">Add New Mess Manager</span>
          </button>
        </div>
      </main>
    </div>
  );
}
