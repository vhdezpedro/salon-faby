import {
  faCalendarDay,
  faCalendarDays,
  faGear,
  faToggleOff,
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MonthView from "./MonthView";
import { useNavigate } from "react-router";

function Menu(props) {
  const { setTheme, theme, setShowMenu, showMenu, currentMonth, currentYear } =
    props;

  const handleThemeChange = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const navigate = useNavigate();

  return (
    <div
      className={`fixed inset-0 w-full h-full z-10 font-['Comfortaa'] text-sm bg-black/50 ${showMenu ? "visible" : "invisible"}`}
      onClick={() => setShowMenu(false)}
    >
      <div
        className={`fixed inset-0 w-60 h-full ${theme === "light" ? "bg-(--menu-bg-light)" : "bg-(--menu-bg-dark)"} rounded-xl p-3 transition-transform duration-500 ease-in-out ${showMenu ? "translate-x-0" : "-translate-x-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pb-3 border-b border-gray-300 mb-3">
          Calendario - <span className="font-bold">Salón Faby</span>
        </div>
        <div className="flex flex-col gap-2 text-[12px]">
          <span
            onClick={() => {
              navigate("/");
              setShowMenu(false);
            }}
          >
            <FontAwesomeIcon icon={faCalendarDays} /> Mes
          </span>
          <span
            onClick={() => {
              navigate(`/day/${currentYear}/${currentMonth}/1`);
              setShowMenu(false);
            }}
          >
            <FontAwesomeIcon icon={faCalendarDay} /> Día
          </span>
        </div>
        <div className="py-3 mt-3">
          <FontAwesomeIcon icon={faGear} /> Configuración
        </div>
        <div className="flex flex-col gap-2 text-[12px] justify-center">
          <span>
            Tema obscuro{" "}
            {theme === "light" ? (
              <FontAwesomeIcon
                className="text-base"
                icon={faToggleOff}
                onClick={handleThemeChange}
              />
            ) : (
              <FontAwesomeIcon
                className="text-base"
                icon={faToggleOn}
                onClick={handleThemeChange}
              />
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Menu;
