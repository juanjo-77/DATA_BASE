import { Router } from "express";
import { create, deleteById, getAll } from '../controllers/doctor.controller.js';


export const doctorRoutes = Router();

doctorRoutes.get('/', getAll);
doctorRoutes.post('/', create);
doctorRoutes.delete('/:id', deleteById);