const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express();

// CORS設定。異なるURLからでも呼び出せるようにする
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// jsonを使えるようにする
app.use(express.json());
// corsを有効にする
app.use(cors());

//mysql接続情報
const con = mysql.createConnection({
  host: "d6ybckq58s9ru745.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "rc4f2188n5qg27fc",
  password: "a5t7205lzlys63hx",
  database: "o3yntltptlu6oagc",
});
// 他のファイルでmysqlを使えるようにexport
module.exports = con;

// Fetch API設定
const jsonParser = bodyParser.json();

// サーバ起動
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Listening on port ${port}...`));

app.get("/test", jsonParser, (req, res) => {
  let sql = "SELECT 'SUCCESE!'AS A FROM DUAL";
  con.execute(sql, (err, result) => {
    // エラーが発生した場合はエラーメッセージを返す
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    // エラーが発生しなかった場合はsql文で取得したデータを返す
    console.log(result);
  });
});
