import TripModel from "@/models/trip.model";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Utility to create unique string IDs
const generateId = () => crypto.randomUUID();

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        
        // Hardcoded document ID
        const id = "6abf2c5cd988af9487f5f4ca";

        const newGroupsArray = [
            {
                groupId: generateId(),
                date: "07 October 2026",
                tasks: [
                  { id: generateId(), name: "Wake Up Call", description: "Wake students up for the early morning trek.", time: "03:00 AM" },
                  { id: generateId(), name: "Tungnath Trek Briefing", description: "Brief students about the Tungnath trek, safety and group discipline.", time: "03:40 AM" },
                  { id: generateId(), name: "Tungnath Trek Headcount", description: "Complete headcount before starting the trek.", time: "03:50 AM" },
                  { id: generateId(), name: "Trek to Tungnath Temple", description: "Start the trek to Tungnath Temple.", time: "04:00 AM" },
                  { id: generateId(), name: "Tungnath Temple Darshan Briefing", description: "Brief students about darshan and group discipline at the temple.", time: "Morning" },
                  { id: generateId(), name: "Tungnath Temple Headcount", description: "Complete headcount after reaching the top.", time: "Morning" },
                  { id: generateId(), name: "Tungnath Temple Darshan", description: "Reach the top and complete darshan at Tungnath Temple.", time: "Morning" },
                  { id: generateId(), name: "Packed Breakfast Coordination", description: "Coordinate packed breakfast at the top.", time: "Morning" },
                  { id: generateId(), name: "Teacher Welfare Check", description: "Check on teachers after breakfast.", time: "After Breakfast" },
                  { id: generateId(), name: "Chandrashila Trek Briefing", description: "Brief students about the difficult hike to Chandrashila Peak.", time: "08:45 AM" },
                  { id: generateId(), name: "Chandrashila Trek Headcount", description: "Complete headcount before starting the Chandrashila hike.", time: "08:50 AM" },
                  { id: generateId(), name: "Chandrashila Peak Trek", description: "Start the difficult hike towards Chandrashila Peak.", time: "09:00 AM" },
                  { id: generateId(), name: "Return Headcount", description: "Complete headcount before returning towards the camps.", time: "02:00 PM" },
                  { id: generateId(), name: "Return to Camps", description: "Return to the camps at Chopta.", time: "02:00 PM" },
                  { id: generateId(), name: "Hot Lunch Coordination", description: "Coordinate hot lunch at the camp.", time: "02:30 PM" },
                  { id: generateId(), name: "Teacher Welfare Check", description: "Check on teachers after lunch.", time: "After Lunch" },
                  { id: generateId(), name: "Evening Strolling Briefing", description: "Brief students about the evening stroll around Tungnath and safety.", time: "04:20 PM" },
                  { id: generateId(), name: "Evening Strolling Headcount", description: "Complete headcount before the evening stroll.", time: "04:25 PM" },
                  { id: generateId(), name: "Evening Strolling", description: "Enjoy an evening stroll around Tungnath with refreshments.", time: "04:30 PM" },
                  { id: generateId(), name: "Dinner Coordination", description: "Coordinate dinner at the camp/hotel.", time: "07:30 PM" },
                  { id: generateId(), name: "Teacher Welfare Check", description: "Check on teachers after dinner.", time: "After Dinner" },
                  { id: generateId(), name: "Overnight Stay", description: "Overnight stay at the camp/hotel.", time: "09:30 PM" },
                  { id: generateId(), name: "Night Discipline Check", description: "Check student discipline and room occupancy.", time: "Night" }
                ]
            },
            {
                groupId: generateId(),
                date: "08 October 2026",
                tasks: [
                  { id: generateId(), name: "Early Breakfast Coordination", description: "Coordinate early breakfast at the camp/hotel.", time: "07:00 AM" },
                  { id: generateId(), name: "Teacher Welfare Check", description: "Check on teachers after breakfast.", time: "After Breakfast" },
                  { id: generateId(), name: "Rishikesh Transfer Briefing", description: "Brief students about the journey to Rishikesh and travel discipline.", time: "07:40 AM" },
                  { id: generateId(), name: "Rishikesh Transfer Headcount", description: "Complete headcount before departure.", time: "07:50 AM" },
                  { id: generateId(), name: "Move to Rishikesh", description: "Depart for Rishikesh.", time: "08:00 AM" },
                  { id: generateId(), name: "Rishikesh Arrival & Hotel Check-in", description: "Arrive in Rishikesh and complete hotel check-in on quad sharing.", time: "02:00 PM" },
                  { id: generateId(), name: "Lunch Coordination", description: "Coordinate lunch on arrival.", time: "02:30 PM" },
                  { id: generateId(), name: "Teacher Welfare Check", description: "Check on teachers after lunch.", time: "After Lunch" },
                  { id: generateId(), name: "Rest", description: "Allow students to rest at the hotel.", time: "04:00 PM" },
                  { id: generateId(), name: "Ganga Aarti Preparation", description: "Get students ready and brief them for Ganga Aarti.", time: "05:00 PM" },
                  { id: generateId(), name: "Ganga Aarti Briefing", description: "Brief students about Ganga Aarti, crowd discipline and safety.", time: "05:20 PM" },
                  { id: generateId(), name: "Ganga Aarti Headcount", description: "Complete headcount before proceeding for Ganga Aarti.", time: "05:25 PM" },
                  { id: generateId(), name: "Ganga Aarti at Rishikesh", description: "Attend Ganga Aarti at Rishikesh.", time: "05:30 PM" },
                  { id: generateId(), name: "River Rafting Briefing", description: "Brief participants about the optional river rafting activity and safety.", time: "06:20 PM" },
                  { id: generateId(), name: "River Rafting Headcount", description: "Complete headcount of students participating in optional rafting.", time: "06:25 PM" },
                  { id: generateId(), name: "River Rafting", description: "Optional river rafting activity.", time: "06:30 PM" },
                  { id: generateId(), name: "Dinner Coordination", description: "Coordinate dinner at the hotel.", time: "08:00 PM" },
                  { id: generateId(), name: "Teacher Welfare Check", description: "Check on teachers after dinner.", time: "After Dinner" },
                  { id: generateId(), name: "Overnight Stay", description: "Overnight stay at the hotel.", time: "09:30 PM" },
                  { id: generateId(), name: "Night Discipline Check", description: "Check student discipline and room occupancy.", time: "Night" }
                ]
            },
            {
                groupId: generateId(),
                date: "09 October 2026",
                tasks: [
                  { id: generateId(), name: "Morning Breakfast Coordination", description: "Coordinate breakfast at the hotel.", time: "07:00 AM" },
                  { id: generateId(), name: "Teacher Welfare Check", description: "Check on teachers after breakfast.", time: "After Breakfast" },
                  { id: generateId(), name: "Hotel Check-out", description: "Complete hotel check-out and luggage coordination.", time: "07:00 AM" },
                  { id: generateId(), name: "Haridwar Transfer Briefing", description: "Brief students about the transfer to Haridwar and Har Ki Pauri visit.", time: "07:40 AM" },
                  { id: generateId(), name: "Haridwar Transfer Headcount", description: "Complete headcount before leaving Rishikesh.", time: "07:50 AM" },
                  { id: generateId(), name: "Move to Haridwar", description: "Travel to Haridwar for Har Ki Pauri Darshan.", time: "08:00 AM" },
                  { id: generateId(), name: "Har Ki Pauri Darshan Briefing", description: "Brief students about Har Ki Pauri, crowd discipline and safety.", time: "Morning" },
                  { id: generateId(), name: "Har Ki Pauri Headcount", description: "Complete headcount before darshan.", time: "Morning" },
                  { id: generateId(), name: "Har Ki Pauri Darshan", description: "Visit Har Ki Pauri in Haridwar.", time: "Morning" },
                  { id: generateId(), name: "Lunch Coordination", description: "Coordinate lunch.", time: "11:30 AM" },
                  { id: generateId(), name: "Teacher Welfare Check", description: "Check on teachers after lunch.", time: "After Lunch" },
                  { id: generateId(), name: "Move to Delhi", description: "Depart Haridwar and proceed towards Delhi.", time: "01:00 PM" },
                  { id: generateId(), name: "Journey Monitoring", description: "Monitor students, luggage and group movement during the journey to Delhi.", time: "Afternoon" },
                  { id: generateId(), name: "Dinner Coordination", description: "Coordinate dinner on the way.", time: "07:00 PM" },
                  { id: generateId(), name: "Teacher Welfare Check", description: "Check on teachers after dinner.", time: "After Dinner" },
                  { id: generateId(), name: "Railway Station Briefing", description: "Brief students about boarding Dakshin Express at Hazrat Nizamuddin Station.", time: "10:30 PM" },
                  { id: generateId(), name: "Final Train Headcount", description: "Complete final headcount before boarding the train.", time: "10:40 PM" },
                  { id: generateId(), name: "Board Dakshin Express", description: "Board Train No. 12722 at Hazrat Nizamuddin Station.", time: "10:50 PM" },
                  { id: generateId(), name: "Night Discipline Check", description: "Check student discipline and safety during the overnight train journey.", time: "Night" }
                ]
            },
            {
                groupId: generateId(),
                date: "10 October 2026",
                tasks: [
                  { id: generateId(), name: "Arrival at Bhopal", description: "Arrive at Bhopal in the morning.", time: "Morning" },
                  { id: generateId(), name: "Breakfast in Train", description: "Coordinate breakfast in the train.", time: "Morning" },
                  { id: generateId(), name: "Teacher Welfare Check", description: "Check on teachers after breakfast.", time: "After Breakfast" },
                  { id: generateId(), name: "Bhopal Arrival Headcount", description: "Complete final headcount after arrival at Bhopal.", time: "Morning" },
                  { id: generateId(), name: "Luggage Check", description: "Ensure all student luggage and belongings are collected.", time: "Morning" },
                  { id: generateId(), name: "Bhopal to Ashta Transfer", description: "Travel from Bhopal to Ashta by local bus.", time: "Forenoon" },
                  { id: generateId(), name: "Final Student Handover", description: "Coordinate final student handover at Ashta.", time: "Forenoon" },
                  { id: generateId(), name: "Tour Closure", description: "Complete the tour closure with beautiful memories.", time: "Forenoon" }
                ]
            }
        ];

        const result = await TripModel.updateOne(
            { _id: id },
            { $push: { groups: { $each: newGroupsArray } } }
        );

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error", error: String(error) }, { status: 500 });
    }
}
