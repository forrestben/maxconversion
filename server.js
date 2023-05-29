const express = require('express');
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

// Route handler for the root URL ("/")
app.get('/', (req, res) => {
  res.send('Welcome to the MaxConversion app!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
