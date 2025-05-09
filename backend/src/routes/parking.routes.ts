import express from 'express';
import { startParking, stopParking } from '../controllers/parking.controller';

export const parkingRouter = express.Router();

parkingRouter.post('/start', startParking);
parkingRouter.post('/stop', stopParking);
