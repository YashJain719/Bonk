const { reset } = require("nodemon");
const bonk = require("../models/bonk");
const bonkModel = require("../models/bonk");

const createAcc = async (req, res) => {
  const { publicKey, amountBonked,noOfTimes,nftMint } = req.body;


  try {
    const existingAcc = await bonkModel.findOne({ publicKey: publicKey });

    if (existingAcc) {
      var message = {
        message: "Account already exist",
        id: existingAcc.id,
      };
      res.status(201).json(message);
    } else {
     const newBonk = new bonk({
    publicKey: publicKey,
    amountBonked: amountBonked,
    noOfTimes: noOfTimes,
    nftMint:nftMint
  });
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

  existingAcc.amountBonked = existingAcc.amountBonked + amountBonked;
  existingAcc.noOfTimes = existingAcc.noOfTimes + noOfTimes;
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
  const mysort={noOfTimes:-1};
  try {
    const acc = await bonkModel.find({}).sort(mysort);
    res.status(200).json(acc);
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};


const getNftMint=async(req,res)=>{
  const { publicKey } = req.params;
  try{
  const existingAcc = await bonkModel.findOne({ publicKey: publicKey });
    res.status(200).json(existingAcc);
  }
  catch(error){
     res.status(500).json("something went wrong");
  }
}

module.exports = {
  createAcc,
  updateAcc,
  getAcc,
  getNftMint,
};
