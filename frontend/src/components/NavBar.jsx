import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { months } from "../utilities/months";

// Colocar el mes y el año en el NavBar, y eliminarlo del DayView y MonthView

function NavBar(props) {
  const { currentMonth, currentYear } = props;
  return (
    <div className="nav-bar">
      <div></div>
      {/* <FontAwesomeIcon icon={faSliders} className="menu-btn" /> */}
      {/*       <div className="nav-menu">
        <div className="nav-item">Mes</div>
        <div className="nav-item">Día</div>
      </div> */}
      <div className="nav-header">
        <h1>
          {months[currentMonth]}, {currentYear}
        </h1>
      </div>
    </div>
  );
}

export default NavBar;
