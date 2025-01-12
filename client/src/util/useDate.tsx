import React from "react";

export const useDate = () => {
  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const date = `${year}-${month}-${day}`;
  return date;
};
