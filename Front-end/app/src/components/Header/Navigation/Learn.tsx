import React from 'react';
import { Play, Clock, LineChart, Brain, Lightbulb, BookOpen, Target, TrendingUp, ChevronRight, Award, BarChart2, Briefcase } from 'lucide-react';
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

export { LearnPage, TechnicalAnalysisPage, FundamentalAnalysisPage, TradingStrategiesPage };