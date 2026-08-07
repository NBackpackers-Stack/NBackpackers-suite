import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
    "Distance from major attractions": { type: String, default: "0" },
    "Road condition": { type: String, default: "0" },
    "Bus accessibility": { type: String, default: "0" },
    "Bus parking": { type: String, default: "0" },
    "Safe boarding/deboarding": { type: String, default: "0" },
    "Nearby hospital": { type: String, default: "0" },
    "Nearby pharmacy": { type: String, default: "0" },
    "Mobile network": { type: String, default: "0" },
    "Overall location": { type: String, default: "0" },
    "Review": { type: String, default: "" },
    score: { type: Number, default: 0 },
}, { _id: false });

const ExteriorSchema = new mongoose.Schema({
    "Overall cleanliness": { type: String, default: "0" },
    "Entrance appearance": { type: String, default: "0" },
    "Security gate": { type: String, default: "0" },
    "Boundary wall": { type: String, default: "0" },
    "CCTV coverage": { type: String, default: "0" },
    "Night lighting": { type: String, default: "0" },
    "Parking area": { type: String, default: "0" },
    "Landscaping": { type: String, default: "0" },
    "Overall exterior": { type: String, default: "0" },
    "Review": { type: String, default: "" },
    score: { type: Number, default: 0 },
}, { _id: false });

const ReceptionSchema = new mongoose.Schema({
    "Reception capacity": { type: String, default: "0" },
    "Check-in efficiency": { type: String, default: "0" },
    "Reception staff": { type: String, default: "0" },
    "Luggage holding area": { type: String, default: "0" },
    "Waiting area": { type: String, default: "0" },
    "Washrooms": { type: String, default: "0" },
    "Drinking water": { type: String, default: "0" },
    "Hospitality": { type: String, default: "0" },
    "Overall reception": { type: String, default: "0" },
    "Review": { type: String, default: "" },
    score: { type: Number, default: 0 },
}, { _id: false });

const RoomsSchema = new mongoose.Schema({
    "Room size": { type: String, default: "0" },
    "Bed & mattress": { type: String, default: "0" },
    "Bedsheet & linen": { type: String, default: "0" },
    "Pillow quality": { type: String, default: "0" },
    "Towels": { type: String, default: "0" },
    "Door lock": { type: String, default: "0" },
    "Window lock": { type: String, default: "0" },
    "Balcony safety": { type: String, default: "0" },
    "Lighting": { type: String, default: "0" },
    "AC": { type: String, default: "0" },
    "Fan": { type: String, default: "0" },
    "Heater": { type: String, default: "0" },
    "TV": { type: String, default: "0" },
    "Cupboard": { type: String, default: "0" },
    "Tea/Coffee maker": { type: String, default: "0" },
    "Charging points": { type: String, default: "0" },
    "Wi-Fi": { type: String, default: "0" },
    "Mobile network": { type: String, default: "0" },
    "Room odour": { type: String, default: "0" },
    "Luggage space": { type: String, default: "0" },
    "Overall room condition": { type: String, default: "0" },
    "Review": { type: String, default: "" },
    score: { type: Number, default: 0 },
}, { _id: false });

const BathroomsSchema = new mongoose.Schema({
    "Hot water": { type: String, default: "0" },
    "Flush": { type: String, default: "0" },
    "Wash basin": { type: String, default: "0" },
    "Shower": { type: String, default: "0" },
    "Water pressure": { type: String, default: "0" },
    "Drainage": { type: String, default: "0" },
    "Toilet cleanliness": { type: String, default: "0" },
    "Exhaust fan": { type: String, default: "0" },
    "Mirror": { type: String, default: "0" },
    "Soap & toiletries": { type: String, default: "0" },
    "Bucket & mug": { type: String, default: "0" },
    "Anti-slip flooring": { type: String, default: "0" },
    "Odour": { type: String, default: "0" },
    "Overall bathroom": { type: String, default: "0" },
    "Review": { type: String, default: "" },
    score: { type: Number, default: 0 },
}, { _id: false });

const DiningSchema = new mongoose.Schema({
    "Dining capacity": { type: String, default: "0" },
    "Group seating": { type: String, default: "0" },
    "Buffet setup": { type: String, default: "0" },
    "Buffet counters": { type: String, default: "0" },
    "Hand wash area": { type: String, default: "0" },
    "Drinking water": { type: String, default: "0" },
    "Seating comfort": { type: String, default: "0" },
    "Lighting": { type: String, default: "0" },
    "Ventilation": { type: String, default: "0" },
    "Cleanliness": { type: String, default: "0" },
    "Food refill speed": { type: String, default: "0" },
    "Queue management": { type: String, default: "0" },
    "Overall dining": { type: String, default: "0" },
    "Review": { type: String, default: "" },
    score: { type: Number, default: 0 },
}, { _id: false });

