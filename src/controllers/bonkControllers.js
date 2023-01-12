const { reset } = require("nodemon");
const bonk = require("../models/bonk");
const bonkModel = require("../models/bonk");

const createAcc = async (req, res) => {
  const { publicKey, amountBonked } = req.body;

  const newBonk = new bonk({
    publicKey: publicKey,
    amountBonked: amountBonked,
    noOfTimes: 1,
  });

  try {
    const existingAcc = await bonkModel.findOne({ publicKey: publicKey });

    if (existingAcc) {
      var message = {
        message: "Account already exist",
        id: existingAcc.id,
      };
      res.status(400).json(message);
    } else {
      await newBonk.save();
      res.status(201).json(newBonk);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

const updateAcc = async (req, res) => {
  const id = req.params.id;
  const { publicKey, amountBonked, noOfTimes } = req.body;

  const existingAcc = await bonkModel.findOne({ publicKey: publicKey });
  console.log(existingAcc);

  existingAcc.amountBonked = existingAcc.amountBoxnked + amountBonked;
  existingAcc.noOfTimes = existingAcc.noOfTimes + noOfTimes;

  //   const newBonk = new bonk({
  //     publicKey: publicKey,
  //     amountBonked: newAmountBonked,
  //     noOfTimes: numberOfTimes,
  //   });
  console.log("New Bonked \n" + existingAcc);
  try {
    await bonkModel.findByIdAndUpdate(id, existingAcc, { new: true });
    res.status(200).json(existingAcc);
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

const getAcc = async (req, res) => {
  try {
    const acc = await bonkModel.find({});
    res.status(200).json(acc);
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

module.exports = {
  createAcc,
  updateAcc,
  getAcc,
};
