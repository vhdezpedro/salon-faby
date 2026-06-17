import { useState } from "react";
import { services } from "../utilities/servicios";
import { hasConflict } from "../utilities/validateConflict";

function Modal({ setShowModal, setAppointments, theme, appointments }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState("");
  const [duration, setDuration] = useState(0);
  const [conflictError, setConflictError] = useState("");

  const handleServiceChange = (e) => {
    const selectedService = services.find(
      (service) => service.name === e.target.value,
    );
    setDuration(selectedService.duration);
    setService(selectedService.name);
  };

  const handleApptSubmit = () => {
    if (!name || !date || !time || !service) {
      setConflictError("Todos los campos son obligatorios");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      name,
      date,
      time,
      service: {
        name: service,
        duration,
      },
    };

    if (hasConflict(newAppointment, appointments)) {
      setConflictError("Ya existe una cita en ese horario");
      return;
    }

    setConflictError("");
    setAppointments((prev) => {
      const sorted = [...prev, newAppointment];
      return sorted.sort(
        (a, b) =>
          new Date(a.date + " " + a.time) - new Date(b.date + " " + b.time),
      );
    });
    setShowModal(false);
  };

  return (
    <div
      className="fixed inset-0 w-full h-full font-['Comfortaa'] bg-black/50 flex items-center justify-center text-sm"
      onClick={() => setShowModal(false)}
    >
      <div
        className={`${theme === "light" ? "bg-(--bg-light) text-(--text-light)" : "bg-(--bg-dark) text-(--text-dark)"} p-5 rounded-[10px] w-60 justify-start`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3
          className={`font-bold text-center text-base mb-8 pb-2 border-b ${theme === "light" ? "border-b-gray-300" : "border-b-gray-600"}`}
        >
          Nueva Cita
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
              name="minutes"
              onChange={handleServiceChange}
            >
              <option value="">Selecionar</option>
              {services.map((service, i) => (
                <option key={i} value={service.name}>
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
              value={duration}
              onChange={(e) => {
                setDuration(e.target.value);
              }}
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
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </button>
          </div>
          {conflictError && (
            <p className="text-red-500 text-[10px] text-center mt-2 w-full">{conflictError}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
