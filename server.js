require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'web')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Mongoose Schema and Model for User Data
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
});

const User = mongoose.model('User', userSchema);

// Routes
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users); // Send list of users as JSON
  } catch (err) {
    res.status(500).send('Error fetching users');
  }
});

app.post('/users', async (req, res) => {
  try {
    const { name, surname, age, email } = req.body;
    if (!name || !surname || !age || !email) {
      return res.status(400).send('All fields are required');
    }

    const newUser = new User({ name, surname, age, email });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error during save:', err);
    res.status(500).send('Error creating user');
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, age, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, surname, age, email },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).send('Error updating user');
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.send('User deleted successfully');
  } catch (err) {
    res.status(500).send('Error deleting user');
  }
});

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// Get user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user);
  } catch (err) {
    res.status(500).send('Error retrieving user');
  }
});
