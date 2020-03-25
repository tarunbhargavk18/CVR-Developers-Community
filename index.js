const express = require('express');
const connectDB = require('./config/db');
const app = express();

//Connect Database
connectDB();

//Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/feed', require('./routes/api/feed'));



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));