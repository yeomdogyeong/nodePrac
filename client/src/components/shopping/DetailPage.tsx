import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import chieka from "../../assets/chi1.jpeg";
import "./DetailPage.scss";
import { ShopAxios } from "@/axios/axios";
import { CategoryOutlined } from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { Star } from "lucide-react";
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
  const [food, setFood] = useState<ItemType[]>([]);
  const [pets, setPets] = useState<ItemType[]>([]);
  const [list, setList] = useState<ItemType[]>([]);
  const category = searchParams.get("category");
  const item = Number(searchParams.get("item")) - 1;
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState<number>();
  const handleData = async () => {
    try {
      const res = await (await ShopAxios("/data")).data;
      const { electronics, food, pets } = res;
      setElectronics(electronics);
      setFood(food);
      setPets(pets);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setIsLoading(false); // 로딩 완료
    }
  };

  const handleStar = (props: number) => {
    const score = Math.floor(props);
    const arr = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= score) {
        arr.push(1);
      } else {
        arr.push(0);
      }
    }
    console.log("arr", arr);

    return arr.map((el) =>
      el === 1 ? (
        <div>
          <StarIcon />
        </div>
      ) : (
        <div>
          <StarBorderIcon />
        </div>
      )
    );
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

    if (category === "Food") {
      setList(food);
    }

    if (category === "Pets") {
      setList(pets);
    }
  }, [electronics, food, pets, category, list]);

  console.log("list", list);
  console.log("item", item);

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 상태를 표시
  }

  // 데이터가 없거나 유효하지 않은 경우 처리
  if (!list[item]) {
    return <div>Item not found or data not loaded yet.</div>;
  }

  return (
    <div className="detail-container">
      <img src={chieka} />
      {list[item].category}
      {list[item].name}
      <div>{handleStar(list[item].rating)}</div>
      {list[item].options.map((el) => el.size)}
      <div>name and rating</div>
      <div>dropdown & description</div>
      <div>댓글들</div>
      <div>기타 etc</div>
    </div>
  );
};
