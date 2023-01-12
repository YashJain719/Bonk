const express = require("express");
const bonkRouter = require("./routes/bonkRoute");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

app.use(express.json());

app.use(cors());

app.use("/bonk", bonkRouter);

app.get("/", (req, res) => {
  res.send("Bonk API");
});

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server started on port " + PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
