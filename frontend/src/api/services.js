const API_URL = "http://localhost:3001/api/services";

export const fetchServices = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener servicios");
  return res.json();
};

export const createService = async (name, duration) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, duration }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error al crear servicio");
  }
  return res.json();
};

export const updateService = async (id, name, duration) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, duration }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error al actualizar servicio");
  }
  return res.json();
};

export const deleteService = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error al eliminar servicio");
  }
  return res.json();
};
