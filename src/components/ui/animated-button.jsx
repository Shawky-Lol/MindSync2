import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './button.jsx';

const AnimatedButton = ({ 
  children, 
  className = "", 
  variant = "default",
  size = "default",
  animationType = "scale",
  disabled = false,
  ...props 
}) => {
  const animations = {
    scale: {
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 }
    },
    bounce: {
      whileHover: { y: -2 },
      whileTap: { y: 0 }
    },
    glow: {
      whileHover: { 
        boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
        transition: { duration: 0.2 }
      }
    },
    slide: {
      whileHover: { x: 2 },
      whileTap: { x: 0 }
    }
  };

  const selectedAnimation = animations[animationType] || animations.scale;

  return (
    <motion.div
      {...selectedAnimation}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="inline-block"
    >
      <Button 
        variant={variant}
        size={size}
        className={className}
        disabled={disabled}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
};

export { AnimatedButton };

