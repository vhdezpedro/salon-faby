import { Route, Routes } from "react-router";
import MonthView from "./components/MonthView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPlus, faSliders } from "@fortawesome/free-solid-svg-icons";
import Modal from "./components/Modal";
import { useState } from "react";
import DayView from "./components/DayView";
import Menu from "./components/Menu";

function App() {
  const currentDay = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDay.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDay.getFullYear());

  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [tema, setTema] = useState("light");
  const [appointments, setAppointments] = useState([]);

  return (
    <div className="min-h-screen bg-(--bg-light) text-(--text-light)">
      <FontAwesomeIcon
        icon={faBars}
        className="fixed top-3 left-3 text-lg"
        onClick={() => setShowMenu(true)}
      />
      <Menu
        setTema={setTema}
        tema={tema}
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
        className="fixed bottom-5 right-5 px-3.5 py-4.5 rounded-[13px] bg-(--add-btn-light) text-(--text-dark)"
        icon={faPlus}
        onClick={() => {
          setShowModal(true);
        }}
      />
    </div>
  );
}

export default App;
