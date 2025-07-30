import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { AnimatedButton } from '@/components/ui/animated-button.jsx';
import { ProgressRing } from '@/components/ui/progress-ring.jsx';
import { ArchetypeCard } from '@/components/ui/archetype-card.jsx';
import { calculateArchetype, getInsights } from '@/utils/pulseCheckLogic.js';
import { 
  Brain, ArrowLeft, Target, BarChart3, RefreshCw, 
  CheckCircle, TrendingUp, Heart, Zap, Award
} from 'lucide-react';

const EnhancedPulseCheck = ({ setCurrentPage, storage }) => {
  const [step, setStep] = useState(() => {
    const saved = storage.getData('pulseCheckStep', 1);
    const completed = storage.getData('pulseCheckCompleted', false);
    if (completed) return 'results';
    return Math.max(1, Math.min(saved, 15));
  });
  
  const [answers, setAnswers] = useState(() => {
    return storage.getData('pulseCheckAnswers', {});
  });

  const [isCompleted, setIsCompleted] = useState(() => {
    return storage.getData('pulseCheckCompleted', false);
  });

  const [archetypeResult, setArchetypeResult] = useState(null);

  const questions = [
    {
      question: "How many hours do you spend on your phone daily?",
      options: ["Less than 2 hours", "2-4 hours", "4-6 hours", "6-8 hours", "More than 8 hours"]
    },
    {
      question: "How do you feel after using social media?",
      options: ["Energized and inspired", "Neutral", "Slightly drained", "Very drained", "Anxious or upset"]
    },
    {
      question: "What do you miss doing in real life because of phone use?",
      options: ["Reading books", "Outdoor activities", "Face-to-face conversations", "Creative hobbies", "Physical exercise"]
    },
    {
      question: "How often do you check your phone without a specific purpose?",
      options: ["Rarely", "A few times a day", "Every hour", "Every 30 minutes", "Constantly"]
    },
    {
      question: "When do you typically reach for your phone first?",
      options: ["When I wake up", "During meals", "When I'm bored", "When I'm anxious", "When I'm with others"]
    },
    {
      question: "How does your phone use affect your sleep?",
      options: ["No impact", "Slightly affects falling asleep", "Often keeps me up late", "Disrupts my sleep quality", "I check it during the night"]
    },
    {
      question: "What emotions trigger your phone use most?",
      options: ["Boredom", "Anxiety", "Loneliness", "FOMO (fear of missing out)", "Habit/automatic"]
    },
    {
      question: "How do you feel when your phone battery dies?",
      options: ["Relieved", "Slightly anxious", "Very anxious", "Panicked", "Lost/disconnected"]
    },
    {
      question: "Which apps consume most of your time?",
      options: ["Social media", "News/information", "Games", "Video streaming", "Messaging"]
    },
    {
      question: "How often do you have phone-free meals?",
      options: ["Always", "Most of the time", "Sometimes", "Rarely", "Never"]
    },
    {
      question: "What happens when you try to limit phone use?",
      options: ["Easy to stick to", "Manageable with effort", "Difficult but possible", "Very challenging", "Nearly impossible"]
    },
    {
      question: "How has your attention span changed over the years?",
      options: ["Improved", "Stayed the same", "Slightly decreased", "Significantly decreased", "Severely impacted"]
    },
    {
      question: "How do you feel about your current digital habits?",
      options: ["Very satisfied", "Mostly satisfied", "Neutral", "Somewhat concerned", "Very concerned"]
    },
    {
      question: "What would motivate you most to change your phone habits?",
      options: ["Better relationships", "Improved focus", "Better sleep", "More free time", "Reduced anxiety"]
    },
    {
      question: "How ready are you to make changes to your digital habits?",
      options: ["Very ready", "Somewhat ready", "Unsure", "Not very ready", "Not ready at all"]
    }
  ];

  useEffect(() => {
    storage.setData('pulseCheckStep', step);
    storage.setData('pulseCheckAnswers', answers);
  }, [step, answers]);

  const currentQuestion = questions[step - 1];
  const progress = ((step - 1) / questions.length) * 100;

  const handleAnswer = (answerIndex) => {
    const newAnswers = {
      ...answers,
      [step]: answerIndex
    };
    
    setAnswers(newAnswers);
    
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      // Calculate archetype using the new logic
      const result = calculateArchetype(newAnswers);
      const insights = getInsights(newAnswers, result.archetype);
      
      setArchetypeResult({ ...result, insights });
      setIsCompleted(true);
      storage.setData('pulseCheckCompleted', true);
      storage.setData('archetypeResult', { ...result, insights });
      setStep('results');
    }
  };

  const resetPulseCheck = () => {
    setStep(1);
    setAnswers({});
    setIsCompleted(false);
    setArchetypeResult(null);
    storage.setData('pulseCheckCompleted', false);
    storage.setData('archetypeResult', null);
  };

  if (step === 'results') {
    const result = archetypeResult || storage.getData('archetypeResult');
    
    if (!result) {
      resetPulseCheck();
      return null;
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
          <AnimatedButton 
            onClick={() => setCurrentPage('dashboard')} 
            className="bg-green-600 hover:bg-green-700"
            animationType="bounce"
          >
            Go to Dashboard
          </AnimatedButton>
        </nav>
        
        <div className="max-w-6xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-center text-blue-900 mb-4">
              Your Digital Pulse Check Results
            </h1>
            <p className="text-xl text-center text-gray-600 mb-12">
              Discover your digital archetype and personalized insights
            </p>
          </motion.div>

          {/* Archetype Card */}
          <div className="mb-12">
            <ArchetypeCard 
              archetype={result.archetype} 
              delay={0.3}
              className="max-w-2xl mx-auto"
            />
          </div>

          {/* Confidence Score */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-center mb-12"
          >
            <Card className="max-w-md mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl text-blue-900">Assessment Confidence</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ProgressRing 
                  progress={result.confidence} 
                  size={120}
                  color="#3b82f6"
                  showPercentage={true}
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Insights Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Your Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.insights.strengths.map((strength, index) => (
                    <li key={index} className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-orange-800 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Growth Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.insights.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-center gap-2 text-orange-700">
                      <span className="w-4 h-4 text-center">⚡</span>
                      <span className="text-sm">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-purple-800 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Key Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-purple-700">
                  <strong>Usage:</strong> {result.insights.dailyUsage}
                </div>
                <div className="text-sm text-purple-700">
                  <strong>Trigger:</strong> {result.insights.primaryTrigger}
                </div>
                <div className="text-sm text-purple-700">
                  <strong>Social Impact:</strong> {result.insights.socialImpact}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="text-center space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton 
                onClick={() => setCurrentPage('dashboard')} 
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
                animationType="glow"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Continue to Dashboard
              </AnimatedButton>
              <AnimatedButton 
                onClick={resetPulseCheck}
                variant="outline"
                className="text-lg px-8 py-3"
                animationType="bounce"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Retake Assessment
              </AnimatedButton>
            </div>
            <p className="text-gray-600 text-sm">
              Your results are automatically saved. You can access them anytime from your dashboard.
            </p>
          </motion.div>
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
        {step > 1 && (
          <AnimatedButton 
            onClick={() => setStep(step - 1)} 
            variant="outline"
            className="flex items-center gap-2"
            animationType="slide"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </AnimatedButton>
        )}
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-blue-900 mb-4">Digital Pulse Check</h1>
          <p className="text-gray-600">
            Answer {questions.length} questions to discover your digital archetype and get personalized insights
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm text-gray-500">Question {step} of {questions.length}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <motion.div 
                        className="bg-blue-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
                  </div>
                </div>
                <CardTitle className="text-2xl text-blue-900 mb-6">
                  {currentQuestion?.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentQuestion?.options.map((option, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <AnimatedButton
                        onClick={() => handleAnswer(index)}
                        variant="outline"
                        className="w-full text-left p-4 h-auto justify-start hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                        animationType="scale"
                      >
                        <span className="w-6 h-6 rounded-full border-2 border-gray-300 mr-3 flex-shrink-0"></span>
                        {option}
                      </AnimatedButton>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EnhancedPulseCheck;

