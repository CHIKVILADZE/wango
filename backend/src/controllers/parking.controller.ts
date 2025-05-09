import { Request, Response } from 'express';
import { prisma } from '../prisma';

const calculatePrice = (cityName: string, start: Date, end: Date): number => {
  const durationHours = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60));

  if (cityName === 'New York City') return durationHours * 5;

  if (cityName === 'Washington') {
    let price = 0;
    let current = new Date(start);
    while (current < end) {
      const hour = current.getHours();
      price += (hour >= 8 && hour < 20) ? 2 : 5;
      current.setHours(current.getHours() + 1);
    }
    return price;
  }

  return 0; // default
};

export const startParking = async (req: Request, res: Response) => {
  const { userId, areaId } = req.body;
  const parking = await prisma.parking.create({
    data: { userId, areaId, startTime: new Date() },
  });
  res.status(201).json(parking);
};

export const stopParking = async (req: Request, res: Response) => {
  const { parkingId } = req.body;
  const parking = await prisma.parking.findUnique({ where: { id: parkingId }, include: { area: { include: { city: true } } } });

  if (!parking || parking.endTime)
    return res.status(400).json({ error: 'Invalid parking session' });

  const endTime = new Date();
  const totalPrice = calculatePrice(parking.area.city.name, parking.startTime, endTime);

  const updated = await prisma.parking.update({
    where: { id: parkingId },
    data: { endTime, totalPrice },
  });

  res.json(updated);
};