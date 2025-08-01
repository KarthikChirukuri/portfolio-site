const mongoose = require("mongoose");
let initData = require("./data.js");
const Request = require("../models/Request.js");

main().then((res)=>{
    console.log("Database connection was succesful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Portfolio');
}

const initDb = async()=>{
    await Request.deleteMany({});
    await Request.insertMany(initData.data);
    console.log("data saving was successful");
}; 

initDb();