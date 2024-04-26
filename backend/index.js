const express = require("express");

const app = express();

require("dotenv").config();

const cors = require("cors");

const detailRouter = require("./Router/detailRouter");

const {connect,sequelize} = require("./config/dbConfig");

const PORT = process.env.PORT;

app.use(cors({
    origin: 'http://localhost:3000'
  }));

app.use("/files", express.static(__dirname + '/Resumes'));

app.get("/",(req,res)=>{
    res.status(200).send({message:"This is Resume-App backend"});
});


app.use("/details",detailRouter);



app.listen(PORT,async()=>{
try {
    await connect();
    console.log("Connected");
} catch (error) {
    console.log("Not Connected");
}
})