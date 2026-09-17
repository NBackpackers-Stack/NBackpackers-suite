// sampleData.ts
// contains predefined trip templates that can be loaded into the form

// simple id generator copied from page.tsx; not exported elsewhere
const generateId = () => Math.random().toString(36).substr(2, 9);

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

export interface TripTemplate {
    tripName: string;
    tripDate: string;
    tripDiscussion: string;
    groups: DateGroup[];
}

export const templatesById: Record<string, TripTemplate> = {
    goa: {
        tripName: "Goa getaway",
        tripDate: "2026-03-13",
        tripDiscussion: "This is a two-day sample trip to Goa.",groups: [
  {
    groupId: generateId(),
    date: "DAY 01 – DEPARTURE FROM BHOPAL",
    tasks: [
      {
        id: generateId(),
        name: "Coordinator Reporting & Setup",
        description: "Report at Rani Kamlapati (Bhopal) Junction and prepare attendance and travel arrangements",
        time: "18:00"
      },
      {
        id: generateId(),
        name: "Student Reporting & Attendance",
        description: "Verify student reporting and complete the initial headcount",
        time: "18:00"
      },
      {
        id: generateId(),
        name: "Counting, Grouping & Briefing",
        description: "Group students and brief them about safety, discipline and train journey instructions",
        time: "18:30"
      },
      {
        id: generateId(),
        name: "Train Details Verification",
        description: "Verify train number, coach details and student seating arrangements",
        time: "18:30"
      },
      {
        id: generateId(),
        name: "Final Headcount",
        description: "Complete final student and staff headcount before boarding",
        time: "19:30"
      },
      {
        id: generateId(),
        name: "Train Boarding Coordination",
        description: "Coordinate boarding on Train No. 11464 – Somnath Express and ensure students are seated properly",
        time: "19:45"
      },
      {
        id: generateId(),
        name: "Dinner Coordination",
        description: "Ensure students have dinner brought from home and manage dinner during the train journey",
        time: "20:30"
      },
      {
        id: generateId(),
        name: "Teacher Welfare Check",
        description: "Check teacher dinner arrangements and requirements",
        time: "20:50"
      },
      {
        id: generateId(),
        name: "Night Discipline Check",
        description: "Check student wellbeing and ensure discipline during the overnight train journey",
        time: "22:00"
      },
      {
        id: generateId(),
        name: "Overnight Journey Monitoring",
        description: "Maintain student safety and discipline throughout the overnight train journey",
        time: "23:00"
      }
    ]
  },

  {
    groupId: generateId(),
    date: "DAY 02 – ARRIVAL AT VERAVAL & SOMNATH",
    tasks: [
      {
        id: generateId(),
        name: "Arrival at Veraval Railway Station",
        description: "Coordinate safe deboarding and verify complete student headcount",
        time: "17:25"
      },
      {
        id: generateId(),
        name: "Luggage Collection",
        description: "Ensure all student luggage is collected from the train",
        time: "17:30"
      },
      {
        id: generateId(),
        name: "Bus Boarding Coordination",
        description: "Coordinate boarding into AC bus for transfer towards Somnath",
        time: "17:45"
      },
      {
        id: generateId(),
        name: "Transfer to Somnath",
        description: "Monitor safe transfer from Veraval to Somnath",
        time: "17:45"
      },
      {
        id: generateId(),
        name: "Hotel Check-In",
        description: "Coordinate hotel check-in and assign quad-sharing rooms",
        time: "18:00"
      },
      {
        id: generateId(),
        name: "Room Allotment",
        description: "Distribute rooms according to the approved rooming list",
        time: "18:00"
      },
      {
        id: generateId(),
        name: "Freshen-Up Coordination",
        description: "Ensure students settle into rooms and freshen up before the temple visit",
        time: "18:10"
      },
      {
        id: generateId(),
        name: "Somnath Temple Briefing",
        description: "Give temple visit, safety and discipline instructions",
        time: "18:20"
      },
      {
        id: generateId(),
        name: "Somnath Temple Headcount",
        description: "Verify all students and staff before entering the temple",
        time: "18:25"
      },
      {
        id: generateId(),
        name: "Somnath Temple – Jyotirlinga Darshan",
        description: "Coordinate spiritual experience and temple visit while maintaining group discipline",
        time: "18:30"
      },
      {
        id: generateId(),
        name: "Dinner Coordination",
        description: "Coordinate dinner service at the hotel",
        time: "20:30"
      },
      {
        id: generateId(),
        name: "Teacher Welfare Check",
        description: "Check teacher dinner arrangements and requirements",
        time: "20:50"
      },
      {
        id: generateId(),
        name: "Night Discipline Check",
        description: "Check rooms, student wellbeing and ensure proper night discipline",
        time: "22:00"
      }
    ]
  },

  {
    groupId: generateId(),
    date: "DAY 03 – SOMNATH TO SASAN GIR & SAFARI",
    tasks: [
      {
        id: generateId(),
        name: "Wake-Up Coordination",
        description: "Wake students and ensure readiness for the day's transfer",
        time: "07:00"
      },
      {
        id: generateId(),
        name: "Breakfast Coordination",
        description: "Coordinate breakfast service at the hotel",
        time: "07:30"
      },
      {
        id: generateId(),
        name: "Teacher Welfare Check",
        description: "Check teacher breakfast arrangements and requirements",
        time: "07:50"
      },
      {
        id: generateId(),
        name: "Hotel Checkout",
        description: "Coordinate room clearance and hotel checkout",
        time: "09:00"
      },
      {
        id: generateId(),
        name: "Luggage Loading",
        description: "Supervise luggage collection and loading before departure",
        time: "09:15"
      },
      {
        id: generateId(),
        name: "Sasan Gir Transfer Briefing",
        description: "Give transfer, safety and group movement instructions",
        time: "09:20"
      },
      {
        id: generateId(),
        name: "Sasan Gir Transfer Headcount",
        description: "Verify students and staff before departure",
        time: "09:25"
      },
      {
        id: generateId(),
        name: "Drive to Sasan Gir",
        description: "Coordinate vehicle transfer from Somnath to Sasan Gir",
        time: "09:30"
      },
      {
        id: generateId(),
        name: "Sasan Gir Arrival Coordination",
        description: "Coordinate arrival, luggage unloading and movement into the hotel",
        time: "11:00"
      },
      {
        id: generateId(),
        name: "Hotel Check-In & Room Allotment",
        description: "Assign quad-sharing rooms and coordinate freshening up",
        time: "11:00"
      },
      {
        id: generateId(),
        name: "Lunch Coordination",
        description: "Coordinate lunch service at the hotel",
        time: "12:30"
      },
      {
        id: generateId(),
        name: "Teacher Welfare Check",
        description: "Check teacher lunch arrangements and requirements",
        time: "12:50"
      },
      {
        id: generateId(),
        name: "Swimming Pool Safety Briefing",
        description: "Give swimming pool safety and discipline instructions",
        time: "14:20"
      },
      {
        id: generateId(),
        name: "Swimming Pool Headcount",
        description: "Verify students before entering the pool area",
        time: "14:25"
      },
      {
        id: generateId(),
        name: "Swimming Pool Leisure Time",
        description: "Supervise students during leisure time at the swimming pool",
        time: "14:30"
      },
      {
        id: generateId(),
        name: "Safari Safety Briefing",
        description: "Give safari safety, wildlife and group discipline instructions",
        time: "16:15"
      },
      {
        id: generateId(),
        name: "Safari Headcount",
        description: "Verify students before boarding safari vehicles",
        time: "16:20"
      },
      {
        id: generateId(),
        name: "Devaliya Safari Park Visit",
        description: "Coordinate safari in Jeep 6-seaters and supervise students during the wildlife experience",
        time: "16:30"
      },
      {
        id: generateId(),
        name: "Return to Hotel",
        description: "Coordinate return from safari and verify complete headcount",
        time: "19:00"
      },
      {
        id: generateId(),
        name: "Cultural Show / High Tea Briefing",
        description: "Give instructions for the cultural show and maintain group discipline",
        time: "19:50"
      },
      {
        id: generateId(),
        name: "Cultural Show / High Tea Headcount",
        description: "Verify students before the cultural show / high tea session",
        time: "19:55"
      },
      {
        id: generateId(),
        name: "Cultural Show / High Tea Session",
        description: "Coordinate cultural show and high tea session",
        time: "20:00"
      },
      {
        id: generateId(),
        name: "Dinner Coordination",
        description: "Coordinate dinner service at the hotel",
        time: "21:30"
      },
      {
        id: generateId(),
        name: "Teacher Welfare Check",
        description: "Check teacher dinner arrangements and requirements",
        time: "21:50"
      },
      {
        id: generateId(),
        name: "Night Discipline Check",
        description: "Check rooms, student wellbeing and ensure night discipline",
        time: "22:30"
      }
    ]
  },

  {
    groupId: generateId(),
    date: "DAY 04 – DIU DAY TOUR",
    tasks: [
      {
        id: generateId(),
        name: "Wake-Up Coordination",
        description: "Wake students and ensure readiness for the Diu day tour",
        time: "06:30"
      },
      {
        id: generateId(),
        name: "Breakfast Coordination",
        description: "Coordinate breakfast at the hotel",
        time: "07:00"
      },
      {
        id: generateId(),
        name: "Teacher Welfare Check",
        description: "Check teacher breakfast arrangements and requirements",
        time: "07:20"
      },
      {
        id: generateId(),
        name: "Team Building Briefing",
        description: "Explain team building activity rules, safety instructions and discipline",
        time: "08:45"
      },
      {
        id: generateId(),
        name: "Team Building Headcount",
        description: "Verify students before starting the activities",
        time: "08:50"
      },
      {
        id: generateId(),
        name: "Team Building Activities",
        description: "Coordinate team building activities including treasure hunt",
        time: "09:00"
      },
      {
        id: generateId(),
        name: "Diu Transfer Briefing",
        description: "Give transfer, safety and group movement instructions before leaving for Diu",
        time: "09:45"
      },
      {
        id: generateId(),
        name: "Diu Transfer Headcount",
        description: "Verify all students and staff before departure",
        time: "09:50"
      },
      {
        id: generateId(),
        name: "Drive to Diu",
        description: "Coordinate vehicle transfer to Diu",
        time: "10:00"
      },
      {
        id: generateId(),
        name: "Diu Fort & INS Khukri Memorial Briefing",
        description: "Give site safety, historical visit and group movement instructions",
        time: "11:50"
      },
      {
        id: generateId(),
        name: "Diu Fort & INS Khukri Memorial Headcount",
        description: "Verify students before entering the sightseeing area",
        time: "11:55"
      },
      {
        id: generateId(),
        name: "Diu Fort & INS Khukri Memorial Visit",
        description: "Coordinate sightseeing and supervise student movement",
        time: "12:00"
      },
      {
        id: generateId(),
        name: "Nagoa Beach Safety Briefing",
        description: "Give beach safety, water safety and group discipline instructions",
        time: "15:45"
      },
      {
        id: generateId(),
        name: "Nagoa Beach Headcount",
        description: "Verify students before entering the beach area",
        time: "15:50"
      },
      {
        id: generateId(),
        name: "Nagoa Beach Visit",
        description: "Supervise students and maintain controlled group movement at the beach",
        time: "16:00"
      },
      {
        id: generateId(),
        name: "Return to Sasan Gir",
        description: "Coordinate return transfer and verify complete headcount",
        time: "16:30"
      },
      {
        id: generateId(),
        name: "DJ Night / Reflection Briefing",
        description: "Give event safety and discipline instructions",
        time: "19:20"
      },
      {
        id: generateId(),
        name: "DJ Night / Reflection Headcount",
        description: "Verify students before the evening session",
        time: "19:25"
      },
      {
        id: generateId(),
        name: "DJ Night / Reflection Session",
        description: "Coordinate evening DJ and reflection session while maintaining discipline",
        time: "19:30"
      },
      {
        id: generateId(),
        name: "Dinner Coordination",
        description: "Coordinate dinner service at the hotel",
        time: "20:30"
      },
      {
        id: generateId(),
        name: "Teacher Welfare Check",
        description: "Check teacher dinner arrangements and requirements",
        time: "20:50"
      },
      {
        id: generateId(),
        name: "Night Discipline Check",
        description: "Check rooms and ensure student wellbeing before overnight stay",
        time: "22:30"
      }
    ]
  },

  {
    groupId: generateId(),
    date: "DAY 05 – SASAN GIR TO JUNAGADH & RETURN JOURNEY",
    tasks: [
      {
        id: generateId(),
        name: "Wake-Up & Packing",
        description: "Wake students and ensure luggage is packed and rooms are cleared",
        time: "06:30"
      },
      {
        id: generateId(),
        name: "Breakfast Coordination",
        description: "Coordinate breakfast at the hotel",
        time: "07:00"
      },
      {
        id: generateId(),
        name: "Teacher Welfare Check",
        description: "Check teacher breakfast arrangements and requirements",
        time: "07:20"
      },
      {
        id: generateId(),
        name: "Hotel Checkout",
        description: "Coordinate room clearance, key collection and hotel checkout",
        time: "08:00"
      },
      {
        id: generateId(),
        name: "Luggage Loading",
        description: "Ensure all luggage is collected and loaded into vehicles",
        time: "08:15"
      },
      {
        id: generateId(),
        name: "Junagadh Transfer Briefing",
        description: "Give transfer and railway journey instructions",
        time: "08:30"
      },
      {
        id: generateId(),
        name: "Junagadh Transfer Headcount",
        description: "Verify students and staff before departure",
        time: "08:35"
      },
      {
        id: generateId(),
        name: "Drive to Junagadh Station",
        description: "Coordinate transfer to Junagadh Station",
        time: "08:40"
      },
      {
        id: generateId(),
        name: "Junagadh Station Arrival",
        description: "Coordinate arrival at Junagadh Station and prepare students for boarding",
        time: "10:20"
      },
      {
        id: generateId(),
        name: "Packed Lunch Coordination",
        description: "Distribute packed lunch provided by the hotel",
        time: "11:00"
      },
      {
        id: generateId(),
        name: "Teacher Welfare Check",
        description: "Check teacher lunch arrangements and requirements",
        time: "11:10"
      },
      {
        id: generateId(),
        name: "Train Boarding Briefing",
        description: "Give train safety, seating and discipline instructions",
        time: "11:15"
      },
      {
        id: generateId(),
        name: "Final Train Headcount",
        description: "Verify all students and staff before boarding the return train",
        time: "11:20"
      },
      {
        id: generateId(),
        name: "Train Boarding Coordination",
        description: "Coordinate boarding on Train No. 11463 – Somnath Express and verify seating",
        time: "11:23"
      },
      {
        id: generateId(),
        name: "Return Journey Monitoring",
        description: "Maintain student safety and discipline during the return train journey",
        time: "14:00"
      },
      {
        id: generateId(),
        name: "Dinner Coordination",
        description: "Coordinate dinner arrangements during the return journey",
        time: "20:00"
      },
      {
        id: generateId(),
        name: "Teacher Welfare Check",
        description: "Check teacher dinner arrangements and requirements",
        time: "20:20"
      },
      {
        id: generateId(),
        name: "Night Discipline Check",
        description: "Check student wellbeing and maintain discipline during the overnight journey",
        time: "22:00"
      }
    ]
  },

  {
    groupId: generateId(),
    date: "DAY 06 – ARRIVAL AT BHOPAL",
    tasks: [
      {
        id: generateId(),
        name: "Arrival Preparation",
        description: "Ensure students collect all personal belongings and prepare for deboarding",
        time: "06:30"
      },
      {
        id: generateId(),
        name: "Final Headcount",
        description: "Complete final student and staff headcount before deboarding",
        time: "06:45"
      },
      {
        id: generateId(),
        name: "Arrival at Rani Kamlapati",
        description: "Coordinate safe arrival and deboarding at Rani Kamlapati (Bhopal) Junction",
        time: "07:00"
      },
      {
        id: generateId(),
        name: "Luggage Check",
        description: "Ensure all student luggage and personal belongings have been collected",
        time: "07:10"
      },
      {
        id: generateId(),
        name: "Disembark & Check-Out",
        description: "Complete student disembarkation and final tour check-out",
        time: "07:30"
      },
      {
        id: generateId(),
        name: "Final Handover & Tour Closure",
        description: "Complete student handover and formally close the tour",
        time: "07:30"
      }
    ]
  }
]

    },
  jaipur: {
    tripName: "JIBHI - TIRTHAN VALLEY TRIP",
    tripDate: "9 MAY",
    tripDiscussion: "Jibhi - Tirthan Valley Trip - Operational Control Checklist. TO: Ankit. Monitoring: Central / Tour Manager.",
   groups: [
{
   groupId: generateId(),
   date: "DAY 00 – OVERNIGHT DEPARTURE TO MCLEOD GANJ",
   tasks: [

      {
         id: generateId(),
         name: "Coordinator Reporting & Setup",
         description: "Setup buses and attendance sheets",
         time: "19:00"
      },

      {
         id: generateId(),
         name: "Student Reporting & Attendance",
         description: "Mark attendance and headcount",
         time: "19:20"
      },

      {
         id: generateId(),
         name: "Final Briefing",
         description: "Give departure safety instructions",
         time: "19:40"
      },

      {
         id: generateId(),
         name: "Departure Headcount",
         description: "Verify students before departure",
         time: "19:50"
      },

      {
         id: generateId(),
         name: "Departure from School",
         description: "Verify seating and departure",
         time: "20:00"
      },

      {
         id: generateId(),
         name: "Dinner Halt Coordination",
         description: "Coordinate dinner halt discipline",
         time: "21:30"
      },

      {
         id: generateId(),
         name: "Dinner Enroute at Restaurant",
         description: "Coordinate dinner arrangements",
         time: "22:00"
      },

      {
         id: generateId(),
         name: "Teacher Welfare Check",
         description: "Check teacher dinner arrangements",
         time: "22:20"
      },

      {
         id: generateId(),
         name: "Overnight Journey Monitoring",
         description: "Maintain travel discipline",
         time: "23:00"
      }
   ]
},

{
   groupId: generateId(),
   date: "DAY 01 – ARRIVAL IN MCLEOD GANJ & LOCAL VISIT",
   tasks: [

      {
         id: generateId(),
         name: "Arrival in McLeod Ganj",
         description: "Coordinate arrival and luggage",
         time: "08:00"
      },

      {
         id: generateId(),
         name: "Transfer to Hotel",
         description: "Manage local vehicle transfers",
         time: "08:20"
      },

      {
         id: generateId(),
         name: "Breakfast Coordination",
         description: "Manage breakfast arrangements",
         time: "09:00"
      },

      {
         id: generateId(),
         name: "Teacher Welfare Check",
         description: "Check teacher breakfast arrangements",
         time: "09:20"
      },

      {
         id: generateId(),
         name: "Pre Check-In Management",
         description: "Manage students before check-in",
         time: "10:00"
      },

      {
         id: generateId(),
         name: "Hotel Check-In & Room Allotment",
         description: "Assign rooms to students",
         time: "12:00"
      },

      {
         id: generateId(),
         name: "Lunch Coordination",
         description: "Coordinate lunch arrangements",
         time: "13:00"
      },

      {
         id: generateId(),
         name: "Teacher Welfare Check",
         description: "Check teacher lunch arrangements",
         time: "13:20"
      },

      {
         id: generateId(),
         name: "Local Sightseeing Briefing",
         description: "Give sightseeing safety instructions",
         time: "14:30"
      },

      {
         id: generateId(),
         name: "Local Sightseeing Headcount",
         description: "Verify students before departure",
         time: "14:40"
      },

      {
         id: generateId(),
         name: "Naddi View Point & Meditation Session",
         description: "Coordinate sightseeing activities",
         time: "15:00"
      },

      {
         id: generateId(),
         name: "Sunset Point Visit Briefing",
         description: "Give sunset visit instructions",
         time: "18:00"
      },

      {
         id: generateId(),
         name: "Sunset Point Headcount",
         description: "Verify students before visit",
         time: "18:10"
      },

      {
         id: generateId(),
         name: "Sunset Point Visit Coordination",
         description: "Coordinate evening sightseeing",
         time: "18:20"
      },

      {
         id: generateId(),
         name: "Dinner Coordination",
         description: "Coordinate dinner arrangements",
         time: "20:00"
      },

      {
         id: generateId(),
         name: "Teacher Welfare Check",
         description: "Check teacher dinner arrangements",
         time: "20:20"
      },

      {
         id: generateId(),
         name: "Night Discipline Check",
         description: "Ensure room discipline maintained",
         time: "22:00"
      }
   ]
},

{
   groupId: generateId(),
   date: "DAY 02 – TRIUND TREK DAY",
   tasks: [

      {
         id: generateId(),
         name: "Wake-Up Coordination",
         description: "Wake students on time",
         time: "06:30"
      },

      {
         id: generateId(),
         name: "Breakfast Coordination",
         description: "Manage breakfast before trek",
         time: "07:30"
      },

      {
         id: generateId(),
         name: "Teacher Welfare Check",
         description: "Check teacher breakfast arrangements",
         time: "07:50"
      },

      {
         id: generateId(),
         name: "Trek Safety Briefing",
         description: "Give trekking safety instructions",
         time: "08:10"
      },

      {
         id: generateId(),
         name: "Trek Headcount",
         description: "Verify students before trek",
         time: "08:20"
      },

      {
         id: generateId(),
         name: "Departure for Triund Trek",
         description: "Coordinate trek departure",
         time: "08:30"
      },

      {
         id: generateId(),
         name: "Triund Trek Management",
         description: "Monitor trekking discipline",
         time: "09:00"
      },

      {
         id: generateId(),
         name: "Lunch Coordination at Triund",
         description: "Coordinate packed lunch service",
         time: "13:00"
      },

      {
         id: generateId(),
         name: "Teacher Welfare Check",
         description: "Check teacher lunch arrangements",
         time: "13:20"
      },

      {
         id: generateId(),
         name: "Trek Descent Briefing",
         description: "Give descent safety instructions",
         time: "14:00"
      },

      {
         id: generateId(),
         name: "Trek Descent Headcount",
         description: "Verify students before descent",
         time: "14:10"
      },

      {
         id: generateId(),
         name: "Descent & Return Transfer",
         description: "Coordinate hotel return transfer",
         time: "14:30"
      },

      {
         id: generateId(),
         name: "Hotel Arrival & Freshen Up",
         description: "Coordinate room access",
         time: "16:30"
      },

      {
         id: generateId(),
         name: "DJ Night Briefing",
         description: "Give DJ discipline instructions",
         time: "18:30"
      },

      {
         id: generateId(),
         name: "DJ Night Headcount",
         description: "Verify students before DJ",
         time: "18:40"
      },

      {
         id: generateId(),
         name: "DJ Night Coordination",
         description: "Coordinate DJ night program",
         time: "19:00"
      },

      {
         id: generateId(),
         name: "Dinner Coordination",
         description: "Coordinate dinner arrangements",
         time: "20:30"
      },

      {
         id: generateId(),
         name: "Teacher Welfare Check",
         description: "Check teacher dinner arrangements",
         time: "20:50"
      },

      {
         id: generateId(),
         name: "Night Discipline Check",
         description: "Ensure room discipline maintained",
         time: "22:00"
      }
   ]
},

{
   groupId: generateId(),
   date: "DAY 03 – LOCAL MCLEOD GANJ VISIT",
   tasks: [

      {
         id: generateId(),
         name: "Wake-Up Coordination",
         description: "Wake students for activities",
         time: "07:00"
      },

      {
         id: generateId(),
         name: "Breakfast Coordination",
         description: "Coordinate breakfast arrangements",
         time: "08:30"
      },

      {
         id: generateId(),
         name: "Teacher Welfare Check",
         description: "Check teacher breakfast arrangements",
         time: "08:50"
      },

      {
         id: generateId(),
         name: "TREASURE HUNT Briefing",
         description: "Give activity safety instructions",
         time: "09:40"
      },

      {
         id: generateId(),
         name: "TREASURE HUNT Headcount",
         description: "Verify students before activity",
         time: "09:50"
      },

      {
         id: generateId(),
         name: "TREASURE HUNT Activity",
         description: "Conduct team building activities",
         time: "10:00"
      },

      {
         id: generateId(),
         name: "Local Visit Briefing",
         description: "Give sightseeing instructions",
         time: "12:40"
      },

      {
         id: generateId(),
         name: "Local Visit Headcount",
         description: "Verify students before departure",
         time: "12:50"
      },

      {
         id: generateId(),
         name: "Lunch Coordination",
         description: "Coordinate lunch arrangements",
         time: "13:00"
      },

      {
         id: generateId(),
         name: "Teacher Welfare Check",
         description: "Check teacher lunch arrangements",
         time: "13:20"
      },

      {
         id: generateId(),
         name: "Transfer to McLeod Ganj",
         description: "Coordinate local vehicle boarding",
         time: "14:30"
      },

      {
         id: generateId(),
         name: "Local Sightseeing Coordination",
         description: "Coordinate sightseeing visits",
         time: "15:00"
      },

      {
         id: generateId(),
         name: "Mall Road Briefing",
         description: "Give market safety instructions",
         time: "18:30"
      },

      {
         id: generateId(),
         name: "Mall Road Headcount",
         description: "Verify students before visit",
         time: "18:40"
      },

      {
         id: generateId(),
         name: "Mall Road & Tibetan Market Visit",
         description: "Coordinate market movement",
         time: "18:50"
      },

      {
         id: generateId(),
         name: "Dinner Coordination",
         description: "Coordinate dinner arrangements",
         time: "20:30"
      },

      {
         id: generateId(),
         name: "Teacher Welfare Check",
         description: "Check teacher dinner arrangements",
         time: "20:50"
      },

      {
         id: generateId(),
         name: "Night Discipline Check",
         description: "Ensure room discipline maintained",
         time: "22:00"
      }
   ]
},

{
   groupId: generateId(),
   date: "DAY 04 – DHARAMSHALA VISIT & RETURN JOURNEY",
   tasks: [

      {
         id: generateId(),
         name: "Wake-Up & Packing",
         description: "Ensure luggage packing completed",
         time: "06:30"
      },

      {
         id: generateId(),
         name: "Breakfast Coordination",
         description: "Coordinate breakfast before checkout",
         time: "08:30"
      },

      {
         id: generateId(),
         name: "Teacher Welfare Check",
         description: "Check teacher breakfast arrangements",
         time: "08:50"
      },

      {
         id: generateId(),
         name: "Hotel Checkout",
         description: "Coordinate hotel checkout",
         time: "09:10"
      },

      {
         id: generateId(),
         name: "Departure Headcount",
         description: "Verify students before departure",
         time: "09:20"
      },

      {
         id: generateId(),
         name: "Departure for Dharamshala",
         description: "Coordinate bus departure",
         time: "09:30"
      },

      {
         id: generateId(),
         name: "Educational Visit Briefing",
         description: "Give educational visit instructions",
         time: "10:00"
      },

      {
         id: generateId(),
         name: "Educational Visit Headcount",
         description: "Verify students before entry",
         time: "10:10"
      },

      {
         id: generateId(),
         name: "Norbulingka Institute Visit",
         description: "Coordinate institute visit",
         time: "10:30"
      },

      {
         id: generateId(),
         name: "War Memorial Visit",
         description: "Coordinate memorial visit",
         time: "11:30"
      },

      {
         id: generateId(),
         name: "Lunch Coordination",
         description: "Coordinate lunch arrangements",
         time: "13:30"
      },

      {
         id: generateId(),
         name: "Teacher Welfare Check",
         description: "Check teacher lunch arrangements",
         time: "13:50"
      },

      {
         id: generateId(),
         name: "Bus Boarding Coordination",
         description: "Coordinate bus boarding process",
         time: "14:30"
      },

      {
         id: generateId(),
         name: "Departure for Delhi",
         description: "Verify luggage and seating",
         time: "15:00"
      },

      {
         id: generateId(),
         name: "Dinner Halt Coordination",
         description: "Coordinate dinner halt discipline",
         time: "20:30"
      },

      {
         id: generateId(),
         name: "Dinner Coordination",
         description: "Coordinate dinner arrangements",
         time: "21:00"
      },

      {
         id: generateId(),
         name: "Teacher Welfare Check",
         description: "Check teacher dinner arrangements",
         time: "21:20"
      },

      {
         id: generateId(),
         name: "Overnight Journey Monitoring",
         description: "Maintain travel discipline",
         time: "22:00"
      }
   ]
},

{
   groupId: generateId(),
   date: "DAY 05 – ARRIVAL AT SCHOOL",
   tasks: [

      {
         id: generateId(),
         name: "Arrival at School",
         description: "Coordinate safe student arrival",
         time: "05:00"
      },

      {
         id: generateId(),
         name: "Final Handover & Tour Closure",
         description: "Complete student handover",
         time: "05:20"
      },

      {
         id: generateId(),
         name: "Feedback Collection",
         description: "Collect trip feedback forms",
         time: "05:40"
      }
   ]
}
]
}
};

