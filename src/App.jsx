import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Target, BarChart3, Users, Shield, Zap, ArrowRight, CheckCircle, Star, Heart } from 'lucide-react';
import DashboardPage from './components/DashboardPage.jsx';
import EnhancedPulseCheck from './components/EnhancedPulseCheck.jsx';

// Create a singleton storage instance to prevent re-creation
const createStorage = (() => {
  let instance = null;
  
  return () => {
    if (!instance) {
      const data = {};
      instance = {
        getData: (key, defaultValue = null) => {
          try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : (data[key] ?? defaultValue);
          } catch {
            return data[key] ?? defaultValue;
          }
        },
        setData: (key, value) => {
          try {
            localStorage.setItem(key, JSON.stringify(value));
            data[key] = value;
          } catch {
            data[key] = value;
          }
        }
      };
    }
    return instance;
  };
})();

// Memoized components to prevent unnecessary re-renders
const FeatureCard = React.memo(({ icon: Icon, title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
  >
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ duration: 0.2 }}
      className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-6 group-hover:shadow-lg"
    >
      <Icon className="w-8 h-8 text-white" />
    </motion.div>
    <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
));

const TestimonialCard = React.memo(({ name, role, content, rating, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
  >
    <div className="flex items-center mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
      ))}
    </div>
    <p className="text-gray-700 mb-4 italic">"{content}"</p>
    <div>
      <p className="font-semibold text-gray-900">{name}</p>
      <p className="text-sm text-gray-500">{role}</p>
    </div>
  </motion.div>
));

const AnimatedButton = React.memo(({ children, onClick, variant = "primary", className = "", ...props }) => {
  const baseClasses = "px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300";
  const variants = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl",
    secondary: "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 shadow-md hover:shadow-lg"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
});

