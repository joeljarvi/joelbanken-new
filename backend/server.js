import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
const PORT = 3001;

const pool = mysql.createPool({
  user: "root",
  password: "root",
  host: "mysql",
  database: "joelbanken",
  port: 3306,
});

async function getUser(username) {
  const sql = "SELECT * FROM users WHERE username = ?";
  const params = [username];
  return await query(sql, params);
}

async function query(sql, params) {
  const [results] = await pool.execute(sql, params);
  return results;
}

app.use(
  cors({
    origin: "http://51.20.251.254:3000", // exakt IP till Next.js
  })
);

app.use(bodyParser.json());

app.post("/createAccount", async (req, res) => {
  const { username, password } = req.body;

  try {
    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    const params = [username, password];
    const result = await query(sql, params);

    const userId = result.insertId;

    const sql2 = "INSERT INTO accounts (user_id, balance) VALUES (?, ?)";
    const params2 = [userId, 0];
    await query(sql2, params2);

    res.json({ message: "User and account created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" }); //
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await getUser(username);

    if (result.length > 0) {
      const storedPassword = result[0].password;

      if (storedPassword === password) {
        const userId = result[0].id;
        const sql = "SELECT * FROM accounts WHERE user_id = ?";
        const params = [userId];
        const account = await query(sql, params);

        const userData = {
          userId: result[0].id,
          username: result[0].username,
          balance: account[0].balance,
        };
        res.json({ user: userData, message: "Login successful" });
      } else {
        res.status(401).json({ message: "Invalid username or password" });
      }
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error logging in:", error);

    res.status(500).json({ message: "Error logging in" });
  }
});

app.listen(3001, "0.0.0.0", () => console.log("Server running"));
