import { useState } from "react";
import "../scss/Dropdown.scss";
export const Dropdown = () => {
  const [drop, setDrop] = useState(true);

  const place = ["🏠 학교", "💼 직장", "🏫 집", "👟 야외"];

  const handleDrop = () => {
    setDrop(!drop);
  };
  return (
    <div className="drop-container">
      <div
        className={`dropdown-content ${drop ? "open" : "close"}`}
        onClick={handleDrop}
      >
        {drop
          ? place.map((el, idx) => {
              return (
                <div key={idx} className="drop-container__list">
                  {el}
                </div>
              );
            })
          : "장소"}
      </div>
    </div>
  );
};
