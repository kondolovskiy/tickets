import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ticketRoutes from './src/features/tickets/controllers/ticket.controller';
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', ticketRoutes);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 