import express from 'express';
import connectDB from './config/db.js';
import 'dotenv/config';
import cors from 'cors';
import UserRouter from './routes/userRouter.js';
// import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 4000;
await connectDB();

const allowedOrigins = ['http://localhost:5173']

app.use(express.json());
// app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));

app.get('/', (req, res)=>{
    res.send('Api is working');
})
app.use('/api/user',UserRouter)

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})

export default app;

