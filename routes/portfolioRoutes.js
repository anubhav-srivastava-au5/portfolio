const express = require('express');
const Portfolio = require('../models/Portfolio');

const router = express.Router();

// api to get all trades
router.get('/', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    res.json({ success: true, data: portfolio });
  } catch (err) {
    console.error("Error in get portfolio api --", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

//api to get holding of each stock
router.get('/holdings', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    const holdings = portfolio.calculateHoldings();
    res.json({ success: true, data: holdings });
  } catch (err) {
    console.error("Error in get holding api --", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

//api to get returns of each stock according to final price (assumed as 1000)
router.get('/returns', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    const returns = portfolio.calculateReturns();
    res.json({ success: true, data: returns });
  } catch (err) {
    console.error("Error in get returns api --", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
