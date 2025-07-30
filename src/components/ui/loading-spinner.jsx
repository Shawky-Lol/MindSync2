import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ 
  size = 40, 
  color = "#3b82f6", 
  className = "",
  text = "Loading..."
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <motion.div
        className="rounded-full border-4 border-gray-200"
        style={{
          width: size,
          height: size,
          borderTopColor: color,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      {text && (
        <motion.p
          className="mt-4 text-gray-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export { LoadingSpinner };

