const express = require('express');
const apiRoutes = require('./routes/apiRoutes/notes');

// Creating an instance of express
const app = express();

// Assigning the PORT 
const PORT = process.env.PORT || 3000;

// Handle the url encoded data
app.use(express.urlencoded({
	extended: true
}));

// Handle the raw json
app.use(express.json());

// Include the static folder using the middleware (i.e public folder)
app.use(express.static(`public`));

// Use Api Routes
app.use('/api',apiRoutes);

// Listening 
app.listen(PORT, (req, res) => console.log(`Listening on the Port ${PORT}`));