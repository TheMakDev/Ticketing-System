import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

import connectDB from './configs/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// CORS Configuration
const allowedOrigins = ['hhttps://ticketing-system-heh9.onrender.com'];  // You can add other origins here as needed
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);  // Allow the request
    } else {
      callback(new Error('Not allowed by CORS'), false);  // Deny the request
    }
  },
  credentials: true,  // Allow cookies to be sent and received
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/', (req, res) => res.send("API Working"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Error handling middleware for unknown routes
app.use((req, res, next) => {
  res.status(404).send('Route not found');
});

// Start the server
app.listen(port, () => console.log(`✅ Server started on PORT: ${port}`));
