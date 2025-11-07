const mongoose = require("mongoose");
const initData=require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL="mongodb://127.0.0.1:27017/travelCravings";

main().then(()=>{
    console.log("connected to DB")
}).catch(err=>{
    console.log(err);
})
//for database
async function main(){
    await mongoose.connect(MONGO_URL);
};

const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"690b777057278ebc1bee78d2"}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
}

initDB();