import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Progress } from '@/components/ui/progress.jsx';
import { AnimatedCard, AnimatedCardHeader, AnimatedCardContent, AnimatedCardTitle } from '@/components/ui/animated-card.jsx';
import { AnimatedButton } from '@/components/ui/animated-button.jsx';
import { ProgressRing } from '@/components/ui/progress-ring.jsx';
import { ArchetypeCard } from '@/components/ui/archetype-card.jsx';
import EnhancedPulseCheck from '@/components/EnhancedPulseCheck.jsx';
import DashboardPage from '@/components/DashboardPage.jsx';
import { 
  Bell, Brain, Clock, Eye, Heart, Shield, Users, Zap,
  Moon, Lock, HelpCircle, CheckCircle, Target, Smile,
  BookOpen, Award, UserCheck, PenTool, TrendingUp,
  TrendingDown, Calendar, Star, Phone, MessageCircle,
  Camera, Music, Coffee, Sunrise, ArrowLeft, Home,
  BarChart3, Settings, RefreshCw, AlertCircle, Sparkles
} from 'lucide-react';

import './App.css';

// Enhanced Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50">
          <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-red-600 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-4">We encountered an unexpected error. Please try reloading the page.</p>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reload Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

// Enhanced Data Storage Service
class DataStorageService {
  constructor() {
    this.storageKey = 'mindsync_data';
    this.fallbackStorage = new Map();
  }

  // Check if localStorage is available
  isLocalStorageAvailable() {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Get data with fallback
  getData(key, defaultValue = null) {
    try {
      if (this.isLocalStorageAvailable()) {
        const data = localStorage.getItem(`${this.storageKey}_${key}`);
        return data ? JSON.parse(data) : defaultValue;
      } else {
        return this.fallbackStorage.get(key) || defaultValue;
      }
    } catch (error) {
      console.warn('Error reading data:', error);
      return defaultValue;
    }
  }

  // Set data with fallback
  setData(key, value) {
    try {
      if (this.isLocalStorageAvailable()) {
        localStorage.setItem(`${this.storageKey}_${key}`, JSON.stringify(value));
      } else {
        this.fallbackStorage.set(key, value);
      }
      return true;
    } catch (error) {
      console.warn('Error saving data:', error);
      return false;
    }
  }

  // Clear all data
  clearData() {
    try {
      if (this.isLocalStorageAvailable()) {
        const keys = Object.keys(localStorage).filter(key => key.startsWith(this.storageKey));
        keys.forEach(key => localStorage.removeItem(key));
      } else {
        this.fallbackStorage.clear();
      }
      return true;
    } catch (error) {
      console.warn('Error clearing data:', error);
      return false;
    }
  }

  // Export data for backup
  exportData() {
    try {
      const data = {};
      if (this.isLocalStorageAvailable()) {
        const keys = Object.keys(localStorage).filter(key => key.startsWith(this.storageKey));
        keys.forEach(key => {
          const cleanKey = key.replace(`${this.storageKey}_`, '');
          data[cleanKey] = JSON.parse(localStorage.getItem(key));
        });
      } else {
        this.fallbackStorage.forEach((value, key) => {
          data[key] = value;
        });
      }
      return data;
    } catch (error) {
      console.warn('Error exporting data:', error);
      return {};
    }
  }

  // Import data from backup
  importData(data) {
    try {
      Object.entries(data).forEach(([key, value]) => {
        this.setData(key, value);
      });
      return true;
    } catch (error) {
      console.warn('Error importing data:', error);
      return false;
    }
  }
}

// Initialize storage service
const storage = new DataStorageService();

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const HomePage = () => (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Enhanced Fixed Background Image */}
      <div 
  className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
  style={{ 
    background: 'url("/assets/background.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed'
  }}
>
      
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-green-900/40"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <nav className="flex justify-between items-center p-6 bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="text-2xl font-bold text-white flex items-center gap-2">
            <Brain className="w-8 h-8" />
            MindSync
          </div>
          <div className="hidden md:flex gap-6 items-center">
            <button 
              onClick={() => setCurrentPage('features')} 
              className="text-white/90 hover:text-white transition-colors hover:bg-white/10 px-3 py-2 rounded-lg"
            >
              Features
            </button>
            <button 
              onClick={() => setCurrentPage('about')} 
              className="text-white/90 hover:text-white transition-colors hover:bg-white/10 px-3 py-2 rounded-lg"
            >
              About
            </button>
            <button 
              onClick={() => setCurrentPage('blog')} 
              className="text-white/90 hover:text-white transition-colors hover:bg-white/10 px-3 py-2 rounded-lg"
            >
              Blog
            </button>
            <Button 
              onClick={() => setCurrentPage('pulse-check')} 
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
            >
              Get Started
            </Button>
          </div>
          <div className="md:hidden">
            <Button 
              onClick={() => setCurrentPage('pulse-check')} 
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
            >
              Get Started
            </Button>
          </div>
        </nav>

