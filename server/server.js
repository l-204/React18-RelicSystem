const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "relic_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("已连接数据库");
});

// 注册 route
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  console.log(req.body);

  const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
  db.query(query, [username, hashedPassword], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).send("用户已存在");
      }
      console.log(err);
      return res.status(500).send("服务器内部错误");
    }
    res.status(201).send("注册成功");
  });
});

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = ?`;
  db.query(query, [username], (err, results) => {
    if (err) return res.status(500).send("服务器内部错误");
    if (results.length === 0) return res.status(404).send("找不到用户");

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) return res.status(401).send("密码有误");
    res.status(200).send("登录成功");
  });
});

// 增加文物
app.post("/artifacts", (req, res) => {
  let artifact = req.body;
  let sql = "INSERT INTO Artifacts SET ?";
  db.query(sql, artifact, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// 获取所有文物
app.get("/artifacts", (req, res) => {
  let sql = "SELECT * FROM artifacts";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// 获取单个文物
app.get("/artifacts/:id", (req, res) => {
  let sql = "SELECT * FROM Artifacts WHERE artifact_id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// 更新文物
app.put("/artifacts/:id", (req, res) => {
  let sql = "UPDATE Artifacts SET ? WHERE artifact_id = ?";
  db.query(sql, [req.body, req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// 删除文物
app.delete("/artifacts/:id", (req, res) => {
  let sql = "DELETE FROM Artifacts WHERE artifact_id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// 增加申请
app.post("/applications", (req, res) => {
  let artifact = req.body;
  let sql = "INSERT INTO Applications SET ?";
  db.query(sql, artifact, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// 获取所有申请
app.get("/applications", (req, res) => {
  let sql = "SELECT * FROM applications";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// 获取单个申请
app.get("/applications/:id", (req, res) => {
  let sql = "SELECT * FROM Applications WHERE application_id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// 更新申请
app.put("/applications/:id", (req, res) => {
  let sql = "UPDATE Applications SET ? WHERE application_id = ?";
  db.query(sql, [req.body, req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// 删除申请
app.delete("/applications/:id", (req, res) => {
  let sql = "DELETE FROM Applications WHERE application_id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// 增加审核
app.post("/reviews", (req, res) => {
  let artifact = req.body;
  let sql = "INSERT INTO Reviews SET ?";
  db.query(sql, artifact, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// 获取所有审核
app.get("/reviews", (req, res) => {
  let sql = "SELECT * FROM reviews";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// 获取单个审核
app.get("/reviews/:id", (req, res) => {
  let sql = "SELECT * FROM Reviews WHERE review_id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// 更新审核
app.put("/reviews/:id", (req, res) => {
  let sql = "UPDATE Reviews SET ? WHERE review_id = ?";
  db.query(sql, [req.body, req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// 删除审核
app.delete("/reviews/:id", (req, res) => {
  let sql = "DELETE FROM Reviews WHERE review_id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`服务已经启动，端口： ${PORT}`);
});
