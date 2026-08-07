"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { newtasks } from '@/public/manager-task';
import imageCompression from 'browser-image-compression';
import AnimatedLoader from '@/component/AnimatedLoader';

interface Task {
    _id?: string;
    task: string;
    time?: string;
    status: "pending" | "done" | "raise";
    submittedAt?: string;
    firstImageUrl?: string;
    secondImageUrl?: string;
    firstImageFile?: File;
    secondImageFile?: File;
}

export default function ManagerialPage() {


    const [dayId, setDayId] = useState<string>("");
    const [month, setMonth] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        fetchTask();

    }, []);

    const fetchTask = async () => {
        const now = new Date();
        const day = now.getDate();
        const monthIndex = now.getMonth() + 1;
        const year = now.getFullYear();
        const formattedDate = `${day}/${monthIndex}/${year}`;
        const monthName = now.toLocaleString('default', { month: 'long' });


        const data = {
            formattedDate: formattedDate,
            monthName: monthName,
            tasks: newtasks
        }
        try {
            const response = await axios.post("/api/manager/create-task", { data: data });
            console.log("Response: ", response.data);
            if (response.data.taskId) {
                getAllTasks(response.data.taskId);
            }
        } catch (error) {
            console.log("error in", error);
            setLoading(false);
        }
    }

    const getAllTasks = async (taskId: string) => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/manager/gettask/${taskId}`);
            console.log("------", response.data);
            const data = response.data.tasks;
            setDayId(data._id);
            setTasks(data.tasks);

            let displayDate = data.date;
            if (displayDate) {
                const d = new Date(displayDate);
                if (!isNaN(d.getTime())) {
                    const day = String(d.getDate()).padStart(2, '0');
                    const monthStr = String(d.getMonth() + 1).padStart(2, '0');
                    const year = d.getFullYear();
                    displayDate = `${day}/${monthStr}/${year}`;
                }
            }
            setDate(displayDate);
            setMonth(data.month);

        } catch (error) {
            console.log("error in getting tasks", error);
        } finally {
            setLoading(false);
        }
    }

    const handleAddTaskRow = () => {
        const newTask: Task = {
            task: "",
            status: "pending",
        };
        setTasks([...tasks, newTask]);
    };

    const handleTaskChange = (index: number, field: keyof Task, value: string) => {
        const updatedTasks = [...tasks];
        updatedTasks[index] = { ...updatedTasks[index], [field]: value } as Task;
        setTasks(updatedTasks);
    };

    const handleFileChange = async (index: number, field: "firstImage" | "secondImage", e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            //for image compression
            //console.log('originalFile instanceof Blob', file instanceof Blob); // true
            //console.log(`originalFile size ${file.size / 1024 / 1024} MB`);

            //compress image
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            }

            const compressedFile = await imageCompression(file, options);
            //console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
            //console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`);

            //End of cmpression code----------- 

            const updatedTasks = [...tasks];
            updatedTasks[index] = {
                ...updatedTasks[index],
                [`${field}Url`]: objectUrl,
                [`${field}File`]: compressedFile
            } as Task;
            setTasks(updatedTasks);
        }
    };

    const handleSubmitRow = async (index: number) => {
        const taskToSubmit = tasks[index];
        console.log("Submitting task:", taskToSubmit);

        const formData = new FormData();

        const taskData = { ...taskToSubmit };
        delete taskData.firstImageFile;
        delete taskData.secondImageFile;
        taskData.submittedAt = new Date().toISOString();

        formData.append("taskData", JSON.stringify(taskData));

        if (taskToSubmit.firstImageFile) {
            formData.append("firstImage", taskToSubmit.firstImageFile);
        }
        if (taskToSubmit.secondImageFile) {
            formData.append("secondImage", taskToSubmit.secondImageFile);
        }

        try {
            const response = await axios.post("/api/manager/update-task", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                params: {
                    dayId: dayId
                }
            });
            console.log("Response:", response.data);

            const updatedTasks = [...tasks];
            updatedTasks[index].submittedAt = taskData.submittedAt;
            setTasks(updatedTasks);

            alert(`Task submitted successfully!`);
        } catch (error) {
            console.error("Error submitting task:", error);
            alert("Failed to submit task.");
        }
    };

    return (
        <>
        {loading && <AnimatedLoader />}
        <div className={`min-h-screen bg-slate-50 p-4 md:p-6 font-sans text-slate-800 ${loading ? 'blur-sm pointer-events-none' : ''}`}>
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-100 gap-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                            Megha Caterers
                        </h1>
                        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mt-1">
                            Manager Task Dashboard
                        </h2>
                        <p className="text-slate-500 mt-2 text-sm font-medium">
                            {date && month ? `${date} • ${month}` : "Loading date..."}
                        </p>
                    </div>

                    <button
                        onClick={handleAddTaskRow}
                        className="w-full md:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md shadow-indigo-200 active:scale-95"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Task
                    </button>
                </div>

                {/* Task List (Mobile First Cards) */}
                <div className="space-y-4">
                    {!loading && tasks.length === 0 ? (
                        <div className="bg-white p-8 rounded-2xl text-center shadow-sm border border-slate-100 text-slate-400 font-medium">
                            No tasks found for this date.
                        </div>
                    ) : (
                        tasks.map((task, idx) => (
                            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex flex-col gap-4 transition-all hover:shadow-md md:flex-row md:items-center">
                                {/* Desktop Serial Number */}
                                <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold text-sm shrink-0">
                                    {idx + 1}
                                </div>

                                {/* Mobile Header (S.No + Status) */}
                                <div className="flex md:hidden justify-between items-center border-b border-slate-100 pb-3">
                                    <span className="font-bold text-slate-700 text-sm">Task #{idx + 1}</span>
                                    <div className="relative w-32">
                                        <select
                                            value={task.status}
                                            onChange={(e) => handleTaskChange(idx, "status", e.target.value as Task["status"])}
                                            className={`w-full appearance-none pl-3 pr-8 py-1.5 rounded-lg text-xs font-semibold border focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all cursor-pointer shadow-sm
                                                ${task.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                    task.status === 'done' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                                        'bg-rose-50 text-rose-700 border-rose-200'}
                                            `}
                                        >
                                            <option value="pending">⏳ Pending</option>
                                            <option value="done">✅ Done</option>
                                            <option value="raise">🚨 Raise</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Task Input */}
                                <div className="flex-grow">
                                    <label className="md:hidden block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Description</label>
                                    <input
                                        type="text"
                                        placeholder="Enter task description..."
                                        value={task.task}
                                        onChange={(e) => handleTaskChange(idx, "task", e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                                    />
                                </div>

                                {/* Evidence Images */}
                                <div className="flex gap-3 md:w-auto shrink-0">
                                    <div className="w-1/2 md:w-auto">
                                        <label className="md:hidden block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Image 1</label>
                                        <div className="relative group/img">
                                            <input
                                                type="file"
                                                id={`file1-${idx}`}
                                                accept="image/*"
                                                className="hidden"
                                                capture="environment"
                                                onChange={(e) => handleFileChange(idx, "firstImage", e)}
                                            />
                                            <label
                                                htmlFor={`file1-${idx}`}
                                                title="Upload First Evidence Image"
                                                className={`flex items-center justify-center w-full md:w-14 h-14 rounded-xl border-2 border-dashed cursor-pointer transition-all overflow-hidden ${task.firstImageUrl ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'}`}
                                            >
                                                {task.firstImageUrl ? (
                                                    <img src={task.firstImageUrl} alt="Evidence 1" className="w-full h-full object-cover" />
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="w-1/2 md:w-auto">
                                        <label className="md:hidden block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Image 2</label>
                                        <div className="relative group/img">
                                            <input
                                                type="file"
                                                id={`file2-${idx}`}
                                                accept="image/*"
                                                className="hidden"
                                                capture="environment"
                                                onChange={(e) => handleFileChange(idx, "secondImage", e)}
                                            />
                                            <label
                                                htmlFor={`file2-${idx}`}
                                                title="Upload Second Evidence Image"
                                                className={`flex items-center justify-center w-full md:w-14 h-14 rounded-xl border-2 border-dashed cursor-pointer transition-all overflow-hidden ${task.secondImageUrl ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'}`}
                                            >
                                                {task.secondImageUrl ? (
                                                    <img src={task.secondImageUrl} alt="Evidence 2" className="w-full h-full object-cover" />
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Desktop Status (hidden on mobile) */}
                                <div className="hidden md:block w-40 shrink-0">
                                    <div className="relative">
                                        <select
                                            value={task.status}
                                            onChange={(e) => handleTaskChange(idx, "status", e.target.value as Task["status"])}
                                            className={`w-full appearance-none pl-4 pr-8 py-3 rounded-xl text-sm font-semibold border focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all cursor-pointer shadow-sm
                                                ${task.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                    task.status === 'done' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                                        'bg-rose-50 text-rose-700 border-rose-200'}
                                            `}
                                        >
                                            <option value="pending">⏳ Pending</option>
                                            <option value="done">✅ Done</option>
                                            <option value="raise">🚨 Raise</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <div className="mt-2 md:mt-0 md:w-32 shrink-0 flex flex-col items-center">
                                    <button
                                        onClick={() => handleSubmitRow(idx)}
                                        className="w-full inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white px-4 py-3 rounded-xl text-sm font-medium transition-all shadow-sm active:scale-95 gap-2"
                                    >
                                        <span>Submit</span>
                                    </button>
                                    {task.submittedAt && (
                                        <div className="text-[10px] text-slate-400 mt-2 font-medium text-center">
                                            Submitted: {new Date(task.submittedAt).toLocaleTimeString()}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
        </>
    );
}