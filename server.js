const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

let tests = [];

// Create a new test
app.post('/tests', (req, res) => {
  const test = req.body;
  tests.push(test);
  res.status(201).send();
});

// Get a list of all tests
app.get('/tests', (req, res) => {
  res.json(tests);
});

// Update a test
app.put('/tests/:id', (req, res) => {
  const id = req.params.id;
  const updatedTest = req.body;

  let wasUpdated = false;
  tests = tests.map(test => {
    if (test.id === id) {
      wasUpdated = true;
      test = updatedTest;
    }
    return test;
  });

  if (wasUpdated) {
    res.send();
  } else {
    res.status(404).send();
  }
});

// Serve static files from the "public" directory
app.use(express.static('maxconversion/public'));

// Route handler for the root URL ("/")
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'maxconversion', 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
