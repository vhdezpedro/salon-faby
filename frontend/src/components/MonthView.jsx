import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { daysOfWeek } from "../utilities/daysOfWeek";
import { months } from "../utilities/months";
import DayView from "./DayView";
import { Navigate, Route, useNavigate } from "react-router";
import NavBar from "./NavBar";

function MonthView(props) {
  const {
    appointments,
    currentDay,
    currentMonth,
    currentYear,
    setCurrentMonth,
    setCurrentYear,
  } = props;
  const [touchStart, setTouchStart] = useState(null);

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    setCurrentYear((prev) => (currentMonth === 0 ? prev - 1 : prev));
  };
  const nextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    setCurrentYear((prev) => (currentMonth === 11 ? prev + 1 : prev));
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) nextMonth();
      else prevMonth();
    }
    setTouchStart(null);
  };

  const navigate = useNavigate();

  return (
    <div
      className="monthly-view"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <NavBar currentMonth={currentMonth} currentYear={currentYear} />
      <div className="days-of-week">
        {daysOfWeek.map((day) => (
          <div key={day} className="days">
            {day}
          </div>
        ))}
      </div>
      <div className="days-grid">
        {[...Array(firstDayOfMonth).keys()].map((_, index) => (
          <div className="day-empty" key={`empty-${index}`}></div>
        ))}
        {[...Array(daysInMonth).keys()].map((day) => (
          <div
            className="day"
            key={`month-day-${day}`}
            onClick={() => {
              navigate(`/day/${currentYear}/${currentMonth}/${day + 1}`);
            }}
          >
            <span
              className={`day-number ${day + 1 === currentDay.getDate() && currentMonth === currentDay.getMonth() && currentYear === currentDay.getFullYear() ? "is-today" : ""}`}
            >
              {day + 1}
            </span>
            <div className="day-appointments">
              {appointments &&
                appointments
                  .filter((appt) => {
                    const apptDate = new Date(appt.date);
                    return (
                      apptDate.getDate() === day &&
                      apptDate.getMonth() === currentMonth &&
                      apptDate.getFullYear() === currentYear
                    );
                  })
                  .map((appt) => (
                    <div key={appt.id} className="appointment">
                      <span>
                        {appt.name}-{appt.service.name}
                      </span>
                    </div>
                  ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MonthView;
