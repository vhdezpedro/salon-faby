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
      className="px-2 overflow-x-auto"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <NavBar
        currentMonth={currentMonth}
        currentYear={currentYear}
        previous={prevMonth}
        next={nextMonth}
      />
      <div className="grid grid-cols-7 justify-center items-center text-xs pb-1.5">
        {daysOfWeek.map((day) => (
          <div key={day} className="w-full flex justify-center">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {[...Array(firstDayOfMonth).keys()].map((_, index) => (
          <div key={`empty-${index}`}></div>
        ))}
        {[...Array(daysInMonth).keys()].map((day) => (
          <div
            className="aspect-1/1.5 text-center rounded-md bg-(--day-bar-light) pt-0.5 overflow-hidden"
            key={`month-day-${day}`}
            onClick={() => {
              navigate(`/day/${currentYear}/${currentMonth}/${day + 1}`);
            }}
          >
            <span
              className={`flex w-5 h-5 items-center justify-center text-center font-['Comfortaa'] text-[10px] font-semibold ${day + 1 === currentDay.getDate() && currentMonth === currentDay.getMonth() && currentYear === currentDay.getFullYear() ? "bg-(--today) rounded-full" : ""}`}
            >
              {day + 1}
            </span>
            <div className="flex flex-col gap-px my-px rounded-xl">
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
                    <div
                      key={appt.id}
                      className="bg-(--appointment-light) text-left text-[8px] rounded-sx"
                    >
                      <span className="block min-w-0 whitespace-nowrap overflow-hidden">
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
