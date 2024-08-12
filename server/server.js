const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

// Enable CORS
app.use(cors());

// Middleware
app.use(express.json());

// Mongoose Configuration
require('./config/mars.config');

// Routes
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// Your API routes
require('./routes/mars.routes')(app);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
