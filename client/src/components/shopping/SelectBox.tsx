import React, { useCallback, useMemo, useState } from "react";
import s from "./selectBox.module.scss";

interface Option {
  value: number;
  label: string;
}

interface Props {
  selectedValue?: number;
  onSelect(v: number): void;
  options: Option[];
}

export const SelectBox = (props: Props) => {
  const [open, setOpen] = useState(false);
  const { selectedValue, options, onSelect } = props;

  const onSelectBoxClick = useCallback(() => {
    setOpen((state) => !state);
  }, []);

  const onSelectClick = useCallback((value: number) => {
    console.log(value);
    onSelect(value);
    setOpen(false);
  }, []);

  const selectedOptions = useMemo(
    () => options.find((option) => option.value === selectedValue),
    [selectedValue]
  );

  return (
    <div className={s.selectBox}>
      <div onClick={onSelectBoxClick}>
        {selectedValue ? selectedOptions?.label : "Please Select"}
      </div>
      {open && (
        <div className={s.options}>
          {options.map((option) => (
            <div key={option.value} onClick={() => onSelectClick(option.value)}>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