const HomePage = React.memo(({ setCurrentPage }) => {
  // Animation variants for better performance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const features = useMemo(() => [
    {
      icon: Target,
      title: "Digital Pulse Check",
      description: "Discover your unique digital archetype through our comprehensive assessment and get personalized insights."
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Monitor your digital wellness journey with detailed analytics and achievement milestones."
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with like-minded individuals on similar digital wellness journeys."
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data stays private and secure. We believe in transparency and user control."
    },
    {
      icon: Zap,
      title: "Actionable Insights",
      description: "Get personalized recommendations based on your digital habits and goals."
    },
    {
      icon: Heart,
      title: "Mindful Technology",
      description: "Learn to use technology intentionally and create healthier digital boundaries."
    }
  ], []);

  const testimonials = useMemo(() => [
    {
      name: "Sarah Chen",
      role: "Marketing Professional",
      content: "MindSync helped me understand my digital habits and create better boundaries. I feel more in control now.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Software Developer",
      content: "The pulse check was eye-opening. I never realized how much my phone use was affecting my sleep.",
      rating: 5
    },
    {
      name: "Emily Johnson",
      role: "Student",
      content: "Finally, a tool that doesn't shame you but helps you grow. The insights are incredibly valuable.",
      rating: 5
    }
  ], []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative min-h-screen flex items-center justify-center px-6 py-20"
        style={{
          backgroundImage: 'url(/assets/background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Regain Control of Your{' '}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Real Life
              </motion.span>
            </motion.h1>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Discover your digital archetype, understand your habits, and build a healthier relationship with technology.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <AnimatedButton
              onClick={() => setCurrentPage('pulse-check')}
              variant="primary"
            >
              Take Your Pulse Check
              <ArrowRight className="ml-2 w-5 h-5 inline" />
            </AnimatedButton>
            
            <AnimatedButton
              onClick={() => setCurrentPage('features')}
              variant="secondary"
            >
              Learn More
            </AnimatedButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-16 flex items-center justify-center gap-8 text-white/80"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Free Assessment</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Personalized Insights</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Privacy Focused</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Transform Your Digital Life
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform helps you understand and improve your relationship with technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                {...feature}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from people who've transformed their digital habits.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.name}
                {...testimonial}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Take the first step towards a healthier relationship with technology. 
              Your digital wellness journey starts here.
            </p>
            
            <AnimatedButton
              onClick={() => setCurrentPage('pulse-check')}
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-50"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5 inline" />
            </AnimatedButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
});

const FeaturesPage = React.memo(({ setCurrentPage }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
    <nav className="flex justify-between items-center p-6 bg-white border-b shadow-sm">
      <button 
        onClick={() => setCurrentPage('home')} 
        className="text-2xl font-bold text-blue-900 flex items-center gap-2 hover:text-blue-700 transition-colors"
      >
        <Brain className="w-8 h-8" />
        MindSync
      </button>
      <AnimatedButton onClick={() => setCurrentPage('pulse-check')}>
        Take Pulse Check
      </AnimatedButton>
    </nav>
    
    <div className="max-w-6xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
          Powerful Features for Digital Wellness
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover how MindSync can help you build a healthier relationship with technology.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            icon: Target,
            title: "Digital Pulse Check",
            description: "Comprehensive assessment to discover your digital archetype and understand your unique relationship with technology."
          },
          {
            icon: BarChart3,
            title: "Progress Analytics",
            description: "Track your digital wellness journey with detailed insights, trends, and milestone achievements."
          },
          {
            icon: Users,
            title: "Community Support",
            description: "Connect with others on similar journeys and share experiences in a supportive environment."
          },
          {
            icon: Shield,
            title: "Privacy Protection",
            description: "Your data remains private and secure. We believe in complete transparency and user control."
          },
          {
            icon: Zap,
            title: "Personalized Recommendations",
            description: "Get tailored advice and actionable steps based on your specific digital habits and goals."
          },
          {
            icon: Heart,
            title: "Mindful Technology Use",
            description: "Learn techniques for intentional technology use and creating healthy digital boundaries."
          }
        ].map((feature, index) => (
          <FeatureCard
            key={feature.title}
            {...feature}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  </div>
));

const AboutPage = React.memo(({ setCurrentPage }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
    <nav className="flex justify-between items-center p-6 bg-white border-b shadow-sm">
      <button 
        onClick={() => setCurrentPage('home')} 
        className="text-2xl font-bold text-blue-900 flex items-center gap-2 hover:text-blue-700 transition-colors"
      >
        <Brain className="w-8 h-8" />
        MindSync
      </button>
      <AnimatedButton onClick={() => setCurrentPage('pulse-check')}>
        Take Pulse Check
      </AnimatedButton>
    </nav>
    
    <div className="max-w-4xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
          About MindSync
        </h1>
        <p className="text-xl text-gray-600">
          Empowering healthier relationships with technology through awareness and intentional use.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="prose prose-lg mx-auto"
      >
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-6">
            In our increasingly digital world, technology has become an integral part of our daily lives. 
            While it brings countless benefits, it can also create challenges for our mental health, 
            relationships, and overall well-being.
          </p>
          
          <p className="text-gray-700 mb-6">
            MindSync was created to help individuals develop a more conscious and intentional 
            relationship with technology. Through our comprehensive Digital Pulse Check, we help you 
            understand your unique digital archetype and provide personalized insights to guide your journey.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
          <ul className="text-gray-700 mb-6 space-y-2">
            <li>• Take our comprehensive Digital Pulse Check assessment</li>
            <li>• Discover your unique digital archetype</li>
            <li>• Receive personalized insights and recommendations</li>
            <li>• Track your progress on your digital wellness dashboard</li>
            <li>• Build healthier habits with our guided tools and resources</li>
          </ul>

          <div className="text-center mt-8">
            <AnimatedButton onClick={() => setCurrentPage('pulse-check')}>
              Start Your Journey
            </AnimatedButton>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
));

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  
  // Use singleton storage instance
  const storage = useMemo(() => createStorage(), []);

  // Memoize page components to prevent unnecessary re-renders
  const pageComponents = useMemo(() => ({
    home: <HomePage setCurrentPage={setCurrentPage} />,
    features: <FeaturesPage setCurrentPage={setCurrentPage} />,
    about: <AboutPage setCurrentPage={setCurrentPage} />,
    'pulse-check': <EnhancedPulseCheck setCurrentPage={setCurrentPage} storage={storage} />,
    dashboard: <DashboardPage setCurrentPage={setCurrentPage} storage={storage} />
  }), [setCurrentPage, storage]);

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {pageComponents[currentPage]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;