📄 README – Proyecto Base de Datos Gestión Académica – Historia de usuario - 2
1️⃣ Esquema y Base de Datos
    • Esquema: mi_esquema
        ◦ Se creó para mantener las tablas organizadas y no depender del esquema public.
    • Uso: SET search_path TO mi_esquema; asegura que todas las tablas y vistas se creen dentro del esquema correcto.



2️⃣ Tablas
estudiantes
    • Propósito: almacenar información personal y académica de los estudiantes.
    • Columnas:
        ◦ id_estudiante: PK, autoincremental (SERIAL).
        ◦ nombre_completo: obligatorio.
        ◦ correo_electronico: obligatorio y único.
        ◦ genero: obligatorio.
        ◦ identificacion: obligatorio y único.
        ◦ carrera: obligatorio.
        ◦ fecha_nacimiento: obligatorio.
        ◦ fecha_ingreso: obligatorio, debe ser posterior o igual a fecha_nacimiento.
        ◦ estado_academico: agregada con ALTER TABLE para seguimiento de situación académica.

docentes
    • Propósito: almacenar información de los profesores.
    • Columnas:
        ◦ id_docente: PK, autoincremental.
        ◦ nombre_completo: obligatorio.
        ◦ correo_institucional: obligatorio y único.
        ◦ departamento_academico: obligatorio.
        ◦ anios_experiencia: obligatorio, mínimo 0 (CHECK).

cursos
    • Propósito: almacenar información de los cursos ofrecidos.
    • Columnas:
        ◦ id_curso: PK, autoincremental.
        ◦ nombre: obligatorio.
        ◦ codigo: obligatorio y único.
        ◦ creditos: obligatorio, mayor que 0.
        ◦ semestre: obligatorio, entre 1 y 12.
        ◦ id_docente: FK a docentes, ON DELETE RESTRICT.

inscripciones
    • Propósito: relacionar estudiantes con cursos y registrar calificaciones.
    • Columnas:
        ◦ id_inscripcion: PK, autoincremental.
        ◦ id_estudiante: FK a estudiantes, ON DELETE CASCADE.
        ◦ id_curso: FK a cursos, ON DELETE CASCADE.
        ◦ fecha_inscripcion: obligatorio.
        ◦ calificacion_final: entre 0 y 10.



3️⃣ Datos de ejemplo
    • 5 estudiantes, 3 docentes, 4 cursos, 8 inscripciones.
    • Permite probar consultas, agregaciones y relaciones.



4️⃣ Consultas y análisis
JOINs
    • Mostrar estudiantes con cursos y calificaciones:
SELECT e.nombre_completo, c.nombre AS curso, i.calificacion_final
FROM inscripciones i
JOIN estudiantes e ON i.id_estudiante = e.id_estudiante
JOIN cursos c ON i.id_curso = c.id_curso;
Filtrado por experiencia
    • Cursos dictados por docentes con >5 años de experiencia.
Agregaciones
    • Promedio de calificaciones por curso (AVG + GROUP BY).
    • Estudiantes inscritos en más de un curso (COUNT(*) + HAVING).
    • Cursos con más de 2 estudiantes (COUNT(*) + HAVING).



5️⃣ Subconsultas y funciones
    • Promedio de estudiante > promedio general: usa subconsulta y AVG.
    • Carreras con estudiantes en cursos semestre >=2: usa IN + DISTINCT.
    • Indicadores agregados: ROUND(AVG), SUM, MAX, MIN, COUNT.



6️⃣ Vista
    • Nombre: vista_historial_academico
    • Contenido: estudiante, curso, docente, semestre, calificación final.
    • Propósito: facilitar consultas y otorgar permisos de solo lectura.
    • Permisos: GRANT SELECT ON vista_historial_academico TO current_user.



7️⃣ Transacciones
    • BEGIN / SAVEPOINT / ROLLBACK / COMMIT
    • Permite actualizar calificaciones de forma segura y deshacer cambios parciales.
    • Ejemplo:
        ◦ Se cambia una calificación.
        ◦ Se crea un SAVEPOINT.
        ◦ Se hace otra actualización.
        ◦ Se deshace solo hasta el punto de guardado (ROLLBACK TO SAVEPOINT).
        ◦ Se confirma el resto (COMMIT).



8️⃣ Restricciones y seguridad
    • PRIMARY KEY: identifica registros únicos.
    • UNIQUE: evita duplicados en correo e identificación.
    • NOT NULL: campos obligatorios.
    • CHECK: asegura valores lógicos.
    • FOREIGN KEY: relaciones entre tablas.
    • ON DELETE CASCADE/RESTRICT: control de borrado de registros relacionados.
