import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Menu() {
  return (
    <>
      <FontAwesomeIcon icon={faBars} className="menu-btn" />
      <div className="nav-menu">
        <div className="nav-item">Mes</div>
        <div className="nav-item">Día</div>
      </div>
    </>
  );
}

export default Menu;
