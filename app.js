const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./connections/db.connection');
const app = express();
const categoriesRoute = require('./routes/categories.route');


// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 3000;
const CURRENT_ENV = process.env.CURRENT_ENV || 'development';

// Middleware
if (CURRENT_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());

// Routes
app.use('/api/v1/categories', categoriesRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running in ${CURRENT_ENV} mode on port ${PORT} and http://localhost:${PORT}`);
});

