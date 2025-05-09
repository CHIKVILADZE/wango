"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserParkings = exports.loginUser = exports.registerUser = void 0;
const prisma_1 = require("../prisma");
const registerUser = async (req, res) => {
    const { email, fullName, address, carPlate } = req.body;
    try {
        const user = await prisma_1.prisma.user.create({
            data: { email, fullName, address, carPlate },
        });
        return res.status(201).json(user);
    }
    catch (err) {
        return res.status(400).json({ error: 'User already exists or input invalid.' });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { email, carPlate } = req.body;
    const user = await prisma_1.prisma.user.findFirst({ where: { email, carPlate } });
    if (!user)
        return res.status(401).json({ error: 'Invalid credentials' });
    return res.json(user);
};
exports.loginUser = loginUser;
const getUserParkings = async (req, res) => {
    const { email } = req.params;
    const user = await prisma_1.prisma.user.findUnique({
        where: { email },
        include: { parkings: true },
    });
    if (!user)
        return res.status(404).json({ error: 'User not found' });
    return res.json(user.parkings);
};
exports.getUserParkings = getUserParkings;
