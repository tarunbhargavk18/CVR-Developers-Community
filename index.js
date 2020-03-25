const express = require('express');
const connectDB = require('./config/db');
const app = express();

//Connect Database
connectDB();


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));