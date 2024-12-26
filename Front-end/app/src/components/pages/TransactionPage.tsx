  import React, { useState } from 'react';
  import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
  import { motion } from 'framer-motion';
  import StockChart from '../Stock/StockChart';
  import StockMetrics from '../Stock/StockMetrics';
  import TransactionHeader from '../Stock/TransactionHeader';
  import QuantityInput from '../Stock/QuantityInput';
  import TransactionActions from '../Stock/TransactionActions';
  import ErrorState from '../Stock/ErrorState';
  import Popup from '../ui/Popup';
  import { usePopup } from '../hooks/usePopup';
  import { generateMockChartData, generateMockMetrics } from '../Stock/mockDataGenerators';
  import MarketDashboard from '../Hero/MarketDashboard';
  import Headertx from '../Stock/Headertx';
  import DynamicBackground from '../background/DynamicBackground';
  import { buyStock, sellStock } from '../Stock/transactionApi';

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
    const { popup, showPopup, hidePopup } = usePopup();
    
    if (!type || !symbol) {
      return <ErrorState message="Invalid Stock Information" onReturn={() => navigate('/')} />;
    }

    if (!stock) {
      return <ErrorState message="Stock not found" onReturn={() => navigate('/')} />;
    }

    const mockChartData = generateMockChartData(stock.price);
    const mockMetrics = generateMockMetrics();
    const trend = mockChartData[mockChartData.length - 1].price > mockChartData[0].price ? 'up' : 'down';

    const handleConfirm = async () => {
      try {
        const transaction = {
          stockSymbol: symbol,
          stockName: stock.name,
          quantity,
          price: stock.price * quantity,
        };

        if (type === 'buy') {
          await buyStock(transaction);
          showPopup(`Successfully purchased ${quantity} shares of ${symbol}`, 'success');
        } else if (type === 'sell') {
          await sellStock(transaction);
          showPopup(`Successfully sold ${quantity} shares of ${symbol}`, 'success');
        }

        // Navigate after popup closes
        setTimeout(() => {
          navigate('/');
        }, 5000);
      } catch (error) {
        showPopup(`Failed to ${type} ${symbol}. Please try again.`, 'error');
      }
    };

    return (
      <div className="m-0 p-0">
        <Popup
          isOpen={popup.isOpen}
          message={popup.message}
          type={popup.type}
          onClose={hidePopup}
        />
        <DynamicBackground sections={[]} currentSection={0} />
        <Headertx
          user={null}
          onLogout={() => {}}
          onLogin={() => {}}
        />
        <div className="min-screen bg-black/10 backdrop-blur-xl lg:mt-0 py-0 flex">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container mx-auto px-10 py-14 flex-1"
          >
            <div className="max-w-3xl mx-auto bg-black/10 backdrop-blur-xl rounded-xl py-10 px-0 mt-20">
              <TransactionHeader
                name={stock.name}
                symbol={symbol}
                price={stock.price}
                trend={trend}
              />
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

            {/* <Link to={`/AllStocks`} className="bg-gray-1000 glass-button text-white p-2 rounded mt-4 ml-20 inline-block">
  Edit Stock Details
</Link> */}
          </motion.div>

          {/* Sidebar */}
          <div className="bg-black/10 backdrop-blur-xl py-12 rounded-xl mr-20" style={{ width: '470px' }}>
            <MarketDashboard />
          </div>

        </div>
      </div>
    );
  };

  export default TransactionPage;