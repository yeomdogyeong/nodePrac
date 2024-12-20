const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/mango", (req, res) => {
  res.json({ mango: "my name is MANG!" });
});
//params를 이용한 GET
app.get("/mango/:id", (req, res) => {
  const mangolingo = req.params.id;
  console.log(mangolingo);
  res.send(mangolingo);
});

app.get("/dogyeong/:name", (req, res) => {
  const { name } = req.params;

  if (name === "dog") {
    console.log("mung");
  } else if (name === "cat") {
    console.log("nang");
  }
  res.json({ myname: name });
});
