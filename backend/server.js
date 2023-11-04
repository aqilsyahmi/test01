const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 4000;

const authRoute = require("./routes/authRoute");
const cartRoute = require("./routes/cartRoute");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
const filterRoute = require("./routes/filterRoute");
const { notFound } = require('./middlewares/errorHandler');

const corsOptions = {
  origin: 'http://54.169.168.70:4000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoute);
app.use('/api/cart', cartRoute);
app.use('/api/products', productRoute);
app.use('/api/categories', categoryRoute);
app.use('/uploads', express.static('uploads'));
app.use('/api/filter', filterRoute);

app.get('/', (req, res) => {
    res.json({ message: "Backend server is running!!" });
});

// Serve static files from the frontend's build directory
app.use(express.static(path.join(__dirname, '../frontend/client/build')));

// Catch-all handler: for any request that doesn't match any of the above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/client/build/index.html'));
});

app.use(notFound);

// Connect to DB and then start the servers
const connectDB = require("./database/db");

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at PORT ${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to connect to DB:", error);
    process.exit(1);
});
