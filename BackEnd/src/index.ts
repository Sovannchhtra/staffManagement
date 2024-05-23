import express, { Application } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import staffRoute from './routes/staff.route';
// connect database
import './database/conDB';

const app:Application = express();
app.use(express.json());
app.use(cors());
dotenv.config();


app.use('/api/v1',staffRoute);

const PORT = process.env.PORT || 8081;
app.listen(PORT,():void=>{
     console.log(`Server running on port http://localhost:${PORT}`);
});