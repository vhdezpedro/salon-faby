import pool from "../config/db.js";

export const findAll = async () => {
  const [rows] = await pool.query(`
    SELECT a.id, a.name, a.phone, DATE_FORMAT(a.date, '%Y-%m-%d') AS date,
           TIME_FORMAT(a.time, '%H:%i') AS time, a.service_id,
           s.name AS service_name, s.duration AS service_duration
    FROM appointments a
    JOIN services s ON a.service_id = s.id
    ORDER BY a.date, a.time
  `);
  return rows;
};

export const findById = async (id) => {
  const [rows] = await pool.query(`
    SELECT a.id, a.name, a.phone, DATE_FORMAT(a.date, '%Y-%m-%d') AS date,
           TIME_FORMAT(a.time, '%H:%i') AS time, a.service_id,
           s.name AS service_name, s.duration AS service_duration
    FROM appointments a
    JOIN services s ON a.service_id = s.id
    WHERE a.id = ?
  `, [id]);
  return rows[0];
};

export const create = async (name, phone, date, time, serviceId) => {
  const [result] = await pool.query(
    "INSERT INTO appointments (name, phone, date, time, service_id) VALUES (?, ?, ?, ?, ?)",
    [name, phone, date, time, serviceId]
  );
  return { id: result.insertId, name, phone, date, time, service_id: serviceId };
};

export const update = async (id, name, phone, date, time, serviceId) => {
  await pool.query(
    "UPDATE appointments SET name = ?, phone = ?, date = ?, time = ?, service_id = ? WHERE id = ?",
    [name, phone, date, time, serviceId, id]
  );
  return { id, name, phone, date, time, service_id: serviceId };
};

export const remove = async (id) => {
  const [result] = await pool.query("DELETE FROM appointments WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

export const getServiceName = async (serviceId) => {
  const [rows] = await pool.query("SELECT name AS service_name FROM services WHERE id = ?", [serviceId]);
  return rows[0];
};
