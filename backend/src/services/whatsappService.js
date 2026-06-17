import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

// const client = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN,
// );

const FROM = process.env.TWILIO_WHATSAPP_FROM;

const formatPhone = (phone) => {
  if (!phone) return null;
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("52")) return `whatsapp:+${cleaned}`;
  return `whatsapp:+52${cleaned}`;
};

export const sendConfirmation = async (
  name,
  phone,
  date,
  time,
  serviceName,
) => {
  const to = formatPhone(phone);
  if (!to) return null;

  const formattedDate = new Date(date + "T00:00:00").toLocaleDateString(
    "es-MX",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  const body =
    `Hola ${name}, tu cita en Salon Faby ha sido confirmada.\n\n` +
    `Fecha: ${formattedDate}\n` +
    `Hora: ${time}\n` +
    `Servicio: ${serviceName}\n\n` +
    `Te esperamos. Si necesitas cancelar o reprogramar, avisanos con anticipacion.`;

  try {
    const message = await client.messages.create({ from: FROM, to, body });
    return message.sid;
  } catch (error) {
    console.error("Error al enviar WhatsApp de confirmacion:", error.message);
    return null;
  }
};

export const sendReminder = async (name, phone, date, time, serviceName) => {
  const to = formatPhone(phone);
  if (!to) return null;

  const formattedDate = new Date(date + "T00:00:00").toLocaleDateString(
    "es-MX",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
    },
  );

  const body =
    `Hola ${name}, te recordamos tu cita en Salon Faby manana.\n\n` +
    `Fecha: ${formattedDate}\n` +
    `Hora: ${time}\n` +
    `Servicio: ${serviceName}\n\n` +
    `Nos vemos pronto.`;

  try {
    const message = await client.messages.create({ from: FROM, to, body });
    return message.sid;
  } catch (error) {
    console.error("Error al enviar WhatsApp de recordatorio:", error.message);
    return null;
  }
};
