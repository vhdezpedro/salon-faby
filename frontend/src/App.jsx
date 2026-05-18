import { Route, Routes } from "react-router";
import MonthView from "./components/MonthView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSliders } from "@fortawesome/free-solid-svg-icons";
import Modal from "./components/Modal";
import { useState } from "react";
import DayView from "./components/DayView";
import Menu from "./components/Menu";

function App() {
  const currentDay = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDay.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDay.getFullYear());

  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  return (
    <div className="min-h-screen bg-(--bg-light) text-(--text-light)">
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
            />
          }
        />
      </Routes>
      {showModal && (
        <Modal setShowModal={setShowModal} setAppointments={setAppointments} />
      )}
      <FontAwesomeIcon
        className="fixed bottom-5 right-5 p-3.75 rounded-[13px] bg-(--add-btn-light) text-(--text-dark)"
        icon={faPlus}
        onClick={() => {
          setShowModal(true);
        }}
      />
    </div>
  );
}

export default App;
