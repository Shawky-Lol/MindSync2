import React, { useState, useEffect } from 'react';
import { 
  Brain, Home, Target, TrendingUp, Calendar, Award, 
  CheckCircle, Clock, Heart, Zap, BarChart3, Settings,
  RefreshCw, Star, Trophy, Flame, BookOpen, Smartphone,
  Users, Shield, Eye
} from 'lucide-react';

// Mock storage utility - using a singleton pattern to persist data
const createStorage = (() => {
  let instance = null;
  
  return () => {
    if (!instance) {
      const data = {};
      instance = {
        getData: (key) => {
          return data[key];
        },
        setData: (key, value) => {
          data[key] = value;
        }
      };
    }
    return instance;
  };
})();

// Simple UI Components
const Button = ({ children, onClick, variant = "default", className = "", ...props }) => {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 pb-4 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`px-6 pb-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold ${className}`}>
    {children}
  </h3>
);

const Progress = ({ value, className = "" }) => (
  <div className={`w-full bg-gray-200 rounded-full ${className}`}>
    <div 
      className="bg-blue-600 h-full rounded-full transition-all duration-300"
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800"
  };
  
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// Archetype data
const archetypes = {
  "Digital Native": {
    title: "Digital Native",
    description: "Tech-savvy and connected, but seeking better balance",
    color: "from-blue-500 to-cyan-500",
    icon: "📱",
    traits: ["Always connected", "Tech enthusiast", "Social media active"],
    recommendations: ["Set device-free zones", "Practice digital sabbaths", "Use app timers"]
  },
  "Mindful User": {
    title: "Mindful User", 
    description: "Conscious about digital habits with room for improvement",
    color: "from-green-500 to-emerald-500",
    icon: "🧘",
    traits: ["Self-aware", "Seeking balance", "Values mindfulness"],
    recommendations: ["Morning phone-free time", "Meditation apps", "Regular check-ins"]
  },
  "Overwhelmed": {
    title: "Digital Overwhelmed",
    description: "Struggling with digital overload and seeking relief",
    color: "from-red-500 to-pink-500", 
    icon: "😵",
    traits: ["Feels overwhelmed", "High screen time", "Stress from notifications"],
    recommendations: ["Gradual reduction", "Notification cleanup", "Stress management"]
  },
  "Balanced": {
    title: "Digitally Balanced",
    description: "Great job! You have healthy digital habits",
    color: "from-purple-500 to-indigo-500",
    icon: "⚖️",
    traits: ["Well-balanced", "Mindful usage", "Good boundaries"],
    recommendations: ["Maintain current habits", "Help others", "Stay consistent"]
  }
};

