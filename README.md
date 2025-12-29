TravelCravings
TravelCravings is a full-stack web application designed to help travelers find and list unique accommodations worldwide. Built with the MERN stack (MongoDB, Express.js, and Node.js), it features a robust listing management system, user authentication, and interactive mapping.

Live Project: https://travel-cravings-2.onrender.com/listings

🚀 Features
Accommodation Listings: Users can browse a wide variety of travel destinations, ranging from beachfront cottages to mountain retreats.

Search and Filters: Find destinations quickly using the search bar or filter by categories like "Trending," "Mountains," "Castles," and "Camping".

Dynamic Pricing: A tax toggle feature allows users to see the total price including GST (+18%).

Interactive Maps: Integrated Mapbox API to display the exact location of listings.

User Reviews: Authenticated users can leave ratings (using a star-based UI) and comments on listings.

Image Uploads: Cloudinary integration for seamless image hosting and management.

Full CRUD Operations: Authorized owners can create, read, update, and delete their own listings.

Robust Authentication: Secure signup and login functionality using Passport.js and passport-local-mongoose.

🛠️ Tech Stack
Frontend: EJS (Embedded JavaScript templates), EJS-Mate (layouts), Bootstrap 5, Font Awesome, Custom CSS.

Backend: Node.js, Express.js.

Database: MongoDB Atlas with Mongoose ODM.

Authentication: Passport.js.

Validation: Joi (Server-side) and Bootstrap (Client-side).

APIs: Mapbox (Geocoding and Maps) and Cloudinary (Image Storage).

📂 Project Structure
app.js: The main entry point of the application.

models/: Mongoose schemas for Listings, Reviews, and Users.

views/: EJS templates for rendering the UI (Listings, Users, Layouts, and Partials).

controllers/: Logic for handling requests and interacting with models.

routes/: Route definitions for the application's resources.

public/: Static assets including CSS, client-side JS, and images.

utils/: Middleware and custom error handling classes.

⚙️ Installation & Setup
Clone the repository:

Bash

git clone <repository-url>
cd travel-cravings
Install dependencies:

Bash

npm install
Environment Variables: Create a .env file in the root directory (this file is ignored by Git) and add the following:

Code snippet

CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
MAP_TOKEN=your_mapbox_public_token
ATLASDB_URL=your_mongodb_atlas_connection_string
SECRET=your_session_secret
Initialize Database (Optional): To seed the database with sample data, run:

Bash

node init/index.js
Start the application:

Bash

npm start
The server will run on port 8080.

📄 License
This project is licensed under the ISC License.
