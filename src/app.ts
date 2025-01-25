import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import globalErrorHandler from './middlewares/globelErrorHandler';
import notFoundRoutes from './middlewares/notFoundRoutes';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Masjid.life server is running');
});

// Handle All Api Routes

// Global Error Handler
app.use(globalErrorHandler);

// Handle Not Found routes
app.use((req: Request, res: Response, next: NextFunction) => {
  notFoundRoutes(req, res, next);
});

export default app;
