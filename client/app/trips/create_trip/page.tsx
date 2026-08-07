"use client";

import axios from "axios";
import { useState } from "react";
import { templatesById } from "../../../public/sampleData";

interface TaskRow {
    id: string;
    name: string;
    description: string;
    time: string;
}

interface DateGroup {
    groupId: string;
    date: string;
    tasks: TaskRow[];
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const emptyTask = (): TaskRow => ({
    id: generateId(),
    name: "",
    description: "",
    time: "",
});

const emptyGroup = (): DateGroup => ({
    groupId: generateId(),
    date: "",
    tasks: [emptyTask()],
});

export default function page() {
    const [tripName, setTripName] = useState("");
    const [tripDate, setTripDate] = useState("");
    const [tripDiscussion, setTripDiscussion] = useState("");
    const [groups, setGroups] = useState<DateGroup[]>([emptyGroup()]);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const loadExample = (key: string) => {
        const tpl = templatesById[key];
        if (!tpl) return;
        setTripName(tpl.tripName);
        setTripDate(tpl.tripDate);
        setTripDiscussion(tpl.tripDiscussion);
        setGroups(tpl.groups);
    };

    /* ── Group helpers ── */
    const addGroup = () => setGroups((p) => [...p, emptyGroup()]);

    const removeGroup = (groupId: string) => {
        if (groups.length === 1) return;
        setGroups((p) => p.filter((g) => g.groupId !== groupId));
    };

    const updateGroupDate = (groupId: string, date: string) =>
        setGroups((p) =>
            p.map((g) => (g.groupId === groupId ? { ...g, date } : g))
        );

    /* ── Task helpers ── */
    const addTask = (groupId: string, index?: number) =>
        setGroups((p) =>
            p.map((g) => {
                if (g.groupId !== groupId) return g;
                if (index !== undefined) {
                    const newTasks = [...g.tasks];
                    newTasks.splice(index, 0, emptyTask());
                    return { ...g, tasks: newTasks };
                }
                return { ...g, tasks: [...g.tasks, emptyTask()] };
            })
        );

    const removeTask = (groupId: string, taskId: string) =>
        setGroups((p) =>
            p.map((g) => {
                if (g.groupId !== groupId) return g;
                if (g.tasks.length === 1) return g; // keep at least one
                return { ...g, tasks: g.tasks.filter((t) => t.id !== taskId) };
            })
        );

    const updateTask = (
        groupId: string,
        taskId: string,
        field: keyof TaskRow,
        value: string
    ) =>
        setGroups((p) =>
            p.map((g) =>
                g.groupId === groupId
                    ? {
                        ...g,
                        tasks: g.tasks.map((t) =>
                            t.id === taskId ? { ...t, [field]: value } : t
                        ),
                    }
                    : g
            )
        );

    /* ── Save ── */
    const handleSave = async () => {
        setSaving(true);
        const payload = {
            tripName,
            tripDate,
            tripDiscussion,
            groups,
            createdAt: new Date().toISOString(),
        };
        console.log("Saving:", payload);
        try {
            const response = await axios.post("/api/new_trip", payload);
            console.log("Response:", response.data);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch {
            alert("Failed to save. Try again.");
        } finally {
            setSaving(false);
        }
    };

    const totalTasks = groups.reduce((acc, g) => acc + g.tasks.length, 0);

    const isValid =
        tripName.trim() !== "" &&
        tripDate !== "" &&
        groups.every(
            (g) =>
                g.date !== "" &&
                g.tasks.every((t) => t.name.trim() !== "" && t.time !== "")
        );

    return (
        <div className="min-h-screen bg-[#f8fafc] font-sans pt-28 pb-10">

            {/* ── Sticky Top Bar ── */}
            <header className="top-24 z-40 bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-lg shadow-slate-200/50 rounded-2xl mx-4 md:mx-auto max-w-4xl mb-8">
                <div className="px-5 py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 shrink-0 rounded-lg bg-blue-600 flex items-center justify-center shadow shadow-blue-200">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <div className="min-w-0">
                            <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest leading-none">Admin</p>
                            <h1 className="text-sm font-black text-slate-800 truncate">Create New Trip</h1>
                        </div>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={!isValid || saving}
                        className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all active:scale-95
              ${isValid && !saving
                                ? "bg-blue-600 text-white shadow-md shadow-blue-200 hover:bg-blue-700"
                                : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}
                    >
                        {saving ? (
                            <><div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving</>
                        ) : saved ? (
                            <><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg> Saved!</>
                        ) : (
                            <><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg> Save Trip</>
                        )}
                    </button>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-5 space-y-5">


                {/* ──??? Template loader (demo) ── */}
                <div className="flex gap-4">
                    <button
                        onClick={() => loadExample("goa")}
                        className="text-sm text-blue-600 underline"
                    >
                        Load Goa template
                    </button>
                    <button
                        onClick={() => loadExample("jaipur")}
                        className="text-sm text-blue-600 underline"
                    >
                        Load Jaipur template
                    </button>
                </div>

                {/* ── Trip Info ── */}
                <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center gap-2">
                        <span className="text-white text-xs font-black uppercase tracking-widest">Trip Info</span>
                    </div>
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                                Trip Name <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                value={tripName}
                                onChange={(e) => setTripName(e.target.value)}
                                placeholder="e.g. Morning School Run"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-500 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                                Trip Date <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="date"
                                value={tripDate}
                                onChange={(e) => setTripDate(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-500 transition-all"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                                Trip Discussion
                            </label>
                            <textarea
                                value={tripDiscussion}
                                onChange={(e) => setTripDiscussion(e.target.value)}
                                placeholder="Add any discussion notes, special instructions, or comments for this trip..."
                                rows={3}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-500 transition-all resize-none"
                            />
                        </div>
                    </div>
                </section>

                {/* ── Task Checklist (grouped by date) ── */}
                <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                    {/* Section Header */}
                    <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                        <div>
                            <h2 className="text-sm font-black text-slate-800">Task Checklist</h2>
                            <p className="text-[10px] text-slate-400 font-medium">
                                Add date groups, then add tasks under each date
                            </p>
                        </div>
                        <span className="bg-blue-100 text-blue-700 text-[11px] font-black px-2.5 py-1 rounded-full">
                            {totalTasks} {totalTasks === 1 ? "task" : "tasks"}
                        </span>
                    </div>

                    {/* Date Groups */}
                    <div className="divide-y divide-slate-100">
                        {groups.map((group, groupIndex) => (
                            <div key={group.groupId} className="p-4 space-y-3">

                                {/* ── Date Group Header ── */}
                                <div className="flex items-center gap-3">
                                    {/* Colored day badge */}
                                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow shadow-indigo-200">
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>

                                    {/* Date label + picker */}
                                    <div className="flex-1 flex items-center gap-2 min-w-0">
                                        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest whitespace-nowrap">
                                            Day {groupIndex + 1}
                                        </span>
                                        <input
                                            type="date"
                                            value={group.date}
                                            onChange={(e) => updateGroupDate(group.groupId, e.target.value)}
                                            className="bg-indigo-50 border border-indigo-200 rounded-lg px-2.5 py-1.5 text-xs font-black text-indigo-700 outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-500 transition-all"
                                        />
                                        {group.date && (
                                            <span className="text-[10px] font-semibold text-slate-400">
                                                {new Date(group.date + "T00:00:00").toLocaleDateString("en-IN", {
                                                    weekday: "short",
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        )}
                                    </div>

                                    {/* Remove group button */}
                                    <button
                                        onClick={() => removeGroup(group.groupId)}
                                        disabled={groups.length === 1}
                                        title="Remove this date group"
                                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all
                                            ${groups.length === 1
                                                ? "opacity-20 cursor-not-allowed"
                                                : "text-slate-300 hover:text-red-400 hover:bg-red-50 active:scale-90"}`}
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>

                                {/* ── Task Sub-Rows for this date ── */}
                                <div className="ml-11 overflow-x-auto rounded-xl border border-slate-100">
                                    <table className="w-full border-collapse text-left" style={{ minWidth: "460px" }}>
                                        <thead>
                                            <tr className="bg-slate-50/80 border-b border-slate-100">
                                                <th className="px-3 py-2 w-8 text-center">
                                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">#</span>
                                                </th>
                                                <th className="px-3 py-2">
                                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                                        Task Name <span className="text-red-400">*</span>
                                                    </span>
                                                </th>
                                                <th className="px-3 py-2">
                                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Description</span>
                                                </th>
                                                <th className="px-3 py-2 w-28">
                                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                                        Time <span className="text-red-400">*</span>
                                                    </span>
                                                </th>
                                                <th className="px-3 py-2 w-16 text-center">
                                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Actions</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {group.tasks.map((task, taskIndex) => (
                                                <tr
                                                    key={task.id}
                                                    className="group/row hover:bg-blue-50/30 transition-colors duration-150"
                                                >
                                                    {/* Row Number */}
                                                    <td className="px-3 py-2.5 text-center">
                                                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-slate-100 text-[10px] font-black text-slate-500 group-hover/row:bg-blue-100 group-hover/row:text-blue-600 transition-colors">
                                                            {taskIndex + 1}
                                                        </span>
                                                    </td>

                                                    {/* Task Name */}
                                                    <td className="px-3 py-2.5">
                                                        <input
                                                            type="text"
                                                            value={task.name}
                                                            onChange={(e) => updateTask(group.groupId, task.id, "name", e.target.value)}
                                                            placeholder="Enter task name..."
                                                            className="w-full bg-transparent border-b-2 border-slate-100 focus:border-blue-500 px-0 py-1 text-sm font-semibold text-slate-800 placeholder:text-slate-300 outline-none transition-colors"
                                                        />
                                                    </td>

                                                    {/* Description */}
                                                    <td className="px-3 py-2.5">
                                                        <input
                                                            type="text"
                                                            value={task.description}
                                                            onChange={(e) => updateTask(group.groupId, task.id, "description", e.target.value)}
                                                            placeholder="Optional notes..."
                                                            className="w-full bg-transparent border-b-2 border-slate-100 focus:border-blue-500 px-0 py-1 text-sm text-slate-600 placeholder:text-slate-300 outline-none transition-colors"
                                                        />
                                                    </td>

                                                    {/* Time */}
                                                    <td className="px-3 py-2.5">
                                                        <input
                                                            type="time"
                                                            value={task.time}
                                                            onChange={(e) => updateTask(group.groupId, task.id, "time", e.target.value)}
                                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-black text-slate-700 outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-500 transition-all"
                                                        />
                                                    </td>

                                                    {/* Actions */}
                                                    <td className="px-3 py-2.5">
                                                        <div className="flex items-center justify-center gap-1">
                                                            <button
                                                                onClick={() => addTask(group.groupId, taskIndex + 1)}
                                                                title="Insert task below"
                                                                className="w-6 h-6 rounded-lg flex items-center justify-center text-slate-300 hover:text-blue-500 hover:bg-blue-50 active:scale-90 transition-all"
                                                            >
                                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                                </svg>
                                                            </button>
                                                            <button
                                                                onClick={() => removeTask(group.groupId, task.id)}
                                                                disabled={group.tasks.length === 1}
                                                                title="Remove task"
                                                                className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all
                                                                    ${group.tasks.length === 1
                                                                        ? "opacity-20 cursor-not-allowed"
                                                                        : "text-slate-300 hover:text-red-400 hover:bg-red-50 active:scale-90"}`}
                                                            >
                                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    {/* Add Task Row button */}
                                    <div className="px-3 py-2 border-t border-slate-100 bg-slate-50/50">
                                        <button
                                            onClick={() => addTask(group.groupId)}
                                            className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-[11px] font-black uppercase tracking-wider transition-all hover:gap-2 active:scale-95"
                                        >
                                            <div className="w-5 h-5 rounded-md bg-blue-600 flex items-center justify-center shadow-sm shadow-blue-200">
                                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                                                </svg>
                                            </div>
                                            Add Task
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add Date Group button */}
                    <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                        <button
                            onClick={addGroup}
                            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 text-xs font-black uppercase tracking-wider transition-all hover:gap-3 active:scale-95"
                        >
                            <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center shadow-sm shadow-indigo-200">
                                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            Add Another Date
                        </button>
                    </div>
                </section>

                {/* ── Save Button ── */}
                <div className="space-y-2 pb-6">
                    <button
                        onClick={handleSave}
                        disabled={!isValid || saving}
                        className={`w-full py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all active:scale-[0.98]
              ${isValid && !saving
                                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-200"
                                : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}
                    >
                        {saving ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Saving Trip...
                            </span>
                        ) : saved ? "✓ Trip Saved Successfully!" : "Save Trip & Checklist"}
                    </button>
                    {!isValid && (
                        <p className="text-center text-[11px] text-slate-400 font-medium">
                            Fill Trip Name, Trip Date, all Day Dates, and every Task Name + Time to save
                        </p>
                    )}

                </div>

            </main>
        </div>
    );
}
