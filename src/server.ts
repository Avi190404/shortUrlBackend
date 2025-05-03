import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import allRoutes from './Routes/allRoutes';
import ConnectToDB from './Config/Dbconfig';
import TEST from './Schema/testSchema';

const app = express();

dotenv.config({path : '.env.local'});
app.use(cors());
app.use(express.json());
app.use('/api', allRoutes);

const PORT = process.env.PORT || 5000;
ConnectToDB();

app.get('/', async (req:Request, res:Response) => {
    const data = await TEST.find({});
    const massage = data.map((item) => item.massage).join(', ');
    res.status(200).json({message: massage});
    return;
})

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
    return;
})