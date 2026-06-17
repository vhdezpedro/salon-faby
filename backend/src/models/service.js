import pool from "../config/db.js";

export const findAll = async () => {
  const [rows] = await pool.query("SELECT * FROM services ORDER BY name");
  return rows;
};

export const findById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM services WHERE id = ?", [id]);
  return rows[0];
};

export const create = async (name, duration) => {
  const [result] = await pool.query(
    "INSERT INTO services (name, duration) VALUES (?, ?)",
    [name, duration],
  );
  return { id: result.insertId, name, duration };
};

export const update = async (id, name, duration) => {
  await pool.query("UPDATE services SET name = ?, duration = ? WHERE id = ?", [
    name,
    duration,
    id,
  ]);
  return { id, name, duration };
};

export const remove = async (id) => {
  const [result] = await pool.query("DELETE FROM services WHERE id = ?", [id]);
  return result.affectedRows > 0;
};
