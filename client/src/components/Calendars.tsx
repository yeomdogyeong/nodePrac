import { useState } from "react";
import Calendar from "react-calendar";
import "../scss/Calendar.scss";
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const Calendars = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Calendar onChange={onChange} value={value} />
    </div>
  );
};
