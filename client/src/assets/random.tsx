import React from "react";
import chi from "./chi.jpeg";
import chi1 from "./chi1.jpeg";
import chi2 from "./chi2.jpeg";
import chi3 from "./chi3.jpeg";
export const random = () => {
  const arr = [chi, chi1, chi2, chi3];
  const randomNumber = Math.floor(Math.random() * arr.length);
  return arr[randomNumber];
};
