const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const connectDB = require('./connections/db.connection');
const app = express();
const categoriesRoute = require('./routes/categories.route');
const subCategoryRoute = require('./routes/subCategories.route');
const brandRoute = require('./routes/brand.route');
const userRoute = require('./routes/user.route');
const product = require('./routes/product.route');
const ApiError = require('./utils/apiError');


// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
if (NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());

// Routes
app.use('/api/v1/categories', categoriesRoute);
app.use('/api/v1/subCategories', subCategoryRoute);
app.use("/api/v1/brand", brandRoute),
app.use("/api/v1/products", product);
app.use("/api/v1/users", userRoute);

// 404 Handler - Must be after all routes
app.use((req, res, next) => {
    next(new ApiError(404, 'Route not found'));
});

// Error handling middleware
app.use(globalErrorHandler);

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is running in ${NODE_ENV} mode on port ${PORT} and http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error("❌ Unhandled Rejection Error...", `Error name: ${err.name}...`, `Error message: ${err.message}`);
    server.close(() => {
        console.error("❌ Unhandled Rejection Error... Server is shutting down...");
        process.exit(1);
    });
});

