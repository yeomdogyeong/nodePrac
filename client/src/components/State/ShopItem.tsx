import { ShopAxios } from "@/axios/axios";
import React, { useEffect, useState } from "react";

export const ShopItem = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const res = await ShopAxios.get("/data");
    console.log(res.data.electronics);
    setData(res.data.electronics);
  };
  useEffect(() => {
    getData();
  });
  return (
    <div>
      {data.map((el) => (
        <div>{el.id}</div>
      ))}
    </div>
  );
};
