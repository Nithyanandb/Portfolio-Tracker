import React from 'react';
import { Target, Clock, BookOpen } from 'lucide-react';
import Header from '../Header';

const FundamentalAnalysisPage = () => {
  const topics = [
    {
      title: "Financial Statements",
      modules: [
        { name: "Balance Sheet Analysis", status: "completed" },
        { name: "Income Statement Deep Dive", status: "in-progress" },
        { name: "Cash Flow Statement", status: "locked" }
      ]
    },
    {
      title: "Valuation Metrics",
      modules: [
        { name: "P/E Ratio", status: "locked" },
        { name: "Price to Book Value", status: "locked" },
        { name: "EBITDA Multiples", status: "locked" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="max-w-7xl mx-auto px-4 pt-32 py-12">
        <h1 className="text-3xl font-light mb-8">Fundamental Analysis</h1>
        
        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: <Target />, label: "Course Progress", value: "35%" },
            { icon: <Clock />, label: "Time Spent", value: "4.5 hrs" },
            { icon: <BookOpen />, label: "Modules Completed", value: "2/8" }
          ].map((stat, index) => (
            <div key={index} className="bg-white/5 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                {stat.icon}
                <span className="text-gray-400">{stat.label}</span>
              </div>
              <div className="text-2xl font-light">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Course Content */}
        <div className="space-y-8">
          {topics.map((topic, index) => (
            <div key={index}>
              <h2 className="text-xl mb-4">{topic.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topic.modules.map((module, moduleIndex) => (
                  <div
                    key={moduleIndex}
                    className={`p-6 rounded-lg ${
                      module.status === 'locked' ? 'bg-white/5 opacity-50' : 'bg-white/10'
                    }`}
                  >
                    <h3 className="font-medium mb-2">{module.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">
                        {module.status === 'completed' ? '✓ Completed' :
                         module.status === 'in-progress' ? '▶ In Progress' :
                         '🔒 Locked'}
                      </span>
                      {module.status !== 'locked' && (
                        <button className="text-sm text-red-400 hover:text-red-300">
                          Continue
                        </button>
                      )}
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

export default FundamentalAnalysisPage;