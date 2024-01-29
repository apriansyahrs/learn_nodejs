const express = require("express");
const mysql = require("mysql2");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "list_app",
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/list", (req, res) => {
  connection.query("SELECT * FROM items", (error, results) => {
    if (error) {
      console.error("Error fetching items from database:", error);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.render("list.ejs", { items: results });
  });
});

app.get("/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/create", (req, res) => {
  connection.query(
    "INSERT INTO items (name) VALUES (?)",
    [req.body.itemName],
    (error, results) => {
      res.redirect("/list");
    }
  );
});

app.post("/delete/:id", (req, res) => {
  connection.query(
    "DELETE FROM items WHERE id = ?",
    [req.params.id],
    (error, results) => {
      res.redirect("/list");
    }
  );
});

app.get("/edit/:id", (req, res) => {
  connection.query(
    "SELECT * FROM items WHERE id = ?",
    [req.params.id],
    (error, results) => {
      res.render("edit.ejs", { item: results[0] });
    }
  );
});

app.post("/update/:id", (req, res) => {
  connection.query(
    "UPDATE items SET name = ? WHERE id = ?",
    [req.body.itemName, req.params.id],
    (error, results) => {
      res.redirect("/list");
    }
  );
});

app.listen(3000);
