// import express from 'express';
// import cors from 'cors';

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Basic health check route
// app.get('/health', (req, res) => {
//   res.status(200).json({ status: 'ok', message: 'Server is healthy' });
// });

// export default app;

import express from 'express'
import cors from 'cors'
import auth from './routes/api/auth/auth.route'

import errorHandler from '@/middlewares/error.middleware'

const app = express();

//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//routes
app.use("/api/v1/auth", auth)


//error middleware
app.use(errorHandler)

// Basic healtt check up route
app.get("/health", (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is healthy' })
})

export default app