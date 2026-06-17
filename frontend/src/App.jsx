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

  // Hide menu needs to be fixed, no animation when hiding.
  const [showMenu, setShowMenu] = useState(false);

  const [theme, setTheme] = useState("light");
  const [appointments, setAppointments] = useState([]);

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
              theme={theme}
            />
          }
        />
      </Routes>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          setAppointments={setAppointments}
          appointments={appointments}
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
