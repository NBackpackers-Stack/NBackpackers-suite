"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();

    if (pathname === '/auth/login' || pathname === '/auth/signup' || pathname === '/mess/QRCodeform') {
        return null;
    }

    return (
        <footer className="bg-white border-t border-slate-200 relative overflow-hidden">
            {/* Decorative gradient blur */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-24 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 blur-3xl opacity-40 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-20 pb-10 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <Link href="/" className="inline-block group">
                            <Image
                                src="/backpackers.png"
                                alt="Backpackers Logo"
                                width={180}
                                height={50}
                                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                        </Link>
                        <p className="text-slate-500 max-w-md text-lg leading-relaxed">
                            Your ultimate travel and operations companion. Plan adventures, automate workflows, and oversee your branches beautifully.
                        </p>
                        <div className="flex gap-4 pt-4">
                            {/* Twitter / X */}
                            <a href="#" className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-all shadow-sm border border-slate-100 hover:-translate-y-1" aria-label="Twitter">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            {/* GitHub */}
                            <a href="#" className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all shadow-sm border border-slate-100 hover:-translate-y-1" aria-label="GitHub">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                            {/* LinkedIn */}
                            <a href="#" className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-700 hover:bg-blue-50 transition-all shadow-sm border border-slate-100 hover:-translate-y-1" aria-label="LinkedIn">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Platform Links Column */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Platform</h4>
                        <ul className="space-y-4">
                            {['Home', 'TRIP', 'Manager', 'Automations'].map((item) => (
                                <li key={item}>
                                    <Link href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} className="text-slate-500 hover:text-blue-600 font-medium transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links Column */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Legal</h4>
                        <ul className="space-y-4">
                            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Contact Us'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-slate-500 hover:text-blue-600 font-medium transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Bottom Section */}
                <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-400 text-sm font-medium">
                        © {new Date().getFullYear()} Backpackers. All rights reserved.
                    </p>
                    <div className="flex gap-8 text-sm font-medium">
                        <Link href="#" className="text-slate-400 hover:text-slate-600 transition-colors">Privacy</Link>
                        <Link href="#" className="text-slate-400 hover:text-slate-600 transition-colors">Terms</Link>
                        <Link href="#" className="text-slate-400 hover:text-slate-600 transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
