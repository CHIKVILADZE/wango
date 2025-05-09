"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parkingRouter = void 0;
const express_1 = __importDefault(require("express"));
const parking_controller_1 = require("../controllers/parking.controller");
exports.parkingRouter = express_1.default.Router();
exports.parkingRouter.post('/start', parking_controller_1.startParking);
exports.parkingRouter.post('/stop', parking_controller_1.stopParking);
