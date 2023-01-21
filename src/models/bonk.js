const mongoose = require("mongoose");

const BonkSchema = mongoose.Schema(
  {
    publicKey: {
      type: String,
      required: true,
    },
    amountBonked: {
      type: Number,
      required: true,
    },
    noOfTimes: {
      type: Number,
      required: true,
    },
     nftMint: {
      type: String,
    }
  },
  { timestamp: true }
);

module.exports = mongoose.model("Bonk", BonkSchema);