const ArchetypeCard = ({ archetype, className = "" }) => {
  const data = archetypes[archetype] || archetypes["Digital Native"];
  
  return (
    <Card className={`overflow-hidden ${className}`}>
      <div className={`bg-gradient-to-r ${data.color} p-6 text-white`}>
        <div className="flex items-center gap-4">
          <span className="text-4xl">{data.icon}</span>
          <div>
            <h3 className="text-2xl font-bold">{data.title}</h3>
            <p className="text-white/90">{data.description}</p>
          </div>
        </div>
      </div>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Key Traits</h4>
            <div className="flex flex-wrap gap-2">
              {data.traits.map((trait, index) => (
                <Badge key={index} variant="default">{trait}</Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Recommendations</h4>
            <ul className="space-y-1">
              {data.recommendations.map((rec, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const DashboardPage = ({ setCurrentPage = () => {}, storage = createStorage() }) => {
  const [archetypeResult, setArchetypeResult] = useState(null);
  const [streakData, setStreakData] = useState({
    currentStreak: 0,
    longestStreak: 0,
    totalDays: 0
  });
  const [achievements, setAchievements] = useState([]);
  const [weeklyProgress, setWeeklyProgress] = useState(65);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Load archetype result - simulate having completed assessment
    const result = storage.getData('archetypeResult');
    if (!result) {
      const defaultResult = { archetype: 'Digital Native' };
      storage.setData('archetypeResult', defaultResult);
      setArchetypeResult(defaultResult);
    } else {
      setArchetypeResult(result);
    }

    // Load or initialize streak data
    const streaks = storage.getData('streakData');
    if (!streaks) {
      const defaultStreaks = {
        currentStreak: 5,
        longestStreak: 12,
        totalDays: 28,
        lastCheckIn: null
      };
      storage.setData('streakData', defaultStreaks);
      setStreakData(defaultStreaks);
    } else {
      setStreakData(streaks);
    }

    // Load achievements
    const userAchievements = storage.getData('achievements');
    if (!userAchievements) {
      const defaultAchievements = [
        { id: 1, title: "First Steps", description: "Completed your first pulse check", icon: "🎯", unlocked: true },
        { id: 2, title: "Self Aware", description: "Discovered your digital archetype", icon: "🧠", unlocked: true },
        { id: 3, title: "Week Warrior", description: "Maintained mindful habits for 7 days", icon: "⚡", unlocked: false },
        { id: 4, title: "Phone-Free Pioneer", description: "Had 5 phone-free meals", icon: "🍽️", unlocked: false },
        { id: 5, title: "Digital Detox", description: "Completed a 24-hour digital break", icon: "🌱", unlocked: false },
        { id: 6, title: "Mindful Master", description: "Completed 10 mindfulness sessions", icon: "🧘", unlocked: false },
        { id: 7, title: "Streak Superstar", description: "Achieved a 30-day streak", icon: "🌟", unlocked: false },
        { id: 8, title: "Balance Keeper", description: "Maintained healthy screen time for a week", icon: "⚖️", unlocked: false }
      ];
      storage.setData('achievements', defaultAchievements);
      setAchievements(defaultAchievements);
    } else {
      setAchievements(userAchievements);
    }

    // Load weekly progress
    const progress = storage.getData('weeklyProgress');
    if (progress === null || progress === undefined) {
      const defaultProgress = Math.floor(Math.random() * 40) + 40;
      storage.setData('weeklyProgress', defaultProgress);
      setWeeklyProgress(defaultProgress);
    } else {
      setWeeklyProgress(progress);
    }
  }, [storage]);

  const handleCheckIn = () => {
    const today = new Date().toDateString();
    const lastCheckIn = streakData.lastCheckIn;
    
    if (lastCheckIn !== today) {
      const newStreakData = {
        ...streakData,
        currentStreak: streakData.currentStreak + 1,
        longestStreak: Math.max(streakData.longestStreak, streakData.currentStreak + 1),
        totalDays: streakData.totalDays + 1,
        lastCheckIn: today
      };
      
      setStreakData(newStreakData);
      storage.setData('streakData', newStreakData);
      
      // Check for new achievements
      if (newStreakData.currentStreak >= 7) {
        const updatedAchievements = achievements.map(achievement => 
          achievement.id === 3 ? { ...achievement, unlocked: true } : achievement
        );
        setAchievements(updatedAchievements);
        storage.setData('achievements', updatedAchievements);
      }
    }
  };

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const totalAchievements = achievements.length;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'habits', label: 'Habits', icon: Target },
    { id: 'mindfulness', label: 'Mindfulness', icon: Brain },
    { id: 'insights', label: 'Insights', icon: Eye }
  ];

  if (!archetypeResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <nav className="flex justify-between items-center p-6 bg-white border-b shadow-sm">
          <button 
            onClick={() => setCurrentPage('home')} 
            className="text-2xl font-bold text-blue-900 flex items-center gap-2 hover:text-blue-700 transition-colors"
          >
            <Brain className="w-8 h-8" />
            MindSync
          </button>
          <Button onClick={() => setCurrentPage('pulse-check')} className="bg-blue-600 hover:bg-blue-700">
            Take Pulse Check
          </Button>
        </nav>
        
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl font-bold text-blue-900 mb-6">Welcome to Your Dashboard</h1>
            <p className="text-xl text-gray-600 mb-8">
              Complete your Digital Pulse Check to unlock personalized insights and start your journey.
            </p>
            <Button 
              onClick={() => setCurrentPage('pulse-check')} 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg px-8 py-4 rounded-full"
            >
              Start Your Pulse Check
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <nav className="flex justify-between items-center p-6 bg-white border-b shadow-sm">
        <button 
          onClick={() => setCurrentPage('home')} 
          className="text-2xl font-bold text-blue-900 flex items-center gap-2 hover:text-blue-700 transition-colors"
        >
          <Brain className="w-8 h-8" />
          MindSync
        </button>
        <div className="flex gap-4">
          <Button 
            onClick={() => setCurrentPage('pulse-check')} 
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Retake Assessment
          </Button>
          <Button 
            onClick={() => setCurrentPage('home')} 
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Home
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">Your Digital Wellness Dashboard</h1>
          <p className="text-xl text-gray-600">Track your progress and continue your journey to digital balance</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-lg shadow-sm animate-slide-up">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-slide-up">
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">Current Streak</p>
                    <p className="text-3xl font-bold text-blue-900">{streakData.currentStreak}</p>
                    <p className="text-blue-600 text-xs">days</p>
                  </div>
                  <Flame className="w-8 h-8 text-orange-500" />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 text-sm font-medium">Weekly Progress</p>
                    <p className="text-3xl font-bold text-green-900">{weeklyProgress}%</p>
                    <p className="text-green-600 text-xs">completion</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 text-sm font-medium">Achievements</p>
                    <p className="text-3xl font-bold text-purple-900">{unlockedAchievements.length}/{totalAchievements}</p>
                    <p className="text-purple-600 text-xs">unlocked</p>
                  </div>
                  <Trophy className="w-8 h-8 text-yellow-500" />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-600 text-sm font-medium">Total Days</p>
                    <p className="text-3xl font-bold text-orange-900">{streakData.totalDays}</p>
                    <p className="text-orange-600 text-xs">active</p>
                  </div>
                  <Calendar className="w-8 h-8 text-orange-500" />
                </div>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Your Archetype */}
                <div className="animate-slide-in-left">
                  <h2 className="text-2xl font-bold text-blue-900 mb-4">Your Digital Archetype</h2>
                  <ArchetypeCard archetype={archetypeResult.archetype} className="w-full" />
                </div>

                {/* Weekly Progress */}
                <div className="animate-slide-in-left">
                  <Card className="p-6">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl text-blue-900 flex items-center gap-2">
                        <BarChart3 className="w-6 h-6" />
                        This Week's Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Digital Mindfulness</span>
                          <span className="text-blue-600 font-semibold">{weeklyProgress}%</span>
                        </div>
                        <Progress value={weeklyProgress} className="h-3" />
                        <div className="grid grid-cols-2 gap-4 mt-6">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">5</p>
                            <p className="text-sm text-gray-600">Phone-free meals</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">3</p>
                            <p className="text-sm text-gray-600">Mindful check-ins</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Daily Check-in */}
                <div className="animate-slide-in-right">
                  <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl text-green-800 flex items-center gap-2">
                        <CheckCircle className="w-6 h-6" />
                        Daily Check-in
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-green-700 mb-4">
                        How mindful were you with your digital habits today?
                      </p>
                      <Button 
                        onClick={handleCheckIn}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        Complete Check-in
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Achievements */}
                <div className="animate-slide-in-right">
                  <Card className="p-6">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl text-blue-900 flex items-center gap-2">
                        <Award className="w-6 h-6" />
                        Recent Achievements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {achievements.slice(0, 4).map((achievement) => (
                          <div
                            key={achievement.id}
                            className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                              achievement.unlocked
                                ? 'bg-yellow-50 border border-yellow-200' 
                                : 'bg-gray-50 border border-gray-200'
                            }`}
                          >
                            <span className="text-2xl">{achievement.icon}</span>
                            <div className="flex-1">
                              <p className={`font-medium ${
                                achievement.unlocked ? 'text-yellow-800' : 'text-gray-500'
                              }`}>
                                {achievement.title}
                              </p>
                              <p className={`text-sm ${
                                achievement.unlocked ? 'text-yellow-600' : 'text-gray-400'
                              }`}>
                                {achievement.description}
                              </p>
                            </div>
                            {achievement.unlocked && (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <div className="animate-slide-in-right">
                  <Card className="p-6">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl text-blue-900 flex items-center gap-2">
                        <Zap className="w-6 h-6" />
                        Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button 
                        onClick={() => setCurrentPage('pulse-check')}
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Retake Pulse Check
                      </Button>
                      <Button 
                        onClick={() => setCurrentPage('features')}
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Explore Features
                      </Button>
                      <Button 
                        onClick={() => setCurrentPage('about')}
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Tab Content */}
        {activeTab === 'habits' && (
          <div className="text-center py-12">
            <Target className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-blue-900 mb-2">Habit Tracking</h2>
            <p className="text-gray-600">Feature coming soon! Track your digital wellness habits.</p>
          </div>
        )}

        {activeTab === 'mindfulness' && (
          <div className="text-center py-12">
            <Brain className="w-16 h-16 text-purple-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-blue-900 mb-2">Mindfulness Center</h2>
            <p className="text-gray-600">Feature coming soon! Access guided meditations and mindfulness exercises.</p>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="text-center py-12">
            <Eye className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-blue-900 mb-2">Usage Insights</h2>
            <p className="text-gray-600">Feature coming soon! Get detailed analytics about your digital habits.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slideUp 0.6s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.6s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.6s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;