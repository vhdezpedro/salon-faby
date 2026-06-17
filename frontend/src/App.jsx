import { Route, Routes } from "react-router";
import MonthView from "./components/MonthView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "./components/Modal";
import { useState, useEffect } from "react";
import DayView from "./components/DayView";
import Menu from "./components/Menu";
import {
  fetchAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment as apiDeleteAppointment,
} from "./api/appointments";

function App() {
  const currentDay = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDay.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDay.getFullYear());

  const [showModal, setShowModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);

  const [showMenu, setShowMenu] = useState(false);

  const [theme, setTheme] = useState("light");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments()
      .then(setAppointments)
      .catch((err) => console.error(err));
  }, []);

  const handleCreateAppointment = async (appointmentData) => {
    const newAppt = await createAppointment(
      appointmentData.name,
      appointmentData.date,
      appointmentData.time,
      appointmentData.service_id,
    );
    setAppointments((prev) =>
      [...prev, newAppt].sort(
        (a, b) =>
          new Date(a.date + " " + a.time) - new Date(b.date + " " + b.time),
      ),
    );
  };

  const handleUpdateAppointment = async (id, appointmentData) => {
    const updated = await updateAppointment(
      id,
      appointmentData.name,
      appointmentData.date,
      appointmentData.time,
      appointmentData.service_id,
    );
    setAppointments((prev) =>
      prev.map((appt) => (appt.id === id ? updated : appt)),
    );
  };

  const handleDeleteAppointment = async (id) => {
    await apiDeleteAppointment(id);
    setAppointments((prev) => prev.filter((appt) => appt.id !== id));
  };

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-(--bg-light) text-(--text-light)" : "bg-(--bg-dark) text-(--text-dark)"}`}
    >
      <FontAwesomeIcon
        icon={faBars}
        className="fixed top-3 left-3 text-lg"
        onClick={() => setShowMenu(true)}
      />
      <Menu
        setTheme={setTheme}
        theme={theme}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        currentMonth={currentMonth}
        currentYear={currentYear}
      />
      <Routes>
        <Route
          index
          element={
            <MonthView
              appointments={appointments}
              currentDay={currentDay}
              currentMonth={currentMonth}
              currentYear={currentYear}
              setCurrentMonth={setCurrentMonth}
              setCurrentYear={setCurrentYear}
              theme={theme}
            />
          }
        />
        <Route
          path="day/:year/:month/:day"
          element={
            <DayView
              appointments={appointments}
              currentDay={currentDay}
              currentMonth={currentMonth}
              currentYear={currentYear}
              setCurrentMonth={setCurrentMonth}
              setCurrentYear={setCurrentYear}
              setShowModal={setShowModal}
              setEditingAppointment={setEditingAppointment}
              deleteAppointment={handleDeleteAppointment}
              theme={theme}
            />
          }
        />
      </Routes>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          appointments={appointments}
          editingAppointment={editingAppointment}
          setEditingAppointment={setEditingAppointment}
          onCreate={handleCreateAppointment}
          onUpdate={handleUpdateAppointment}
          theme={theme}
        />
      )}
      <FontAwesomeIcon
        className={`fixed bottom-5 right-5 px-3.5 py-4.5 rounded-[13px] ${theme === "light" ? "bg-(--add-btn-light) text-(--text-dark)" : "bg-(--add-btn-dark) text-(--text-light)"} text-(--text-dark)`}
        icon={faPlus}
        onClick={() => {
          setShowModal(true);
        }}
      />
    </div>
  );
}

export default App;
