import React, { useState } from "react";
import axios from "axios";

const AddStockForm = () => {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stockData = {
      symbol: symbol,
      quantity: quantity,
      purchase_Price: purchasePrice,
      type: type,
    };

    try {
      const token = localStorage.getItem("authToken"); // Assuming JWT is stored in localStorage
      const response = await axios.post(
        "http://localhost:2000/stocks/add", 
        stockData, 
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      console.log("Stock added successfully:", response.data);
    } catch (error) {
      console.error("There was an error adding the stock:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Stock Symbol" 
        value={symbol} 
        onChange={(e) => setSymbol(e.target.value)} 
        required 
      />
      <input 
        type="number" 
        placeholder="Quantity" 
        value={quantity} 
        onChange={(e) => setQuantity(e.target.value)} 
        required 
      />
      <input 
        type="number" 
        placeholder="Purchase Price" 
        value={purchasePrice} 
        onChange={(e) => setPurchasePrice(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        placeholder="Type" 
        value={type} 
        onChange={(e) => setType(e.target.value)} 
        required 
      />
      <button type="submit">Add Stock</button>
    </form>
  );
};

export default AddStockForm;
