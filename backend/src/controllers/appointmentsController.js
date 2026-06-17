import * as Appointment from "../models/appointment.js";
import { sendConfirmation } from "../services/whatsappService.js";

export const getAll = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener citas" });
  }
};

export const getOne = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ error: "Cita no encontrada" });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener cita" });
  }
};

export const create = async (req, res) => {
  try {
    const { name, phone, date, time, service_id } = req.body;
    if (!name || !date || !time || !service_id) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }
    const appointment = await Appointment.create(name, phone || null, date, time, service_id);

    if (phone) {
      const service = await Appointment.getServiceName(service_id);
      sendConfirmation(name, phone, date, time, service?.service_name || "servicio");
    }

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: "Error al crear cita" });
  }
};

export const update = async (req, res) => {
  try {
    const { name, phone, date, time, service_id } = req.body;
    if (!name || !date || !time || !service_id) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }
    const existing = await Appointment.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: "Cita no encontrada" });
    const appointment = await Appointment.update(req.params.id, name, phone || null, date, time, service_id);
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar cita" });
  }
};

export const remove = async (req, res) => {
  try {
    const deleted = await Appointment.remove(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Cita no encontrada" });
    res.json({ message: "Cita eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar cita" });
  }
};
