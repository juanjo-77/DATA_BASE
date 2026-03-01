import { Router } from "express";
import { create, deleteById, getAll, recovery } from "../controllers/specialty.controller.js";

export const specialtyRoutes = Router();

specialtyRoutes.post('/', create);
specialtyRoutes.get('/', getAll);
specialtyRoutes.delete('/:id', deleteById);
specialtyRoutes.post('/recovery', recovery)