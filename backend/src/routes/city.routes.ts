import express from 'express';
import { getAllCities } from '../controllers/city.controller';

export const cityRouter = express.Router();

cityRouter.get('/', getAllCities);