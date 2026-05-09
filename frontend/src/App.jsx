import { Route, Routes } from "react-router";
import MonthView from "./components/MonthView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSliders } from "@fortawesome/free-solid-svg-icons";
import Modal from "./components/Modal";
import { useState } from "react";
import DayView from "./components/DayView";

function App() {
  const currentDay = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDay.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDay.getFullYear());

  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  console.log(appointments);

  return (
    <>
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
        className="add-btn"
        icon={faPlus}
        onClick={() => {
          setShowModal(true);
        }}
      />
    </>
  );
}

export default App;
