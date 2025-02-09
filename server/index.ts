import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ticketRoutes from './src/features/tickets/controllers/ticket.controller';
import path from 'path';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const __filename = process.argv[1];
const __dirname = path.dirname(__filename);

// Add this before your routes
app.use(express.static(path.join(__dirname, '../../client/dist')));

// Routes
app.use('/api', ticketRoutes);

// Add this after all your API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 