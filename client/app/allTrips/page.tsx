"use client"
import axios from "axios";
import { useEffect, useState } from "react";

type Trip = {
    _id?: string;
    id?: string;
    tripName?: string;
    tripDate?: string;
};

export default function page() {
    const [trips, setTrips] = useState<Trip[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/getAllTrips");
            console.log(response.data);
            setTrips(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleTripClick = (id: string) => {
        console.log("Trip clicked:", id);
        // TODO: replace this with navigation or other action as needed
    };

    const formatDate = (value?: string) => {
        if (!value) return "Unknown date";
        const date = new Date(value);
        if (isNaN(date.getTime())) return value;
        return date.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-7xl">
                <h1 className="mb-6 text-3xl font-semibold text-slate-900">All Trips</h1>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {trips.length > 0 ? (
                        trips.map((trip) => {
                            const id = trip._id ?? trip.id ?? "";
                            return (
                                <button
                                    key={id || Math.random().toString()}
                                    type="button"
                                    onClick={() => handleTripClick(id)}
                                    className="group w-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:border-slate-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                                >
                                    <div className="mb-4 flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-lg font-semibold text-slate-900">{trip.tripName
                                                ?? "Unnamed Trip"}</p>
                                            <p className="mt-2 text-sm text-slate-500">{formatDate(trip.tripDate)}</p>
                                        </div>
                                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-slate-600">
                                            View
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-500 transition-colors duration-200 group-hover:text-slate-700">
                                        Click to open trip details.
                                    </p>
                                </button>
                            );
                        })
                    ) : (
                        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">
                            No trips available yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
