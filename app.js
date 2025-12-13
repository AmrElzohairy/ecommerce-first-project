const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const app = express();

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 3000;
const CURRENT_ENV = process.env.CURRENT_ENV || 'development';

// Middleware
if (CURRENT_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
    res.send('Welcome to the E-commerce API');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running in ${CURRENT_ENV} mode on port ${PORT} and http://localhost:${PORT}`);
});

