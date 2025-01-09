import React from 'react';
import { Play, Clock, BookOpen, BarChart2, Brain, Briefcase, ChevronRight } from 'lucide-react';
import Header from '../Header';

const LearnPage = () => {
  const courses = [
    {
      title: "Trading Fundamentals",
      description: "Master the basics of stock market trading",
      lessons: 12,
      duration: "6 hours",
      progress: 60,
      level: "Beginner"
    },
    {
      title: "Technical Analysis",
      description: "Learn chart patterns and indicators",
      lessons: 15,
      duration: "8 hours",
      progress: 30,
      level: "Intermediate"
    },
    {
      title: "Risk Management",
      description: "Advanced risk management strategies",
      lessons: 8,
      duration: "4 hours",
      progress: 0,
      level: "Advanced"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="max-w-7xl mx-auto px-4 pt-32 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-light mb-4">Trading Academy</h1>
          <p className="text-gray-400 max-w-2xl">Master trading with our comprehensive learning paths</p>
        </div>

        {/* Featured Course */}
        <div className="bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-2xl p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <div className="text-red-400 font-medium mb-2">Featured Course</div>
              <h2 className="text-2xl font-light mb-4">Complete Trading Masterclass</h2>
              <p className="text-gray-400 mb-6">From basics to advanced strategies - everything you need to become a professional trader.</p>
              <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg transition-colors">
                <Play size={20} />
                Start Learning
              </button>
            </div>
            <div className="flex gap-8 text-center">
              <div>
                <div className="text-2xl font-light mb-1">24</div>
                <div className="text-sm text-gray-400">Lessons</div>
              </div>
              <div>
                <div className="text-2xl font-light mb-1">12h</div>
                <div className="text-sm text-gray-400">Duration</div>
              </div>
              <div>
                <div className="text-2xl font-light mb-1">4.9</div>
                <div className="text-sm text-gray-400">Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {courses.map((course, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white/10 rounded-lg">
                  {index === 0 ? <BookOpen size={20} /> : 
                   index === 1 ? <BarChart2 size={20} /> : 
                   <Brain size={20} />}
                </div>
                <span className="text-sm text-gray-400">{course.level}</span>
              </div>
              <h3 className="text-lg font-medium mb-2">{course.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{course.description}</p>
              <div className="flex justify-between text-sm text-gray-400 mb-4">
                <span className="flex items-center gap-1">
                  <BookOpen size={16} />
                  {course.lessons} lessons
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={16} />
                  {course.duration}
                </span>
              </div>
              {course.progress > 0 ? (
                <div>
                  <div className="h-1 bg-white/10 rounded-full mb-2">
                    <div 
                      className="h-1 bg-red-500 rounded-full" 
                      style={{width: `${course.progress}%`}}
                    />
                  </div>
                  <span className="text-sm text-gray-400">{course.progress}% complete</span>
                </div>
              ) : (
                <button className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 py-2 rounded-lg transition-colors">
                  Start Course
                  <ChevronRight size={16} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Learning Paths */}
        <div>
          <h2 className="text-xl mb-6">Learning Paths</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {icon: <BookOpen />, title: "Beginner Trading", description: "Start your trading journey"},
              {icon: <BarChart2 />, title: "Technical Trader", description: "Master technical analysis"},
              {icon: <Brain />, title: "Fundamental Analysis", description: "Value investing approach"},
              {icon: <Briefcase />, title: "Portfolio Management", description: "Long-term wealth building"}
            ].map((path, index) => (
              <div key={index} className="flex items-center gap-4 bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                <div className="p-2 bg-white/10 rounded-lg">
                  {path.icon}
                </div>
                <div>
                  <h3 className="font-medium">{path.title}</h3>
                  <p className="text-sm text-gray-400">{path.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnPage;