import React, { Fragment, useState } from "react";
import { useParams } from "react-router";
import { months } from "../utilities/months";
import { daysOfWeek } from "../utilities/daysOfWeek";
import { hours } from "../utilities/hrs-min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import NavBar from "./NavBar";

function DayView(props) {
  const {
    appointments,
    currentDay,
    currentMonth,
    currentYear,
    setCurrentMonth,
    setCurrentYear,
    setShowModal,
    setEditingAppointment,
    deleteAppointment,
    theme,
  } = props;

  const [touchStart, setTouchStart] = useState(null);
  const { year, month, day } = useParams();
  const [actualDay, setActualDay] = useState(parseInt(day));
  const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
  const prevLastDay = new Date(currentYear, currentMonth, 0).getDate();
  const dayNumber = new Date(currentYear, currentMonth, actualDay).getDay();

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

  return (
    <div
      className="px-2 overflow-hidden h-screen"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <NavBar
        currentMonth={currentMonth}
        currentYear={currentYear}
        previous={prevDay}
        next={nextDay}
      />
      <div className="w-10 flex flex-col items-center justify-center font-['Comfortaa'] text-sm font-bold">
        <span>{daysOfWeek[dayNumber]}</span>
        <span
          className={`flex w-6.25 h-6.25 items-center justify-center text-center font-['Comfortaa'] text-sm ${
            actualDay == currentDay.getDate() &&
            currentMonth == currentDay.getMonth() &&
            currentYear == currentDay.getFullYear()
              ? "bg-(--today) rounded-full"
              : ""
          }`}
        >
          {actualDay}
        </span>
      </div>
      <div className="relative grid grid-cols-[40px_1fr] gap-px mt-1 h-[calc(100%-120px)] overflow-y-auto scrollbar-thumb-transparent">
        {hours.map((hour, index) => {
          return (
            <Fragment key={`hour-${index}`}>
              <span
                key={hour}
                className="flex flex-col items-center justify-center font-['Comfortaa'] text-[10px]"
              >
                {hour}
              </span>
              <span
                key={`appt-${index}`}
                className={`flex flex-col rounded-xs mr-0.5 ${theme === "light" ? "bg-(--day-bar-light)" : "bg-(--day-bar-dark)"} h-8 `}
              ></span>
            </Fragment>
          );
        })}
        {appointments &&
          appointments
            .filter((appt) => {
              const [y, m, d] = appt.date.split("T")[0].split("-").map(Number);
              return (
                d === actualDay && m - 1 === currentMonth && y === currentYear
              );
            })
            .map((appt) => {
              const apptHour = parseInt(appt.time.split(":")[0]);
              const apptMin = parseInt(appt.time.split(":")[1]);
              const top = apptHour * 33 + (apptMin / 60) * 33;
              const height = appt.service_duration * 0.55;

              return (
                <div
                  key={appt.id}
                  style={{
                    "--my-top": `${top}px`,
                    "--my-height": `${height}px`,
                  }}
                  className="absolute top-(--my-top) left-10.25 w-[calc(100%-65px)] h-(--my-height) bg-(--appointment-light) font-['Comfortaa'] text-[11px] pl-1 content-center rounded-sm cursor-pointer flex items-center justify-between"
                  onClick={() => {
                    setEditingAppointment(appt);
                    setShowModal(true);
                  }}
                >
                  <span className="truncate">
                    {appt.name}-{appt.service_name}
                  </span>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="pr-1.5 text-red-500 hover:text-red-700 shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm("¿Eliminar esta cita?")) {
                        deleteAppointment(appt.id);
                      }
                    }}
                  />
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default DayView;
