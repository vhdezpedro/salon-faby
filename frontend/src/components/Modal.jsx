// import { hours, minutes } from "../utilities/hrs-min";
import { useState } from "react";
import { services } from "../utilities/servicios";

function Modal({ setShowModal, setAppointments }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState("");
  const [duration, setDuration] = useState(0);

  const handleServiceChange = (e) => {
    const selectedService = services.find(
      (service) => service.name === e.target.value,
    );
    setDuration(selectedService.duration);
    setService(selectedService.name);
  };

  const handleApptSubmit = () => {
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
    <div className="modal" onClick={() => setShowModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Nueva Cita</h3>
        <form action="">
          <div className="modal-name">
            <label>Nombre:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="modal-name">
            <label>Fecha:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="modal-name">
            <label>Hora:</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="modal-name">
            <label>Servicio:</label>
            <select name="minutes" onChange={handleServiceChange}>
              <option value="">Selecionar</option>
              {services.map((service, i) => (
                <option key={i} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
          <div className="modal-name">
            <label>Tiempo:</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => {
                setDuration(e.target.value);
              }}
              readOnly
            />
          </div>
          <div className="modal-btn">
            <button onClick={handleApptSubmit}>Aceptar</button>
            <button onClick={() => setShowModal(false)}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
