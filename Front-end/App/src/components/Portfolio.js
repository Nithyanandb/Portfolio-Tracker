import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

function Portfolio() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    // Fetch stocks from API
    fetch('/api/stocks')
      .then(response => response.json())
      .then(data => setStocks(data));
  }, []);

  return (
    <div>
      <h1>Portfolio</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Stock</th>
            <th>Quantity</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map(stock => (
            <tr key={stock.id}>
              <td>{stock.name}</td>
              <td>{stock.quantity}</td>
              <td>{stock.value}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Portfolio;