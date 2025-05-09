"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCities = void 0;
const prisma_1 = require("../prisma");
const getAllCities = async (_req, res) => {
    const cities = await prisma_1.prisma.city.findMany({ include: { parkingAreas: true } });
    res.json(cities);
};
exports.getAllCities = getAllCities;
