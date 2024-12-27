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

// CORS Configuration
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || // Allow internal calls without origin (e.g., health checks)
            origin.startsWith('https://job-automation-tool') || // Allow your production frontend
            origin.startsWith('http://localhost:5173') || // local frontend
            origin.startsWith('http://localhost:8090')) { // Allow localhost (for local testing)
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

// Apply CORS middleware
app.use(cors(corsOptions));

// API Routes
app.use('/api', chatgptRoutes);
app.use('/slack', notificationRoutes);

// Connect to MongoDB
mongoose.connect(
    process.env.MONGO_URI, 
    { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Failed:", err));

// Root Endpoint
app.get('/', (req, res) => {
    res.send('Job Automation Tool API is running');
});

// Health Check Endpoint
app.get('/health', (req, res) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
    };

    try {
        res.status(200).json(healthcheck);
    } catch (e) {
        healthcheck.message = e.message;
        res.status(503).json(healthcheck);
    }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
