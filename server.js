const express = require('express');
const app = express();
const path = require('path');

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Replace * with the specific domain if needed
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Set the MIME type for JavaScript files
app.get('/app.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'public', 'app.js'));
});


// Route handler for the root URL ("/")
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Set the MIME type for JavaScript files
app.get('/maxconversion.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'public', 'maxconversion.js'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
