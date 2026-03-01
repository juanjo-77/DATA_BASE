import mongoose from "mongoose";

export const specialtySchema = new mongoose.Schema(
    {
        id: String,
        name: String
    },
    {
        timestamps: true
    }
)

export const Specialty = mongoose.model('Specialty', specialtySchema);