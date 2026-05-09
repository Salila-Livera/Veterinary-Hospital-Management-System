require('dotenv').config(); // Import dotenv
const express = require('express');
const mongoose = require('mongoose'); // Import mongoose
const cors = require('cors'); // Import cors
const app = express(); // Express app
const UserModel = require('./models/Users'); // Import user model

app.use(cors()); // Use CORS
app.use(express.json()); // Use express JSON

// Basic route to test the server
app.get('/', (req, res) => {
  res.json({ mssg: 'Welcome to the server!' });
});

// MongoDB connection using environment variables for better security
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'web'  // Explicitly specify the database name
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err); // Log full error
});

// GET request to retrieve all users
app.get('/users', (req, res) => {
  UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
});

app.post('/createUser', async (req, res) => {
  try {
    // Create a new user with the data from the request body
    const newUser = new UserModel({
      ID: req.body.ID,
      Email: req.body.Email,
      Password: req.body.Password,
      Name: req.body.Name,
      Address: req.body.Address,
      AnimalType: req.body.AnimalType
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json(newUser); // Return the newly created user with auto-generated ID
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { ID: req.params.id }, // Search by custom ID field
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

  
  

app.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await UserModel.findOneAndDelete({ ID: req.params.id }); // Use custom ID field
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post('/login', async (req, res) => {
  const { Email, Password } = req.body;

  try {
    // Find the user by email
    const user = await UserModel.findOne({ Email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the passwords match
    if (user.Password !== Password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // If login is successful, return a success message
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

  
  

// Server listens on PORT from .env or default to 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
