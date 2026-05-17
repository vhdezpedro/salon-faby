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

  const [touchStart, setTouchStart] = useState(null);
  const { year, month, day } = useParams();
  const [actualDay, setActualDay] = useState(parseInt(day));
  const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
  const prevLastDay = new Date(currentYear, currentMonth, 0).getDate();
  const dayNumber = new Date(currentYear, currentMonth, actualDay).getDay();

  console.log(actualDay === 1 && currentMonth === 0);
  console.log(actualDay === 1 && currentMonth !== 0);
  console.log(currentMonth, lastDay, prevLastDay);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const prevDay = () => {
    setActualDay((prev) => (prev === 1 ? prevLastDay : prev - 1));
    setCurrentMonth((prev) => {
      if (actualDay === 1 && prev === 0) return 11;
      else if (actualDay === 1 && prev !== 0) return (prev = prev - 1);
      else return prev;
    });
    setCurrentYear((prev) => (currentMonth === 0 ? prev - 1 : prev));
  };
  const nextDay = () => {
    setActualDay((prev) => (prev === lastDay ? 1 : prev + 1));
    setCurrentMonth((prev) => {
      if (actualDay === lastDay && prev === 11) return 0;
      else if (actualDay === lastDay && prev !== 11) return prev + 1;
      else return prev;
    });
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
  };

  console.log(appointments);

  return (
    <div
      className="daily-view"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <NavBar currentMonth={currentMonth} currentYear={currentYear} />
      <div className="day-grid">
        <div className="actual-day">
          <span>{daysOfWeek[dayNumber]}</span>
          <span
            className={`span-number ${
              actualDay == currentDay.getDate() &&
              currentMonth == currentDay.getMonth() &&
              currentYear == currentDay.getFullYear()
                ? "is-today"
                : ""
            }`}
          >
            {actualDay}
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
