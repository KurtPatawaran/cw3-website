// Import the express library
const express = require('express');
// Create an instance of the express application
const app = express();
// Import the path module
const path = require("path");

// Import the MongoDB library
const { MongoClient, ObjectID } = require('mongodb');

// Resolve the path for the 'static' directory
const staticPath = path.resolve(__dirname, "static");

// Use the express.json middleware for parsing JSON requests
app.use(express.json());

// Set up middleware for handling CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    next();
});

// Connect to MongoDB
const uri = 'mongodb+srv://kurtxsp:website@clustercw2.iexxwoz.mongodb.net/';
const dbName = 'website';

async function connectToDB() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db(dbName);
        return db;
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    }
}

// Serve static files from the 'static' directory
app.use(express.static(staticPath));

// Custom middleware for handling 404 errors related to static files
app.use((req, res, next) => {
    if (req.originalUrl.startsWith('/Icons/')) {
        res.status(404).send("Static File does not exist");
    } else {
        next(); // Let other routes and middleware handle non-static file errors
    }
});

// Handle GET request for the root path
app.get('/', (req, res, next) => {
    res.send('Select a collection, e.g., /collection/messages');
});

// Handle GET request for a specific collection
app.get('/collection/:collectionName', async (req, res, next) => {
    try {
        const db = await connectToDB();
        const collection = db.collection(req.params.collectionName);
        const data = await collection.find({}).toArray();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Handle POST request to insert data into a collection
app.post('/collection/:collectionName', async (req, res, next) => {
    try {
        const db = await connectToDB();
        const collection = db.collection(req.params.collectionName);
        const result = await collection.insertOne(req.body);
        res.json(result.ops);
    } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Set the port for the server
const port = process.env.PORT || 3000;
// Start the server and listen on the specified port
app.listen(port, () => {
    console.log('Server is running on port', port);
});
