"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopParking = exports.startParking = void 0;
const prisma_1 = require("../prisma");
const calculatePrice = (cityName, start, end) => {
    const durationHours = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60));
    if (cityName === 'New York City')
        return durationHours * 5;
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
const startParking = async (req, res) => {
    const { userId, areaId } = req.body;
    const parking = await prisma_1.prisma.parking.create({
        data: { userId, areaId, startTime: new Date() },
    });
    res.status(201).json(parking);
};
exports.startParking = startParking;
const stopParking = async (req, res) => {
    const { parkingId } = req.body;
    const parking = await prisma_1.prisma.parking.findUnique({ where: { id: parkingId }, include: { area: { include: { city: true } } } });
    if (!parking || parking.endTime)
        return res.status(400).json({ error: 'Invalid parking session' });
    const endTime = new Date();
    const totalPrice = calculatePrice(parking.area.city.name, parking.startTime, endTime);
    const updated = await prisma_1.prisma.parking.update({
        where: { id: parkingId },
        data: { endTime, totalPrice },
    });
    res.json(updated);
};
exports.stopParking = stopParking;
