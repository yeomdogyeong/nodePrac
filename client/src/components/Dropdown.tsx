import { useState } from "react";
import "../scss/Dropdown.scss";

interface DeleteDrop {
  deleteDrop: () => void;
}

export const Dropdown = ({ deleteDrop }: DeleteDrop) => {
  const [drop, setDrop] = useState(false);
  const [select, setSelect] = useState(false);

  const place = ["🏠 학교", "💼 직장", "🏫 가정", "👟 야외"];

  const handleDrop = () => {
    setDrop(!drop);
  };

  const handleSelect = (contents: string) => {
    if (contents) {
      setSelect(!select);
    }
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
              <button
                key={idx}
                onClick={() => handleSelect(el)}
                className="drop-container__list"
              >
                {el}
              </button>
            );
          })
        ) : select ? (
          <div className="dropdown-content__select">
            <button className="select">{select}</button>
            <button
              className="delete"
              onClick={(e) => {
                e.stopPropagation();
                deleteDrop();
              }}
            >
              X
            </button>
          </div>
        ) : (
          <div className="dropdown-content__default ">장소</div>
        )}
      </div>
    </div>
  );
};
