import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "../scss/Calendar.scss";
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const Calendars = () => {
  const [value, onChange] = useState<Value>(new Date());
  // const [month, setMonth] = useState<number>(0);
  // const [date, setDate] = useState<number>(0);

  const newDate = new Date();
  const newDateSplice = new Date().toString().substring(0, 15);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;

  const day = newDate.getDate();
  const date = `${year}-${month}-${day}`;

  const getAllList = () => {
    const rawData = localStorage.getItem(date);
    const list = rawData ? JSON.parse(rawData) : null;
    console.log(list);
  };

  useState(() => {
    getAllList();
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Calendar
        onChange={onChange}
        value={value}
        onClickDay={(value, event) => alert(value)}
        tileClassName={({ activeStartDate, date, view }) =>
          date.getMonth() === 0 && date.getDate() === 2 ? "todo" : null
        }
      />
    </div>
  );
};
