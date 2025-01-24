import cors from 'cors';
import express from 'express';
import globalErrorHandler from './middlewares/globelErrorHandler';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Masjid.life server is running');
});

// Global Error Handler
globalErrorHandler;

export default app;
