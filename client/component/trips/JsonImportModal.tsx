"use client";

import { useEffect, useRef, useState } from "react";

export interface TaskRow {
    id: string;
    name: string;
    description: string;
    time: string;
}

export interface DateGroup {
    groupId: string;
    date: string;
    tasks: TaskRow[];
}

export interface TripFormData {
    tripName: string;
    tripDate: string;
    tripDiscussion: string;
    groups: DateGroup[];
}

interface JsonImportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (data: TripFormData) => void;
    currentFormData: TripFormData;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export const normalizeDate = (rawDate: any): string => {
    if (!rawDate || typeof rawDate !== "string") return "";
    const trimmed = rawDate.trim();
    if (!trimmed) return "";

    // Already YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
        return trimmed;
    }

    // DD-MM-YYYY or DD/MM/YYYY
    const dmyMatch = trimmed.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
    if (dmyMatch) {
        const d = dmyMatch[1].padStart(2, "0");
        const m = dmyMatch[2].padStart(2, "0");
        const y = dmyMatch[3];
        return `${y}-${m}-${d}`;
    }

    // Try Date.parse for strings like "17 October 2026", "October 17 2026"
    const parsed = new Date(trimmed);
    if (!isNaN(parsed.getTime())) {
        const y = parsed.getFullYear();
        const m = String(parsed.getMonth() + 1).padStart(2, "0");
        const d = String(parsed.getDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;
    }

    return trimmed;
};

export const normalizeTime = (rawTime: any): string => {
    if (!rawTime) return "";
    const str = String(rawTime).trim();
    if (!str) return "";

    // 12-hour format e.g. "3:30 PM", "03:30pm", "11:45 AM"
    const match12 = str.match(/^(\d{1,2}):(\d{2})(?::\d{2})?\s*(am|pm)$/i);
    if (match12) {
        let h = parseInt(match12[1], 10);
        const m = match12[2];
        const meridiem = match12[3].toLowerCase();
        if (meridiem === "pm" && h < 12) h += 12;
        if (meridiem === "am" && h === 12) h = 0;
        return `${String(h).padStart(2, "0")}:${m}`;
    }

    // 24-hour format e.g. "9:30" or "09:30" or "15:30:00"
    const match24 = str.match(/^(\d{1,2}):(\d{2})/);
    if (match24) {
        return `${match24[1].padStart(2, "0")}:${match24[2]}`;
    }

    return str;
};

/**
 * Parses user input supporting:
 * 1. Raw JavaScript object literal: { tripName: "...", groups: [ { groupId: generateId(), ... } ] }
 * 2. Unquoted object keys
 * 3. Array of objects: [ { date: "17 October 2026", tasks: [...] } ]
 * 4. Trailing commas and semicolons
 * 5. Calls to generateId()
 * 6. Standard JSON
 */
