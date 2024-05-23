const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

let stocks = [];
let nextStockId = 1;

app.use(express.json());
app.use(cors());

// Get all stocks
app.get('/stocks', (req, res) => {
  res.json(stocks);
});

// Get a specific stock by id
app.get('/stocks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const stock = stocks.find(stock => stock.id === id);
  if (!stock) {
    return res.status(404).json({ message: 'Stock not found' });
  }
  res.json(stock);
});

// Create a new stock
app.post('/stocks', (req, res) => {
  const { name, quantity, price, totalPrice } = req.body;
  const newStock = { id: nextStockId++, name, quantity, price, totalPrice };
  stocks.push(newStock);
  res.status(201).json(newStock);
});

// Update an existing stock by id
app.put('/stocks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const stockIndex = stocks.findIndex(stock => stock.id === id);
  if (stockIndex === -1) {
    return res.status(404).json({ message: 'Stock not found' });
  }
  const { name, quantity, price, totalPrice } = req.body;
  stocks[stockIndex] = { id, name, quantity, price, totalPrice };
  res.json(stocks[stockIndex]);
});

// Delete an existing stock by id
app.delete('/stocks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const stockIndex = stocks.findIndex(stock => stock.id === id);
  if (stockIndex === -1) {
    return res.status(404).json({ message: 'Stock not found' });
  }
  stocks.splice(stockIndex, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
