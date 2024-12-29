import React from 'react';
import { useForm } from 'react-hook-form';
import type { TradeRequest } from '../types/trading';

interface TradingFormProps {
  onSubmit: (data: TradeRequest) => void;
}

export const TradingForm: React.FC<TradingFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<TradeRequest>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Symbol
        </label>
        <input
          {...register('symbol', { required: 'Symbol is required' })}
          className="w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-2 text-white"
          placeholder="e.g. AAPL"
        />
        {errors.symbol && (
          <p className="mt-1 text-sm text-red-400">{errors.symbol.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Quantity
        </label>
        <input
          type="number"
          {...register('quantity', { 
            required: 'Quantity is required',
            min: { value: 1, message: 'Quantity must be at least 1' }
          })}
          className="w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-2 text-white"
        />
        {errors.quantity && (
          <p className="mt-1 text-sm text-red-400">{errors.quantity.message}</p>
        )}
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          name="action"
          value="buy"
          className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Buy
        </button>
        <button
          type="submit"
          name="action"
          value="sell"
          className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Sell
        </button>
      </div>
    </form>
  );
};