import React, { useCallback, useMemo, useState } from "react";
import s from "./selectBox.module.scss";

interface Option {
  size: string;
}

interface Props {
  selectedValue?: string | number;
  onSelect(v: string | number): void;
  options: string[] | number[];
}

export const SelectBox = (props: Props) => {
  const [open, setOpen] = useState(false);
  const { selectedValue, options, onSelect } = props;

  // const selectedValue = props.selectedValue
  const onSelectBoxClick = useCallback(() => {
    setOpen((state) => !state);
  }, []);

  const onSelectClick = useCallback((value: string | number) => {
    console.log(value);
    onSelect(value);
    setOpen(false);
  }, []);

  const selectedOptions = useMemo(
    () => options.find((option) => option === selectedValue),
    []
  );

  return (
    <div className={s.selectBox}>
      <div onClick={onSelectBoxClick}>
        {selectedValue ? selectedOptions : "Please Select"}
      </div>
      {open && (
        <div className={s.options}>
          {options.map((option, idx) => (
            <div key={idx} onClick={() => onSelectClick(option)}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