//UDAIPUR 
//    groups: [
//   {
//     groupId: generateId(),
//     date: "DAY 01 – DEPARTURE FROM BHOPAL",
//     tasks: [
//       {
//         id: generateId(),
//         name: "Coordinator Reporting & Setup",
//         description: "Report at Bhopal Junction, coordinate train boarding and prepare attendance list",
//         time: "15:00"
//       },
//       {
//         id: generateId(),
//         name: "Student Reporting & Attendance",
//         description: "Mark student attendance and verify final headcount",
//         time: "15:30"
//       },
//       {
//         id: generateId(),
//         name: "Luggage Check",
//         description: "Ensure all student luggage is properly identified and accounted for",
//         time: "15:45"
//       },
//       {
//         id: generateId(),
//         name: "Final Departure Briefing",
//         description: "Give students safety, discipline and train journey instructions",
//         time: "16:00"
//       },
//       {
//         id: generateId(),
//         name: "Final Headcount",
//         description: "Verify students and accompanying staff before boarding",
//         time: "16:15"
//       },
//       {
//         id: generateId(),
//         name: "Train Boarding Coordination",
//         description: "Coordinate boarding on 19712 BPL JP EXPRESS (3AC) and verify seating",
//         time: "16:30"
//       },
//       {
//         id: generateId(),
//         name: "Dinner Coordination",
//         description: "Confirm students have arranged and carried dinner for the journey",
//         time: "20:00"
//       },
//       {
//         id: generateId(),
//         name: "Journey Monitoring",
//         description: "Maintain student discipline and safety during overnight train journey",
//         time: "21:00"
//       }
//     ]
//   },

