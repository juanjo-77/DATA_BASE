import { Router } from "express";
import { create } from "../controllers/appoinment.controller.js";

export const appointmentRoutes = Router();

appointmentRoutes.post('/', create)