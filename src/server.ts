import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import { connectDB } from './config/db';

// TODO: .env

connectDB();

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
    console.log(`Unhandled Error Rejection: ${err}`);
    server.close(() => process.exit(1));
});
