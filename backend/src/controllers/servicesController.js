import * as Service from "../models/service.js";

export const getAll = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener servicios" });
  }
};

export const getOne = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service)
      return res.status(404).json({ error: "Servicio no encontrado" });
    res.json(service);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener servicio" });
  }
};

export const create = async (req, res) => {
  try {
    const { name, duration } = req.body;
    if (!name || !duration) {
      return res
        .status(400)
        .json({ error: "Nombre y duración son requeridos" });
    }
    const service = await Service.create(name, duration);
    res.status(201).json(service);
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ error: "Ya existe un servicio con ese nombre" });
    }
    console.log(error);
    res.status(500).json({ error: "Error al crear servicio" });
  }
};

export const update = async (req, res) => {
  try {
    const { name, duration } = req.body;
    if (!name || !duration) {
      return res
        .status(400)
        .json({ error: "Nombre y duración son requeridos" });
    }
    const existing = await Service.findById(req.params.id);
    if (!existing)
      return res.status(404).json({ error: "Servicio no encontrado" });
    const service = await Service.update(req.params.id, name, duration);
    res.json(service);
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ error: "Ya existe un servicio con ese nombre" });
    }
    console.log(error);
    res.status(500).json({ error: "Error al actualizar servicio" });
  }
};

export const remove = async (req, res) => {
  try {
    const deleted = await Service.remove(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Servicio no encontrado" });
    res.json({ message: "Servicio eliminado" });
  } catch (error) {
    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res
        .status(409)
        .json({ error: "No se puede eliminar: tiene citas asociadas" });
    }
    console.log(error);
    res.status(500).json({ error: "Error al eliminar servicio" });
  }
};
