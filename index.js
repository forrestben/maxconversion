const express = require('express');
const cors = require('cors');
const path = require('path');
const puppeteer = require('puppeteer');

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/get-screenshot', async (req, res) => {
  const { url } = req.body;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const screenshot = await page.screenshot({ encoding: 'base64' });

  await browser.close();

  res.status(200).json({ screenshot });
});

app.post('/update-styling', async (req, res) => {
  const { url, elementPath, style, value } = req.body;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.evaluate((elementPath, style, value) => {
    const element = document.querySelector(elementPath);
    if (element) {
      element.style[style] = value;
    }
  }, elementPath, style, value);

  await browser.close();

  res.status(200).json({ message: 'Styling changes applied successfully' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
