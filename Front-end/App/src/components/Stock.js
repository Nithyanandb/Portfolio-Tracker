import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

function Stock() {
  const [stock, setStock] = useState({});

  useEffect(() => {
    // Fetch stock from API
    fetch('/api/stock')
      .then(response => response.json())
      .then(data => setStock(data));
  }, []);

  const handleBuy = () => {
    // Call API to buy stock
    fetch('/api/buy-stock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stockId: stock.id, quantity: 1 }),
    })
      .then(response => response.json())
      .then(data => console.log(data));
  };

  const handleSell = () => {
    // Call API to sell stock
    fetch('/api/sell-stock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stockId: stock.id, quantity: 1 }),
    })
      .then(response => response.json())
      .then(data => console.log(data));
  };

  return (
    <div>
      <h1>Stock</h1>
      <Form>
        <Form.Group controlId="stockName">
          <Form.Label>Stock Name</Form.Label>
          <Form.Control type="text" value={stock.name} readOnly />
        </Form.Group>
        <Form.Group controlId="stockPrice">
          <Form.Label>Stock Price</Form.Label>
          <Form.Control type="number" value={stock.price} readOnly />
        </Form.Group>
        <Button variant="primary" onClick={handleBuy}>
          Buy
        </Button>
        <Button variant="danger" onClick={handleSell}>
          Sell
        </Button>
      </Form>
    </div>
  );
}

export default Stock;