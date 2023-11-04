const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser")
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 4000;
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authRoute");
const cartRoute = require("./routes/cartRoute");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
const filterRoute = require("./routes/filterRoute");
const {notFound} = require('./middlewares/errorHandler')

const corsOptions = {
  origin: 'http://54.169.168.70:3000', // Replace with the URL of your frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies and authorization headers
};

//middleware
// app.use(cors()); //all requests from all origins
app.use(cors(corsOptions));

app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api/auth", authRoute);
app.use('/api/cart',cartRoute);
app.use('/api/products', productRoute);
app.use('/api/categories', categoryRoute);
app.use('/uploads', express.static('uploads'));
app.use('/api/filter', filterRoute);

app.get('/', (req, res) => {
    res.json({ message: "Backend server is running!" });
});

app.use(notFound)
app.use(cookieParser());

app.use((req, res, next) => {
res.setHeader("Access-Control-Allow-Origin", "http://54.169.168.70:3000") // Replace with your frontend's URL
res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
next()
})


// Connect to DB and then start the server
const connectDB = require("./database/db");

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at PORT ${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to connect to DB:", error);
    process.exit(1);
});






