import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Button } from '@/components/ui/button.jsx';
import { 
  BarChart3, TrendingDown, TrendingUp, Clock, 
  Smartphone, Eye, AlertTriangle, CheckCircle 
} from 'lucide-react';

const UsageInsights = ({ storage }) => {
  const [usageData, setUsageData] = useState(() => {
    return storage.getData('usageData', generateMockData());
  });
  
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  useEffect(() => {
    storage.setData('usageData', usageData);
  }, [usageData]);

  function generateMockData() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return {
      week: days.map(day => ({
        day,
        screenTime: Math.floor(Math.random() * 8) + 2, // 2-10 hours
        pickups: Math.floor(Math.random() * 100) + 50, // 50-150 pickups
        topApp: ['Social Media', 'News', 'Games', 'Video', 'Messages'][Math.floor(Math.random() * 5)],
        mood: Math.floor(Math.random() * 5) + 1 // 1-5 mood score
      })),
      insights: {
        averageScreenTime: 5.2,
        trend: 'decreasing',
        mostUsedApp: 'Social Media',
        peakUsageTime: '8-10 PM',
        weeklyGoal: 4,
        currentStreak: 3
      }
    };
  }

  const currentData = usageData[selectedPeriod] || usageData.week;
  const insights = usageData.insights;
  
  const maxScreenTime = Math.max(...currentData.map(d => d.screenTime));
  const avgScreenTime = currentData.reduce((acc, d) => acc + d.screenTime, 0) / currentData.length;
  const totalPickups = currentData.reduce((acc, d) => acc + d.pickups, 0);

  const getTrendIcon = (trend) => {
    return trend === 'decreasing' ? (
      <TrendingDown className="w-4 h-4 text-green-600" />
    ) : (
      <TrendingUp className="w-4 h-4 text-red-600" />
    );
  };

  const getMoodColor = (mood) => {
    if (mood >= 4) return 'bg-green-500';
    if (mood >= 3) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="p-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl text-blue-900 flex items-center gap-2">
          <BarChart3 className="w-6 h-6" />
          Usage Insights
        </CardTitle>
        <div className="flex items-center gap-2">
          {['week', 'month'].map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
              className="capitalize"
            >
              {period}
            </Button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center p-3 bg-blue-50 rounded-lg"
          >
            <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-900">
              {avgScreenTime.toFixed(1)}h
            </div>
            <div className="text-xs text-blue-600">Daily Average</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center p-3 bg-orange-50 rounded-lg"
          >
            <Smartphone className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-900">
              {Math.round(totalPickups / 7)}
            </div>
            <div className="text-xs text-orange-600">Daily Pickups</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center p-3 bg-purple-50 rounded-lg"
          >
            <Eye className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-900">
              {insights.mostUsedApp.split(' ')[0]}
            </div>
            <div className="text-xs text-purple-600">Top App</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center p-3 bg-green-50 rounded-lg"
          >
            <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-900">
              {insights.currentStreak}
            </div>
            <div className="text-xs text-green-600">Day Streak</div>
          </motion.div>
        </div>

        {/* Screen Time Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <h4 className="font-semibold text-gray-800 mb-3">Daily Screen Time</h4>
          <div className="space-y-2">
            {currentData.map((day, index) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + (index * 0.1) }}
                className="flex items-center gap-3"
              >
                <div className="w-12 text-sm text-gray-600 font-medium">
                  {day.day}
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                  <motion.div
                    className={`h-6 rounded-full ${
                      day.screenTime <= insights.weeklyGoal 
                        ? 'bg-green-500' 
                        : day.screenTime <= insights.weeklyGoal * 1.5
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(day.screenTime / maxScreenTime) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.8 + (index * 0.1) }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                    {day.screenTime}h
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${getMoodColor(day.mood)}`} />
              </motion.div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span>On target</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <span>Over target</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span>Excessive</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-400 rounded-full" />
              <span>Mood</span>
            </div>
          </div>
        </motion.div>

        {/* Insights Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg"
        >
          <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
            {getTrendIcon(insights.trend)}
            Weekly Insights
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Screen time trend:</span>
              <Badge variant={insights.trend === 'decreasing' ? 'success' : 'destructive'}>
                {insights.trend === 'decreasing' ? '↓ Improving' : '↑ Increasing'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Peak usage time:</span>
              <span className="font-medium text-gray-900">{insights.peakUsageTime}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Weekly goal:</span>
              <span className="font-medium text-gray-900">{insights.weeklyGoal}h/day</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Current streak:</span>
              <span className="font-medium text-green-700">{insights.currentStreak} days</span>
            </div>
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
            <span className="font-medium text-yellow-800">Recommendation</span>
          </div>
          <p className="text-sm text-yellow-700">
            {avgScreenTime > insights.weeklyGoal 
              ? `Try to reduce screen time by ${(avgScreenTime - insights.weeklyGoal).toFixed(1)} hours daily to meet your goal.`
              : "Great job staying within your screen time goals! Keep up the good work."
            }
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export { UsageInsights };