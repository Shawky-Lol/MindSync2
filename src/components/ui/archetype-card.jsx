import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './card.jsx';
import { Badge } from './badge.jsx';

const ArchetypeCard = ({ 
  archetype,
  className = "",
  delay = 0
}) => {
  const archetypeData = {
    'balanced-seeker': {
      title: 'The Balanced Seeker',
      description: 'You are generally mindful of your digital habits and seek to optimize your screen time for greater well-being.',
      icon: '🧘‍♀️',
      color: 'from-green-400 to-blue-500',
      bgColor: 'bg-gradient-to-br from-green-50 to-blue-50',
      textColor: 'text-green-700',
      traits: ['Mindful', 'Optimizing', 'Balanced'],
      recommendations: [
        'Explore new offline activities that bring you joy',
        'Practice deeper emotional awareness of digital triggers',
        'Set specific times for focused digital work'
      ]
    },
    'conscious-connector': {
      title: 'The Conscious Connector',
      description: 'You primarily use devices for social interaction but sometimes struggle with FOMO or constant engagement pressure.',
      icon: '🤝',
      color: 'from-purple-400 to-pink-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
      textColor: 'text-purple-700',
      traits: ['Social', 'Connected', 'Empathetic'],
      recommendations: [
        'Set healthy social media boundaries',
        'Foster deeper in-person connections',
        'Practice recognizing emotional impacts of online interactions'
      ]
    },
    'productivity-power-user': {
      title: 'The Productivity Power User',
      description: 'You heavily rely on devices for work and learning but may experience digital fatigue or difficulty disconnecting.',
      icon: '⚡',
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-gradient-to-br from-yellow-50 to-orange-50',
      textColor: 'text-yellow-700',
      traits: ['Efficient', 'Goal-oriented', 'Driven'],
      recommendations: [
        'Implement structured digital breaks',
        'Practice digital decluttering techniques',
        'Explore tools for focused, distraction-free work'
      ]
    },
    'distracted-drifter': {
      title: 'The Distracted Drifter',
      description: 'You often find yourself mindlessly scrolling or checking your phone out of habit or boredom.',
      icon: '🌊',
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      textColor: 'text-blue-700',
      traits: ['Curious', 'Adaptable', 'Seeking'],
      recommendations: [
        'Identify and understand your digital triggers',
        'Practice mindfulness techniques',
        'Introduce engaging offline alternatives'
      ]
    },
    'overwhelmed-escapist': {
      title: 'The Overwhelmed Escapist',
      description: 'You may use devices as a coping mechanism for stress, anxiety, or loneliness and feel trapped by digital habits.',
      icon: '🌈',
      color: 'from-indigo-400 to-purple-500',
      bgColor: 'bg-gradient-to-br from-indigo-50 to-purple-50',
      textColor: 'text-indigo-700',
      traits: ['Sensitive', 'Resilient', 'Growing'],
      recommendations: [
        'Practice self-compassion in your digital journey',
        'Explore alternative coping strategies',
        'Gradually reduce reliance on digital escape'
      ]
    }
  };

  const data = archetypeData[archetype] || archetypeData['balanced-seeker'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: "easeOut"
      }}
      className={className}
    >
      <Card className={`${data.bgColor} border-2 border-white shadow-lg hover:shadow-xl transition-shadow duration-300`}>
        <CardHeader className="text-center pb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.3, duration: 0.4, type: "spring" }}
            className="text-6xl mb-4"
          >
            {data.icon}
          </motion.div>
          <CardTitle className={`text-2xl font-bold ${data.textColor} mb-2`}>
            {data.title}
          </CardTitle>
          <p className="text-gray-600 leading-relaxed">
            {data.description}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Your Traits:</h4>
            <div className="flex flex-wrap gap-2">
              {data.traits.map((trait, index) => (
                <motion.div
                  key={trait}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: delay + 0.5 + (index * 0.1) }}
                >
                  <Badge variant="secondary" className={`${data.textColor} bg-white/70`}>
                    {trait}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Recommendations for You:</h4>
            <ul className="space-y-2">
              {data.recommendations.map((rec, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: delay + 0.7 + (index * 0.1) }}
                  className="flex items-start gap-2 text-gray-700"
                >
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-sm leading-relaxed">{rec}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export { ArchetypeCard };

