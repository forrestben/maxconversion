const express = require('express');
const app = express();
const path = require('path');
const WebSocket = require('ws');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// WebSocket connection handling
const wss = new WebSocket.Server({ noServer: true });
let externalSocket = null;

// Handle WebSocket upgrade request
app.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (socket) => {
    wss.emit('connection', socket, request);
  });
});

// WebSocket connection handling
wss.on('connection', (socket) => {
  // Store the external socket reference
  externalSocket = socket;
});

app.post('/apply-style', (req, res) => {
  const { selector, style } = req.body;

  // Check if the selector and style were provided
  if (!selector || !style) {
    return res.status(400).send({ error: 'Invalid request body' });
  }

  // Send the styling change to the external site
  if (externalSocket && externalSocket.readyState === WebSocket.OPEN) {
    externalSocket.send(JSON.stringify({ type: 'stylingChange', selector, style }));
  }

  res.send({ status: 'ok' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
