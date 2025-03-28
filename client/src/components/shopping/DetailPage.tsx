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
import { SelectBox } from "./SelectBox";
import s from "./DetailPage.module.scss";
interface ItemType {
  category: string;
  description: string;
  id: string;
  image: string;
  name: string;
  options: Array<{ size: string; price: number }>;
  price: number;
  rating: number;
  reviews: Array<{
    user: string;
    rating: number;
    comment: string;
    replies: Array<{ user: string; comment: string; id: number }>;
  }>;
  stock: string;
}

const ONE_STAR = 1;
const BORDER_STAR = 0;

export const DetailPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [electronics, setElectronics] = useState<ItemType[]>([]);
  const [food, setFood] = useState<ItemType[]>([]);
  const [pets, setPets] = useState<ItemType[]>([]);
  const [list, setList] = useState<ItemType[]>([]);
  const category = searchParams.get("category");
  const item = Number(searchParams.get("item")) - 1;
  const [isLoading, setIsLoading] = useState(true);
  const [select, setSelect] = useState<string>();
  const [moreComment, setMoreComment] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedValue, setSelectedValue] = useState<
    string | number | undefined
  >(undefined);
  const [selectedValue2, setSelectedValue2] = useState<
    string | number | undefined
  >(undefined);
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

  const handleMoreComment = (id: number) => {
    if (id === selectedId) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  };

  const handleSelect = (id: any) => {
    setSelect(id);
  };

  const handleStar = (props: number) => {
    const score = Math.floor(props);
    const arr = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= score) {
        arr.push(ONE_STAR);
      } else {
        arr.push(BORDER_STAR);
      }
    }
    console.log("arr", arr);

    return arr.map((el) =>
      el === ONE_STAR ? (
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
    <div className={s.detailContainer}>
      <img src={chieka} />
      <div>{list[item].category}</div>
      <div>{list[item].name}</div>
      <div className={s.ratingBox}>{handleStar(list[item].rating)}</div>
      <div className={s.selectContainer}>
        <div className={s.selectBox}>
          <div> 크기 : </div>
          <div>
            <SelectBox
              selectedValue={selectedValue}
              onSelect={(v) => setSelectedValue(v)}
              options={list[item].options.map((el) => el.size)}
            />
          </div>
        </div>
        <div className={s.selectBox}>
          <div> 가격 : </div>
          <div>
            <SelectBox
              selectedValue={selectedValue2}
              onSelect={(v) => setSelectedValue2(v)}
              options={list[item].options.map((el) => el.price)}
            />
          </div>
          <div>재고 : {list[item].stock}</div>
        </div>
      </div>
      <div>
        {/* 원래는 답글을 클릭할 수록 해당 state를 계속 생성해주는 함수를 설정해줘야하나?
        라고 고민했었음.
        그냥 클릭하면 해당 id에 대한 답글을 보여주고 
        보여지던 답글을 클릭하면 null로 설정 */}

        {list[item].reviews.map((el) => (
          <div>
            <div className={s.commentBox}>
              <div>ID: {el.user}</div>
              <div>: {el.comment}</div>
            </div>
            <div>
              {el.replies.map((reply) => (
                <div key={reply.id}>
                  {selectedId === reply.id ? (
                    <div onClick={() => handleMoreComment(reply.id)}>
                      {reply.comment}
                    </div>
                  ) : (
                    <button onClick={() => handleMoreComment(reply.id)}>
                      [답글보기]
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div>댓글들</div>
      <div>기타 etc</div>
    </div>
  );
};
