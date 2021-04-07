const express = require("express");
const { nanoid } = require("nanoid");
const app = express();
const port = 3000;

const db = [
  { name: "example Movie 1", review: "example review", id: nanoid() },
  { name: "example Movie 2", review: "example review", id: nanoid() },
  { name: "example Movie 3", review: "example review", id: nanoid() },
  { name: "example Movie 4", review: "example review", id: nanoid() },
];

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  next();
});

app.get("/", (req, res) => {
  res.send(db);
});
app.listen(port, () => {
  console.log(`creating something at http://localhost:${port}`);
});
