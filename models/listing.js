const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    // 1. Change the top level to an Object type
    type: { 
        url: String, // Nested field 1 for the URL
        filename: String // Nested field 2 for the filename
    },
    // 2. Add a default value structure
    default: { 
        url: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        filename: "default-listing-image" // Add a default filename as well
    },
    // 3. Update the setter function (v will now be the entire image object)
    set: (v) => 
        (v && v.url === "") 
            ? { 
                url: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
                filename: "default-listing-image"
              }
            : v,
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;