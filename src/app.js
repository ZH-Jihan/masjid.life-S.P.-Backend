import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors({
    origin:'*',
    credentials:true
}));

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// Import routes
import transcationRouter from './routes/transaction.routes.js';
import userRouter from './routes/user.routes.js';




//Call routes
app.use("/api/v1/users", userRouter)
app.use("/api/v1/transaction", transcationRouter )


export { app };

