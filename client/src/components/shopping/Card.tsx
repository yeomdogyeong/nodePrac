import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { ShopAxios } from "@/axios/axios";
import { useState, useEffect } from "react";
import "./Card.scss";
import { Height } from "@mui/icons-material";
interface ItemType {
  category: string;
  description: string;
  id: string;
  image: string;
  name: string;
  options: Array<{ size: string; price: number }>;
  price: number;
  rating: number;
  review: Array<{ user: string; rating: number; comment: string }>;
  stock: string;
}

export default function ActionAreaCard() {
  const [electronic, setElectronic] = useState<ItemType[]>([]);
  const [food, setFood] = useState<ItemType[]>([]);
  const [pets, setPets] = useState<ItemType[]>([]);
  const [combination, setCombination] = useState<ItemType[]>([]);
  const mango = async () => {
    const res = (await ShopAxios.get("/data")).data;
    console.log(res);
    const electronic = res.electronics;
    const food = res.food;
    const pets = res.pets;
    const newList = [...electronic, ...food, ...pets];
    setElectronic(electronic);
    setFood(food);
    setPets(pets);
    setCombination(newList);
  };

  useEffect(() => {
    mango();
  }, []);

  return (
    <div className="card">
      {combination.map((el: ItemType) => (
        <div className="card_container" key={el.id}>
          <Card>
            <CardActionArea>
              <CardMedia component="img" image="/chi.jpeg" alt="chiiiie" />
              <CardContent style={{ height: 100 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {el.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {el.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      ))}
    </div>
  );
}
