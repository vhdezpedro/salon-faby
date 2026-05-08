import { Route, Routes } from "react-router";
import MonthView from "./components/MonthView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSliders } from "@fortawesome/free-solid-svg-icons";
import Modal from "./components/Modal";
import { useState } from "react";
import DayView from "./components/DayView";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  console.log(appointments);

  return (
    <>
      <FontAwesomeIcon icon={faSliders} className="menu-btn" />
      {/*       <div className="nav-menu">
        <div className="nav-item">Mes</div>
        <div className="nav-item">Día</div>
      </div> */}
      <Routes>
        <Route index element={<MonthView appointments={appointments} />} />
        <Route
          path="day/:year/:month/:day"
          element={<DayView appointments={appointments} />}
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
