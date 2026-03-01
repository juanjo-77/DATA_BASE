import { pool } from "../config/database/pgconfig.js";
import { HttpError } from "../Errors/HttpError.js";
import { Doctor } from "../models/doctors.models.js";

export const createDoctor = async ({ name, specialty }) => {

    const query = 'CALL test.sp_create_doctor($1::text, $2::text, null, null)';
    const values = [name, specialty];

    try {
        const response = await pool.query(query, values);
        return response.rows[0];
    } catch (error) {
        console.error('Error al crear el doctor:', error);
        throw error;
    }

}

export const deleteDoctor = async (id) => {

    const query = 'DELETE FROM test.doctor WHERE id = $1 RETURNING id, name, specialty_id';
    const values = [id]

    try {

        const response = await pool.query(query, values);

        if (response.rowCount === 0) {
            throw new HttpError("No se elimino el doctor", 500)
        }

        const doctorDeleted = new Doctor(response.rows[0]).save();

        return response;
    } catch (error) {
        console.error('Error al eliminar un doctor')
        throw error;
    }
}

export const getAllDoctors = async () => {

    const query = `select d.* from test.doctor d`;

    try {
        const response = await pool.query(query);
        return response.rows;
    } catch (error) {
        console.error('Error al obtener los doctores:', error);
        throw error;
    }

}