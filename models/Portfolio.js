const mongoose = require('mongoose');
const Trade = require('./Trade');

const portfolioSchema = new mongoose.Schema({
  trades: [Trade.schema]
});

portfolioSchema.methods.calculateHoldings = function() {
  let holdings = {};

  this.trades.forEach(trade => {
    if (!holdings[trade.stock]) {
      holdings[trade.stock] = { quantity: 0, totalCost: 0, totalBoughtQuantity: 0 };
    }

    if (trade.type === 'buy') {
      holdings[trade.stock].quantity += trade.quantity;
      holdings[trade.stock].totalCost += trade.quantity * trade.price;
      holdings[trade.stock].totalBoughtQuantity += trade.quantity;
    } else if (trade.type === 'sell') {
      holdings[trade.stock].quantity -= trade.quantity;
    }
  });

  let result = [];
  
  for (let stock in holdings) {
    const quantity = holdings[stock].quantity;
    const totalCost = holdings[stock].totalCost;
    const totalBoughtQuantity = holdings[stock].totalBoughtQuantity;

    const avgPrice = totalBoughtQuantity > 0 ? totalCost / totalBoughtQuantity : 0;
    
    result.push({
      stock,
      quantity,
      avgPrice: avgPrice.toFixed(2)
    });
  }

  return result;
};



portfolioSchema.methods.calculateReturns = function() {
  let returns = {};
  const finalPrice = 1000; // assumed final price as 1000

  this.trades.forEach(trade => {
    if (!returns[trade.stock]) {
      returns[trade.stock] = { initialPrice: 0, quantity: 0 };
    }

    if (trade.type === 'buy') {
      if (returns[trade.stock].quantity === 0) {
        returns[trade.stock].initialPrice = trade.price; 
      }
      returns[trade.stock].quantity += trade.quantity;
    } else if (trade.type === 'sell') {
      returns[trade.stock].quantity -= trade.quantity;
    }
  });

  let result = [];

  for (let stock in returns) {
    const initialPrice = returns[stock].initialPrice;

    const returnPercentage = ((finalPrice - initialPrice) / initialPrice) * 100;

    result.push({
      stock,
      return:`${returnPercentage.toFixed(2)}%`
    });
  }

  return result;
};


module.exports = mongoose.model('Portfolio', portfolioSchema);
