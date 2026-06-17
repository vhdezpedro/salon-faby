import { useState, useEffect } from "react";
import { fetchServices } from "../api/services";
import { hasConflict } from "../utilities/validateConflict";

function Modal({
  setShowModal,
  theme,
  appointments,
  editingAppointment,
  setEditingAppointment,
  onCreate,
  onUpdate,
}) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [services, setServices] = useState([]);
  const [conflictError, setConflictError] = useState("");

  useEffect(() => {
    fetchServices()
      .then(setServices)
      .catch(() => {});
  }, [appointments]);

  useEffect(() => {
    if (editingAppointment) {
      setName(editingAppointment.name);
      setDate(editingAppointment.date.split("T")[0]);
      setTime(editingAppointment.time);
      setServiceId(editingAppointment.service_id);
    }
  }, [editingAppointment]);

  const selectedService = services.find((s) => s.id === Number(serviceId));

  const handleApptSubmit = async () => {
    if (!name || !date || !time || !serviceId) {
      setConflictError("Todos los campos son obligatorios");
      return;
    }

    const appointmentData = {
      id: editingAppointment?.id,
      name,
      date,
      time,
      service_id: Number(serviceId),
      service_name: selectedService?.name,
      service_duration: selectedService?.duration,
    };

    if (hasConflict(appointmentData, appointments)) {
      setConflictError("Ya existe una cita en ese horario");
      return;
    }

    setConflictError("");

    try {
      if (editingAppointment) {
        await onUpdate(editingAppointment.id, appointmentData);
        setEditingAppointment(null);
      } else {
        await onCreate(appointmentData);
      }
      setShowModal(false);
    } catch {
      setConflictError("Error al guardar la cita");
    }
  };

  const handleClose = () => {
    setEditingAppointment(null);
    setShowModal(false);
  };

  return (
    <div
      className="fixed inset-0 w-full h-full font-['Comfortaa'] bg-black/50 flex items-center justify-center text-sm"
      onClick={handleClose}
    >
      <div
        className={`${theme === "light" ? "bg-(--bg-light) text-(--text-light)" : "bg-(--bg-dark) text-(--text-dark)"} p-5 rounded-[10px] w-60 justify-start`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3
          className={`font-bold text-center text-base mb-8 pb-2 border-b ${theme === "light" ? "border-b-gray-300" : "border-b-gray-600"}`}
        >
          {editingAppointment ? "Editar Cita" : "Nueva Cita"}
        </h3>
        <div className="flex flex-col items-start gap-2">
          <div className="flex gap-1">
            <label className="w-17.5">Nombre:</label>
            <input
              className="w-30 text-[11px] px-1 border rounded-md"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex gap-1">
            <label className="w-17.5">Fecha:</label>
            <input
              className="w-30 text-[11px] px-1  border rounded-md"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="flex gap-1">
            <label className="w-17.5">Hora:</label>
            <input
              className="w-30 text-[11px] px-1  border rounded-md"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="flex gap-1">
            <label className="w-17.5">Servicio:</label>
            <select
              className="w-30 text-[11px] px-1  border rounded-md"
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
            >
              <option value="">Selecionar</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-1">
            <label className="w-17.5">Tiempo:</label>
            <input
              className="w-30 text-[11px] px-1 border rounded-md"
              type="text"
              value={selectedService?.duration || ""}
              readOnly
            />
          </div>
          <div className="pt-4 flex gap-2 self-center">
            <button
              className={`py-1 px-2 h-6.25 w-20 border-none rounded-sm ${theme === "light" ? "bg-(--add-btn-light) text-(--text-dark)" : "bg-(--add-btn-dark) text-(--text-light)"} cursor-pointer`}
              onClick={handleApptSubmit}
            >
              Aceptar
            </button>
            <button
              className={`py-1 px-2 h-6.25 w-20 border-none rounded-sm ${theme === "light" ? "bg-(--add-btn-light) text-(--text-dark)" : "bg-(--add-btn-dark) text-(--text-light)"} cursor-pointer`}
              onClick={handleClose}
            >
              Cancelar
            </button>
          </div>
          {conflictError && (
            <p className="text-red-500 text-[10px] text-center mt-2 w-full">
              {conflictError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