export const parseRelaxedData = (rawText: string): any => {
    let text = rawText.trim();
    if (!text) return null;

    // 1. Remove leading export or variable assignment: e.g. "const trip = { ... };"
    text = text.replace(/^(?:export\s+)?(?:const|let|var)\s+[a-zA-Z0-9_$]+(?:\s*:\s*[^=]+)?\s*=\s*/, "");

    // 2. Remove property name prefix if copied from inside a dictionary: e.g. "goa: {"
    text = text.replace(/^[a-zA-Z0-9_$]+\s*:\s*(?=[{\[])/, "");

    // 3. Remove trailing semicolons or commas at the very end
    text = text.replace(/[;,]\s*$/, "").trim();

    // 4. Try safe Function evaluation providing generateId in scope
    try {
        const fn = new Function(
            "generateId",
            `"use strict"; return (${text});`
        );
        return fn(generateId);
    } catch {
        // Fall through
    }

    // 5. Try wrapped in eval
    try {
        const fn = new Function(
            "generateId",
            `"use strict"; return eval("(" + ${JSON.stringify(text)} + ")");`
        );
        return fn(generateId);
    } catch {
        // Fall through
    }

    // 6. If user pasted beginning with "groups: [ ... ]"
    if (/^groups\s*:\s*\[/i.test(text)) {
        try {
            const fn = new Function(
                "generateId",
                `"use strict"; return ({ ${text} });`
            );
            return fn(generateId);
        } catch {
            // Fall through
        }
    }

    // 7. Standard JSON fallback (replace generateId() with mock and strip trailing commas)
    try {
        let jsonAttempt = text.replace(/generateId\(\)/g, () => `"${generateId()}"`);
        jsonAttempt = jsonAttempt.replace(/,\s*([\]}])/g, "$1");
        return JSON.parse(jsonAttempt);
    } catch {
        // Fall through
    }

    throw new Error("Could not parse object or array. Please verify brackets { } and [ ] are properly matched.");
};

const SAMPLE_OBJECT_TEXT = `{
  tripName: "Goa getaway",
  tripDate: "2026-03-13",
  tripDiscussion: "This is a two-day sample trip to Goa.",
  groups: [
    {
      groupId: generateId(),
      date: "17 October 2026",
      tasks: [
        {
          id: generateId(),
          name: "Student Reporting & Attendance",
          description: "Students assemble at the school premises after roll call.",
          time: "20:00"
        },
        {
          id: generateId(),
          name: "Group Formation & Luggage Check",
          description: "Organize students into groups and verify their luggage before departure.",
          time: "20:10"
        },
        {
          id: generateId(),
          name: "Depart for Jaipur",
          description: "Begin the overnight bus journey to Jaipur.",
          time: "20:45"
        }
      ]
    },
    {
      groupId: generateId(),
      date: "18 October 2026",
      tasks: [
        {
          id: generateId(),
          name: "Arrival at Jaipur Hotel",
          description: "Arrive in Jaipur and coordinate hotel check-in.",
          time: "11:00"
        },
        {
          id: generateId(),
          name: "City Palace Visit",
          description: "Visit City Palace, Jaipur.",
          time: "14:00"
        }
      ]
    }
  ]
}`;

export default function JsonImportModal({
    isOpen,
    onClose,
    onApply,
    currentFormData,
}: JsonImportModalProps) {
    const [inputText, setInputText] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [stats, setStats] = useState<{ days: number; tasks: number } | null>(null);
    const [copied, setCopied] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Focus textarea when modal opens
    useEffect(() => {
        if (isOpen) {
            setError(null);
            setTimeout(() => {
                textareaRef.current?.focus();
            }, 100);
        }
    }, [isOpen]);

    // Handle Escape key
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    // Live preview analysis
    useEffect(() => {
        if (!inputText.trim()) {
            setStats(null);
            return;
        }
        try {
            const parsed = parseRelaxedData(inputText);
            if (!parsed) {
                setStats(null);
                return;
            }
            const data = parsed.trip || parsed.data || parsed;
            let groupCount = 0;
            let taskCount = 0;

            if (Array.isArray(data)) {
                if (data.length > 0 && (data[0].tasks || data[0].activities || data[0].checklist || data[0].items || data[0].date || data[0].dayDate)) {
                    groupCount = data.length;
                    taskCount = data.reduce((acc, g) => acc + (Array.isArray(g.tasks || g.activities || g.checklist || g.items) ? (g.tasks || g.activities || g.checklist || g.items).length : 0), 0);
                } else if (data.length > 0 && (data[0].name || data[0].taskName || data[0].title)) {
                    groupCount = 1;
                    taskCount = data.length;
                }
            } else if (typeof data === "object" && data !== null) {
                const groups = data.groups || data.dateGroups || data.days || data.schedule || data.itinerary;
                if (Array.isArray(groups)) {
                    groupCount = groups.length;
                    taskCount = groups.reduce((acc, g) => acc + (Array.isArray(g.tasks || g.activities || g.checklist || g.items) ? (g.tasks || g.activities || g.checklist || g.items).length : 0), 0);
                } else if (Array.isArray(data.tasks)) {
                    groupCount = 1;
                    taskCount = data.tasks.length;
                }
            }

            if (groupCount > 0 || taskCount > 0) {
                setStats({ days: groupCount, tasks: taskCount });
                setError(null);
            } else {
                setStats(null);
            }
        } catch {
            setStats(null);
        }
    }, [inputText]);

    const handleApply = () => {
        try {
            setError(null);
            if (!inputText.trim()) {
                setError("Please paste your object or array before applying.");
                return;
            }

            let parsed: any;
            try {
                parsed = parseRelaxedData(inputText);
            } catch (err: any) {
                setError(err.message || "Failed to parse object or array.");
                return;
            }

            if (!parsed) {
                setError("No valid data found.");
                return;
            }

            const data = parsed.trip || parsed.data || parsed;

            let tripName = "";
            let tripDate = "";
            let tripDiscussion = "";
            let rawGroups: any[] = [];

            if (Array.isArray(data)) {
                if (data.length > 0 && (data[0].tasks || data[0].activities || data[0].checklist || data[0].items || data[0].date || data[0].dayDate)) {
                    rawGroups = data;
                } else if (data.length > 0 && (data[0].name || data[0].taskName || data[0].title || data[0].time)) {
                    rawGroups = [
                        {
                            date: "",
                            tasks: data,
                        },
                    ];
                }
            } else if (typeof data === "object" && data !== null) {
                tripName = data.tripName || data.name || data.title || data.trip_name || "";
                tripDate = normalizeDate(data.tripDate || data.date || data.startDate || data.trip_date || "");
                tripDiscussion = data.tripDiscussion || data.discussion || data.description || data.notes || data.trip_discussion || "";

                const possibleGroups = data.groups || data.dateGroups || data.days || data.schedule || data.itinerary;
                if (Array.isArray(possibleGroups)) {
                    rawGroups = possibleGroups;
                } else if (Array.isArray(data.tasks)) {
                    rawGroups = [
                        {
                            date: tripDate,
                            tasks: data.tasks,
                        },
                    ];
                }
            } else {
                setError("Data must be an object with trip details or an array of date groups/tasks.");
                return;
            }

            // Process and build final groups
            const processedGroups: DateGroup[] = [];

            if (rawGroups && rawGroups.length > 0) {
                for (const rg of rawGroups) {
                    const groupDate = normalizeDate(rg.date || rg.dayDate || rg.day || (processedGroups.length === 0 ? tripDate : ""));
                    const rawTasks = rg.tasks || rg.activities || rg.checklist || rg.items || rg.events || [];
                    const tasks: TaskRow[] = [];

                    if (Array.isArray(rawTasks) && rawTasks.length > 0) {
                        for (const rt of rawTasks) {
                            tasks.push({
                                id: rt.id && typeof rt.id === "string" ? rt.id : generateId(),
                                name: String(rt.name || rt.taskName || rt.title || rt.activity || "").trim(),
                                description: String(rt.description || rt.desc || rt.notes || rt.details || "").trim(),
                                time: normalizeTime(rt.time || rt.taskTime || rt.startTime || rt.at || ""),
                            });
                        }
                    }

                    processedGroups.push({
                        groupId: rg.groupId && typeof rg.groupId === "string" ? rg.groupId : generateId(),
                        date: groupDate,
                        tasks: tasks.length > 0 ? tasks : [
                            {
                                id: generateId(),
                                name: "",
                                description: "",
                                time: "",
                            },
                        ],
                    });
                }
            }

            const finalGroups = processedGroups.length > 0 ? processedGroups : [
                {
                    groupId: generateId(),
                    date: tripDate,
                    tasks: [
                        {
                            id: generateId(),
                            name: "",
                            description: "",
                            time: "",
                        },
                    ],
                },
            ];

            // Auto-fallback tripDate from first group if missing
            if (!tripDate && finalGroups[0]?.date) {
                tripDate = finalGroups[0].date;
            }

            onApply({
                tripName: tripName || currentFormData.tripName,
                tripDate: tripDate || currentFormData.tripDate,
                tripDiscussion: tripDiscussion || currentFormData.tripDiscussion,
                groups: finalGroups,
            });

            onClose();
        } catch (err: any) {
            setError(`Error processing data: ${err.message}`);
        }
    };

    const handlePasteClipboard = async () => {
        try {
            setError(null);
            const text = await navigator.clipboard.readText();
            if (text) {
                setInputText(text);
            } else {
                setError("Clipboard is empty.");
            }
        } catch {
            setError("Could not access clipboard automatically. Please paste directly into the box with Ctrl+V / Cmd+V.");
        }
    };

    const handleLoadSample = () => {
        setError(null);
        setInputText(SAMPLE_OBJECT_TEXT);
    };

    const handleLoadCurrentForm = () => {
        setError(null);
        const exportObj = {
            tripName: currentFormData.tripName,
            tripDate: currentFormData.tripDate,
            tripDiscussion: currentFormData.tripDiscussion,
            groups: currentFormData.groups.map((g) => ({
                groupId: "generateId()",
                date: g.date,
                tasks: g.tasks.map((t) => ({
                    id: "generateId()",
                    name: t.name,
                    description: t.description,
                    time: t.time,
                })),
            })),
        };
        // Format with unquoted generateId()
        let formatted = JSON.stringify(exportObj, null, 2);
        formatted = formatted.replace(/"generateId\(\)"/g, "generateId()");
        setInputText(formatted);
    };

    const handleFormat = () => {
        try {
            setError(null);
            if (!inputText.trim()) return;
            const parsed = parseRelaxedData(inputText);
            setInputText(JSON.stringify(parsed, null, 2));
        } catch (err: any) {
            setError(`Cannot format: ${err.message}`);
        }
    };

    const handleCopySample = () => {
        navigator.clipboard.writeText(SAMPLE_OBJECT_TEXT);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            {/* Modal Dialog Box */}
            <div
                className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200/80 flex flex-col max-h-[92vh] overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between gap-3 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shadow-inner text-blue-400 shrink-0">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <h2 className="text-base font-black tracking-tight text-white">Paste Object / Array</h2>
                                <span className="bg-blue-500/30 text-blue-300 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border border-blue-400/20">
                                    Auto-fill
                                </span>
                            </div>
                            <p className="text-xs text-slate-300 font-medium truncate">
                                Paste raw JS object, array of days, or JSON to auto-fill the whole form
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
                        title="Close modal"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Toolbar */}
                <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5 flex-wrap">
                        <button
                            type="button"
                            onClick={handlePasteClipboard}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 hover:text-blue-600 transition-all active:scale-95 shadow-2xs cursor-pointer"
                        >
                            <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Paste Clipboard
                        </button>

                        <button
                            type="button"
                            onClick={handleLoadSample}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 hover:text-blue-600 transition-all active:scale-95 shadow-2xs cursor-pointer"
                        >
                            <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            Load Sample
                        </button>

                        <button
                            type="button"
                            onClick={handleLoadCurrentForm}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 hover:text-blue-600 transition-all active:scale-95 shadow-2xs cursor-pointer"
                        >
                            <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            Use Current Form
                        </button>

                        <button
                            type="button"
                            onClick={handleFormat}
                            disabled={!inputText.trim()}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 shadow-2xs cursor-pointer"
                        >
                            <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                            Format
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        {inputText.trim() && (
                            <button
                                type="button"
                                onClick={() => { setInputText(""); setError(null); setStats(null); }}
                                className="text-[11px] font-bold text-red-500 hover:text-red-700 hover:underline px-1 py-0.5 cursor-pointer"
                            >
                                Clear
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={handleCopySample}
                            className="text-[11px] font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                        >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            {copied ? "Copied Sample!" : "Copy Sample"}
                        </button>
                    </div>
                </div>

                {/* Body Area */}
                <div className="p-5 overflow-y-auto space-y-3 flex-1 flex flex-col">
                    {/* Error Banner */}
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700">
                            <svg className="w-4 h-4 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <div className="min-w-0">
                                <p className="font-bold">{error}</p>
                                <p className="text-[11px] text-red-600 mt-0.5">
                                    You can paste JS objects, array of days, unquoted keys, and generateId() function calls directly!
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Stats Indicator */}
                    {stats && !error && (
                        <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800">
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="font-bold">
                                    Structure Detected: {stats.days} {stats.days === 1 ? "day" : "days"} &bull; {stats.tasks} {stats.tasks === 1 ? "task" : "tasks"}
                                </span>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                                Ready to Auto-Fill
                            </span>
                        </div>
                    )}

                    {/* Textarea */}
                    <div className="flex-1 flex flex-col min-h-[250px] relative rounded-2xl border border-slate-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-400/40 transition-all overflow-hidden bg-slate-950">
                        <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                            <span>trip_data.js</span>
                            <span>{inputText.length} characters</span>
                        </div>
                        <textarea
                            ref={textareaRef}
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => {
                                if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                                    e.preventDefault();
                                    handleApply();
                                }
                            }}
                            placeholder={`Paste your object or array here... Example:
{
  tripName: "Goa getaway",
  tripDate: "2026-03-13",
  tripDiscussion: "This is a two-day sample trip to Goa.",
  groups: [
    {
      groupId: generateId(),
      date: "17 October 2026",
      tasks: [
        {
          id: generateId(),
          name: "Student Reporting & Attendance",
          description: "Students assemble at the school premises after roll call.",
          time: "20:00"
        }
      ]
    }
  ]
}`}
                            spellCheck={false}
                            autoCapitalize="off"
                            autoCorrect="off"
                            className="flex-1 w-full p-4 bg-transparent text-emerald-400 font-mono text-xs leading-relaxed resize-none outline-none placeholder:text-slate-600 selection:bg-blue-600 selection:text-white min-h-[230px]"
                        />
                    </div>

                    {/* Helper text */}
                    <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                        <span>Shortcuts: Press <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-mono text-slate-700">Ctrl + Enter</kbd> to Apply, <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-mono text-slate-700">Esc</kbd> to cancel</span>
                        <span>Auto-converts dates &amp; times</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-black uppercase tracking-wider text-slate-700 hover:bg-slate-100 active:scale-95 transition-all shadow-2xs cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleApply}
                        disabled={!inputText.trim()}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all active:scale-95 shadow-md
                            ${inputText.trim()
                                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-200 hover:from-blue-700 hover:to-indigo-700 cursor-pointer"
                                : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                            }`}
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        Auto-Fill Form
                    </button>
                </div>
            </div>
        </div>
    );
}
