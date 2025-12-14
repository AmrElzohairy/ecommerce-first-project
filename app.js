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

// 404 Handler - Must be after all routes
app.use((req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: 'error',
        message: err.message,
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running in ${CURRENT_ENV} mode on port ${PORT} and http://localhost:${PORT}`);
});

