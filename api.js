// File: api.js
// This file handles API interactions in the frontend app

// Make a GET request to fetch data from the backend
fetch('https://maxconversion--forrestben.repl.co/api/data')
  .then(response => response.json())
  .then(data => {
    // Handle the response data
    console.log(data);
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });

// Make a POST request to send data to the backend
fetch('https://maxconversion--forrestben.repl.co/api/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'John', age: 30 })
})
  .then(response => response.json())
  .then(data => {
    // Handle the response data
    console.log(data);
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });
