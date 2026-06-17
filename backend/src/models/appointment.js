import pool from "../config/db.js";

export const findAll = async () => {
  const [rows] = await pool.query(`
    SELECT a.id, a.name, a.date, a.time, a.service_id,
           s.name AS service_name, s.duration AS service_duration
    FROM appointments a
    JOIN services s ON a.service_id = s.id
    ORDER BY a.date, a.time
  `);
  return rows;
};

export const findById = async (id) => {
  const [rows] = await pool.query(`
    SELECT a.id, a.name, a.date, a.time, a.service_id,
           s.name AS service_name, s.duration AS service_duration
    FROM appointments a
    JOIN services s ON a.service_id = s.id
    WHERE a.id = ?
  `, [id]);
  return rows[0];
};

export const create = async (name, date, time, serviceId) => {
  const [result] = await pool.query(
    "INSERT INTO appointments (name, date, time, service_id) VALUES (?, ?, ?, ?)",
    [name, date, time, serviceId]
  );
  return { id: result.insertId, name, date, time, service_id: serviceId };
};

export const update = async (id, name, date, time, serviceId) => {
  await pool.query(
    "UPDATE appointments SET name = ?, date = ?, time = ?, service_id = ? WHERE id = ?",
    [name, date, time, serviceId, id]
  );
  return { id, name, date, time, service_id: serviceId };
};

export const remove = async (id) => {
  const [result] = await pool.query("DELETE FROM appointments WHERE id = ?", [id]);
  return result.affectedRows > 0;
};
