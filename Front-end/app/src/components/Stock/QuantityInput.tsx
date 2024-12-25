import React from 'react';

interface QuantityInputProps {
  quantity: number;
  price: number;
  onChange: (value: number) => void;
}

const QuantityInput: React.FC<QuantityInputProps> = ({ quantity, price, onChange }) => (
  <div className="bg-white/5 p-4 rounded-lg mb-6">
    <label className="block text-gray-400 mb-2">Quantity</label>
    <div className="flex items-center gap-4">
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => onChange(Math.max(1, parseInt(e.target.value) || 1))}
        className="bg-white/10 border border-gray-600 rounded-lg px-4 py-2 w-32 text-white"
      />
      <p className="text-lg">
        Total: <span className="font-semibold">${(price * quantity).toFixed(2)}</span>
      </p>
    </div>
  </div>
);

export default QuantityInput;