//   {
//     groupId: generateId(),
//     date: "DAY 02 – CHITTORGARH TO UDAIPUR & LOCAL SIGHTSEEING",
//     tasks: [
//       {
//         id: generateId(),
//         name: "Arrival at Chittorgarh Railway Station",
//         description: "Coordinate safe deboarding and verify complete student headcount",
//         time: "02:30"
//       },
//       {
//         id: generateId(),
//         name: "Bus Transfer Coordination",
//         description: "Coordinate student and luggage transfer from railway station to AC bus",
//         time: "02:45"
//       },
//       {
//         id: generateId(),
//         name: "Headcount Before Departure",
//         description: "Verify all students and staff before leaving Chittorgarh",
//         time: "02:50"
//       },
//       {
//         id: generateId(),
//         name: "Transfer to Udaipur",
//         description: "Monitor safe onward journey to Udaipur",
//         time: "03:00"
//       },
//       {
//         id: generateId(),
//         name: "Breakfast Coordination",
//         description: "Coordinate breakfast arrangements on arrival in Udaipur",
//         time: "06:00"
//       },
//       {
//         id: generateId(),
//         name: "Teacher Welfare Check",
//         description: "Check teacher breakfast arrangements and immediate requirements",
//         time: "06:20"
//       },
//       {
//         id: generateId(),
//         name: "Hotel Arrival & Luggage Coordination",
//         description: "Coordinate luggage unloading and hotel movement",
//         time: "07:15"
//       },
//       {
//         id: generateId(),
//         name: "Room Allotment",
//         description: "Assign rooms according to the approved rooming list",
//         time: "07:30"
//       },
//       {
//         id: generateId(),
//         name: "Early Check-In Coordination",
//         description: "Coordinate early check-in subject to hotel availability",
//         time: "07:30"
//       },
//       {
//         id: generateId(),
//         name: "Lunch Coordination",
//         description: "Coordinate lunch service and ensure students are properly managed",
//         time: "13:00"
//       },
//       {
//         id: generateId(),
//         name: "Teacher Welfare Check",
//         description: "Check teacher lunch arrangements and requirements",
//         time: "13:20"
//       },
//       {
//         id: generateId(),
//         name: "City Palace & Jagdish Mandir Briefing",
//         description: "Give sightseeing instructions and establish group movement rules",
//         time: "15:15"
//       },
//       {
//         id: generateId(),
//         name: "Sightseeing Headcount",
//         description: "Verify students before leaving for sightseeing",
//         time: "15:20"
//       },
//       {
//         id: generateId(),
//         name: "City Palace & Jagdish Mandir Visit",
//         description: "Coordinate student movement and maintain group discipline during sightseeing",
//         time: "15:30"
//       },
//       {
//         id: generateId(),
//         name: "Return to Hotel",
//         description: "Coordinate return movement and verify complete headcount",
//         time: "19:00"
//       },
//       {
//         id: generateId(),
//         name: "Rajasthani Folk Dance Coordination",
//         description: "Coordinate student seating and discipline during folk dance program",
//         time: "19:30"
//       },
//       {
//         id: generateId(),
//         name: "Dinner Coordination",
//         description: "Coordinate dinner service and ensure proper attendance",
//         time: "20:30"
//       },
//       {
//         id: generateId(),
//         name: "Teacher Welfare Check",
//         description: "Check teacher dinner arrangements and satisfaction",
//         time: "20:50"
//       },
//       {
//         id: generateId(),
//         name: "Night Discipline Check",
//         description: "Check rooms, student wellbeing and maintain night discipline",
//         time: "22:00"
//       }
//     ]
//   },

//   {
//     groupId: generateId(),
//     date: "DAY 03 – KUMBALGARH FORT & SHILPGRAM",
//     tasks: [
//       {
//         id: generateId(),
//         name: "Wake-Up Coordination",
//         description: "Wake students on time and ensure readiness for the day's activities",
//         time: "07:00"
//       },
//       {
//         id: generateId(),
//         name: "Breakfast Coordination",
//         description: "Coordinate breakfast service and student movement",
//         time: "08:00"
//       },
//       {
//         id: generateId(),
//         name: "Teacher Welfare Check",
//         description: "Check teacher breakfast arrangements",
//         time: "08:20"
//       },
//       {
//         id: generateId(),
//         name: "Kumbalgarh Visit Briefing",
//         description: "Give safety, discipline and sightseeing instructions before departure",
//         time: "08:40"
//       },
//       {
//         id: generateId(),
//         name: "Kumbalgarh Departure Headcount",
//         description: "Verify all students and staff before departure",
//         time: "08:50"
//       },
//       {
//         id: generateId(),
//         name: "Departure for Kumbalgarh Fort",
//         description: "Coordinate vehicle boarding and transfer to Kumbalgarh",
//         time: "09:00"
//       },
//       {
//         id: generateId(),
//         name: "Kumbalgarh Fort Visit",
//         description: "Coordinate UNESCO site visit and maintain student group discipline",
//         time: "09:30"
//       },
//       {
//         id: generateId(),
//         name: "Return Transfer Coordination",
//         description: "Coordinate return journey from Kumbalgarh to hotel",
//         time: "12:00"
//       },
//       {
//         id: generateId(),
//         name: "Lunch Coordination",
//         description: "Coordinate lunch arrangements at the hotel",
//         time: "13:00"
//       },
//       {
//         id: generateId(),
//         name: "Teacher Welfare Check",
//         description: "Check teacher lunch arrangements",
//         time: "13:20"
//       },
//       {
//         id: generateId(),
//         name: "Shilpgram Visit Briefing",
//         description: "Give movement and discipline instructions before the visit",
//         time: "14:15"
//       },
//       {
//         id: generateId(),
//         name: "Shilpgram Headcount",
//         description: "Verify students before departure",
//         time: "14:20"
//       },
//       {
//         id: generateId(),
//         name: "Shilpgram Visit",
//         description: "Coordinate rural arts and crafts visit and supervise group movement",
//         time: "14:30"
//       },
//       {
//         id: generateId(),
//         name: "Return to Hotel",
//         description: "Coordinate return transport and verify complete headcount",
//         time: "18:30"
//       },
//       {
//         id: generateId(),
//         name: "DJ Night Briefing",
//         description: "Give event safety and discipline instructions",
//         time: "19:15"
//       },
//       {
//         id: generateId(),
//         name: "DJ Night Headcount",
//         description: "Verify students before the DJ program",
//         time: "19:20"
//       },
//       {
//         id: generateId(),
//         name: "DJ Night Coordination",
//         description: "Coordinate DJ night activities and maintain student discipline",
//         time: "19:30"
//       },
//       {
//         id: generateId(),
//         name: "Dinner Coordination",
//         description: "Coordinate dinner service and student attendance",
//         time: "20:30"
//       },
//       {
//         id: generateId(),
//         name: "Teacher Welfare Check",
//         description: "Check teacher dinner arrangements",
//         time: "20:50"
//       },
//       {
//         id: generateId(),
//         name: "Night Discipline Check",
//         description: "Check rooms and ensure students maintain night discipline",
//         time: "22:00"
//       }
//     ]
//   },

//   {
//     groupId: generateId(),
//     date: "DAY 04 – UDAIPUR SIGHTSEEING & RETURN JOURNEY",
//     tasks: [
//       {
//         id: generateId(),
//         name: "Wake-Up Coordination",
//         description: "Wake students and ensure readiness for checkout",
//         time: "07:00"
//       },
//       {
//         id: generateId(),
//         name: "Breakfast Coordination",
//         description: "Coordinate breakfast service before checkout",
//         time: "08:00"
//       },
//       {
//         id: generateId(),
//         name: "Teacher Welfare Check",
//         description: "Check teacher breakfast arrangements",
//         time: "08:20"
//       },
//       {
//         id: generateId(),
//         name: "Luggage Packing",
//         description: "Ensure students pack all belongings and clear rooms",
//         time: "08:30"
//       },
//       {
//         id: generateId(),
//         name: "Hotel Checkout",
//         description: "Coordinate room clearance, key collection and hotel checkout",
//         time: "09:00"
//       },
//       {
//         id: generateId(),
//         name: "Luggage Loading",
//         description: "Supervise luggage loading into vehicles",
//         time: "09:15"
//       },
//       {
//         id: generateId(),
//         name: "Udaipur Sightseeing Briefing",
//         description: "Give instructions for Moti Magri and Fateh Sagar Lake visit",
//         time: "09:20"
//       },
//       {
//         id: generateId(),
//         name: "Sightseeing Headcount",
//         description: "Verify students before departure",
//         time: "09:25"
//       },
//       {
//         id: generateId(),
//         name: "Moti Magri Visit",
//         description: "Coordinate Maharana Pratap Smarak visit and student movement",
//         time: "09:30"
//       },
//       {
//         id: generateId(),
//         name: "Fateh Sagar Lake Visit",
//         description: "Coordinate lake visit and maintain group discipline",
//         time: "10:30"
//       },
//       {
//         id: generateId(),
//         name: "Lunch Coordination",
//         description: "Coordinate lunch service and student attendance",
//         time: "13:00"
//       },
//       {
//         id: generateId(),
//         name: "Teacher Welfare Check",
//         description: "Check teacher lunch arrangements",
//         time: "13:20"
//       },
//       {
//         id: generateId(),
//         name: "Departure for Chittorgarh",
//         description: "Coordinate vehicle boarding and transfer to Chittorgarh",
//         time: "14:30"
//       },
//       {
//         id: generateId(),
//         name: "Chittorgarh Fort Briefing",
//         description: "Give historical site safety and movement instructions",
//         time: "15:30"
//       },
//       {
//         id: generateId(),
//         name: "Chittorgarh Fort Headcount",
//         description: "Verify students before entering the fort",
//         time: "15:45"
//       },
//       {
//         id: generateId(),
//         name: "Chittorgarh Fort Visit",
//         description: "Coordinate fort visit and supervise student movement",
//         time: "16:00"
//       },
//       {
//         id: generateId(),
//         name: "Departure for Railway Station",
//         description: "Coordinate movement to Chittorgarh Railway Station",
//         time: "18:00"
//       },
//       {
//         id: generateId(),
//         name: "Dinner Coordination",
//         description: "Coordinate vegetarian dinner enroute or at Chittorgarh",
//         time: "19:00"
//       },
//       {
//         id: generateId(),
//         name: "Teacher Welfare Check",
//         description: "Check teacher dinner arrangements",
//         time: "19:20"
//       },
//       {
//         id: generateId(),
//         name: "Final Railway Station Headcount",
//         description: "Verify all students and staff before train boarding",
//         time: "19:45"
//       },
//       {
//         id: generateId(),
//         name: "Train Boarding Coordination",
//         description: "Coordinate boarding on 19711 KWP BPL EXPRESS (3AC) and verify seating",
//         time: "20:00"
//       },
//       {
//         id: generateId(),
//         name: "Overnight Journey Monitoring",
//         description: "Maintain discipline and student safety during return journey",
//         time: "21:00"
//       }
//     ]
//   },

