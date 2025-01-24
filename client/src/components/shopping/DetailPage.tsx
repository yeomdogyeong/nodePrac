import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import chieka from "../../assets/chi1.jpeg";
import "./DetailPage.scss";
import { ShopAxios } from "@/axios/axios";
interface ItemType {
  category: string;
  description: string;
  id: string;
  image: string;
  name: string;
  options: Array<{ size: string; price: number }>;
  price: number;
  rating: number;
  review: Array<{
    user: string;
    rating: number;
    comment: string;
    replies: Array<{ user: string; comment: string }>;
  }>;
  stock: string;
}

export const DetailPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [electronics, setElectronics] = useState<ItemType[]>([]);
  const [list, setList] = useState<ItemType[]>([]);
  const category = searchParams.get("category");
  const item = searchParams.get("item");
  const handleData = async () => {
    const res = await (await ShopAxios("/data")).data;
    const { electronics, food, pets } = res;
    setElectronics(electronics);
    console.log(electronics);
  };
  //이걸 따로 빼줬음
  //처음 렌더링 시에만 실행
  useEffect(() => {
    handleData();
  }, []);
  //electronics나 category가 바뀔때만 실행
  useEffect(() => {
    console.log(item);
    console.log(category);
    if (category === "Electronics") {
      setList(electronics);
    }
    console.log("list", list);
  }, [electronics, category]);
  return (
    <div className="detail-container">
      <img src={chieka} />
      {electronics.map((el) => (
        <div key={el.id}>{el.name}</div>
      ))}
      <div>name and rating</div>
      <div>dropdown & description</div>
      <div>댓글들</div>
      <div>기타 etc</div>
    </div>
  );
};
