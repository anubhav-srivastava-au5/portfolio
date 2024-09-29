const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qevwq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`, {
  
})
  .then(() => console.log("Database connected..!!"))
  .catch(err => console.error("MongoDB connection error:", err));