//   {
//     groupId: generateId(),
//     date: "DAY 05 – ARRIVAL AT BHOPAL",
//     tasks: [
//       {
//         id: generateId(),
//         name: "Breakfast Coordination",
//         description: "Coordinate breakfast arrangements during train journey",
//         time: "08:00"
//       },
//       {
//         id: generateId(),
//         name: "Arrival Preparation",
//         description: "Ensure students collect belongings and prepare for deboarding",
//         time: "11:00"
//       },
//       {
//         id: generateId(),
//         name: "Final Headcount",
//         description: "Complete final student and staff headcount before deboarding",
//         time: "11:15"
//       },
//       {
//         id: generateId(),
//         name: "Arrival at Bhopal Junction",
//         description: "Coordinate safe deboarding and luggage collection",
//         time: "11:30"
//       },
//       {
//         id: generateId(),
//         name: "Luggage Check",
//         description: "Ensure all student belongings are collected from the train",
//         time: "11:40"
//       },
//       {
//         id: generateId(),
//         name: "Final Handover & Tour Closure",
//         description: "Complete student handover and officially close the tour",
//         time: "11:50"
//       },
//       {
//         id: generateId(),
//         name: "Feedback Collection",
//         description: "Collect feedback from teachers and students and record operational issues",
//         time: "12:00"
//       }
//     ]
//   }
// ]


// DHARAMSHALA 
//       groups: [
// {
//    groupId: generateId(),
//    date: "DAY 01 – DEPARTURE FROM NOIDA",
//    tasks: [

//       {
//          id: generateId(),
//          name: "Coordinator Reporting & Setup",
//          description: "Setup buses and attendance sheets",
//          time: "19:00"
//       },

//       {
//          id: generateId(),
//          name: "Personnel Reporting & Attendance",
//          description: "Mark personnel attendance and headcount",
//          time: "19:20"
//       },

//       {
//          id: generateId(),
//          name: "Final Briefing",
//          description: "Give departure safety instructions",
//          time: "19:40"
//       },

//       {
//          id: generateId(),
//          name: "Departure Headcount",
//          description: "Verify personnel before departure",
//          time: "19:50"
//       },

//       {
//          id: generateId(),
//          name: "Departure from Office / School",
//          description: "Verify seating and departure",
//          time: "20:00"
//       },

//       {
//          id: generateId(),
//          name: "Journey Monitoring",
//          description: "Maintain travel discipline",
//          time: "21:00"
//       },

//       {
//          id: generateId(),
//          name: "Overnight Journey Monitoring",
//          description: "Maintain personnel safety",
//          time: "23:00"
//       }
//    ]
// },

// {
//    groupId: generateId(),
//    date: "DAY 02 – ARRIVAL DHARAMSHALA & HOTEL CHECK-IN",
//    tasks: [

//       {
//          id: generateId(),
//          name: "Arrival at Dharamshala",
//          description: "Coordinate personnel arrival and luggage",
//          time: "08:00"
//       },

//       {
//          id: generateId(),
//          name: "Transfer to McLeod Ganj Hotels",
//          description: "Coordinate local transfers",
//          time: "08:20"
//       },

//       {
//          id: generateId(),
//          name: "Breakfast Coordination",
//          description: "Coordinate breakfast arrangements",
//          time: "09:00"
//       },

//       {
//          id: generateId(),
//          name: "TL Welfare Check",
//          description: "Check TL breakfast arrangements",
//          time: "09:20"
//       },

//       {
//          id: generateId(),
//          name: "Mall Road Freshen-Up Visit Briefing",
//          description: "Give movement instructions",
//          time: "10:00"
//       },

//       {
//          id: generateId(),
//          name: "Mall Road Headcount",
//          description: "Verify personnel before visit",
//          time: "10:10"
//       },

//       {
//          id: generateId(),
//          name: "Freshen-Up at Mall Road",
//          description: "Coordinate personnel movement",
//          time: "10:20"
//       },

//       {
//          id: generateId(),
//          name: "Hotel Arrival & Pre Check-In",
//          description: "Coordinate room readiness",
//          time: "12:30"
//       },

//       {
//          id: generateId(),
//          name: "Hotel Check-In & Room Allotment",
//          description: "Assign rooms and settle personnel",
//          time: "14:00"
//       },

//       {
//          id: generateId(),
//          name: "Lunch Coordination",
//          description: "Coordinate lunch arrangements",
//          time: "14:30"
//       },

//       {
//          id: generateId(),
//          name: "TL Welfare Check",
//          description: "Check TL lunch arrangements",
//          time: "14:50"
//       },

//       {
//          id: generateId(),
//          name: "Conference Hall Briefing",
//          description: "Give conference instructions",
//          time: "16:00"
//       },

//       {
//          id: generateId(),
//          name: "Conference Hall Headcount",
//          description: "Verify personnel before session",
//          time: "16:10"
//       },

//       {
//          id: generateId(),
//          name: "Conference Session",
//          description: "Coordinate conference activities",
//          time: "16:15"
//       },

//       {
//          id: generateId(),
//          name: "Dinner Coordination",
//          description: "Coordinate dinner arrangements",
//          time: "20:00"
//       },

//       {
//          id: generateId(),
//          name: "TL Welfare Check",
//          description: "Check TL dinner arrangements",
//          time: "20:20"
//       },

//       {
//          id: generateId(),
//          name: "Night Discipline Check",
//          description: "Ensure room discipline maintained",
//          time: "22:00"
//       }
//    ]
// },

// {
//    groupId: generateId(),
//    date: "DAY 03 – BHAGSU NAG EXCURSION & GALA NIGHT",
//    tasks: [

//       {
//          id: generateId(),
//          name: "Wake-Up Coordination",
//          description: "Wake personnel for excursion",
//          time: "07:00"
//       },

//       {
//          id: generateId(),
//          name: "Breakfast Coordination",
//          description: "Coordinate breakfast arrangements",
//          time: "08:00"
//       },

//       {
//          id: generateId(),
//          name: "TL Welfare Check",
//          description: "Check TL breakfast arrangements",
//          time: "08:20"
//       },

//       {
//          id: generateId(),
//          name: "Excursion Safety Briefing",
//          description: "Give excursion instructions",
//          time: "09:00"
//       },

//       {
//          id: generateId(),
//          name: "Excursion Headcount",
//          description: "Verify personnel before departure",
//          time: "09:10"
//       },

//       {
//          id: generateId(),
//          name: "Departure for Bhagsu Nag",
//          description: "Coordinate group movement",
//          time: "09:20"
//       },

//       {
//          id: generateId(),
//          name: "Bhagsu Nag Temple Visit",
//          description: "Coordinate temple visit",
//          time: "10:00"
//       },

//       {
//          id: generateId(),
//          name: "Bhagsu Waterfall Visit",
//          description: "Coordinate waterfall excursion",
//          time: "11:00"
//       },

//       {
//          id: generateId(),
//          name: "Lunch Coordination",
//          description: "Coordinate lunch arrangements",
//          time: "13:00"
//       },

//       {
//          id: generateId(),
//          name: "TL Welfare Check",
//          description: "Check TL lunch arrangements",
//          time: "13:20"
//       },

//       {
//          id: generateId(),
//          name: "Return to Hotel",
//          description: "Coordinate personnel return",
//          time: "15:00"
//       },

//       {
//          id: generateId(),
//          name: "Gala Night Briefing",
//          description: "Give event instructions",
//          time: "18:30"
//       },

//       {
//          id: generateId(),
//          name: "Gala Night Headcount",
//          description: "Verify personnel before event",
//          time: "18:40"
//       },

//       {
//          id: generateId(),
//          name: "Gala Party & Snacks",
//          description: "Coordinate gala activities",
//          time: "20:00"
//       },

//       {
//          id: generateId(),
//          name: "Dinner Coordination",
//          description: "Coordinate dinner arrangements",
//          time: "22:00"
//       },

//       {
//          id: generateId(),
//          name: "TL Welfare Check",
//          description: "Check TL dinner arrangements",
//          time: "22:20"
//       },

//       {
//          id: generateId(),
//          name: "Night Discipline Check",
//          description: "Ensure room discipline maintained",
//          time: "23:00"
//       }
//    ]
// },

// {
//    groupId: generateId(),
//    date: "DAY 04 – DHARAMSHALA LOCAL SIGHTSEEING",
//    tasks: [

//       {
//          id: generateId(),
//          name: "Wake-Up Coordination",
//          description: "Wake personnel for sightseeing",
//          time: "07:00"
//       },

//       {
//          id: generateId(),
//          name: "Breakfast Coordination",
//          description: "Coordinate breakfast arrangements",
//          time: "08:00"
//       },

//       {
//          id: generateId(),
//          name: "TL Welfare Check",
//          description: "Check TL breakfast arrangements",
//          time: "08:20"
//       },

//       {
//          id: generateId(),
//          name: "Sightseeing Briefing",
//          description: "Give sightseeing instructions",
//          time: "09:00"
//       },

//       {
//          id: generateId(),
//          name: "Sightseeing Headcount",
//          description: "Verify personnel before departure",
//          time: "09:10"
//       },

//       {
//          id: generateId(),
//          name: "Departure for Dharamshala",
//          description: "Coordinate local transfers",
//          time: "09:20"
//       },

//       {
//          id: generateId(),
//          name: "Stadium Visit",
//          description: "Coordinate educational visit",
//          time: "10:00"
//       },

//       {
//          id: generateId(),
//          name: "War Memorial Visit",
//          description: "Coordinate memorial visit",
//          time: "11:00"
//       },

//       {
//          id: generateId(),
//          name: "Lunch Coordination",
//          description: "Coordinate lunch arrangements",
//          time: "13:00"
//       },

//       {
//          id: generateId(),
//          name: "TL Welfare Check",
//          description: "Check TL lunch arrangements",
//          time: "13:20"
//       },

//       {
//          id: generateId(),
//          name: "Dalai Lama Temple Briefing",
//          description: "Give cultural visit instructions",
//          time: "15:00"
//       },

//       {
//          id: generateId(),
//          name: "Dalai Lama Temple Headcount",
//          description: "Verify personnel before visit",
//          time: "15:10"
//       },

//       {
//          id: generateId(),
//          name: "Dalai Lama Temple Visit",
//          description: "Coordinate temple visit",
//          time: "15:20"
//       },

//       {
//          id: generateId(),
//          name: "Mall Road Briefing",
//          description: "Give market safety instructions",
//          time: "17:00"
//       },

//       {
//          id: generateId(),
//          name: "Mall Road Headcount",
//          description: "Verify personnel before visit",
//          time: "17:10"
//       },

//       {
//          id: generateId(),
//          name: "Mall Road Visit",
//          description: "Coordinate personnel movement",
//          time: "17:20"
//       },

//       {
//          id: generateId(),
//          name: "Dinner Coordination",
//          description: "Coordinate dinner arrangements",
//          time: "20:00"
//       },

//       {
//          id: generateId(),
//          name: "TL Welfare Check",
//          description: "Check TL dinner arrangements",
//          time: "20:20"
//       },

//       {
//          id: generateId(),
//          name: "Night Discipline Check",
//          description: "Ensure room discipline maintained",
//          time: "22:00"
//       }
//    ]
// },

// {
//    groupId: generateId(),
//    date: "DAY 05 – RETURN TO NOIDA",
//    tasks: [

//       {
//          id: generateId(),
//          name: "Wake-Up & Packing",
//          description: "Ensure luggage packing completed",
//          time: "07:00"
//       },

//       {
//          id: generateId(),
//          name: "Breakfast Coordination",
//          description: "Coordinate breakfast arrangements",
//          time: "08:00"
//       },

//       {
//          id: generateId(),
//          name: "TL Welfare Check",
//          description: "Check TL breakfast arrangements",
//          time: "08:20"
//       },

//       {
//          id: generateId(),
//          name: "Hotel Checkout",
//          description: "Coordinate hotel checkout",
//          time: "09:00"
//       },

//       {
//          id: generateId(),
//          name: "Departure Headcount",
//          description: "Verify personnel before departure",
//          time: "09:20"
//       },

//       {
//          id: generateId(),
//          name: "Departure for Noida",
//          description: "Coordinate boarding process",
//          time: "09:30"
//       },

//       {
//          id: generateId(),
//          name: "Lunch Coordination",
//          description: "Coordinate lunch arrangements",
//          time: "13:00"
//       },

//       {
//          id: generateId(),
//          name: "TL Welfare Check",
//          description: "Check TL lunch arrangements",
//          time: "13:20"
//       },

//       {
//          id: generateId(),
//          name: "Journey Monitoring",
//          description: "Maintain travel discipline",
//          time: "15:00"
//       },

//       {
//          id: generateId(),
//          name: "Arrival at Noida",
//          description: "Coordinate safe personnel arrival",
//          time: "22:00"
//       },

//       {
//          id: generateId(),
//          name: "Final Handover & Tour Closure",
//          description: "Complete personnel handover",
//          time: "22:20"
//       },

//       {
//          id: generateId(),
//          name: "Feedback Collection",
//          description: "Collect feedback from TLs and personnel",
//          time: "22:40"
//       }
//    ]
// }
// ]


//CHopta trip
// groups: [
// {
//    groupId: generateId(),
//    date: "DAY 00 – OVERNIGHT DEPARTURE TO DEHRADUN",
//    tasks: [

//       {
//          id: generateId(),
//          name: "Coordinator Reporting & Setup",
//          description: "Setup buses and attendance sheets",
//          time: "22:00"
//       },

//       {
//          id: generateId(),
//          name: "Student Reporting & Attendance",
//          description: "Mark attendance and headcount",
//          time: "22:15"
//       },

//       {
//          id: generateId(),
//          name: "Final Briefing",
//          description: "Give departure safety instructions",
//          time: "22:30"
//       },

//       {
//          id: generateId(),
//          name: "Departure Headcount",
//          description: "Verify students before departure",
//          time: "22:40"
//       },

//       {
//          id: generateId(),
//          name: "Luggage Loading",
//          description: "Load luggage into coach",
//          time: "22:50"
//       },

//       {
//          id: generateId(),
//          name: "Departure from School",
//          description: "Verify seating and departure",
//          time: "23:00"
//       },

