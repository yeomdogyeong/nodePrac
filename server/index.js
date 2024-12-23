const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./db"); // MySQL 연결
const cors = require("cors");
const app = express();
const PORT = 5174;

app.use(cors());
app.use(bodyParser.json());

// 할 일 추가
app.post("/todos", (req, res) => {
  //title = title.req.body;
  const { title } = req.body;
  const query = "INSERT INTO todos (title) VALUES (?)";

  connection.query(query, [title], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("데이터 추가 실패");
    } else {
      res.status(201).send({ id: results.insertId, title });
    }
  });
});

// 할 일 조회
app.get("/todos", (req, res) => {
  const query = "SELECT * FROM todos";

  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("데이터 조회 실패");
    } else {
      res.send(results);
    }
  });
});
app.get("/", (req, res) => {
  res.send(`<h2>welcome to server</h2>`);
});
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
