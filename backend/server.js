const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 4000;
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authRoute");
const cartRoute = require("./routes/cartRoute");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
const filterRoute = require("./routes/filterRoute");
const { notFound } = require('./middlewares/errorHandler');

// CORS settings
const corsOptions = {
    origin: ['http://54.169.168.70:3000', 'http://localhost:3000'], 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

// Middleware
app.use(cors(corsOptions));  // Use the CORS middleware
app.use(morgan('dev'));
app.use(express.json());  // Use express.json instead of bodyParser.json
app.use(express.urlencoded({ extended: true }));  // Use express.urlencoded instead of bodyParser.urlencoded
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoute);
app.use('/api/cart', cartRoute);
app.use('/api/products', productRoute);
app.use('/api/categories', categoryRoute);
app.use('/uploads', express.static('uploads'));
app.use('/api/filter', filterRoute);

// Serve frontend static assets..
app.use(express.static(path.join(__dirname, '../frontend/client/build')));

// Catch-all route to serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/client/build/index.html'));
});

// Error handling middleware
app.use(notFound);

// Connect to the database and start the server
const connectDB = require("./database/db");
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});