const KitchenSchema = new mongoose.Schema({
    "Staff hygiene": { type: String, default: "0" },
    "Staff uniforms": { type: String, default: "0" },
    "Hair caps": { type: String, default: "0" },
    "Gloves": { type: String, default: "0" },
    "Clean utensils": { type: String, default: "0" },
    "Food storage": { type: String, default: "0" },
    "Refrigeration": { type: String, default: "0" },
    "Vegetable washing area": { type: String, default: "0" },
    "Dishwashing area": { type: String, default: "0" },
    "Garbage disposal": { type: String, default: "0" },
    "Pest control": { type: String, default: "0" },
    "Cooking oil quality": { type: String, default: "0" },
    "Overall kitchen hygiene": { type: String, default: "0" },
    "Review": { type: String, default: "" },
    score: { type: Number, default: 0 },
}, { _id: false });

const FoodSchema = new mongoose.Schema({
    "Breakfast": { type: String, default: "0" },
    "Lunch": { type: String, default: "0" },
    "Dinner": { type: String, default: "0" },
    "Snacks": { type: String, default: "0" },
    "Taste": { type: String, default: "0" },
    "Freshness": { type: String, default: "0" },
    "Variety": { type: String, default: "0" },
    "Presentation": { type: String, default: "0" },
    "Portion size": { type: String, default: "0" },
    "Hygiene": { type: String, default: "0" },
    "Student-friendly menu": { type: String, default: "0" },
    "Jain food availability": { type: String, default: "0" },
    "Special diet availability": { type: String, default: "0" },
    "Overall food quality": { type: String, default: "0" },
    "Review": { type: String, default: "" },
    score: { type: Number, default: 0 },
}, { _id: false });

const SafetySchema = new mongoose.Schema({
    "Fire extinguishers": { type: String, default: "0" },
    "Smoke detectors": { type: String, default: "0" },
    "Fire alarm system": { type: String, default: "0" },
    "Emergency exits": { type: String, default: "0" },
    "Emergency signage": { type: String, default: "0" },
    "First aid kit": { type: String, default: "0" },
    "Security guards": { type: String, default: "0" },
    "Night security": { type: String, default: "0" },
    "CCTV": { type: String, default: "0" },
    "Boundary security": { type: String, default: "0" },
    "Staircase safety": { type: String, default: "0" },
    "Balcony safety": { type: String, default: "0" },
    "Electrical safety": { type: String, default: "0" },
    "Swimming pool safety": { type: String, default: "0" },
    "Overall safety": { type: String, default: "0" },
    "Review": { type: String, default: "" },
    score: { type: Number, default: 0 },
}, { _id: false });

const ActivitiesSchema = new mongoose.Schema({
    "Adventure equipment": { type: String, default: "0" },
    "Safety gear": { type: String, default: "0" },
    "Helmets": { type: String, default: "0" },
    "Harness": { type: String, default: "0" },
    "Certified instructors": { type: String, default: "0" },
    "SOP availability": { type: String, default: "0" },
    "Indoor games": { type: String, default: "0" },
    "Outdoor games": { type: String, default: "0" },
    "Bonfire area": { type: String, default: "0" },
    "DJ area": { type: String, default: "0" },
    "Amphitheatre": { type: String, default: "0" },
    "Garden": { type: String, default: "0" },
    "Sports ground": { type: String, default: "0" },
    "Swimming pool": { type: String, default: "0" },
    "Overall recreation": { type: String, default: "0" },
    "Review": { type: String, default: "" },
    score: { type: Number, default: 0 },
}, { _id: false });

const MedicalSchema = new mongoose.Schema({
    "Doctor on call": { type: String, default: "0" },
    "Ambulance": { type: String, default: "0" },
    "First aid room": { type: String, default: "0" },
    "First aid box": { type: String, default: "0" },
    "Wheelchair": { type: String, default: "0" },
    "Emergency contacts": { type: String, default: "0" },
    "Overall medical preparedness": { type: String, default: "0" },
    "Review": { type: String, default: "" },
    score: { type: Number, default: 0 },
}, { _id: false });

const StaffSchema = new mongoose.Schema({
    "Courtesy": { type: String, default: "0" },
    "Grooming": { type: String, default: "0" },
    "Uniform": { type: String, default: "0" },
    "Communication": { type: String, default: "0" },
    "Reception staff": { type: String, default: "0" },
    "Restaurant staff": { type: String, default: "0" },
    "Housekeeping staff": { type: String, default: "0" },
    "Security staff": { type: String, default: "0" },
    "Group handling experience": { type: String, default: "0" },
    "Overall professionalism": { type: String, default: "0" },
    "Review": { type: String, default: "" },
    score: { type: Number, default: 0 },
}, { _id: false });