//       {
//          id: generateId(),
//          name: "Overnight Journey Monitoring",
//          description: "Maintain travel discipline",
//          time: "23:30"
//       }
//    ]
// },

// {
//    groupId: generateId(),
//    date: "DAY 01 – DEHRADUN TO DHANAULTI",
//    tasks: [

//       {
//          id: generateId(),
//          name: "Arrival at Dehradun",
//          description: "Coordinate arrival and headcount",
//          time: "05:00"
//       },

//       {
//          id: generateId(),
//          name: "Transfer to Dhanaulti",
//          description: "Coordinate onward transfer",
//          time: "05:15"
//       },

//       {
//          id: generateId(),
//          name: "Breakfast Coordination",
//          description: "Coordinate breakfast arrangements",
//          time: "07:00"
//       },

//       {
//          id: generateId(),
//          name: "Teacher Welfare Check",
//          description: "Check teacher breakfast arrangements",
//          time: "07:20"
//       },

//       {
//          id: generateId(),
//          name: "Camp Allotment & Rest",
//          description: "Assign camps and cottages",
//          time: "08:00"
//       },

//       {
//          id: generateId(),
//          name: "Pre Check-In Management",
//          description: "Manage students before check-in",
//          time: "12:00"
//       },

//       {
//          id: generateId(),
//          name: "Lunch Coordination",
//          description: "Coordinate lunch arrangements",
//          time: "14:00"
//       },

//       {
//          id: generateId(),
//          name: "Teacher Welfare Check",
//          description: "Check teacher lunch arrangements",
//          time: "14:20"
//       },

//       {
//          id: generateId(),
//          name: "Adventure Activities Briefing",
//          description: "Give activity safety instructions",
//          time: "15:00"
//       },

//       {
//          id: generateId(),
//          name: "Adventure Activities Headcount",
//          description: "Verify students before activity",
//          time: "15:10"
//       },

//       {
//          id: generateId(),
//          name: "Adventure Activities Coordination",
//          description: "Coordinate adventure activities",
//          time: "15:20"
//       },

//       {
//          id: generateId(),
//          name: "DJ Night Briefing",
//          description: "Give DJ discipline instructions",
//          time: "18:30"
//       },

//       {
//          id: generateId(),
//          name: "DJ Night Headcount",
//          description: "Verify students before DJ",
//          time: "18:40"
//       },

//       {
//          id: generateId(),
//          name: "DJ Night Coordination",
//          description: "Coordinate DJ activities",
//          time: "19:00"
//       },

//       {
//          id: generateId(),
//          name: "Dinner Coordination",
//          description: "Coordinate dinner arrangements",
//          time: "20:30"
//       },

//       {
//          id: generateId(),
//          name: "Teacher Welfare Check",
//          description: "Check teacher dinner arrangements",
//          time: "20:50"
//       },

//       {
//          id: generateId(),
//          name: "Night Discipline Check",
//          description: "Ensure room discipline maintained",
//          time: "22:00"
//       }
//    ]
// },

// {
//    groupId: generateId(),
//    date: "DAY 02 – DHANAULTI TO CHOPTA",
//    tasks: [

//       {
//          id: generateId(),
//          name: "Wake-Up Coordination",
//          description: "Wake students for departure",
//          time: "03:00"
//       },

//       {
//          id: generateId(),
//          name: "Departure Briefing",
//          description: "Give travel safety instructions",
//          time: "03:30"
//       },

//       {
//          id: generateId(),
//          name: "Departure Headcount",
//          description: "Verify students before departure",
//          time: "03:40"
//       },

//       {
//          id: generateId(),
//          name: "Departure for Chopta",
//          description: "Coordinate vehicle boarding",
//          time: "04:00"
//       },

//       {
//          id: generateId(),
//          name: "Packed Breakfast Coordination",
//          description: "Distribute packed breakfast",
//          time: "07:00"
//       },

//       {
//          id: generateId(),
//          name: "Teacher Welfare Check",
//          description: "Check teacher breakfast arrangements",
//          time: "07:20"
//       },

//       {
//          id: generateId(),
//          name: "Arrival at Chopta Camps",
//          description: "Coordinate arrival and luggage",
//          time: "13:00"
//       },

//       {
//          id: generateId(),
//          name: "Lunch Coordination",
//          description: "Coordinate lunch arrangements",
//          time: "13:30"
//       },

//       {
//          id: generateId(),
//          name: "Teacher Welfare Check",
//          description: "Check teacher lunch arrangements",
//          time: "13:50"
//       },

//       {
//          id: generateId(),
//          name: "Tent Allocation",
//          description: "Assign tents to students",
//          time: "14:30"
//       },

//       {
//          id: generateId(),
//          name: "Evening Activities Briefing",
//          description: "Give activity safety instructions",
//          time: "17:00"
//       },

//       {
//          id: generateId(),
//          name: "Evening Activities Headcount",
//          description: "Verify students before activity",
//          time: "17:10"
//       },

//       {
//          id: generateId(),
//          name: "Evening Activities Coordination",
//          description: "Conduct fun activities",
//          time: "17:20"
//       },

//       {
//          id: generateId(),
//          name: "Dinner Coordination",
//          description: "Coordinate dinner arrangements",
//          time: "19:30"
//       },

//       {
//          id: generateId(),
//          name: "Teacher Welfare Check",
//          description: "Check teacher dinner arrangements",
//          time: "19:50"
//       },

//       {
//          id: generateId(),
//          name: "Night Discipline Check",
//          description: "Ensure camp discipline maintained",
//          time: "21:00"
//       }
//    ]
// },

// {
//    groupId: generateId(),
//    date: "DAY 03 – TUNGNATH & CHANDRASHILA TREK",
//    tasks: [

//       {
//          id: generateId(),
//          name: "Wake-Up Coordination",
//          description: "Wake students for trek",
//          time: "05:30"
//       },

//       {
//          id: generateId(),
//          name: "Breakfast Coordination",
//          description: "Coordinate breakfast arrangements",
//          time: "06:00"
//       },

//       {
//          id: generateId(),
//          name: "Teacher Welfare Check",
//          description: "Check teacher breakfast arrangements",
//          time: "06:20"
//       },

//       {
//          id: generateId(),
//          name: "Trek Safety Briefing",
//          description: "Give trekking safety instructions",
//          time: "06:40"
//       },

//       {
//          id: generateId(),
//          name: "Trek Headcount",
//          description: "Verify students before trek",
//          time: "06:50"
//       },

//       {
//          id: generateId(),
//          name: "Departure for Tungnath Trek",
//          description: "Coordinate trek departure",
//          time: "07:00"
//       },

//       {
//          id: generateId(),
//          name: "Tungnath Temple Visit",
//          description: "Coordinate temple visit",
//          time: "09:30"
//       },

//       {
//          id: generateId(),
//          name: "Chandrashila Trek Briefing",
//          description: "Give summit safety instructions",
//          time: "11:00"
//       },

//       {
//          id: generateId(),
//          name: "Chandrashila Trek Headcount",
//          description: "Verify students before ascent",
//          time: "11:10"
//       },

//       {
//          id: generateId(),
//          name: "Chandrashila Peak Visit",
//          description: "Coordinate summit experience",
//          time: "11:20"
//       },

//       {
//          id: generateId(),
//          name: "Packed Lunch Coordination",
//          description: "Distribute packed lunch",
//          time: "13:00"
//       },

//       {
//          id: generateId(),
//          name: "Teacher Welfare Check",
//          description: "Check teacher lunch arrangements",
//          time: "13:20"
//       },

//       {
//          id: generateId(),
//          name: "Trek Descent Briefing",
//          description: "Give descent safety instructions",
//          time: "14:00"
//       },

//       {
//          id: generateId(),
//          name: "Trek Descent Headcount",
//          description: "Verify students before descent",
//          time: "14:10"
//       },

//       {
//          id: generateId(),
//          name: "Return to Chopta Camps",
//          description: "Coordinate return movement",
//          time: "14:30"
//       },

//       {
//          id: generateId(),
//          name: "Dinner Coordination",
//          description: "Coordinate dinner arrangements",
//          time: "19:00"
//       },

//       {
//          id: generateId(),
//          name: "Teacher Welfare Check",
//          description: "Check teacher dinner arrangements",
//          time: "19:20"
//       },

//       {
//          id: generateId(),
//          name: "Night Discipline Check",
//          description: "Ensure camp discipline maintained",
//          time: "21:00"
//       }
//    ]
// },

// {
//    groupId: generateId(),
//    date: "DAY 04 – CHOPTA TO DEHRADUN TO CROSSING REPUBLIC",
//    tasks: [

//       {
//          id: generateId(),
//          name: "Wake-Up & Packing",
//          description: "Ensure luggage packing completed",
//          time: "06:30"
//       },

//       {
//          id: generateId(),
//          name: "Breakfast Coordination",
//          description: "Coordinate breakfast arrangements",
//          time: "07:00"
//       },

//       {
//          id: generateId(),
//          name: "Teacher Welfare Check",
//          description: "Check teacher breakfast arrangements",
//          time: "07:20"
//       },

//       {
//          id: generateId(),
//          name: "Departure Briefing",
//          description: "Give return journey instructions",
//          time: "08:00"
//       },

//       {
//          id: generateId(),
//          name: "Departure Headcount",
//          description: "Verify students before departure",
//          time: "08:10"
//       },

//       {
//          id: generateId(),
//          name: "Departure for Dehradun",
//          description: "Coordinate vehicle boarding",
//          time: "08:30"
//       },

//       {
//          id: generateId(),
//          name: "Lunch Coordination at Haridwar",
//          description: "Coordinate lunch arrangements",
//          time: "12:30"
//       },

//       {
//          id: generateId(),
//          name: "Teacher Welfare Check",
//          description: "Check teacher lunch arrangements",
//          time: "12:50"
//       },

//       {
//          id: generateId(),
//          name: "Bus Boarding Coordination",
//          description: "Coordinate AC coach boarding",
//          time: "14:00"
//       },

//       {
//          id: generateId(),
//          name: "Dinner Halt Coordination",
//          description: "Coordinate dinner halt",
//          time: "18:30"
//       },

//       {
//          id: generateId(),
//          name: "Dinner Coordination",
//          description: "Coordinate dinner arrangements",
//          time: "19:00"
//       },

//       {
//          id: generateId(),
//          name: "Teacher Welfare Check",
//          description: "Check teacher dinner arrangements",
//          time: "19:20"
//       },

//       {
//          id: generateId(),
//          name: "Journey Monitoring",
//          description: "Maintain travel discipline",
//          time: "20:00"
//       },

//       {
//          id: generateId(),
//          name: "Arrival at Crossing Republic School",
//          description: "Coordinate safe arrival",
//          time: "22:45"
//       },

//       {
//          id: generateId(),
//          name: "Final Handover & Tour Closure",
//          description: "Complete student handover",
//          time: "23:00"
//       },

//       {
//          id: generateId(),
//          name: "Feedback Collection",
//          description: "Collect trip feedback forms",
//          time: "23:20"
//       }
//    ]
// }
// ]

//  SHIMLA 
// groups: [
// {
//    groupId: generateId(),
//    date: "DAY 00 – OVERNIGHT DEPARTURE TO CHAIL",
//    tasks: [

//       {
//          id: generateId(),
//          name: "Coordinator Reporting & Setup",
//          description: "Setup buses and attendance sheets",
//          time: "20:00"
//       },

//       {
//          id: generateId(),
//          name: "Student Reporting & Attendance",
//          description: "Mark attendance and headcount",
//          time: "20:30"
//       },

//       {
//          id: generateId(),
//          name: "Final Briefing",
//          description: "Give departure safety instructions",
//          time: "21:00"
//       },

//       {
//          id: generateId(),
//          name: "Departure Headcount",
//          description: "Verify students before departure",
//          time: "21:20"
//       },

//       {
//          id: generateId(),
//          name: "Luggage Loading",
//          description: "Load luggage into buses",
//          time: "21:30"
//       },

//       {
//          id: generateId(),
//          name: "Departure from School",
//          description: "Verify seating and departure",
//          time: "22:00"
//       },

//       {
//          id: generateId(),
//          name: "Murthal Halt Coordination",
//          description: "Coordinate halt and discipline",
//          time: "22:30"
//       },

//       {
//          id: generateId(),
//          name: "Overnight Journey Monitoring",
//          description: "Maintain travel discipline",
//          time: "23:00"
//       }
//    ]
// },

// {
//    groupId: generateId(),
//    date: "DAY 01 – ARRIVAL IN CHAIL & ADVENTURE ACTIVITIES",
//    tasks: [

//       {
//          id: generateId(),
//          name: "Arrival in Chail & Freshen Up",
//          description: "Coordinate arrival and luggage",
//          time: "08:00"
//       },

//       {
//          id: generateId(),
//          name: "Breakfast Coordination",
//          description: "Manage breakfast arrangements",
//          time: "09:00"
//       },

//       {
//          id: generateId(),
//          name: "Teacher Welfare Check",
//          description: "Check teacher meal arrangements",
//          time: "09:20"
//       },

//       {
//          id: generateId(),
//          name: "Pre Check-In Management",
//          description: "Manage students before check-in",
//          time: "10:00"
//       },

//       {
//          id: generateId(),
//          name: "Hotel Check-In & Room Allotment",
//          description: "Assign rooms to students",
//          time: "12:00"
//       },

//       {
//          id: generateId(),
//          name: "Lunch Coordination",
//          description: "Coordinate lunch service",
//          time: "13:30"
//       },

//       {
//          id: generateId(),
//          name: "Teacher Welfare Check",
//          description: "Check teacher lunch arrangements",
//          time: "13:50"
//       },

//       {
//          id: generateId(),
//          name: "Adventure Activities Briefing",
//          description: "Give activity safety instructions",
//          time: "14:40"
//       },

//       {
//          id: generateId(),
//          name: "Adventure Activities Headcount",
//          description: "Verify students before activities",
//          time: "14:50"
//       },

//       {
//          id: generateId(),
//          name: "Adventure Activities Coordination",
//          description: "Manage adventure activities",
//          time: "15:00"
//       },

