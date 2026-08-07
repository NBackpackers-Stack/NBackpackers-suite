// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import app from './app.js'; // The .js extension is necessary for NodeNext module resolution

// dotenv.config();

// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/checklist';

// async function startServer() {
//   try {
//     // Connect to Database
//     await mongoose.connect(MONGO_URI);
//     console.log('✅ Connected to MongoDB');

//     // Start Express Server
//     app.listen(PORT, () => {
//       console.log(`🚀 Server is running on http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     console.error('❌ Failed to start server:', error);
//     process.exit(1);
//   }
// }

// startServer();

import dotenv from 'dotenv'
import app from './app'
import connectDB from './config/db'

dotenv.config()

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  })
}).catch((error) => {
  console.error("❌ Failed to connect to MongoDB");
})






