const express = require("express");
const {
  getAcc,
  createAcc,
  updateAcc,
  getNftMint,
} = require("../controllers/bonkControllers");
const bonkRouter = express.Router();

bonkRouter.get("/", getAcc);

bonkRouter.get("/:publicKey", getNftMint);

bonkRouter.post("/", createAcc);

bonkRouter.put("/:id", updateAcc);

module.exports = bonkRouter;
