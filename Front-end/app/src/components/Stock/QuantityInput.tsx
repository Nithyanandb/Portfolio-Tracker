import React from 'react';

interface QuantityInputProps {
  quantity: number;
  price: number;
  onChange: (value: number) => void;
}

const QuantityInput: React.FC<QuantityInputProps> = ({ quantity, price, onChange }) => {
  // Ensure quantity value is an integer and is at least 1
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    // If new value is a valid number and greater than 0, update; otherwise, use 1 as fallback
    if (newValue > 0) {
      onChange(newValue);
    } else {
      onChange(1);  // Ensuring a minimum value of 1
    }
  };

  const totalPrice = price * quantity; // Calculate the total price dynamically

  return (
    <div className="bg-white/5 p-4 rounded-lg mb-6">
      <label className="block text-gray-400 mb-2">Quantity</label>
      <div className="flex items-center gap-4">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          className="bg-white/10 border border-gray-600 rounded-lg px-4 py-2 w-32 text-white"
        />
        <p className="text-lg">
          Total: <span className="font-semibold">${totalPrice.toFixed(2)}</span> {/* Dynamically display total */}
        </p>
      </div>
    </div>
  );
};

export default QuantityInput;
