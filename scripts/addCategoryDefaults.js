// One-time migration: backfills `category` on listings already sitting in
// your live database WITHOUT deleting anything (unlike init/index.js, which
// wipes the whole collection before reseeding).
//
// Run locally with your production DB URL, e.g.:
//   ATLASDB_URL="your-atlas-connection-string" node scripts/addCategoryDefaults.js

if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const mongoose = require("mongoose");
const Listing = require("../models/listing.js");

const dbUrl = process.env.ATLASDB_URL;

async function migrate() {
    await mongoose.connect(dbUrl);
    console.log("connected to DB");

    const result = await Listing.updateMany(
        { $or: [{ category: { $exists: false } }, { category: null }] },
        { $set: { category: "trending" } }
    );

    console.log(`Backfilled category on ${result.modifiedCount} listing(s).`);
    console.log("Tip: open each old listing's Edit page afterwards to pick a more accurate category if you want them spread across filters.");

    await mongoose.disconnect();
}

migrate().catch((err) => {
    console.log("Migration failed:", err.message);
});