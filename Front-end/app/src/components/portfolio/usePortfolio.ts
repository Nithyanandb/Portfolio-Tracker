// import { useState, useEffect } from 'react';
// import { useAuth } from '../hooks/useAuth';
// import { useNavigate } from 'react-router-dom';
// import { PortfolioHolding, PortfolioStats } from './Portfolio';

// export const usePortfolio = () => {
//   const [holdings, setHoldings] = useState<PortfolioHolding[]>([]);
//   const [stats, setStats] = useState<PortfolioStats | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { isAuthenticated, token } = useAuth();
//   const navigate = useNavigate();

//   const fetchPortfolioData = async () => {
//     try {
//       setLoading(true);
//       const response = await getPortfolioHoldings();
      
//       if (response.success) {
//         const updatedHoldings = response.data.map(holding => ({
//           ...holding,
//           marketValue: holding.currentPrice * holding.quantity,
//           totalReturn: ((holding.currentPrice - holding.averagePrice) / holding.averagePrice) * 100
//         }));
//         setHoldings(updatedHoldings);
//       }
//     } catch (err) {
//       setError('Failed to load portfolio');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch initial data
//   useEffect(() => {
//     fetchPortfolioData();
//     // Update every 30 seconds
//     const interval = setInterval(fetchPortfolioData, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   return {
//     holdings,
//     stats,
//     loading,
//     error,
//     refetch: fetchPortfolioData
//   };
// };