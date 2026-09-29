"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface PolicySection {
    id: string;
    number: string;
    title: string;
    icon: React.ReactNode;
    summary: string;
    content: React.ReactNode;
}

export default function PrivacyPolicyPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeSection, setActiveSection] = useState('overview');
    const [copied, setCopied] = useState(false);

    const lastUpdated = "September 28, 2026";
    const effectiveDate = "January 1, 2026";

    const handleCopyLink = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handlePrint = () => {
        if (typeof window !== 'undefined') {
            window.print();
        }
    };

    const sections: PolicySection[] = [
        {
            id: 'overview',
            number: '01',
            title: 'Overview & Scope',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            summary: 'Understanding how NBackpackers respects and guards your personal privacy across all platforms.',
            content: (
                <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
                    <p>
                        Welcome to <strong className="text-slate-900">NBackpackers</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We operate the NBackpackers web application, trip curation engine, and associated branch &amp; mess management systems (including Delhi Delight operations).
                    </p>
                    <p>
                        This Privacy Policy outlines our standards, practices, and commitments regarding the collection, use, disclosure, and protection of your personal information when you navigate our services, create itineraries, submit branch feedback, or manage logistics.
                    </p>
                    <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-start gap-3 text-blue-900 text-sm">
                        <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>
                            By accessing or using any aspect of the NBackpackers platform, you consent to the collection and handling of your data in alignment with this Privacy Policy.
                        </span>
                    </div>
                </div>
            )
        },
        {
            id: 'information-collected',
            number: '02',
            title: 'Information We Collect',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            summary: 'Details regarding user data, travel itineraries, feedback submissions, and system metrics we record.',
            content: (
                <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
                    <p>We only collect data necessary to provide seamless travel planning and operational reliability:</p>
                    <div className="grid sm:grid-cols-2 gap-4 pt-2">
                        <div className="p-5 rounded-2xl bg-white border border-slate-200/70 shadow-sm space-y-2">
                            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                                A
                            </div>
                            <h4 className="font-bold text-slate-900 text-sm md:text-base">Personal Identification</h4>
                            <p className="text-xs md:text-sm text-slate-500">
                                Names, email addresses, contact numbers, and optional batch or member identifiers submitted through registration and survey forms.
                            </p>
                        </div>
                        <div className="p-5 rounded-2xl bg-white border border-slate-200/70 shadow-sm space-y-2">
                            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs">
                                B
                            </div>
                            <h4 className="font-bold text-slate-900 text-sm md:text-base">Travel &amp; Itinerary Data</h4>
                            <p className="text-xs md:text-sm text-slate-500">
                                Destinations visited, lodging preferences, excursion dates, checklist states, and custom itinerary specifications.
                            </p>
                        </div>
                        <div className="p-5 rounded-2xl bg-white border border-slate-200/70 shadow-sm space-y-2">
                            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                                C
                            </div>
                            <h4 className="font-bold text-slate-900 text-sm md:text-base">Operational &amp; Mess Records</h4>
                            <p className="text-xs md:text-sm text-slate-500">
                                Dining feedback ratings, bill uploads, inventory levels, consumption counts, and facility issue reports across branches.
                            </p>
                        </div>
                        <div className="p-5 rounded-2xl bg-white border border-slate-200/70 shadow-sm space-y-2">
                            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
                                D
                            </div>
                            <h4 className="font-bold text-slate-900 text-sm md:text-base">Device &amp; Usage Logs</h4>
                            <p className="text-xs md:text-sm text-slate-500">
                                IP addresses, browser types, service worker status, Progressive Web App (PWA) cache events, and interaction timestamps.
                            </p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'how-we-use',
            number: '03',
            title: 'How We Use Your Information',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
            ),
            summary: 'The operational and functional purposes behind gathering your information.',
            content: (
                <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
                    <p>We process information exclusively for legitimate business and service operations:</p>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs shrink-0 mt-0.5">✓</span>
                            <span><strong>Itinerary &amp; Trip Coordination:</strong> Generating day-wise schedules, checklist trackers, and destination recommendations.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs shrink-0 mt-0.5">✓</span>
                            <span><strong>Mess Quality Assurance:</strong> Aggregating student dining feedback, analyzing food satisfaction trends, and optimizing supply inventories.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs shrink-0 mt-0.5">✓</span>
                            <span><strong>Managerial Oversight:</strong> Assigning tasks, monitoring task completion metrics, and maintaining accountable log trails.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs shrink-0 mt-0.5">✓</span>
                            <span><strong>System Security:</strong> Protecting against unauthorized access, validating session integrity, and debugging application errors.</span>
                        </li>
                    </ul>
                </div>
            )
        },
        {
            id: 'data-sharing',
            number: '04',
            title: 'Data Sharing & Third Parties',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
            ),
            summary: 'Our strict zero-sale commitment and trusted infrastructure providers.',
            content: (
                <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-950 flex items-start gap-3">
                        <svg className="w-6 h-6 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <div>
                            <h4 className="font-extrabold text-sm md:text-base text-emerald-900">We Never Sell Your Data</h4>
                            <p className="text-xs md:text-sm text-emerald-800/90 mt-1">
                                NBackpackers does not sell, rent, or trade your personal information, itineraries, or dining feedback to advertisers or data brokers.
                            </p>
                        </div>
                    </div>
                    <p>We partner only with vetted cloud infrastructure partners to safely run our services:</p>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                        <li><strong>Cloudinary:</strong> Used for secure media and image hosting (receipt bills, dish photos, resort snapshots).</li>
                        <li><strong>MongoDB Cloud Atlas:</strong> Provides encrypted database storage for records and checklist entries.</li>
                        <li><strong>Legal Compliance:</strong> We disclose data only if required by a valid legal process or court order.</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'storage-security',
            number: '05',
            title: 'Data Storage & Security Measures',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            summary: 'Industry-standard encryption, strict access control, and vulnerability management.',
            content: (
                <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
                    <p>We treat your operational and personal data with enterprise-grade protection:</p>
                    <div className="grid sm:grid-cols-3 gap-3">
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                            <span className="text-xl">🔐</span>
                            <h5 className="font-bold text-slate-900 text-sm mt-2">TLS / SSL Encryption</h5>
                            <p className="text-xs text-slate-500 mt-1">All data transmitted between your browser and our servers is secured using modern TLS 1.3.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                            <span className="text-xl">🛡️</span>
                            <h5 className="font-bold text-slate-900 text-sm mt-2">Access Control</h5>
                            <p className="text-xs text-slate-500 mt-1">Role-based authentication guarantees staff can only access data pertinent to their role.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                            <span className="text-xl">🔄</span>
                            <h5 className="font-bold text-slate-900 text-sm mt-2">Automated Backups</h5>
                            <p className="text-xs text-slate-500 mt-1">Redundant database backups prevent data loss while preserving audit integrity.</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'cookies-pwa',
            number: '06',
            title: 'Cookies & Progressive Web App (PWA)',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            summary: 'Offline caching, service workers, and local storage utilization.',
            content: (
                <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
                    <p>
                        NBackpackers is built as an offline-capable <strong>Progressive Web App (PWA)</strong>. We utilize lightweight browser storage mechanisms to ensure fast loads and offline checklist functionality:
                    </p>
                    <ul className="space-y-2 list-disc pl-5 text-sm text-slate-600">
                        <li><strong>Service Worker Cache:</strong> Static assets (icons, stylesheets, scripts) are cached locally on your device for immediate offline rendering.</li>
                        <li><strong>Session &amp; Local Storage:</strong> Used to maintain user authentication tokens, active branch selection, and temporary form drafts.</li>
                        <li><strong>Analytics &amp; Performance:</strong> Anonymous session telemetry helps us diagnose slow response times and UI bottlenecks.</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'user-rights',
            number: '07',
            title: 'Your Privacy Rights',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
            summary: 'Accessing, updating, exporting, or requesting deletion of your personal records.',
            content: (
                <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
                    <p>Regardless of your geographic location, we respect your rights regarding your data:</p>
                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                        <div className="p-4 rounded-xl border border-slate-200/70 bg-white">
                            <h5 className="font-bold text-slate-900 mb-1">Right to Access</h5>
                            <p className="text-xs text-slate-500">Request a complete copy of the personal information stored in your account.</p>
                        </div>
                        <div className="p-4 rounded-xl border border-slate-200/70 bg-white">
                            <h5 className="font-bold text-slate-900 mb-1">Right to Rectification</h5>
                            <p className="text-xs text-slate-500">Correct any inaccurate or incomplete profile or submission information.</p>
                        </div>
                        <div className="p-4 rounded-xl border border-slate-200/70 bg-white">
                            <h5 className="font-bold text-slate-900 mb-1">Right to Erasure</h5>
                            <p className="text-xs text-slate-500">Request permanent deletion of your profile, saved trips, and personal logs.</p>
                        </div>
                        <div className="p-4 rounded-xl border border-slate-200/70 bg-white">
                            <h5 className="font-bold text-slate-900 mb-1">Right to Withdraw Consent</h5>
                            <p className="text-xs text-slate-500">Revoke consent for communications and non-essential analytical tracking at any time.</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'retention',
            number: '08',
            title: 'Data Retention & Lifecycle',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            summary: 'Guidelines on how long operational records and personal profiles are preserved.',
            content: (
                <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
                    <p>
                        We preserve records only as long as necessary to fulfill the operational purposes described in this policy:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                        <li><strong>Trip Itineraries:</strong> Retained for active planning and history until deleted by the user.</li>
                        <li><strong>Mess &amp; Quality Feedback:</strong> Preserved for historical analytics and trend reporting across semester terms.</li>
                        <li><strong>Inventory &amp; Purchase Logs:</strong> Preserved for standard statutory accounting and audit verification cycles.</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'contact',
            number: '09',
            title: 'Contact & Data Inquiries',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            summary: 'How to reach our designated privacy desk for assistance or data requests.',
            content: (
                <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
                    <p>
                        If you have questions, feedback, or would like to exercise any of your data rights, please contact our Data Protection Team:
                    </p>
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-xl space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                                ✉️
                            </div>
                            <div>
                                <h5 className="font-bold text-white text-base">Privacy &amp; Compliance Office</h5>
                                <p className="text-xs text-indigo-200">NBackpackers Operations Group</p>
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3 pt-2 text-xs md:text-sm text-slate-300">
                            <div>
                                <span className="block text-[11px] font-bold text-indigo-300 uppercase tracking-wider">Email Inquiry</span>
                                <a href="mailto:privacy@nbackpackers.com" className="hover:text-white transition-colors underline font-medium">privacy@nbackpackers.com</a>
                            </div>
                            <div>
                                <span className="block text-[11px] font-bold text-indigo-300 uppercase tracking-wider">Support Desk</span>
                                <a href="mailto:support@nbackpackers.com" className="hover:text-white transition-colors underline font-medium">support@nbackpackers.com</a>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    const filteredSections = sections.filter(sec =>
        sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sec.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200 text-slate-800 pb-24 relative overflow-hidden">
            {/* Ambient Background Gradient Elements matching website theme */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-r from-blue-100/60 via-indigo-100/50 to-purple-100/60 blur-3xl opacity-70 pointer-events-none -z-0"></div>
            <div className="absolute top-40 right-[-10%] w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none mix-blend-multiply"></div>
            <div className="absolute top-96 left-[-10%] w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none mix-blend-multiply"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-28 md:pt-32 relative z-10">

                {/* Breadcrumbs & Navigation Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <nav className="flex items-center gap-2 text-xs md:text-sm font-semibold text-slate-500">
                        <Link href="/" className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Home
                        </Link>
                        <span>/</span>
                        <span className="text-slate-900 font-bold">Privacy Policy</span>
                    </nav>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleCopyLink}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 hover:bg-white text-slate-700 text-xs font-bold shadow-sm border border-slate-200/70 hover:shadow transition-all active:scale-95 backdrop-blur-md"
                            title="Copy link"
                        >
                            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            {copied ? 'Link Copied!' : 'Share'}
                        </button>
                        <button
                            onClick={handlePrint}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 hover:bg-white text-slate-700 text-xs font-bold shadow-sm border border-slate-200/70 hover:shadow transition-all active:scale-95 backdrop-blur-md"
                            title="Print policy"
                        >
                            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                            Print
                        </button>
                    </div>
                </div>

                {/* Hero Header Section */}
                <div className="relative bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-100/70 border border-white/60 mb-12 overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-blue-50/70 to-transparent pointer-events-none -z-0"></div>

                    <div className="relative z-10 max-w-3xl space-y-5">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 text-blue-700 text-xs font-extrabold uppercase tracking-widest shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                            Trust, Security &amp; Compliance
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Policy</span>
                        </h1>

                        <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
                            At NBackpackers, we are committed to upholding transparency, protecting your confidential itineraries, and safeguarding your operational records across our entire ecosystem.
                        </p>

                        <div className="pt-3 flex flex-wrap items-center gap-6 text-xs md:text-sm font-semibold text-slate-500 border-t border-slate-100">
                            <div className="flex items-center gap-2">
                                <span className="text-slate-400">Effective:</span>
                                <span className="text-slate-700 font-bold">{effectiveDate}</span>
                            </div>
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                            <div className="flex items-center gap-2">
                                <span className="text-slate-400">Last Revised:</span>
                                <span className="text-slate-700 font-bold">{lastUpdated}</span>
                            </div>
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                            <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                Version 2.4 Active
                            </div>
                        </div>
                    </div>
                </div>

                {/* Highlight Guarantees Grid */}
                <div className="grid sm:grid-cols-3 gap-6 mb-12">
                    <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-100 shadow-sm hover:shadow-md transition-shadow space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl shadow-inner">
                            🛡️
                        </div>
                        <h3 className="font-extrabold text-slate-900 text-lg">Zero Data Sale</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            We will never monetize, trade, or share your contact or trip details with unsolicited ad agencies.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-100 shadow-sm hover:shadow-md transition-shadow space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl shadow-inner">
                            🔒
                        </div>
                        <h3 className="font-extrabold text-slate-900 text-lg">Encrypted Storage</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Database queries and cloud object storage are encrypted at rest and in transit with modern protocols.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-100 shadow-sm hover:shadow-md transition-shadow space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xl shadow-inner">
                            ⚙️
                        </div>
                        <h3 className="font-extrabold text-slate-900 text-lg">Full User Control</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Review, export, or permanently erase your travel submissions or feedback entries whenever you choose.
                        </p>
                    </div>
                </div>

                {/* Main Content Layout with Sidebar Navigation */}
                <div className="grid lg:grid-cols-12 gap-8 items-start">

                    {/* Left Sticky Sidebar: Navigation & Quick Search */}
                    <div className="lg:col-span-4 sticky top-28 space-y-6">

                        {/* Search Bar */}
                        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-slate-200/70">
                            <label htmlFor="search-policy" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                Search Policy
                            </label>
                            <div className="relative">
                                <input
                                    id="search-policy"
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Filter by keyword (e.g. cookies, delete)..."
                                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs md:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                                />
                                <svg className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Table of Contents */}
                        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-slate-200/70 space-y-4">
                            <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider flex items-center justify-between">
                                <span>Table of Contents</span>
                                <span className="text-xs font-semibold text-slate-400 lowercase">{filteredSections.length} sections</span>
                            </h3>

                            <nav className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1">
                                {filteredSections.map((sec) => (
                                    <a
                                        key={sec.id}
                                        href={`#${sec.id}`}
                                        onClick={() => setActiveSection(sec.id)}
                                        className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all ${
                                            activeSection === sec.id
                                                ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100 translate-x-1'
                                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                    >
                                        <span className={`text-[11px] font-mono px-1.5 py-0.5 rounded ${
                                            activeSection === sec.id ? 'bg-blue-200/60 text-blue-800' : 'bg-slate-100 text-slate-500'
                                        }`}>
                                            {sec.number}
                                        </span>
                                        <span className="truncate">{sec.title}</span>
                                    </a>
                                ))}
                            </nav>
                        </div>

                        {/* Quick Help Card */}
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-500/20 space-y-3">
                            <h4 className="font-extrabold text-lg text-white">Have questions?</h4>
                            <p className="text-xs text-blue-100 leading-relaxed">
                                Our data support specialists are available to answer your privacy inquiries or process access requests.
                            </p>
                            <a
                                href="mailto:privacy@nbackpackers.com"
                                className="inline-block mt-2 px-4 py-2 bg-white text-blue-700 rounded-xl font-bold text-xs hover:bg-blue-50 transition-colors shadow-sm"
                            >
                                Contact Privacy Officer →
                            </a>
                        </div>
                    </div>

                    {/* Right Policy Sections List */}
                    <div className="lg:col-span-8 space-y-8">
                        {filteredSections.length === 0 ? (
                            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
                                <div className="text-4xl">🔍</div>
                                <h3 className="font-extrabold text-slate-800 text-lg">No matching clauses found</h3>
                                <p className="text-slate-500 text-sm">
                                    Try searching for different terms like &quot;data&quot;, &quot;cookies&quot;, &quot;security&quot;, or &quot;feedback&quot;.
                                </p>
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="mt-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
                                >
                                    Reset Search
                                </button>
                            </div>
                        ) : (
                            filteredSections.map((sec) => (
                                <section
                                    key={sec.id}
                                    id={sec.id}
                                    className="bg-white/90 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-md shadow-slate-100/60 border border-slate-200/70 hover:border-blue-200 transition-all scroll-mt-28"
                                >
                                    {/* Section Header */}
                                    <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-100">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 text-blue-600 flex items-center justify-center shadow-inner">
                                            {sec.icon}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-mono font-bold text-blue-600 uppercase">
                                                    Section {sec.number}
                                                </span>
                                            </div>
                                            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                                                {sec.title}
                                            </h2>
                                        </div>
                                    </div>

                                    {/* Section Summary */}
                                    <p className="text-xs md:text-sm font-semibold text-slate-400 italic mb-5">
                                        Summary: {sec.summary}
                                    </p>

                                    {/* Section Body */}
                                    {sec.content}
                                </section>
                            ))
                        )}

                        {/* End of Document Confirmation Card */}
                        <div className="p-8 rounded-3xl bg-slate-100/80 border border-slate-200 text-center space-y-3">
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Compliance Confirmation</p>
                            <h4 className="text-lg font-black text-slate-900">Your privacy is integral to the NBackpackers experience.</h4>
                            <p className="text-xs text-slate-500 max-w-xl mx-auto">
                                If we make any material revisions to how your personal information is stored or processed, we will alert you via banner notifications or registered email.
                            </p>
                            <div className="pt-2">
                                <Link
                                    href="/"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold text-sm shadow-md transition-all active:scale-95"
                                >
                                    Return to Homepage
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