//       {
//          id: generateId(),
//          name: "Bonfire Briefing",
//          description: "Give bonfire discipline instructions",
//          time: "19:10"
//       },

//       {
//          id: generateId(),
//          name: "Bonfire Headcount",
//          description: "Verify students before bonfire",
//          time: "19:20"
//       },

//       {
//          id: generateId(),
//          name: "Bonfire Coordination",
//          description: "Coordinate bonfire arrangements",
//          time: "19:30"
//       },

//       {
//          id: generateId(),
//          name: "Dinner Coordination",
//          description: "Coordinate dinner service",
//          time: "20:30"
//       },

//       {
//          id: generateId(),
//          name: "Teacher Welfare Check",
//          description: "Check teacher dinner arrangements",
//          time: "20:50"
//       },

//       {
//          id: generateId(),
//          name: "Night Discipline Check",
//          description: "Ensure room discipline maintained",
//          time: "22:00"
//       }
//    ]
// },

// {
//    groupId: generateId(),
//    date: "DAY 02 – TREKKING, TEMPLE VISIT & DJ NIGHT",
//    tasks: [

//       {
//          id: generateId(),
//          name: "Wake-Up Coordination",
//          description: "Wake students on time",
//          time: "06:30"
//       },

//       {
//          id: generateId(),
//          name: "Breakfast Coordination",
//          description: "Manage breakfast before trek",
//          time: "08:00"
//       },

//       {
//          id: generateId(),
//          name: "Teacher Welfare Check",
//          description: "Check teacher breakfast arrangements",
//          time: "08:20"
//       },

//       {
//          id: generateId(),
//          name: "Nature Walk Briefing",
//          description: "Give trekking safety instructions",
//          time: "09:10"
//       },

//       {
//          id: generateId(),
//          name: "Nature Walk Headcount",
//          description: "Verify students before trek",
//          time: "09:20"
//       },

//       {
//          id: generateId(),
//          name: "Nature Walk & Shiva Temple Visit",
//          description: "Coordinate trek movement",
//          time: "10:00"
//       },

//       {
//          id: generateId(),
//          name: "Lunch Coordination",
//          description: "Coordinate lunch arrangements",
//          time: "13:00"
//       },

//       {
//          id: generateId(),
//          name: "Teacher Welfare Check",
//          description: "Check teacher lunch arrangements",
//          time: "13:20"
//       },

//       {
//          id: generateId(),
//          name: "Jungle Trekking Briefing",
//          description: "Give activity safety briefing",
//          time: "14:40"
//       },

//       {
//          id: generateId(),
//          name: "Jungle Trekking Headcount",
//          description: "Verify students before activity",
//          time: "14:50"
//       },

//       {
//          id: generateId(),
//          name: "Jungle Trekking & Tent Pitching Activity",
//          description: "Coordinate trekking activities",
//          time: "15:20"
//       },

//       {
//          id: generateId(),
//          name: "DJ Night Briefing",
//          description: "Give DJ discipline instructions",
//          time: "18:40"
//       },

//       {
//          id: generateId(),
//          name: "DJ Night Headcount",
//          description: "Verify students before DJ",
//          time: "18:50"
//       },

//       {
//          id: generateId(),
//          name: "DJ Night Coordination",
//          description: "Coordinate DJ night program",
//          time: "19:00"
//       },

//       {
//          id: generateId(),
//          name: "Dinner Coordination",
//          description: "Coordinate dinner service",
//          time: "21:30"
//       },

//       {
//          id: generateId(),
//          name: "Teacher Welfare Check",
//          description: "Check teacher dinner arrangements",
//          time: "21:50"
//       },

//       {
//          id: generateId(),
//          name: "Night Discipline Check",
//          description: "Check student room discipline",
//          time: "22:30"
//       }
//    ]
// },

// {
//    groupId: generateId(),
//    date: "DAY 03 – SHIMLA VISIT & RETURN JOURNEY",
//    tasks: [

//       {
//          id: generateId(),
//          name: "Wake-Up & Packing",
//          description: "Ensure luggage packing completed",
//          time: "06:30"
//       },

//       {
//          id: generateId(),
//          name: "Breakfast Coordination",
//          description: "Manage breakfast before checkout",
//          time: "08:30"
//       },

//       {
//          id: generateId(),
//          name: "Teacher Welfare Check",
//          description: "Check teacher breakfast arrangements",
//          time: "08:50"
//       },

//       {
//          id: generateId(),
//          name: "Hotel Checkout",
//          description: "Coordinate hotel checkout process",
//          time: "09:00"
//       },

//       {
//          id: generateId(),
//          name: "Shimla Departure Headcount",
//          description: "Verify students before departure",
//          time: "09:20"
//       },

//       {
//          id: generateId(),
//          name: "Transfer to SHIMLA",
//          description: "Coordinate local bus transfer",
//          time: "09:30"
//       },

//       {
//          id: generateId(),
//          name: "IIAS Visit Briefing",
//          description: "Give educational visit instructions",
//          time: "10:40"
//       },

//       {
//          id: generateId(),
//          name: "IIAS Visit Headcount",
//          description: "Verify students before entry",
//          time: "10:50"
//       },

//       {
//          id: generateId(),
//          name: "Indian Institute Visit",
//          description: "Coordinate institute visit",
//          time: "11:20"
//       },

//       {
//          id: generateId(),
//          name: "Lunch at DOMINOS",
//          description: "Coordinate lunch distribution",
//          time: "14:00"
//       },

//       {
//          id: generateId(),
//          name: "Teacher Welfare Check",
//          description: "Check teacher lunch arrangements",
//          time: "14:20"
//       },

//       {
//          id: generateId(),
//          name: "Mall Road Briefing",
//          description: "Give market safety instructions",
//          time: "15:40"
//       },

//       {
//          id: generateId(),
//          name: "Mall Road Headcount",
//          description: "Verify students before visit",
//          time: "15:50"
//       },

//       {
//          id: generateId(),
//          name: "Mall Road & Ridge Visit Coordination",
//          description: "Coordinate market area movement",
//          time: "16:00"
//       },

//       {
//          id: generateId(),
//          name: "Dinner Coordination",
//          description: "Coordinate dinner arrangements",
//          time: "19:30"
//       },

//       {
//          id: generateId(),
//          name: "Teacher Welfare Check",
//          description: "Check teacher dinner arrangements",
//          time: "19:50"
//       },

//       {
//          id: generateId(),
//          name: "Departure for School",
//          description: "Coordinate return departure",
//          time: "20:00"
//       },

//       {
//          id: generateId(),
//          name: "Overnight Journey Monitoring",
//          description: "Maintain travel discipline",
//          time: "22:00"
//       }
//    ]
// },

// {
//    groupId: generateId(),
//    date: "DAY 04 – ARRIVAL AT SCHOOL",
//    tasks: [

//       {
//          id: generateId(),
//          name: "Arrival at School",
//          description: "Coordinate safe student arrival",
//          time: "04:30"
//       },

//       {
//          id: generateId(),
//          name: "Final Handover & Tour Closure",
//          description: "Complete student handover",
//          time: "05:00"
//       },

//       {
//          id: generateId(),
//          name: "Feedback Collection",
//          description: "Collect trip feedback forms",
//          time: "05:20"
//       }
//    ]
// }
// ]

//  groups:[ for JIBHI
//   {
//     groupId: generateId(),
//     date: "2026-03-09",
//     tasks: [
//       { id: generateId(), name: "Pre-Departure Setup", description: "Arrive early at school, check bus readiness, coordinate with driver and teachers, prepare attendance list", time: "19:30" },
//       { id: generateId(), name: "Student Reporting & Attendance", description: "Headcount, mark attendance, verify student IDs", time: "20:30" },
//       { id: generateId(), name: "Final Briefing", description: "Give instructions on discipline, safety, and journey rules after seating", time: "21:00" },
//       { id: generateId(), name: "Luggage Loading", description: "Supervise luggage placement and ensure proper handling", time: "21:30" },
//       { id: generateId(), name: "Departure & Headcount", description: "Final headcount in each bus including teachers, ensure all students seated properly", time: "22:00" },
//       { id: generateId(), name: "Journey Monitoring", description: "Maintain discipline, ensure safety, avoid disturbance during travel", time: "23:00" }
//     ]
//   },
//   {
//     groupId: generateId(),
//     date: "2026-03-10",
//     tasks: [
//       { id: generateId(), name: "Arrival & Headcount", description: "Check all students present after arrival", time: "06:00" },
//       { id: generateId(), name: "Vehicle Transfer", description: "Manage transfer from bus to local vehicles with luggage", time: "06:30" },
//       { id: generateId(), name: "Travel to Camp", description: "Ensure safe and smooth transfer to campsite", time: "07:00" },
//       { id: generateId(), name: "Arrival & Breakfast", description: "Coordinate breakfast and manage students", time: "08:00" },
//       { id: generateId(), name: "Pre Check-in Management", description: "Brief property rules and discipline, keep students engaged", time: "10:00" },
//       { id: generateId(), name: "Room Allotment", description: "Assign rooms as per list and resolve issues", time: "12:00" },
//       { id: generateId(), name: "Lunch Coordination", description: "Food tasting, ensure lunch readiness and proper discipline", time: "13:00" },
//       { id: generateId(), name: "Sightseeing Departure", description: "Headcount before departure, manage group movement", time: "14:30" },
//       { id: generateId(), name: "Dinner Coordination", description: "Food tasting, ensure dinner readiness, briefing for next day", time: "19:30" },
//       { id: generateId(), name: "Night Discipline Check", description: "Room checks and ensure lights-off discipline", time: "22:00" }
//     ]
//   },
//   {
//     groupId: generateId(),
//     date: "2026-03-11",
//     tasks: [
//       { id: generateId(), name: "Wake-Up Coordination", description: "Wake-up call and ensure all students are ready", time: "07:00" },
//       { id: generateId(), name: "Breakfast", description: "Food tasting and ensure proper meal before trek", time: "08:00" },
//       { id: generateId(), name: "Departure for Trek", description: "Headcount and move group to trek starting point", time: "09:00" },
//       { id: generateId(), name: "Trek Management", description: "Safety briefing, monitor group movement and pacing", time: "10:30" },
//       { id: generateId(), name: "Packed Lunch Break", description: "Distribute and manage lunch during trek", time: "13:30" },
//       { id: generateId(), name: "Descent & Activities", description: "Headcount before descent, manage return and activities", time: "15:00" },
//       { id: generateId(), name: "Dinner", description: "Food tasting, ensure attendance, briefing for next day", time: "19:30" },
//       { id: generateId(), name: "Night Check", description: "Ensure discipline and proper rest", time: "22:00" }
//     ]
//   },
//   {
//     groupId: generateId(),
//     date: "2026-03-12",
//     tasks: [
//       { id: generateId(), name: "Wake-Up & Packing", description: "Wake-up call, ensure luggage packed and rooms cleared", time: "06:30" },
//       { id: generateId(), name: "Breakfast", description: "Food tasting and coordinate meal before checkout", time: "08:00" },
//       { id: generateId(), name: "Checkout", description: "Manage room clearance and final checks", time: "09:00" },
//       { id: generateId(), name: "Sightseeing", description: "Headcount and supervise final visits", time: "09:30" },
//       { id: generateId(), name: "Lunch", description: "Food tasting and ensure timely meal", time: "12:00" },
//       { id: generateId(), name: "Departure to Aut", description: "Call driver, coordinate transport and luggage loading", time: "13:00" },
//       { id: generateId(), name: "Bus Boarding", description: "Coordinate vendor, transfer students, final headcount and seating", time: "18:00" },
//       { id: generateId(), name: "Return Journey Monitoring", description: "Maintain discipline and ensure safety during return", time: "22:00" }
//     ]
//   },
//   {
//     groupId: generateId(),
//     date: "2026-03-13",
//     tasks: [
//       { id: generateId(), name: "Arrival at School", description: "Ensure safe arrival and coordination", time: "06:00" },
//       { id: generateId(), name: "Final Handover", description: "Hand over students to parents after final count", time: "06:30" }
//     ]
//   }
// ]
//   jaipur: {
//     tripName: "MERI College – Manali",
//     tripDate: "2026-03-30",
//     tripDiscussion: "Operational Control Checklist for Manali Tour. TO: Ankit. Monitoring: Central / Tour Manager.",
//     groups: [
//         {
//             groupId: generateId(),
//             date: "2026-03-30",
//             tasks: [
//                 { id: generateId(), name: "Student arrival confirmation", description: "Ensure all reported at college. Evidence: Head count", time: "08:00 PM" },
//                 { id: generateId(), name: "Teacher arrival confirmation", description: "Confirm all present. Evidence: Count", time: "08:00 PM" },
//                 { id: generateId(), name: "Bus readiness", description: "Check AC, seats, cleanliness. Evidence: Bus photo", time: "08:00 PM" },
                
//                 { id: generateId(), name: "Head count", description: "Final student + teacher count", time: "08:30 PM" },
//                 { id: generateId(), name: "Luggage tagging", description: "Ensure all bags loaded", time: "08:30 PM" },
//                 { id: generateId(), name: "Safety briefing", description: "Travel discipline rules", time: "08:30 PM" },

//                 { id: generateId(), name: "Final head count", description: "Before bus moves", time: "09:00 PM" },
//                 { id: generateId(), name: "Seat allocation", description: "Students settled", time: "09:00 PM" },
//                 { id: generateId(), name: "Teacher comfort check", description: "Confirm", time: "09:00 PM" },

//                 { id: generateId(), name: "Driver monitoring", description: "No rash driving", time: "Night" },
//                 { id: generateId(), name: "Student discipline", description: "No movement in bus", time: "Night" },
//                 { id: generateId(), name: "Medical check", description: "Any motion sickness", time: "Night" }
//             ]
//         },
//         {
//             groupId: generateId(),
//             date: "2026-03-31",
//             tasks: [
//                 { id: generateId(), name: "Head count", description: "Before deboarding", time: "Morning" },
//                 { id: generateId(), name: "Breakfast coordination", description: "Verify menu. Evidence: Breakfast photo", time: "Morning" },

