import React from 'react';
import { Play, Clock, ChevronRight } from 'lucide-react';
import Header from '../Header';

const TechnicalAnalysisPage = () => {
  const chapters = [
    {
      title: "Introduction to Technical Analysis",
      lessons: [
        { title: "What is Technical Analysis", duration: "15 min", completed: true },
        { title: "Price Action Basics", duration: "20 min", completed: true },
        { title: "Understanding Charts", duration: "25 min", completed: false }
      ]
    },
    {
      title: "Chart Patterns",
      lessons: [
        { title: "Support and Resistance", duration: "30 min", completed: false },
        { title: "Trend Lines", duration: "25 min", completed: false },
        { title: "Candlestick Patterns", duration: "35 min", completed: false }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="max-w-7xl mx-auto px-4 pt-32 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar - Course Progress */}
          <div className="w-full md:w-72">
            <div className="bg-white/5 rounded-lg p-6 sticky top-6">
              <div className="mb-6">
                <h2 className="text-xl font-light mb-2">Course Progress</h2>
                <div className="h-2 bg-white/10 rounded-full">
                  <div className="h-2 bg-red-500 rounded-full w-1/3" />
                </div>
                <p className="text-sm text-gray-400 mt-2">3 of 9 lessons completed</p>
              </div>
              
              <div className="space-y-4">
                <button className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 py-2 rounded-lg transition-colors">
                  <Play size={16} />
                  Continue Learning
                </button>
                <button className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 py-2 rounded-lg transition-colors">
                  Download Resources
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-3xl font-light mb-6">Technical Analysis</h1>
            {chapters.map((chapter, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-xl mb-4">{chapter.title}</h2>
                <div className="space-y-4">
                  {chapter.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lessonIndex}
                      className="flex items-center justify-between bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${lesson.completed ? 'bg-green-500/20 text-green-400' : 'bg-white/10'}`}>
                          {lesson.completed ? '✓' : lessonIndex + 1}
                        </div>
                        <div>
                          <h3 className="font-medium">{lesson.title}</h3>
                          <span className="text-sm text-gray-400 flex items-center gap-1">
                            <Clock size={14} />
                            {lesson.duration}
                          </span>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalAnalysisPage;