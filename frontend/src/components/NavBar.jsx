import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { months } from "../utilities/months";

function NavBar(props) {
  const { currentMonth, currentYear, previous, next } = props;
  return (
    <div className="flex md:grid md:grid-cols-[100px_1fr_100px] items-center justify-center mt-8 mb-2">
      <FontAwesomeIcon
        className="invisible md:visible cursor-pointer justify-self-end"
        icon={faChevronLeft}
        onClick={previous}
      />
      <div className="text-center font-['Comfortaa'] text-xl font-bold">
        <h1>
          {months[currentMonth]}, {currentYear}
        </h1>
      </div>
      <FontAwesomeIcon
        className="invisible md:visible cursor-pointer"
        icon={faChevronRight}
        onClick={next}
      />
    </div>
  );
}

export default NavBar;
