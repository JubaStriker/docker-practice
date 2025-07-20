const express = require('express');
const app = express();
const port = 5500;
require('dotenv').config();
const { MongoClient } = require('mongodb');

const mongoUrl = process.env.MONGODB_URI
const dbName = 'users';
let db;

// Connect to MongoDB
MongoClient.connect(mongoUrl)
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

app.get('/users', async (req, res) => {
    try {
        const users = await db.collection('users').find({}).toArray();
        res.status(200).send(users)
    }
    catch (e) {
        console.error('Failed to get users:', e);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// Route 2: About route
app.post('/addUser', async (req, res) => {
    try {
        const userObject = req.body;

        if (!userObject || !userObject.name) {
            return res.status(400).send({ error: 'Invalid user data' });
        }

        const result = await db.collection('users').insertOne(userObject);

        res.status(201).send({
            message: 'User added successfully',
            userId: result.insertedId
        });
    } catch (err) {
        console.error('Failed to insert user:', err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});