//                 { id: generateId(), name: "Bus/Local Transport check", description: "Confirm condition", time: "Transfer" },
//                 { id: generateId(), name: "Head count", description: "Before departure", time: "Transfer" },

//                 { id: generateId(), name: "Room allocation", description: "Rooms allocated equally to boys and girls", time: "11:00 AM" },
//                 { id: generateId(), name: "Room briefing", description: "Damage responsibility", time: "11:00 AM" },
//                 { id: generateId(), name: "Movement control", description: "No room switching", time: "11:00 AM" },

//                 { id: generateId(), name: "Escort on Boys section", description: "Escort members should be with boys section", time: "11:00 AM" },


//                 { id: generateId(), name: "Lunch -Menu check", description: "Match plan", time: "01:30 PM" },
//                 { id: generateId(), name: "Teacher care", description: "Separate service", time: "01:30 PM" },

//                 { id: generateId(), name: "For Vashisht Temple -Head count", description: "At every location. Evidence: Group photo", time: "03:00 PM" },
//                 { id: generateId(), name: "Group discipline", description: "No isolation", time: "03:00 PM" },

//                 { id: generateId(), name: "For Hadimba Temple -Head count", description: "At every location. Evidence: Group photo", time: "03:00 PM" },
//                 { id: generateId(), name: "Group discipline", description: "No isolation", time: "03:00 PM" },


//                 { id: generateId(), name: "Tibetian Monastery -Head count", description: "At every location. Evidence: Group photo", time: "03:00 PM" },
//                 { id: generateId(), name: "Group discipline", description: "No isolation", time: "03:00 PM" },
            

//                 { id: generateId(), name: "Mall Road -Head count", description: "At every location. Evidence: Group photo", time: "03:00 PM" },
//                 { id: generateId(), name: "Group discipline", description: "No isolation", time: "03:00 PM" },
//                 { id: generateId(), name: "Market control", description: "Fixed time at Mall Road", time: "03:00 PM" },


//                 { id: generateId(), name: "Dinner-Taste check", description: "TO + Teacher", time: "08:00 PM" },
//                 { id: generateId(), name: "Feedback", description: "Record issues", time: "08:00 PM" },

//                 { id: generateId(), name: "Night Check-Visit rooms", description: "Check wellbeing", time: "10:30 PM" },
//                 { id: generateId(), name: "Discipline", description: "Lights off", time: "10:30 PM" }
//             ]
//         },
//         {
//             groupId: generateId(),
//             date: "2026-04-01",
//             tasks: [
//                 { id: generateId(), name: "Breakfast check", description: "Standard food check", time: "07:30 AM" },
                
//                 { id: generateId(), name: "Vehicle check", description: "Snow suitability", time: "08:30 AM" },
//                 { id: generateId(), name: "Head count", description: "Before departure", time: "08:30 AM" },

//                 { id: generateId(), name: "Safety briefing", description: "Snow discipline. Strict: No unsupervised snow activity or student alone", time: "10:30 AM" },
//                 { id: generateId(), name: "Activity monitoring", description: "No risky activity without permission", time: "10:30 AM" },
//                 { id: generateId(), name: "Vendor control", description: "Only approved vendors", time: "10:30 AM" },

//                 { id: generateId(), name: "Time control", description: "Avoid delays", time: "Atal Tunnel" },
//                 { id: generateId(), name: "Head count", description: "Before departure", time: "Atal Tunnel" },

//                 { id: generateId(), name: "Return to Hotel", description: "Make sure return of everyone", time: "Atal Tunnel" },
                
//                 { id: generateId(), name: "DJ supervision", description: "No indiscipline", time: "Evening" },
//                 { id: generateId(), name: "Teacher presence", description: "Mandatory", time: "Evening" },

//                 { id: generateId(), name: "Dinner-Taste check", description: "TO + Teacher", time: "08:00 PM" },
//                 { id: generateId(), name: "Feedback", description: "Record issues", time: "08:00 PM" },

//                 { id: generateId(), name: "Night Check-Visit rooms", description: "Check wellbeing", time: "10:30 PM" },
//                 { id: generateId(), name: "Discipline", description: "Lights off", time: "10:30 PM" }
//             ]
//         },
//         {
//             groupId: generateId(),
//             date: "2026-04-02",
//             tasks: [

//                 { id: generateId(), name: "Breakfast check", description: "Standard food check", time: "07:30 AM" },
                
//                 { id: generateId(), name: "Take student feedback", description: "ensure student feedback", time: "07:30 AM" },

//                 { id: generateId(), name: "Safety briefing", description: "EnsuresRiver proximity rules", time: "09:00 AM" },
//                 { id: generateId(), name: "Group control", description: "No entering water", time: "09:00 AM" },
//                 { id: generateId(), name: "Photo coordination", description: "Controlled movement", time: "09:00 AM" },

//                 { id: generateId(), name: "Room inspection", description: "Damage check", time: "11:00 AM" },
//                 { id: generateId(), name: "Key collection", description: "Clearance", time: "11:00 AM" },

//                 { id: generateId(), name: "Lunch -Menu check", description: "Match plan", time: "01:30 PM" },
//                 { id: generateId(), name: "Teacher care", description: "Separate service", time: "01:30 PM" },


//                 { id: generateId(), name: "Head count", description: "Before departure", time: "02:00 PM" },
//                 { id: generateId(), name: "Luggage check", description: "Ensure all loaded", time: "02:00 PM" },

//                 { id: generateId(), name: "Time control", description: "Avoid delays", time: "Enroute" },
//                 { id: generateId(), name: "Student discipline", description: "Group movement", time: "Enroute" },

//                 { id: generateId(), name: "Food check", description: "Hygiene & quality", time: "Dinner" },
//                 { id: generateId(), name: "Teacher care", description: "Check satisfaction", time: "Dinner" },

//                 { id: generateId(), name: "QR sharing", description: "Share Google review QR link. Evidence: Screenshot", time: "Return Journey" },
//                 { id: generateId(), name: "Instruction", description: "Guide students how to review. Evidence: Video/photo", time: "Return Journey" },
//                 { id: generateId(), name: "Minimum target", description: "At least 60–70% students. Evidence: Count", time: "Return Journey" },
//                 { id: generateId(), name: "Review check", description: "Confirm posting. Evidence: Screenshot", time: "Return Journey" },

//                 { id: generateId(), name: "Share Insta ID", description: "@backpackers (your handle). Evidence: Screenshot", time: "Return Journey" },
//                 { id: generateId(), name: "Ask students", description: "Post story/reel tagging Backpackers. Evidence: Story screenshots", time: "Return Journey" },
//                 { id: generateId(), name: "Repost content", description: "Collect best stories. Evidence: Archive", time: "Return Journey" },

//                 { id: generateId(), name: "Collect numbers", description: "Take all teacher contacts. Evidence: List", time: "Return Journey" },
//                 { id: generateId(), name: "Permission", description: "Inform about Backpackers community. Evidence: Verbal consent", time: "Return Journey" },
//                 { id: generateId(), name: "Save properly", description: "Add name + school. Evidence: Sheet entry", time: "Return Journey" },

//                 { id: generateId(), name: "Explain benefit", description: "Future tours / priority offers", time: "Return Journey" },
//                 { id: generateId(), name: "Create connect", description: "Personal relationship building", time: "Return Journey" },
//                 { id: generateId(), name: "Follow-up note", description: "Add to WhatsApp / CRM later", time: "Return Journey" }
//             ]
//         },
//         {
//             groupId: generateId(),
//             date: "2026-04-03",
//             tasks: [
//                 { id: generateId(), name: "Head count", description: "Final count", time: "05:00-06:00 AM" },
//                 { id: generateId(), name: "Luggage check", description: "Nothing left", time: "05:00-06:00 AM" },
//                 { id: generateId(), name: "Student handover", description: "Ensure safe dispersal", time: "05:00-06:00 AM" },

//                 { id: generateId(), name: "Group photo", description: "End of tour", time: "Final Task" },
//                 { id: generateId(), name: "Teacher feedback", description: "Record", time: "Final Task" }
//             ]
//         }
//     ]
// }

// for camp O Royale 
//   jaipur: {
//     tripName: "Camp O Royale",
//     tripDate: "Day 1",
//     tripDiscussion: "3-Day Student Group – Operational Control Checklist for Camp O Royale.",
//     groups: [
//         {
//             groupId: generateId(),
//             date: "Day 1 – Arrival + Adventure + Experience",
//             tasks: [
//                 // 12:30–01:30 PM – ARRIVAL & WELCOME
//                 { id: generateId(), name: "Arrival coordination", description: "Ensure team ready at gate. Evidence: Photo", time: "12:30–01:30 PM" },
//                 { id: generateId(), name: "Welcome drink", description: "Serve immediately on arrival. Evidence: Photo", time: "12:30–01:30 PM" },
//                 { id: generateId(), name: "Luggage handling", description: "Assist unloading. Evidence: Photo", time: "12:30–01:30 PM" },
//                 { id: generateId(), name: "Head count", description: "Confirm students + teachers. Evidence: Record", time: "12:30–01:30 PM" },

//                 // 01:30 PM – BRIEFING
//                 { id: generateId(), name: "Forest safety briefing", description: "No wandering alone", time: "01:30 PM" },
//                 { id: generateId(), name: "Property rules", description: "No room hopping", time: "01:30 PM" },
//                 { id: generateId(), name: "Timing discipline", description: "Strict adherence", time: "01:30 PM" },
//                 { id: generateId(), name: "Emergency protocol", description: "Share contact person", time: "01:30 PM" },
//                 { id: generateId(), name: "Adventure safety", description: "Pre-warning", time: "01:30 PM" },

//                 // 02:00 PM – ROOM ALLOCATION
//                 { id: generateId(), name: "Room distribution", description: "Smooth & quick. Evidence: Rooming list", time: "02:00 PM" },
//                 { id: generateId(), name: "Room inspection briefing", description: "Damage responsibility. Evidence: Photo/video", time: "02:00 PM" },
//                 { id: generateId(), name: "Key control", description: "Proper allocation. Evidence: Record", time: "02:00 PM" },

//                 // 02:30 PM – LUNCH
//                 { id: generateId(), name: "Food readiness check", description: "Before service", time: "02:30 PM" },
//                 { id: generateId(), name: "Taste check", description: "Manager + teacher", time: "02:30 PM" },
//                 { id: generateId(), name: "Teacher service", description: "Separate attention", time: "02:30 PM" },
//                 { id: generateId(), name: "Feedback collection", description: "After meal", time: "02:30 PM" },

//                 // 03:00 PM – ADVENTURE ACTIVITIES (Pre-Activity)
//                 { id: generateId(), name: "Safety briefing", description: "Mandatory", time: "03:00 PM" },
//                 { id: generateId(), name: "Instructor introduction", description: "Build trust", time: "03:00 PM" },
//                 { id: generateId(), name: "Group division", description: "2 groups", time: "03:00 PM" },
//                 { id: generateId(), name: "Equipment check", description: "Before start", time: "03:00 PM" },

//                 // 03:00 PM – ADVENTURE ACTIVITIES (Execution)
//                 { id: generateId(), name: "Group rotation", description: "Smooth transition", time: "03:00 PM" },
//                 { id: generateId(), name: "Instructor supervision", description: "Continuous", time: "03:00 PM" },
//                 { id: generateId(), name: "Injury check", description: "Immediate response", time: "03:00 PM" },
//                 { id: generateId(), name: "Hydration check", description: "Regular", time: "03:00 PM" },

//                 // 06:00 PM – EVENING TEA & SNACKS
//                 { id: generateId(), name: "Snack readiness", description: "Confirm", time: "06:00 PM" },
//                 { id: generateId(), name: "Teacher service", description: "Priority", time: "06:00 PM" },
//                 { id: generateId(), name: "Student control", description: "No crowding", time: "06:00 PM" },

//                 // 07:00 PM – JUNGLE TREK (High Risk)
//                 { id: generateId(), name: "Safety briefing", description: "Torch + group discipline", time: "07:00 PM" },
//                 { id: generateId(), name: "Guide allocation", description: "Mandatory", time: "07:00 PM" },
//                 { id: generateId(), name: "Head count", description: "Before & after", time: "07:00 PM" },
//                 { id: generateId(), name: "No isolation rule", description: "Strict", time: "07:00 PM" },

//                 // 08:00 PM – BONFIRE + MOVIE / STAR GAZING
//                 { id: generateId(), name: "Bonfire setup", description: "Safe distance", time: "08:00 PM" },
//                 { id: generateId(), name: "Seating arrangement", description: "Organized", time: "08:00 PM" },
//                 { id: generateId(), name: "Engagement", description: "Movie / storytelling", time: "08:00 PM" },
//                 { id: generateId(), name: "Discipline control", description: "No chaos", time: "08:00 PM" },

//                 // 10:00 PM – DINNER
//                 { id: generateId(), name: "Food check", description: "Taste + quality", time: "10:00 PM" },
//                 { id: generateId(), name: "Teacher service", description: "Priority", time: "10:00 PM" },
//                 { id: generateId(), name: "Feedback", description: "Record", time: "10:00 PM" },

//                 // 11:00 PM – ROOM ROUND
//                 { id: generateId(), name: "Visit each room", description: "Check comfort", time: "11:00 PM" },
//                 { id: generateId(), name: "Noise control", description: "Enforce discipline", time: "11:00 PM" },
//                 { id: generateId(), name: "Medical check", description: "Any issue", time: "11:00 PM" }
//             ]
//         },
//         {
//             groupId: generateId(),
//             date: "Day 2 – Trek + Team Building + Treasure Hunt",
//             tasks: [
//                 // 06:00 AM – TAPOVAN TREK (High Risk)
//                 { id: generateId(), name: "Wake-up call", description: "Ensure readiness", time: "06:00 AM" },
//                 { id: generateId(), name: "Safety briefing", description: "Before start", time: "06:00 AM" },
//                 { id: generateId(), name: "Guide presence", description: "Mandatory", time: "06:00 AM" },
//                 { id: generateId(), name: "Head count", description: "Start & end", time: "06:00 AM" },
//                 { id: generateId(), name: "Hydration", description: "Carry water", time: "06:00 AM" },

