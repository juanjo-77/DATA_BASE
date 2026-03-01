import { pool } from "../config/database/pgconfig.js";
import { Specialty } from "../models/specialty.models.js";
import { HttpError } from "../Errors/HttpError.js";

export const createSpecialty = async (name, id = null) => {

    let query = `INSERT INTO test.specialty (name) VALUES ($1) RETURNING *`
    let values = [name]

    if (id !== null) {
        query = `INSERT INTO test.specialty (id, name) VALUES ($1, $2) RETURNING *`
        values = [id, name]
    }

    try {
        const response = await pool.query(query, values);
        return response.rows[0];
    } catch (error) {
        console.error(`Erro al crear la especialidad: ${error}`)
        throw error;
    }

}

export const getAllSpecialitys = async () => {

    const query = `select s.* from test.specialty s`;

    try {
        const response = await pool.query(query);
        return response;
    } catch (error) {
        console.error('Error al obtener las especialidades:', error);
        throw error;
    }

}

export const deleteSpeciality = async (id) => {

    const query = 'DELETE FROM test.specialty WHERE id = $1 RETURNING id, name';
    const values = [id]

    try {
        const response = await pool.query(query, values);

        if (response.rowCount === 0) {
            throw new HttpError("La especialidad que intenta eliminar no existe", 404)
        }

        // Guardar registro en Mongo DB
        const specialtyDeleted = new Specialty(response.rows[0]);
        await specialtyDeleted.save()

        return response;
    } catch (error) {
        console.error('Error al eliminar una especialidad')
        throw error;
    }
}


export const recoverySpecialty = async (specialtyName) => {
    try {
        // 1. Obtener la especialidad a recuperar de MongoDB
        const specialtyDeleted = await Specialty.findOne({ name: specialtyName })

        // 2. Intentar guardar en postgres
        const newSpecialty = await createSpecialty(specialtyDeleted.name, specialtyDeleted.id)

        // 3. Si se guarda en postgres lo elimino de MongoDB
        await Specialty.deleteOne({ name: specialtyName })

        return newSpecialty

    } catch (error) {
        throw new HttpError("No se pudo recuperar la especialidad");
    }

}