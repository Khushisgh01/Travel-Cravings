# 🌍 Travel Cravings

A full-stack web application for discovering and listing unique travel accommodations worldwide. Browse beautiful destinations, leave reviews, manage your own listings, and get instant travel guidance from an AI chatbot—all in one intuitive platform.

**🔗 [View Live Project](https://travel-cravings-2.onrender.com/)**

---

## 📋 Table of Contents

- [About](#about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#️-installation--setup)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## About

**Travel Cravings** is designed to help travelers discover unique accommodations and experiences around the world. Whether you're looking for a cozy mountain cabin, a beachfront cottage, or a luxurious castle stay, Travel Cravings connects travelers with property owners. The platform features real-time location mapping, user reviews, image galleries, AI-powered travel guidance, and a seamless browsing experience.

---

## 🚀 Features

### Core Features
- ✅ **Browse Accommodations**: Explore diverse travel destinations worldwide with detailed listings
- 🔍 **Smart Search & Filters**: Find destinations by category (Trending, Mountains, Castles, Camping, etc.)
- 💰 **Dynamic Pricing**: View prices with optional GST calculation (+18%)
- 📍 **Interactive Maps**: Mapbox integration showing exact listing locations
- ⭐ **User Reviews & Ratings**: Leave comments and star ratings on accommodations
- 📸 **Image Management**: Cloudinary integration for reliable image hosting
- 🔐 **Full CRUD Operations**: Create, read, update, and delete listings (with authorization)
- 👤 **User Authentication**: Secure login/signup with Passport.js
- ✔️ **Form Validation**: Server-side (Joi) and client-side validation for data integrity

### 🤖 AI Chatbot Features (NEW!)
- 💬 **Floating AI Assistant**: Elegant floating chatbot accessible from any page
- 🎯 **Smart Quick Chips**: One-click questions about beach stays, packing tips, listings, and reviews
- 🌐 **Travel Guidance**: Get instant answers about destinations, accommodations, and platform usage
- 📱 **Real-time Chat**: Responsive conversation interface with message history
- 🎨 **Beautiful UI**: Glassmorphic design with smooth animations
- 📲 **Mobile Optimized**: Responsive chatbot that works seamlessly on all devices
- ✨ **Visual Feedback**: Typing indicators, notification dots, and smooth transitions
- 🔄 **Context-Aware Responses**: Chat maintains conversation history for better context

---

## 🛠️ Tech Stack

### Frontend
- **EJS** (Embedded JavaScript Templates) - Server-side templating
- **EJS-Mate** - Layout management
- **Bootstrap 5** - Responsive UI framework
- **Font Awesome** - Icon library
- **Custom CSS** - Styling, animations, and glassmorphic effects

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
- **Claude/LLM API** - AI chatbot intelligence (via `/api/chat` endpoint)

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
│   ├── layouts/
│   │   └── boilerplate.ejs # Main layout (includes chatbot)
│   ├── listings/          # Listing pages
│   ├── reviews/           # Review components
│   ├── users/             # User pages (login, signup)
│   ├── includes/
│   │   ├── chatbot.ejs    # AI Chatbot component 
│   │   ├── navbar.ejs
│   │   ├── footer.ejs
│   │   └── flash.ejs
│   └── partials/          # Reusable components
├── controllers/
│   ├── listingController.js
│   ├── reviewController.js
│   └── userController.js
├── routes/
│   ├── listings.js
│   ├── reviews.js
│   ├── users.js
│   └── chat.js            #  Chatbot API route 
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
- LLM API key (for chatbot - Claude, OpenAI, etc.)

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

# Chatbot Configuration (NEW!)
ANTHROPIC_API_KEY=your_claude_api_key
# OR use alternative:
# OPENAI_API_KEY=your_openai_api_key
```

**How to get credentials:**
- **Cloudinary**: Sign up at [cloudinary.com](https://cloudinary.com) and get your API credentials from the dashboard
- **Mapbox**: Sign up at [mapbox.com](https://mapbox.com) and create a public access token
- **MongoDB Atlas**: Create a cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and get the connection string
- **Claude API**: Sign up at [console.anthropic.com](https://console.anthropic.com) for API access
- **OpenAI API** (alternative): Sign up at [openai.com](https://openai.com) and get your API key

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
| `ANTHROPIC_API_KEY` | Claude API key (for chatbot) | `sk-ant-...` |
| `OPENAI_API_KEY` | OpenAI API key (alternative) | `sk-...` |

---

## 💡 Usage

### Browsing & Discovering
1. **Create an Account**: Sign up with your email and password
2. **Browse Listings**: Explore accommodations using search and filters
3. **View Details**: Click on a listing to see photos, location, and reviews
4. **View on Map**: See exact locations of listings using interactive Mapbox

### Reviews & Interactions
5. **Leave Reviews**: Rate and comment on accommodations you're interested in
6. **Interact with AI Guide**: Open the chatbot (bottom-right) for instant travel advice

### Managing Listings
7. **Create a Listing**: Add your own property with images and details
8. **Manage Listings**: Edit or delete your own listings from your profile

### AI Chatbot
- 🤖 Click the **"AI Guide"** bubble (bottom-right) to open the chatbot
- 📝 Ask questions about destinations, packing, or how the platform works
- 🎯 Use **Quick Chips** for instant suggestions (beach stays, packing tips, etc.)
- 💬 Chat history is maintained within the session for context-aware responses

---

## 🔌 API Endpoints

### Chat API (NEW!)
```
POST /api/chat
Content-Type: application/json

Request Body:
{
  "messages": [
    { "role": "user", "content": "What are the best beach stays?" },
    { "role": "assistant", "content": "..." }
  ]
}

Response:
{
  "content": [
    { "type": "text", "text": "Response from AI..." }
  ]
}
```

### Authentication Routes
- `POST /signup` - Register new user
- `POST /login` - User login
- `GET /logout` - User logout

### Listings Routes
- `GET /listings` - View all listings
- `GET /listings/:id` - View listing details
- `POST /listings` - Create new listing
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing

### Reviews Routes
- `POST /listings/:id/reviews` - Add review to listing
- `DELETE /listings/:id/reviews/:reviewId` - Delete review

---

## 🎨 Screenshots

Coming soon! Add screenshots of:
- Home page with featured listings
- Listing detail page with AI chatbot
- AI Chatbot interface with quick chips
- User dashboard and profile
- Create/edit listing form
- Review section with ratings

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 🆕 Recent Updates

### Version 1.1 - AI Chatbot Integration
- ✨ Added floating AI chatbot assistant with glassmorphic design
- 💬 Integrated LLM API for intelligent travel guidance
- 🎯 Quick-chip suggestions for common travel questions
- 📱 Mobile-responsive chatbot interface
- 🔄 Context-aware conversation management
- ✅ Notification dot to draw user attention

---

## 📧 Contact

For questions or support, please reach out to the project maintainer or open an issue on GitHub.

---

**Happy Travels! 🚀✈️🏖️**
