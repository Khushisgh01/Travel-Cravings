const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/travelCravings";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  
  // Map over the data to add the missing fields
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "690b777057278ebc1bee78d2", // Your existing owner ID
    geometry: { 
        type: "Point", 
        coordinates: [77.2090, 28.6139] // Default coordinates (e.g., Delhi) or [0, 0]
    }
  }));

  await Listing.insertMany(initData.data);
  console.log("Data was initialized");
};

initDB();