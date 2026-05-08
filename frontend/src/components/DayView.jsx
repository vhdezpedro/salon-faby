import React from "react";
import { useParams } from "react-router";
import { months } from "../utilities/months";

function DayView(props) {
  const { appointments } = props;
  const { year, month, day } = useParams();

  console.log(appointments);

  return (
    <div className="daily-view">
      <div className="day-header">
        <h1>{months[month]}</h1>
      </div>
    </div>
  );
}

export default DayView;
