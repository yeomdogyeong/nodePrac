import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { ShopAxios } from "@/axios/axios";
import { useState, useEffect } from "react";

export default function ActionAreaCard() {
  const [title, setTitle] = useState("");

  const mango = async () => {
    const res = (await ShopAxios.get("/electronics")).data;
    console.log(res);
  };

  useEffect(() => {
    mango();
  }, []);

  return (
    <Card sx={{ maxWidth: 245 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/chi.jpeg"
          alt="chiiiie"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
