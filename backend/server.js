const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mongoose=require('mongoose');

dotenv.config();

const app = express();
app.use(cors()); // Enable CORS for frontend-backend communication
app.use(express.json()); // Parse JSON requests

const PORT = process.env.PORT || 3000;

// Middleware to validate Auth0 JWT tokens
function verifyJWT(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  jwt.verify(token, process.env.AUTH0_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send('Invalid Token');
    }
    req.user = decoded;
    next();
  });
}
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Example secured route
app.get('/api/data', verifyJWT, (req, res) => {
  res.json({ message: 'Secure data accessed', user: req.user });
});

// Public route (no authentication required)
app.get('/api/public', (req, res) => {
  res.json({ message: 'Public data accessed' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
