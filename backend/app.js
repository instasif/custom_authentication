const express = require("express");
const app = express();
const cors = require("cors");
const colors = require("colors");
const bodyParser = require("body-parser");

//!--------- Routes:
const authRoute = require("./Routes/auth.route");
const productRoute = require("./Routes/product.route");

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/", productRoute);
app.use("/auth", authRoute);

app.get("/", (req, res) => {
  res.send("route is working!!");
});

module.exports = app;
