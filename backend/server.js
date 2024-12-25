const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const chatgptRoutes = require('./routes/chatgptRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const PORT = process.env.PORT || 8090;

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', chatgptRoutes);
app.use('/slack', notificationRoutes);

// Connect to MongoDB
mongoose.connect("mongodb+srv://adithyanat20:h5KfJs5eNT9irP2J@job-search.slzdg.mongodb.net/?retryWrites=true&w=majority&appName=job-search", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Failed:", err));

app.get('/', (req, res) => {
    res.send('Job Automation Tool API is running');
});

app.get('/health', (req, res) => {
    // Perform basic health checks here
    const healthcheck = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now()
    };
  
    // Check for any errors
    try {
      // You can add more checks here, e.g., database connection, etc.
      res.status(200).json(healthcheck);
    } catch (e) {
      healthcheck.message = e.message;
      res.status(503).json(healthcheck);
    }
  });


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
