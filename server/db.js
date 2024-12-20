const mysql = require("mysql2");

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: "localhost", // MySQL 서버 주소
  user: "root", // MySQL 사용자 이름
  database: "todoDB",
  password: "Ydkqkdghk1417@", // MySQL 비밀번호
  port: 3306,
  connectTimeout: 10000,
});

// 연결 테스트
connection.connect((err) => {
  if (err) {
    console.error("MySQL 연결 실패:", err);
    return;
  }
  console.log("MySQL 연결 성공!");
});

module.exports = connection;
