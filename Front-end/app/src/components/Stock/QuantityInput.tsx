import React from 'react';
import { motion } from 'framer-motion';

interface QuantityInputProps {
  quantity: number;
  price: number;
  onChange: (value: number) => void;
}

const QuantityInput: React.FC<QuantityInputProps> = ({ quantity, price, onChange }) => {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (newValue > 0) {
      onChange(newValue);
    } else {
      onChange(1);
    }
  };

  const totalPrice = price * quantity;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 p-6 rounded-xl space-y-4"
    >
      <label className="block text-gray-400 tracking-[0.2em]">QUANTITY</label>
      <div className="flex items-center gap-6">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          className="bg-white/10 border border-white/10 rounded-lg px-4 py-2 w-32 text-white font-light tracking-wider focus:outline-none focus:border-blue-500"
        />
        <div className="flex-1 text-right">
          <p className="text-gray-400 tracking-[0.2em] text-sm">TOTAL</p>
          <p className="text-xl text-white font-light tracking-wider">
            ${totalPrice.toFixed(2)}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default QuantityInput;
