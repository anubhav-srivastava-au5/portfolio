const express=require("express");
const dotenv=require("dotenv");
dotenv.config();
require("./database/db");
const app=express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/",(req,res)=>{
    res.send("hello");
})


const tradeRoutes = require('./routes/tradeRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');


app.use('/portfolio', tradeRoutes);
app.use('/portfolio', portfolioRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT} successfully..!!`);
})