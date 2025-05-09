import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const registerUser = async (req: Request, res: Response) => {
  const { email, fullName, address, carPlate } = req.body;

  try {
    const user = await prisma.user.create({
      data: { email, fullName, address, carPlate },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: 'User already exists or input invalid.' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, carPlate } = req.body;

  const user = await prisma.user.findFirst({
    where: { email, carPlate },
  });

  if (!user) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  res.json(user);
};

export const getUserParkings = async (req: Request, res: Response) => {
  const { email } = req.params;

  const user = await prisma.user.findUnique({
    where: { email },
    include: { parkings: true },
  });

  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  res.json(user.parkings);
};
