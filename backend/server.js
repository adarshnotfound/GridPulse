// 1. Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

// 2. Initialize the app
const app = express();
const PORT = process.env.PORT || 5000;

// 3. Middleware (The Gatekeepers)
app.use(cors()); // Allow Frontend to talk to Backend
app.use(express.json()); // Allow the app to understand JSON data

// 4. Test Route (To check if server is alive)
app.get('/', (req, res) => {
  res.send('GridPulse Systems Online - Backend is Running');
});

// 5. Connect to MongoDB (We will fill this in Day 2)
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

// 6. Start the Server
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});