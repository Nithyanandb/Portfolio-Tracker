import React from 'react';
import { ChevronRight, Clock } from 'lucide-react';
import Header from '../Header';

const TradingStrategiesPage = () => {
  const strategies = [
    {
      title: "Day Trading Strategies",
      description: "Short-term trading techniques",
      lessons: [
        { name: "Scalping Basics", duration: "30 min" },
        { name: "Momentum Trading", duration: "45 min" },
        { name: "Range Trading", duration: "40 min" }
      ]
    },
    {
      title: "Swing Trading",
      description: "Medium-term position strategies",
      lessons: [
        { name: "Trend Following", duration: "35 min" },
        { name: "Breakout Trading", duration: "40 min" },
        { name: "Multiple Time Frame Analysis", duration: "50 min" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="max-w-7xl mx-auto px-4 pt-32 py-12">
        <h1 className="text-3xl font-light mb-8">Trading Strategies</h1>

        {/* Featured Strategy */}
        <div className="bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-lg p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h2 className="text-2xl font-light mb-4">Advanced Price Action Trading</h2>
              <p className="text-gray-400 mb-6">Master the art of reading pure price action and making trading decisions without indicators.</p>
              <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg transition-colors">
                Start Learning
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="flex gap-8 text-center">
              <div>
                <div className="text-2xl font-light mb-1">6</div>
                <div className="text-sm text-gray-400">Modules</div>
              </div>
              <div>
                <div className="text-2xl font-light mb-1">4.8</div>
                <div className="text-sm text-gray-400">Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Strategy List */}
        <div className="space-y-8">
          {strategies.map((strategy, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-6">
              <div className="mb-6">
                <h2 className="text-xl font-medium mb-2">{strategy.title}</h2>
                <p className="text-gray-400">{strategy.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {strategy.lessons.map((lesson, lessonIndex) => (
                  <div
                    key={lessonIndex}
                    className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <h3 className="font-medium mb-2">{lesson.name}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {lesson.duration}
                      </span>
                      <button className="text-red-400 hover:text-red-300">
                        Start
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TradingStrategiesPage;