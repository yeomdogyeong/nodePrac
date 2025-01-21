import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import chieka from "../../assets/chi1.jpeg";
import "./DetailPage.scss";
import { ShopAxios } from "@/axios/axios";
export const DetailPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const item = searchParams.get("item");
  const handleData = async () => {
    const res = await (await ShopAxios("/data")).data;
    console.log(res);
  };

  useEffect(() => {
    handleData();
    console.log(item);
  }, []);
  return (
    <div className="detail-container">
      <img src={chieka} />
      <div>name and rating</div>
      <div>dropdown & description</div>
      <div>댓글들</div>
    </div>
  );
};
