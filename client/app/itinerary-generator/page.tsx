import Link from 'next/link';

export default function ItineraryGenerator() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-amber-200 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[45vh] min-h-[300px] md:h-[60vh] md:min-h-[450px] flex items-center justify-center overflow-hidden">
        {/* Beautiful Meadow Hero Image */}
        <img 
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Lush green meadow with rolling hills" 
          className="absolute inset-0 w-full h-full object-cover scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]"
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-slate-50"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-8 md:mt-20">
          <div className="inline-block px-3 py-1.5 md:px-5 md:py-2 rounded-full bg-white/20 text-white font-bold text-xs md:text-sm tracking-widest uppercase shadow-sm border border-white/30 backdrop-blur-md mb-4 md:mb-6">
            AI-Powered Planning
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight drop-shadow-2xl mb-3 md:mb-6">
            Generate Your Dream <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-200 drop-shadow-md">
              Itinerary
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-white/90 font-medium drop-shadow-lg max-w-2xl mx-auto">
            Choose how you want to present your next great adventure.
          </p>
        </div>
      </section>

      {/* Options Section */}
      <section className="pb-16 md:pb-24 px-4 md:px-8 max-w-7xl mx-auto -mt-16 md:-mt-32 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          
          {/* Card 1: Single page poster */}
          <Link href="#poster" className="group relative bg-white/95 md:bg-white/90 backdrop-blur-2xl rounded-3xl md:rounded-[2rem] p-5 md:p-6 lg:p-8 shadow-lg md:shadow-xl border border-white hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 hover:-translate-y-2 md:hover:-translate-y-4 overflow-hidden flex flex-col items-center text-center">
            {/* Animated top gradient bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 md:h-2 bg-gradient-to-r from-amber-400 to-orange-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
            
            {/* Decorative background glow */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 md:w-40 md:h-40 bg-amber-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 mb-4 md:mb-6 rounded-2xl md:rounded-3xl bg-gradient-to-br from-amber-100 to-orange-50 flex items-center justify-center text-amber-500 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-inner border border-amber-200/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-8 md:w-8 lg:h-10 lg:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-extrabold text-slate-800 mb-2 md:mb-4 group-hover:text-amber-500 transition-colors">Single Page Poster</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-4 md:mb-8 flex-grow">
              A visually stunning, one-page summary of your entire trip. Perfect for quick sharing and printing as a beautiful keepsake.
            </p>
            <span className="inline-flex items-center text-amber-500 font-bold text-sm md:text-base group-hover:gap-2 transition-all">
              Create Poster
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </Link>

          {/* Card 2: Simple itinerary file */}
          <Link href="#file" className="group relative bg-white/95 md:bg-white/90 backdrop-blur-2xl rounded-3xl md:rounded-[2rem] p-5 md:p-6 lg:p-8 shadow-lg md:shadow-xl border border-white hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-2 md:hover:-translate-y-4 overflow-hidden flex flex-col items-center text-center mt-0 lg:mt-8">
            <div className="absolute top-0 left-0 w-full h-1.5 md:h-2 bg-gradient-to-r from-blue-400 to-indigo-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 md:w-40 md:h-40 bg-blue-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 mb-4 md:mb-6 rounded-2xl md:rounded-3xl bg-gradient-to-br from-blue-100 to-indigo-50 flex items-center justify-center text-blue-500 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 shadow-inner border border-blue-200/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-8 md:w-8 lg:h-10 lg:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-extrabold text-slate-800 mb-2 md:mb-4 group-hover:text-blue-500 transition-colors">Simple Itinerary File</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-4 md:mb-8 flex-grow">
              A clean, organized document detailing your day-by-day plans, accommodations, and travel logistics in a minimal format.
            </p>
            <span className="inline-flex items-center text-blue-500 font-bold text-sm md:text-base group-hover:gap-2 transition-all">
              Generate File
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </Link>

          {/* Card 3: Interactive presentation */}
          <Link href="#presentation" className="group relative bg-white/95 md:bg-white/90 backdrop-blur-2xl rounded-3xl md:rounded-[2rem] p-5 md:p-6 lg:p-8 shadow-lg md:shadow-xl border border-white hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-2 md:hover:-translate-y-4 overflow-hidden flex flex-col items-center text-center mt-0 lg:mt-16">
            <div className="absolute top-0 left-0 w-full h-1.5 md:h-2 bg-gradient-to-r from-purple-400 to-pink-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 md:w-40 md:h-40 bg-purple-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 mb-4 md:mb-6 rounded-2xl md:rounded-3xl bg-gradient-to-br from-purple-100 to-pink-50 flex items-center justify-center text-purple-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-inner border border-purple-200/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-8 md:w-8 lg:h-10 lg:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-extrabold text-slate-800 mb-2 md:mb-4 group-hover:text-purple-500 transition-colors">Interactive Presentation</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-4 md:mb-8 flex-grow">
              An immersive digital experience with clickable maps and rich media that you can present anywhere.
            </p>
            <span className="inline-flex items-center text-purple-500 font-bold text-sm md:text-base group-hover:gap-2 transition-all">
              Start Presentation
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </Link>

          {/* Card 4: Interactive itinerary generation */}
          <Link href="#interactive-itinerary" className="group relative bg-white/95 md:bg-white/90 backdrop-blur-2xl rounded-3xl md:rounded-[2rem] p-5 md:p-6 lg:p-8 shadow-lg md:shadow-xl border border-white hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 hover:-translate-y-2 md:hover:-translate-y-4 overflow-hidden flex flex-col items-center text-center mt-0 lg:mt-24">
            <div className="absolute top-0 left-0 w-full h-1.5 md:h-2 bg-gradient-to-r from-emerald-400 to-teal-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 md:w-40 md:h-40 bg-emerald-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 mb-4 md:mb-6 rounded-2xl md:rounded-3xl bg-gradient-to-br from-emerald-100 to-teal-50 flex items-center justify-center text-emerald-500 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 shadow-inner border border-emerald-200/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-8 md:w-8 lg:h-10 lg:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-extrabold text-slate-800 mb-2 md:mb-4 group-hover:text-emerald-500 transition-colors">Interactive Itinerary</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-4 md:mb-8 flex-grow">
              Build your trip step-by-step with real-time feedback, interactive sliders, and AI suggestions based on your preferences.
            </p>
            <span className="inline-flex items-center text-emerald-500 font-bold text-sm md:text-base group-hover:gap-2 transition-all">
              Generate Now
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </Link>

        </div>
      </section>
    </div>
  );
}

