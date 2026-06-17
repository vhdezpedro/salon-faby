const API_URL = "http://localhost:3001/api/appointments";

export const fetchAppointments = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener citas");
  return res.json();
};

export const createAppointment = async (name, phone, date, time, service_id) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone, date, time, service_id }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error al crear cita");
  }
  return res.json();
};

export const updateAppointment = async (id, name, phone, date, time, service_id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone, date, time, service_id }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error al actualizar cita");
  }
  return res.json();
};

export const deleteAppointment = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error al eliminar cita");
  }
  return res.json();
};
