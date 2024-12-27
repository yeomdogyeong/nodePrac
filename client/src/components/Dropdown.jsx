import { useState } from "react";
import "../scss/Dropdown.scss";
export const Dropdown = () => {
  const [drop, setDrop] = useState(false);
  const [select, setSelect] = useState(false);

  const place = ["🏠 학교", "💼 직장", "🏫 가정", "👟 야외"];

  const handleDrop = () => {
    setDrop(!drop);
  };

  const handleSelect = (contents) => {
    setSelect(contents);
    console.log(select);
  };
  return (
    <div className="drop-container">
      <div
        className={`dropdown-content ${drop ? "open" : "close"}`}
        onClick={handleDrop}
      >
        {drop ? (
          place.map((el, idx) => {
            return (
              <div
                key={idx}
                onClick={() => handleSelect(el)}
                className="drop-container__list"
              >
                {el}
              </div>
            );
          })
        ) : select ? (
          <div
            draggable
            className={`dropdown-content ${select ? "select" : "unselect"}`}
          >
            {select}
          </div>
        ) : (
          <div draggable className="dropdown-content__default ">
            장소
          </div>
        )}
      </div>
    </div>
  );
};
