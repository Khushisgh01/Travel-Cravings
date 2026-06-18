# 🌍 Travel Cravings

A full-stack web application for discovering and listing unique travel accommodations worldwide. Browse beautiful destinations, leave reviews, and manage your own listings with an intuitive and interactive interface.

**🔗 [View Live Project](https://travel-cravings-2.onrender.com/listings)**

---

## 📋 Table of Contents

- [About](#about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#️-installation--setup)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## About

**Travel Cravings** is designed to help travelers discover unique accommodations and experiences around the world. Whether you're looking for a cozy mountain cabin, a beachfront cottage, or a luxurious castle stay, Travel Cravings connects travelers with property owners. The platform features real-time location mapping, user reviews, image galleries, and a seamless booking browsing experience.

---

## 🚀 Features

- ✅ **Browse Accommodations**: Explore diverse travel destinations worldwide with detailed listings
- 🔍 **Smart Search & Filters**: Find destinations by category (Trending, Mountains, Castles, Camping, etc.)
- 💰 **Dynamic Pricing**: View prices with optional GST calculation (+18%)
- 📍 **Interactive Maps**: Mapbox integration showing exact listing locations
- ⭐ **User Reviews & Ratings**: Leave comments and star ratings on accommodations
- 📸 **Image Management**: Cloudinary integration for reliable image hosting
- 🔐 **Full CRUD Operations**: Create, read, update, and delete listings (with authorization)
- 👤 **User Authentication**: Secure login/signup with Passport.js
- ✔️ **Form Validation**: Server-side (Joi) and client-side validation for data integrity

---

## 🛠️ Tech Stack

### Frontend
- **EJS** (Embedded JavaScript Templates) - Server-side templating
- **EJS-Mate** - Layout management
- **Bootstrap 5** - Responsive UI framework
- **Font Awesome** - Icon library
- **Custom CSS** - Styling and animations

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Mongoose** - MongoDB ODM

### Database
- **MongoDB Atlas** - NoSQL cloud database

### Authentication & Validation
- **Passport.js** - Authentication middleware
- **Passport-Local-Mongoose** - Local authentication strategy
- **Joi** - Schema validation library

### External APIs & Services
- **Mapbox API** - Geocoding and interactive maps
- **Cloudinary** - Cloud image storage and management

### Additional Dependencies
- **Multer** - File upload middleware
- **Multer-Storage-Cloudinary** - Cloudinary storage engine for Multer
- **Connect-Mongo** - MongoDB session store
- **Connect-Flash** - Flash messaging
- **Cookie-Parser** - Cookie parsing middleware
- **Method-Override** - HTTP method override
- **Dotenv** - Environment variable management

---

## 📂 Project Structure

```
Travel-Cravings/
├── app.js                  # Main application entry point
├── package.json            # Dependencies and scripts
├── .env                    # Environment variables (not tracked)
├── models/
│   ├── listing.js         # Listing schema
│   ├── review.js          # Review schema
│   └── user.js            # User schema
├── views/
│   ├── layouts/           # Base layouts
│   ├── listings/          # Listing pages
│   ├── reviews/           # Review components
│   ├── users/             # User pages
│   └── partials/          # Reusable components
├── controllers/
│   ├── listingController.js
│   ├── reviewController.js
│   └── userController.js
├── routes/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── public/
│   ├── css/               # Custom stylesheets
│   ├── js/                # Client-side scripts
│   └── images/            # Static images
├── utils/
│   ├── middleware.js      # Custom middleware
│   └── ExpressError.js    # Error handling class
├── init/
│   └── index.js           # Database seeding script
└── README.md              # Project documentation
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v22.20.0 or higher)
- npm or yarn
- MongoDB Atlas account
- Cloudinary account
- Mapbox account

### Step 1: Clone the Repository
```bash
git clone https://github.com/Khushisgh01/Travel-Cravings.git
cd travel-cravings
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Create a `.env` file in the root directory and add your credentials:

```env
# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Mapbox Configuration
MAP_TOKEN=your_mapbox_public_token

# MongoDB Configuration
ATLASDB_URL=mongodb+srv://username:password@cluster.mongodb.net/dbname

# Session Configuration
SECRET=your_random_session_secret_key
```

**How to get credentials:**
- **Cloudinary**: Sign up at [cloudinary.com](https://cloudinary.com) and get your API credentials from the dashboard
- **Mapbox**: Sign up at [mapbox.com](https://mapbox.com) and create a public access token
- **MongoDB Atlas**: Create a cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and get the connection string

### Step 4: Seed the Database (Optional)
Populate the database with sample listings:
```bash
node init/index.js
```

### Step 5: Start the Application
```bash
npm start
```

The application will run on `http://localhost:8080`

---

## 🌐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `CLOUD_NAME` | Cloudinary cloud name | `your_cloud_name` |
| `CLOUD_API_KEY` | Cloudinary API key | `1234567890` |
| `CLOUD_API_SECRET` | Cloudinary API secret | `abc123xyz` |
| `MAP_TOKEN` | Mapbox public access token | `pk.eyJ...` |
| `ATLASDB_URL` | MongoDB Atlas connection string | `mongodb+srv://...` |
| `SECRET` | Express session secret | `your_secret_key` |

---

## 💡 Usage

1. **Create an Account**: Sign up with your email and password
2. **Browse Listings**: Explore accommodations using search and filters
3. **View Details**: Click on a listing to see photos, location, and reviews
4. **Leave Reviews**: Rate and comment on accommodations you're interested in
5. **Create a Listing**: Add your own property with images and details
6. **Manage Listings**: Edit or delete your own listings from your profile
7. **View on Map**: See exact locations of listings using interactive Mapbox

---

## 🎨 Screenshots

Coming soon! Add screenshots of:
- Home page with featured listings
- Listing detail page
- User dashboard
- Create/edit listing form
- Review section

---


## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 📧 Contact

For questions or support, please reach out to the project maintainer or open an issue on GitHub.

---

**Happy Travels! 🚀✈️🏖️**
