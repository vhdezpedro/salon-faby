import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { months } from "../utilities/months";

function NavBar(props) {
  const { currentMonth, currentYear, previous, next } = props;
  return (
    <div className="nav-bar">
      <FontAwesomeIcon icon={faChevronLeft} onClick={previous} />
      <div className="nav-header">
        <h1>
          {months[currentMonth]}, {currentYear}
        </h1>
      </div>
      <FontAwesomeIcon icon={faChevronRight} onClick={next} />
    </div>
  );
}

export default NavBar;
