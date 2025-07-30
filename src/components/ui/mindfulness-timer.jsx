import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Play, Pause, RotateCcw, Clock, Heart, Brain } from 'lucide-react';

const MindfulnessTimer = ({ storage }) => {
  const [duration, setDuration] = useState(5); // minutes
  const [timeLeft, setTimeLeft] = useState(duration * 60); // seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [sessions, setSessions] = useState(() => {
    return storage.getData('mindfulnessSessions', []);
  });
  
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  const presetDurations = [
    { minutes: 3, label: '3 min', description: 'Quick reset' },
    { minutes: 5, label: '5 min', description: 'Mindful moment' },
    { minutes: 10, label: '10 min', description: 'Deep focus' },
    { minutes: 15, label: '15 min', description: 'Full session' }
  ];

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsCompleted(true);
            playCompletionSound();
            recordSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    storage.setData('mindfulnessSessions', sessions);
  }, [sessions]);

  const playCompletionSound = () => {
    // Create a simple completion tone
    if (typeof window !== 'undefined' && window.AudioContext) {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 1);
      } catch (error) {
        console.log('Audio not supported');
      }
    }
  };

  const recordSession = () => {
    const newSession = {
      id: Date.now(),
      duration: duration,
      completedAt: new Date().toISOString(),
      date: new Date().toDateString()
    };
    
    setSessions(prev => [newSession, ...prev.slice(0, 9)]); // Keep last 10 sessions
  };

  const startTimer = () => {
    setIsRunning(true);
    setIsCompleted(false);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsCompleted(false);
    setTimeLeft(duration * 60);
  };

  const changeDuration = (newDuration) => {
    if (!isRunning) {
      setDuration(newDuration);
      setTimeLeft(newDuration * 60);
      setIsCompleted(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;
  const todaySessions = sessions.filter(s => s.date === new Date().toDateString()).length;
  const totalMinutes = sessions.reduce((acc, s) => acc + s.duration, 0);

  return (
    <Card className="p-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl text-blue-900 flex items-center gap-2">
          <Brain className="w-6 h-6" />
          Mindfulness Timer
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>{todaySessions} sessions today</span>
          <Badge variant="outline">{totalMinutes} total minutes</Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Timer Display */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative inline-block"
          >
            {/* Circular Progress */}
            <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="rgb(219, 234, 254)"
                strokeWidth="8"
                fill="transparent"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                stroke="rgb(59, 130, 246)"
                strokeWidth="8"
                fill="transparent"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                transition={{ duration: 0.5 }}
              />
            </svg>
            
            {/* Time Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  key={timeLeft}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className="text-4xl font-bold text-blue-900"
                >
                  {formatTime(timeLeft)}
                </motion.div>
                <div className="text-sm text-gray-600 mt-1">
                  {isCompleted ? 'Complete!' : isRunning ? 'Breathe...' : 'Ready to start'}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Duration Presets */}
        {!isRunning && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-2 mb-6"
          >
            {presetDurations.map((preset) => (
              <motion.button
                key={preset.minutes}
                onClick={() => changeDuration(preset.minutes)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-3 rounded-lg border text-center transition-all ${
                  duration === preset.minutes
                    ? 'bg-blue-100 border-blue-300 text-blue-800'
                    : 'bg-gray-50 border-gray-200 hover:bg-blue-50 hover:border-blue-200'
                }`}
              >
                <div className="font-semibold">{preset.label}</div>
                <div className="text-xs text-gray-600">{preset.description}</div>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Controls */}
        <div className="flex justify-center gap-3 mb-6">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={isRunning ? pauseTimer : startTimer}
              className={`px-6 py-3 ${
                isRunning 
                  ? 'bg-orange-500 hover:bg-orange-600' 
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isRunning ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
              {isRunning ? 'Pause' : 'Start'}
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={resetTimer}
              variant="outline"
              className="px-6 py-3"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </motion.div>
        </div>

        {/* Completion Message */}
        <AnimatePresence>
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200"
            >
              <div className="text-2xl mb-2">🎉</div>
              <h3 className="font-semibold text-green-800 mb-1">Session Complete!</h3>
              <p className="text-sm text-green-700">
                Great job! You've completed a {duration}-minute mindfulness session.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recent Sessions */}
        {sessions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 pt-4 border-t border-gray-200"
          >
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Recent Sessions
            </h4>
            <div className="space-y-2">
              {sessions.slice(0, 3).map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded"
                >
                  <span className="text-gray-700">
                    {session.duration} minutes
                  </span>
                  <span className="text-gray-500">
                    {new Date(session.completedAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export { MindfulnessTimer };