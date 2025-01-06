import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "../scss/Calendar.scss";
import { useNavigate, useSearchParams } from "react-router";
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const Calendars = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [list, setList] = useState<string[]>([]);
  const [params, setParams] = useState<string>("");
  // const [month, setMonth] = useState<number>(0);
  // const [date, setDate] = useState<number>(0);
  const navigate = useNavigate();

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

  //유저가 선택한 날짜를 params에 저장
  const goToList = (value: Date) => {
    console.log(value);
    //앞에는 먹고 뒤에는 뱉는다

    for (let i = 0; i < months.length; i++) {
      if (String(value).includes(months[i].name)) {
        const sliceMonth = months[i].value + 1;
        const sliceYear = value.toString().substring(11, 15);
        const sliceDate = convertDay(value.toString().substring(8, 10));
        const newDate = `${sliceYear}-${sliceMonth}-${sliceDate}`;
        setParams(newDate);
      }
    }

    // if (value !== null) {
    //   const slice = value !== null ? value.toString().substring(8, 10) : null;
    //   if (slice !== null) {
    //     const newParam = convertDay(slice);
    //     setParams(String(newParam));
    //   }
    // }
  };

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
    if (params) {
      console.log(params);
      navigate(`/todo?day=${params}`);
    }
    getAllList();
  }, [params]);

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
        onClickDay={(value, event) => goToList(value)}
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
