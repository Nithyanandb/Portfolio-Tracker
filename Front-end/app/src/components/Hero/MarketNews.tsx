import React from 'react';
import { Newspaper } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { API_CONFIG } from '../config/API_CONFIG';
import { formatTimeAgo } from './formatters';

const MarketNews: React.FC = () => {
  const { data: news } = useQuery({
    queryKey: ['market-news'],
    queryFn: () => fetch(API_CONFIG.getEndpointUrl('NEWS')).then(res => res.json()),
    refetchInterval: API_CONFIG.CACHE_DURATION,
  });

  return (
    <div className="bg-gray-900 rounded-xl border border-white/10">
      <div className="flex items-center gap-2 p-4 border-b border-white/10">
        <Newspaper className="w-5 h-5 text-blue-400" />
        <h2 className="text-lg font-semibold text-white">Market News</h2>
      </div>
      <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
        {news?.map((item: any) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all"
          >
            <h3 className="font-medium text-white">{item.headline}</h3>
            <p className="text-sm text-gray-400 mt-1">{item.summary}</p>
            <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
              <span>{item.source}</span>
              <span>{formatTimeAgo(item.datetime)}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default MarketNews;