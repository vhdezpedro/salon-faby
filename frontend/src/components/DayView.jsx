import React, { useState } from "react";
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

  /*   const [actualDay, setActualDay] = useState(currentDay.getDate());
  const [touchStart, setTouchStart] = useState(null); */
  const { year, month, day } = useParams();

  const dayNumber = new Date(year, month, day).getDay();

  /*   const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const prevDay = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    setCurrentYear((prev) => (currentMonth === 0 ? prev - 1 : prev));
  };
  const nextDay = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    setCurrentYear((prev) => (currentMonth === 11 ? prev + 1 : prev));
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) nextDay();
      else prevDay();
    }
    setTouchStart(null);
  }; */

  console.log(appointments);

  return (
    <div
      className="daily-view"
      /* onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd} */
    >
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
        {appointments &&
          appointments
            .filter((appt) => {
              const apptDate = new Date(appt.date);
              return (
                apptDate.getDate() + 1 == day &&
                apptDate.getMonth() == month &&
                apptDate.getFullYear() == year
              );
            })
            .map((appt) => {
              const apptHour = parseInt(appt.time.split(":")[0]);
              const apptMin = parseInt(appt.time.split(":")[1]);
              const top = apptHour * 22 + (apptMin / 60) * 22;
              const height = appt.service.duration * 0.333;

              console.log(apptHour, apptMin, top, height);
              return (
                <div
                  key={appt.id}
                  style={{
                    "--my-top": `${top}px`,
                    "--my-height": `${height}px`,
                  }}
                  className="hour-appt"
                >
                  {appt.name}-{appt.service.name}
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default DayView;
