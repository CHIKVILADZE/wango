import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { userRouter } from './routes/user.routes';
import { cityRouter } from './routes/city.routes';
import { parkingRouter } from './routes/parking.routes';


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/cities', cityRouter);
app.use('/api/parking', parkingRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));