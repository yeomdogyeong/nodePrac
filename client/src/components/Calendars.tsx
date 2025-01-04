import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "../scss/Calendar.scss";
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const Calendars = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [list, setList] = useState<string[]>([]);
  // const [month, setMonth] = useState<number>(0);
  // const [date, setDate] = useState<number>(0);

  const months = [
    { name: "Jan", value: 0 },
    { name: "Feb", value: 1 },
    { name: "Mar", value: 2 },
    { name: "Apr", value: 3 },
    { name: "May", value: 4 },
    { name: "Jun", value: 5 },
    { name: "Jul", value: 6 },
    { name: "Aug", value: 7 },
    { name: "Sep", value: 8 },
    { name: "Oct", value: 9 },
    { name: "Nov", value: 10 },
    { name: "Dec", value: 11 },
  ];

  const newDate = new Date();
  const newDateSplice = new Date().toString().substring(0, 15);
  //ex) Jan
  const month = new Date().toString().substring(4, 7);
  //ex) 2
  const day = new Date().toString().substring(8, 10);
  //달을 변환해주고 Number로 바꿈
  const convertMonth = (month: string) => {
    for (let i = 0; i < months.length; i++) {
      if (months[i].name === month) {
        month = String(months[i].value);
      }
    }
    return Number(month);
  };

  const convertDay = (day: string) => {
    const dayNumber = Number(day);
    return dayNumber >= 1 ? dayNumber : -1;
  };

  const getAllList = () => {
    let newList = [];
    for (let i = 0; i < localStorage.length; i++) {
      const rawData = localStorage.key(i);
      if (rawData !== null) {
        newList.push(rawData);
      }
    }
    setList(newList);
    console.log(list);
  };

  useEffect(() => {
    getAllList();
  }, []);

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
        tileClassName={({ date }) =>
          list.some((todoDate) => {
            if (
              new Date(todoDate).getMonth() === date.getMonth() &&
              new Date(todoDate).getDate() === date.getDate()
            ) {
              return true;
            }
            return false;
          })
            ? "todo"
            : null
        }
      />
    </div>
  );
};
