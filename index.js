require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();

//App Use
app.use(cors());
app.use(express.json());

// Connect express
const port = 3300;
app.listen(port, () => {
  console.log("Server is listening at port 3300");
});

// Conenct database
const Postgreph = async () => {
  await db
    .connect()
    .then(() => {
      console.log("Connect to database");
    })
    .catch((e) => {
      console.log(e);
    });
};
Postgreph();

//Route
app.use("/api", require("./routes/Login"));
app.use("/api", require("./routes/Signup"));
app.use("/api", require("./routes/Food"));
app.use("/api", require("./routes/User"));

//API
app.get("/", (req, res) => {
  res.send("Hello World");
});
