import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { CheckCircle, Circle, Calendar, Target, TrendingUp } from 'lucide-react';

const HabitTracker = ({ storage }) => {
  const [habits, setHabits] = useState(() => {
    return storage.getData('habits', [
      { id: 1, name: 'Phone-free meals', icon: '🍽️', streak: 0, completed: false },
      { id: 2, name: 'Morning mindfulness', icon: '🧘', streak: 0, completed: false },
      { id: 3, name: 'Digital sunset (1hr before bed)', icon: '🌅', streak: 0, completed: false },
      { id: 4, name: 'Offline reading', icon: '📚', streak: 0, completed: false },
      { id: 5, name: 'Nature walk', icon: '🚶', streak: 0, completed: false }
    ]);
  });

  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());

  useEffect(() => {
    storage.setData('habits', habits);
  }, [habits]);

  const toggleHabit = (habitId) => {
    const today = new Date().toDateString();
    const updatedHabits = habits.map(habit => {
      if (habit.id === habitId) {
        const wasCompleted = habit.completed;
        const newCompleted = !wasCompleted;
        
        // Update streak based on completion
        let newStreak = habit.streak;
        if (newCompleted && !wasCompleted) {
          newStreak += 1;
        } else if (!newCompleted && wasCompleted) {
          newStreak = Math.max(0, newStreak - 1);
        }

        return {
          ...habit,
          completed: newCompleted,
          streak: newStreak,
          lastCompleted: newCompleted ? today : habit.lastCompleted
        };
      }
      return habit;
    });
    
    setHabits(updatedHabits);
  };

  const completedToday = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;
  const completionRate = Math.round((completedToday / totalHabits) * 100);

  return (
    <Card className="p-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl text-blue-900 flex items-center gap-2">
          <Target className="w-6 h-6" />
          Daily Habits
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>{completedToday}/{totalHabits} completed today</span>
          <Badge variant={completionRate >= 80 ? "success" : completionRate >= 50 ? "warning" : "secondary"}>
            {completionRate}% complete
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {habits.map((habit, index) => (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                habit.completed 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-gray-50 border-gray-200 hover:bg-blue-50 hover:border-blue-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={() => toggleHabit(habit.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex-shrink-0"
                >
                  {habit.completed ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-400 hover:text-blue-500" />
                  )}
                </motion.button>
                
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{habit.icon}</span>
                    <span className={`font-medium ${habit.completed ? 'text-green-800' : 'text-gray-700'}`}>
                      {habit.name}
                    </span>
                  </div>
                  {habit.streak > 0 && (
                    <div className="flex items-center gap-1 text-xs text-orange-600 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>{habit.streak} day streak</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-gray-500">
                  {habit.streak > 0 ? `${habit.streak} days` : 'Start today'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-blue-900">Today's Progress</h4>
              <p className="text-sm text-blue-700">
                {completedToday === totalHabits 
                  ? "Perfect day! All habits completed 🎉" 
                  : `${totalHabits - completedToday} habits remaining`}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-900">{completionRate}%</div>
              <div className="text-xs text-blue-600">completion</div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-3 w-full bg-blue-200 rounded-full h-2">
            <motion.div 
              className="bg-blue-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${completionRate}%` }}
              transition={{ duration: 1, delay: 0.7 }}
            />
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export { HabitTracker };
