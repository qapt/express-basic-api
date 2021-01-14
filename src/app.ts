import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './components/User/routes';
import { errorHandler } from './errors/errorHandler';

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routes
app.use('/accounts', userRoutes);

// Error handler, must be last middleware
app.use(errorHandler);

export default app;