//                 // 08:30 AM – RETURN + RECOVERY
//                 { id: generateId(), name: "Rest coordination", description: "Ensure recovery", time: "08:30 AM" },
//                 { id: generateId(), name: "Medical check", description: "Any fatigue/injury", time: "08:30 AM" },

//                 // 10:00 AM – BREAKFAST
//                 { id: generateId(), name: "Breakfast check", description: "Standard food + teacher care protocol", time: "10:00 AM" },

//                 // 11:00 AM – REST PERIOD
//                 { id: generateId(), name: "Room discipline", description: "Ensure rest", time: "11:00 AM" },
//                 { id: generateId(), name: "No outdoor roaming", description: "Strict", time: "11:00 AM" },

//                 // 01:00 PM – LUNCH
//                 { id: generateId(), name: "Lunch check", description: "Standard protocol", time: "01:00 PM" },

//                 // 03:00 PM – TREASURE HUNT (Pre-Activity)
//                 { id: generateId(), name: "Story briefing", description: "Make it engaging", time: "03:00 PM" },
//                 { id: generateId(), name: "Group division", description: "Teams", time: "03:00 PM" },
//                 { id: generateId(), name: "Rules explanation", description: "Clearly defined", time: "03:00 PM" },

//                 // 03:00 PM – TREASURE HUNT (Execution)
//                 { id: generateId(), name: "Checkpoint setup", description: "Clear markers", time: "03:00 PM" },
//                 { id: generateId(), name: "Staff allocation", description: "At each point", time: "03:00 PM" },
//                 { id: generateId(), name: "Time control", description: "Strict", time: "03:00 PM" },
//                 { id: generateId(), name: "Fair play monitoring", description: "Ensure", time: "03:00 PM" },

//                 // 05:30 PM – SNACKS
//                 { id: generateId(), name: "Snacks service", description: "Serve on time", time: "05:30 PM" },

//                 // 07:00 PM – BONFIRE + MUSIC
//                 { id: generateId(), name: "Music control", description: "Volume + timing", time: "07:00 PM" },
//                 { id: generateId(), name: "Student engagement", description: "Dance / interaction", time: "07:00 PM" },
//                 { id: generateId(), name: "Teacher comfort", description: "Priority", time: "07:00 PM" },

//                 // 09:00 PM – DINNER
//                 { id: generateId(), name: "Dinner check", description: "Standard protocol", time: "09:00 PM" },

//                 // 10:30 PM – ROOM ROUND
//                 { id: generateId(), name: "Room round", description: "Standard check", time: "10:30 PM" }
//             ]
//         },
//         {
//             groupId: generateId(),
//             date: "Day 3 – Checkout & Departure",
//             tasks: [
//                 // 08:00 AM – BREAKFAST
//                 { id: generateId(), name: "Breakfast check", description: "Standard protocol", time: "08:00 AM" },

//                 // 09:00–11:00 AM – PACKING & CHECKOUT PREP
//                 { id: generateId(), name: "Luggage packing", description: "Ensure readiness", time: "09:00–11:00 AM" },
//                 { id: generateId(), name: "Room inspection", description: "Damage check", time: "09:00–11:00 AM" },
//                 { id: generateId(), name: "Key collection", description: "Proper", time: "09:00–11:00 AM" },

//                 // 11:00 AM – LIGHT REFRESHMENT
//                 { id: generateId(), name: "Light refreshment", description: "Serve on time", time: "11:00 AM" },

//                 // 11:30 AM – BRAND TASKS: Google Review
//                 { id: generateId(), name: "QR sharing", description: "Show code. Evidence: Screenshot", time: "11:30 AM" },
//                 { id: generateId(), name: "Instruction", description: "Guide students how to review. Evidence: Video/photo", time: "11:30 AM" },
//                 { id: generateId(), name: "Target", description: "Minimum 60% students. Evidence: Count", time: "11:30 AM" },

//                 // 11:30 AM – BRAND TASKS: Instagram Tagging
//                 { id: generateId(), name: "Share handle", description: "Share Camp O Royale Instagram handle. Evidence: Screenshot", time: "11:30 AM" },
//                 { id: generateId(), name: "Story posting", description: "Encourage students to post & tag. Evidence: Story screenshots", time: "11:30 AM" },
//                 { id: generateId(), name: "Repost collection", description: "Save best content. Evidence: Archive", time: "11:30 AM" },

//                 // 11:30 AM – BRAND TASKS: Teacher Network
//                 { id: generateId(), name: "Collect contacts", description: "Name + school. Evidence: List", time: "11:30 AM" },
//                 { id: generateId(), name: "Permission", description: "For community. Evidence: Verbal consent", time: "11:30 AM" },
//                 { id: generateId(), name: "Relationship building", description: "Personal interaction", time: "11:30 AM" },

//                 // 12:00 PM – DEPARTURE
//                 { id: generateId(), name: "Final head count", description: "Mandatory", time: "12:00 PM" },
//                 { id: generateId(), name: "Luggage check", description: "Nothing left", time: "12:00 PM" },
//                 { id: generateId(), name: "Farewell coordination", description: "Smooth exit", time: "12:00 PM" }
//             ]
//         }
//     ]
// }

//   groups: [ //this is for mussorie trip
// {
//    groupId: generateId(),
//    date: "DAY 01 – DEPARTURE & MUSSORIE TRANSFER",
//    tasks: [

//       {
//          id: generateId(),
//          name: "Coordinator Reporting & Setup",
//          description: "Setup buses and attendance lists",
//          time: "03:00"
//       },

//       {
//          id: generateId(),
//          name: "Student Reporting & Attendance",
//          description: "Mark attendance and headcount",
//          time: "04:00"
//       },

//       {
//          id: generateId(),
//          name: "Final Briefing",
//          description: "Give safety and discipline briefing",
//          time: "04:20"
//       },

//       {
//          id: generateId(),
//          name: "Departure From School",
//          description: "Verify seating and final count",
//          time: "04:30"
//       },

//       {
//          id: generateId(),
//          name: "Journey Monitoring",
//          description: "Maintain discipline during travel",
//          time: "06:00"
//       },

//       {
//          id: generateId(),
//          name: "Vendor Coordination",
//          description: "Coordinate breakfast vendor readiness",
//          time: "07:30"
//       },

//       {
//          id: generateId(),
//          name: "Breakfast Coordination",
//          description: "Manage breakfast and seating",
//          time: "08:00"
//       },

//          {
//          id: generateId(),
//          name: "Breakfast- Teacher wellfare check",
//          description: "Ask of teacher wellfare",
//          time: "08:20"
//       },

//       {
//          id: generateId(),
//          name: "Arrival at Dehradun ISBT",
//          description: "Coordinate luggage and headcount",
//          time: "09:00"
//       },

//       {
//          id: generateId(),
//          name: "Transfer to Mussorie",
//          description: "Manage Bolero boarding process",
//          time: "09:30"
//       },

//       {
//          id: generateId(),
//          name: "Hotel Arrival & Pre Check-In",
//          description: "Coordinate hotel room readiness",
//          time: "11:00"
//       },

//       {
//          id: generateId(),
//          name: "Room Allotment",
//          description: "Assign rooms to students",
//          time: "11:30"
//       },

//       {
//          id: generateId(),
//          name: "Lunch Coordination",
//          description: "Coordinate lunch service",
//          time: "14:00"
//       },

//        {
//          id: generateId(),
//          name: " Teacher wellfare check",
//          description: "Ask of teacher wellfare",
//          time: "14:20"
//       },

//       {
//          id: generateId(),
//          name: "Departure for BHATTA FALLS",
//          description: "Coordinate sightseeing departure",
//          time: "15:00"
//       },

//       {
//          id: generateId(),
//          name: "Cable Car Safety Briefing",
//          description: "Give cable car safety instructions",
//          time: "15:30"
//       },

//       {
//          id: generateId(),
//          name: "Cable Car Coordination",
//          description: "Manage cable car movement",
//          time: "15:50"
//       },

//       {
//          id: generateId(),
//          name: "MALL ROAD Safety Briefing",
//          description: "Give market safety instructions",
//          time: "18:00"
//       },

//       {
//          id: generateId(),
//          name: "MALL ROAD Visit Coordination",
//          description: "Supervise market area movement",
//          time: "18:15"
//       },

//       {
//          id: generateId(),
//          name: "Dinner Coordination",
//          description: "Coordinate dinner arrangements",
//          time: "21:00"
//       },

//      {
//          id: generateId(),
//          name: " Teacher wellfare check",
//          description: "Ask of teacher wellfare",
//          time: "21:20"
//       }, 

//       {
//          id: generateId(),
//          name: "Night Discipline Check",
//          description: "Ensure room discipline maintained",
//          time: "22:30"
//       }
//    ]
// },

// {
//    groupId: generateId(),
//    date: "DAY 02 – GEORGE EVEREST TREK & ASTRO CAMPING",
//    tasks: [

//       {
//          id: generateId(),
//          name: "Wake-Up Coordination",
//          description: "Wake students on time",
//          time: "06:30"
//       },

//       {
//          id: generateId(),
//          name: "Breakfast Coordination",
//          description: "Manage breakfast before trek",
//          time: "08:00"
//       },

//       {
//          id: generateId(),
//          name: " Teacher wellfare check",
//          description: "Ask of teacher wellfare",
//          time: "08:20"
//       },

//       {
//          id: generateId(),
//          name: "Trek Safety Briefing",
//          description: "Give trekking safety briefing",
//          time: "09:00"
//       },

//       {
//          id: generateId(),
//          name: "Departure for GEORGE EVEREST PEAK",
//          description: "Coordinate trek departure",
//          time: "09:30"
//       },

//       {
//          id: generateId(),
//          name: "Trek Management",
//          description: "Monitor trek safety discipline",
//          time: "10:00"
//       },

//       {
//          id: generateId(),
//          name: "Lunch Transfer Coordination",
//          description: "Coordinate lunch transfer movement",
//          time: "13:00"
//       },

//       {
//          id: generateId(),
//          name: " Teacher wellfare check",
//          description: "Ask of teacher wellfare",
//          time: "13:20"
//       },

//       {
//          id: generateId(),
//          name: "Hotel Return & Lunch",
//          description: "Coordinate hotel lunch service",
//          time: "14:00"
//       },

//       {
//          id: generateId(),
//          name: "TREASURE HUNT Safety Briefing",
//          description: "Give activity safety instructions",
//          time: "17:00"
//       },

//       {
//          id: generateId(),
//          name: "TREASURE HUNT Activity",
//          description: "Conduct treasure hunt activity",
//          time: "17:20"
//       },

//       {
//          id: generateId(),
//          name: "ASTRO CAMPING Setup",
//          description: "Prepare astro camping setup",
//          time: "18:30"
//       },

//       {
//          id: generateId(),
//          name: "ASTRO CAMPING Session",
//          description: "Manage astro camping session",
//          time: "19:00"
//       },

//       {
//          id: generateId(),
//          name: "DJ Night Coordination",
//          description: "Coordinate DJ night activities",
//          time: "20:00"
//       },

//       {
//          id: generateId(),
//          name: "Dinner Coordination",
//          description: "Coordinate dinner service",
//          time: "21:00"
//       },

//       {
//          id: generateId(),
//          name: " Teacher wellfare check",
//          description: "Ask of teacher wellfare",
//          time: "21:20"
//       },

//       {
//          id: generateId(),
//          name: "End of Day Reporting",
//          description: "Submit operational day report",
//          time: "22:30"
//       },

//       {
//          id: generateId(),
//          name: "Night Discipline Check",
//          description: "Check room discipline status",
//          time: "23:00"
//       }
//    ]
// },

// {
//    groupId: generateId(),
//    date: "DAY 03 – RETURN JOURNEY",
//    tasks: [

//       {
//          id: generateId(),
//          name: "Wake-Up & Packing",
//          description: "Ensure luggage packing completed",
//          time: "07:00"
//       },

//       {
//          id: generateId(),
//          name: "Breakfast Coordination",
//          description: "Manage breakfast before checkout",
//          time: "09:00"
//       },

//       {
//          id: generateId(),
//          name: " Teacher wellfare check",
//          description: "Ask of teacher wellfare",
//          time: "09:20"
//       },

//       {
//          id: generateId(),
//          name: "Hotel Checkout",
//          description: "Complete hotel clearance process",
//          time: "10:00"
//       },

//       {
//          id: generateId(),
//          name: "Bolero Boarding",
//          description: "Coordinate student boarding",
//          time: "10:15"
//       },

//       {
//          id: generateId(),
//          name: "Departure From Mussorie",
//          description: "Verify final departure headcount",
//          time: "10:30"
//       },

//       {
//          id: generateId(),
//          name: "Vendor Coordination",
//          description: "Coordinate lunch vendor readiness",
//          time: "11:30"
//       },

//       {
//          id: generateId(),
//          name: "Lunch at MUKHIYA DHABA",
//          description: "Coordinate buffet lunch service",
//          time: "12:30"
//       },

//       {
//          id: generateId(),
//          name: " Teacher wellfare check",
//          description: "Ask of teacher wellfare",
//          time: "12:40"
//       },

//       {
//          id: generateId(),
//          name: "Departure for School",
//          description: "Coordinate return boarding process",
//          time: "13:30"
//       },

//       {
//          id: generateId(),
//          name: "Journey Monitoring",
//          description: "Maintain return journey discipline",
//          time: "16:00"
//       },

//       {
//          id: generateId(),
//          name: "Arrival at School",
//          description: "Verify student arrival safely",
//          time: "19:00"
//       },

//       {
//          id: generateId(),
//          name: "Final Handover & Tour Closure",
//          description: "Complete student handover process",
//          time: "19:30"
//       }
//    ]
// }
// ]