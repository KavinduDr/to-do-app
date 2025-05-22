import express, { Request, Response, NextFunction } from 'express';
export const app = express();
require("dotenv").config();
import cors from "cors";
import { errorMiddleware } from './middlewares/task.middleware';
import taskRouter from './routes/task.route';

// Parse the ORIGIN from the .env file
const allowedOrigins = process.env.ORIGIN ? JSON.parse(process.env.ORIGIN) : ['http://localhost:3000'];

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// app.use((req, res, next) => {
//     console.log(req.path);
//     console.log(req.headers);
//     console.log(req.body);
//     next();
// })

app.use("/api/v1", taskRouter);

// API for testing purposes
app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
    });
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
});

app.use(errorMiddleware);
export default app;

function cookieParser(): any {
    throw new Error('Function not implemented.');
}
