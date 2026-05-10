import React from "react";
import { useParams } from "react-router";
import { months } from "../utilities/months";
import { daysOfWeek } from "../utilities/daysOfWeek";
import { hours } from "../utilities/hrs-min";
import NavBar from "./NavBar";

function DayView(props) {
  const {
    appointments,
    currentDay,
    currentMonth,
    currentYear,
    setCurrentMonth,
    setCurrentYear,
  } = props;
  const { year, month, day } = useParams();

  const dayNumber = new Date(year, month, day).getDay();

  return (
    <div className="daily-view">
      <NavBar currentMonth={month} currentYear={year} />
      <div className="day-grid">
        <div className="actual-day">
          <span>{daysOfWeek[dayNumber]}</span>
          <span
            className={`span-number ${
              day == currentDay.getDate() &&
              month == currentDay.getMonth() &&
              year == currentDay.getFullYear()
                ? "is-today"
                : ""
            }`}
          >
            {day}
          </span>
        </div>
      </div>
      <div className="day-grid-hour">
        {hours.map((hour, index) => {
          return (
            <>
              <span key={hour} className="actual-hour">
                {hour}
              </span>
              <span key={`appt-${index}`} className="hour-appointments"></span>
            </>
          );
        })}
        <div className="prueba-0">Hola</div>
      </div>
    </div>
  );
}

export default DayView;
