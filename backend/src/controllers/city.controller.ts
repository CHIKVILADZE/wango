import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const getAllCities = async (_req: Request, res: Response) => {
  const cities = await prisma.city.findMany({ include: { parkingAreas: true } });
  res.json(cities);
};