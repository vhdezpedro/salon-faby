import pool from "../config/db.js";
import { sendReminder } from "./whatsappService.js";

const CHECK_INTERVAL_MS = 60 * 60 * 1000;

export const checkAndSendReminders = async () => {
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split("T")[0];

    const [appointments] = await pool.query(
      `SELECT a.name, a.phone, DATE_FORMAT(a.date, '%Y-%m-%d') AS date,
              TIME_FORMAT(a.time, '%H:%i') AS time, s.name AS service_name
       FROM appointments a
       JOIN services s ON a.service_id = s.id
       WHERE a.date = ? AND a.phone IS NOT NULL AND a.phone != ''`,
      [dateStr]
    );

    if (appointments.length === 0) return;

    console.log(`Enviando ${appointments.length} recordatorios para ${dateStr}`);

    for (const appt of appointments) {
      await sendReminder(appt.name, appt.phone, appt.date, appt.time, appt.service_name);
    }
  } catch (error) {
    console.error("Error al verificar recordatorios:", error.message);
  }
};

export const startReminderScheduler = () => {
  console.log("Scheduler de recordatorios iniciado (cada 1 hora)");
  checkAndSendReminders();
  setInterval(checkAndSendReminders, CHECK_INTERVAL_MS);
};
