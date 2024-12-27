const logger = require('./logger');

// Middleware to validate API key
const validateApiKey = (req, res, next) => {
    const clientApiKey = req.headers['x-api-key']; // Header for API key
    const serverApiKey = process.env.API_KEY;

    if (!clientApiKey) {
        logger.warn('Missing API key in the request.');
        return res.status(401).json({ error: 'Unauthorized: API key is missing.' });
    }

    if (clientApiKey !== serverApiKey) {
        logger.warn('Invalid API key provided.');
        return res.status(403).json({ error: 'Forbidden: Invalid API key.' });
    }

    logger.info('API key validated successfully.');
    next(); // Proceed to the next middleware or route handler
};

module.exports = { validateApiKey };
