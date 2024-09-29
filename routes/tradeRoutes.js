const express = require('express');
const Portfolio = require('../models/Portfolio');

const router = express.Router();

// insert trade
router.post('/addTrade', async (req, res) => {
  try{
  console.log("addtrade")
  const { stock, quantity, price, date, type } = req.body;
  let portfolio = await Portfolio.findOne();

if (!portfolio) {
  portfolio = new Portfolio({ trades: [] });
  await portfolio.save();
}
  const newTrade = { stock, quantity, price, date, type };
  portfolio.trades.push(newTrade);
  await portfolio.save();

  res.status(201).json({ success: true, data: newTrade });
  }
  catch(err){
    console.error("Error in add trade api--",err)
    res.status(500).json({success:false,error:err.message});
  }
});

// update trade 
router.post('/updateTrade', async (req, res) => {
  try{
  const { tradeId, stock, quantity, price, date, type } = req.body;
  const portfolio = await Portfolio.findOne();

  const trade = portfolio.trades.id(tradeId);
  console.log(trade);
  if (trade) {
    trade.stock = stock;
    trade.quantity = quantity;
    trade.price = price;
    trade.date = date;
    trade.type = type;

    await portfolio.save();
    res.status(200).json({ success: true, data: trade });
  } else {
    res.status(404).json({ success: false, message: 'Trade not found' });
  }
}
catch(err){
  console.error("Error in update trade api --",err);
  res.status(500).json({success:false,error:err.message});
}
});

// delete trade
router.delete('/removeTrade', async (req, res) => {
  try{
  const { tradeId } = req.body;
  const portfolio = await Portfolio.findOne();
  if (!portfolio) {
    return res.status(404).json({ success: false, message: 'Portfolio not found' });
  }
  const trade = portfolio.trades.id(tradeId);
// console.log(trade,"-----check");
  if (trade) {
    portfolio.trades.pull(tradeId);
    await portfolio.save();
    res.status(200).json({ success: true, message: 'Trade removed' });
  } else {
    res.status(404).json({ success: false, message: 'Trade not found' });
  }
}
  catch(err){
    console.error("Error in remove trade api --",err);
    res.status(500).json({success:false,error:err.message});
  }
});

module.exports = router;
