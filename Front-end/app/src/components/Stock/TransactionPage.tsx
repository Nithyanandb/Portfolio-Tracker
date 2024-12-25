/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import StockChart from '../Stock/StockChart';
import StockMetrics from '../Stock/StockMetrics';
import TransactionHeader from '../Stock/TransactionHeader';
import QuantityInput from '../Stock/QuantityInput';
import TransactionActions from '../Stock/TransactionActions';
import ErrorState from '../Stock/ErrorState';
import { generateMockChartData, generateMockMetrics } from './mockDataGenerators';
import MarketDashboard from '../Hero/MarketDashboard';
import Headertx from '../Stock/Headertx';
import DynamicBackground from '../background/DynamicBackground';
import StockCard from './StockCard';
import Chartx from './Chartx';


interface LocationState {
  stock: {
    id: string;
    name: string;
    price: number;
  };
}

const TransactionPage: React.FC = () => {
  const { type, symbol } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { stock } = (location.state as LocationState) || {};
  const [quantity, setQuantity] = useState(1);

  if (!type || !symbol) {
    return <ErrorState message="Invalid Stock Information" onReturn={() => navigate('/')} />;
  }

  if (!stock) {
    return <ErrorState message="Stock not found" onReturn={() => navigate('/')} />;
  }

  const mockChartData = generateMockChartData(stock.price);
  const mockMetrics = generateMockMetrics();
  const trend = mockChartData[mockChartData.length - 1].price > mockChartData[0].price ? 'up' : 'down';

  const handleConfirm = () => {
    console.log(`${type.toUpperCase()} ${quantity} shares of ${stock.name} (${symbol}) at $${stock.price} per share`);
  };

  return (
      <div className="m-0 p-0" >
        <DynamicBackground sections={[]} currentSection={0}/>
        <Headertx user={null} onLogout={function (): void {
          throw new Error('Function not implemented.');
        } } onLogin={function (user: unknown): void {
          throw new Error('Function not implemented.');
        } }/> 
      <div className="min-screen bg-black/10 backdrop-blur-xl lg:mt-0 py-0 flex">

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-10 py-14 flex-1"
      >
        <div className="max-w-3xl mx-auto bg-black/10 backdrop-blur-xl rounded-xl py-10 px-0  mt-20">
          <TransactionHeader
            name={stock.name}
            symbol={symbol}
            price={stock.price}
            trend={trend}
          />
          {/* <Chartx data={[]} symbol={''}/> */}
          <StockChart data={mockChartData} trend={trend} />
          
          <div className="mt-20 mb-8">
            <StockMetrics metrics={mockMetrics} trend={trend} />
          </div>

          <QuantityInput
            quantity={quantity}
            price={stock.price}
            onChange={setQuantity}
          />

          <TransactionActions
            type={type}
            onCancel={() => navigate('/')}
            onConfirm={handleConfirm}
          />
        </div>
      </motion.div>

      {/* Sidebar */}
      <div className="bg-black/10 backdrop-blur-xl py-12 rounded-xl mr-20" style={{width:'470px'}}>
        <MarketDashboard />
      </div>
    </div>
    </div>
  );
};

export default TransactionPage;
