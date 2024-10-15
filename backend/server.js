const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = require("./app");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection is successful".bold.red);
  })
  .catch((err) => {
    console.error(`Database connection error: ${err.message}`);
  });

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App is running on port ${port}`.bold.yellow);
  });