        <main className="flex-grow flex flex-col items-center justify-center text-center px-6 pb-16">
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-white/90 text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              Digital Wellness Revolution
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 max-w-5xl leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Regain Control of Your 
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Real Life</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-white/80 mb-8 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Phones aren't the enemy. But they've taken over. Let's take it back — together.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <AnimatedButton 
              onClick={() => setCurrentPage('pulse-check')} 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg px-8 py-4 rounded-full shadow-lg"
              animationType="glow"
            >
              Take the Digital Pulse Check
            </AnimatedButton>
            <AnimatedButton 
              onClick={() => setCurrentPage('hidden-cost')} 
              variant="outline" 
              className="text-lg px-8 py-4 rounded-full border-white/30 text-white hover:bg-white/10 backdrop-blur-md"
              animationType="bounce"
            >
              Learn Why We're Different
            </AnimatedButton>
          </motion.div>
        </main>

        {/* Enhanced Footer */}
        <footer className="bg-blue-900/90 text-white p-8 backdrop-blur-sm border-t border-white/20">
          <div className="max-w-6xl mx-auto text-center">
            <h3 className="text-xl md:text-2xl font-bold mb-4">📴 "You don't need to escape the internet. Just return to yourself."</h3>
            <Button 
              onClick={() => setCurrentPage('pulse-check')} 
              className="bg-white text-blue-900 hover:bg-gray-100 mb-4"
            >
              Start Now
            </Button>
            <p className="text-blue-200 text-sm">🕊️ No pressure. No tracking. Just clarity.</p>
          </div>
        </footer>
      </div>
    </div>
  );

  const FeaturesPage = () => (
    <div className="min-h-screen bg-white">
      <nav className="flex justify-between items-center p-6 bg-white border-b shadow-sm">
        <button 
          onClick={() => setCurrentPage('home')} 
          className="text-2xl font-bold text-blue-900 flex items-center gap-2 hover:text-blue-700 transition-colors"
        >
          <Brain className="w-8 h-8" />
          MindSync
        </button>
        <div className="hidden md:flex gap-6">
          <button 
            onClick={() => setCurrentPage('home')} 
            className="text-blue-800 hover:text-blue-600 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Home className="w-4 h-4" />
            Home
          </button>
          <button 
            onClick={() => setCurrentPage('about')} 
            className="text-blue-800 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            About
          </button>
          <button 
            onClick={() => setCurrentPage('blog')} 
            className="text-blue-800 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Blog
          </button>
        </div>
        <div className="md:hidden">
          <button 
            onClick={() => setCurrentPage('home')} 
            className="text-blue-800 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Home className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-4">Features</h1>
        <p className="text-xl text-center text-blue-700 mb-12">
          Discover what makes MindSync different from other digital wellness solutions.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Target, title: "15-Question Pulse Check", description: "Comprehensive assessment of your digital habits and emotional patterns", color: "bg-blue-500" },
            { icon: Brain, title: "Emotional Insights", description: "Understand the psychological triggers behind your phone usage", color: "bg-purple-500" },
            { icon: Heart, title: "Mood Tracking", description: "Monitor how screen time affects your emotional well-being", color: "bg-red-500" },
            { icon: Zap, title: "Micro-Challenges", description: "Small, achievable tasks that build lasting offline habits", color: "bg-yellow-500" },
            { icon: Shield, title: "Privacy First", description: "Your data stays private - no tracking, no selling, no sharing", color: "bg-green-500" },
            { icon: Award, title: "Gamified Progress", description: "Earn points, badges, and streaks for meaningful achievements", color: "bg-indigo-500" }
          ].map((feature, index) => (
            <AnimatedCard key={index} className="p-6" delay={index * 0.1} direction="up">
              <AnimatedCardHeader>
                <motion.div 
                  className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3 + (index * 0.1), duration: 0.5, type: "spring" }}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </motion.div>
                <AnimatedCardTitle className="text-xl text-blue-900">{feature.title}</AnimatedCardTitle>
              </AnimatedCardHeader>
              <AnimatedCardContent>
                <p className="text-gray-700">{feature.description}</p>
              </AnimatedCardContent>
            </AnimatedCard>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            onClick={() => setCurrentPage('pulse-check')} 
            className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
          >
            Try MindSync Now
          </Button>
        </div>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex justify-between items-center p-6 bg-white border-b shadow-sm">
        <button 
          onClick={() => setCurrentPage('home')} 
          className="text-2xl font-bold text-blue-900 flex items-center gap-2 hover:text-blue-700 transition-colors"
        >
          <Brain className="w-8 h-8" />
          MindSync
        </button>
        <div className="flex gap-6">
          <button 
            onClick={() => setCurrentPage('home')} 
            className="text-blue-800 hover:text-blue-600 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Home className="w-4 h-4" />
            Home
          </button>
          <button 
            onClick={() => setCurrentPage('features')} 
            className="text-blue-800 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Features
          </button>
          <button 
            onClick={() => setCurrentPage('blog')} 
            className="text-blue-800 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Blog
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">About MindSync</h1>
        
        <div className="prose prose-lg mx-auto">
          <Card className="p-8 mb-8 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Target className="w-6 h-6" />
              Our Mission
            </h2>
            <p className="text-gray-700 mb-4">
              MindSync was created to address the growing disconnect between our digital lives and our real-world well-being. 
              We believe that technology should enhance our lives, not control them.
            </p>
            <p className="text-gray-700">
              Unlike other digital wellness apps that focus solely on screen time limits, MindSync takes a holistic approach 
              by addressing the emotional and psychological aspects of our relationship with technology.
            </p>
          </Card>

          <Card className="p-8 mb-8 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Star className="w-6 h-6" />
              Why We're Different
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Emotional Intelligence</h3>
                  <p className="text-gray-700">We help you understand why you reach for your phone, not just when.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Real-World Focus</h3>
                  <p className="text-gray-700">Our challenges and activities are designed to enrich your offline life.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Privacy Respect</h3>
                  <p className="text-gray-700">Your personal data and insights remain completely private.</p>
                </div>
              </div>
            </div>
          </Card>

          <div className="text-center">
            <Button 
              onClick={() => setCurrentPage('pulse-check')} 
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
            >
              Start Your Journey
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const BlogPage = () => (
    <div className="min-h-screen bg-white">
      <nav className="flex justify-between items-center p-6 bg-white border-b shadow-sm">
        <button 
          onClick={() => setCurrentPage('home')} 
          className="text-2xl font-bold text-blue-900 flex items-center gap-2 hover:text-blue-700 transition-colors"
        >
          <Brain className="w-8 h-8" />
          MindSync
        </button>
        <div className="flex gap-6">
          <button 
            onClick={() => setCurrentPage('home')} 
            className="text-blue-800 hover:text-blue-600 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Home className="w-4 h-4" />
            Home
          </button>
          <button 
            onClick={() => setCurrentPage('features')} 
            className="text-blue-800 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Features
          </button>
          <button 
            onClick={() => setCurrentPage('about')} 
            className="text-blue-800 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            About
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-4">Blog</h1>
        <p className="text-xl text-center text-blue-700 mb-12">
          Insights, tips, and research on digital wellness and mindful technology use.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "The Psychology of Phone Addiction",
              excerpt: "Understanding the neurological mechanisms behind compulsive phone checking and how to break the cycle.",
              date: "March 15, 2024",
              readTime: "5 min read",
              category: "Psychology"
            },
            {
              title: "Digital Minimalism for Beginners",
              excerpt: "Simple steps to declutter your digital life and focus on what truly matters.",
              date: "March 10, 2024",
              readTime: "7 min read",
              category: "Lifestyle"
            },
            {
              title: "The Hidden Cost of Notifications",
              excerpt: "How constant interruptions affect our cognitive performance and emotional well-being.",
              date: "March 5, 2024",
              readTime: "6 min read",
              category: "Research"
            },
            {
              title: "Building Real-World Connections",
              excerpt: "Strategies for nurturing face-to-face relationships in a digital age.",
              date: "February 28, 2024",
              readTime: "4 min read",
              category: "Relationships"
            },
            {
              title: "Mindful Morning Routines",
              excerpt: "Start your day with intention instead of immediately reaching for your phone.",
              date: "February 20, 2024",
              readTime: "5 min read",
              category: "Wellness"
            },
            {
              title: "The Science of Digital Detox",
              excerpt: "What happens to your brain when you take a break from screens.",
              date: "February 15, 2024",
              readTime: "8 min read",
              category: "Science"
            }
          ].map((post, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardHeader>
                <Badge className="w-fit mb-2">{post.category}</Badge>
                <CardTitle className="text-xl text-blue-900 hover:text-blue-700">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{post.excerpt}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            onClick={() => setCurrentPage('pulse-check')} 
            className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
          >
            Ready to Start Your Journey?
          </Button>
        </div>
      </div>
    </div>
  );

  const HiddenCostPage = () => (
    <div className="min-h-screen bg-white">
      <nav className="flex justify-between items-center p-6 bg-white border-b shadow-sm">
        <button 
          onClick={() => setCurrentPage('home')} 
          className="text-2xl font-bold text-blue-900 flex items-center gap-2 hover:text-blue-700 transition-colors"
        >
          <Brain className="w-8 h-8" />
          MindSync
        </button>
        <Button 
          onClick={() => setCurrentPage('apps-fail')} 
          className="bg-blue-600 hover:bg-blue-700"
        >
          Why Well-being Apps Don't Help
        </Button>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-4">
          The Hidden Cost of Digital Overwhelm
        </h1>
        <p className="text-xl text-center text-blue-700 mb-12 italic">
          "We're more connected than ever, yet lonelier than before."
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl text-red-600 flex items-center gap-2">
                <AlertCircle className="w-6 h-6" />
                The Problem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  Average person checks phone 96 times per day
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  Social media linked to increased anxiety and depression
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  Constant notifications fragment our attention
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  Digital overwhelm affects sleep and relationships
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl text-green-600 flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                The Solution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  Understand your emotional triggers
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  Build mindful technology habits
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  Create meaningful offline activities
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  Develop emotional resilience
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button 
            onClick={() => setCurrentPage('apps-fail')} 
            className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3 mr-4"
          >
            Why Other Apps Fail
          </Button>
          <Button 
            onClick={() => setCurrentPage('solution')} 
            variant="outline"
            className="text-lg px-8 py-3"
          >
            Our Approach
          </Button>
        </div>
      </div>
    </div>
  );

  const AppsFailPage = () => (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex justify-between items-center p-6 bg-white border-b shadow-sm">
        <button 
          onClick={() => setCurrentPage('home')} 
          className="text-2xl font-bold text-blue-900 flex items-center gap-2 hover:text-blue-700 transition-colors"
        >
          <Brain className="w-8 h-8" />
          MindSync
        </button>
        <Button 
          onClick={() => setCurrentPage('solution')} 
          className="bg-blue-600 hover:bg-blue-700"
        >
          Discover MindSync
        </Button>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-4">
          Why Digital Well-being Apps Fail
        </h1>
        <p className="text-xl text-center text-blue-700 mb-12 italic">
          "If apps could solve the problem, we wouldn't still feel this way."
        </p>

        <div className="grid gap-6">
          {[
            { title: "Over-focus on screen limits", description: "They treat symptoms, not causes. Time limits don't address why we reach for our phones." },
            { title: "Guilt-driven feedback", description: "Shame-based notifications make us feel worse about our habits instead of empowering change." },
            { title: "No emotional insight", description: "They track usage but ignore the emotional triggers that drive our digital behavior." },
            { title: "One-size-fits-all", description: "Generic solutions don't account for individual needs, lifestyles, or personal challenges." },
            { title: "Easily bypassed", description: "Most restrictions can be disabled with a few taps, making them ineffective when we need them most." },
            { title: "Privacy-invading", description: "They often collect extensive personal data while claiming to help with digital wellness." },
            { title: "Resource-draining", description: "Ironically, they add more notifications and screen time to solve a screen time problem." },
            { title: "No connection to real life", description: "They focus on digital metrics without helping build meaningful offline alternatives." }
          ].map((problem, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-red-600 font-bold">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{problem.title}</h3>
                  <p className="text-gray-700">{problem.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            onClick={() => setCurrentPage('solution')} 
            className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
          >
            So what does work? → Discover MindSync
          </Button>
        </div>
      </div>
    </div>
  );

  const SolutionPage = () => (
    <div className="min-h-screen bg-white">
      <nav className="flex justify-between items-center p-6 bg-white border-b shadow-sm">
        <button 
          onClick={() => setCurrentPage('home')} 
          className="text-2xl font-bold text-blue-900 flex items-center gap-2 hover:text-blue-700 transition-colors"
        >
          <Brain className="w-8 h-8" />
          MindSync
        </button>
        <Button 
          onClick={() => setCurrentPage('pulse-check')} 
          className="bg-blue-600 hover:bg-blue-700"
        >
          Try Pulse Check
        </Button>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-4">
          Our Solution: How MindSync Helps You Reconnect
        </h1>
        <p className="text-xl text-center text-blue-700 mb-12">
          "You don't need more limits — you need more clarity, peace, and presence."
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Target, title: "Comprehensive Pulse Check", description: "15-question deep dive into your digital habits and emotional patterns" },
            { icon: Zap, title: "Micro-Challenges", description: "Replace scrolling with real-world actions that build lasting habits" },
            { icon: Heart, title: "Mood Check-Ins", description: "Build emotional awareness around screen use with daily tracking" },
            { icon: Shield, title: "Privacy First", description: "No tracking, no sharing, optional offline mode - your data stays yours" },
            { icon: Award, title: "Reward System", description: "Progress badges, streaks, theme unlocks that celebrate real growth" },
            { icon: UserCheck, title: "Peer Accountability", description: "Support system with optional friend matching or AI buddy" },
            { icon: PenTool, title: "Weekly Reflections", description: "Journal-style check-ins to stay mindful and track progress" }
          ].map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg text-blue-900">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => setCurrentPage('pulse-check')} 
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
            >
              Try the Pulse Check Now
            </Button>
            <Button 
              onClick={() => setCurrentPage('dashboard')} 
              variant="outline"
              className="text-lg px-8 py-3 border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Start Your Real-Life Journey
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

const PulseCheckPage = () => {
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

    const handleAnswer = (answer) => {
      const newAnswers = {
        ...answers,
        [step]: answer
      };
      
      setAnswers(newAnswers);
      
      if (step < questions.length) {
        setStep(step + 1);
      } else {
        setIsCompleted(true);
        storage.setData('pulseCheckCompleted', true);
        setStep('results');
      }
    };

    const getProfile = () => {
      const scores = Object.values(answers);
      const highUsage = scores.filter(s => 
        s.includes("6-8 hours") || 
        s.includes("More than 8 hours") || 
        s.includes("Constantly")
      ).length;
      
      const anxiety = scores.filter(s => 
        s.includes("anxious") || 
        s.includes("Panicked") || 
        s.includes("Very concerned")
      ).length;
      
      const awareness = scores.filter(s => 
        s.includes("Very ready") || 
        s.includes("Somewhat ready")
      ).length;
      
      if (highUsage >= 3) return "The Digital Dependent";
      if (anxiety >= 3) return "The Anxious Scroller";
      if (awareness >= 2) return "The Mindful Seeker";
      return "The Balanced Explorer";
    };

    const getRecommendations = () => {
      const profile = getProfile();
      const recommendations = {
        "The Digital Dependent": [
          "Start with 30-minute phone-free periods",
          "Use physical alarm clock instead of phone",
          "Create phone-free zones in your home",
          "Practice the 5-4-3-2-1 grounding technique"
        ],
        "The Anxious Scroller": [
          "Try breathing exercises before checking phone",
          "Set specific times for social media",
          "Use calming apps instead of stimulating ones",
          "Practice mindful phone use - pause before opening apps"
        ],
        "The Mindful Seeker": [
          "Join a digital wellness community",
          "Try a 7-day mindful phone challenge",
          "Explore meditation and mindfulness practices",
          "Set intention before each phone session"
        ],
        "The Balanced Explorer": [
          "Fine-tune your current habits",
          "Experiment with new offline hobbies",
          "Help others with their digital wellness",
          "Maintain your healthy boundaries"
        ]
      };
      return recommendations[profile];
    };

    const getDiagnosis = () => {
      const profile = getProfile();
      const diagnoses = {
        "The Digital Dependent": {
          problem: "High dependency on digital devices affecting daily life",
          severity: "High",
          mainIssues: ["Excessive screen time", "Difficulty with self-control", "Impact on real-world activities"],
          fixes: [
            "Gradual reduction approach - start with small phone-free periods",
            "Environmental changes - create physical barriers to phone access",
            "Replacement activities - identify engaging offline alternatives",
            "Support system - involve friends/family in your digital wellness journey"
          ]
        },
        "The Anxious Scroller": {
          problem: "Digital use driven by anxiety and emotional triggers",
          severity: "Medium-High",
          mainIssues: ["Emotional dependency", "Anxiety-driven usage", "Negative mood impact"],
          fixes: [
            "Mindfulness training - learn to recognize emotional triggers",
            "Breathing techniques - practice calming exercises before phone use",
            "Scheduled check-ins - set specific times for social media",
            "Content curation - unfollow accounts that increase anxiety"
          ]
        },
        "The Mindful Seeker": {
          problem: "Awareness of issues with motivation to change",
          severity: "Medium",
          mainIssues: ["Inconsistent habits", "Need for structure", "Seeking better balance"],
          fixes: [
            "Structured challenges - follow guided digital wellness programs",
            "Community support - join groups with similar goals",
            "Mindfulness practices - integrate meditation into daily routine",
            "Progress tracking - monitor improvements and celebrate wins"
          ]
        },
        "The Balanced Explorer": {
          problem: "Generally healthy habits with room for optimization",
          severity: "Low",
          mainIssues: ["Minor habit adjustments needed", "Maintaining current progress"],
          fixes: [
            "Fine-tuning - make small adjustments to current habits",
            "Exploration - try new offline activities and hobbies",
            "Leadership - help others with their digital wellness",
            "Maintenance - continue current healthy practices"
          ]
        }
      };
      return diagnoses[profile];
    };

    if (step === 'results') {
      const profile = getProfile();
      const recommendations = getRecommendations();
      const diagnosis = getDiagnosis();
      
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
          <nav className="flex justify-between items-center p-6 bg-white border-b shadow-sm">
            <button 
              onClick={() => setCurrentPage('home')} 
              className="text-2xl font-bold text-blue-900 flex items-center gap-2 hover:text-blue-700 transition-colors"
            >
              <Brain className="w-8 h-8" />
              MindSync
            </button>
            <Button 
              onClick={() => setCurrentPage('dashboard')} 
              className="bg-green-600 hover:bg-green-700"
            >
              Go to Dashboard
            </Button>
          </nav>
          
          <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
              Your Digital Pulse Check Results
            </h1>
            
            <Card className="p-8 mb-8 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-blue-900 flex items-center justify-center gap-2">
                  <Target className="w-8 h-8" />
                  Your Digital Profile: {profile}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg text-gray-700 mb-6">
                  Based on your responses, we've identified your digital behavior pattern.
                </p>
                <div className="flex justify-center gap-4">
                  <Badge className={`text-lg px-4 py-2 ${
                    diagnosis.severity === 'High' ? 'bg-red-100 text-red-800' :
                    diagnosis.severity === 'Medium-High' ? 'bg-orange-100 text-orange-800' :
                    diagnosis.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    Severity: {diagnosis.severity}
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2">
                    Readiness: {answers[15]?.includes("Very ready") ? "High" : "Medium"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 mb-8 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-blue-900 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6" />
                  Problem Diagnosis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 font-medium">{diagnosis.problem}</p>
                <h4 className="font-semibold text-gray-900 mb-2">Main Issues Identified:</h4>
                <ul className="space-y-2 mb-4">
                  {diagnosis.mainIssues.map((issue, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span className="text-gray-700">{issue}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="p-8 mb-8 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-blue-900 flex items-center gap-2">
                  <Settings className="w-6 h-6" />
                  Personalized Fixes & Solutions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {diagnosis.fixes.map((fix, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-green-50 border border-green-200">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span className="text-gray-700">{fix}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 mb-8 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-blue-900 flex items-center gap-2">
                  <Target className="w-6 h-6" />
                  Immediate Action Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold">{index + 1}</span>
                      </div>
                      <span className="text-gray-700">{rec}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button 
                onClick={() => setCurrentPage('dashboard')} 
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3 mr-4"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Continue to Dashboard
              </Button>
              <Button 
                onClick={() => {
                  setStep(1);
                  setAnswers({});
                  setIsCompleted(false);
                  storage.setData('pulseCheckCompleted', false);
                }} 
                variant="outline"
                className="text-lg px-8 py-3"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Retake Assessment
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <ErrorBoundary>
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
              <Button 
                onClick={() => setStep(step - 1)} 
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
            )}
          </nav>

          <div className="max-w-2xl mx-auto px-6 py-12">
            <Card className="p-8 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">Question {step} of {questions.length}</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(step / questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <CardTitle className="text-2xl text-blue-900 mb-6">
                  {currentQuestion?.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentQuestion?.options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      variant="outline"
                      className="w-full text-left justify-start p-4 h-auto hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </ErrorBoundary>
    );
  };

  const DashboardPage = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('week');
    const isCompleted = storage.getData('pulseCheckCompleted', false);
    
    // Redirect to pulse check if not completed
    if (!isCompleted) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Card className="p-8 max-w-md text-center">
            <CardHeader>
              <CardTitle className="text-xl text-blue-900 flex items-center justify-center gap-2">
                <Lock className="w-6 h-6" />
                Dashboard Locked
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Please complete the Digital Pulse Check to access your personalized dashboard.
              </p>
              <Button 
                onClick={() => setCurrentPage('pulse-check')} 
                className="bg-blue-600 hover:bg-blue-700"
              >
                Take Pulse Check
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }
    
    const screenTimeData = {
      today: { hours: 3, minutes: 24, change: -15 },
      week: { hours: 28, minutes: 45, change: -8 },
      month: { hours: 124, minutes: 30, change: -12 }
    };
    
    const moodData = [
      { day: 'Mon', mood: 4, screenTime: 4.2 },
      { day: 'Tue', mood: 3, screenTime: 5.1 },
      { day: 'Wed', mood: 5, screenTime: 2.8 },
      { day: 'Thu', mood: 4, screenTime: 3.5 },
      { day: 'Fri', mood: 2, screenTime: 6.2 },
      { day: 'Sat', mood: 5, screenTime: 2.1 },
      { day: 'Sun', mood: 4, screenTime: 3.4 }
    ];

    const challenges = [
      { id: 1, title: "Take a 15-minute walk without your phone", completed: false, points: 10 },
      { id: 2, title: "Have a phone-free meal", completed: true, points: 15 },
      { id: 3, title: "Read for 30 minutes instead of scrolling", completed: false, points: 20 },
      { id: 4, title: "Practice 5-minute meditation", completed: true, points: 10 }
    ];

    const [userChallenges, setUserChallenges] = useState(() => {
      return storage.getData('userChallenges', challenges);
    });

    const toggleChallenge = (id) => {
      const newChallenges = userChallenges.map(challenge => 
        challenge.id === id 
          ? { ...challenge, completed: !challenge.completed }
          : challenge
      );
      setUserChallenges(newChallenges);
      storage.setData('userChallenges', newChallenges);
    };

    const totalPoints = userChallenges.filter(c => c.completed).reduce((sum, c) => sum + c.points, 0);
    const currentStreak = 5; // Simulated streak

    return (
      <div className="min-h-screen bg-gray-50">
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
              variant="outline" 
              onClick={() => setCurrentPage('pulse-check')}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Retake Pulse Check
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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">Your MindSync Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back! Here's your digital wellness overview.</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">{currentTime.toLocaleDateString()}</p>
              <p className="text-lg font-semibold text-blue-900">{currentTime.toLocaleTimeString()}</p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <Clock className="w-5 h-5" />
                  Screen Time Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-900 mb-1">
                  {screenTimeData.today.hours}h {screenTimeData.today.minutes}m
                </div>
                <div className="flex items-center gap-1">
                  <TrendingDown className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 text-sm">{screenTimeData.today.change}% from yesterday</span>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-green-900">
                  <Award className="w-5 h-5" />
                  Current Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-900 mb-1">{currentStreak} days</div>
                <p className="text-green-700 text-sm">Mindful phone usage</p>
              </CardContent>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-purple-900">
                  <Star className="w-5 h-5" />
                  Points Earned
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-900 mb-1">{totalPoints}</div>
                <p className="text-purple-700 text-sm">This week</p>
              </CardContent>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-orange-900">
                  <Heart className="w-5 h-5" />
                  Mood Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-900 mb-1">4.1/5</div>
                <p className="text-orange-700 text-sm">Weekly average</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Mood vs Screen Time Chart */}
            <Card className="lg:col-span-2 p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  Mood vs Screen Time This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {moodData.map((day, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-12 text-sm font-medium text-gray-600">{day.day}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-gray-500">Mood:</span>
                          <div className="flex gap-1">
                            {[1,2,3,4,5].map(star => (
                              <Star 
                                key={star} 
                                className={`w-4 h-4 ${star <= day.mood ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">Screen:</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${(day.screenTime / 8) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{day.screenTime}h</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Today's Challenges */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-500" />
                  Today's Challenges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userChallenges.map((challenge) => (
                    <div key={challenge.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <button
                        onClick={() => toggleChallenge(challenge.id)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-colors ${
                          challenge.completed 
                            ? 'bg-green-500 border-green-500' 
                            : 'border-gray-300 hover:border-green-400'
                        }`}
                      >
                        {challenge.completed && <CheckCircle className="w-3 h-3 text-white" />}
                      </button>
                      <div className="flex-1">
                        <p className={`text-sm transition-all ${challenge.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                          {challenge.title}
                        </p>
                        <p className="text-xs text-blue-600">+{challenge.points} points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Reflection */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-500" />
                  Weekly Reflection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">How did your digital habits affect your week?</p>
                <Button variant="outline" className="w-full">Start Reflection</Button>
              </CardContent>
            </Card>

            {/* App Usage Breakdown */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-blue-500" />
                  Top Apps This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { app: "Social Media", time: "8h 32m", icon: MessageCircle, color: "bg-blue-500" },
                    { app: "News", time: "4h 15m", icon: BookOpen, color: "bg-red-500" },
                    { app: "Entertainment", time: "3h 48m", icon: Music, color: "bg-purple-500" },
                    { app: "Productivity", time: "2h 22m", icon: Target, color: "bg-green-500" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-8 h-8 ${item.color} rounded-lg flex items-center justify-center`}>
                        <item.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{item.app}</p>
                        <p className="text-xs text-gray-500">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Progress Overview */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-500" />
                  Monthly Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Screen Time Goal</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Mindful Days</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Challenges Completed</span>
                      <span>82%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomePage />;
      case 'features': return <FeaturesPage />;
      case 'about': return <AboutPage />;
      case 'blog': return <BlogPage />;
      case 'hidden-cost': return <HiddenCostPage />;
      case 'apps-fail': return <AppsFailPage />;
      case 'solution': return <SolutionPage />;
      case 'pulse-check': return <EnhancedPulseCheck setCurrentPage={setCurrentPage} storage={storage} />;
      case 'dashboard': return <DashboardPage setCurrentPage={setCurrentPage} storage={storage} />;
      default: return <HomePage />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="font-sans">
        {renderPage()}
      </div>
    </ErrorBoundary>
  );
}

export default App;

