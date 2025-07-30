import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card.jsx';

const AnimatedCard = ({ 
  children, 
  className = "", 
  delay = 0, 
  direction = "up",
  hover = true,
  ...props 
}) => {
  const directions = {
    up: { y: 20, opacity: 0 },
    down: { y: -20, opacity: 0 },
    left: { x: 20, opacity: 0 },
    right: { x: -20, opacity: 0 },
    scale: { scale: 0.9, opacity: 0 }
  };

  const hoverEffect = hover ? {
    scale: 1.02,
    y: -5,
    transition: { duration: 0.2 }
  } : {};

  return (
    <motion.div
      initial={directions[direction]}
      animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: "easeOut"
      }}
      whileHover={hoverEffect}
      className={className}
    >
      <Card {...props}>
        {children}
      </Card>
    </motion.div>
  );
};

const AnimatedCardHeader = ({ children, ...props }) => (
  <CardHeader {...props}>
    {children}
  </CardHeader>
);

const AnimatedCardContent = ({ children, ...props }) => (
  <CardContent {...props}>
    {children}
  </CardContent>
);

const AnimatedCardTitle = ({ children, ...props }) => (
  <CardTitle {...props}>
    {children}
  </CardTitle>
);

const AnimatedCardDescription = ({ children, ...props }) => (
  <CardDescription {...props}>
    {children}
  </CardDescription>
);

export { 
  AnimatedCard, 
  AnimatedCardHeader, 
  AnimatedCardContent, 
  AnimatedCardTitle, 
  AnimatedCardDescription 
};