const CommercialSchema = new mongoose.Schema({
    "Driver accommodation": { type: String, default: "0" },
    "Driver meals": { type: String, default: "0" },
    "Welcome drink": { type: String, default: "0" },
    "Bonfire inclusion": { type: String, default: "0" },
    "DJ inclusion": { type: String, default: "0" },
    "Activities inclusion": { type: String, default: "0" },
    "Early check-in": { type: String, default: "0" },
    "Late check-out": { type: String, default: "0" },
    "Packed breakfast": { type: String, default: "0" },
    "Packed lunch": { type: String, default: "0" },
    "Late dinner": { type: String, default: "0" },
    "Meal customization": { type: String, default: "0" },
    "Review": { type: String, default: "" },
    score: { type: Number, default: 0 },
}, { _id: false });

const ImagedocumentationSchema = new mongoose.Schema({
    "Hotel entrance": { type: String, default: "" },
    "Parking": { type: String, default: "" },
    "Reception": { type: String, default: "" },
    "Standard rooms": { type: String, default: "" },
    "Washrooms": { type: String, default: "" },
    "Dining hall": { type: String, default: "" },
    "Adventure area": { type: String, default: "" },
    "Play area": { type: String, default: "" },
    "Fire extinguishers": { type: String, default: "" },
    "Emergency exits": { type: String, default: "" },
    "View": { type: String, default: "" },
    "Corridors": { type: String, default: "" },
    "Staircases": { type: String, default: "" },
    "Bus parking": { type: String, default: "" },
    "Night lighting": { type: String, default: "" },
    "Review": { type: String, default: "" },
    score: { type: Number, default: 0 },
}, { _id: false });

const FinalReviewSchema = new mongoose.Schema({
    "Overall hotel score": { type: String, default: "0" },
    "Strengths": { type: String, default: "" },
    "Weaknesses": { type: String, default: "" },
    "Critical observations": { type: String, default: "" },
    score: { type: Number, default: 0 },
}, { _id: false });

const recciSchema = new mongoose.Schema({
    schoolName: { type: String, required: [true, "School/Hotel Name is required"] },
    coordinatorName: { type: String, required: [true, "Coordinator Name is required"] },
    travelDate: { type: String, required: [true, "Travel Date is required"] },
    location: { type: String, required: [true, "Location is required"] },
    "Resort Score": { type: Number, default: 0 },

    "Location": LocationSchema,
    "Exterior": ExteriorSchema,
    "Reception": ReceptionSchema,
    "Rooms": RoomsSchema,
    "Bathrooms": BathroomsSchema,
    "Dining": DiningSchema,
    "Kitchen": KitchenSchema,
    "Food": FoodSchema,
    "Safety": SafetySchema,
    "Activities": ActivitiesSchema,
    "Medical": MedicalSchema,
    "Staff": StaffSchema,
    "Commercial": CommercialSchema,
    "Image documentation": ImagedocumentationSchema,
    "Final Review": FinalReviewSchema,
}, { timestamps: true });


recciSchema.pre("save", function() {
    const doc = this as any;
    const categoriesList = [
        "Location", "Exterior", "Reception", "Rooms", "Bathrooms", "Dining", "Kitchen",
        "Food", "Safety", "Activities", "Medical", "Staff", "Commercial", "Final Review"
    ];

    let resortScore = 0;

    for (const cat of categoriesList) {
        if (doc[cat]) {
            let totalScore = 0;
            let count = 0;
            // Iterate through the keys defined in the schema for this category
            // Iterate through the keys populated by Mongoose (which includes defaults)
            const paths = Object.keys(doc[cat].toJSON());
            
            for (const key of paths) {
                if (key !== "Review" && key !== "score" && key !== "_id" && key !== "Strengths" && key !== "Weaknesses" && key !== "Critical observations") {
                    const val = doc[cat][key];
                    if (!isNaN(Number(val))) {
                        totalScore += Number(val);
                        count++;
                    }
                }
            }
            if (count > 0) {
                doc[cat].score = Number((totalScore / count).toFixed(1));
            } else {
                doc[cat].score = 0;
            }
            resortScore += doc[cat].score;
        }
    }
    
    doc["Resort Score"] = Number(resortScore.toFixed(1));
});

if (mongoose.models.Recci) {
    delete mongoose.models.Recci;
}
const RecciModel = mongoose.model("Recci", recciSchema);

export default RecciModel;
