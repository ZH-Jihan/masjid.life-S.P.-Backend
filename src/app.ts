import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import globalErrorHandler from './middlewares/globelErrorHandler';
import notFoundRoutes from './middlewares/notFoundRoutes';
import router from './routes';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Masjid.life server is running');
});

// Handle All Api Routes
app.use('/api/v2', router);

// Global Error Handler
app.use(globalErrorHandler);

// Handle Not Found routes
app.use((req: Request, res: Response, next: NextFunction) => {
  notFoundRoutes(req, res, next);
});

export default app;
