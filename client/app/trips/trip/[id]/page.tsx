"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import imageCompression from 'browser-image-compression';

interface Task {
    id?: string;
    _id?: string;
    sNo?: number;
    name: string;
    description: string;
    time: string;
    // status?: string;
    // remarks?: string;
    status?: boolean;
    evidence?: string | null;
    evidence2?: string | null;
    submittedAt?: string;
    userRemark?: string;
}

interface TaskGroup {
    _id: string;
    groupId: string;
    date: string;
    tasks: Task[];
}

export default function Page() {

    const newId = useParams();
    console.log("New id is-=-=-==-=-=-=-=-=-= ", newId.id);

    const [tripName, setTripName] = useState<string>("");
    const [tripId, setTripId] = useState<string>("");
    const [groups, setGroups] = useState<TaskGroup[]>([]);
    const [selectedGroupIndex, setSelectedGroupIndex] = useState<number>(0);
    const tasks = groups[selectedGroupIndex]?.tasks || [];
    const [firstImage, setFirstImage] = useState<File | null>(null);
    const [secondImage, setSecondImage] = useState<File | null>(null);

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const response = await axios.get(
                    `/api/get_trip/${newId.id}`);
                console.log("Response:-------", response.data);
                const thisTripId = response.data.trip._id;
                setTripId(thisTripId);
                console.log("Trip-----", response.data.trip.groups);
                setGroups(response.data.trip.groups);
                if (response.data.trip.groups && response.data.trip.groups.length > 0) {
                    setSelectedGroupIndex(0);
                }

            } catch (error) {
                console.error("Error fetching trip:", error);
            }
        };
        fetchTrip();
    }, []);

    const [submittingId, setSubmittingId] = useState<string | null>(null);

    const updateTask = (id: string, updates: Partial<Task>) => {
        setGroups((prev) => prev.map((group, idx) => {
            if (idx === selectedGroupIndex) {
                return {
                    ...group,
                    tasks: group.tasks.map((task) => (task.id === id || task._id === id ? { ...task, ...updates } : task))
                };
            }
            return group;
        }));
    };

    const handleFileUpload = async (id: string, e: React.ChangeEvent<HTMLInputElement>, imageIndex: number = 1) => {
        const file = e.target.files?.[0];
        console.log("filess", file);

        if (file) {
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
            if (imageIndex === 1) {
                updateTask(id, { evidence: file.name });
                setFirstImage(compressedFile)
            } else {
                updateTask(id, { evidence2: file.name });
                setSecondImage(compressedFile)
            }
        }
    };

    const handleSubmit = async (task: Task) => {
        console.log("Got hitted ihihihihihih");

        const taskId = task.id || task._id || '';
        setSubmittingId(taskId);
        const now = new Date().toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });

        const taskData = { ...task, submittedAt: now };
        //console.log("Submitting Task Data:", taskData);

        const formData = new FormData();
        formData.append("taskData", JSON.stringify(taskData));
        formData.append("firstImage", firstImage!);
        formData.append("secondImage", secondImage!);

        console.log("Here is the formData", formData);


        try {
            const response = await axios.post(
                "/api/task-submission",
                formData,

                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    params: {
                        tripId: tripId
                    }
                }
            );
            console.log("Response:", response.data);
            updateTask(taskId, { submittedAt: now });
            alert(`Task "${task.name || "Untitled"}" submitted successfully at ${now}!`);
        } catch (error) {
            console.error("Submission error:", error);
            alert("Submission failed. Check console for details.");
        } finally {
            setSubmittingId(null);
        }
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption: number = Number(e.target.value);
        if (selectedOption !== -1) {
            setSelectedGroupIndex(selectedOption);
        }
    };

    return (
        <div className="min-h-screen bg-[#fafafa] text-zinc-900 p-4 md:p-12 font-sans selection:bg-indigo-100 selection:text-indigo-900">
            <main className="max-w-7xl mx-auto">
                {/* Header Section */}
                <header className="mb-14 text-center">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-white border border-zinc-200 text-zinc-600 text-xs font-semibold mb-6 shadow-sm tracking-wide">
                        Operations Dashboard
                    </div>
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 mb-4">
                        Trip Tasks
                    </h1>
                    <p className="max-w-xl mx-auto text-zinc-500 text-base">
                        Complete your assigned tasks, upload evidence, and submit for verification.
                    </p>
                </header>

                <div className="mb-6 flex justify-end">
                    <select
                        className="border border-zinc-200 rounded-xl h-10 px-4 text-sm font-medium text-zinc-700 outline-none focus:border-indigo-500 bg-white shadow-sm"
                        onChange={handleSelectChange}
                        value={selectedGroupIndex}
                    >
                        {groups.length === 0 && <option value="-1">Loading dates...</option>}
                        {groups.map((group, idx) => (
                            <option key={group.groupId || idx} value={idx}>
                                {new Date(group.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                            </option>
                        ))}
                    </select>
                </div>



                {/* Panel Container */}
                <div className="bg-white rounded-3xl border border-zinc-200 shadow-xl shadow-zinc-200/40 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-zinc-50 border-b border-zinc-200 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                                    <th className="sticky left-0 z-20 bg-zinc-50 px-6 py-5 whitespace-nowrap min-w-[80px]">S.No.</th>
                                    <th className=" left-[80px] z-20 bg-zinc-50 px-6 py-5 whitespace-nowrap min-w-[180px] shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">Task Name</th>
                                    <th className="px-6 py-5 whitespace-nowrap min-w-[200px]">Description</th>
                                    <th className="px-6 py-5 whitespace-nowrap text-center">Status</th>
                                    <th className="px-6 py-5 whitespace-nowrap text-center">Time</th>
                                    <th className="px-6 py-5 whitespace-nowrap min-w-[150px]">Remarks</th>
                                    <th className="px-6 py-5 whitespace-nowrap text-center">Evidence</th>
                                    <th className="px-6 py-5 whitespace-nowrap text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100 text-sm">
                                {tasks.map((task, idx) => {
                                    const taskId = task.id || task._id || `task-${idx}`;
                                    return (
                                        <tr key={taskId} className="hover:bg-zinc-50 transition-colors group">
                                            <td className="sticky left-0 z-10 bg-white group-hover:bg-zinc-50 px-6 py-4 text-zinc-400 font-medium min-w-[80px]">
                                                #{task.sNo || idx + 1}
                                            </td>

                                            <td className="left-[80px] z-10 bg-white group-hover:bg-zinc-50 px-6 py-4 min-w-[180px] shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                                                <span className="font-medium text-zinc-800">{task.name}</span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="text-zinc-500 text-sm block max-w-[250px] truncate" title={task.description}>
                                                    {task.description}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-center">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only peer"
                                                        checked={task.status === true}
                                                        onChange={(e) => updateTask(taskId, { status: e.target.checked })}
                                                    />
                                                    <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                                                </label>
                                            </td>

                                            <td className="px-6 py-4 text-center">
                                                <span className="text-zinc-600 font-medium">{task.time}</span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <textarea
                                                    rows={1}
                                                    value={task.userRemark || ''}
                                                    onChange={(e) => updateTask(taskId, { userRemark: e.target.value })}
                                                    placeholder="Add remarks..."
                                                    className="w-full bg-transparent text-zinc-800 placeholder:text-zinc-400 outline-none resize-none overflow-hidden focus:text-indigo-600 transition-colors py-1 border-b border-transparent focus:border-indigo-200"
                                                />
                                            </td>

                                            <td className="px-6 py-4 text-center">
                                                <div className="flex justify-center items-center gap-2">
                                                    <label className="cursor-pointer group flex flex-col items-center gap-1">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            capture="environment"
                                                            onChange={(e) => handleFileUpload(taskId, e, 1)}
                                                            className="hidden"
                                                        />
                                                        {task.evidence ? (
                                                            <div className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-medium flex items-center gap-2 border border-indigo-100 hover:bg-indigo-100 transition-colors" title={task.evidence}>
                                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                                <span className="max-w-[60px] truncate">{task.evidence}</span>
                                                            </div>
                                                        ) : (
                                                            <div className="p-2 text-zinc-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-xl transition-all border border-transparent hover:border-indigo-100">
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                                            </div>
                                                        )}
                                                    </label>
                                                    <label className="cursor-pointer group flex flex-col items-center gap-1">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            capture="environment"
                                                            onChange={(e) => handleFileUpload(taskId, e, 2)}
                                                            className="hidden"
                                                        />
                                                        {task.evidence2 ? (
                                                            <div className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-medium flex items-center gap-2 border border-indigo-100 hover:bg-indigo-100 transition-colors" title={task.evidence2}>
                                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                                <span className="max-w-[60px] truncate">{task.evidence2}</span>
                                                            </div>
                                                        ) : (
                                                            <div className="p-2 text-zinc-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-xl transition-all border border-transparent hover:border-indigo-100">
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                                            </div>
                                                        )}
                                                    </label>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleSubmit(task)}
                                                    //disabled={submittingId !== null || task.submittedAt !== undefined}
                                                    className={`relative px-4 py-2 rounded-xl font-semibold text-xs transition-all ${task.submittedAt
                                                        ? "bg-zinc-100 text-zinc-400 cursor-not-allowed border border-zinc-200"
                                                        : submittingId === taskId
                                                            ? "bg-indigo-100 text-indigo-400 cursor-not-allowed"
                                                            : "bg-zinc-900 hover:bg-indigo-600 text-white shadow-md shadow-zinc-200 hover:shadow-indigo-200 active:scale-95"
                                                        }`}
                                                >
                                                    {task.submittedAt ? "Submitted" : submittingId === taskId ? "Submitting..." : "Submit"}
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer */}
                    <div className="bg-zinc-50 border-t border-zinc-200 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* <button
                            onClick={addNewRow}
                            className="flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-indigo-600 transition-colors px-4 py-2 rounded-xl hover:bg-indigo-50"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                            Add Task Record
                        </button> */}

                        <div className="flex items-center gap-4 text-sm font-medium text-zinc-500">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                                <span>{tasks.filter(t => t.status === true).length} of {tasks.length} Completed</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
