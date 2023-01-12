const express = require("express");
const {
  getAcc,
  createAcc,
  updateAcc,
} = require("../controllers/bonkControllers");
const bonkRouter = express.Router();

bonkRouter.get("/", getAcc);

bonkRouter.post("/", createAcc);

bonkRouter.put("/:id", updateAcc);

module.exports = bonkRouter;
