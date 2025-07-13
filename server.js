const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();
const { MongoClient } = require('mongodb');

const mongoUrl = process.env.MONGODB_URI
const dbName = 'users';

// Connect to MongoDB
MongoClient.connect(mongoUrl, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to MongoDB');
        db = client.db(dbName);

        // Start the server after DB connection is established
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    })
    .catch(error => console.error(error));

// Route 1: Home route
app.get('/', (req, res) => {
    res.send('Hello from the Home route!');
});

// Route 2: About route
app.get('/about', (req, res) => {
    res.send('This is the About route.');
});
